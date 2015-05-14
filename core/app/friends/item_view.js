define(['marionette', 'underscore', 'text!friends/tpl/friend.html', 'friend/model'],
    function (Marionette, _, mainTemplate, Model) {

    'use strict';

    return Marionette.ItemView.extend({

        template: _.template(mainTemplate),

        ui: {
            button_unfollow: '.unfollow',
            button_follow: '.follow',
            cancel: '.cancel',
            userinfo: '.userinfo',
            userpic: 'userpic'
        },

        events: {
            'click @ui.button_unfollow': 'unfollow',
            'click @ui.button_follow': 'follow'
        },

        unfollow: function() {
            var model = new Model();
            model.unfollow(this.model.get("UserId"));
            this.ui.button_unfollow.hide();
            this.ui.userpic.hide();
            this.ui.userinfo.hide();
            this.ui.cancel.show();
        },

        follow: function() {
            var model = new Model();
            model.follow(this.model.get("UserId"));
            this.ui.button_unfollow.show();
            this.ui.userpic.show();
            this.ui.userinfo.show();
            this.ui.cancel.hide();
        },

        onRender: function() {
            this.ui.cancel.hide();
        }
    });

});
