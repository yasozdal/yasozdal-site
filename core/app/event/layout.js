define(['marionette', 'underscore', 'text!event/tpl/layout.html',
'common/spinner'], function (Marionette, _, mainTemplate, Spinner) {

    'use strict';

    return Marionette.LayoutView.extend({

        template: _.template(mainTemplate),

        regions: {
            entry: {
                regionClass: Spinner,
                selector: "#entry"
            },
            comments: "#comments"
        }

    });

});