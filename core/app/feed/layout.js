define(['marionette', 'underscore', 'text!feed/tpl/layout.html',
'common/spinner'], function (Marionette, _, mainTemplate, Spinner) {

    'use strict';

    return Marionette.LayoutView.extend({

        template: _.template(mainTemplate),

        regions: {
            entries: {
                regionClass: Spinner,
                selector: "#entries"
            }
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