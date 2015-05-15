define(['jquery', 'backbone', 'marionette', 'session'], function ($, Backbone, Marionette, session) {

    'use strict';

    var main;

    var history = { previous: 'feed', name: 'вернуться в ленту' };

    var mainLayoutShow = (function() {
        var layout, deferred;

        return function () {
            deferred = new $.Deferred();

            require(['main/layout', 'main/map_model', 'events/collection', 'event/model', 'header/view',
                'header/model'], function (Layout, Map, Collection, EventModel, HeaderView, HeaderModel) {
                if (main.currentView instanceof Layout) {
                    deferred.resolve();
                } else {
                    var model = new HeaderModel();

                    var fetchPromise = model.fetch({
                        success: function() {
                            layout.header.show(new HeaderView({ model: model }));
                        }
                    });

                    layout = new Layout({
                        model: new Map(),
                        collection: new Collection([], {
                            model: EventModel
                        }),
                        headerPromise: fetchPromise
                    });

                    layout.on("ready", function() {
                        deferred.resolve();
                    });

                    main.show(layout);
                }
            });

            return deferred.promise();
        }
    })();

    function sessionExists() {
        return session.getToken() !== '';
    }

    function sessionAction(options) {
        options.exists = options.exists || function() { Backbone.history.navigate('/feed', { trigger: true }); };
        options.missing = options.missing || function() { Backbone.history.navigate('/', { trigger: true }); };

        if (sessionExists()) {
            options.exists(); //если пользователь авторизован
        } else {
            options.missing(); //если пользователь НЕ авторизован
        }
    }

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

    return Marionette.Controller.extend({

        initialize: function(options) {
            main = options.main;
        },

        home: function () {
            sessionAction({
                missing: function() {
                    require(['home/layout', 'login/view', 'register/view', 'external/view', 'login/model',
                        'register/model', 'external/model'], function(Layout, LoginView, RegisterView, ExternalView,
                                                                      LoginModel, RegisterModel, ExternalModel) {

                        var layout = new Layout();
                        var model = new ExternalModel();
                        layout.on("render", function() {
                            layout.login.show(new LoginView({ model: new LoginModel() }));
                            layout.register.show(new RegisterView({ model: new RegisterModel() }));
                            layout.external.show(new ExternalView({ model: model }));
                        });

                        model.fetch({
                            success: function() {
                                main.show(layout);
                            }
                        });


                    });
                }
            });
        },

        external: function(options) {
            var params = options.match(/^_token=([A-z0-9_-]*).*expires_in=([0-9]*)/);
            require(['session'], function(session) {
                session.setToken(params[1], params[2]);
                Backbone.history.navigate('/feed', { trigger:true });
            });
        },

        feed: function () {
            sessionAction({
                exists: function() {
                    history = { previous: Backbone.history.fragment, name: 'вернуться в ленту' };

                    $.when(mainLayoutShow()).done(function() {
                        require(['feed/layout', 'feed/collection_view',
                        'feed/item_view'], function (Layout, CollectionView, ItemView) {
                            main.currentView.content.show(new Layout());
                            var content = main.currentView.content.currentView;

                            content.entries.show(new CollectionView({
                                collection: main.currentView.collection,
                                childView: ItemView
                            }));

                            main.currentView.enableEndlessScroll();
                        });
                    });
                }
            });
        },

        event: function(eventid) {
            sessionAction({
                exists: function() {
                    $.when(mainLayoutShow()).done(function() {
                        require(['event/layout', 'event/model'], function (Layout, Model) {
                            var layout = main.currentView;

                            layout.content.empty();
                            spinner.spin(layout.content.$el.get(0));
                            layout.header.currentView.dropup();

                            var model = new Model({ id: eventid });

                            model.fetch({
                                success: function() {
                                    spinner.stop();
                                    layout.content.show(new Layout({ templateHelpers: history, model: model }));
                                }
                            });
                        });
                    });
                }
            });
        },

        profile: function(username) {
            sessionAction({
                exists: function() {
                    history = { previous: Backbone.history.fragment, name: 'вернуться в облачко' };
                    $.when(mainLayoutShow()).done(function() {
                        require(['profile/view', 'profile/model'], function (View, Model) {
                            main.currentView.content.show(new View({ model: new Model({ username: username }) }));
                        });
                    });
                }
            });
        },

        add: function() {
            sessionAction({
                exists: function() {
                    $.when(mainLayoutShow()).done(function() {
                        require(['add/view', 'event/model'], function (View, Model) {
                            main.currentView.content.show(new View({ templateHelpers: history , model: new Model() }));
                            main.currentView.enableMarker();
                        });
                    });
                }
            });
        }

    });

});