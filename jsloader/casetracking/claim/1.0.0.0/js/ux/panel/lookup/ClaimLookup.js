Ext.namespace("casetracking.claim.ux.panel.lookup.ClaimLookup");
casetracking.claim.ux.panel.lookup.ClaimLookup = Ext
		.extend(
				Ext.Panel,
				{

					// initComponent
					initComponent : function(config) {

						var thisObj = this;
						var enterClaimLinkId = Ext.id();

						// Apply to this component
						Ext
								.apply(
										this,
										{
											layout : "form",
											bodyBorder : false,
											border : false,
											hideBorders : true,
											labelAlign : "top",
											items : [
													{
														xtype : "panel",
														border : false,
														baseCls : "portal-subtitle-bold",
														style : "padding-top:5px; padding-bottom:5px;",
														html : "Lookup by Claim #"
													},
													{
														xtype : "textfield",
														fieldLabel : "Claim #",
														allowBlank : true,
														id : "claimNumber",
														name : "claimNumber",
														width : 200,
														msgTarget : "under",
														enableKeyEvents : true,
														listeners : {
															keypress : function(o, e) {
																if (e.getCharCode() == 96 || e.getCharCode() == 126 || e.getCharCode() == 33 || e.getCharCode() == 64
																		 || e.getCharCode() == 35 || e.getCharCode() == 36 || e.getCharCode() == 37 || e.getCharCode() == 94
																		 || e.getCharCode() == 38 || e.getCharCode() == 42 || e.getCharCode() == 40 || e.getCharCode() == 41
																		 || e.getCharCode() == 61 || e.getCharCode() == 43
																		 || e.getCharCode() == 91 || e.getCharCode() == 93 || e.getCharCode() == 123 || e.getCharCode() == 125
																		 || e.getCharCode() == 92 || e.getCharCode() == 124 || e.getCharCode() == 59 || e.getCharCode() == 58
																		 || e.getCharCode() == 39 || e.getCharCode() == 34 || e.getCharCode() == 60 || e.getCharCode() == 44 
																		 || e.getCharCode() == 62 || e.getCharCode() == 63 || e.getCharCode() == 47) {
																	e.stopEvent();
																}
															}
														}															
													},
													{
														xtype : "panel",
														border : false,
														style : "padding-left:5px; padding-bottom:10px;",
														html : "<div class'portal-text-tiny'>MultiPlan, Viant, or Your Claim#</div>"
													},
													{
														xtype : "panel",
														border : false,
														style : "padding-left:5px; padding-bottom:10px;",
														items: [
																{
																	xtype : "imagebutton",
																	iconCls : "findClaimButton",
																	style : "float:left;text-align:left;",
																	handler : thisObj.formSubmitHandler
																}														        
														        ]
													},
													{
														xtype : "panel",
														border : false,
														style : "padding-left:5px; padding-top:10px;",
														html : "<a id='"
																+ enterClaimLinkId
																+ "' class='portal-link-tiny' href='#'>Enter a claim manually</a>",
														listeners : {
															afterrender : function() {
																var enterClaimLink = Ext
																		.get(enterClaimLinkId);
																enterClaimLink
																		.on(
																				"click",
																				function() {
																					thisObj.showAddClaimManualPanel
																							.call();
																				});
															}
														}
													} ]
										});

						// call parent initComponent
						casetracking.claim.ux.panel.lookup.ClaimLookup.superclass.initComponent
								.call(this);
					}
				});
// Register component as xtype
Ext.reg('casetracking.claim.ux.panel.lookup.ClaimLookup',
		casetracking.claim.ux.panel.lookup.ClaimLookup);