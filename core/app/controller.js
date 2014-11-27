define(['backbone', 'marionette', 'session'], function (Backbone, Marionette, session) {

    'use strict';

    var main;

    var history = { previous: 'feed', name: 'лента' };

    function mainContent (view, callback) {

        callback = callback || function () {};

        require(['layout/main'], function (Layout) {
            if (main.currentView instanceof Layout) {
                main.currentView.content.show(view);

                callback();
            } else {
                require(['layout/main/maps', 'layout/main/collection', 'layout/main/model',
                'header/view', 'header/model'], function (Map, Collection, Model, HeaderView, HeaderModel) {
                    main.show(new Layout({ model: new Map(), collection: new Collection([], { model: Model }) }));
                    main.currentView.header.show(new HeaderView({ model: new HeaderModel() }));
                    main.currentView.content.show(view);

                    callback();
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
                require(['layout/home', 'login/view', 'register/view', 'login/model',
                    'register/model'], function(Layout, LoginView, RegisterView, LoginModel, RegisterModel) {

                    main.show(new Layout());
                    main.currentView.login.show(new LoginView({ model: new LoginModel() }));
                    main.currentView.register.show(new RegisterView({ model: new RegisterModel() }));

                });
            }
        },

        feed: function () {
            if (sessionExists()) {

                history = { previous: Backbone.history.fragment, name: 'лента' };

                require(['feed/layout', 'feed/collection_view',
                'feed/item_view'], function (Layout, CollectionView, ItemView) {
                    var view = new Layout();

                    mainContent(view, function() {
                        var content = main.currentView.content.currentView;

                        content.entries.show(new CollectionView({
                            collection: main.currentView.collection,
                            //collection: new Collection([], { model: Model }),
                            //возможно при очистке представления чистит модель (вряд ли)
                            childView: ItemView
                        }));
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
                    mainContent(view);
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

        new: function() {
            if (sessionExists()) {

                require(['new/view', 'new/model'], function (View, Model) {
                    var view = new View({ templateHelpers: history , model: new Model() });
                    mainContent(view);
                });

            } else {
                Backbone.history.navigate('/', { trigger: true });
            }
        }

    });

});