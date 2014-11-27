define(['marionette', 'underscore', 'json2', 'text!new/tpl/form.html'], function (Marionette, _, JSON, mainTemplate) {

    'use strict';

    return Marionette.ItemView.extend({

        template: _.template(mainTemplate),

        modelEvents: {
            "error": "handleError",
            "sync": "success"
        },

        events: {
            "submit": "add"
        },

        ui: {
            lat: "input[name=lat]",
            lng: "input[name=lng]",
            description: "input[name=description]",
            date: "input[name=date]"
        },

        handleError: function(model, xhr, options) {
            var error = JSON.parse(xhr.responseText);
            var description = 'Oops! ' + JSON.stringify(error);

            this.$('.error').html(description);
        },

        success: function() {
            this.$('.error').html('Good! Добавилось.');
        },

        add: function(e) {
            e.preventDefault();

            this.model.set({
                Latitude: this.ui.lat.val(),
                Longitude: this.ui.lng.val(),
                Description: this.ui.description.val(),
                EventDate: this.ui.date.val()
            });
        }

    });

});