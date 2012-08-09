Ext.namespace("casetracking.customerservice.Preferences");
casetracking.customerservice.Preferences = function(config) {

	// Form Panel
	Ext.form.Field.prototype.msgTarget = 'sideDetails';
	var demoUrlPrimaryEmail = config.updateDemographicsURL+"?callerApp=customerServicePreferences&focusField=emailAddress0";
	var demoUrlAlternateEmail = config.updateDemographicsURL+"?callerApp=customerServicePreferences&focusField=emailAddress1";

	var updatePrimaryAddressesLink = "&nbsp;&nbsp;<a class='enduser-application-link' href='"+demoUrlPrimaryEmail+"' onclick='updateAddresses();'><span class='idxmTextSmall'>(Update Address)</span></a>";
	var updateAlternateAddressesLink = "&nbsp;&nbsp;<a class='enduser-application-link' href='"+demoUrlAlternateEmail+"' onclick='updateAddresses();'><span class='idxmTextSmall'>(Update Address)</span></a>";
	
	// building JSON radio group array
	var alternateEmailNotification = "";
	if (config.emails.Alternate) {
		alternateEmailNotification = ", also send notifications to "+ config.emails.Alternate + updateAlternateAddressesLink;
	}	
	
	var primaryEmailInfo = "";
	if(config.isExceptionClient) {
		primaryEmailInfo = "<br><span class='preferences-text'>Each time a service case is created, closed or reopened you will receive an email at your primary email address:</span><br>";
	} else {
		primaryEmailInfo = "<br><span class='preferences-text'>Each time a service case is created, closed or reopened you will receive an email at your account notification email address:</span><br>";
	}

	// Form Submit
	function formSubmit() {

		// Get Form
		var formObj = Ext.getCmp("idxmCustomerServicePreferencesPanelForm" + config.nameSpace).getForm();

		g_hideStatusBox();
		formObj.submit({
					url : config.urlSubmitUpdatePreferences,
					isMessageIgnore : false,
					success : function(form, action) {
						Ext.getCmp("updateButton" + config.nameSpace).enable();
						Ext.get(document.body.id).unmask();

						g_showStatusBox();

						var jsonResponse = uRadixUtilities.jsonDecode(action.response.responseText);

						if (jsonResponse.messages.inputFields) {
							for ( var i = 0; i < jsonResponse.messages.inputFields.length; i++) {
								var messages = [];
								if (jsonResponse.messages.inputFields[i].faultID == "8001") {
									var message = new Object();
									var msgDetail = 'Unable to update below selected preference. ';
									msgDetail += 'Please refresh the screen.';

									message.description = msgDetail;
									messages[0] = message;

									// Overriding setMessages from URadix
									uRadixClientMessageHandler.setAdvice(false,messages);
								}
							}
						} else {
							// Overriding setMessages from URadix
							uRadixClientMessageHandler.setAdvice(true,jsonResponse.advice);
						}
					},
					failure : function(form, action) {
						g_showStatusBox();
						Ext.getCmp("updateButton" + config.nameSpace).enable();
						Ext.get(document.body.id).unmask();
					}
				});
	};

	// Form Submit Handler
	function formSubmitHandler() {
		// Get Form
		var formObj = Ext.getCmp("idxmCustomerServicePreferencesPanelForm" + config.nameSpace).getForm();
		var formValues = formObj.getValues();

		// Mask Body
		Ext.get(document.body.id).mask("<b> Loading...</b> ", "x-mask-loading");

		// Submit To Server
		formSubmit();
	};	
	
	if(alternateEmailNotification.length > 0) {
		new Ext.Panel({
				renderTo : config.formPanelDivID,
				border : false,
				bodyBorder : false,
				hideBorders : true,
				width : 650,
				items : [{
						xtype:"panel"
						,border:false
						,bodyBorder:false
						,hideBorders:true
						,items:[{
								xtype:"panel"
								,border:false
								,bodyBorder:false
								,hideBorders:true
								,id : config.idToToggle
								,hidden:((config.g_PreferencesHideAndShow) && (config.g_PreferencesHideAndShow != undefined))?true:false
								,items:[{
										xtype : "uRadix.form.FormPanel",
										autoScroll : true,
										id : "idxmCustomerServicePreferencesPanelForm"+ config.nameSpace,
										labelAlign : "top",
										items : [{
												xtype : "panel",
												bodyStyle : "padding-left:45px;",
												border : false,
												layout : "form",
												items : [{
													xtype : "label",
													border : true,
													html: "<span class='preferences-text'><br>Each time a service case is created, closed or reopened you will receive an email at your primary email address:</span><br>"
												},{
													xtype: "panel",
													border: false,
													height: 10
												},{
													xtype : "label",
													style : "padding-left:35px;",
													border : false,
													html: config.emails.Primary + updatePrimaryAddressesLink
												},{
													xtype: "panel",
													border: false,
													height: 10
												},{
													xtype : "radiogroup",
													fieldLabel: "<table><tr><td><span class='preferences-text'>Would you like to receive an email each time MultiPlan adds a note to your service case?</span></td><td><div class='uradix-form-help-details-icon' style='visibility: visible;' onclick='showEmailCommunicationWindow();' title='More Information' onmouseover='document.body.style.cursor=\"pointer\";' onmouseout='document.body.style.cursor=\"default\";'></div></td></tr></table>",
													labelSeparator:"",										
													id : "emailNotificationRadioGroup",
													name : "emailNotificationRadioGroup",
													style : "padding-left:35px;",
													vertical : true,
													columns : 1,
													items : [{
															hideLabel : true,
															boxLabel : "Yes",
															name : "updateEmailNotification",
															inputValue : "true",
															checked: updateEmailNotification
														},{
															hideLabel : true,
															boxLabel : "No",
															name : "updateEmailNotification",
															inputValue : "false",
															checked: !updateEmailNotification
														}]
												},{
													xtype : "radiogroup",
													fieldLabel: "<table><tr><td><span class='preferences-text'>Would you like to also receive these email notifications at your alternate email address?</span></td></tr></table>",
													labelSeparator:"",										
													id : "alternateEmailNotificationRadioGroup",
													name : "alternateEmailNotificationRadioGroup",
													style : "padding-left:35px;",
													vertical : true,
													columns : 1,
													items : [{
															hideLabel : true,
															boxLabel : "Yes"+alternateEmailNotification,
															name : "receiveEmailAlternate",
															inputValue : "true",
															checked: receiveEmailAlternate
														},{
															hideLabel : true,
															boxLabel : "No",
															name : "receiveEmailAlternate",
															inputValue : "false",
															checked: !receiveEmailAlternate											
														}]
												}]
									}],
									buttons : [ {
										id : "updateButton" + config.nameSpace,
										text : "UPDATE",
										ctCls : "support-portal-btn",
										handler : formSubmitHandler
									} ],
									listeners : {
										uradix_enterkey : formSubmitHandler
									}
								}]
							}]
					}]
						
			});		
	} else {
		new Ext.Panel({
				renderTo : config.formPanelDivID,
				border : false,
				bodyBorder : false,
				hideBorders : true,
				width : 650,			
				items : [{
						xtype:"panel"
						,border:false
						,bodyBorder:false
						,hideBorders:true
						,items:[{
								xtype:"panel"
								,border:false
								,bodyBorder:false
								,hideBorders:true
								,id : config.idToToggle
								,hidden:((config.g_PreferencesHideAndShow) && (config.g_PreferencesHideAndShow != undefined))?true:false
								,items:[{
										xtype : "uRadix.form.FormPanel",
										autoScroll : true,
										id : "idxmCustomerServicePreferencesPanelForm"+ config.nameSpace,
										labelAlign : "top",
										items : [{
												xtype : "panel",
												bodyStyle : "padding-left:45px;",
												border : false,
												layout : "form",
												items : [{
														xtype : "label",
														border : false,
														html: "<br><span class='preferences-text'>Each time a service case is created, closed or reopened you will receive an email at your primary emails address:</span><br><br>"
													},{
														xtype: "panel",
														border: false,
														height: 10
													},{
														xtype : "label",
														style : "padding-left:35px;",
														border : false,
														html: config.emails.Primary + updatePrimaryAddressesLink
													},{
														xtype: "panel",
														border: false,
														height: 10
													},{
														xtype : "radiogroup",
														fieldLabel: "<table><tr><td><span class='preferences-text'>Would you like to receive an email each time MultiPlan adds a note to your service case?</span></td><td><div class='uradix-form-help-details-icon' style='visibility: visible;' onclick='showEmailCommunicationWindow();' title='More Information' onmouseover='document.body.style.cursor=\"pointer\";' onmouseout='document.body.style.cursor=\"default\";'></div></td></tr></table>",
														labelSeparator:"",										
														id : "emailNotificationRadioGroup",
														name : "emailNotificationRadioGroup",
														style : "padding-left:35px;",
														vertical : true,
														columns : 1,
														items : [{
																hideLabel : true,
																boxLabel : "Yes",
																name : "updateEmailNotification",
																inputValue : "true",
																checked: updateEmailNotification
															},{
																hideLabel : true,
																boxLabel : "No",
																name : "updateEmailNotification",
																inputValue : "false",
																checked: !updateEmailNotification
															}]
													}]
											}],
											buttons : [{
													id : "updateButton" + config.nameSpace,
													text : "UPDATE",
													ctCls : "support-portal-btn",
													handler : formSubmitHandler
												}],
											listeners : {
												uradix_enterkey : formSubmitHandler
											}
										}]
							}]
					}]
						
			});			
	}

	var formPanel = Ext.getCmp("idxmCustomerServicePreferencesPanelForm"+ config.nameSpace);
	var isFormPanelDirty = false;
	formPanel.getForm().items.each(function(f) {
		f.on("change", function() {
			isFormPanelDirty = true;
			// enable Update Button
			Ext.getCmp("updateButton" + config.nameSpace).enable();			
		});
	});

	Ext.getCmp("idxmCustomerServicePreferencesPanelForm" + config.nameSpace).getForm().setValues(config.userData);

	var jsonFunctionObject = {
		noCancel : function() {}
	};

	return jsonFunctionObject;

};

function updateAddresses(){
	Ext.get(document.body.id).mask('<b> Loading...</b> ', 'x-mask-loading');
};

function showEmailCommunicationWindow(){
	casetracking.core.windows.EmailCommunication({});
};
