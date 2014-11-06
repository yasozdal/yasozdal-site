define(['jquery', 'backbone'], function ($, Backbone) {

    var App = Backbone.Model.extend({

        ROOT: 'http://customer87-001-site1.myasp.net',
        API: 'http://customer87-001-site1.myasp.net/api',

    });

    return new App();
});