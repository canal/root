Ext.namespace("casetracking.create.ux.panel.claim.ClaimInfo");
casetracking.create.ux.panel.claim.ClaimInfo = Ext.extend(Ext.Panel, {

	// initComponent
	initComponent : function(config) {	
		
		this.claimTypes = [{"id":"","description":"- Select One -"}
					,{"id":"MCLM","description":"Multiple Claims"}
					,{"id":"SCLM","description":"Single Claim"}
					,{"id":"NOCLM","description":"No"}];		

		var singleClaimPanelTop   = new
			casetracking.create.ux.panel.claim.SingleClaimTop ({
		});		
		this.singleClaimPanelTop = singleClaimPanelTop;
		
		var singleClaimPanelBottom   = new
			casetracking.create.ux.panel.claim.SingleClaimBottom ({
		});	
		this.singleClaimPanelBottom = singleClaimPanelBottom;
		
		var multipleClaimPanelTop   = new
			casetracking.create.ux.panel.claim.MultipleClaimTop ({
		});
		this.multipleClaimPanelTop = multipleClaimPanelTop;
		
		var multipleClaimPanelBottom   = new
			casetracking.create.ux.panel.claim.MultipleClaimBottom ({
		});	
		this.multipleClaimPanelBottom = multipleClaimPanelBottom;
		
		var selectedClaimInfoId = Ext.id();
		
		// Apply to this component
		Ext.apply(this, {
			layout : "form",		
			bodyBorder : false,
			border : false,
			ctCls : "portal-plain-panel",
			style:"padding-top:10px;",
			hideBorders : true,			
			items : [{
			        	  xtype : "panel",
			        	  border : false,
			        	  cls : "casetracking-title",
			        	  style:"padding-top:10px;",
			        	  bodyCssClass:"casetracking-title-body",
			        	  html : "Claim Information"
			          },{
					xtype: "radiogroup",
					id:"claimsRadioGroup",
					name:"claimsRadioGroup",
					style:"padding-left:20;padding-top:10px;",
					hideLabel:true,
					labelSeparator:"",
					vertical: true,
					columns:1,
					value:"NO_CLAIMS",
					items:[{
							hideLabel: true,
							boxLabel : "Yes, a single claim",
							name : "claimInformation",
							inputValue : "SINGLE_CLAIM",
							listeners: {
								check : function(o,b){
									if(b) {
										var togglePanels = IDXM.Utilities.TogglePanels();
										togglePanels.setPanels([singleClaimPanelTop,singleClaimPanelBottom,multipleClaimPanelTop,multipleClaimPanelBottom]);														
									togglePanels.disableShowPanel(multipleClaimPanelTop);
									togglePanels.enableShowPanel(singleClaimPanelTop);
									togglePanels.enableShowPanel(singleClaimPanelBottom);
									togglePanels.disableShowPanel(multipleClaimPanelBottom);
									Ext.getCmp("selectedClaimInfo"+selectedClaimInfoId).setValue("SINGLE_CLAIM");
									}									
								}
							}
						  },{
							hideLabel: true,
							boxLabel : "Yes, multiple claims",
							name : "claimInformation",
							inputValue : "MULTIPLE_CLAIMS",
							listeners: {
									check : function(o,b){
										if(b) {
											var togglePanels = IDXM.Utilities.TogglePanels();
											togglePanels.setPanels([singleClaimPanelTop,singleClaimPanelBottom,multipleClaimPanelTop,multipleClaimPanelBottom]);														
										togglePanels.enableShowPanel(multipleClaimPanelTop);
										togglePanels.disableShowPanel(singleClaimPanelTop);
										togglePanels.enableShowPanel(singleClaimPanelBottom);
										togglePanels.enableShowPanel(multipleClaimPanelBottom);
										Ext.getCmp("selectedClaimInfo"+selectedClaimInfoId).setValue("MULTIPLE_CLAIMS");
										} 											
									}
								}
						  },{
								hideLabel: true,
								boxLabel : "No",
								name : "claimInformation",
								inputValue : "NO_CLAIMS",
								checked: true,
								listeners: {
										check : function(o,b){
											if(b) {
												var togglePanels = IDXM.Utilities.TogglePanels();
												togglePanels.setPanels([singleClaimPanelTop,singleClaimPanelBottom,multipleClaimPanelTop,multipleClaimPanelBottom]);														
											togglePanels.disableShowPanel(multipleClaimPanelTop);
											togglePanels.disableShowPanel(singleClaimPanelTop);
											togglePanels.disableShowPanel(singleClaimPanelBottom);
											togglePanels.disableShowPanel(multipleClaimPanelBottom);
											Ext.getCmp("selectedClaimInfo"+selectedClaimInfoId).setValue("NO_CLAIMS");
											}											
										}							  
								}
						}]
				},{
			        	  xtype: "hidden",
			        	  id: "selectedClaimInfo"+selectedClaimInfoId,
			        	  value: "NO_CLAIMS"
				},multipleClaimPanelTop,singleClaimPanelTop,singleClaimPanelBottom,multipleClaimPanelBottom
			]
		});

		// call parent initComponent
		casetracking.create.ux.panel.claim.ClaimInfo.superclass.initComponent.call(this);		
	}
});
// Register component as xtype
Ext.reg('casetracking.create.ux.panel.claim.ClaimInfo',casetracking.create.ux.panel.claim.ClaimInfo);
