define(['marionette'], function (Marionette) {

    var Config = Marionette.Object.extend({

        ROOT: 'http://icreate.azurewebsites.net/',
        API: 'http://icreate.azurewebsites.net/api/',
        SignalR: 'http://icreate.azurewebsites.net/signalr'

    });

    return new Config();
});