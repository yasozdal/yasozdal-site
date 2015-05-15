define(['backbone', 'jquery', 'app/config', 'signalr', 'signalrHubs'], function (Backbone, $, config) {

    'use strict';

    return Backbone.Collection.extend({

        url: config.API + 'Events',

        initialize: function() {
            var self = this;
            this.fetch({ data: { count: 15 } });

            $.connection.hub.url = config.SignalR;
            var hub = $.connection.eventsHub;
            hub.client.broadcastNewEvent = function (eventId) {
                self.fetchUntil(eventId);
            };
            $.connection.hub.start();
        },

        parse: function(response) {
            return response.reverse();
        },

        comparator: function(event) {
            return -event.get('Id');
            //т.к. у нас всеобщий Id для событий, то сортировать по нему равносильно
            //сортировке по времени... вообще один Id для всех событий не самая лучшая идея, или нет?
        },

        fetchUntil: function(eventId) {
            var self = this;
            if (!(this.find(function(event) { return event.get("Id") == eventId; }))) {
                self.fetch({
                    remove: false,
                    data: { count: 1 },
                    success: function() {
                        self.fetchUntil(eventId);
                    }
                });
            }
        },

        more: function(options) {
            options = options || {};
            options.success = options.success || function() {};
            this.fetch({ remove: false, data: { count: 10, offset: this.length }, success: options.success });
        }

    });

});