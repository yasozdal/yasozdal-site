define(['marionette', 'underscore', 'text!feed/tpl/entry.html'], function (Marionette, _, mainTemplate) {

    'use strict';

    return Marionette.ItemView.extend({

        template: _.template(mainTemplate)

    });

});