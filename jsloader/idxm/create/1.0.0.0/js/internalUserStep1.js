
Ext.namespace("IDXM.CreateUser.InternalUser.Step1");
IDXM.CreateUser.InternalUser.Step1 = function (config){

	//BreadCrumbs	      						
	if(config.navigator.breadCrumbs){														
		IDXM.Utilities.BreadCrumbBuilderPlain(config.breadCrumbsDivID,config.navigator.breadCrumbs);
	}
	
	Ext.get(document.body.id).unmask();
	
	//Submit Function
	function formSubmitHandler() {
		
		var formObj = internalUserFormPanel.getForm();
		
		if(formObj.isValid())
		{	
			var url = Wizard.PortalContainer.getActionURL("internalPersonUserValidate");	
			var notInActiveDirectoryUserId = formObj.findField("personUserID").getValue();
			var formValues = formObj.getValues();
	
			if(formValues){
					if(formValues.userTypeCode == IDXM_USER_TYPE_PERSON){
						 url = Wizard.PortalContainer.getActionURL("internalPersonUserValidate");
						 notInActiveDirectoryUserId = formObj.findField("personUserID").getValue();
					}else if(formValues.userTypeCode == IDXM_USER_TYPE_SYSTEM){
						 url = Wizard.PortalContainer.getActionURL("internalSystemUserValidate");
						 notInActiveDirectoryUserId = formObj.findField("systemUserID").getValue();
					}else if(formValues.userTypeCode == IDXM_USER_TYPE_DEVICE){
						 url = Wizard.PortalContainer.getActionURL("internalDeviceUserValidate");
						 notInActiveDirectoryUserId = formObj.findField("deviceUserID").getValue();
					}
			}
			
			Ext.getCmp("nextButton").disable();
			
			//Mask Body
			Ext.get(document.body.id).mask("<b> Loading...</b> ", "x-mask-loading");			
	
			formObj.submit({
				url: url,
				isMessageIgnore:true,
				success: function(form,action)
					{				
						g_hideStatusBox();						  										
						
						var navigator = uRadixUtilities.jsonDecode(action.response.responseText).navigator;
						Wizard.PortalContainer.navigate({url:navigator.nextAction});																		
					},
				failure: function(form,action)
					{													
						var jsonResponse = uRadixUtilities.jsonDecode(action.response.responseText);
						
						if(jsonResponse.messages.inputFields){
							for(var i=0; i<jsonResponse.messages.inputFields.length;i++){
								if(jsonResponse.messages.inputFields[i].faultID == "5002"){
									//No Account in Active Directory!
									uRadixWindowManager.uRadixWindowRegistry["notInActiveDirectory"+config.nameSpace].autoLoad.params['errorID'] = "5002";
									uRadixWindowManager.uRadixWindowRegistry["notInActiveDirectory"+config.nameSpace].autoLoad.params['userID'] = notInActiveDirectoryUserId;
									uRadixWindowManager.launch({id:"notInActiveDirectory"+config.nameSpace, key:"notInActiveDirectory"+config.nameSpace});																
								}else if(jsonResponse.messages.inputFields[i].faultID == "5003"){
									//No Email Address in Active Directory Account
									uRadixWindowManager.uRadixWindowRegistry["notInActiveDirectory"+config.nameSpace].autoLoad.params['errorID'] = "5003";
									uRadixWindowManager.uRadixWindowRegistry["notInActiveDirectory"+config.nameSpace].autoLoad.params['userID'] = notInActiveDirectoryUserId;
									uRadixWindowManager.launch({id:"notInActiveDirectory"+config.nameSpace, key:"notInActiveDirectory"+config.nameSpace});															
								}else if(jsonResponse.messages.inputFields[i].faultID == "5004"){
									//Non-unique Email Address in Active Directory Account
									uRadixWindowManager.uRadixWindowRegistry["notInActiveDirectory"+config.nameSpace].autoLoad.params['errorID'] = "5004";
									uRadixWindowManager.uRadixWindowRegistry["notInActiveDirectory"+config.nameSpace].autoLoad.params['userID'] = notInActiveDirectoryUserId;
									uRadixWindowManager.launch({id:"notInActiveDirectory"+config.nameSpace, key:"notInActiveDirectory"+config.nameSpace});															
								}								
							}
						}

                        if((jsonResponse.advice != undefined) && (jsonResponse.advice != null))
                        {
							g_showStatusBox();
                        }

						Ext.getCmp("nextButton").enable();
						Ext.get(document.body.id).unmask();
					}					
			});			
		}
	}
	
	//URadix Form Panel											
	Ext.form.Field.prototype.msgTarget = 'sideDetails';
	internalUserFormPanel = 
		new uRadix.form.FormPanel
			({
				title:"Create Internal User"
				,ctCls:"support-portal-panel"
				,renderTo: config.formPanelDivID
				,width:850
				,bodyBorder: false
				,border: false		
				,buttonAlign:"right"
				,items : 	[{
							xtype: "hidden",
							name: "userClassCode",
							value: IDXM_USER_CLASS_INTERNAL
						}, {
						  id: "idxmMirroredUserHeader"
						  ,hidden:true
						},
						{
							xtype: "idxmUserSubClassAndTypePanel"
							,id: "userClassAndTypePanel"
							,ctCls:"support-portal-panel-no-frame"
							,columnOneRadioGroup:	{
											xtype: "radiogroup",
											hidden: (config.mirroredUser && (config.mirroredUser != "")) ? true : false,
											id:"companyTypeRadioGroup",
											name:"companyTypeRadioGroup",	
											style:"padding-left:2px;padding-bottom:10px;",
											vertical: true,
											columns:1,
											items:	[{boxLabel: 'Multiplan', name: 'userSubClassCode', inputValue: IDXM_USER_SUB_CLASS_MULTIPLAN, checked:true, 
													listeners: {
															check : function(){

																contractorFieldPanels.disableShowPanel(Ext.getCmp("idxmInternalUserContractorPanel"+config.nameSpace));
																contractorFieldPanels.disableShowPanel(Ext.getCmp("idxmInternalUserContractorOtherPanel"+config.nameSpace));

																var _grp = Ext.getCmp("userTypeCodeRadioGroup");
																if(_grp) {_grp.show();}
																var _lbl = Ext.getCmp("userTypeLabel");
																if(_lbl) {_lbl.show();}

																this.checked=true;
																this.checked=false;
																Ext.getCmp("id_cmb_prefix").focus(true);
														}}
												}
												,{boxLabel: 'HealthEOS', name: 'userSubClassCode', inputValue: IDXM_USER_SUB_CLASS_HEALTHEOS, 
													listeners: {
															check : function(){

															contractorFieldPanels.disableShowPanel(Ext.getCmp("idxmInternalUserContractorPanel"+config.nameSpace));
															contractorFieldPanels.disableShowPanel(Ext.getCmp("idxmInternalUserContractorOtherPanel"+config.nameSpace));

															var _prsn = Ext.getCmp("userTypePersonRadio");
															if(_prsn) {_prsn.setValue(true);}
															var _grp = Ext.getCmp("userTypeCodeRadioGroup");
															if(_grp) {_grp.hide();}
															var _lbl = Ext.getCmp("userTypeLabel");
															if(_lbl) {_lbl.hide();}

															this.checked=true;
															this.checked=false;
															Ext.getCmp("id_cmb_prefix").focus(true);
														}}
												}
												,{boxLabel: 'Contractor', name: 'userSubClassCode', inputValue: IDXM_USER_SUB_CLASS_CONSULTANT, 
													listeners: {
															check : function(){

															contractorFieldPanels.enableShowPanel(Ext.getCmp("idxmInternalUserContractorPanel"+config.nameSpace));
															
															if(Ext.getCmp("internalUserContractorID"+config.nameSpace).getValue() == IDXM_USER_SUB_CLASS_CONTRACTOR_OTHER_DROPDOWN_ID){			
																contractorFieldPanels.enableShowPanel(Ext.getCmp("idxmInternalUserContractorOtherPanel"+config.nameSpace));
																Ext.getCmp("idxmInternalUserContractorOtherPanel"+config.nameSpace).cascade(function(item){
																	if(item.isFormField) {
																		item.enable();
																		item.show();
																		item.allowBlank=false;
																	}
																});
															}else{
																contractorFieldPanels.disableShowPanel(Ext.getCmp("idxmInternalUserContractorOtherPanel"+config.nameSpace));
																Ext.getCmp("idxmInternalUserContractorOtherPanel"+config.nameSpace).cascade(function(item){
																	if(item.isFormField) {
																		item.disable();
																		item.hide();
																		item.allowBlank=true;
																	}
																});
															}

															var _prsn = Ext.getCmp("userTypePersonRadio");
															if(_prsn) {_prsn.setValue(true);}
															var _grp = Ext.getCmp("userTypeCodeRadioGroup");
															if(_grp) {_grp.hide();}
															var _lbl = Ext.getCmp("userTypeLabel");
															if(_lbl) {_lbl.hide();}

															this.checked=true;
															this.checked=false;
															Ext.getCmp("id_cmb_prefix").focus(true);
														}}
												}]
										}				
							,columnTwoItems:	[{
											xtype:"label",
											id:"userTypeLabel",
											text:"User Type:"
											,hidden: (config.mirroredUser && (config.mirroredUser != "")) ? true : false
										},{	
											xtype: "radiogroup",
											id:"userTypeCodeRadioGroup",
											style:"padding-left:2px;padding-bottom:10px;",
											hidden: (config.mirroredUser && (config.mirroredUser != "")) ? true : false,
											name:"userTypeCodeRadioGroup",
											hideLabel: true,
											labelSeparator: "",									
											vertical: true,
											columns:1,
											items:	[{
														hideLabel: true,
														id:"userTypePersonRadio",
														boxLabel : "Person",
														name : "userTypeCode",
														inputValue : IDXM_USER_TYPE_PERSON,																
														checked: true,
														listeners: {
															check : function(){
																		userFields.showPanel(Ext.getCmp("idxmInternalUserPersonFieldsPanel"+config.nameSpace));
																		this.checked=true;
																		this.checked=false;																										
																	}
														}							
												  },{																
													hideLabel: true,
													boxLabel : "System/Process",
													name : "userTypeCode",
													inputValue : IDXM_USER_TYPE_SYSTEM,
													listeners: {
															check : function(){
																		userFields.showPanel(Ext.getCmp("idxmInternalUserSystemFieldsPanel"+config.nameSpace));
																		this.checked=true;
																		this.checked=false;
																		Ext.getCmp("id_txt_sysname").focus(true);
																	}
														}																						
												  }]
										}]				
							,classDefaultSelect:'1'
						},{
							xtype: "idxmInternalUserContractorPanel"
							,style:"padding-left:10px; padding-right:10px;"
							,bodyStyle: "padding-left:15px;"							
							,id:"idxmInternalUserContractorPanel"+config.nameSpace
							,fieldId:"internalUserContractorID"+config.nameSpace
							,ContractorList:config.contractors							
						},{
							xtype: "idxmInternalUserContractorOtherPanel"
							,style:"padding-left:10px; padding-right:10px;"
							,bodyStyle: "padding-left:15px;"							
							,id:"idxmInternalUserContractorOtherPanel"+config.nameSpace
						},{
							xtype: "idxmUserDatePanel"
							,id:"userDatePanel"
							,ctCls:"support-portal-panel-no-frame"
						},{
							xtype: "idxmInternalUserPersonFieldsPanel"
							,id:"idxmInternalUserPersonFieldsPanel"+config.nameSpace
							,ctCls:"support-portal-panel-no-frame"
							,suffixList:config.suffixes
							,prefixList:config.prefixes
							,locationList:config.locations
							,departmentList:config.departments
							,reportsToUrl:config.reportsToUrl
							,userData: config.userData
							,formObjectName:"internalUserFormPanel"
							,isMirroredUser: (config.mirroredUser && (config.mirroredUser != "")) ? true : false
						},{
							xtype: "idxmInternalUserSystemFieldsPanel"
							,id:"idxmInternalUserSystemFieldsPanel"+config.nameSpace
							, ctCls:"support-portal-panel-no-frame"
						},{
							xtype: "idxmInternalUserDeviceFieldsPanel"
							,id:"idxmInternalUserDeviceFieldsPanel"+config.nameSpace
							, ctCls:"support-portal-panel-no-frame"
						}]
				,buttons:	[{
							id:"nextButton",
							text:"NEXT",
							ctCls :"support-portal-btn",
							handler:formSubmitHandler
						}]
				,listeners: 	{uradix_enterkey: formSubmitHandler}										
			});
			
	//Set User ID to (firstName.lastName) when bluring out of lastName field
	var lastNameField = internalUserFormPanel.getForm().findField("lastName");		
	lastNameField.on("blur",function(){
		var personUserIDField = internalUserFormPanel.getForm().findField("personUserID");
		if(personUserIDField){
			var firstNameField = internalUserFormPanel.getForm().findField("firstName");
			personUserIDField.setValue(firstNameField.getValue().trim() + "." +lastNameField.getValue().trim());
		}
	});


        if(config.mirroredUser && (config.mirroredUser != ""))
        {
          //Show Mirrored User Header
          var tpl = new Ext.XTemplate(
            '<div style="background-color:#ffffcc; height:25px; margin-top:6px; padding-top:8px;">&nbsp;&nbsp;Mirroring User: ',
                '<b>{firstName} {lastName}</b>',
            '</div>'
          );
          tpl.overwrite(Ext.getCmp("idxmMirroredUserHeader").body, config.mirroredUser);
          Ext.getCmp("idxmMirroredUserHeader").show();
        }
	
	//Contractor Toggler
	var contractorFieldPanels = IDXM.Utilities.TogglePanels();
	contractorFieldPanels.setPanels([Ext.getCmp("idxmInternalUserContractorPanel"+config.nameSpace),Ext.getCmp("idxmInternalUserContractorOtherPanel"+config.nameSpace)]);
	contractorFieldPanels.hidePanels();	
	Ext.getCmp("internalUserContractorID"+config.nameSpace).on("select",function(){
		if(this.getValue() == IDXM_USER_SUB_CLASS_CONTRACTOR_OTHER_DROPDOWN_ID){
			contractorFieldPanels.enableShowPanel(Ext.getCmp("idxmInternalUserContractorOtherPanel"+config.nameSpace));
			Ext.getCmp("idxmInternalUserContractorOtherPanel"+config.nameSpace).cascade(function(item){
				if(item.isFormField) {
					item.enable();
					item.show();
					item.allowBlank=false;
				}
			});
		}else{
			contractorFieldPanels.disableShowPanel(Ext.getCmp("idxmInternalUserContractorOtherPanel"+config.nameSpace));
			Ext.getCmp("idxmInternalUserContractorOtherPanel"+config.nameSpace).cascade(function(item){
				if(item.isFormField) {
					item.disable();
					item.hide();
					item.allowBlank=true;
				}
			});
		}
	});	
	
	//UserType Toggler
	userFields = IDXM.Utilities.TogglePanels();
	userFields.setPanels([Ext.getCmp("idxmInternalUserPersonFieldsPanel"+config.nameSpace),Ext.getCmp("idxmInternalUserSystemFieldsPanel"+config.nameSpace),Ext.getCmp("idxmInternalUserDeviceFieldsPanel"+config.nameSpace)]);
	userFields.showPanel(Ext.getCmp("idxmInternalUserPersonFieldsPanel"+config.nameSpace));	

	//Set Values and State in Form
	if(config.userData){
		try{
			//Loading Data from Session
			internalUserFormPanel.getForm().setValues(config.userData);
			
			//When form is loaded for the first time, we clear the errors
			internalUserFormPanel.getForm().clearInvalid();			
			
			var reportsToComboBoxFieldArray = Ext.getCmp("idxmInternalUserPersonFieldsPanel"+config.nameSpace).find("hiddenName","reportsTo");
			
			if(!config.userData.reportsTo){
				if(reportsToComboBoxFieldArray){					
					reportsToComboBoxFieldArray[0].setDisabled(true);
				}
			}else{
				if(config.userData.reportsToText){
					reportsToComboBoxFieldArray[0].setValue(config.userData.reportsTo);					
					reportsToComboBoxFieldArray[0].setRawValue(config.userData.reportsToText);
				}
			}
			
			//If Contractor dropdown value is other, enable related textfield
			if(config.userData.contractor == IDXM_USER_SUB_CLASS_CONTRACTOR_OTHER_DROPDOWN_ID){
				contractorFieldPanels.enableShowPanel(Ext.getCmp("idxmInternalUserContractorOtherPanel"+config.nameSpace));
				Ext.getCmp("idxmInternalUserContractorOtherPanel"+config.nameSpace).cascade(function(item){
					if(item.isFormField) {
						item.enable();
						item.show();
						item.allowBlank=false;
					}
				});
			}
			
		}catch(e){Ext.Msg.alert("Status","Form Data did not Load");}
	}

};
