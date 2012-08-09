// Begin: Extend component
Ext.namespace("IDXM.ux.providerFieldsPanel");
IDXM.ux.providerFieldsPanel = 
	Ext.extend(Ext.Panel, {

			// initComponent
			initComponent : function() {
				// Apply to this component
				Ext.apply(this, {
							layout:"form"
							,style:"padding-left:10px; padding-right:10px; padding-top:10px;"	
							,bodyStyle: "padding-left:15px;"
							,bodyBorder: false
							,border: false	
							,labelAlign: "top"
							,items:[{
									xtype : "textfield",
									id: "id_client_txt_fname",
									fieldLabel:"First Name",											
									name : "firstName",
									maxLength : 50,
									width: 200,
									//vtype: 'alpha',										
									allowBlank:false
								},{							
									xtype : "textfield",
									fieldLabel:"Last Name",											
									name : "lastName",
									maxLength : 50,
									width: 200,
									//vtype: 'alpha',										
									allowBlank:false
								},{
									xtype:"checkbox",
									name:"accountNotificationEmailIndicator",
									hideLabel: true,
									boxLabel:"User does not have a unique Email",
									//disabledClass:"disabled-panel",
									ctCls: "supportPortalFormLabelSmall"
									,listeners:{
											check:function(cmp,bool){
												if(bool)
												{
													Ext.getCmp("fld_client_userID").el.up('.x-form-item', 10, true).child('.x-form-item-label').update("<b>* User ID</b>:");
													Ext.getCmp("fld_client_emailIndicatorLabel").show();
													Ext.getCmp("fld_client_accountNotificationEmail").show();
													Ext.getCmp("fld_client_accountNotificationEmail").enable();
												}
												else
												{
													Ext.getCmp("fld_client_userID").el.up('.x-form-item', 10, true).child('.x-form-item-label').update("<b>* Email</b>:");
													Ext.getCmp("fld_client_emailIndicatorLabel").hide();
													Ext.getCmp("fld_client_accountNotificationEmail").setDisabled(true);
													Ext.getCmp("fld_client_accountNotificationEmail").hide();
												}
											}
									}
								},{
									xtype : "textfield",
									id: "fld_client_userID",
									fieldLabel:"Email",											
									name : "userID",
									maxLength : 200,
									width: 200,
									//vtype: 'email',	
									validationEvent:"blur",
									allowBlank:false
								},{
									xtype: "label",
									id:"fld_client_emailIndicatorLabel",
									hidden:true,
									text: "(Can not be updated)",
									cls: "supportPortalFormLabelSmall"
								},{id:"fld_client_acctNotifSpacer",height:10,border:false},{
									xtype : "textfield",
									id: "fld_client_accountNotificationEmail",
									fieldLabel:"Account Notification Email",											
									name : "accountNotificationEmail",
									maxLength : 200,
									width: 200,
									vtype: 'email',	
									validationEvent:"blur",
									allowBlank:false,
									hidden:true,disabled:true
									// these are workarounds to support hiding field label
	                                                                ,onHide: function(){this.getEl().up('.x-form-item').setDisplayed(false);} 
	                                                                ,onShow: function(){this.getEl().up('.x-form-item').setDisplayed(true);}
								}]
						});

				// Apply to this component configuration
				Ext.apply(this.initialConfig, {
								layout: this.layout
								,style: this.style
							    	,bodyBorder: this.bodyBorder
							    	,border: this.border
							    	,width: this.width															
								,items: this.items
						});

				// call parent initComponent
				IDXM.ux.clientFieldsPanel.superclass.initComponent.call(this);
			}
	});
// End: Extend component

// Register component as xtype
Ext.reg('idxmClientFieldsPanel', IDXM.ux.clientFieldsPanel);



// Begin: Extend component
Ext.namespace("IDXM.ux.clientGroupsRolesCCodes");
IDXM.ux.clientGroupsRolesCCodes = 
	Ext.extend(Ext.Panel, {

			// initComponent
			initComponent : function() {		
			
				var userMirrowPanelObject = 
					new Ext.Panel({	
						//Column 2								       
						columnWidth: .99
						,id:this.id+"UserNameToMirrorPanel"
						,xtype:"panel"
						,layout:"form"
						,bodyStyle:"background:#EFEFEF; padding:5px;"
						,labelAlign: "top"
						,disabledClass:"disabled-panel"
						,items:[{
								id:"_userNameToMirrorId",
								xtype : "textfield",
								width: 200,
								maxLength : 200,
								fieldLabel:"User to Mirror",
								name : "userNameToMirror",
								emptyText: "user@email.com",
								allowBlank:false
								,listeners: {
										"render":function(o){
											//o.focus();
										}
								}
							},{
								xtype: "label",																	
								text: "(Mirrors Groups, Roles and CCodes)",
								cls: "supportPortalFormLabelSmall"
							}]
						,listeners: {
							'disable': function(p) {Ext.getCmp("_userNameToMirrorId").clearInvalid();}
							,"enable":function(o){Ext.getCmp("_userNameToMirrorId").focus();}
							}
					});
				
				var parentCCodePanelObject = 
					new Ext.Panel({
						//Column 2
						columnWidth: .99
						,id:this.id+"ParentCCodePanel"
						,layout:"form"
						,labelAlign: "top"
						,bodyStyle:"background:#EFEFEF; padding:5px;" 
						,disabledClass:"disabled-panel"
						,items:[{
						                id:"_ccodeParentId",
								xtype : "textfield",
								width: 200,
								maxLength : 200,
								fieldLabel:"Primary CCode",																																						
								name : "ccodeParent",
								//vtype: "ccode",
								allowBlank:false,
								validateOnBlur:false,
								validationEvent:false
							},{
								xtype: "label",																	
								text: "(Groups and Roles assigned on next screen)",
								cls: "supportPortalFormLabelSmall"
							},{
								xtype:"checkbox",
								name:"blnAllChildCCodes",
								hideLabel: true,
								boxLabel:"Add user to all child CCodes",
								disabledClass:"disabled-panel",
								ctCls: "supportPortalFormLabelSmall"
								,tabIndex:500
								,listeners:{
									change:function(){Ext.getCmp("id_client_txt_fname").focus();}
								}
							}],
						    listeners: {
									'afterlayout': {
												fn: function(p){
															//p.disable();
												},
												single: true // important, as many layouts can occur
											},
									'disable': function(p) {
									   Ext.getCmp("_ccodeParentId").clearInvalid();
									}
								}			
				});
				
				var togglePanels = IDXM.Utilities.TogglePanels();
				togglePanels.setPanels([userMirrowPanelObject,parentCCodePanelObject]);		
				
				togglePanels.enablePanel(userMirrowPanelObject);
				togglePanels.disablePanel(parentCCodePanelObject);
				
				// Apply to this component
				Ext.apply(this, {
							layout:"form"
							,style:"padding-left:10px; padding-right:10px;"
							,bodyStyle: "padding-left:15px;"
							,bodyBorder: false
							,border: false														
							,items:[{
										xtype: "label",
										bodyStyle: "padding-left:15px;",
										text: "*Groups / Roles / CCodes:",
										cls: "supportPortalFormLabelBold"
								},{
									xtype:'panel'											
									,layout:'column'								    
									,bodyBorder: false
									,border: false
									,hideBorders: true								    
									,style:"padding-left:10px; padding-right:10px; padding-top:10px;"
									,bodyStyle: "padding-left:15px;"
									,items: [{	
										//Column 1								       
										width: 30
										,layout:"form"
										,items:[{ 	
												xtype: "radio",
												hideLabel: true,												 
												name: 'blnMirror',
												// checked:true,
												inputValue: '1',
												listeners:{
													check:function(){														
														var togglePanels = IDXM.Utilities.TogglePanels();
														togglePanels.setPanels([userMirrowPanelObject,parentCCodePanelObject]);
														
														togglePanels.enablePanel(userMirrowPanelObject);
														togglePanels.disablePanel(parentCCodePanelObject);
														
														this.checked=true;
														this.checked=false;
														Ext.getCmp("_userNameToMirrorId").focus();
													}
												}
							
											}]
											
										 //Column 2
										   },userMirrowPanelObject]




								},{
									xtype:'panel'
									,layout:'column'								    
									,bodyBorder: false
									,border: false
									,hideBorders: true								    
										    ,style:"padding-left:10px; padding-top:10px; padding-right:10px;"
										    ,bodyStyle: "padding-left:15px;"
										    ,items: [
										    		//Column 1
										    		{																					       
													width: 30
													,layout:"form"
													,items:[{ 	
															xtype: "radio",
															hideLabel: true,
															name: 'blnMirror',
															inputValue: '2',
															listeners:{
																check:function(){
																	var togglePanels = IDXM.Utilities.TogglePanels();
																	togglePanels.setPanels([userMirrowPanelObject,parentCCodePanelObject]);

																	togglePanels.enablePanel(parentCCodePanelObject);
																	togglePanels.disablePanel(userMirrowPanelObject);
																	
																	this.checked=true;
																	this.checked=false;
																	Ext.getCmp("_ccodeParentId").focus();
																}
															}

														}]
												//Column 2
											    	},parentCCodePanelObject]																																								
										}]
						});

				// Apply to this component configuration
				Ext.apply(this.initialConfig, {
								layout: this.layout
								,style: this.style
							    	,bodyBorder: this.bodyBorder
							    	,border: this.border
							    	,width: this.width															
								,items: this.items
						});

				// call parent initComponent
				IDXM.ux.clientGroupsRolesCCodes.superclass.initComponent.call(this);
			}

	});
// End: Extend component

// Register component as xtype
//Ext.reg('idxmClientGroupsRolesCCodes', IDXM.ux.clientGroupsRolesCCodes);

//Client User Template
IDXM.providerSingleUserTemplate = function(dataRecord){
		//For parentCCode
		var t = new Ext.XTemplate(			
			'<br><span class="templateTextNormalBold">{name}</span><br><br>'
			/*,'<tpl if="isProfile">'
			,'<span class="templateTextNormal">Client:<br></span><span class="templateTextNormalBold">{client}</span><br><br>'
			,'<span class="templateTextNormal">Primary CCode:<br></span><span class="templateTextNormalBold">{primaryCCode}</span><br><br>'
			,'</tpl>'*/
			,'<tpl if="isProfile==true || accountNotificationEmailIndicator==false">'
			,'<span class="templateTextNormal">Email(s):<br></span><span class="templateTextNormalBold">{email}</span><br>'
			,'</tpl>'
			/*,'<tpl if="isProfile==false && accountNotificationEmailIndicator==true">'
			,'<span class="templateTextNormal">Account Notification Email:<br></span><span class="templateTextNormalBold">{accountNotificationEmail}</span><br><br>'
			,'</tpl>'*/
			,'<tpl if="isProfile">'				
			,'<span class="templateTextNormal">Phone:<br></span><span class="templateTextNormalBold">{phone}</span><br>'
			,'<span class="templateTextNormal">Fax:<br></span><span class="templateTextNormalBold">{fax}</span><br>'		
			//,'<span class="templateTextNormal">Advice Notification:<br></span><span class="templateTextNormalBold">{[this.displayValue(values.returnAddress)]}</span><br><br>'
			,'</tpl>'			
			/*,'<tpl if="isProfile && networXuserID">'			
			,'<span class="templateTextNormal">Enterprice Submitter ID:<br></span><span class="templateTextNormalBold">{networXuserID}</span><br><br>'
			,'</tpl>'
			,'<span class="templateTextNormal">Start Date:<br></span><span class="templateTextNormalBold">{[this.displayValue(values.startDate)]}</span><br><br>'
			,'<tpl if="isProfile">'
			,'<span class="templateTextNormal">Termination Date:<br></span><span class="templateTextNormalBold">{[this.displayValue(values.endDate)]}</span><br><br>'
			,'</tpl>'
			,'<tpl if="accountNotificationEmailIndicator==true">'
			,'<span class="templateTextNormal">User ID:<br></span><span class="templateTextNormalBold">{userID}</span><br><br>'
			,'</tpl>'*/
			,{
				hasValue: function(value_){
					if(value_.trim != ""){
						return true;
					}else{
						return false;
					}
				},
				displayValue:function(value_){
					if(value_ != undefined && value_ != null){
						if(value_.trim() != ""){									
							return value_;
						}else{
							return "N/A";
						}
					}else{
						return "N/A";
					}
				}
			}			
		);

		var contactTpl = new Ext.XTemplate(
                  '<table>',
                  '<tpl for="list">',
                    '<tr><td><font class="templateTextNormalBold">{value}</font></td>',
                    '<tpl if="this.isAccountNotification(type) == true">',
                      '<td width="15"></td><td><font class="templateTextNormalBold" style="font-weight:normal;background-color:#ffc;">{type}</font></td></tr>',
                    '</tpl>',
                    '<tpl if="this.isAccountNotification(type) == false">',
                      '<td width="15"></td><td><font class="templateTextNormalBold" style="font-weight:normal;">{type}</font></td></tr>',
                    '</tpl>',
                  '</tpl>',
                  '</table>',
                  {
                    isAccountNotification:function(type_) {
                      return type_ == "Account Notification";
                    }
                  }
                );
		
		var templateString;

		var faxText;
		if((dataRecord.fax != undefined) && (dataRecord.fax != null) && (dataRecord.fax.length > 0)){
	                faxText = contactTpl.applyTemplate({"list":dataRecord.fax});
		}else{
			faxText = "N/A<br>";
		}
		
		var phoneText;
		if((dataRecord.phone != undefined) && (dataRecord.phone != null) && (dataRecord.phone.length > 0)){
	                phoneText = contactTpl.applyTemplate({"list":dataRecord.phone});
		}else{
			phoneText = "N/A<br>";
		}

		var emailText;
		var userID=dataRecord.userID;
		if((dataRecord.email != undefined) && (dataRecord.email != null) && (dataRecord.email.length > 0))
		{
	                emailText = contactTpl.applyTemplate({"list":dataRecord.email});

		}
		else if((userID != undefined) && (userID != "")) {
			emailText = userID.toLowerCase()+"<br>";
		}
		else
		{
			emailText = "N/A<br>";
		}
		
		var isProfile = false;
		if(dataRecord.isProfile && dataRecord.isProfile != undefined && dataRecord.isProfile != null){
			isProfile = true;
		}	
		
		/*var clientName;
		if(dataRecord.ccodePrimaryParentName){
			if(isProfile){
				clientName = dataRecord.ccodePrimaryParentName;
			}else{
				clientName = dataRecord.ccodePrimaryParentName.toUpperCase();
			}
		}else if(dataRecord.ccodeParent){
			if(isProfile){
				clientName = dataRecord.ccodeParent;
			}else{
				clientName = dataRecord.ccodeParent.toUpperCase();
			}						
		}		*/	
		
		var templateJson =	{	
				name: dataRecord.firstName + " " + dataRecord.lastName	
				/*,client: clientName
				,primaryCCode: dataRecord.ccodeParent*/
				,email: emailText
				,phone:phoneText
				,fax: faxText
				/*,startDate:dataRecord.startDate
				,endDate:dataRecord.endDate
				,returnAddress:dataRecord.returnAddress*/
				,isProfile:isProfile
				,userID:userID
				/*,accountNotificationEmailIndicator:(!Ext.isEmpty(dataRecord.accountNotificationEmailIndicator) && dataRecord.accountNotificationEmailIndicator=="on")?true:false
				,accountNotificationEmail:dataRecord.accountNotificationEmail*/
			};
		
		if(dataRecord.userSecondaryIdentity){
			templateJson['networXuserID']=dataRecord.userSecondaryIdentity.userNetworxIdentity.identityIdentifier.userID;
		}else{
			templateJson['networXuserID']=false;
		}		

		//Pass data to template
		templateString = t.apply(templateJson);
	
		return templateString;

}; // End: Function

