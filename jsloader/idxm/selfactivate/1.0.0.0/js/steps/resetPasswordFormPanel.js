Ext.namespace("idxm.activate.ResetPasswordComplete");
idxm.activate.ResetPasswordComplete = function (config){

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
				
				formObj.submit({
					url: url,
					//isMessageIgnore:true,
					success: function(form,action)
						{
							var jsonResponse = uRadixUtilities.jsonDecode(action.response.responseText);
							Wizard.PortalContainer.navigate({url:jsonResponse.navigator.nextAction});

							if(uRadixClientMessageHandler.isVisible() == true)
							{
								g_showStatusBox();
							}
						},
					failure: function(form,action)
						{
                            Ext.getCmp("createButton").enable();

                            // NOTE: json is malformed, but we don't need it at the moment
                            //var jsonResponse = uRadixUtilities.jsonDecode(action.response.responseText);
							if(uRadixClientMessageHandler.isVisible() == true)
							{
								g_showStatusBox();
							}
						}
				});	
				
			}
		}
	};

	Ext.form.Field.prototype.msgTarget = 'sideDetails';
	
	var createPasswordPanel = 
		new Ext.Panel({
				renderTo:config.renderToBody
				,border:false
				,bodyBorder:false
				,hideBorders:true
				//,bodyStyle:"padding:5px;"
				,items:[{
					xtype:"panel"
					,border: false
					,bodyBorder:false
					,hideBorders:true
					,items:[{
							xtype: "panel"
							,border: false
							,cls:"portal-title"
							,html: "Create New Password"
						},{
							xtype: "panel"
							,height:30
							,border:0
							,style: "boder:none;"
							,bodyBorder:0
							,bodyStyle:"border:none"
							,hideBorders: true
						},{
							xtype:"uRadix.form.FormPanel"
							,id:config.formId
							,buttonAlign:"right"
							,width:800
							,buttons:[{
									id:"createButton"
									,text:"CREATE"
									,ctCls :"support-portal-btn"
									,style:"padding-right:15px;"
									,handler:formSubmitHandler
								}]
							,listeners: {uradix_enterkey: formSubmitHandler}
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
										,width:400
										,style:"padding-left:30px;"
										,items:[{
													xtype:"panel"
													,layout:"form"
													,labelAlign:"top"
													,autoScroll:true													
													,items:[{
																xtype:"textfield"
																,width:200
																,fieldLabel:"Password"
																,name:"password"
																,inputType:"password"
																,allowBlank:false
																,minLength:8
																,msgTarget:"sideDetails"
																,validationEvent:"blur"
															},{
																xtype:"textfield"
																,width:200
																,fieldLabel:"Confirm Password"
																,name:"passwordConfirm"
																,inputType:"password"
																,allowBlank:false
																,minLength:8
																,msgTarget:"sideDetails"
																,validationEvent:"blur"
															}]
												}]
									},{
										border:false
										,width:400
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
