define(['marionette', 'underscore', 'text!friends/tpl/no_friend.html'],
    function (Marionette, _, mainTemplate) {

        'use strict';

        return Marionette.ItemView.extend({

            template: _.template(mainTemplate)

        });

    });
