define(['marionette', 'underscore', 'text!header/tpl/view.html'], function (Marionette, _, mainTemplate) {

    'use strict';

    return Marionette.ItemView.extend({

        template: _.template(mainTemplate),

        modelEvents: {
            "change": "update"
        },

        update: function() {
            this.render();
        }

    });

});
