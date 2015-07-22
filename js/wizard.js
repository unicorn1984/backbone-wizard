/**
 * Created by pzf on 2015/7/17.
 */
function Wizard(options){
    _.extend(this.options,options);
    this.init()

}

Wizard.prototype = {

    options: {
        el: $(document.body),
        steps: [],
        autoStart:true,
        beforeStepOver:null,
        afterStepOver:null
    },
    init:function(){

        this.steps = this.options.steps;

        this.wizardLayoutView = new Wizard.WizardLayoutView({el: this.options.el, steps: this.steps,autoStart:this.options.autoStart});

        this.wizardLayoutView.render();
        this.wizardLayoutView.parent = this;

        if(this.options.autoStart){
            this.wizardLayoutView.start();
        }


    }


}
