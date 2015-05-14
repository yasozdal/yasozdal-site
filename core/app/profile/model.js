define(['backbone', 'app/config'], function (Backbone, config) {

    'use strict';

    return Backbone.Model.extend({
        url: config.API + 'Users/Profile/',

        initialize: function(options) {
            this.UserId = options.UserId;
        },

        info: function(func) {
            var self = this;
            this.fetch({url: self.url + self.UserId, success: function() { func(); }});
        },

        parse: function(response){
            if (!(response.Photo)) {
                response.Photo = 'img/user.png';
            }
            this.UserName = response.UserName;
            return response;
        }
    });

});