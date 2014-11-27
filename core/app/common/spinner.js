define(['marionette'], function (Marionette) {

    'use strict';

    return Marionette.Region.extend({
        attachHtml: function(view) {
            this.$el.empty().append(view.el);
            this.$el.hide().slideDown('fast');
        }
    });

});