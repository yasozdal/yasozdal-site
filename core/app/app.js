define(['backbone', 'marionette', 'app/router', 'app/controller',
'session'], function (Backbone, Marionette, Router, Controller, session) {

    'use strict';

    var app = new Marionette.Application();

    app.addRegions({
        mainRegion: "body"
    });

    app.addInitializer(function(options) {
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

        //у коллекций и композитов свой рендеринг... блин. ну композитов надо хотяб поправить
        Marionette.ItemView.prototype.originalRender = Marionette.ItemView.prototype.render;

        Marionette.ItemView.prototype.render = function() {

            var result = Marionette.ItemView.prototype.originalRender.apply(this);

            result.$el = result.$el.children();
            result.$el.unwrap();
            result.setElement(result.$el);

            return result;

        };

        var router = new Router({ controller: new Controller({ main: app.mainRegion }) });

        //Backbone.history.start({ pushState: true });
        Backbone.history.start();
    });

    return app;

});