define(['backbone', 'app/config'], function (Backbone, config) {

    'use strict';

    return Backbone.Model.extend({

        url: config.API + 'Events',

        defaults: {
            Latitude: '',
            Longitude: '',
            Description: '',
            EventDate: '', //ddd, dd MMM yyyy HH:mm:ss GMT
            CategoryId: '',
            PhotoIds: []
        },

        initialize: function() {
            this.on('change', this.addEvent);
        },

        parse: function (response) {
            delete response.EventId;
            return response;
        },

        addEvent: function() {
            alert(JSON.stringify(this.attributes));
            this.save(this.attributes);
        }

    });

});