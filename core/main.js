require.config({

    baseUrl: 'core/lib',

    paths: {
        app: '../app',
        layout: '../app/layout',
        header: '../app/header',
        common: '../app/common',
        new: '../app/new',
        session: '../app/session/model',
        login: '../app/login',
        register: '../app/register',
        event: '../app/event',
        feed: '../app/feed',
        profile: '../app/profile',
        home: '../app/home',
        text: 'plugins/require/text',
        async: 'plugins/require/async',
        gmaps: 'http://maps.google.com/maps/api/js?v=3.9&sensor=false',
        marionette: 'plugins/backbone/marionette'
    },

    shim: {
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'marionette': {
            deps: ['backbone'],
            exports: 'Marionette'
        },
        'underscore': {
            exports: '_'
        }
    }
});

require(['app/app'], function (app) {

    app.start();

});