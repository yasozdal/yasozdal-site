define(['backbone', 'app/config', 'session'], function (Backbone, config, session) {

    'use strict';

    return Backbone.Model.extend({

        url: config.API + 'Account/Register',

        sync: function(method, model, options) {
            options.headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            };

            options.type = 'POST';

            Backbone.originalSync(method, model, options);
        },

        defaults: {
            UserName: '',
            Password: '',
            ConfirmPassword: ''
        },

        initialize: function() {
            this.listenTo(session, 'sync', this.logged);
        },

        logged: function(model, resp, options) {
            this.trigger('logged');
        },

        register: function() {
            var self = this;
            this.save(this.attributes, { success: function() { session.login(self.attributes); } });
        }

    });

});