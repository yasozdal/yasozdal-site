define(['marionette', 'underscore'], function (Marionette, _) {

    'use strict';

    return Marionette.ItemView.extend({
        template: _.template('<div><img src="img/coming_soon.png" class="coming-soon" /></div>')

    });

});