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

    function sessionAction(options) {
        options.exists = options.exists || function() { Backbone.history.navigate('/feed', { trigger: true }); };
        options.missing = options.missing || function() { Backbone.history.navigate('/', { trigger: true }); };

        if (sessionExists()) {
            options.exists(); //если пользователь авторизован
        } else {
            options.missing(); //если пользователь НЕ авторизован
        }
    }

    function EmptyPage() {
        require(['empty/view'], function (View) {
            var view = new View({});
            mainContent(view);
        });
    }

    return Marionette.Controller.extend({

        initialize: function(options) {
            main = options.main;
        },

        home: function () {
            sessionAction({
                missing: function() {
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
                }
            });
        },

        event: function(eventid) {
            sessionAction({
                exists: function() {
                    require(['event/layout'], function (Layout) {
                        var view = new Layout({ templateHelpers: history });
                        mainContent(view, function() {
                            main.currentView.header.currentView.dropup();
                        });
                    });
                }
            });
        },

        profile: function(userid) {
            sessionAction({
                exists: function() {
                    require(['profile/view', 'profile/model', 'friend/collection', 'header/model'],
                    function (View, Model, FriendCollection, Header) {
                        var model = new Model({ UserId: userid});
                        var collection = new FriendCollection();
                        var header = new Header();

                        header.fetch({
                            success: function () {
                                collection.followers(userid, function () {
                                    if (userid == header.get('UserId')){
                                        model.set("is_following", 0);
                                    }
                                    else {
                                        if (collection.findWhere({UserId: parseInt(header.get("UserId"))})) {
                                            model.set("is_following", 1);
                                        }
                                        else {
                                            model.set("is_following", 2);
                                        }
                                    }

                                });

                                model.set("Followers", collection.length);

                                collection.mates(userid, function(){
                                    model.set("Mates", collection.length);

                                    collection.following(userid, function(){
                                        model.set("Following", collection.length);

                                        model.info(function() {
                                            var view = new View({ templateHelpers: history, model: model});
                                            mainContent(view);
                                        });
                                    });
                                });
                            }
                        });

                    });
                }
            });
        },

        add: function() {
            sessionAction({
                exists: function() {
                    require(['add/view', 'event/model'], function (View, Model) {
                        var view = new View({ templateHelpers: history , model: new Model() });
                        mainContent(view, function() {
                            main.currentView.enableMarker();
                        });
                    });
                }
            });
        },

        friends: function() {
            sessionAction({
                exists: function() {
                    require(['friends/collection_view', 'friends/item_view', 'friend/collection',
                        'friends/empty_view'],
                    function (CollectionView, ItemView, CollectionModel, EmptyView) {
                        var collection = new CollectionModel();

                        collection.mates(null, function() {
                            if (collection.length > 0){
                                mainContent(new CollectionView({
                                    collection: collection,
                                    childView: ItemView
                                }));
                            } else {
                                mainContent(new EmptyView());
                            }

                        });
                    });
                }
            });
        },

        talks: function() {
            sessionAction({
                exists: function() {
                    EmptyPage();
                }
            });
        },

        coffee: function() {
            sessionAction({
                exists: function() {
                    EmptyPage();
                }
            });
        },

        settings: function() {
            sessionAction({
                exists: function() {
                    EmptyPage();
                }
            });
        }

    });

});