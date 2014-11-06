define(['jquery', 'backbone', 'models/register',
'text!tpl/register.html', 'json2'], function ($, Backbone, Model, mainTemplate) {

    return Backbone.View.extend({

        model: new Model(),

        id: 'register',

        template: _.template(mainTemplate),

        events: {
            submit: "register"
        },

        initialize: function() {
            this.listenTo(this.model, 'error', this.handleError)
        },

        handleError: function(model, xhr, options) {
            var error = JSON.parse(xhr.responseText);
            var description = 'Oops! ';

            for (var property in error['ModelState']) {
                if (error['ModelState'].hasOwnProperty(property)) {
                    for(var i = 0; i < error['ModelState'][property].length; i++) {
                        description += error['ModelState'][property][i]
                    }
                }
            }

            this.$('.error').html(description);
        },

        register: function(e) {
            e.preventDefault();

            /*
            лучше попросить сервер использовать эту модель

            this.model.set({
                UserName: this.$('input[name=username]').val(),
                Email: this.$('input[name=email]').val(),
                Password: this.$('input[name=password]').val()})
            })

            */

            this.model.set({
                UserName: this.$('input[name=username]').val(),
                Password: this.$('input[name=password]').val(),
                ConfirmPassword: this.$('input[name=password]').val()
            })
        },

        render: function () {
            this.$el.html(this.template());
            return this;
        }

    });

});