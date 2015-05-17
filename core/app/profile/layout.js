define(['marionette', 'underscore', 'text!profile/tpl/layout.html', 'common/spinner',
        'friends/collection_view', 'friends/item_view', 'friends/item', 'friend/collection'],
    function (Marionette, _, mainTemplate, Spinner, CollectionView, ItemView, View, Collection) {

    'use strict';

    return Marionette.LayoutView.extend({

        template: _.template(mainTemplate),

        regions: {
            profile: {
                regionClass: Spinner,
                selector: "#profile"
            },
            friends: "#friends"
        },

        triggers: {
            "click .mates": "mates",
            "click .followers": "followers",
            "click .following": "following"
        },

        onRender: function() {
            var self = this;
            var view = View;

            if (self.model.get("is_following") == 0) {
                view = ItemView;
            }

            self.on('mates', function() {
                var collection = new Collection();

                collection.mates(self.model.get("UserId"), function() {
                    self.friends.show(new CollectionView({
                        collection: collection,
                        childView: view
                    }));
                });
            });

            self.on('followers', function() {
                var collection = new Collection();

                collection.followers(self.model.get("UserId"), function() {
                    self.friends.show(new CollectionView({
                        collection: collection,
                        childView: View
                    }));
                });
            });

            self.on('following', function() {
                var collection = new Collection();

                collection.following(self.model.get("UserId"), function() {
                    self.friends.show(new CollectionView({
                        collection: collection,
                        childView: view
                    }));
                });
            });
        }

    });

});
