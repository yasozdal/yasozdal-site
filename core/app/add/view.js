define(['marionette', 'jquery', 'underscore', 'json2', 'text!add/tpl/form.html',
'text!add/src/datepicker.json', 'jqueryui'], function (Marionette, $, _, JSON, mainTemplate, datepickerLang) {

    'use strict';

    return Marionette.ItemView.extend({

        template: _.template(mainTemplate),

        events: {
            "submit": "add"
        },

        ui: {
            description: "textarea[name=description]",
            date: "input[name=date]",
            marker: ".small-marker",
            location: "input[name=location]",
            hour: "select[name=hour]",
            minute: "select[name=minute]",
            error: ".error",
            success: ".success"
        },

        add: function(e) {
            e.preventDefault();

            var self = this;

            this.trigger('add:start');

            this.ui.error.hide();
            this.ui.success.hide();

            this.model.set({
                Description: this.ui.description.val(),
                EventDate: this.ui.date.val() + " "
                    + this.ui.hour.val() + ":"
                    + this.ui.minute.val() + ":00 GMT"
            });

            this.model.save(this.model.attributes, {
                success: function() {
                    Backbone.history.navigate('/event/' + self.model.get("EventId"), {trigger: true});
                },

                error: function() {
                    self.trigger('add:error');
                    self.$(".error .content").html("Oops! Наверное, вам стоит заполнить все поля.");
                    self.ui.error.show();
                }
            });
        },

        onRender: function() {
            this.ui.error.hide();
            this.ui.success.hide();

            var options = {
                showOn: "both",
                buttonImage: "img/calendar.png",
                buttonImageOnly: true,
                minDate: 0,
                dateFormat: 'D, dd M yy'
            };

            this.ui.date.datepicker($.extend(JSON.parse(datepickerLang), options));
            this.ui.date.datepicker('setDate', new Date());

            function pad (str, max) {
                str = str.toString();
                return str.length < max ? pad("0" + str, max) : str;
            }

            for (var i = 0; i < 23; i++) {
                this.ui.hour.append($("<option></option>").text(i));
            }

            this.ui.hour.append($("<option>j</option>").attr("selected", "selected").text(i));

            for (var j = 0; j < 55; j += 5) {
                this.ui.minute.append($("<option></option>").text(pad(j, 2)));
            }

            this.ui.minute.append($("<option>j</option>").attr("selected", "selected").text(pad(j, 2)));
        }

    });

});