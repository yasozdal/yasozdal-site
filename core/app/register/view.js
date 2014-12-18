define(['marionette', 'underscore', 'json2',
'text!register/tpl/form.html'], function (Marionette, _, JSON, mainTemplate) {

    'use strict';

    return Marionette.ItemView.extend({

        modelEvents: {
            "error": "handleError",
            "logged": "logged"
        },

        template: _.template(mainTemplate),

        events: {
            "submit": "register"
        },

        ui: {
            username: "input[name=username]",
            password: "input[name=password]",
            email: "input[name=email]",
            error: ".error"
        },

        handleError: function(model, xhr, options) {
            var error = JSON.parse(xhr.responseText);
            var description = 'Oops! ';

            for (var property in error['ModelState']) {
                if (error['ModelState'].hasOwnProperty(property)) {
                    for(var i = 0; i < error['ModelState'][property].length; i++) {
                        description += error['ModelState'][property][i]
                    }
                }
            }

            this.$('.error .content').html(description);
            this.ui.error.show();
        },

        logged: function() {
            Backbone.history.navigate('/feed', {trigger: true});
        },

        onRender: function() {
            this.ui.error.hide();
        },

        register: function(e) {
            e.preventDefault();

            /*
            лучше попросить сервер использовать эту модель

            this.model.set({
                UserName: this.$('input[name=username]').val(),
                Email: this.$('input[name=email]').val(),
                Password: this.$('input[name=password]').val()})
            })

            */

            this.model.set({
                UserName: this.ui.username.val(),
                Password: this.ui.password.val(),
                ConfirmPassword: this.ui.password.val()
            })
        }

    });

});