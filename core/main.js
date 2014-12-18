require.config({

    baseUrl: 'core/lib',

    paths: {
        app: '../app',
        layout: '../app/layout',
        header: '../app/header',
        external: '../app/external',
        common: '../app/common',
        add: '../app/add',
        session: '../app/session/model',
        login: '../app/login',
        register: '../app/register',
        event: '../app/event',
        events: '../app/events',
        feed: '../app/feed',
        profile: '../app/profile',
        home: '../app/home',
        text: 'plugins/require/text',
        async: 'plugins/require/async',
        gmaps: 'http://maps.google.com/maps/api/js?v=3.9&sensor=false&libraries=places',
        marionette: 'plugins/backbone/marionette',
        jqueryui: 'plugins/jquery/jquery-ui',
        signalr: 'plugins/jquery/signalr',
        signalrHubs: 'plugins/jquery/signalr/hubs?'
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
        },
        'jqueryui': {
            deps: ['jquery']
        },
        'signalr': {
            deps: ['jquery']
        },
        'signalrHubs': {
            deps: ['signalr']
        },
        'plugins/jquery/perfect-scrollbar': {
            deps: ['jquery']
        }
    }
});

require(['app/app'], function (app) {

    app.start();

});