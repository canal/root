
Ext.namespace("IDXM.CreateUser.VendorUser.Step1");
IDXM.CreateUser.VendorUser.Step1 = function (config){

	//Bread Crumbs	      						
	if(config.navigator.breadCrumbs){														
		IDXM.Utilities.BreadCrumbBuilderPlain(config.breadCrumbsDivID,config.navigator.breadCrumbs);
	}		
	
	Ext.get(document.body.id).unmask();

	//Submit Function
	function formSubmitHandler() {
		
		var formObj = vendorUserFormPanel.getForm();
		
		if(formObj.isValid())
		{
			var userToMirrorField = vendorUserFormPanel.find("name","userNameToMirror");
			
			if(!userToMirrorField[0].isDirty()){
				userToMirrorField[0].disable();
			}
			
			Ext.getCmp("nextButton").disable();
			
			//Mask Body
			Ext.get(document.body.id).mask("<b> Loading...</b> ", "x-mask-loading");			
			
			var url = Wizard.PortalContainer.getActionURL("vendorUserValidate");

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
								if(jsonResponse.messages.inputFields[i].fieldID == "likeUsersList"){
									var navigator = jsonResponse.navigator;
									Wizard.PortalContainer.navigate({url:navigator.nextAction});
								}
							}
						}

						if((jsonResponse.advice != undefined) && (jsonResponse.advice != null))
						{
							g_showStatusBox();
						}
						
						userToMirrorField[0].enable();

						Ext.getCmp("nextButton").enable();	
						Ext.get(document.body.id).unmask();
					}
			});					
		}
	}

	//URadix Form Panel
	Ext.form.Field.prototype.msgTarget = 'sideDetails';
	var vendorUserFormPanel = 
		new uRadix.form.FormPanel
			({
				title:"Create Vendor User"
				,renderTo: config.formPanelDivID
				,ctCls:"support-portal-panel"
				,width:850
				,bodyBorder: false
				,border: false		
				,buttonAlign:"right"											
				,items : 	[{
							xtype: "hidden",
							name: "userClassCode",
							value: IDXM_USER_CLASS_VENDOR
						},
						{
						   id: "idxmMirroredUserHeader"
						  ,hidden:true
						},
						{
							xtype: "idxmUserSubClassAndTypePanel"
							,ctCls:"support-portal-panel-no-frame"
							,style:"padding-top:5px"
							,columnOneRadioGroup:{ 	
										xtype: "radiogroup",
										id:"userSubClassRadionGroup",
										name:"userSubClassRadionGroup",
										style:"padding-left:2px;padding-bottom:10px;",
										hideLabel: true,
										hidden: (config.mirroredUser && (config.mirroredUser != "")) ? true : false,
										labelSeparator: "",
										vertical: true,
										columns:1,
										items:[	{
												boxLabel: 'Service Provider'
												, name: 'userSubClassCode'
												, inputValue: IDXM_USER_SUB_CLASS_VENDOR_SERVICE_PROVIDER
												, checked:true
												, listeners:{
														check:function(){
															drowpDownFields.showPanel(Ext.getCmp("vendorServiceProviderDropDown"+config.nameSpace));
															this.checked=true;
															this.checked=false;
															
															Ext.getCmp("id_cmb_providername").focus(true);
														}
												}
											},{
												boxLabel: 'Operational'
												, name: 'userSubClassCode'
												, inputValue: IDXM_USER_SUB_CLASS_VENDOR_OPERATIONAL
												, listeners:{
														check:function(){
															drowpDownFields.showPanel(Ext.getCmp("vendorOperationalDropDown"+config.nameSpace));
															this.checked=true;
															this.checked=false;
															
															Ext.getCmp("id_cmb_vendorname").focus(true);
														}
												}
											}]
										}
						},{
							xtype: "idxmUserDatePanel"
							,id:"idxmUserDatePanel"+config.nameSpace
							,width:850
							,ctCls:"support-portal-panel-no-frame"
						},{
							xtype: "idxmVendorServiceProviderDropDown"
							,id:"vendorServiceProviderDropDown"+config.nameSpace
							,serviceProviders:config.serviceProviders
							,isMirroredUser: (config.mirroredUser && (config.mirroredUser != "")) ? true : false
						},{
							xtype: "idxmVendorOperationalDropDown"
							,id:"vendorOperationalDropDown"+config.nameSpace
							,operationalVendors:config.operationalVendors
							,isMirroredUser: (config.mirroredUser && (config.mirroredUser != "")) ? true : false
						},{
							xtype: "idxmVendorMirrorUserPanel"
							,id:"idxmVendorMirrorUserPanel"+config.nameSpace
                                                        ,hidden: (config.mirroredUser && (config.mirroredUser != "")) ? true : false
						},{
							xtype: "idxmVendorFieldsPanel"
							,id:"idxmVendorFieldsPanel"+config.nameSpace
						}]
				,buttons: 	[{
							id:"nextButton"
							,text:"NEXT"
							,ctCls :"support-portal-btn"
							,handler:formSubmitHandler
						}]
				,listeners: 	{
							uradix_enterkey: formSubmitHandler
						}										
			});
	
	
	//Operational and Provider dropdown renderers
	var drowpDownFields = IDXM.Utilities.TogglePanels();
	drowpDownFields.setPanels([Ext.getCmp("vendorOperationalDropDown"+config.nameSpace),Ext.getCmp("vendorServiceProviderDropDown"+config.nameSpace)]);
	drowpDownFields.showPanel(Ext.getCmp("vendorServiceProviderDropDown"+config.nameSpace));			

	//Set Form Data
	if(config.userData){		
		//Set Form Values
		vendorUserFormPanel.getForm().setValues(config.userData);
	
		//When form is loaded for the first time, we clear the errors
		vendorUserFormPanel.getForm().clearInvalid();	
	}

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

};
