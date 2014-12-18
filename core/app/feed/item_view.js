define(['marionette', 'underscore', 'text!feed/tpl/entry.html'], function (Marionette, _, mainTemplate) {

    'use strict';

    return Marionette.ItemView.extend({

        template: _.template(mainTemplate),

        templateHelpers: {
            Location: ''
        },

        onBeforeRender: function() {
            this.templateHelpers.Location = this.model.get("Location").substring(0, 25) + "...";
        }

    });

});