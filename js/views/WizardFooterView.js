Wizard.WizardFooterView = Backbone.View.extend({


    template: Wizard['wizard-footer'],


    initialize: function (arg) {


    },
    render: function () {
        this.$el.html(this.template({}));
        return this;
    },
    events: {
        "click .btn": "buttonClick"

    },
    buttonClick: function (e) {
        if ($(e.target).hasClass("startbtn")) {
            this.startClick();
        }
        else if ($(e.target).hasClass("nextbtn")) {
            this.nextClick();
        }
        else if ($(e.target).hasClass("previousbtn")) {
            this.previousClick();
        }
        else if ($(e.target).hasClass("endbtn")){
             this.endClick();
        }
    },
    startClick: function (e) {
        this.parent.start();
    },
    nextClick: function (e) {
        this.parent.nextStep();
    },
    previousClick: function (e) {
        this.parent.previousStep();
    },
    endClick: function (e) {
       // this.parent.previousStep();
    },
    /**
     * 让 上一步 下一步 完成 按钮可用
     */

    update:function(){
        var currentStep = this.parent.getCurrentStep();
        if(currentStep) {
            this.$(".startbtn").hide();
            if(currentStep.index===0||currentStep.index === this.parent.steps.length-1) {
                if (currentStep.index === 0) {
                    this.$(".nextbtn").show();
                    this.$(".previousbtn").hide();
                }
                if (currentStep.index === this.parent.steps.length - 1) {
                    this.$(".previousbtn").show();
                    this.$(".nextbtn").hide();
                    this.$(".endbtn").show();
                }
            }else{
                this.$(".nextbtn").show();
                this.$(".previousbtn").show();
            }

        }else{
            this.$(".startbtn").show();
            this.$(".previousbtn").hide();
            this.$(".nextbtn").hide();
            this.$(".endbtn").hide();
        }

    }


});


