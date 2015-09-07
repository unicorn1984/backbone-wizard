/**
 * Created by pzf on 2015/7/17.
 */

Wizard.WizardStepList = Backbone.Collection.extend({

    model: Wizard.WizardStep,

    current: null,

    _isStart: false,

    _isEnd: false,

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
    stepIsEnd: function (step) {
        if (step.get('index') === this.length - 1)
            return true;
        return false;
    },
    isEnd: function () {
        return this._isEnd;
    },
    isStart: function () {
        return this._isStart;
    },
    isFirst:function(){
        return this.current.get('index') === 0;
    },
    start: function () {
        var start = this.at(0);
        this.currentStep(start);
        this.current = start;
        this._isStart = true;
    },

    end: function () {
        var end = this.at(this.length - 1);
        this.ok(end);
        this.current = end;
        this._isEnd = true;
    },
    endStep: function (step) {
        step.set('ok', true);
        this._isEnd = true;
    },
    nextStep: function () {
        if (!this.isStart())
            return;
        var sf = this;

        if (sf.current.get('stepend')) return;
        else {
            sf.ok(sf.current);
            sf.noCurrentStep(sf.current);
            var next = sf.at(sf.current.get('index') + 1);
            sf.currentStep(next);
            sf.current = next;
            if (this.stepIsEnd(next)) {
                this.endStep(next);
            }
        }


    },
    previousStep: function () {
        if (this.isEnd()) return;
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
