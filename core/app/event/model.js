define(['backbone', 'app/config'], function (Backbone, config) {

    'use strict';

    //стоит знать, что при сохранении сервер возвращает {EventId:int}

    return Backbone.Model.extend({
        url: config.API + 'Events',

        defaults: {
            Latitude: '',
            Longitude: '',
            Description: '',
            EventDate: '',
            CategoryId: '',
            PhotoIds: []
        }
    });

});