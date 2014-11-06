define(['jquery', 'backbone', 'views/login', 'views/register',
'text!tpl/home.html', 'plugins/backbone.subviews'], function ($, Backbone, Login, Register, mainTemplate) {

    return Backbone.View.extend({

        template: _.template(mainTemplate),

        initialize: function () {
            Backbone.Subviews.add(this);
        },

        subviewCreators: {

            "login": function() {
                return new Login();
            },

            "register": function() {
                return new Register();
            }

        },

        render: function () {
            this.$el.html(this.template());
            return this;
        }

    });

});