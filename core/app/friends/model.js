define(['backbone', 'app/config'], function (Backbone, config) {

    'use strict';

    return Backbone.Model.extend({
        url: config.API + 'friends/',

        follow: function(id) {
            this.fetch({url: this.url + 'follow/' + id});
        },

        unfollow: function(id) {
            this.fetch({url: this.url + 'unfollow/' + id});
        }
    });

});