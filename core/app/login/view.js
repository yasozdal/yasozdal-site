define(['marionette', 'underscore', 'json2',
'text!login/tpl/form.html'], function (Marionette, _, JSON, mainTemplate) {

    'use strict';

    return Marionette.ItemView.extend({

        modelEvents: {
            "error": "handleError",
            "logged": "logged"
        },

        template: _.template(mainTemplate),

        events: {
            "submit": "login"
        },

        ui: {
            username: "input[name=username]",
            password: "input[name=password]",
            error: ".error"
        },

        handleError: function(model, xhr, options) {
            var error = JSON.parse(xhr.responseText);
            this.$('.error .content').html('Oops! ' + error['error_description']);
            this.ui.error.show();
        },

        onRender: function() {
            this.ui.error.hide();
        },

        logged: function() {
            Backbone.history.navigate('/feed', {trigger: true});
        },

        login: function(e) {
            e.preventDefault();

            this.model.set({
                UserName: this.ui.username.val(),
                Password: this.ui.password.val()
            });
        }

    });

});
