define(['backbone', 'app/config'], function (Backbone, config) {

    'use strict';

    return Backbone.Collection.extend({

        url: config.API + 'friends/my/',


        //more: function() {
        //this.fetch({ remove: false, data: { count: 1, offset: this.length }, processData: true });
        //   this.fetch({ data: { count: 1 + this.length }, processData: true });
        //},
        //},

        initialize: function() {
            this.fetch({url : this.url + 'm'});
        },

        following: function() {
            this.fetch({url : this.url + 's'});
        },

        followers: function() {
            this.fetch({url : this.url + 'f'});
        },

        mf: function() {
            this.fetch({url : this.url + 'mf'});
        },

        ms: function() {
            this.fetch({url : this.url + 'ms'});
        }

    });

});
