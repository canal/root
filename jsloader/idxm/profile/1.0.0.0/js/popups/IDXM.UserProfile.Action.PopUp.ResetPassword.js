
Ext.namespace("IDXM.UserProfile.Action.PopUp.ResetPassword");
IDXM.UserProfile.Action.PopUp.ResetPassword = function (config){
	
	
	function formSubmitHandler(){
			
		//Get Form
		var formObj = Ext.getCmp("IDXMuserProfileActionPopUpResetPasswordForm"+config.nameSpace).getForm();	
		
		if(formObj.isValid()){
			
			Ext.getCmp("resetPasswordButton"+config.nameSpace).disable();
			
			formObj.submit({
							url: config.urlSubmitUpdateProfile,
							clientValidation:true,
							isRedirect:true,
							success: function(form,action)
							{																								
								uRadixRedirectHandler.redirect(config.userBaseURL);
							},
							failure: function(form,action)
							{													
								uRadixRedirectHandler.redirect(config.userBaseURL);
							}				
			});
		}
	}

	var windowContainerObject =
		new Ext.Panel({
					renderTo:config.renderTo
					,border:false
					,bodyBorder:false
					,hideBorders:true
					,bodyStyle:"padding:5px;"
					,width:config.windowObject.getInnerWidth()
					,items:[{
								xtype:"panel"
								,border: false
								,bodyBorder:false
								,hideBorders:true
								,items:[{
											xtype: "panel"
											,border: false
											,cls:"portal-title"
											,html: "Reset Password"
										},{
											xtype: "panel"
											,height:8
											,border:0
											,style: "boder:none;"
											,bodyBorder:0
											,bodyStyle:"border:none"
											,hideBorders: true
										},{

											xtype:"uRadix.form.FormPanel"
											,id:"IDXMuserProfileActionPopUpResetPasswordForm"+config.nameSpace
											,labelAlign:"top"
											,autoScroll:true
											,height:100
											,items:[{
														xtype: "panel"
														,border:false
														,bodyBorder:false
														,hideBorders:true
														,html:"<span class='templateTextNormal' style='font-size:12px;'>Currrent User ID:<b> " + config.userID + "</b><BR><BR>To Reset Password process for this user, click <b>RESET</b></span>"
													}]
											,buttonAlign:"right"
											,buttons:[{
														id:"cancelButton"+config.nameSpace
														,text:"CANCEL"
														,ctCls :"support-portal-btn-cancel"
														,handler:function(){config.windowObject.close()}
													},{
														id:"resetPasswordButton"+config.nameSpace
														,text:"RESET"
														,ctCls :"support-portal-btn"
														,handler:formSubmitHandler
													}]
											,listeners: {uradix_enterkey: formSubmitHandler}
										}]
							}]
				});
				
	config.windowObject.setHeight(windowContainerObject.getInnerHeight()+IDXM_POPUP_WINDOW_HEIGHT_ADJUST);				

};
