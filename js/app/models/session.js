define(['backbone', 'models/app', 'json2'], function (Backbone, app) {

    var Session = Backbone.Model.extend({

        url: app.ROOT + '/Token',

        //по идее много локалстораджа мне не надо в том ключе что предоставляет его плагин (работй только со стораджеем!)
        //потому тут надо наверно напрямую сделать, а везде в остальых местах использовать плагины именно для кеширования
        //кеш это очень тяжелая задача... надо бы ее пока отложить, снчала все протестить и написать, а потом уже
        //устранять бутылочное горлышко. но в общем наверно нужно использовать модели HTTP Last-Modified и ETag

        /* что хочу? хочу чтобы всегда отправляло запросы, но получало только измененную инфу или тег, что все осталось
        * как было. потом то что получил добавлять в кеш и в страницу. когда офлайн не давать ничего добавлять
        * (красивенько) и выводить кеш. короче кеш только для офлайновой работы и для того чтобы мержить его с теми
        * новыми данными что пришлет сервак (ну и очевидно для бутстрапа).
        * но т.к. пока получаем все данные, кеш только для оффлайна...
        * */

        //backbone.js mobile????
        //зарегаться на форсквэр

        /* по пунктам: поправить потом перенавправление на вид с кнопкой выхода, получение всех событий
         * и синхронизация с сигналэром, добавление события, просмотр событий на карте и нормальное создание
          * с использованием карты*/
        sync: function(method, model, options) {
            if (method === 'read') {
                options.type = 'POST';
                options.headers = {
                    'Content-Type': 'application/x-www-form-urlencoded'
                };

                return Backbone.originalSync(method, model, options);
            } else {
                localStorage.setItem('session', JSON.stringify({ token: this.getToken(), expires: this.get('expires') }));
            }
        },

        defaults: {
            token: '',
            expires: (new Date).getTime()
        },

        initialize: function() {
            var session = JSON.parse(localStorage.getItem('session')), token = '';

            if (session !== null) {
                if (Date.parse(session.expires) > (new Date).getTime()) {
                    token = '';
                } else {
                    token = session.token;
                }
            }

            this.set({ token: token});

            this.on('change', this.save)
        },

        parse: function (response) {
            return {
                token: response.access_token,
                expires: response.expires_in + (new Date).getTime()
            };
        },

        getToken: function() {
            return this.get('token');
        },

        login: function (options) {
            options.data = 'grant_type=password&username='
                + options.UserName + '&password=' + options.Password;

            options.success = function() {
                Backbone.history.navigate('/feed', {trigger: true});
            };

            //delete options.UserName;
            //delete options.Password;

            this.fetch(options);
        },

        logout: function () {
            this.set({ token: '' });
        }

    });

    return new Session();
});