Ext.namespace("casetracking.create.ux.panel.contact.ProviderContact");
casetracking.create.ux.panel.contact.ProviderContact = Ext.extend(Ext.Panel, {
	
	// initComponent
	initComponent : function(config) {		
		var thisObj = this;
		var contactInfo = new casetracking.create.ux.panel.contact.ContactInfo({});	
		this.contactInfo=contactInfo;	
		
		var providerInquiry = new casetracking.create.ux.panel.basic.ProviderInquiry({caseNetworkList:thisObj.caseNetworkList,caseTypeList:thisObj.caseTypeList,otherSubTypeId:thisObj.otherSubTypeId,selectClaimPanel:thisObj.selectClaimPanel,caseSubTypesList:thisObj.caseSubTypesList,providerInfoPanel:thisObj.providerInfoPanel, thisObjectParentName: thisObj.thisObjectParentName+".providerInquiry"});
		this.providerInquiry=providerInquiry;
	
		// Apply to this component
		Ext.apply(this, {
					layout : "form",		
					bodyBorder : false,
					border : false,
					ctCls : "portal-plain-panel",
					hideBorders : true,
					labelAlign: "top",					
					items :[{
							xtype: "panel",
							layout : "column",
							border: false,							
							items: [{
									xtype: "panel",
									layout : "form",
									border: false,
									labelAlign:"top",
									columnWidth:.5,
									items:[{
											  xtype : "panel",
											  border : false,
											  cls : "casetracking-title",
											  style:"padding-top:10px;",
											  bodyCssClass:"casetracking-title-body",
											  html : "Provider Contact Information",
											  style:"padding-bottom: 5px;"
										  },contactInfo]
								},{
									xtype: "panel",
									layout : "form",
									border: false,
									labelAlign:"top",
									columnWidth : .5,
									items:[{
											  xtype : "panel",
											  border : false,
											  cls : "casetracking-title",
											  style:"padding-top:10px;",
											  bodyCssClass:"casetracking-title-body",
											  html : "Inquiry Information",
											  style:"padding-bottom: 5px;"
										  },providerInquiry]
								}]        	        	        	   
						}]
		});		
		// call parent initComponent
		casetracking.create.ux.panel.contact.ProviderContact.superclass.initComponent.call(this);
	}
});		

//Register component as xtype
Ext.reg('casetracking.create.ux.panel.contact.ProviderContact',casetracking.create.ux.panel.contact.ProviderContact);