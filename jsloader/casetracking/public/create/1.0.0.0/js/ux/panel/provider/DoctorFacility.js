Ext.namespace("casetracking.createpublic.ux.panel.provider.DoctorFacility");
casetracking.createpublic.ux.panel.provider.DoctorFacility = Ext.extend(Ext.Panel, {
	
	// initComponent
	initComponent : function(config) {
		
		var contactInfo = new casetracking.createpublic.ux.panel.provider.ContactInfo({});
		var providerInfo = new casetracking.createpublic.ux.panel.provider.ProviderInfo({});
		this.providerInfo = providerInfo;
		
		var inquiryInfo = new casetracking.createpublic.ux.panel.inquiry.InquiryInfo({thisObjectName: this.thisObjectName + "." + "inquiryInfo", caseNetworkList: this.caseNetworkList, caseTypeList: this.caseTypeList, otherSubTypeId: this.otherSubTypeId, caseSubTypesList: this.caseSubTypesList});
		this.inquiryInfo = inquiryInfo;
		
		var contactProviderPanels = [{
			  xtype: "panel",
			  layout : "form",	
			  columnWidth:.6,
			  border: false,
			  items: [contactInfo]			        	        	    
		  },{
			  xtype: "panel",
			  layout : "form",	
			  columnWidth:.4,
			  border: false,
			  items: [providerInfo]			        	        	    
		  }];
		var title = "Contact & Provider Information";
		if(isAuthenticated) {
			title = "Provider Information";
			contactProviderPanels = [{
				  xtype: "panel",
				  layout : "form",	
				  columnWidth:.6,
				  border: false,
				  items: [providerInfo]			        	        	    
			  }];
		}
		
		// Apply to this component
		Ext.apply(this, {
					layout : "form",		
					bodyBorder : false,
					border : false,
					ctCls : "portal-plain-panel",
					hideBorders : true,
					items: [{
							  xtype : "panel",
							  border : false,
							  cls : "casetracking-title",
							  style:"padding-top:10px;",
							  bodyCssClass:"casetracking-title-body",
							  html : title
						},{
							xtype : "panel",
							border : false,
							layout : "column",
							style: "padding-top: 5px;",
							html : "<span class='idxmTextSmall'><b>*Required</b></span>"
						},{
							  xtype: "panel",
							  layout: "column",
							  border: false,
							  style:"padding-top:10px;",
							  colspan: 2,
							  items: contactProviderPanels
						},{
							  xtype: "panel",
							  layout: "column",
							  border: false,
							  style:"padding-top:10px;",
							  colspan: 2,
							  items: [{
									  xtype: "panel",
									  layout : "form",	
									  border: false,
									  items: [inquiryInfo]			        	        	    
								  }]
						}]
		});
		
		// call parent initComponent
		casetracking.createpublic.ux.panel.provider.DoctorFacility.superclass.initComponent.call(this);
	}
});
//Register component as xtype
Ext.reg('casetracking.createpublic.ux.panel.provider.DoctorFacility',casetracking.createpublic.ux.panel.provider.DoctorFacility);