Ext.namespace("casetracking.create.ux.panel.eob.FaxInfo.Single");
casetracking.create.ux.panel.eob.FaxInfo.Single = Ext.extend(Ext.Panel, {
	// initComponent
	initComponent : function(config) {	

		// Apply to this component
		Ext.apply(this, {
			layout : "form",		
			bodyBorder : false,
			border : false,
			ctCls : "portal-plain-panel",
			style:"padding-top:10px;",
			hideBorders : true,
			items : [{
			        	  xtype: "panel",			        	  
			        	  border: true,
			        	  style:"padding-top:10px;padding-top:10px;",
			        	  bodyCssClass: "info-box",
			        	  html: "<table height='50'><tr><td><BR></td><td valign='top'><BR><div class='uradix-form-info-details-icon' style='visibility: visible;'></div></td><td><span class='portal-text-medium'>Please upload or fax a copy of the EOB/EOR after the service case has been created. Instructions will be provided on the next screen.</span></td></tr></table>"
			          }]
		});

		// call parent initComponent
		casetracking.create.ux.panel.eob.FaxInfo.Single.superclass.initComponent.call(this);
	}
});
// Register component as xtype
Ext.reg('casetracking.create.ux.panel.eob.FaxInfo.Single',casetracking.create.ux.panel.eob.FaxInfo.Single);


Ext.namespace("casetracking.create.ux.panel.eob.FaxInfo.Multiple");
casetracking.create.ux.panel.eob.FaxInfo.Multiple = Ext.extend(Ext.Panel, {
	// initComponent
	initComponent : function(config) {		
		
		// Apply to this component
		Ext.apply(this, {
			layout : "form",		
			bodyBorder : false,
			border : false,
			ctCls : "portal-plain-panel",
			style:"padding-top:10px;",
			hideBorders : true,
			//width:425,
			items : [{
			        	  xtype: "panel",
			        	  border: true,
			        	  style:"padding-top:10px;padding-top:10px;",
			        	  bodyCssClass: "info-box",			        	 
			        	  html: "<table height='50'><tr><td><br></td><td><div class='uradix-form-info-details-icon' style='visibility: visible;'></div></td><td><span class='portal-text-medium'>Please upload or fax a copy of the EOB/EOR after the service case has been created. Instructions will be provided on the next screen.</span></td></tr></table>"
			          }]
		});

		// call parent initComponent
		casetracking.create.ux.panel.eob.FaxInfo.Multiple.superclass.initComponent.call(this);
	}
});
// Register component as xtype
Ext.reg('casetracking.create.ux.panel.eob.FaxInfo.Multiple',casetracking.create.ux.panel.eob.FaxInfo.Multiple);
