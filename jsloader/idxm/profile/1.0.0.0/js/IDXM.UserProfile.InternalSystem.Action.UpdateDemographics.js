
Ext.namespace("IDXM.InternalSystemUserProfile.Action.Edit");
IDXM.InternalSystemUserProfile.Action.Edit = function (config){	
	
	//Form Submit
	function formSubmitHandler(){
			
		//Get Form
		var formObj = Ext.getCmp("idxmInternalSystemUserProfilePanelForm"+config.nameSpace).getForm();	
		
		Ext.getCmp("updateButton"+config.nameSpace).disable();
							
		//Mask Body
		Ext.get(document.body.id).mask("<b> Loading...</b> ", "x-mask-loading");			
			
		formObj.submit({
						url: config.urlSubmitUpdateProfile,
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
	
	//Form Panel
	Ext.form.Field.prototype.msgTarget = 'sideDetails';
	
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
								//mirrorUserURL: " ", //config.mirrorUserURL,
								sysKey: config.userData.sysKey,
								userTypeCode: config.userData.userTypeCode,
								userClassCode: config.userData.userClassCode
							},{
								xtype:"uRadix.form.FormPanel"
								,autoScroll: true																	
								,cls:"user-profile-body"
								,id:"idxmInternalSystemUserProfilePanelForm"+config.nameSpace
								,items:[{
										xtype: "idxmInternalSystemUserProfilePanel"
										,id:"idxmInternalSystemUserProfilePanel"+config.nameSpace
										, userData: config.userData
										, formObjectName:"idxmInternalSystemUserProfile"
									}
								]
							}]
						,buttons:	[{
										id:"cancelButton"+config.nameSpace
										//,tabIndex:498
										,text:"CANCEL"
										,ctCls :"support-portal-btn-cancel"
										,handler:function(){
											document.location=config.urlUpdateProfile+"?systemUserId="+config.userData.sysKey;
										}
									},{
										id:"updateButton"+config.nameSpace
										//,tabIndex:499
										,text:"UPDATE"
										,ctCls :"support-portal-btn"
										,handler:formSubmitHandler
									}]
						,listeners: 	{uradix_enterkey: formSubmitHandler}				
				});									

	
	Ext.getCmp("idxmInternalSystemUserProfilePanelForm"+config.nameSpace).getForm().setValues(config.userData);
	
	return jsonFunctionObject = {
	
	}

};
