define(['backbone', 'marionette', 'session'], function (Backbone, Marionette, session) {

    'use strict';

    var main;

    var history = { previous: 'feed', name: 'ленту' };

    function mainContent (view, callback) {

        callback = callback || function() {};

        require(['layout/main'], function (Layout) {
            if (main.currentView instanceof Layout) {
                main.currentView.content.show(view);

                callback();
            } else {
                require(['layout/main/maps', 'events/collection', 'events/model', 'layout/main/marker_view', 'header/view',
                'header/model'], function (Map, Collection, EventModel, MarkerView, HeaderView, HeaderModel) {
                    main.show(new Layout({
                        model: new Map(),
                        collection: new Collection([], {
                            model: EventModel,
                            markerView: MarkerView
                        })
                    }));

                    var model = new HeaderModel();

                    model.fetch({
                        success: function() {
                            main.currentView.header.show(new HeaderView({ model: model }));
                            callback();
                        }
                    });

                    main.currentView.content.show(view);
                });
            }
        });

    }

    function sessionExists() {
        return session.getToken() !== '';
    }

    return Marionette.Controller.extend({

        initialize: function(options) {
            main = options.main;
        },

        home: function () {
            if (sessionExists()) {
                Backbone.history.navigate('/feed', { trigger: true });
            } else {
                require(['layout/home', 'login/view', 'register/view', 'external/view', 'login/model',
                'register/model', 'external/model'], function(Layout, LoginView, RegisterView, ExternalView,
                LoginModel, RegisterModel, ExternalModel) {

                    main.show(new Layout());
                    main.currentView.login.show(new LoginView({ model: new LoginModel() }));
                    main.currentView.register.show(new RegisterView({ model: new RegisterModel() }));

                    var model = new ExternalModel();
                    model.fetch({
                        success: function() {
                            main.currentView.external.show(new ExternalView({ model: model }));
                        }
                    });

                });
            }
        },

        external: function(options) {
            var params = options.match(/^_token=([A-z0-9_-]*).*expires_in=([0-9]*)/);
            require(['session'], function(session) {
                session.setToken(params[1], params[2]);
                Backbone.history.navigate('/feed', { trigger:true });
            });
        },

        feed: function () {
            if (sessionExists()) {

                history = { previous: Backbone.history.fragment, name: 'ленту' };

                require(['feed/layout', 'feed/collection_view',
                'feed/item_view'], function (Layout, CollectionView, ItemView) {
                    var view = new Layout();

                    mainContent(view, function() {
                        var content = main.currentView.content.currentView;

                        content.entries.show(new CollectionView({
                            collection: main.currentView.collection,
                            childView: ItemView
                        }));

                        main.currentView.enableEndlessScroll();
                    });

                });


            } else {
                Backbone.history.navigate('/', { trigger: true });
            }
        },

        event: function(eventid) {
            if (sessionExists()) {

                require(['event/layout'], function (Layout) {
                    var view = new Layout({ templateHelpers: history });
                    mainContent(view, function() {
                        main.currentView.header.currentView.dropup();
                    });
                });

            } else {
                Backbone.history.navigate('/', { trigger: true });
            }
        },

        profile: function(username) {
            if (sessionExists()) {

                history = { previous: Backbone.history.fragment, name: 'облачко' };

                require(['profile/view', 'profile/model'], function (View, Model) {
                    var view = new View({ model: new Model({ username: username }) });
                    mainContent(view);
                });

            } else {
                Backbone.history.navigate('/', { trigger: true });
            }
        },

        add: function() {
            if (sessionExists()) {

                require(['add/view', 'event/model'], function (View, Model) {
                    var view = new View({ templateHelpers: history , model: new Model() });
                    mainContent(view, function() {
                        main.currentView.enableMarker();
                    });
                });

            } else {
                Backbone.history.navigate('/', { trigger: true });
            }
        }

    });

});