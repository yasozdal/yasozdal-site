define(['backbone', 'app/config'], function (Backbone, config) {

    'use strict';

    return Backbone.Model.extend({

        url: config.API + 'Account/UserInfo',

        defaults: {
            UserName: ''
        }

    });

});