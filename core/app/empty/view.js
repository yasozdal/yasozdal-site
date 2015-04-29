define(['marionette', 'underscore', 'text!empty/tpl/empty.html'], function (Marionette, _, mainTemplate) {

    'use strict';

    return Marionette.ItemView.extend({
        template: _.template(mainTemplate)

    });

});
