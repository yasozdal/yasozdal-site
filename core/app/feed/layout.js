define(['marionette', 'underscore', 'text!feed/tpl/layout.html'], function (Marionette, _, mainTemplate) {

    'use strict';

    return Marionette.LayoutView.extend({

        template: _.template(mainTemplate),

        regions: {
            entries: "#entries"
        },

        /*events: {
            "mouseover #entries": "readall"
        },

        readall: function() {
            this.$("#entries .unread").removeClass('unread');
        },*/

        more: function() {
            this.entries.currentView.more();
        }

    });

});