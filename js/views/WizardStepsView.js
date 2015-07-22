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
    }

});

