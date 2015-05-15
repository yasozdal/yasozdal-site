define(['marionette', 'underscore', 'text!feed/tpl/entry.html'], function (Marionette, _, mainTemplate) {

    'use strict';

    return Marionette.ItemView.extend({

        template: _.template(mainTemplate),

        templateHelpers: {
            Location: ''
        },

        events: {
            "click .location": "navigate"
        },

        navigate: function() {
            this.model.trigger("navigated", { lat: this.model.get('Latitude'), lng: this.model.get('Longitude') });
        },

        onBeforeRender: function() {
            var location = this.model.get("Location");
            if (location.length > 25) {
                this.templateHelpers.Location = location.substring(0, 25).trim() + "...";
            } else {
                this.templateHelpers.Location = location;
            }
        }

    });

});