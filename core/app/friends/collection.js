define(['backbone', 'app/config'], function (Backbone, config) {

    'use strict';
    const FRIENDS = 'm';
    const FOLLOWING = 's';
    const FOLLOWERS = 'f';
    const FRIENDS_AND_FOLLOWING = 'mf';
    const FRIENDS_AND_FOLLOWERS = 'ms';

    return Backbone.Collection.extend({

        url: config.API + 'friends/my/',

        initialize: function() {
            this.fetch({url : this.url + FRIENDS});
        },

        following: function() {
            this.fetch({url : this.url + FOLLOWING});
        },

        followers: function() {
            this.fetch({url : this.url + FOLLOWERS});
        },

        mf: function() {
            this.fetch({url : this.url + FRIENDS_AND_FOLLOWING});
        },

        ms: function() {
            this.fetch({url : this.url + FRIENDS_AND_FOLLOWERS});
        }

    });

});
