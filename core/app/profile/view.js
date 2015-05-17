define(['marionette', 'underscore', 'text!profile/tpl/profile.html', 'friend/model',
    'friends/collection_view', 'friends/item_view'],
    function (Marionette, _, mainTemplate, Model, CollectionView, View) {

    'use strict';

    return Marionette.ItemView.extend({
        template: _.template(mainTemplate),

        ui: {
            button_unfollow: '.unfollow',
            button_follow: '.follow'
        },

        events: {
            'click @ui.button_unfollow': 'unfollow',
            'click @ui.button_follow': 'follow'
        },

        unfollow: function() {
            var model = new Model();
            model.unfollow(this.model.get("UserId"));
            this.ui.button_unfollow.hide();
            this.ui.button_follow.show();
        },

        follow: function() {
            var model = new Model();
            model.follow(this.model.get("UserId"));
            this.ui.button_follow.hide();
            this.ui.button_unfollow.show();
        },

        onRender: function () {
            var is_following = this.model.get('is_following');

            if (is_following == 0) {
                this.ui.button_follow.hide();
                this.ui.button_unfollow.hide();
            } else {
                if (is_following == 1){
                    this.ui.button_follow.hide();
                }
                else {
                    this.ui.button_unfollow.hide();
                }
            }
        }


    });

});