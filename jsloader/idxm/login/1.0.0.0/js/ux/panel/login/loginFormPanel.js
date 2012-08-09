/**
 * Class:   idxm.login.ux.panel.login.LoginFormPanel
 * Extends: uRadix.form.FormPanel
 *
 * Author: Roberto Brenes - Multiplan 2011
 *
 *
 */
Ext.namespace("idxm.login.ux.panel.login.LoginFormPanel");
idxm.login.ux.panel.login.LoginFormPanel = Ext.extend(uRadix.form.FormPanel,
{
	BASE_CONFIG:undefined,
	NAMESPACE:undefined,
	REDIRECT_URL:undefined,
	LOGIN_URL:undefined,
	PROFILE_URL:undefined,
	PASSWORD_EXPIRE_URL:undefined,
	UPDATE_PASSWORD_URL:undefined,
	LOGGED_OUT:undefined,
	SUBMIT_FOR_ACCOUNT_LOCKED:0,
	LOGIN_FORM_PANEL_ID:undefined,
	LOGIN_INTERNAL_LABEL:false,
		
	constructor: function(config)
  	{
  		this.BASE_CONFIG = config;
  		this.NAMESPACE = config.namespace;
  		this.REDIRECT_URL = config.redirectUrl;
  		this.LOGGIN_URL = config.loginUrl; 
  		this.PROFILE_URL = config.profileUrl;
  		this.PASSWORD_EXPIRE_URL = config.passwordExpireUrl;
  		this.UPDATE_PASSWORD_URL = config.updatePasswordUrl;  		
  		this.LOGGED_OUT = config.loggedOut;
  		this.LOGIN_FORM_PANEL_ID = config.loginFormPanelId;  	
  		this.LOGIN_INTERNAL_LABEL = config.loginInternalLabel;
  		this.ACTIVATED = config.activated;
  		
  		//If User has been logged Out
		if(this.LOGGED_OUT != "null" && this.LOGGED_OUT == 1){
			uRadixClientMessageHandler.setAdvice(true,[{description:"You Have Successfully Logged Out"}]);
			g_showStatusBox();
			
		//User will be redirected to url once they authenticate
		}else if(this.REDIRECT_URL && this.REDIRECT_URL != "null"){
			uRadixClientMessageHandler.setAdvice(true,[{description:"Log In to Access Requested Page"}]);
			g_showStatusBox();			
		}  
		
		if(this.ACTIVATED != "null" && this.ACTIVATED == 1){
			uRadixClientMessageHandler.setAdvice(true,[{description:"Account Activated.  You Can Now Log-in."}]);
			g_showStatusBox();
		}
		
		var userName = "Your Email Address";
		if(this.LOGIN_INTERNAL_LABEL){
			userName = "User Name";
		}
		
		//Default Form configuration
		var defaults = {
				id:this.LOGIN_FORM_PANEL_ID									
				,border:false
				,bodyBorder:false
				,hideBorders:true
				,labelAlign:"top"
				,baseCls:"portal-login-form"
				,listeners: {uradix_enterkey: this.formSubmit}
				,items:[{
						xtype:"textfield"
						,id:"USERNAME"
						,name:"USERNAME"
						,width:180
						,fieldLabel:"<b>"+userName+"</b>"																											
						,msgTarget:"side"
						,validationEvent:"blur"																								
					},{
						xtype:"textfield"
						,id:"PASSWORD"
						,name:"PASSWORD"
						,width:180
						,fieldLabel:"<b>Password</b>"						
						,inputType:"password"
						,msgTarget:"side"
						,validationEvent:"blur"															
					}]
				,buttons:[{
						text:"LOG IN"
						,id:"logInButton"+this.NAMESPACE					
						,ctCls :"support-portal-btn"											
						,handler:this.formSubmit
					}]
		};
		
		Ext.apply(this, defaults);
    		idxm.login.ux.panel.login.LoginFormPanel.superclass.constructor.call(this, defaults);		  		
  		
  	},
  	formSubmit: function(){

		var thisObj;
		if(this.getXType() == "idxm.login.ux.panel.login.LoginFormPanel")
		{
			thisObj = this;
		}
		else
		{
			thisObj = this.findParentByType("idxm.login.ux.panel.login.LoginFormPanel");      
		}
		
		var formObj = thisObj.getForm();
		var thisButton = Ext.getCmp("logInButton"+thisObj.NAMESPACE);
		var isLocked = false;	
		
		if(formObj.isValid()){  //If form is valid
		
			//Disable Button, hide status box, and mask body
			thisButton.disable();	
			g_hideStatusBox();
			Ext.get(document.body.id).mask("<b> Loading...</b> ", "x-mask-loading");				

			//Submit the form
			formObj.submit({
				url: thisObj.LOGGIN_URL,
				disableAllStatusBinding:true,
				success: function(form,action) //Ajax Submit Form: Success Status
				{	
					thisObj.SUBMIT_FOR_ACCOUNT_LOCKED += 1;
					var jsonResponse = uRadixUtilities.jsonDecode(action.response.responseText);

					//An Error has happened
					if(jsonResponse && jsonResponse.messages && jsonResponse.messages.inputFields && jsonResponse.messages.inputFields.length){

						//Set Advice
						for(var i=0;i<=jsonResponse.messages.inputFields.length;i++){
							if(jsonResponse.messages.inputFields[i] && jsonResponse.messages.inputFields[i].faultID){
								if(jsonResponse.messages.inputFields[i].faultID == 1){	//Incorrect Credentials	
								
										if(thisObj.LOGIN_INTERNAL_LABEL){
											uRadixClientMessageHandler.setAdvice(false,[{description:"Incorrect User Name or Password"}]);
										}else{
											uRadixClientMessageHandler.setAdvice(false,[{description:"Incorrect Email or Password"}]);
										}

										var userNameField = Ext.getCmp(thisObj.LOGIN_FORM_PANEL_ID).find("name","USERNAME");
										userNameField[0].focus(true,true);										

										var passwordField = Ext.getCmp(thisObj.LOGIN_FORM_PANEL_ID).find("name","PASSWORD");
										passwordField[0].setValue("");																					
								}else if(jsonResponse.messages.inputFields[i].faultID == 2){ //Invalid Status
										uRadixClientMessageHandler.setAdvice(false,[{description:"User is in Invalid Status"}]);
										g_showStatusBox();																										
								}else if(jsonResponse.messages.inputFields[i].faultID == 3){ //Locked Out
									var panelsObject = Ext.getCmp(thisObj.LOGIN_FORM_PANEL_ID);																																										
									var lockedAdditionalText = "";
									var lockedOutPanelRight = "";
									isLocked = true;

									//Disable Fields
									panelsObject.cascade(function(item){
									  if (item.isFormField) {
										item.disable();
									  }
									});

									thisButton.disable();

									if(thisObj.SUBMIT_FOR_ACCOUNT_LOCKED > 3){															
										lockedAdditionalText = "<div style='padding-bottom:5px;'>You've exceeded the maximum log in attempts allowable.</div><div style='padding-bottom:5px;'>Your account will be automatically unlocked in 30 minutes.</b></div>";
									}

									uRadixClientMessageHandler.setAdvice(false,[{description:"Locked Out&nbsp;&nbsp;<a href='#' id='lockedErrorDetailsLink"+ thisObj.NAMESPACE +"'>(more...)</a>"}]);
									Ext.get('lockedErrorDetailsLink'+thisObj.NAMESPACE).dom.qtip = "<table border='0'><tr><td valign='bottom'><span style='color:#945A00;font:18px verdana,tahoma,arial,sans-serif;'><b>Next Steps</b></span></td></tr></table><span class='hintText'>"+ lockedAdditionalText +"<div style='padding-bottom:5px;'>Please contact MultiPlan support if you need your account unlocked immediately.</div><div style='padding-bottom:5px;'><b>877-685-8411</div></b></span>"; 
									Ext.get('lockedErrorDetailsLink'+thisObj.NAMESPACE).dom.qclass = 'x-form-invalid-tip';																																																														
								}else if(jsonResponse.messages.inputFields[i].faultID == 4){ //Successfull Login
									//This is the first time the user has logged in Successfully
								}else if(jsonResponse.messages.inputFields[i].faultID == 5){ //Password has Expired
									uRadixClientMessageHandler.setAdvice(false,[{description:"Password Has Expired"}]);																																								
								}
							}
						}
						
						//Unmask and show advice status
						Ext.get(document.body.id).unmask();
						g_showStatusBox();
						if(!isLocked){
							thisButton.enable();
						}						

					}else{ //Successfull Login						
						if(jsonResponse.passwordExpirationDays && jsonResponse.passwordStatus){	
							if(jsonResponse.passwordStatus == "MUSTCHANGE"){																	
								uRadixRedirectHandler.redirect(thisObj.UPDATE_PASSWORD_URL+"?passwordExpire=1&passwordExpirationDays="+jsonResponse.passwordExpirationDays+"&fromLogin=1");										
							}else if(jsonResponse.passwordExpirationDays && jsonResponse.passwordStatus == "SHOULDCHANGE"){
								uRadixRedirectHandler.redirect(thisObj.PASSWORD_EXPIRE_URL+"?passwordExpirationDays="+jsonResponse.passwordExpirationDays+"&fromLogin=1");
							}else if(jsonResponse.passwordExpirationDays && (jsonResponse.passwordStatus == "CANCHANGE" || jsonResponse.passwordStatus == "CANNOTCHANGE")){										
								if(thisObj.REDIRECT_URL && thisObj.REDIRECT_URL != "null"){											
									uRadixRedirectHandler.redirect(thisObj.REDIRECT_URL);
								}else{
									uRadixRedirectHandler.redirect(thisObj.PROFILE_URL);
								}																	
							}else{
								if(thisObj.REDIRECT_URL && thisObj.REDIRECT_URL != "null"){
									uRadixRedirectHandler.redirect(thisObj.REDIRECT_URL);
								}else{
									uRadixRedirectHandler.redirect(thisObj.PROFILE_URL);
								}	
							}
						}else{
							if(thisObj.REDIRECT_URL && thisObj.REDIRECT_URL != "null"){
								uRadixRedirectHandler.redirect(thisObj.REDIRECT_URL);
							}else{
								uRadixRedirectHandler.redirect(thisObj.PROFILE_URL);
							}
						}																
					}		

				},failure: function(form,action){ //Ajax Submit Form: Failure	
					
					//Unask body and enable button
					Ext.get(document.body.id).unmask();
					thisButton.enable();
					
					var jsonResponse = uRadixUtilities.jsonDecode(action.response.responseText);														

					if(!Ext.isEmpty(jsonResponse.advice))																	{
						try{									
							if(jsonResponse.messages && jsonResponse.messages.inputFields && jsonResponse.messages.inputFields.length){			
								uRadixClientMessageHandler.setAdvice(false,[{description:jsonResponse.advice[0].description+"&nbsp;&nbsp;<a href='#' id='loginErrorDetailsLink"+ thisObj.NAMESPACE  + "'>(more...)</a>"}]);																		
								Ext.get('loginErrorDetailsLink'+thisObj.NAMESPACE).dom.qtip = "<b>Errors:</b><br>" + IDXM.Utilities.createErrorFieldList(jsonResponse.messages.inputFields, "200"); 
								Ext.get('loginErrorDetailsLink'+thisObj.NAMESPACE).dom.qclass = 'x-form-invalid-tip';	
							}else{
								uRadixClientMessageHandler.setAdvice(false,[{description:jsonResponse.advice[0].description}]);																
							}
							
							g_showStatusBox();
						}catch(e){alert(e);}								
					}							
				}
			});//End of Ajax Submit Form	
		} //If form is invalid		
		
  	
  	}//End of formSubmit

});
Ext.reg('idxm.login.ux.panel.login.LoginFormPanel', idxm.login.ux.panel.login.LoginFormPanel);