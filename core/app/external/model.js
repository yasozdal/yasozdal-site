define(['backbone', 'app/config'], function (Backbone, config) {

    'use strict';

    return Backbone.Model.extend({

        url: config.API + "Account/ExternalLogins?returnUrl=%2F&generateState=true",

        defaults: {
            Twitter: '',
            Vkontakte: ''
        },


        parse: function (response) {
            return {
                Vkontakte: response[0].Url,
                Twitter: response[1].Url
            };
        }

        /*parse: function (response) {
            var vkontakte = response[0].Url.replace("customer87-001-site1.myasp.net",
                "localhost%3A62577");
            var twitter = response[1].Url.replace("customer87-001-site1.myasp.net",
                "localhost%3A62577");

            return {
                Vkontakte: vkontakte,
                Twitter: twitter
            };
        }*/

    });

});