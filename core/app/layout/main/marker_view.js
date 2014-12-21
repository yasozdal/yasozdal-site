define(['marionette', 'underscore', 'text!layout/main/marker.html'], function (Marionette, _, mainTemplate) {

    'use strict';

    return Marionette.ItemView.extend({

        template: _.template(mainTemplate),

        templateHelpers: {
            Description: ''
        },

        onBeforeRender: function() {
            var description = this.model.get("Description");
            if (description.length > 100) {
                this.templateHelpers.Description = description.substring(0, 25) + "...";
            } else {
                this.templateHelpers.Description = description;
            }
        }

    });

});