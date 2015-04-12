define(['backbone', 'app/config'], function (Backbone, config) {

    'use strict';

    return Backbone.Model.extend({
        url: config.API + 'eventComments',

        defaults: {
            Latitude: '',
            Longitude: '',
            Description: '',
            EventDate: '',
            idEvent: ''
        },

        addComment: function() {
            this.save();
        }
    });

});