define(['marionette', 'underscore', 'jquery', 'text!main/tpl/layout.html',
'text!main/tpl/marker_view.html', 'common/fade_region', 'session', 'async!gmaps', 'jqueryui',
'plugins/jquery/perfect-scrollbar'], function (Marionette, _, $, mainTemplate, markerTemplate, Fade, session) {

    'use strict';

    var markerIcon = new google.maps.MarkerImage("img/marker.png", null, null, null, new google.maps.Size(36, 36));

    function rad(x) { return x*Math.PI/180; }

    function haversine(first, second) {
        var R = 6371; // radius of earth in km
        var firstLat = first.lat(), firstLng = first.lng();
        var secondLat = second.lat(), secondLng = second.lng();
        var dLat  = rad(secondLat - firstLat), dLong = rad(secondLng - firstLng);
        var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(rad(firstLat)) * Math.cos(rad(firstLng)) *
            Math.sin(dLong/2) * Math.sin(dLong/2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return R * c;
    }

    var minimumDistance = 0.003; //in km

    var opts = {
        lines: 13,
        length: 15,
        width: 7,
        radius: 40,
        corners: 1,
        rotate: 0,
        direction: 1,
        color: '#ffffff',
        speed: 1,
        trail: 60,
        shadow: false,
        hwaccel: false,
        className: 'spinner',
        zIndex: 2e9,
        top: '50%',
        left: '50%'
    };

    var spinner = new Spinner(opts);

    return Marionette.LayoutView.extend({

        template: _.template(mainTemplate),

        regions: {
            header: "#header",
            content: {
                regionClass: Fade,
                selector: "#content"
            }
        },

        collectionEvents: {
            "add": "addMarker"
        },

        initialize: function(options) {
            var self = this;

            this.map = null;
            this.markers = [];
            this.mapIdlePromise = new $.Deferred();

            $.when(this.mapIdlePromise, options.headerPromise).done(function() {
                self.trigger("ready");
                spinner.stop();
                self.$("#loader").remove();
            });

            this.listenTo(this.content, 'show', this.contentEvents);
            this.listenTo(this.header, 'show', this.headerEvents);
            this.listenTo(this.collection, 'navigated', this.centerMap);
        },

        contentEvents: function () {
            this.updateSidebar();
            this.contentScroll();

            this.listenTo(this.content.currentView, 'navigated', this.centerMap);
        },

        headerEvents: function() {
            this.listenTo(this.header.currentView, 'logout', function() {
                session.logout();
            });
            this.listenTo(this.header.currentView, 'drop:down', function() {
                this.$( "#main" ).fadeOut();
            });
            this.listenTo(this.header.currentView, 'drop:up', function() {
                this.$( "#main" ).fadeIn();
            });
        },

        contentScroll: function() {
            this.$("#scrollblock").perfectScrollbar({
                wheelSpeed: 0.5,
                suppressScrollX: true,
                includePadding: true
            });
        },

        enableEndlessScroll: function() {
            var self = this;
            var scrollBlock = this.$("#scrollblock");

            function endlessScroll() {
                if (scrollBlock.scrollTop() === scrollBlock.prop('scrollHeight') - scrollBlock.outerHeight()) {
                    self.content.currentView.more();
                }
            }

            scrollBlock.on('scroll', endlessScroll);

            this.listenTo(this.content.currentView, 'destroy', function() {
                scrollBlock.off('scroll', endlessScroll);
            });
        },

        centerMap: function(options) {
            this.map.setCenter(new google.maps.LatLng(options.lat, options.lng));
        },

        enableMarker: function() {
            var self = this;
            var pointer = this.content.currentView.ui.marker;
            var input = this.content.currentView.ui.location.get(0);
            var searchBox = new google.maps.places.SearchBox(input);
            var geocoder = new google.maps.Geocoder();

            google.maps.event.addListener(searchBox, 'places_changed', function() {
                var place = searchBox.getPlaces()[0].geometry.location;
                self.map.setCenter(new google.maps.LatLng(place.lat(), place.lng()));
            });

            var overlay = new google.maps.OverlayView();
            overlay.draw = function() {};
            overlay.setMap(this.map);

            pointer.draggable({
                helper: "clone",
                revert: "valid",
                appendTo: this.$el,
                containment: this.$el,
                start: function() {
                    pointer.hide();
                },
                stop: function() {
                    pointer.show();
                }
            });

            this.$("#wrap").droppable({
                greedy: true
            });

            this.$el.droppable({
                drop: function(event, ui) {
                    var offset = ui.helper.offset();
                    var left = offset.left + (ui.helper.width()/2);
                    var top = offset.top + (ui.helper.height());
                    var point = new google.maps.Point(left, top);
                    var position = overlay.getProjection().fromContainerPixelToLatLng(point);

                    input.readOnly = true;
                    google.maps.event.clearInstanceListeners(input);

                    var marker = new google.maps.Marker({
                        position: position,
                        map: self.map,
                        draggable: true,
                        animation: google.maps.Animation.BOUNCE,
                        icon: markerIcon
                    });

                    setTimeout(function() {
                        marker.setAnimation(null)
                    }, 1500);

                    var pushed;

                    self.listenTo(self.content.currentView, 'add:start', function() {
                        marker.setOptions({ draggable: false });
                        pushed = self.markers.push({
                            marker: marker,
                            infoWindow: null
                        });
                    });

                    self.listenTo(self.content.currentView, 'add:end', function() {
                        self.markers.splice(pushed, 1);
                        marker.setMap(null);
                    });

                    self.listenTo(self.content.currentView, 'add:error', function() {
                        marker.setOptions({ draggable: true });
                    });

                    ui.helper.remove();
                    ui.draggable.remove();

                    function update(lat, lng) {
                        var latLng = new google.maps.LatLng(lat, lng);
                        self.content.currentView.model.set({ Latitude: lat, Longitude: lng });
                        geocoder.geocode({'latLng': latLng}, function(results, status) {
                            var address;

                            if (status == google.maps.GeocoderStatus.OK) {
                                address = results[0].formatted_address;
                            } else {
                                address = "У чёрта на куличиках!";
                            }

                            self.content.currentView.ui.location.val(address);
                        });
                    }

                    update(marker.position.lat(), marker.position.lng());

                    google.maps.event.addListener(marker, 'dragend', function(event) {
                        update(event.latLng.lat(), event.latLng.lng())
                    });
                }
            });
        },

        updateSidebar: function() {
            var li = this.$('#sidebar a[href$="'+ Backbone.history.fragment +'"]').parent();

            if (li.length === 0) {
                var active = this.$('#sidebar .active');

                if (active.length === 0) {
                    this.$('#sidebar li').first().addClass('active');
                }
            } else {
                this.$('#sidebar li').removeClass('active');
                this.$('*[class=""]').removeAttr('class');
                li.addClass('active');
            }
        },

        addMarker: function(event) {
            var self = this;
            var latLng = new google.maps.LatLng(event.get('Latitude'), event.get('Longitude'));
            var infoWindow, content = _.template(markerTemplate)(event.attributes);
            var marker = null;
            var defect = 0.000000000001;
            //isEqual не сработает, только сравнением с defect
            for (var j = 0; j < this.markers.length; j++) {
                var position = this.markers[j].marker.getPosition();
                if ((this.markers[j].infoWindow === null) &&
                Math.abs(latLng.lng() - position.lng()) < defect &&
                Math.abs(latLng.lat() - position.lat()) < defect) {
                    marker = this.markers[j].marker;
                    this.markers.splice(j, 1);
                }
            }

            if (marker === null) {
                marker = new google.maps.Marker({
                    position: latLng,
                    map: self.map,
                    animation: google.maps.Animation.BOUNCE,
                    icon: markerIcon
                });

                setTimeout(function() {
                    marker.setAnimation(null)
                }, 1500);
            }

            var closest = -1, closestDistance = minimumDistance, distance;
            for (var i = 0; i < this.markers.length; i++) {
                distance = haversine(marker.getPosition(), this.markers[i].marker.getPosition());
                if (closest === -1 || distance < closestDistance) {
                    closestDistance = distance;
                    closest = i;
                }
            }

            if (closestDistance < minimumDistance) {
                infoWindow = this.markers[closest].infoWindow;
                infoWindow.setContent(content + this.markers[closest].infoWindow.getContent());
            } else {
                infoWindow = new google.maps.InfoWindow({
                    content: content
                });
            }

            this.markers.push({
                marker: marker,
                infoWindow: infoWindow
            });

            google.maps.event.addListener(marker, 'click', function() {
                infoWindow.open(self.map, marker);
            });

        },

        onRender: function() {
            var self = this;

            this.$("#main").resizable({
                //странно, но jquery-ui не может работать с коллекциями,
                //например this.$("#scrollblock, .filler")
                alsoResize: "#scrollblock, .filler",
                handles: {
                    "s": this.$("#resizable-vertical")
                },
                containment: this.$("#map-canvas")
            });

            this.$("#main").on('resizestop', function() {
                self.$("#scrollblock").perfectScrollbar('update');
            });

            this.$("#content").on('mouseover append', function() {
                self.$("#scrollblock").perfectScrollbar('update');
            });

        },

        onShow: function() {
            var self = this;

            spinner.spin(this.$(".spinner").get(0));

            var mapOptions = {
                zoom: self.model.get('zoom'),
                zoomControlOptions: {
                    style: google.maps.ZoomControlStyle.LARGE,
                    position: google.maps.ControlPosition.RIGHT_CENTER
                },
                scrollwheel: true,
                disableDefaultUI: true,
                center: new google.maps.LatLng(self.model.get('lat'), self.model.get('lng')),
                styles:
                    [
                        {
                            "featureType": "water",
                            "stylers": [
                                {
                                    "visibility": "on"
                                },
                                {
                                    "color": "#acbcc9"
                                }
                            ]
                        },
                        {
                            "featureType": "landscape",
                            "stylers": [
                                {
                                    "color": "#f2e5d4"
                                }
                            ]
                        },
                        {
                            "featureType": "road.highway",
                            "elementType": "geometry",
                            "stylers": [
                                {
                                    "color": "#c5c6c6"
                                }
                            ]
                        },
                        {
                            "featureType": "road.arterial",
                            "elementType": "geometry",
                            "stylers": [
                                {
                                    "color": "#c0392b"
                                }
                            ]
                        },
                        {
                            "featureType": "road.local",
                            "elementType": "geometry",
                            "stylers": [
                                {
                                    "color": "#c0392b"
                                }
                            ]
                        },
                        {
                            "featureType": "poi.park",
                            "elementType": "geometry",
                            "stylers": [
                                {
                                    "color": "#c5dac6"
                                }
                            ]
                        },
                        {
                            "featureType": "administrative",
                            "stylers": [
                                {
                                    "visibility": "on"
                                },
                                {
                                    "lightness": 33
                                }
                            ]
                        },
                        {
                            "featureType": "road",
                            "elementType": "geometry",
                            "stylers": [
                                {
                                    "color": "#c0392b"
                                }
                            ]
                        },
                        {
                            "featureType": "poi.park",
                            "elementType": "labels",
                            "stylers": [
                                {
                                    "visibility": "on"
                                },
                                {
                                    "lightness": 20
                                }
                            ]
                        },
                        {
                            "featureType": "transit.line",
                            "elementType": "labels.text.stroke",
                            "stylers": [
                                {
                                    "visibility": "off"
                                }
                            ]
                        },
                        {
                            "featureType": "road",
                            "stylers": [
                                {
                                    "lightness": 20
                                }
                            ]
                        }
                    ]
            };

            this.map = new google.maps.Map(this.$('#map-canvas')[0], mapOptions);

            google.maps.event.addListenerOnce(this.map, 'tilesloaded', function () {
                self.mapIdlePromise.resolve();
            });

            if(!(this.model.exists()) && navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    var pos = new google.maps.LatLng(position.coords.latitude,
                        position.coords.longitude);

                    self.map.setZoom(15);
                    self.map.setCenter(pos);
                });
            }

            $(window).on('beforeunload', function() {
                self.saveState()
            });
        },

        onBeforeDestroy: function() {
            this.saveState();
        },

        saveState: function () {
            var self = this;
            var position = self.map.getCenter();
            self.model.set({ lat: position.lat(), lng: position.lng(), zoom: self.map.getZoom() });
        }

    });

});