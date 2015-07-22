Wizard.WizardLayoutView = Backbone.View.extend({


    template: Wizard['wizard-layout'],


    views: [],  //存放content区域的view类名
    currentView: null,

    initialize: function (arg) {
        this.steps = arg.steps;
        this.stepsView = new Wizard.WizardStepsView({steps: this.steps});
        this.stepsView.parent = this;
        this.footerView = new Wizard.WizardFooterView();
        this.footerView.parent = this;
        this._initView();

    },

    render: function () {
        this.$el.html(this.template({}));
        this.$el.find(".step-header").html(this.stepsView.$el);
        this.$el.find(".step-footer").html(this.footerView.render().$el);

        return this;
    },
    addView: function (index, viewName) {
        this.views.push({index: index, view: viewName});
    },
    _initView: function () {
        var sf = this;
        _.each(this.steps, function (item) {
            sf.addView(item.index, item.view);
        })
    },
    _getViewClassName: function (step) {
        var view;
        _.each(this.views, function (item) {
            if (item.index == step.index)
                view = item.view;
        })
        return view;
    },
    /**
     * 初始化page对应的view对象实例
     */
    instructView: function (step) {
        var viewName = this._getViewClassName(step);
        if (!viewName)
            throw new Error("step_" + step.step + "找不到对应的view实例");
        var view;
        try {
            view = eval('new ' + viewName + '()');
            view.setStep(step);
            view.parent = this;
        } catch (e) {
            throw new Error("step_" + step.step + "实例初始化失败");
        }
        return view;
    },


    getCurrentStep: function () {
        return this.stepsView.getCurrentStep();
    },

    /**
     * 激活view，在跳转时触发
     * @param step
     * @param previous boolean 是否是向前跳转，向前调转不用触发validate
     * @returns {boolean}
     */
    activeView: function (step, previous) {

        //开始第一步的场景,不用触发leave事件
        if (!this.currentView) {
            //获取view实例
            var viewObj = this.instructView(step);
            this.$('.wizard-content').html(viewObj.render().el);
            viewObj.doComplete();
            this.currentView = viewObj;
        } else {
            if (!previous && !this.currentView.doValidate())
                return false;
            if (!this.currentView.doBeforeLeave())
                return false;   //返回false则不往下执行
            this.currentView.doDestroy();
            //获取view实例
            var viewObj = this.instructView(step);
            this.$('.wizard-content').html(viewObj.render().el);
            viewObj.doComplete();
            this.currentView = viewObj;
            return true;
        }


    },
    /* _showPager:function(step){
     this.router.navigate('step_' + step.step, {trigger: true});
     },*/
    start: function () {
        var startStep = this.steps[0];
        //视图
        this.activeView(startStep);
        //路由（暂不提供）
        // this._showPager(startStep);
        //step
        this.stepsView.start();
        //按钮
        this.footerView.update();


    },
    nextStep: function () {

        var nextStep = this.steps[this.getCurrentStep().index + 1];

        //视图
        var result = this.activeView(nextStep);
        if (!result) return false;   //返回false则不往下执行
        //路由（暂不提供）
        // this._showPager(nextStep);

        this.stepsView.nextStep();
        //按钮
        this.footerView.update();
    },
    previousStep: function () {
        var previousStep = this.steps[this.getCurrentStep().index - 1];

        //视图
        var result = this.activeView(previousStep, true);
        if (!result) return false;   //返回false则不往下执行

        this.stepsView.previousStep();
        //按钮
        this.footerView.update();

    }

});