define(['backbone', 'session'], function (Backbone, session) {

    'use strict';

    return Backbone.Model.extend({

        defaults: {
            UserName: '',
            Password: ''
        },

        initialize: function() {
            this.on('change', this.login);
            this.listenTo(session, 'error', this.handleError);
            this.listenTo(session, 'sync', this.logged);
        },

        logged: function(model, resp, options) {
            this.trigger('logged');
        },

        handleError: function(model, xhr, options) {
            this.trigger('error', model, xhr, options)
        },

        login: function() {
            session.login(this.attributes);
        }

    });

});