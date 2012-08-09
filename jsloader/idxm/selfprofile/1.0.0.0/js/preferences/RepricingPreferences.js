Ext.namespace("idxm.selfprofile.repricing.RepricingPreferences");
idxm.selfprofile.repricing.RepricingPreferences = function(config) {

	// Form Panel
	Ext.form.Field.prototype.msgTarget = 'sideDetails';

	// building JSON radio group array
	var dataCodeMap = [];

	var _email = userData.email;

	var cnt = 0;
	
	if (_email != null) {
		var newEmailArray = _email;
		
		if(config.userData.accountNotificationEmailIndicator=='on') {
			newEmailArray = getExceptionalClientEmailList(_email);
		}  else {
			newEmailArray = getClientEmailList(_email);
		}
		
		for ( var i = 0; i < newEmailArray.length; i++) {
			try {
				if(newEmailArray[i] != null) {
					var obj = new Object();
					obj.id = newEmailArray[i].id;
					obj.name = 'adviceNotificationRadio';
					obj.checked = newEmailArray[i].adviceNotification;
					obj.inputValue = newEmailArray[i].value;
					obj.listeners = {
							check : function(o, b) {
								Ext.getCmp('isFormUpdated').setValue('true');
								for ( var i = 0; i < newEmailArray.length; i++) {
									var email = newEmailArray[i];
									if (email.id == o.id) {
										if (this.checked) {
											email.adviceNotification = true;
										} else {
											email.adviceNotification = false;
										}
									}
								}
							}
					};
					obj.boxLabel = newEmailArray[i].value + " (" +newEmailArray[i].type+ ")";
					dataCodeMap[cnt++] = obj;					
				} 
			} catch (e) {
			}
		}
	}

	var _fax = userData.fax
	if (_fax != null) {
		for ( var i = 0; i < _fax.length; i++) {
			try {
				if(_fax[i] != null) {
					var obj = new Object();
					obj.id = _fax[i].id;
					obj.name = 'adviceNotificationRadio';
					obj.checked = _fax[i].adviceNotification;
					obj.inputValue = _fax[i].value;
					obj.listeners = {
							check : function(o, b) {
								Ext.getCmp('isFormUpdated').setValue('true');
								for ( var i = 0; i < _fax.length; i++) {
									var fax = _fax[i];
									if (fax.id == o.id) {
										if (this.checked) {
											fax.adviceNotification = true;
										} else {
											fax.adviceNotification = false;
										}
									}
								}
							}
					};

					obj.boxLabel = _fax[i].value + " (" +_fax[i].type+ " Fax)";
					dataCodeMap[cnt++] = obj;
				}
			} catch (e) {
			}
		}
	}

	// Form Submit
	function formSubmit() {

		// Get Form
		var formObj = Ext.getCmp(
				config.id)
				.getForm();

		g_hideStatusBox();
		formObj
				.submit({
					url : config.urlSubmitUpdatePreferences,
					isMessageIgnore : false,
					success : function(form, action) {
						Ext.getCmp("updateButton" + config.nameSpace).enable();
						Ext.get(document.body.id).unmask();

						g_showStatusBox();

						var jsonResponse = uRadixUtilities
								.jsonDecode(action.response.responseText);						
								
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
									uRadixClientMessageHandler.setAdvice(false, messages);
								} 
							}
						} else {
									// Overriding setMessages from URadix
									uRadixClientMessageHandler.setAdvice(
											true, jsonResponse.advice);
						}
						
						Ext.getCmp('isFormUpdated').setValue('false');

						/**
						 * if (config.redirectURL) { eval("document." +
						 * config.redirectFormName + ".submit()"); } else {
						 * uRadixRedirectHandler
						 * .redirect(config.urlSuccessPreferences +
						 * "?systemUserId=" + config.userData.sysKey); }
						 */
					},
					failure : function(form, action) {
						g_showStatusBox();
						Ext.getCmp("updateButton" + config.nameSpace).enable();
						Ext.get(document.body.id).unmask();
					}
				});
	}

	// Form Submit Handler
	function formSubmitHandler() {
		// Get Form
		var formObj = Ext.getCmp(
				config.id)
				.getForm();
		var formValues = formObj.getValues();
		var isFormUpdated = Ext.getCmp('isFormUpdated').getValue();
		if (isFormUpdated != null && isFormUpdated == 'false') {
			return;
		}

		Ext.getCmp('emails').setValue(uRadixUtilities.jsonEncode(_email));
		Ext.getCmp('faxes').setValue(uRadixUtilities.jsonEncode(_fax));
		// Disable Update Button
		Ext.getCmp("updateButton" + config.nameSpace).disable();

		// Mask Body
		Ext.get(document.body.id).mask("<b> Loading...</b> ", "x-mask-loading");

		// Submit To Server
		formSubmit();
	}
	
	
	new Ext.Panel(
			{
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
										id : config.id,
										labelAlign : "top",
										hidden:false,
										items : [{
												xtype : "panel",
												height : 30,
												border : 0,
												style : "boder:none;",
												bodyBorder : 0,
												bodyStyle : "border:none",
												hideBorders : true,
												style : "padding-left:20px;",
												html : "<br><span class='preferences-text'>Select where you would like to receive advice Notifications.</span>"
											},{
												xtype : "panel",
												bodyStyle : "padding-left:45px;",
												border : false,
												layout : "form",
												items : [{
														xtype : "hidden",
														id : "isFormUpdated",
														name : "isFormUpdated",
														value : "false"
													},{
														xtype : "hidden",
														id : "emails",
														name : "emails",
														value : ""
													},{
														xtype : "hidden",
														id : "faxes",
														name : "faxes",
														value : ""
													},{
														xtype : "radiogroup",
														id : "adviceNotificationRadioGroup",
														name : "adviceNotificationRadioGroup",
														style : "padding-left:2px;padding-bottom:10px;",
														vertical : true,
														columns : 1,
														items : dataCodeMap
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


	var formPanel = Ext.getCmp(config.id);
	var isFormPanelDirty = false;
	formPanel.getForm().items.each(function(f) {
		f.on("change", function() {
			isFormPanelDirty = true;
		});
	});

	Ext.getCmp(config.id)
			.getForm().setValues(config.userData);

	var jsonFunctionObject = {
		noCancel : function() {
		}
	};

	return jsonFunctionObject;

};
