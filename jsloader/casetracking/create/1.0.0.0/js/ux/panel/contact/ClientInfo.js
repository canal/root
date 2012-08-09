Ext.namespace("casetracking.create.ux.panel.contact.ClientInfo");
casetracking.create.ux.panel.contact.ClientInfo = Ext.extend(Ext.Panel, {

	// initComponent
	initComponent : function(config) {
	
		var thisObj = this;
		this.prefix = (this.prefix)?this.prefix:"";		
		
		var clientCCodeField = new Ext.form.TextField({
							fieldLabel:"Client CCode"
							,allowBlank:false
							,name:"ccode"
							,editable:false
							,emptyText:"Enter CCode"
							,width:200
							,listeners:{
								blur:function(){
									thisObj.parentObj.validateCCode.call();
								}
							}
						});
		thisObj.clientCCodeField = clientCCodeField;
		
		thisObj.ccodeTypeRadioGroup = new Ext.form.RadioGroup({
					name:"ccodeTypeRadioGroup",
					fieldLabel: "CCode Type:",
					labelSeparator:"",
					vertical: true,
					allowBlank:false,
					msgTarget:"under",
					columns:1,
					value:"",
					items:[{
							hideLabel: true,
							boxLabel : "MultiPlan",
							name : "ccodeType",
							inputValue : "MPI",
							checked:true,
							listeners: {
								check : function(o,b){
									if(b) {
										var ccode = thisObj.clientCCodeField.getValue();
										if(ccode.length > 0) {
											thisObj.parentObj.validateCCode.call();
										}
									}									
								}
							}
						},{
							hideLabel: true,
							boxLabel : "Viant",
							name : "ccodeType",
							inputValue : "VIANT",
							listeners: {
								check : function(o,b){
									if(b) {
										var ccode = thisObj.clientCCodeField.getValue();
										if(ccode.length > 0) {
											thisObj.parentObj.validateCCode.call();
										}
									} 											
								}
							}
						}]
				});
			
		// Apply to this component
		Ext.apply(this, {
			layout : "form",		
			bodyBorder : false,
			border : false,
			ctCls : "portal-plain-panel",
			hideBorders : true,
			width:425,
			labelAlign: "top",
			items : [thisObj.ccodeTypeRadioGroup,clientCCodeField]
		});		
		// call parent initComponent
		casetracking.create.ux.panel.contact.ClientInfo.superclass.initComponent.call(this);
	}
});		

//Register component as xtype
Ext.reg('casetracking.create.ux.panel.contact.ClientInfo',casetracking.create.ux.panel.contact.ClientInfo);