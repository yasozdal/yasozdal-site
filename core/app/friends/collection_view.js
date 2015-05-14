define(['marionette', 'underscore'], function (Marionette, _) {

    'use strict';

    return Marionette.CollectionView.extend({

        more: function() {
            this.collection.more();
        }

    });

});