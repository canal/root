
Ext.namespace("idxm.selfprofile.resetpassword.ResetPassword");
idxm.selfprofile.resetpassword.ResetPassword = function (config){

	if(config.redirectURL){
		if(!((config.redirectURL.substring(0,7).toLowerCase().trim() == "http://") || (config.redirectURL.substring(0,8).toLowerCase().trim() == "https://"))){
			//alert("Invalid Redirect URL");
		}
	}	
	
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
				
				Ext.getCmp("resetButton"+config.nameSpace).disable();
				
				//Mask Body
				Ext.get(document.body.id).mask("<b> Loading...</b> ", "x-mask-loading");				
				
				formObj.submit({
					url: config.submitToAction,
					success: function(form,action)
						{	
							if(config.redirectURL){
								eval("document." +config.redirectFormName+".submit()");
							}else{								
								uRadixRedirectHandler.redirect(config.userBaseURL);
							}							
						},
					failure: function(form,action)
						{	
							var jsonResponse = uRadixUtilities.jsonDecode(action.response.responseText);
							
                            if((jsonResponse.advice != undefined) && (jsonResponse.advice != null))
                            {
								g_showStatusBox();
                            }							
						
							Ext.getCmp("resetButton"+config.nameSpace).enable();
							Ext.get(document.body.id).unmask();
						}
				});					
			}
		}
	};

	Ext.form.Field.prototype.msgTarget = 'sideDetails';		
		
	var	currentPasswordJson = 
			{	
				xtype:"panel"
				,layout:"form"
				,border:false
				,bodyBorder:false
				,hideBorder:true
				,height:65
				,width:300
				,items:[{
						xtype:"textfield"
						,width:200
						,fieldLabel:"Current Password"
						,name:"currentPassword"
						,inputType:"password"
						,allowBlank:false
						,minLength:1
						,maxLength:17
						,msgTarget:"sideDetails"
						,tabIndex:1
						,validationEvent:"blur"
						}]
			};	
						
	if(config.isNetworX == "true" || config.isNetworX == true){
		currentPasswordJson = 
			{				
				xtype:"hidden"
				,name:"networX"
				,value:true
			};
	}

	var createPasswordPanel = 
		new Ext.Panel({
				border:false
				,bodyBorder:false
				,hideBorders:true
				,height:285				
				,items:[{
					xtype:"panel"
					,border: false
					,bodyBorder:false
					,hideBorders:true
					,items:[{
							xtype: "panel"
							,border: false
							,cls:"portal-title"
							,html: (config.isNetworX == "true" || config.isNetworX == true)? "Update NetworX Password" : "Update Password"
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
									,border:false
									,bodyBorder:false
									,hideBorders:true
									,layout:"column"
									,items:[{
										border:false
										,bodyBorder:false
										,hideBorders:true								
										,width:400
										,items:[{
													xtype:"uRadix.form.FormPanel"
													,id:config.formId																											
													,border:false
													,width:400
													,bodyBorder:false
													,hideBorders:true
													,items:[{
																xtype:"panel"
																,layout:"form"													
																,labelAlign:"top"
																,autoScroll:true		
																,items:[currentPasswordJson,{
																				xtype:"panel"
																				,layout:"form"
																				,border:false
																				,bodyBorder:false
																				,hideBorder:true
																				,height:65
																				,width:400
																				,items:[{
																					xtype:"textfield"
																					,width:200
																					,fieldLabel:"New Password"
																					,name:"password"
																					,inputType:"password"
																					,allowBlank:false
																					,minLength:8
																					,msgTarget:"sideDetails"
																					,tabIndex:2
																					,validationEvent:"blur"
																				}]
																		},{
																				xtype:"panel"
																				,layout:"form"
																				,border:false
																				,bodyBorder:false
																				,hideBorder:true
																				,height:65
																				,width:400
																				,items:[{
																							xtype:"textfield"
																							,width:200
																							,fieldLabel:"Confirm Password"
																							,name:"passwordConfirm"
																							,inputType:"password"
																							,allowBlank:false
																							,minLength:8
																							,msgTarget:"sideDetails"
																							,tabIndex:3
																							,validationEvent:"blur"															
																						}]																
																		}]
													}]
													,buttonAlign:"right"
													,buttons:[{
																id:"cancelButton"+config.namenameSpace
																,text:"CANCEL"
																,ctCls :"support-portal-btn-cancel"
																,tabIndex:5
																,handler:function(){
																	if(isFormPanelDirty){
																		idxm.core.popups.Cancel({doCancelFunction:jsonFunctionObject.doCancel,noCancelFunction:jsonFunctionObject.noCancel});
																	}else{
																		if(config.redirectURL){
																			eval("document." +config.redirectFormName+".submit()");																																															
																		}else{													
																			document.location = config.userBaseURL;
																		}
																	}
																}																
															},{
																id:"resetButton"+config.nameSpace
																,text:"RESET"
																,ctCls :"support-portal-btn"
																,tabIndex:4
																,handler:formSubmitHandler
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
				});					
				
	var windowContainerObject =
		new Ext.Panel({
					renderTo:config.renderTo
					,style:"background-color:#FFFFFF; background:#FFFFFF"
					,border:false
					,bodyBorder:false
					,hideBorders:true
					,bodyStyle:"padding:5px;"
					,items:[createPasswordPanel]
					});
					
	var formPanel = Ext.getCmp(config.formId);
	var isFormPanelDirty = false;
    formPanel.getForm().items.each(function(f){
    	f.on("change",function(){    		
    		isFormPanelDirty = true;
    	});
    });					
	
	var jsonFunctionObject = {
		doCancel:function(){
			if(config.redirectURL){
				eval("document." +config.redirectFormName+".submit()");
			}else{				
				document.location = config.userBaseURL;
			}
		},
		noCancel:function(){
		}
	};
	
	return jsonFunctionObject;
};
