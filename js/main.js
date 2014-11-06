require.config({

    baseUrl: 'js/lib',

    paths: {
        app: '../app',
        tpl: '../tpl',
        models: '../app/models',
        views: '../app/views',
        text: 'plugins/text'
    },

    shim: {
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        }
    }
});

require(['backbone', 'app/router', 'models/session'], function (Backbone, Router, session, app) {

    'use strict';

    Backbone.originalSync = Backbone.sync;

    Backbone.sync = function (method, model, options) {
        options.headers = {
            'Authorization': 'Bearer ' + session.getToken(),
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };

        if (method === ('create' || 'update')) {
            options.type = 'POST';
        }

        Backbone.originalSync(method, model, options);
    };

    var router = new Router();

    //Backbone.history.start({ pushState: true });
    Backbone.history.start();
});