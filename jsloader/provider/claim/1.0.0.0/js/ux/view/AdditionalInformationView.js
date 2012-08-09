Ext.namespace("provider.claim.search.view.AdditionalInformationView");
provider.claim.search.view.AdditionalInformationView = Ext
		.extend(
				Ext.Panel,
				{
					//ID : 'AdditionalInformationView',

					// constructor
					constructor : function(config) {
						var additionalInformation = new provider.claim.search.panel.AdditionalInfomationPanel({
							id: 'NoResultsAdditionalInfomationPanel'
						});

						var togglePanels = new IDXM.Utilities.TogglePanels();
						togglePanels.setPanels([ additionalInformation ]);

						var primaryPhoneNumber = '', alternatePhoneNumber = '', hidePrimary = true, hideAlternate = true;
						var phoneList = [];
						// building JSON radio group array
						var phoneNumberRadioMap = [];
						if (config.baseObjConfig.contactDetails
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
														.enableShowPanel(additionalInformation);

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
													.disableShowPanel(additionalInformation);
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
											id : config.id,
											layout : "form",
											border : false,
											bodyBorder : false,
											labelAlign : "top",
											items : [ {
												xtype : "panel",
												border : false,
												bodyBorder : false,
												layout : "form",
												labelAlign : "top",
												items : [
														{
															xtype : "label",
															cls : "portal-text-medium",
															border : false,
															html : "If you're certain that MultiPlan has the claim you can have MultiPlan call you."
														},
														{
															xtype : "panel",
															cls : "portal-title",
															border : false,
															style : "padding-top:5px;"
														},
														{
															xtype : "panel",
															border : false,
															style : "padding-top:10px;"
														},
														{
															xtype : "radiogroup",
															name : "callMeRadioGroup",
															id : "callMeRadioGroup",
															fieldLabel : "Would you like to have MultiPlan call you to discuss your claim?",
															labelSeparator : "",
															vertical : true,
															columns : 1,
															value : "",
															items : phoneNumberRadioMap
														},
														additionalInformation,
														{
															xtype : "hidden",
															id : "PhoneType",
															value : ""
														} ]
											} ]

										});
						// call parent constructor
						provider.claim.search.view.AdditionalInformationView.superclass.constructor
								.call(this);
					}
				});
// Register component as xtype
Ext.reg('provider.claim.search.view.AdditionalInformationView',
		provider.claim.search.view.AdditionalInformationView);