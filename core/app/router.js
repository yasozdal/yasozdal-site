define(['marionette'], function (Marionette) {

    'use strict';

    return Marionette.AppRouter.extend({

        appRoutes: {
            "": "home",
            "feed": "feed",
            "add": "add",
            "event/:id": "event",
            "access:options": "external",
            ":username": "profile"
        }

    });

});