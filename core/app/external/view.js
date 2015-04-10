define(['marionette', 'underscore', 'text!external/tpl/view.html'], function (Marionette, _, mainTemplate) {

    'use strict';

    return Marionette.ItemView.extend({

        template: _.template(mainTemplate),

        events: {
            "click .vkontakte": "vkontakte",
            "click .twitter": "twitter"
        }

    });

});