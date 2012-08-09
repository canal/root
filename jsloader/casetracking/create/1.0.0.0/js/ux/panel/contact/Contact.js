Ext.namespace("casetracking.create.ux.panel.contact.Contact");
casetracking.create.ux.panel.contact.Contact = Ext.extend(Ext.Panel, {

	// initComponent
	initComponent : function(config) {
		
		var thisObj = this;
	
		var contactInfo = new casetracking.create.ux.panel.contact.ContactInfo({});	
		thisObj.contactInfo=contactInfo;
		var clientInfo = new casetracking.create.ux.panel.contact.ClientInfo({parentObj:thisObj.parentObj});
		thisObj.clientInfo=clientInfo;
	
		// Apply to this component
		Ext.apply(this, {
					layout : "form",		
					bodyBorder : false,
					border : false,
					ctCls : "portal-plain-panel",
					hideBorders : true,
					labelAlign: "top",					
					items :[{
							  xtype : "panel",
							  border : false,
							  cls : "casetracking-title",
							  style:"padding-top:10px;",
							  bodyCssClass:"casetracking-title-body",
							  html : "Contact & Client Information"
						  },{
							xtype: "panel",
							layout : "column",
							border: false,
							style:"padding-top: 5px;",
							items: [{
									xtype: "panel",
									layout : "form",
									border: false,
									labelAlign:"top",
									columnWidth:.5,
									items:[contactInfo]
								},{
									xtype: "panel",
									layout : "form",
									border: false,
									labelAlign:"top",
									columnWidth : .5,
									items:[clientInfo]
								}]        	        	        	   
						}]
		});		
		// call parent initComponent
		casetracking.create.ux.panel.contact.Contact.superclass.initComponent.call(this);
	}
});		

//Register component as xtype
Ext.reg('casetracking.create.ux.panel.contact.Contact',casetracking.create.ux.panel.contact.Contact);