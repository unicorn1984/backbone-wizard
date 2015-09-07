Wizard.WizardStepsView = Backbone.View.extend({

    tagName:  'ul',

    initialize: function(arg) {
        this.steps = arg.steps;
        this.initSteps();
        this.stepList = new Wizard.WizardStepList();
        var steps = [];
        this.listenTo(this.stepList, "add", this.addOne);
        var sf = this;
        _.each(this.steps,function(item,b){
            sf.stepList.addOne(item,b);
        })

    },
    render: function() {
        return this;
    },
    addOne: function(item) {
        var view = new Wizard.WizardStepItemView({model: item});
        this.$el.append(view.render().$el);
    },
    /**
     * 初始化传进来的steps
     * @param item
     */
    initSteps: function () {
        this.steps[0].stepstart = true;
        this.steps[this.steps.length-1].stepend = true;
    },
    start:function(){
        this.stepList.start();
    },
    nextStep:function(){
        this.stepList.nextStep();
    },
    previousStep:function(){
        this.stepList.previousStep();
    },
    end:function(){
        this.stepList.end();
    },
    /**
     * 返回正常的object类，而非backboneModel,backboneModel只能在此类内部使用，对外不暴露
     * @returns {*}
     */
    getCurrentStep:function(){
        var current = this.stepList.current;
        if(!current) return null;
        var sf = this;
        var returnvalue;
        _.each(this.steps,function(item){
            if(current.get('index')===item.index)
                returnvalue = item;
        })
        return returnvalue
    },
    isEnd: function () {
        return this.stepList.isEnd();
    },
    isStart: function () {
        return this.stepList.isStart();
    },
    isFirst:function(){
       return this.stepList.isFirst();
    }

});

