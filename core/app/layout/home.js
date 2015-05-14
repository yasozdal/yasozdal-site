define(['marionette', 'underscore', 'text!layout/home/home.html'], function (Marionette, _, mainTemplate) {

    'use strict';

    return Marionette.LayoutView.extend({

        template: _.template(mainTemplate),

        ui: {
            registerLink: ".change .register",
            loginLink: ".change .login",
            register: "#register",
            login: "#login"
        },

        regions: {
            login: "#login",
            register: "#register",
            external: "#external"
        },

        events: {
            "click .change .login": function() {
                this.ui.register.hide();
                this.ui.login.fadeIn();
                this.ui.loginLink.hide();
                this.ui.registerLink.show();
            },
            "click .change .register": function() {
                this.ui.login.hide();
                this.ui.register.fadeIn();
                this.ui.registerLink.hide();
                this.ui.loginLink.show();
            }
        },

        onRender: function() {
            this.ui.login.hide();
            this.ui.registerLink.hide();
        }

    });

});