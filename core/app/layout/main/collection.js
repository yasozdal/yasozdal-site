define(['backbone', 'app/config'], function (Backbone, config) {

    'use strict';

    return Backbone.Collection.extend({

        url: config.API + 'Events',

        initialize: function() {
            this.fetch({ data: { count: 3 }, processData: true });
        },

        more: function() {
            //this.fetch({ remove: false, data: { count: 1, offset: this.length }, processData: true });
            this.fetch({ data: { count: 1 + this.length }, processData: true });
        }

    });

});