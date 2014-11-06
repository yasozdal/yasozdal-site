define(['backbone', 'models/session'], function (Backbone, session) {

    return Backbone.Model.extend({

        defaults: {
            UserName: '',
            Password: ''
        },

        initialize: function() {
            this.on('change', this.login);
        },

        login: function() {
            session.login(this.attributes);
        }

    });

});