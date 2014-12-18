define(['marionette'], function (Marionette) {

    var Config = Marionette.Object.extend({

        ROOT: 'http://nbixman-001-site1.myasp.net/',
        API: 'http://nbixman-001-site1.myasp.net/api/',
        SignalR: 'http://nbixman-001-site1.myasp.net/signalr'

    });

    return new Config();
});