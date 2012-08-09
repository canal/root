Ext.namespace("casetracking.create.ux.panel.claim.SingleClaimTop");
casetracking.create.ux.panel.claim.SingleClaimTop = Ext.extend(Ext.Panel,{
	// initComponent
	initComponent : function(config) {

		// Apply to this component
		Ext.apply(this,{
					layout : "form",
					border : false,
					labelAlign : "top",
					items : [ {
							xtype : "panel",
							border : true,
							width : 425,
							style : "padding-top:10px;",
							bodyCssClass : "info-box",
							html : "<table height='50'><tr><td><br></td></tr><tr><td>&nbsp;</td><td><div class='uradix-form-info-details-icon' style='visibility: visible;'></div></td><td><span class='portal-text-medium'>&nbsp;In order to research your claim inquiry, a copy of the claim is required.<br><br>&nbsp;You can upload or fax a copy of the claim after the service case<br>&nbsp;has been created. Instructions are provided on the next screen.</span></td></tr><tr><td><br></td></tr></table>"
						} ]
				});

		// call parent initComponent
		casetracking.create.ux.panel.claim.SingleClaimTop.superclass.initComponent.call(this);
	}
});
// Register component as xtype
Ext.reg('casetracking.create.ux.panel.claim.SingleClaimTop',casetracking.create.ux.panel.claim.SingleClaimTop);

Ext.namespace("casetracking.create.ux.panel.claim.SingleClaimBottom");
casetracking.create.ux.panel.claim.SingleClaimBottom = Ext.extend(Ext.Panel,{

	// initComponent
	initComponent : function(config) {

		this.employerGroup = [ {
			"id" : "",
			"description" : "- Select One -"
		} ];

		// Apply to this component
		Ext.apply(this,{
					layout : "form",
					border : false,
					labelAlign : "top",
					items : [{
							xtype : "panel",
							border : false,
							layout : "column",
							style : "padding-top:10px;padding-bottom:10px;",
							width : 250,
							items : [{
									xtype : "panel",
									columnWidth : .5,
									layout : "form",
									border : false,
									labelAlign : "top",
									items : [{
											xtype : "datefield",
											name : "dosFrom",
											id : "dosFrom",
											fieldLabel : "DOS From",
											hideLabel : false,
											allowBlank : false,
											msgTarget : "under",
											maxValue : new Date()
										}]
								},{
									xtype : "panel",
									columnWidth : .5,
									layout : "form",
									border : false,
									labelAlign : "top",
									items : [{
											xtype : "datefield",
											name : "dosTo",
											id : "dosTo",
											fieldLabel : "DOS To",
											hideLabel : false,
											allowBlank : false,
											msgTarget : "under",
											maxValue : new Date()
										}]
								}]
						},{
							xtype : "panel",
							border : false,
							layout : "form",
							hideLabel: true,
							style : "padding-top:0px;",
							items : [{
									xtype : "panel",
									layout : "form",
									border : false,
									style : "padding-top:0px;",
									items : [{
											xtype : "radiogroup",
											hideLabel : false,
											id : "claimSourceTypeRadioGroup",
											name : "claimSourceTypeRadioGroup",
											style : "padding-left:20px;",
											fieldLabel: "Claim #:",
											labelSeparator : "",
											vertical : true,
											allowBlank : false,
											msgTarget: "under",
											columns : 1,
											value : "",
											items : [{
													hideLabel : true,
													boxLabel : "MultiPlan Claim #",
													name : "claimNumberSource",
													inputValue : "MPI"
												},{
													hideLabel : true,
													boxLabel : "Alternate Claim #",
													name : "claimNumberSource",
													inputValue : "CLIENT"
												}]
										}]
								},{
									xtype : "panel",
									layout : "form",
									border : false,
									style: "padding-bottom: 15px;",
									items : [{
										xtype : "textfield",
										hideLabel : true,
										id : "claimNumber",
										name : "claimNumber",
										allowBlank : false,
										width : 200,
										maxLength : 40
									}]
								}]
						},{
							xtype : "textfield",
							fieldLabel : "Member ID/SSN",
							hideLabel : false,
							allowBlank : false,
							id : "memberId",
							name : "memberId",
							width : 200
						},
						{
							xtype : "textfield",
							fieldLabel : "Patient Last Name",
							hideLabel : false,
							allowBlank : false,
							id : "patientLastName",
							name : "patientLastName",
							width : 200
						},{
							xtype : "textfield",
							fieldLabel : "Patient First Name",
							hideLabel : false,
							allowBlank : false,
							id : "patientFirstName",
							name : "patientFirstName",
							width : 200
						},{
							xtype : "textfield",
							fieldLabel : "Total Charge",
							hideLabel : false,
							allowBlank : false,
							id : "totalCharge",
							name : "totalCharge",
							width : 200,
							vtype : "dollar",
							autoCreate : {
								tag : "input",
								size : "14",
								maxLength : "14"
							}
						},{
							xtype : "textfield",
							fieldLabel : "Network Discount Amount",
							hideLabel : false,
							allowBlank : true,
							id : "multiplanDiscountAmount",
							name : "multiplanDiscountAmount",
							width : 200,
							vtype : "dollar",
							autoCreate : {
								tag : "input",
								size : "14",
								maxLength : "14"
							}
						},{
							xtype : "textfield",
							fieldLabel : "Client Platform",
							hideLabel : false,
							allowBlank : true,
							name : "clientPlatform",
							id : "clientPlatform",
							width : 200
						},{
							xtype : "textfield",
							fieldLabel : "Employer Group",
							hideLabel : false,
							allowBlank : true,
							id : "employerGroup",
							name : "employerGroup",
							width : 200
						}]
				});

		// call parent initComponent
		casetracking.create.ux.panel.claim.SingleClaimBottom.superclass.initComponent.call(this);
	}
});
// Register component as xtype
Ext.reg('casetracking.create.ux.panel.claim.SingleClaimBottom',casetracking.create.ux.panel.claim.SingleClaimBottom);
