define(['backbone', 'app/config'], function (Backbone, config) {

    'use strict';

    return Backbone.Model.extend({
        urlRoot: config.API + 'Friends/',

        follow: function(id) {
            this.url = this.urlRoot + 'Follow/' + id;
            this.save();
        },

        unfollow: function(id) {
            this.url = this.urlRoot + 'Unfollow/' + id;
            this.save();
        }
    });

});