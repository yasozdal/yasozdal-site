define(['backbone', 'common/location', 'plugins/date'], function (Backbone, Location) {

    'use strict';

    return Backbone.Model.extend({
        idAttribute: 'EventId',

        parse: function(response) {
            var self = this;

            if (!(response.User.Photo)) {
                response.User.Photo = 'img/user.png';
            }

            //yyyy-MM-ddThh:mm:ss
            var eventDate = Date.parse(response.EventDate);
            var dateCreate = Date.parse(response.DateCreate);
            response.EventDate = eventDate.toString("dd MMM HH:mm");
            response.DateCreate = dateCreate.toString("dd MMM HH:mm");

            var location = new Location();
            location.geocoding({ Latitude: response.Latitude, Longitude: response.Longitude }).done(function() {
                var result = location.get("results")[0] || { formatted_address: 'У чёрта на куличиках!' };
                self.set({ Location: result.formatted_address  });
            });

            return response;
        }
    });

});