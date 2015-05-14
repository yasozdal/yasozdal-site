define(['backbone', 'plugins/date'], function (Backbone) {

    'use strict';

    return Backbone.Model.extend({
        idAttribute: 'EventId',

        parse: function(response) {
            var self = this;

            if (!(response.User.Photo)) {
                response.User.Photo = 'img/user.png';
            }

            //yyyy-MM-ddThh:mm:ss
            var eventDate = Date.parse(response.EventDate.slice(0, -1));
            var dateCreate = Date.parse(response.DateCreate.slice(0, -1));
            response.EventDate = eventDate.toString("dd MMM HH:mm");
            response.DateCreate = dateCreate.toString("dd MMM HH:mm");
            response.Location = 'У чёрта на куличиках!';
            response.Location = response.LocationCaption === 'unknown' ? response.Location :
                (response.LocationCaption || response.Location);
            delete response.LocationCaption;

            return response;
        }
    });

});