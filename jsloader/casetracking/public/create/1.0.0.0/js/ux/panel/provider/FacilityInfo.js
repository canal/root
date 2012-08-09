Ext.namespace("casetracking.createpublic.ux.panel.provider.FacilityInfo");
casetracking.createpublic.ux.panel.provider.FacilityInfo = Ext.extend(Ext.Panel, {
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
									,fieldLabel:"Facility Name"
									,maxLength:50
									,allowBlank:false
									,id:"groupName"
									,name:"groupName"
									,width:200
								      }]
						}]
					});
		// call parent initComponent
		casetracking.createpublic.ux.panel.provider.FacilityInfo.superclass.initComponent.call(this);
	}
});
// Register component as xtype
Ext.reg('casetracking.createpublic.ux.panel.provider.FacilityInfo',casetracking.createpublic.ux.panel.provider.FacilityInfo);