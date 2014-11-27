define(['backbone', 'json2', 'app/config'], function (Backbone, JSON, config) {

    'use strict';

    var Session = Backbone.Model.extend({

        url: config.ROOT + 'Token',

        sync: function(method, model, options) {
            if (method === 'read') {
                options.type = 'POST';
                options.headers = {
                    'Content-Type': 'application/x-www-form-urlencoded'
                };

                return Backbone.originalSync(method, model, options);
            } else {
                localStorage.setItem('session', JSON.stringify({ token: this.getToken(),
                    expires: this.get('expires') }));
            }
        },

        defaults: {
            token: '',
            expires: (new Date).getTime()
        },

        initialize: function() {
            var session = JSON.parse(localStorage.getItem('session')), token = '';

            if (session !== null) {
                if (Date.parse(session.expires) > (new Date).getTime()) {
                    token = '';
                } else {
                    token = session.token;
                }
            }

            this.set({ token: token});

            this.on('change', this.save);
        },

        parse: function (response) {
            return {
                token: response.access_token,
                expires: response.expires_in + (new Date).getTime()
            };
        },

        getToken: function() {
            return this.get('token');
        },

        login: function (options) {
            options.data = 'grant_type=password&username='
                + options.UserName + '&password=' + options.Password;

            //delete options.UserName;
            //delete options.Password;

            this.fetch(options);
        },

        logout: function () {
            this.set({ token: '' });
        }

    });

    return new Session();
});