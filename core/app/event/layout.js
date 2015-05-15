define(['marionette', 'underscore', 'text!event/tpl/layout.html'], function (Marionette, _, mainTemplate) {

    'use strict';

    return Marionette.LayoutView.extend({

        template: _.template(mainTemplate),

        regions: {
            comments: "#comments"
        },

        events: {
            "click .location": "navigate"
        },

        initialize: function(options) {
            this.templateHelpers = options.templateHelpers;
        },

        navigate: function() {
            this.trigger("navigated", { lat: this.model.get('Latitude'), lng: this.model.get('Longitude') });
        },

        onBeforeRender: function() {
            var location = this.model.get("Location");
            if (location.length > 40) {
                this.templateHelpers.Location = location.substring(0, 40).trim() + "...";
            } else {
                this.templateHelpers.Location = location;
            }
        }

    });

});