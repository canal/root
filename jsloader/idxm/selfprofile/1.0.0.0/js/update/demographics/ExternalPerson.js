
Ext.namespace("idxm.selfprofile.update.demographics.ExternalPerson");
idxm.selfprofile.update.demographics.ExternalPerson = function (config){
	
	if(config.redirectURL){
		if(!((config.redirectURL.substring(0,7).toLowerCase().trim() == "http://") || (config.redirectURL.substring(0,8).toLowerCase().trim() == "https://"))){
			//alert("Invalid Redirect URL");
		}
	}	
	
	//Form Panel
	Ext.form.Field.prototype.msgTarget = 'sideDetails';
	
	isPhoneRequired = false;
	
	var blnDisplayAdvicesheet = false;
	if(config.userData.userClassCode == IDXM_USER_CLASS_CLIENT){
		blnDisplayAdvicesheet = true;
		isPhoneRequired = true;
	}
	
	var idxmEmailsPanel = new idxm.selfprofile.ux.panel.contacts.EmailPanel({id:"emailFieldPanel"+config.nameSpace,blnDisplayAdvicesheet:blnDisplayAdvicesheet,unMarkAdviceSheetForFaxPanel:"Ext.getCmp('faxFieldPanel"+config.nameSpace+"').unMarkAdviceSheet()",loadArray:config.userData.email, emailTypes:config.emailTypes,maxTypeRows:config.maxTypeRows});	
	var idxmPhonesPanel = new idxm.selfprofile.ux.panel.contacts.PhonePanel({id:"phoneFieldPanel"+config.nameSpace,loadArray:config.userData.phone, phoneTypes:config.phoneTypes,maxTypeRows:config.maxTypeRows,"isPhoneRequired":isPhoneRequired});
	var idxmFaxPanel = new idxm.selfprofile.ux.panel.contacts.FaxPanel({id:"faxFieldPanel"+config.nameSpace,blnDisplayAdvicesheet:blnDisplayAdvicesheet,unMarkAdviceSheetForEmailPanel:"Ext.getCmp('emailFieldPanel"+config.nameSpace+"').unMarkAdviceSheet()",loadArray:config.userData.fax, faxTypes:config.faxTypes,maxTypeRows:config.maxTypeRows});
	
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
		
		//Validate Contacts
		var areEmailContactsValid = idxm.selfprofile.validation.EmailContacts({"formId":"idxmExternalUserProfilePanelForm"+config.nameSpace,"contactCounter":formValues.emailContactCounter,booleanVariableTobeSet:"areEmailContactsValid"});
		var arePhoneContactsValid = idxm.selfprofile.validation.PhoneContacts({"formId":"idxmExternalUserProfilePanelForm"+config.nameSpace,"contactCounter":formValues.phoneContactCounter,booleanVariableTobeSet:"arePhoneContactsValid","isPhoneRequired":isPhoneRequired});
		var areFaxContactsValid = idxm.selfprofile.validation.FaxContacts({"formId":"idxmExternalUserProfilePanelForm"+config.nameSpace,"contactCounter":formValues.faxContactCounter,booleanVariableTobeSet:"areFaxContactsValid"});
		
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
				if(isEmailAdviceSheetValid && isFaxAdviceSheetValid){
					//Disable Update Button
					Ext.getCmp("updateButton"+config.nameSpace).disable();				

					//Submit To Server
					formSubmit();
				}else{				
					idxm.selfprofile.popups.AdviceNotificationOption({});
				}
			}else{
					//Disable Update Button
					Ext.getCmp("updateButton"+config.nameSpace).disable();	
					
					//Mask Body
					Ext.get(document.body.id).mask("<b> Loading...</b> ", "x-mask-loading");

					//Submit To Server
					formSubmit();			
			}
		}
	};	
	
	var smallTextForAdvice;
	if(blnDisplayAdvicesheet){
		smallTextForAdvice = {
			xtype: "panel"
			,height:20
			,border:0
			,style: "boder:none;"
			,bodyBorder:0
			,bodyStyle:"border:none"
			,hideBorders: true
			,style:"padding-left:10px;"
			,html:""
		};
	}else{
		smallTextForAdvice = {
			xtype: "panel"
			,border:0
			,style: "boder:none;"
			,bodyBorder:0
			,bodyStyle:"border:none"
			,hideBorders: true
			,html:""
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
							xtype: "panel"
							,border:0
							,style: "boder:none;"
							,bodyBorder:0
							,bodyStyle:"border:none"
							,hideBorders: true
							,html:"<span class='idxmTextSmall'><b>*Required</b></span>"
						},smallTextForAdvice,{
							xtype:"uRadix.form.FormPanel"
							,autoScroll: true																	
							,id:"idxmExternalUserProfilePanelForm"+config.nameSpace
							,items:[{
										xtype: "idxm.selfprofile.ux.panel.ExternalPerson"
										,id:"idxmExternalUserProfilePanel"+config.nameSpace
										, userData: config.userData
										, formObjectName:"userProfileAction"+config.nameSpace
									}
									,idxmEmailsPanel
									,idxmPhonesPanel
									,idxmFaxPanel
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
