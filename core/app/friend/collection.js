define(['backbone', 'app/config'], function (Backbone, config) {

    'use strict';
    const FRIENDS = 'm';
    const FOLLOWING = 's';
    const FOLLOWERS = 'f';
    const FRIENDS_AND_FOLLOWING = 'mf';
    const FRIENDS_AND_FOLLOWERS = 'ms';

    function urlid(url, id){
        if (id){
            return url + id + '/';
        }
        else {
            return url + 'my/';
        }
    };

    return Backbone.Collection.extend({

        url: config.API + 'Friends/List/',

        mates: function(id, func) {
                this.fetch({url : urlid(this.url, id) + FRIENDS, success: function() { func();} });
        },

        following: function(id, func) {
            this.fetch({url : urlid(this.url, id) + FOLLOWING, success: function() { func();} });
        },

        followers: function(id, func) {
            this.fetch({url : urlid(this.url, id) + FOLLOWERS, success: function() { func();} });
        },

        mf: function(id, func) {
            this.fetch({url : urlid(this.url, id) + FRIENDS_AND_FOLLOWING, success: function() { func();} });
        },

        ms: function(id, func) {
            this.fetch({url : urlid(this.url, id) + FRIENDS_AND_FOLLOWERS, success: function() { func();} });
        },

        parse: function(response){
            for (var i = 0, length = response.length; i < length; i++) {
                if (!(response[i].Photo)) {
                    response[i].Photo = 'img/user.png';
                }
            }

            return response;
        }

    });

});
