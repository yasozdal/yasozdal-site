define(['marionette'], function (Marionette) {

    'use strict';

    return Marionette.AppRouter.extend({

        appRoutes: {
            "": "home",
            "feed": "feed",
            "add": "add",
            "event/:id": "event",
            "access:options": "external",
            "friends": "friends",
            "talks": "talks",
            "coffee": "coffee",
            "settings": "settings",
            ":username": "profile"
        }

    });

});