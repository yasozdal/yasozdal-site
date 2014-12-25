define(['backbone', 'app/confiq'], function (Backbone, confiq) {

    'use strict';

    return Backbone.Model.extend({
        url: conqiq.API + 'friends/',

        follow: function(id) {
            this.fetch({url: this.url + 'follow/' + id});
        },

        unfollow: function(id) {
            this.fetch({url: this.url + 'unfollow/' + id});
        }
    });

});