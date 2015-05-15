define(['marionette', 'underscore', 'json2',
'text!login/tpl/form.html'], function (Marionette, _, JSON, mainTemplate) {

    'use strict';

    var opts = {
        lines: 10,
        length: 12,
        width: 7,
        radius: 25,
        corners: 1,
        rotate: 0,
        direction: 1,
        color: '#c0392b',
        speed: 1,
        trail: 60,
        shadow: false,
        hwaccel: false,
        className: 'spinner',
        zIndex: 2e9,
        top: '50%',
        left: '50%'
    };

    var spinner = new Spinner(opts);

    return Marionette.ItemView.extend({

        modelEvents: {
            "error": "handleError",
            "logged": "logged",
            "change": "change"
        },

        template: _.template(mainTemplate),

        events: {
            "submit": "login"
        },

        ui: {
            username: "input[name=username]",
            password: "input[name=password]",
            error: ".error",
            form: "fieldset"
        },

        handleError: function(model, xhr, options) {
            var error = JSON.parse(xhr.responseText);
            this.$('.error .content').html('Oops! ' + error['error_description']);
            this.ui.error.show();
            spinner.stop();
            this.ui.form.prop("disabled", false);
        },

        onRender: function() {
            this.ui.error.hide();
        },

        change: function() {
            this.ui.form.prop("disabled", true);
            spinner.spin(this.$el.get(0));
            this.model.login();
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
