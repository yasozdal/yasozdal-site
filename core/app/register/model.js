define(['backbone', 'app/config', 'session'], function (Backbone, config, session) {

    'use strict';

    return Backbone.Model.extend({

        url: config.API + '/Account/Register',

        sync: function(method, model, options) {
            options.headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            };

            options.type = 'POST';

            Backbone.originalSync(method, model, options);
        },

        /*defaults: {
         UserName: '',
         Email: '',
         Password: ''
         },*/

        defaults: {
            UserName: '',
            Password: '',
            ConfirmPassword: ''
        },

        initialize: function() {
            this.on('change', this.register);
            this.listenTo(session, 'sync', this.logged);
        },

        logged: function(model, resp, options) {
            this.trigger('logged');
        },

        /*parse: function(response) {
            if (JSON.stringify(response).length > 0) {
                return response;
            } else {
                return {};
            }
        },*/

        register: function() {
            var self = this;
            // когда сервер начнет возвращать пустой объект, все будет ок!
            this.save(this.attributes, { success: function() { session.login(self.attributes); } });
        }

    });

});