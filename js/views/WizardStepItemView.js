Wizard.WizardStepItemView = Backbone.View.extend({

    tagName: 'li',

    className: 'wizard-steps',

    template: Wizard['wizard-stepItem'],

    initialize: function () {
        // this.listenTo(this.model, 'change:', this.render);
        this.listenTo(this.model, 'destroy', this.remove);
        this.listenTo(this.model, 'change', this.render);
    },

    render: function () {
        this.$el.html(this.template(this.model.attributes));
        this.$el.removeClass("stepsover current");
        this.$el.addClass(this.createClass(this.model));
        return this;
    },
    createClass: function (model) {
        var str = '';
        if (model.get('stepstart'))
            str += ' stepstart';
        else if (model.get('stepend'))
            str += ' stepend';

        if (model.get("current")&&model.get("ok"))   //完成状态，即是current又是ok
            str += ' stepsover';
        else if (model.get("current"))
            str += ' stepsover current';
        else if (model.get("ok"))
            str += ' stepsover';
        return str;
    }

});
