
Ext.namespace("IDXM.CreateUser.ClientUser.Step1");
IDXM.CreateUser.ClientUser.Step1 = function (config){

	//Bread Crumbs	      						
	if(config.navigator.breadCrumbs){														
		IDXM.Utilities.BreadCrumbBuilderPlain(config.breadCrumbsDivID,config.navigator.breadCrumbs);
	}	
	
	Ext.get(document.body.id).unmask();

	//Submit Function for the Form Panel
	function formSubmitHandler() {
		
		var formObj = clientUserFormPanel.getForm();
		var formValues = formObj.getValues();
		var userIDValid = true;
		
		//Validate UserID if it is being used as Email
		if(Ext.isEmpty(formValues.accountNotificationEmailIndicator)){
			if(!Ext.form.VTypes.email(formValues.userID)){
				userIDValid = false;
				var userID = clientUserFormPanel.find("name","userID");	
				userID[0].markInvalid('This field should be an e-mail address in the format "user@example.com"');							
			}
		}
		if(userIDValid){
			if(formObj.isValid())
			{
				Ext.getCmp("nextButton").disable();
				
				//Mask Body
				Ext.get(document.body.id).mask("<b> Loading...</b> ", "x-mask-loading");
	
				var url = Wizard.PortalContainer.getActionURL("clientUserValidate");
				
				formObj.submit({
					url: url,
					isMessageIgnore:true,
					success: function(form,action)
						{								
							g_hideStatusBox();
							
							var jsonResponse = uRadixUtilities.jsonDecode(action.response.responseText);
							
							if(jsonResponse.messages.inputFields){
								for(var i=0; i<jsonResponse.messages.inputFields.length;i++){
									if(jsonResponse.messages.inputFields[i].faultID == "5001"){
										//Duplicate (Like users)						
							
										//Overriding setMessages from URadix
	  									uRadixClientMessageHandler.setMessage=function(isSuccess, messages){return;}												
	  								}
	  							}
	  						}
	  							  							  						
							var navigator = uRadixUtilities.jsonDecode(action.response.responseText).navigator;							
							Wizard.PortalContainer.navigate({url:navigator.nextAction});								
						},
					failure: function(form,action)
						{		
							Ext.getCmp("nextButton").enable();
							Ext.get(document.body.id).unmask();						
							
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
						}
				});
			}
			else {
				try{
					console.log("Client form panel is NOT valid");
				}catch(e){}
			}
		}
	}		

	//Form Panel
	Ext.form.Field.prototype.msgTarget = 'sideDetails';
	var clientUserFormPanel = 
		new uRadix.form.FormPanel
			({
				title:"Create Client User"
				,renderTo: config.formPanelDivID
				,ctCls:"support-portal-panel"
				,width:850
				,bodyBorder: false
				,border: false			
				,buttonAlign:"right"											
				,items : 	[{
							xtype:"hidden",
							name:"userTypeCode",
							value:IDXM_USER_TYPE_PERSON
						},{
							xtype: "hidden",
							name: "userClassCode",
							value: IDXM_USER_CLASS_CLIENT
						},{
							xtype: "hidden",
							name: "userSubClassCode",
							value: IDXM_USER_SUB_CLASS_CLIENT_TPA					
						}, {
						  id: "idxmMirroredUserHeader"
						  ,hidden:true
						},{
							xtype:"panel"
							,border:false
							,bodyBorder:false
							,hideBorders:true
							,height:10
						},{
							xtype: "idxmUserDatePanel"
							,id:"idxmUserDatePanel"+config.nameSpace
							,width:850
							,ctCls:"support-portal-panel-no-frame"
						}
						,{
							xtype: "idxmClientGroupsRolesCCodes"
							,id:"clientGroupsRolesCCodes"+config.nameSpace
							,width:"850"
							,hidden: (config.mirroredUser && (config.mirroredUser != "")) ? true : false
						},{
							xtype: "idxmClientFieldsPanel"
							,id:"clientSingleFieldsPanel"+config.nameSpace
							,width:"850"
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

	//Loading Data from Session
	if(config.userData){
		//Set Form Values
		clientUserFormPanel.getForm().setValues(config.userData);
	
		//When form is loaded for the first time, we clear the errors
		clientUserFormPanel.getForm().clearInvalid();	
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
