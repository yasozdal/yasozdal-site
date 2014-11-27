define(['marionette', 'underscore', 'text!layout/home/home.html'], function (Marionette, _, mainTemplate) {

    'use strict';

    return Marionette.LayoutView.extend({

        template: _.template(mainTemplate),

        regions: {
            login: "#login",
            register: "#register"
        }

    });

});