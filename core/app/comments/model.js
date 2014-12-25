define(['backbone', 'app/config'], function (Backbone, confiq) {

    'use strict';

    return Backbone.Model.extend({
        url: confiq.API + 'eventComments',

        defaults: {
            Latitude: '',
            Longitude: '',
            Description: '',
            EventDate: ''
        },

        addComment: function() {
            this.save();
        }
    });

});