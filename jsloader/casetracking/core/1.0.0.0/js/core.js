Ext.form.DateField.prototype.beforeBlur = function(){};

Ext.namespace('casetracking.core.buttons.imagebutton');
casetracking.core.buttons.imagebutton = Ext.extend(Ext.Button, {
    initComponent: function(){

        var imageBtnTpl = new Ext.Template('<span class="x-btn '+this.iconCls+'" id="'+Ext.id()+'"><button type="button"></button></span>');
        imageBtnTpl.compile();

        if(this.mouseOverClass){
            this.buttonClass = this.iconCls;
        }

        Ext.applyIf(this, {
                            template: imageBtnTpl,
                            listeners: {
                                        'mouseOver': function(button, event){ if(this.mouseOverClass) this.setIconClass(this.mouseOverClass); },
                                        'mouseOut': function(button, event){ if(this.mouseOverClass) this.setIconClass(this.buttonClass); }
                            }
                        });

        casetracking.core.buttons.imagebutton.superclass.initComponent.call(this);
    }
});
Ext.reg('imagebutton', casetracking.core.buttons.imagebutton);

Ext.namespace('casetracking.core.date.convert');
casetracking.core.date.convert = function(_jsonDate){
    var _date;
    
    if(_jsonDate){
	   _date= new Date();
	    _date.setFullYear(_jsonDate.year,_jsonDate.month,_jsonDate.dayOfMonth);
	    _date = _date.format("m/d/Y");    
	    if(!_date){
		_date="N/A";
	    }	    
    }

    return _date;
};

Ext.namespace('casetracking.core.date.compare');
casetracking.core.date.compare = function(_object){
	var fromDate = _object.fromDate;
	var toDate = _object.toDate;
	
	fromDate.setHours(0,0,0,0);
	toDate.setHours(0,0,0,0);

    	return (fromDate<=toDate);
};