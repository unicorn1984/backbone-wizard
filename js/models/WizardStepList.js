/**
 * Created by pzf on 2015/7/17.
 */

Wizard.WizardStepList = Backbone.Collection.extend({

    model: Wizard.WizardStep,

    current: null,

    addOne: function (item) {
        var newModel = new Wizard.WizardStep();
        newModel.set("step", item.step);
        newModel.set("label", item.label);
        newModel.set("index", item.index);
        newModel.set("_id", item.step);
        if (item.stepstart)
            newModel.set("stepstart", item.stepstart);
        if (item.stepend)
            newModel.set("stepend", item.stepend);
        this.push(newModel);
    },
    currentStep: function (stepItem) {
        stepItem.set('current', true);
    },
    noCurrentStep: function (stepItem) {
        stepItem.set('current', false);
    },
    ok: function (stepItem) {
        stepItem.set('ok', true);
    },
    noOk: function (stepItem) {
        stepItem.set('ok', false);
    },
    start: function () {
        var start = this.at(0);
        this.currentStep(start);
        this.current = start;
    },
    end: function () {
        var end = this.at(this.length);
        this.currentStep(end);
        this.current = end;
    },
    nextStep: function () {
        var sf = this;

        if (sf.current.stepend) return;
        else {
            sf.ok(sf.current);
            sf.noCurrentStep(sf.current);
            var next = sf.at(sf.current.get('index') + 1);
            sf.currentStep(next);
            sf.current = next;
        }


    },
    previousStep: function () {
        var sf = this;
        if (sf.current.stepstart) return;
        else {

            sf.noCurrentStep(sf.current);
            var previous = sf.at(sf.current.get('index') - 1);
            sf.noOk(previous);
            sf.currentStep(previous);
            sf.current = previous;
        }

    }

});
