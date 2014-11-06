define(['jquery', 'backbone', 'models/login', 'text!tpl/login.html',
'models/session', 'json2'], function ($, Backbone, Model, mainTemplate, session) {

    return Backbone.View.extend({

        model: new Model(),

        id: 'login',

        template: _.template(mainTemplate),

        events: {
            "submit": "login"
        },

        initialize: function() {
            this.listenTo(session, 'error', this.handleError)
        },

        handleError: function(model, xhr, options) {
            var error = JSON.parse(xhr.responseText);
            this.$('.error').html('Oops! ' + error['error_description']);
        },

        login: function(e) {
            e.preventDefault();

            this.model.set({
                UserName: this.$('input[name=username]').val(),
                Password: this.$('input[name=password]').val()
            });
        },

        render: function () {
            this.$el.html(this.template());
            return this;
        }

    });

});
