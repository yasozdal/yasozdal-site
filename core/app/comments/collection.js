define(['backbone', 'app/config'], function (Backbone, config) {

    'use strict';

    return Backbone.Collection.extend({

        url: config.API + 'eventComments/',

        getComments: function(id) {
            this.fetch({url: this.url + id});
        }

    });

});