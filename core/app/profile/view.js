define(['marionette', 'underscore'], function (Marionette, _) {

    'use strict';

    return Marionette.ItemView.extend({
        template: _.template('<div><a href="#event/10">mockmockmock!</a></div>')

    });

});