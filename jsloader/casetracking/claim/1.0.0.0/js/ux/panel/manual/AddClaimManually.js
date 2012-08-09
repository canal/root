Ext.namespace("casetracking.claim.ux.panel.manual.AddClaimManually");
casetracking.claim.ux.panel.manual.AddClaimManually = Ext.extend(Ext.Panel, {	

	// initComponent
	initComponent : function(config) {	
		var allowBlank = false;
		if(userClassCode && userClassCode == 'INT') {
			allowBlank = true;
		}
		
		// Apply to this component
		Ext.apply(this, {
			layout : "form",		
			bodyBorder : false,
			border : false,
			ctCls : "portal-plain-panel",
			hideBorders : true,
			resizable : true,
			autoScroll : true,
			labelAlign:"top",
			items : [{
					xtype: "panel",
					layout : "form",	
					border: false,
					labelAlign: "top",
					items: [{
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
                                                    id : "dosFromManual",
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
                                                    id : "dosToManual",
                                                    fieldLabel : "DOS To",
                                                    hideLabel : false,
                                                    allowBlank : false,
                                                    msgTarget : "under",
                                                    maxValue : new Date()
                                                }]
                                    }]
						},{
		          			xtype: "panel",
		          			layout : "form",
		          			border: false,
		          			labelAlign: "top",
		          			items: [{
		          			        	xtype: "radiogroup",
		          			        	name:"claimSourceTypeRadioGroup",
		          			        	fieldLabel: "Claim #:",
		          			        	labelSeparator:"",
		          			        	vertical: true,
		          			        	allowBlank: allowBlank,
		          			        	msgTarget:"under",
		          			        	columns:1,
		          			        	value:"",
                                        items:[{
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
							    },{
									xtype : "panel",
									layout : "form",
									border : false,
									items : [{
										xtype : "textfield",
										hideLabel : true,
										id : "claimNumberManual",
										name : "claimNumber",
										allowBlank : allowBlank,
										width : 200,
										maxLength : 40
									}]
								}]
		          		},{
							xtype : "textfield",
							fieldLabel : "Member ID/SSN",
							hideLabel : false,
							allowBlank : false,
							id : "memberIdManual",
							name : "memberId",
							maxLength:200,
							width : 200
						},{
							xtype : "textfield",
							fieldLabel : "Patient Last Name",
							hideLabel : false,
							allowBlank : false,
							id : "patientLastNameManual",
							name : "patientLastName",
							maxLength:200,
							width : 200
						},{
							xtype : "textfield",
							fieldLabel : "Patient First Name",
							hideLabel : false,
							allowBlank : false,
							id : "patientFirstNameManual",
							name : "patientFirstName",
							maxLength:200,
							width : 200
						},{
							xtype : "textfield",
							fieldLabel : "Total Charge",
							hideLabel : false,
							allowBlank : false,
							id : "totalChargeManual",
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
							fieldLabel : "Discount Amount",
							hideLabel : false,
							allowBlank : true,
							id : "discountAmountManual",
							name : "discountAmount",
							width : 200,
							vtype : "dollar",
							autoCreate : {
								tag : "input",
								size : "14",
								maxLength : "14"
							}
						}]
				}]
		});

		// call parent initComponent
		casetracking.claim.ux.panel.manual.AddClaimManually.superclass.initComponent.call(this);
	}
});
// Register component as xtype
Ext.reg('casetracking.claim.ux.panel.manual.AddClaimManually',casetracking.claim.ux.panel.manual.AddClaimManually);