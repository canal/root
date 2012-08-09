Ext.namespace("IDXM.EndUser.Activate.Step3");
IDXM.EndUser.Activate.Step3 = function (config){
	
	g_hideStatusBox();
	Ext.get(document.body.id).unmask();

	function formSubmitHandler() {
		
		var formObj = Ext.getCmp(config.formId).getForm();
		
		if(formObj.isValid()){
		
			var url = Wizard.PortalContainer.getActionURL(config.submitToAction);
			
			Ext.getCmp("nextButton").disable();
			Ext.get(document.body.id).mask("<b> Loading...</b> ", "x-mask-loading");
			
			formObj.submit({
				url: url,
				isMessageIgnore:true,
				success: function(form,action)
					{										
						if(config.messages && config.messages != null){		
							Wizard.PortalContainer.getCtPanel().load({url:Wizard.PortalContainer.getActionURL(config.redirectToAction), scripts:true, loadMask:true});
						}else{						
							Wizard.PortalContainer.navigate({url:config.redirectToAction});
						}
					},
				failure: function(form,action)
					{		
						Ext.get(document.body.id).unmask();
						Ext.getCmp("nextButton").enable();
					}
			});			
		}
	}

	var accountNotificationEmailIndicator=(config.accountActivationJson.accountNotificationEmailIndicator && config.accountActivationJson.accountNotificationEmailIndicator == "on")? true: false;
	var email="";
	if(accountNotificationEmailIndicator){		
		email =  "    <span style='font: 10px verdana,tahoma,arial,sans-serif;'>(" + config.accountActivationJson.emailContactDetails.value + ")</span>";
	}

	Ext.form.Field.prototype.msgTarget = 'sideDetails';
	
	var beginActionHeaderPanel = 
		new Ext.Panel({
			renderTo:config.renderToHeader
			,border:false
			,bodyBorder:false
			,hideBorders:true
			,html:stepHeaderTemplate.apply(config.stepHeaderTemplate)
		});
	
	var phoneValue=null;
	var phoneExtensionValue="";
	if(config.accountActivationJson && config.accountActivationJson.phoneContactDetails && config.accountActivationJson.phoneContactDetails != undefined && config.accountActivationJson.phoneContactDetails != null){
		phoneValue = config.accountActivationJson.phoneContactDetails.value;
		phoneExtensionValue = config.accountActivationJson.phoneContactDetails.extention;
	}
	
	var faxValue=null;
	if(config.accountActivationJson && config.accountActivationJson.faxContactDetails && config.accountActivationJson.faxContactDetails != undefined && config.accountActivationJson.faxContactDetails != null){
		faxValue = config.accountActivationJson.faxContactDetails.value;
	}
	
	var phoneJson = {
						xtype:"textfield"
						,hideLabel:true
						,labelSeparator:""
						,name :"phoneAddress" 
						,maxLength : 256
						,width:200
						,vtype:"phone"
						,validationEvent:"blur"
						,msgTarget:"under"
						,allowBlank:false
						,listeners:{
							render:function(){
								this.focus(true,true);
							}
						}						
					};
	if(phoneValue != null){
		phoneJson['value']=phoneValue;
	}
	
	if(config.accountActivationJson && config.accountActivationJson.userClassCode == IDXM_USER_CLASS_VENDOR){
		phoneJson['allowBlank']=true;
	}
					
	var faxJson = {
						xtype:"textfield"
						,hideLabel:true
						,labelSeparator:""
						,name :"faxAddress" 
						,maxLength : 256
						,width:200
						,vtype:"phone"
						,validationEvent:"blur"
						,msgTarget:"under"
						,allowBlank:false
					};
					
	if(faxValue != null){
		faxJson['value']=faxValue;
	}		
	
	var phoneFieldPanel = 
		new Ext.Panel({
				layout:"column"									
				,cls:"portal-plain-panel"								
				,border:false
				,bodyBorder:false
				,hideBorders:true
				,items:[{
						layout:"form",
						width:205,
						cls:"portal-plain-panel",										
						border:false,
						bodyBorder:false,
						hideBorders:true,										
						items:[phoneJson]
					},{
						layout:"form",
						width:10,
						cls:"portal-plain-panel",
						style:"padding-top:10",										
						border:false,
						bodyBorder:false,
						hideBorders:true,
						html:"X"								
					},{
						layout:"form",
						width:50,
						cls:"portal-plain-panel",										
						border:false,
						bodyBorder:false,
						hideBorders:true,
						items:[{
								xtype:"textfield"
								,hideLabel:true
								,labelSeparator:""
								,name :"phoneExtension" 
								,maxLength : 5
								,width:40
								,vtype:"phoneExt"
								,validationEvent:"blur"
								,allowBlank:true
								,value:phoneExtensionValue
							},{
								id:"phoneAddressTarget",
								layout:"form",
								width:250,
								cls:"invalid-target-field-panel",
								style:"padding-top:5px;",
								border:false,
								bodyBorder:false,
								hideBorders:true								
							}]
					}]
				});
				
	var provideDetailsItems = 
		[{
			xtype:"label"
			,text:"*Phone:"
			,cls:"supportPortalFormLabelBold"
		},phoneFieldPanel];					
				
	if(config.accountActivationJson && config.accountActivationJson.userClassCode == IDXM_USER_CLASS_VENDOR){		
		var provideDetailsItems = 
			[{
				xtype:"label"
				,text:"Phone:"
				,cls:"supportPortalFormLabel"
			},phoneFieldPanel];			
	}
				
	if((config.accountActivationJson.adviceSheetToRender != undefined) && (config.accountActivationJson.adviceSheetToRender)){								
		var faxFieldPanel =
			new Ext.Panel({
					layout:"form",
					style:"padding-left:20;",
					width:235,
					cls:"portal-plain-panel",										
					border:false,
					bodyBorder:false,
					hideBorders:true,										
					items:[{
								xtype:"label"
								,text:"*Fax:"
								,cls:"supportPortalFormLabelBold"
							},faxJson]					
					});

		//Fax Toggler
		var faxPanelTogler = IDXM.Utilities.TogglePanels();	
		faxPanelTogler.setPanels([faxFieldPanel]);
		faxPanelTogler.hidePanels();	
		
		if(config.accountActivationJson.repricer  == true){
			provideDetailsItems = 
				[{
					xtype:"label"
					,text:"*Phone:"
					,cls:"supportPortalFormLabelBold"
				},phoneFieldPanel,{
					xtype:"label"
					,text:"*Preferred Advice Notification:"
					,cls:"supportPortalFormLabelBold"																			
				},{
					xtype: "radiogroup",
					id:"adviceTypeCodeRadioGroup",
					name:"adviceTypeCodeRadioGroup",
					style:"padding-left:20;",
					hideLabel:true,
					labelSeparator:"",
					vertical: true,
					columns:1,
					value:(config.accountActivationJson.adviceSheetReturnRoute != undefined) ? config.accountActivationJson.adviceSheetReturnRoute : "EMAIL",
					items:	[{
							hideLabel: true,
							boxLabel : "By Email"+email,
							name : "adviceTypeCode",
							inputValue : "EMAIL",
							checked: true,
							listeners: {
								check : function(){
									faxPanelTogler.disableShowPanel(faxFieldPanel);

									this.checked=true;
									this.checked=false;
								}
							}
						  },{
							hideLabel: true,
							boxLabel : "By Fax",
							name : "adviceTypeCode",
							inputValue : "FAX",
							listeners: {
									check : function(){

										faxPanelTogler.enableShowPanel(faxFieldPanel);

										this.checked=true;
										this.checked=false;																									
									}
								}
						  }]
				},faxFieldPanel];
		}else{
			provideDetailsItems = 
				[{
					xtype:"label"
					,text:"*Phone:"
					,cls:"supportPortalFormLabelBold"
				},phoneFieldPanel];			
		}
		
	
	}

	
	var provideDetailsPanel =
		new Ext.Panel({
					renderTo:config.renderToBody
					,border:false
					,bodyBorder:false
					,hideBorders:true
					,bodyStyle:"padding:5px;"
					,items:[{
							xtype:"panel"
							,border: false
							,bodyBorder:false
							,hideBorders:true
							,items:[{
									xtype: "panel"
									,border: false
									,cls:"portal-title"
									,html: "Provide Details"
								},{
									xtype: "panel"
									,height:8
									,border:0
									,style: "boder:none;"
									,bodyBorder:0
									,bodyStyle:"border:none"
									,hideBorders: true
								},{
									xtype: "panel"
									,height:20
									,border:0
									,style: "boder:none;"
									,bodyBorder:0
									,bodyStyle:"border:none"
									,hideBorders: true
									,html:"<span class='idxmTextSmall'><b>*Required</b></span>"
								},{
									xtype: "panel"
									,border:false
									,bodyBorder:false
									,hideBorders:true
									,items:[{
										border:false
										,bodyBorder:false
										,hideBorders:true
										,style:"padding-left:100px;"
										,items:[{
											xtype:"uRadix.form.FormPanel"
											,id:config.formId
											,labelAlign:"top"
											,autoScroll:true
											,items:provideDetailsItems
											,buttonAlign:"right"
											,buttons:[{
														id:"nextButton"
														,text:"NEXT"
														,ctCls :"support-portal-btn"
														,handler:formSubmitHandler
													}]
											}]
											,listeners: {uradix_enterkey: formSubmitHandler}
										}]
								}]
						}]
				});
				
	if(config.messages && config.messages != null){
		var formObj = Ext.getCmp(config.formId).getForm();
		if(config.messages.inputFields){
			for(var i=0; i<config.messages.inputFields.length;i++){									
					if(config.messages.inputFields[i].fieldID[0] == "phoneAddress"){
						formObj.findField("phoneAddress").markInvalid(config.messages.inputFields[i].title);
					}
					
					if(config.messages.inputFields[i].fieldID[0] == "faxAddress"){
						formObj.findField("faxAddress").markInvalid(config.messages.inputFields[i].title);
					}

			}
		}
	}
};