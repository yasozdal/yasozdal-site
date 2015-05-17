define(['marionette', 'underscore', 'text!friends/tpl/elem.html', 'friend/model'],
    function (Marionette, _, mainTemplate) {

        'use strict';

        return Marionette.ItemView.extend({

            template: _.template(mainTemplate)

        });

    });
