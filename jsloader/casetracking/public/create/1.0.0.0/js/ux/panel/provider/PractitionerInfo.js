Ext.namespace("casetracking.createpublic.ux.panel.provider.PractitionerInfo");
casetracking.createpublic.ux.panel.provider.PractitionerInfo = Ext.extend(Ext.Panel, {
	// initComponent
	initComponent : function(config) {		
		// Apply to this component
		Ext.apply(this, {
					layout : "form",		
					bodyBorder : false,
					border : false,
					ctCls : "portal-plain-panel",
					hideBorders : true,
					width:425,
					items : [{
							  xtype: "panel",
							  layout : "form",	
							  border: false,
							  labelAlign:"top",
							  items : [{
										xtype:"textfield"
										,fieldLabel:"First Name"	
										,allowBlank:false
										,id:"firstName"
										,name:"firstName"
										,maxLength:30
										,width:200
									},{
										xtype:"textfield"
										,fieldLabel:"Last Name"	
										,allowBlank:false
										,id:"lastName"
										,name:"lastName"
										,maxLength:30
										,width:200
									}]
						}]
					});
		// call parent initComponent
		casetracking.createpublic.ux.panel.provider.PractitionerInfo.superclass.initComponent.call(this);
	}
});
// Register component as xtype
Ext.reg('casetracking.createpublic.ux.panel.provider.PractitionerInfo',casetracking.createpublic.ux.panel.provider.PractitionerInfo);