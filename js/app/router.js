define(['jquery', 'backbone', 'models/session'], function ($, Backbone, session) {

    return Backbone.Router.extend({

        routes: {
            "": "home",
            //"about": "about",
            "feed": "feed",
           // "add": "add",
            ":username": "profile"//,
            //":username/:event": "event",
            //"friends": "friends"
        },

        initialize: function() {
            //тут общая оболочка для всех страниц не зареганных
        },

        home: function () {
            if (session.getToken() === '') {

                require(['views/home'], function (View) {
                    var view = new View({ el: $("body") });
                    view.render();
                });

            } else {
                this.navigate('/feed', { trigger: true });
            }
        },

        feed: function () {
            console.log('feed!');
            /*require(['views/feed'], function (View) {
                (new View({ el: $("body") })).render();
            });*/
        },

        profile: function() {
            console.log('profile!');
        }

    });

});