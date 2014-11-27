define(['backbone'], function (Backbone) {

    'use strict';

    return Backbone.Model.extend({

        sync: function(method, model, options) {
            if (method === 'read') {
                var position = JSON.parse(localStorage.getItem('position'));

                if (position !== null) {
                    this.set({ lat:  parseFloat(position.lat), lng: parseFloat(position.lng),
                        zoom: parseFloat(position.zoom) });
                }
            } else {
                localStorage.setItem('position', JSON.stringify({ lat: this.get('lat'),
                    lng: this.get('lng'), zoom: this.get('zoom') }));
            }
        },

        defaults: {
            lat: 59,
            lng: 30,
            zoom: 5
        },

        initialize: function() {
            this.fetch();
            this.on('change', this.save);
        },

        exists: function() {
            return localStorage.getItem('position') !== null
        }

    });

});