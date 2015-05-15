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
            expires: ''
        },

        initialize: function() {
            var session = JSON.parse(localStorage.getItem('session')), token = '', expires= '';

            if (session !== null && !(Date.parse(session.expires) > (new Date).getTime())) {
                token = session.token;
                expires = session.expires;
            }

            this.set({ token: token, expires_in: expires });

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

        setToken: function(token, expires_in) {
            this.set({ token: token, expires: expires_in + (new Date).getTime() })
        },

        login: function (options) {
            options.data = 'grant_type=password&username='
                + options.UserName + '&password=' + options.Password;

            this.fetch(options);
        },

        logout: function () {
            this.set({ token: '' });
            localStorage.removeItem('session');
            this.trigger('logout');
        }

    });

    return new Session();
});