define(['marionette'], function (Marionette) {

    'use strict';

    return Marionette.AppRouter.extend({

        appRoutes: {
            "": "home",
            "feed": "feed",
            "new": "new",
            "event/:id": "event",
            ":username": "profile"
        }

    });

});