this["Wizard"] = this["Wizard"] || {};

this["Wizard"]["wizard-footer"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<button  type=\"button\" class=\"btn btn-success startbtn\">开始</button>\r\n<button type=\"button\" class=\"btn btn-primary previousbtn\" style=\"display:none\">上一步</button>\r\n<button type=\"button\" class=\"btn btn-primary nextbtn\" style=\"display:none\">下一步</button>\r\n<button  type=\"button\" class=\"btn btn-success endbtn\" style=\"display:none\">完结</button>\r\n";
},"useData":true});

this["Wizard"]["wizard-layout"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<div class=\"wizard-warpper\">\r\n    <div class=\"step-header clearfix\">\r\n\r\n    </div>\r\n    <div class=\"wizard-content\"> 123\r\n    </div>\r\n    <div class=\"step-footer\">\r\n\r\n    </div>\r\n</div>";
},"useData":true});

this["Wizard"]["wizard-stepItem"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<span class=\"ok\">.</span>\r\n<span class=\"step\">"
    + alias3(((helper = (helper = helpers.step || (depth0 != null ? depth0.step : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"step","hash":{},"data":data}) : helper)))
    + "</span>\r\n<span class=\"title\">"
    + alias3(((helper = (helper = helpers.label || (depth0 != null ? depth0.label : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"label","hash":{},"data":data}) : helper)))
    + "</span>";
},"useData":true});