
Ext.namespace("idxm.profile.demographics.provider.exception.EditController");
idxm.profile.demographics.provider.exception.EditController = function (config){

	//Form Panel
	Ext.form.Field.prototype.msgTarget = 'sideDetails';

	var isPhoneRequired = false;

	var blnDisplayAdvicesheet = false;
	/*if(config.userData.userClassCode == IDXM_USER_CLASS_CLIENT){
		blnDisplayAdvicesheet = true;

		//If User has one ore more phones
		if(config.userData.phone && config.userData.phone.length > 0){
			//If user has one or more phones and status is not terminated then phone field is required.
			if((config.userData.userStatus.statusCode != IDXM_USER_STATUS_CODE_MAP["TERMINATED"])){
				isPhoneRequired = true;
			}				
		}
	}*/

	var contactCodeMap = {};
	contactCodeMap["email0"] = "Primary";
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
				if(_email[i].type=="Primary")
				{
					Ext.getCmp("emailAddress0").setValue(_email[i].value);
					Ext.getCmp("emailId0").setValue(_email[i].id);
				}
				else
				{
					Ext.getCmp("emailAddress1").setValue(_email[i].value);
					Ext.getCmp("emailId1").setValue(_email[i].id);
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
				}
				else
				{
					Ext.getCmp("faxAddress1").setValue(_fax[i].value);
					Ext.getCmp("faxId1").setValue(_fax[i].id);
				}
			} catch(e){}
		}
	}
	
	//Form Submit
	function formSubmit(){
			
		//Get Form
		var formObj = Ext.getCmp("idxmExternalUserProfilePanelForm"+config.nameSpace).getForm();

		g_hideStatusBox();

		formObj.submit({
						url: config.urlSubmitUpdateProfile,
						clientValidation:true,
						isRedirect:true,
						success: function(form,action)
						{
							uRadixRedirectHandler.redirect(config.urlUpdateProfile+"?systemUserId="+config.userData.sysKey);
						},
						failure: function(form,action)
						{
							g_showStatusBox();
							Ext.getCmp("updateButton"+config.nameSpace).enable();
							Ext.get(document.body.id).unmask();
						}
		});
	}	
	
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
		
		//Disable Update Button
		Ext.getCmp("updateButton"+config.nameSpace).disable();
		
		//Mask Body
		Ext.get(document.body.id).mask("<b> Loading...</b> ", "x-mask-loading");		

		//Submit To Server
		formSubmit();
	}
	
	new Ext.Panel({
					renderTo: config.formPanelDivID
					,border:false
					,bodyBorder:false
					,hideBorders:true
					,width:(config.userData.userClassCode == IDXM_USER_CLASS_PROVIDER) ? 1000 :850
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
							xtype: "idxm.profile.ux.ProfileBar",
							nameSpace: config.nameSpace,
							hideAllIcons:true,
							statusCode: config.userData.userStatus.statusCode,
							statusName: config.userData.userStatus.statusName,
							userSubClassCode: config.userData.userSubClassCode,
							mirrorUserURL: config.mirrorUserURL,
							sysKey: config.userData.sysKey,
							userTypeCode: config.userData.userTypeCode,
							userClassCode: config.userData.userClassCode
						},{
							xtype:"uRadix.form.FormPanel"
							,autoScroll: true																	
							,cls:"user-profile-body"
							,id:"idxmExternalUserProfilePanelForm"+config.nameSpace
							,labelAlign:"top"
							,items:[{
										xtype: "idxmExternalUserProfilePanel"
										,id:"idxmExternalUserProfilePanel"+config.nameSpace
										, userData: config.userData
										, formObjectName:"userProfileAction"+config.nameSpace
									}
									,{
										xtype:"textfield"
										,fieldLabel:"Primary Email"
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
										,value:"Primary"
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
														,allowBlank:true
														,id:"phoneAddress0"
														,name:"phoneAddress0"
														,maxLength:20
														,width:200
														,msgTarget: "phoneAddressTarget0"
													}
													,{
														xtype:"hidden"
														,id:"phoneTypeCode0"
														,name:"phoneTypeCode0"
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
										,id:"faxContactCounter"
										,name:"faxContactCounter"
										,value:"1"
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
											document.location=config.urlUpdateProfile+"?systemUserId="+config.userData.sysKey;
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
	
	var jsonFunctionObject = {
		doCancel:function(){
			document.location=config.urlUpdateProfile+"?systemUserId="+config.userData.sysKey;
		},
		noCancel:function(){
		}	
	};	

	//Set Id, Address values; ....Hacking this hacky code
	setContactValues(config.userData);
	
	return jsonFunctionObject;

};
