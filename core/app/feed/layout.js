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

        more: function() {
            this.entries.currentView.more();
        }

    });

});