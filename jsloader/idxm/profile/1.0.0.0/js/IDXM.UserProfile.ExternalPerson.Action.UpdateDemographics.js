
Ext.namespace("IDXM.ExternalUserProfile.Action.Edit");
IDXM.ExternalUserProfile.Action.Edit = function (config){
	
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
	
	var idxmEmailsPanel = new IDXM.emailsPanel({id:"emailFieldPanel"+config.nameSpace,blnDisplayAdvicesheet:blnDisplayAdvicesheet,unMarkAdviceSheetForFaxPanel:"Ext.getCmp('faxFieldPanel"+config.nameSpace+"').unMarkAdviceSheet()",loadArray:config.userData.email, emailTypes:config.emailTypes,maxTypeRows:config.maxTypeRows});	
	var idxmPhonesPanel = new IDXM.phonesPanel({id:"phoneFieldPanel"+config.nameSpace,loadArray:config.userData.phone, phoneTypes:config.phoneTypes,maxTypeRows:config.maxTypeRows,"isPhoneRequired":isPhoneRequired});
	var idxmFaxPanel = new IDXM.faxsPanel({id:"faxFieldPanel"+config.nameSpace,blnDisplayAdvicesheet:blnDisplayAdvicesheet,unMarkAdviceSheetForEmailPanel:"Ext.getCmp('emailFieldPanel"+config.nameSpace+"').unMarkAdviceSheet()",loadArray:config.userData.fax, faxTypes:config.faxTypes,maxTypeRows:config.maxTypeRows});
	
	//Form Submit
	function formSubmit(){
			
		//Get Form
		var formObj = Ext.getCmp("idxmExternalUserProfilePanelForm"+config.nameSpace).getForm();
		
		g_hideStatusBox();
			
		formObj.submit({
						url: config.urlSubmitUpdateProfile,
						clientValidation:false,
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
		
		//Validate Contacts
		var areEmailContactsValid = IDXM.UserProfile.Utilities.Contacts.ValidateEmailContacts({"formId":"idxmExternalUserProfilePanelForm"+config.nameSpace,"contactCounter":formValues.emailContactCounter,booleanVariableTobeSet:"areEmailContactsValid"});
		var arePhoneContactsValid = IDXM.UserProfile.Utilities.Contacts.ValidatePhoneContacts({"formId":"idxmExternalUserProfilePanelForm"+config.nameSpace,"contactCounter":formValues.phoneContactCounter,booleanVariableTobeSet:"arePhoneContactsValid","isPhoneRequired":isPhoneRequired});
		var areFaxContactsValid = IDXM.UserProfile.Utilities.Contacts.ValidateFaxContacts({"formId":"idxmExternalUserProfilePanelForm"+config.nameSpace,"contactCounter":formValues.faxContactCounter,booleanVariableTobeSet:"areFaxContactsValid"});
		
		//If All Contacts Are Valid
		if(areEmailContactsValid && arePhoneContactsValid && areFaxContactsValid){
				if(blnDisplayAdvicesheet){
					var isEmailAdviceSheetValid = Ext.getCmp("emailFieldPanel"+config.nameSpace).isAdviceSheetValid(
																							Ext.getCmp("idxmExternalUserProfilePanelForm"+config.nameSpace)
																							,"AdviceNotificationCheckBox"
																						);
	
					var isFaxAdviceSheetValid = Ext.getCmp("faxFieldPanel"+config.nameSpace).isAdviceSheetValid(
																							Ext.getCmp("idxmExternalUserProfilePanelForm"+config.nameSpace)
																							,"AdviceNotificationCheckBox"
																						);
				}else{
					var isEmailAdviceSheetValid = true;
					var isFaxAdviceSheetValid = true;
				}
				if(isEmailAdviceSheetValid && isFaxAdviceSheetValid){
					//Disable Update Button
					Ext.getCmp("updateButton"+config.nameSpace).disable();		
					
					//Mask Body
					Ext.get(document.body.id).mask("<b> Loading...</b> ", "x-mask-loading");					

					//Submit To Server
					formSubmit();
				}else{				
					IDXM.UserProfile.PopUp.AdviceNotificationOption({});
				}
		}		
	}
	
	var noAdviceSheetRadioButton = {};
	if(blnDisplayAdvicesheet){
		noAdviceSheetRadioButton =
			new Ext.form.Radio({
                hideLabel: true,
                labelSeparator: '',
                boxLabel: 'Let User Select Advice Notification',
                name: 'AdviceNotificationCheckBox',
                inputValue:Ext.encode({"adviceType":"none","adviceIndex":this.dynamicID}),
                value:this.dynamicID,                
                ctCls:"no-advice-sheet-label-txt",
                cls:"no-advice-sheet-label-txt",
                listeners:{
                	check:function(){
                		eval("Ext.getCmp('emailFieldPanel"+config.nameSpace+"').unMarkAdviceSheet()");
                		eval("Ext.getCmp('faxFieldPanel"+config.nameSpace+"').unMarkAdviceSheet()");
                	}
                }
            });			
	}else{
		noAdviceSheetRadioButton = {
			xtype:"panel"
			,border:false
			,bodyBorder:false
			,hideBorders:true
		};
	}
	
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
							,items:[{
										xtype: "idxmExternalUserProfilePanel"
										,id:"idxmExternalUserProfilePanel"+config.nameSpace
										, userData: config.userData
										, formObjectName:"userProfileAction"+config.nameSpace
									}
									,idxmEmailsPanel
									,idxmPhonesPanel
									,idxmFaxPanel
									,noAdviceSheetRadioButton
							]
						}]
					,buttons:	[{
									id:"cancelButton"+config.nameSpace
									//,tabIndex:498
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
									//,tabIndex:499
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
	
	return jsonFunctionObject;

};
