
Ext.namespace("IDXM.UserProfile.Action.Edit");
IDXM.UserProfile.Action.Edit = function (config){	
	
	//Form Panel
	Ext.form.Field.prototype.msgTarget = 'sideDetails';
	
	var isPhoneRequired = false;
	
	var idxmEmailsPanel = new IDXM.emailsPanel({loadArray:config.userData.email,emailTypes:config.emailTypes,maxTypeRows:config.maxTypeRows});	
	var idxmPhonesPanel = new IDXM.phonesPanel({loadArray:config.userData.phone,phoneTypes:config.phoneTypes,maxTypeRows:config.maxTypeRows,"isPhoneRequired":isPhoneRequired});
	var idxmFaxPanel = new IDXM.faxsPanel({loadArray:config.userData.fax,faxTypes:config.faxTypes,maxTypeRows:config.maxTypeRows});
	
	//Form Submit
	function formSubmit(){
		
		//Mask Body
		Ext.get(document.body.id).mask("<b> Loading...</b> ", "x-mask-loading");		
			
		//Get Form
		var formObj = Ext.getCmp("idxmUserProfilePanelForm"+config.nameSpace).getForm();
		
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
		var formObj = Ext.getCmp("idxmUserProfilePanelForm"+config.nameSpace).getForm();		
		var formValues = formObj.getValues();

		//Do Contacts Validation
		var areEmailContactsValid = IDXM.UserProfile.Utilities.Contacts.ValidateEmailContacts({"formId":"idxmUserProfilePanelForm"+config.nameSpace,"contactCounter":formValues.emailContactCounter,booleanVariableTobeSet:"areEmailContactsValid"});
		var arePhoneContactsValid = IDXM.UserProfile.Utilities.Contacts.ValidatePhoneContacts({"formId":"idxmUserProfilePanelForm"+config.nameSpace,"contactCounter":formValues.phoneContactCounter,booleanVariableTobeSet:"arePhoneContactsValid"});
		var areFaxContactsValid = IDXM.UserProfile.Utilities.Contacts.ValidateFaxContacts({"formId":"idxmUserProfilePanelForm"+config.nameSpace,"contactCounter":formValues.faxContactCounter,booleanVariableTobeSet:"areFaxContactsValid"});
		
		//If All Contacts Are Valid
		if(areEmailContactsValid && arePhoneContactsValid && areFaxContactsValid){
			
			//Disable Update Button
			Ext.getCmp("updateButton"+config.nameSpace).disable();				
			
			//Groups 
			if(config.userData.reportsTo != formValues.reportsTo || config.userData.department != formValues.department){		
				uRadixWindowManager.uRadixWindowRegistry["groupsAndRolesChangeWarning"+config.nameSpace].autoLoad.params['$$mpicallback$$'] = config.thisObjectName+".groupsAndRolesChangeWarningCallBack";
				uRadixWindowManager.launch({id:"groupsAndRolesChangeWarning"+config.nameSpace, key:"groupsAndRolesChangeWarning"+config.nameSpace});				
			}else{
				formSubmit();
			}
		}
	}
	
	
	//Panel
	var formPanel =
			new Ext.Panel({
							renderTo: config.formPanelDivID			
							,border:false
							,bodyBorder:false
							,hideBorders:true
							,width:850
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
									,id:"idxmUserProfilePanelForm"+config.nameSpace
									,items:[{
											xtype: "idxmUserProfilePanel"
											,id:"idxmUserProfilePanel"+config.nameSpace
											, suffixList:config.suffixes
											, prefixList:config.prefixes
											, locationList:config.locations
											, departmentList:config.departments
											, reportsToUrl:config.reportsToUrl
											, userData: config.userData
											, formObjectName:"Ext.getCmp('idxmUserProfilePanelForm"+ config.nameSpace +"')"
										},idxmEmailsPanel,idxmPhonesPanel,idxmFaxPanel
									]
								}]
							,buttons:	[{
										id:"cancelButton"+config.nameSpace
										//,tabIndex:499
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
										//,tabIndex:498
										,text:"UPDATE"
										,ctCls :"support-portal-btn"
										,handler:formSubmitHandler
									}]
							,listeners: 	{uradix_enterkey: formSubmitHandler}				
						});	
						
	var formPanel = Ext.getCmp("idxmUserProfilePanelForm"+config.nameSpace);
	var isFormPanelDirty = false;
    formPanel.getForm().items.each(function(f){
    	f.on("change",function(){
    		isFormPanelDirty = true;
    	});
    });						
	
	Ext.getCmp("idxmUserProfilePanelForm"+config.nameSpace).getForm().setValues(config.userData);
	
	var reportsToComboBoxFieldArray = Ext.getCmp("idxmUserProfilePanelForm"+config.nameSpace).find("hiddenName","reportsTo");
	
	if(config.userData.reportsToText){
		reportsToComboBoxFieldArray[0].setValue(config.userData.reportsTo);					
		reportsToComboBoxFieldArray[0].setRawValue(config.userData.reportsToText);
		
		if(config.userData.validReportsToIndicator == false){
			reportsToComboBoxFieldArray[0].setValue("");
			reportsToComboBoxFieldArray[0].setRawValue("");
		}		
	}
	
	var jsonFunctionObject = {
		groupsAndRolesChangeWarningCallBack: function(callConfig){
			var windowObject = Ext.getCmp("groupsAndRolesChangeWarning"+config.nameSpace);
			
			if(callConfig != undefined && callConfig.ok != undefined && callConfig.ok){
				windowObject.close();
				formSubmit();
			}else{
				windowObject.close();
				Ext.getCmp("updateButton"+config.nameSpace).enable();
			}			
		},
		doCancel:function(){
			document.location=config.urlUpdateProfile+"?systemUserId="+config.userData.sysKey;
		},
		noCancel:function(){
		}
	};
	
	return jsonFunctionObject;

};
