define(['marionette', 'underscore', 'text!header/tpl/view.html'], function (Marionette, _, mainTemplate) {

    'use strict';

    return Marionette.ItemView.extend({

        template: _.template(mainTemplate),

        events: {
            "click .logout": "logout",
            "click .dropdown": "dropdown",
            "click .dropup": "dropup"
        },

        ui: {
            dropup: ".dropup",
            dropdown: ".dropdown",
            logout: ".logout"
        },

        logout: function() {
            this.trigger('logout');
        },

        dropdown: function() {
            this.trigger('drop:down');
            this.ui.dropup.show();
            this.ui.dropdown.hide();
        },

        dropup: function() {
            this.trigger('drop:up');
            this.ui.dropdown.show();
            this.ui.dropup.hide();
        },

        onRender: function() {
            this.ui.dropup.hide();
        }

    });

});
