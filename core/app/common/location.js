define(['backbone'], function (Backbone) {

    'use strict';

    return Backbone.Model.extend({

        url: 'http://maps.googleapis.com/maps/api/geocode/json',

        geocoding: function(options) {
            return this.fetch({ data: { latlng: options.Latitude + ',' + options.Longitude } });
        }

    });

});