Ext.namespace("provider.claim.search.view.MultipleClaimSearchResultsView");
provider.claim.search.view.MultipleClaimSearchResultsView = Ext
		.extend(
				Ext.Panel,
				{
					//ID: 'MultipleClaimSearchResultsView',
					
					constructor : function(config) {
						var thisObj = this;
						var findClaimHelpLinkId = Ext.id();						

						var multipleAdditionalInformation = new provider.claim.search.panel.AdditionalInfomationPanel({
							id: 'MultipleResultsAdditionalInfomationPanel'
						});

						var togglePanels = new IDXM.Utilities.TogglePanels();
						togglePanels.setPanels([ multipleAdditionalInformation ]);

						var primaryPhoneNumber = '', alternatePhoneNumber = '', hidePrimary = true, hideAlternate = true;					
						var phoneList = [];
						// building JSON radio group array
						var phoneNumberRadioMap = [];
						if (config.baseObjConfig.contactDetails.ContactDetails
								&& config.baseObjConfig.contactDetails.ContactDetails.PhoneList) {
								var cnt = 0;
								phoneList = config.baseObjConfig.contactDetails.ContactDetails.PhoneList;
								for (i = 0; i < phoneList.length; i++) {
									var phone = phoneList[i];
									var obj = new Object();
									obj.name = 'PhoneNumber';
									obj.inputValue = phone.PhoneNumber;									
									obj.listeners = {
										check : function(o, b) {
											if (b) {
												togglePanels
														.enableShowPanel(multipleAdditionalInformation);

												for (i = 0; i < phoneList.length; i++) {
													var phone = phoneList[i];
													if (phone.PhoneNumber == o
															.getRawValue()) {
														Ext
																.getCmp(
																		'PhoneType')
																.setValue(
																		phone.PhoneType);
													}
												}
											}
										}
									};
									obj.boxLabel = "Yes, call me at "
											+ phone.PhoneNumber;
									phoneNumberRadioMap[cnt++] = obj;
								}

								var obj = new Object();
								obj.name = 'PhoneNumber';
								obj.inputValue = 'No';
								obj.listeners = {
									check : function(o, b) {
										if (b) {												
											togglePanels
													.disableShowPanel(multipleAdditionalInformation);
											Ext.getCmp('PhoneType')
													.setValue('');
										}
									}
								};
								obj.boxLabel = "No";
								phoneNumberRadioMap[cnt++] = obj;
							//}
						}			

						// Apply to this component
						Ext
								.apply(
										this,
										{
											id: "MultipleClaimSearchResultsView",
											layout : "form",
											bodyBorder : false,
											border : false,
											ctCls : "portal-plain-panel",
											hideBorders : true,
											labelAlign : "top",
											items : [
													{
														xtype : "panel",
														cls : "portal-text-medium",
														html : "<div>We found your claim.<br><br>However at this time we cannot display it on the portal.</div>"
													},
													{
														xtype : "panel",
														cls : "portal-title",
														style : "padding-top:10px;"
													},
													{
														xtype : "panel",
														style : "padding-top:10px;"
													},
													{
														xtype : "radiogroup",
														name : "callMeRadioGroup",
														id : "callMeRadioGroup"
																+ this.prefix,
														fieldLabel : "Would you like to have MultiPlan call you to discuss your claim?",
														labelSeparator : "",
														vertical : true,
														columns : 1,
														value : "",
														items : phoneNumberRadioMap
													},multipleAdditionalInformation,
													{
														xtype : "hidden",
														id : "PhoneType",
														value : ""
													} 
													]
										});
						// call parent initComponent
						provider.claim.search.view.MultipleClaimSearchResultsView.superclass.constructor
								.call(this);
					}
				});
// Register component as xtype
Ext.reg('provider.claim.search.view.MultipleClaimSearchResultsView',
		provider.claim.search.view.MultipleClaimSearchResultsView);