define(['marionette', 'underscore', 'text!layout/main/main.html', 'text!layout/main/marker.html',
'common/spinner', 'async!gmaps'], function (Marionette, _, mainTemplate, markerTemplate, Spinner) {

    'use strict';

    return Marionette.LayoutView.extend({

        template: _.template(mainTemplate),

        regions: {
            header: "#header",
            content: {
                regionClass: Spinner,
                selector: "#content"
            }
        },

        collectionEvents: {
            "sync": "updateMarkers"
        },

        initialize: function(options) {
            this.listenTo(this.content, 'show', this.updateSidebar);
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

        updateMarkers: function() {
            var self = this;
            this.collection.each(function (event) {
                var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(event.get('Latitude'), event.get('Longitude')),
                    map: self.map,
                    title: event.get('EventId').toString()
                });

                var infoWindow = new google.maps.InfoWindow({
                    content: _.template(markerTemplate)(event.attributes)
                });

                google.maps.event.addListener(marker, 'click', function() {
                    infoWindow.open(self.map, marker);
                });
            });

        },

        onShow: function() {
            var self = this;

            var mapOptions = {
                zoom: self.model.get('zoom'),
                zoomControl: true,
                zoomControlOptions: {
                    style: google.maps.ZoomControlStyle.LARGE,
                    position: google.maps.ControlPosition.RIGHT_CENTER
                },
                scrollwheel: true,
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
            var self = this;
            self.saveState();
        },

        saveState: function () {
            var self = this;
            var position = self.map.getCenter();
            self.model.set({ lat: position.lat(), lng: position.lng(), zoom: self.map.getZoom() });
            console.log(self.model.attributes);
        }

    });

});