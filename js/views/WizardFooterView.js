Wizard.WizardFooterView = Backbone.View.extend({

    el:".step-footer",
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
        else if ($(e.target).hasClass("cancelbtn")){
            this.cancelClick();
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
        this.parent.completeFn();
    },
    cancelClick:function(e){
        this.parent.cancelFn();
    },
    /**
     * 让 上一步 下一步 完成 按钮可用
     */

    update:function(){
        if(this.parent.stepsView.isStart()&&!this.parent.stepsView.isEnd()){   //这样才能保证是进行中的状态
            //如果是第一步，上一步按钮disable
            if(this.parent.stepsView.isFirst()){
                this.$(".previousbtn").hide();
            }else{
                this.$(".previousbtn").show();
            }
            this.$(".nextbtn").show();
            this.$(".startbtn").hide();
        }
        else if(this.parent.stepsView.isEnd()){   //结束了
            this.$(".previousbtn").hide();
            this.$(".startbtn").hide();
            this.$(".nextbtn").hide();
            this.$(".endbtn").show();
            this.$(".cancelbtn").hide();
        }
        else if(!this.parent.stepsView.isStart()){  //未开始
            this.$(".startbtn").show();
        }



    }


});


