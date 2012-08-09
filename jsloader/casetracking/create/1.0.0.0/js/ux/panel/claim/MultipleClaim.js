Ext.namespace("casetracking.create.ux.panel.claim.MultipleClaimTop");
casetracking.create.ux.panel.claim.MultipleClaimTop = Ext.extend(Ext.Panel,{

	// initComponent
	initComponent : function(config) {

		this.clientPlatform = [{
			"id" : "",
			"description" : "- Select One -"
		}];

		// Apply to this component
		Ext.apply(this,{
					layout : 'form',
					labelAlign : "top",
					defaults : {
						bodyStyle : 'padding:10px;padding-left:0px;'
					},
					items : [{
							xtype : "panel",
							border : true,
							width : 425,
							style : "padding-top:10px;padding-bottom:10px;",
							bodyStyle : "background-color: #FFFFCC;border-color: #8B4513;",
							html : "<table height='50'><tr><td><br></td></tr><tr><td><br>;</td><td valign='top'><div class='uradix-form-info-details-icon' style='visibility: visible;'></div></td><td><span class='portal-text-small'>&nbsp;In order to research your claim inquiry, a copy of the claim is required.<br><br>&nbsp;You can upload or fax a copy of the claim after the service case<br>&nbsp;has been created. Instructions are provided on the next screen.</span></td></tr><tr><td><br></td></tr></table>"
						},{
							xtype : "numberfield",
							fieldLabel : "# of Claims",
							allowBlank : true,
							id : "numberOfClaims",
							name : "numberOfClaims",
							maxLength : 3,
							width : 60
						},{
							xtype : "panel",
							border : false,
							html : "<table><tr><td><span class='portal-text-large'>1. Provide information from one of the claims.</span></td></tr></table>"
						}]
				});

		// call parent initComponent
		casetracking.create.ux.panel.claim.MultipleClaimTop.superclass.initComponent.call(this);
	}
});
// Register component as xtype
Ext.reg('casetracking.create.ux.panel.claim.MultipleClaimTop',casetracking.create.ux.panel.claim.MultipleClaimTop);

Ext.namespace("casetracking.create.ux.panel.claim.MultipleClaimBottom");
casetracking.create.ux.panel.claim.MultipleClaimBottom = Ext.extend(Ext.Panel,{

	// initComponent
	initComponent : function(config) {

		this.clientPlatform = [{
			"id" : "",
			"description" : "- Select One -"
		}];

		// Apply to this component
		Ext.apply(this,{
					layout : 'form',
					labelAlign : "top",
					defaults : {
						bodyStyle : 'padding:10px;padding-left:0px;'
					},
					items : [{
							xtype : "panel",
							border : false,
							html : "<span class='portal-text-large'>2. Provide additional information.<br></span><span class='idxmTextSmall' style='padding-left: 15px;'>For each claim, please provide either the<br></span><span class='idxmTextSmall' style='padding-left: 15px;'>MultiPlan claim # or an alternate claim #.</span>"
						},{
							xtype : "textarea",
							fieldLabel : "List Additional MultiPlan Claim #s",
							hideLabel : false,
							name : "additionalMultiplanClaimNumbers",
							maxLength : 1024,
							width : 250
						},{
							xtype : "label",
							text : "(Separate claim #s by comma)"
						},{
							xtype : "panel",
							border : false,
							height : 5
						},{
							xtype : "textarea",
							fieldLabel : "List Additional Alternate Claim #s",
							hideLabel : false,
							name : "additionalClaimNumbers",
							maxLength : 1024,
							width : 250
						},{
							xtype : "label",
							text : "(Separate claim #s by comma)"
						}]
				});
		// call parent initComponent
		casetracking.create.ux.panel.claim.MultipleClaimBottom.superclass.initComponent.call(this);
	}
});

// Register component as xtype
Ext.reg('casetracking.create.ux.panel.claim.MultipleClaimBottom',casetracking.create.ux.panel.claim.MultipleClaimBottom);
