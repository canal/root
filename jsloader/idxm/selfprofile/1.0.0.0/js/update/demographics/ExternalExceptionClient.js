
Ext.namespace("idxm.selfprofile.update.demographics.ExternalExceptionClient");
idxm.selfprofile.update.demographics.ExternalExceptionClient = function (config){

	if(config.redirectURL){
		if(!((config.redirectURL.substring(0,7).toLowerCase().trim() == "http://") || (config.redirectURL.substring(0,8).toLowerCase().trim() == "https://"))){
			//alert("Invalid Redirect URL");
		}
	}	
	
	//Form Panel
	Ext.form.Field.prototype.msgTarget = 'sideDetails';

	var isPhoneRequired = false;

	var blnDisplayAdvicesheet = false;
	if(config.userData.userClassCode == IDXM_USER_CLASS_CLIENT){
		blnDisplayAdvicesheet = true;

		//If User has one ore more phones
		if(config.userData.phone && config.userData.phone.length > 0){
			//If user has one or more phones and status is not terminated then phone field is required.
			if((config.userData.userStatus.statusCode != IDXM_USER_STATUS_CODE_MAP["TERMINATED"])){
				isPhoneRequired = true;
			}				
		}
	}

	var contactCodeMap = {};
	contactCodeMap["email0"] = (userData.accountNotificationEmailIndicator=="" || userData.accountNotificationEmailIndicator=="off")?"Primary":"Account Notification";
	contactCodeMap["email1"] = "Alternate";
	contactCodeMap["phone0"] = "Primary";
	contactCodeMap["phone1"] = "Alternate";
	contactCodeMap["fax0"] = "Primary";
	contactCodeMap["fax1"] = "Alternate";
	
	function setContactValues(o){
		var _email = o.email;
		var _phone = o.phone;
		var _fax = o.fax;

		for(var i=0;i<=1;i++)
		{			
			try {
				if(_email[i].type=="Account Notification" || _email[i].type=="Primary")
				{
					Ext.getCmp("emailAddress0").setValue(_email[i].value);
					Ext.getCmp("emailId0").setValue(_email[i].id);					
					Ext.getCmp("emailAdviceSheetNotification0").setValue(_email[i].adviceNotification);
				}
				else
				{
					Ext.getCmp("emailAddress1").setValue(_email[i].value);
					Ext.getCmp("emailId1").setValue(_email[i].id);
					Ext.getCmp("emailAdviceSheetNotification1").setValue(_email[i].adviceNotification);				
				}
			} catch(e){}

			try {
				if(_phone[i].type=="Primary")
				{
					Ext.getCmp("phoneAddress0").setValue(_phone[i].value);
					Ext.getCmp("phoneId0").setValue(_phone[i].id);
					Ext.getCmp("phoneExtension0").setValue(_phone[i].extention);
				}
				else
				{
					Ext.getCmp("phoneAddress1").setValue(_phone[i].value);
					Ext.getCmp("phoneId1").setValue(_phone[i].id);
					Ext.getCmp("phoneExtension1").setValue(_phone[i].extention);
				}
			} catch(e){}

			try {
				if(_fax[i].type=="Primary")
				{
					Ext.getCmp("faxAddress0").setValue(_fax[i].value);
					Ext.getCmp("faxId0").setValue(_fax[i].id);
					Ext.getCmp("faxAdviceSheetNotification0").setValue(_fax[i].adviceNotification);
				}
				else
				{
					Ext.getCmp("faxAddress1").setValue(_fax[i].value);
					Ext.getCmp("faxId1").setValue(_fax[i].id);
					Ext.getCmp("faxAdviceSheetNotification1").setValue(_fax[i].adviceNotification);				
				}
			} catch(e){}
		}		
	};	
	
	//Form Submit
	function formSubmit(){
		//Disable Update Button
		Ext.getCmp("updateButton"+config.nameSpace).disable();
			
		//Get Form
		var formObj = Ext.getCmp("idxmExternalUserProfilePanelForm"+config.nameSpace).getForm();

		g_hideStatusBox();

		formObj.submit({
						url: config.urlSubmitUpdateProfile,
						clientValidation:true,
						isRedirect:true,
						success: function(form,action)
						{
							if(config.redirectURL){
								eval("document." +config.redirectFormName+".submit()");
							}else{								
								uRadixRedirectHandler.redirect(config.urlUpdateProfile+"?systemUserId="+config.userData.sysKey);
							}
						},
						failure: function(form,action)
						{
							g_showStatusBox();
							Ext.getCmp("updateButton"+config.nameSpace).enable();
							Ext.get(document.body.id).unmask();
						}
		});
	};	
	
	//Form Submit Handler
	function formSubmitHandler(){
		//Get Form
		var formObj = Ext.getCmp("idxmExternalUserProfilePanelForm"+config.nameSpace).getForm();
		var formValues = formObj.getValues();		
		
		var emailCounter=0, faxCounter=0, phoneCounter=0;
		for(var i=0;i<=1;i++)
		{
			try{
				if(!Ext.isEmpty(Ext.getCmp("emailAddress"+i).getValue()))
				{					
					emailCounter++;
					Ext.getCmp("emailDeleted"+i).setValue("false");
					Ext.getCmp("emailTypeCode"+i).setValue(contactCodeMap["email"+i]);
				}
				else
				{
					//Set as deleted
					if(!Ext.isEmpty(Ext.getCmp("emailId"+i).getValue()))
					{
						Ext.getCmp("emailDeleted"+i).setValue("true");
					}
				}
			}catch(e){}

			try{
				if(!Ext.isEmpty(Ext.getCmp("phoneAddress"+i).getValue()))
				{
					phoneCounter++;
					Ext.getCmp("phoneDeleted"+i).setValue("false");
					Ext.getCmp("phoneTypeCode"+i).setValue(contactCodeMap["phone"+i]);
				}
				else
				{
					//Set as deleted
					if(!Ext.isEmpty(Ext.getCmp("phoneId"+i).getValue()))
					{
						Ext.getCmp("phoneDeleted"+i).setValue("true");
					}
				}
			}catch(e){}

			try{
				if(!Ext.isEmpty(Ext.getCmp("faxAddress"+i).getValue()))
				{
					faxCounter++;
					Ext.getCmp("faxDeleted"+i).setValue("false");
					Ext.getCmp("faxTypeCode"+i).setValue(contactCodeMap["fax"+i]);
				}
				else
				{
					//Set as deleted
					if(!Ext.isEmpty(Ext.getCmp("faxId"+i).getValue()))
					{
						Ext.getCmp("faxDeleted"+i).setValue("true");
					}
				}
			}catch(e){}
		}

		Ext.getCmp("emailContactCounter").setValue(emailCounter);
		Ext.getCmp("phoneContactCounter").setValue(phoneCounter);
		Ext.getCmp("faxContactCounter").setValue(faxCounter);
		
		if(formObj.isValid()) {
			var _email = config.userData.email;
			var _fax = config.userData.fax;
			var isValidAdviceNotification = true;
			var emailOrFax = '';
			for(var i=0;i<=1;i++)
			{
				try{
					if(Ext.isEmpty(Ext.getCmp("emailAddress"+i).getValue())  
							&& !Ext.isEmpty(Ext.getCmp("emailAdviceSheetNotification"+i).getValue()) 
							&& Ext.getCmp("emailAdviceSheetNotification"+i).getValue() == 'true')
					{
						emailOrFax = _email[i].value
						isValidAdviceNotification = false;
						break;
					}
				}catch(e){}
				
				try{
					if(Ext.isEmpty(Ext.getCmp("faxAddress"+i).getValue()) 
							&& !Ext.isEmpty(Ext.getCmp("faxAdviceSheetNotification"+i).getValue()) 
							&& Ext.getCmp("faxAdviceSheetNotification"+i).getValue() == 'true')
					{
						emailOrFax = _fax[i].value
						isValidAdviceNotification = false;
						break;
					}
				}catch(e){}			
			}
			if(!isValidAdviceNotification) {
				idxm.selfprofile.popups.AdviceNotificationWarning({emailOrFax:emailOrFax});
				//Disable Update Button
				Ext.getCmp("updateButton"+config.nameSpace).enable();
			} else {
				//Mask Body
				Ext.get(document.body.id).mask("<b> Loading...</b> ", "x-mask-loading");
				
				//Submit To Server
				formSubmit();		
			}	
		} 		
	};

	
	new Ext.Panel({
					renderTo: config.formPanelDivID
					,border:false
					,bodyBorder:false
					,hideBorders:true
					,width:(config.userData.userClassCode == IDXM_USER_CLASS_CLIENT) ? 1000 :850
					,items:[{
							xtype: "panel",
							border: false,					
							cls:"portal-title",
							html: "Update User Profile"	
						},{
							xtype: "panel",
							height:8,
							border:0,
							style: "boder:none;",
							bodyBorder:0,
							bodyStyle:"border:none",
							hideBorders: true
						},{
							xtype: "panel"
							,border:0
							,style: "boder:none;"
							,bodyBorder:0
							,bodyStyle:"border:none"
							,hideBorders: true
							,html:"<span class='idxmTextSmall'><b>*Required</b></span>"
						},{
							xtype:"uRadix.form.FormPanel"
							,autoScroll: true																	
							//,cls:"user-profile-body"
							,id:"idxmExternalUserProfilePanelForm"+config.nameSpace
							,labelAlign:"top"
							,items:[{
										xtype: "idxm.selfprofile.ux.panel.ExternalPerson"
										,id:"idxmExternalUserProfilePanel"+config.nameSpace
										, userData: config.userData
										, formObjectName:"userProfileAction"+config.nameSpace
									}
									,{
										xtype:"panel"
										,bodyStyle: "padding-left:25px;"
										,border: false
										,layout:"form"
										,items:[
// START NESTED PANEL
									{
										xtype:"textfield"
										,fieldLabel:(userData.accountNotificationEmailIndicator=="" || userData.accountNotificationEmailIndicator=="off")?"Primary Email":"Account Notification Email"
										,allowBlank:false
										,id:"emailAddress0"
										,name:"emailAddress0"
										,vtype:"email"
										,maxLength:256
										,width:200
									}
									,{
										xtype:"hidden"
										,id:"emailTypeCode0"
										,name:"emailTypeCode0"
										,value:(userData.accountNotificationEmailIndicator=="" || userData.accountNotificationEmailIndicator=="off")?"Primary":"Account Notification"
									}
									,{
										xtype:"hidden"
										,id:"emailId0"
										,name:"emailId0"
									}
									,{
										xtype:"hidden"
										,id:"emailDeleted0"
										,name:"emailDeleted0"
										,value:"false"
									}
									,{
										xtype:"hidden"
										,id:"emailAdviceSheetNotification0"
										,name:"emailAdviceSheetNotification0"
										,value:""
									}									
									,{
										xtype:"textfield"
										,fieldLabel:"Alternate Email"
										,allowBlank:true
										,id:"emailAddress1"
										,name:"emailAddress1"
										,vtype:"email"
										,maxLength:256
										,width:200
									}
									,{
										xtype:"hidden"
										,id:"emailTypeCode1"
										,name:"emailTypeCode1"
									}
									,{
										xtype:"hidden"
										,id:"emailId1"
										,name:"emailId1"
									}
									,{
										xtype:"hidden"
										,id:"emailDeleted1"
										,name:"emailDeleted1"
										,value:"false"
									}
									,{
										xtype:"hidden"
										,id:"emailAdviceSheetNotification1"
										,name:"emailAdviceSheetNotification1"
										,value:""
									}										
									,{
										xtype:"hidden"
										,id:"emailContactCounter"
										,name:"emailContactCounter"
										,value:"1"
									}
									//PRIMARY PHONE
									,{
										xtype:"panel"
										,width:900
										,layout:"column"
										,border:false
										,items:[
											{
												xtype:"panel"
												,width:200
												,border:false
												,layout:"form"
												,items:[
													{
														xtype:"textfield"
														,fieldLabel:"Primary Phone"
														,allowBlank:(isPhoneRequired)?false:true
														,id:"phoneAddress0"
														,name:"phoneAddress0"
														,maxLength:20
														,width:200
														,msgTarget: "under"
													}
													,{
														xtype:"hidden"
														,id:"phoneTypeCode0"
														,name:"phoneTypeCode0"
														,msgTarget: "under"
													}
												]
											}
											,{
												layout:"form",
												width:15,
												style:"padding-top:22px; padding-left:5px;",
												cls:"portal-plain-panel",
												border:false,
												html:"X"
											}
											,{
												xtype:"panel"
												,width:50
												,border:false
												,layout:"form"
												,items:[
													{
														xtype:"textfield"
														,fieldLabel:"&nbsp;"
														,labelSeparator:" "
														,allowBlank:true
														,id:"phoneExtension0"
														,name:"phoneExtension0"
														,maxLength:10
														,width:50
														,msgTarget:"phoneAddressTarget0"
														,msgLengthText:"The maximum length for phone extension is 10"
													}
												]
											}
											,{
												id:"phoneAddressTarget0",
												layout:"form",
												cls:"invalid-target-field-panel",
												style:"padding-top:22px;padding-left:10px;",
												border:false
											}
											,{
												xtype:"hidden"
												,id:"phoneId0"
												,name:"phoneId0"
											}
											,{
												xtype:"hidden"
												,id:"phoneDeleted0"
												,name:"phoneDeleted0"
												,value:"false"
											}
											,{
												xtype:"hidden"
												,id:"phoneContactCounter"
												,name:"phoneContactCounter"
												,value:"1"
											}
										]
									}
									//ALTERNATE PHONE
									,{
										xtype:"panel"
										,width:900
										,layout:"column"
										,border:false
										,items:[
											{
												xtype:"panel"
												,width:200
												,border:false
												,layout:"form"
												,items:[
													{
														xtype:"textfield"
														,fieldLabel:"Alternate Phone"
														,allowBlank:true
														,id:"phoneAddress1"
														,name:"phoneAddress1"
														,maxLength:20
														,width:200
														,msgTarget: "phoneAddressTarget1"
													}
													,{
														xtype:"hidden"
														,id:"phoneTypeCode1"
														,name:"phoneTypeCode1"
													}
												]
											}
											,{
												layout:"form",
												width:15,
												style:"padding-top:22px; padding-left:5px;",
												cls:"portal-plain-panel",
												border:false,
												html:"X"
											}
											,{
												xtype:"panel"
												,width:50
												,border:false
												,layout:"form"
												,items:[
													{
														xtype:"textfield"
														,fieldLabel:"&nbsp;"
														,labelSeparator:" "
														,allowBlank:true
														,id:"phoneExtension1"
														,name:"phoneExtension1"
														,maxLength:10
														,width:50
														,msgTarget:"phoneAddressTarget1"
														,msgLengthText:"The maximum length for phone extension is 10"
													}
												]
											}
											,{
												id:"phoneAddressTarget1",
												layout:"form",
												cls:"invalid-target-field-panel",
												style:"padding-top:22px;padding-left:10px;",
												border:false
											}
											,{
												xtype:"hidden"
												,id:"phoneId1"
												,name:"phoneId1"
											}
											,{
												xtype:"hidden"
												,id:"phoneDeleted1"
												,name:"phoneDeleted1"
												,value:"false"
											}
										]
									}
									//PRIMARY FAX
									,{
										xtype:"textfield"
										,fieldLabel:"Primary Fax"
										,allowBlank:true
										,id:"faxAddress0"
										,name:"faxAddress0"
										,maxLength:20
										,width:200
									}
									,{
										xtype:"hidden"
										,id:"faxTypeCode0"
										,name:"faxTypeCode0"
									}
									,{
										xtype:"hidden"
										,id:"faxId0"
										,name:"faxId0"
									}
									,{
										xtype:"hidden"
										,id:"faxDeleted0"
										,name:"faxDeleted0"
										,value:"false"
									}
									,{
										xtype:"hidden"
										,id:"faxAdviceSheetNotification0"
										,name:"faxAdviceSheetNotification0"
										,value:""
									}										
									//ALTERNATE FAX
									,{
										xtype:"textfield"
										,fieldLabel:"Alternate Fax"
										,allowBlank:true
										,id:"faxAddress1"
										,name:"faxAddress1"
										,maxLength:20
										,width:200
									}
									,{
										xtype:"hidden"
										,id:"faxTypeCode1"
										,name:"faxTypeCode1"
									}
									,{
										xtype:"hidden"
										,id:"faxId1"
										,name:"faxId1"
									}
									,{
										xtype:"hidden"
										,id:"faxDeleted1"
										,name:"faxDeleted1"
										,value:"false"
									}
									,{
										xtype:"hidden"
										,id:"faxAdviceSheetNotification1"
										,name:"faxAdviceSheetNotification1"
										,value:""
									}										
									,{
										xtype:"hidden"
										,id:"faxContactCounter"
										,name:"faxContactCounter"
										,value:"1"
									}
									//END NESTED PANEL
										]
									}

							]
						}]
					,buttons:	[{
									id:"cancelButton"+config.nameSpace
									,text:"CANCEL"
									,ctCls :"support-portal-btn-cancel"
									,handler:function(){
										if(isFormPanelDirty){
											idxm.core.popups.Cancel({doCancelFunction:jsonFunctionObject.doCancel,noCancelFunction:jsonFunctionObject.noCancel});
										}else{										
											if(config.redirectURL){
												eval("document." +config.redirectFormName+".submit()");											
											}else{										
												document.location=config.urlUpdateProfile+"?systemUserId="+config.userData.sysKey;
											}
										}
									}
								},{
									id:"updateButton"+config.nameSpace
									,text:"UPDATE"
									,ctCls :"support-portal-btn"
									,handler:formSubmitHandler
								}]
					,listeners: 	{uradix_enterkey: formSubmitHandler}				
				});	
	
	var formPanel = Ext.getCmp("idxmExternalUserProfilePanelForm"+config.nameSpace);
	var isFormPanelDirty = false;
	formPanel.getForm().items.each(function(f){
		f.on("change",function(){
			isFormPanelDirty = true;
		});
	});					

	Ext.getCmp("idxmExternalUserProfilePanelForm"+config.nameSpace).getForm().setValues(config.userData);

	//Set Id, Address values; ....Hacking this hacky code
	setContactValues(config.userData);

	var jsonFunctionObject = {
		doCancel:function(){
			if(config.redirectURL){
				eval("document." +config.redirectFormName+".submit()");
			}else{
				document.location=config.urlUpdateProfile+"?systemUserId="+config.userData.sysKey;
			}
		},
		noCancel:function(){
		}	
	};
	
	return jsonFunctionObject;

};

