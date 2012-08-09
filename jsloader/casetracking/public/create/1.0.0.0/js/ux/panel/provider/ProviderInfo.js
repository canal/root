Ext.namespace("casetracking.createpublic.ux.panel.provider.ProviderInfo");
casetracking.createpublic.ux.panel.provider.ProviderInfo = Ext.extend(Ext.Panel, {
	// initComponent
	initComponent : function(config) {							
		
		var practitionerPanel   = new casetracking.createpublic.ux.panel.provider.PractitionerInfo ({});	
		this.practitionerPanel = practitionerPanel;

		var facilityPanel   = new casetracking.createpublic.ux.panel.provider.FacilityInfo ({});	
		this.facilityPanel = facilityPanel;

		var addressPanel   = new casetracking.createpublic.ux.panel.provider.AddressInfo ({});	
		this.addressPanel = addressPanel;						
		
		// Apply to this component
		Ext.apply(this, {
					layout : "form",		
					bodyBorder : false,
					border : false,
					ctCls : "portal-plain-panel",
					hideBorders : true,
					width:425,
					labelAlign:"top",
					items : [{
							xtype: "panel",
							layout : "form",	
							border: false,
							labelAlign: "top",	
							items: [{
									xtype: "radiogroup",
									id:"providerTypeRadioGroup",
									name:"providerTypeRadioGroup",
									style:"padding-left:20px;",
									fieldLabel: "Provider Type:",
									labelSeparator:"",
									vertical: true,
									allowBlank:false,
									msgTarget:"under",
									columns:1,
									value:"",
									items:[{
											hideLabel: true,
											boxLabel : "Practitioner/Individual Provider",
											name : "providerType",
											inputValue : "PRAC",
											itemId: "providerTypePrac",
											listeners: {
														check : function(o,b){
															if(b) {
																var togglePanels = IDXM.Utilities.TogglePanels();
																togglePanels.setPanels([practitionerPanel,facilityPanel]);			          			        							
																togglePanels.enableShowPanel(practitionerPanel);
																togglePanels.enableShowPanel(addressPanel);
																togglePanels.disableShowPanel(facilityPanel);
															}									
														}
													}
										},{
											hideLabel: true,
											boxLabel : "Facility/Ancillary",
											name : "providerType",
											inputValue : "FAC",
											itemId: "providerTypeFac",
											listeners: {
														check : function(o,b){
															if(b) {
															var togglePanels = IDXM.Utilities.TogglePanels();
															togglePanels.setPanels([practitionerPanel,facilityPanel]);
															togglePanels.enableShowPanel(facilityPanel);
															togglePanels.enableShowPanel(addressPanel);
															togglePanels.disableShowPanel(practitionerPanel);									          					
															} 											
														}
													}
										}]
								}]	        				        	        		  	        				        	        	 
						},practitionerPanel,facilityPanel,addressPanel]
		});

		// call parent initComponent
		casetracking.createpublic.ux.panel.provider.ProviderInfo.superclass.initComponent.call(this);
	}
});
// Register component as xtype
Ext.reg('casetracking.createpublic.ux.panel.provider.ProviderInfo',casetracking.createpublic.ux.panel.provider.ProviderInfo);