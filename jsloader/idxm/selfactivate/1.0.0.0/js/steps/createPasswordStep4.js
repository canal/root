Ext.namespace("IDXM.EndUser.Activate.Step4");
IDXM.EndUser.Activate.Step4 = function (config){

	g_hideStatusBox();
	Ext.get(document.body.id).unmask();
	
	function formSubmitHandler() {
		
		var formObj = Ext.getCmp(config.formId).getForm();
		
		if(formObj.isValid()){
		
			var password = formObj.findField("password");
			var passwordValue = password.getValue();
			var passwordConfirm = formObj.findField("passwordConfirm");
			var passwordConfirmValue = passwordConfirm.getValue();
			
			if(passwordValue.trim() != passwordConfirmValue.trim()){
				password.markInvalid("Passwords do not match");
				passwordConfirm.markInvalid("Passwords do not match");
			}else{
				var url = Wizard.PortalContainer.getActionURL(config.submitToAction);
				
				Ext.getCmp("createButton").disable();
				Ext.get(document.body.id).mask("<b> Loading...</b> ", "x-mask-loading");
				
				formObj.submit({
					url: url,
					//isMessageIgnore:true,
					success: function(form,action)
						{	
							if(config.accountActivationJson && config.accountActivationJson.userClassCode == "PROVIDER"){								
								uRadixRedirectHandler.redirect(config.redirectToProviderAction);
							}else{
								Wizard.PortalContainer.navigate({url:config.redirectToAction});
							}
							
						},
					failure: function(form,action)
						{	
							Ext.get(document.body.id).unmask();
							Ext.getCmp("createButton").enable();
							
							var jsonResponse = uRadixUtilities.jsonDecode(action.response.responseText);													
							
							if((jsonResponse.advice != undefined) && (jsonResponse.advice != null))
							{
								g_showStatusBox();
							}							
							
							if(jsonResponse.messages.inputFields){
								for(var i=0; i<jsonResponse.messages.inputFields.length;i++){									
										var navigator = jsonResponse.navigator;
										if(jsonResponse.messages.inputFields[i].fieldID[0] == "phoneAddress" || jsonResponse.messages.inputFields[i].fieldID[0] == "faxAddress"){
											Wizard.PortalContainer.getCtPanel().load({url:Wizard.PortalContainer.getActionURL(navigator.nextAction), scripts:true, loadMask:true,params:{"messages":uRadixUtilities.jsonEncode(jsonResponse.messages)}});
										}
																	
								}
							}																
						}
				});	
				
			}
		}
	}

	Ext.form.Field.prototype.msgTarget = 'sideDetails';
	
	if(config.isProviderUser && config.stepHeaderTemplate){
		config.stepHeaderTemplate.step3Action = "";
	}
	
	var beginActionHeaderPanel = 
		new Ext.Panel({
			renderTo:config.renderToHeader
			,border:false
			,bodyBorder:false
			,hideBorders:true
			,html:(config.accountActivationJson && config.accountActivationJson.userClassCode == "PROVIDER")? stepHeaderTemplateProvider.apply(config.stepHeaderTemplateProvider) : stepHeaderTemplate.apply(config.stepHeaderTemplate)
		});			

	var createPasswordPanel = 
		new Ext.Panel({
				renderTo:config.renderToBody
				,border:false
				,bodyBorder:false
				,hideBorders:true
				,items:[{
					xtype:"panel"
					,border: false
					,bodyBorder:false
					,hideBorders:true
					,items:[{
							xtype: "panel"
							,border: false
							,cls:"portal-title"
							,html: "Create Password"
						},{
							xtype: "panel"
							,height:8
							,border:0
							,style: "boder:none;"
							,bodyBorder:0
							,bodyStyle:"border:none"
							,hideBorders: true
						},{
							xtype:"panel"							
							,items:[{
									xtype:"panel"
									,border:false
									,bodyBorder:false
									,hideBorders:true
									,layout:"column"
									,items:[{
										border:false
										,bodyBorder:false
										,hideBorders:true
										,columnWidth:.4
										,style:"padding-left:30px;"
										,items:[{
													xtype:"uRadix.form.FormPanel"
													,id:config.formId
													,buttonAlign:"right"
													,buttons:[{
															id:"createButton"
															,text:"CREATE"
															,ctCls :"support-portal-btn"
															,handler:formSubmitHandler
														}]
													,listeners: {uradix_enterkey: formSubmitHandler}
													,layout:"form"
													,labelAlign:"top"
													,autoScroll:true
													,width:200
													,items:[{
																xtype:"panel"
																,layout:"form"
																,border:false
																,bodyBorder:false
																,hideBorder:true
																,height:100
																,items:[{
																	xtype:"textfield"
																	,width:200
																	,fieldLabel:"Password"
																	,name:"password"
																	,inputType:"password"
																	,allowBlank:false
																	,minLength:8
																	,msgTarget:"under"
																	,validationEvent:"blur"
																	,listeners:{
																		render:function(){
																			this.focus(true,true);
																		}
																	}																	
																}]
															},{
																xtype:"panel"
																,layout:"form"
																,border:false
																,bodyBorder:false
																,hideBorder:true
																,height:100
																,items:[{
																		xtype:"textfield"
																		,width:200
																		,fieldLabel:"Confirm Password"
																		,name:"passwordConfirm"
																		,inputType:"password"
																		,allowBlank:false
																		,minLength:8
																		,msgTarget:"under"
																		,validationEvent:"blur"
																	}]
															}]
												}]
									},{
										border:false
										,columnWidth:.6
										,bodyBorder:false
										,hideBorders:true
										,items:[{
												xtype:"idxm.core.ux.panel.PasswordHint"
											}]
									}]
								}]
						}]
					}]
				});

};