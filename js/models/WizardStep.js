/**
 * Created by pzf on 2015/7/17.
 */
Wizard.WizardStep = Backbone.Model.extend({
    idAttribute: "_id",
    // Default attributes for the todo item.
    defaults: function () {

        return {
            "label": "",
            "step": 0
        };
    }


});