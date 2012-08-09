
Ext.namespace("IDXM.UserProfile.Action.PopUp.UpdateUserId");
IDXM.UserProfile.Action.PopUp.UpdateUserId = function (config){

	Ext.form.Field.prototype.msgTarget = 'sideDetails';
	
	function formSubmitHandler(){
			
		//Get Form
		var formObj = Ext.getCmp("IDXMuserProfileActionPopUpUpdateUserIdForm"+config.nameSpace).getForm();	
		
		if(formObj.isValid()){
			
			Ext.getCmp("updateUser"+config.nameSpace).disable();
			
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
								g_hideStatusBox();
								Ext.getCmp("updateUser"+config.nameSpace).enable();
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
											,html: "Update User ID"
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
											,border:false
											,bodyBorder:false
											,hideBorders:true
											,layout:"column"
											,items:[
													{
														border:false
														,columnWidth:.65
														,bodyBorder:false
														,hideBorders:true
														,items:[{
																	xtype: "panel"
																	,border:false
																	,bodyBorder:false
																	,hideBorders:true
																	,html:"<span class='templateTextNormal' style='font-size:12px;'>Currrent User ID:<b> "+ config.userID + "</b><br><br></span>"
																},{
																	xtype:"uRadix.form.FormPanel"
																	,id:"IDXMuserProfileActionPopUpUpdateUserIdForm"+config.nameSpace
																	,labelAlign:"top"
																	,autoScroll:true
																	,width:300
																	,height:130
																	,items:[{
																				xtype:"textfield"
																				,width:250
																				,fieldLabel:"New User ID"
																				,name:"NewUserID"
																				,allowBlank:false
																				,msgTarget:"under"
																			}]
																	,buttonAlign:"right"
																	,buttons:[{
																				id:"updateUserIdCancelButton"+config.nameSpace
																				,text:"CANCEL"
																				,ctCls :"support-portal-btn-cancel"
																				,handler:function(){config.windowObject.close()}
																			},{
																				id:"updateUser"+config.nameSpace
																				,text:"UPDATE"
																				,ctCls :"support-portal-btn"
																				,handler:formSubmitHandler
																			}]
																	,listeners: {uradix_enterkey: formSubmitHandler}
																}]
													},{
														border:false
														,columnWidth:.35
														,bodyBorder:false
														,hideBorders:true
														,xtype:"panel"
														,style:"border:2px solid #009900; padding:10px; background:#EFFFFF; background-color:#EFFFFF;"
														,bodyStyle:"background:#EFFFFF; background-color:#EFFFFF;"
														,autoHeight:true
														,width:200
														,html:"<table border='0'><tr><td width='40'><div class='hint-Icon'></div></td><td valign='bottom'><span class='hintTextHeader'><b>Hint</b></span></td></tr></table><span class='hintText'><BR>The new User ID must already exist in Active Directory in order to reset it in the Support Portal.<BR><BR>This will be changed in a subsequent phase.</span>"
													}
											]
										}
									]
							}]
				});
				
	config.windowObject.setHeight(windowContainerObject.getInnerHeight()+IDXM_POPUP_WINDOW_HEIGHT_ADJUST);
};
