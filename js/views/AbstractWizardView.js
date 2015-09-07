Wizard.AbstrctWizardStepsView = Backbone.View.extend({

    step:null,
    initialize: function (arg) {


    },
    render: function () {
        return this;
    },
    setStep:function(step){
        this.step = step;
    },


    /**
     * 渲染完成后执行
     */
    doComplete: function () {
        if (this.complete)
            return this.complete();
        return true;
    },

    /**
     * 离开当前页面钱
     */
    doBeforeNext: function () {
        if (this.beforeNext)
            return this.beforeNext();
        return true;
    },
    doBeforePrevious:function(){
        if (this.beforePrevious)
            return this.beforePrevious();
        return true;
    },
    doDestroy: function () {
        if (this.destroy)
             this.destroy();
        this.remove();
    },

    /**
     * 设置下一步view
     * @param index 下一步的index,当前index+1
     * @param viewName 类名
     */
    setNextView:function(viewName){
       this.parent.addView(this.step.index+1,viewName)
    }

});


