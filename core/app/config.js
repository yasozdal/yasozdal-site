define(['marionette'], function (Marionette) {

    var Config = Marionette.Object.extend({

        ROOT: 'http://customer87-001-site1.myasp.net/',
        API: 'http://customer87-001-site1.myasp.net/api/'

    });

    return new Config();
});