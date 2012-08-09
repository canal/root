
Ext.namespace("idxm.selfprofile.view.profile.ExternalPerson");
idxm.selfprofile.view.profile.ExternalPerson = function (config){	

	function externalUserTemplate (dataRecord){		

		//This is the actual Template
		var t = new Ext.XTemplate(
				'<table width="100%">'
					,'<tr>'
						,'<td>'
							,'<div class="enduser-internalperson-name">{name}</div>'
							,'<div class="enduser-internalperson-userid">{username}</div>'
							,'<tpl if="this.isClient(userClassCode)">'
								,'<tpl if="doDisplayResetNetworXPassword && isRepricer">'
								,'<div class="enduser-internalperson-department">Enterprice submitter ID: {enterPriceSubmitterID}</div>'								
								,'</tpl>'
							,'</tpl>'
							,'<tpl if="this.isVendor(userClassCode)">'
								,'<tpl if="doDisplayResetNetworXPassword">'
								,'<div class="enduser-internalperson-department">NetworX User ID: {enterPriceSubmitterID}</div>'								
								,'</tpl>'
							,'</tpl>'							
							,'<div class="enduser-dotted-line">&nbsp;</div>'
						,'</td>'
					,'</tr>'
					,'<tr>'
						,'<td align="right">'
							,'<table>'
								,'<tr">'
									,'<td>'
										,'<a class="enduser-application-link" href="{userDemographicsURL}" onclick="Ext.get(document.body.id).mask(\'<b> Loading...</b> \', \'x-mask-loading\');">Update Profile</a>'
									,'</td>'
									,'<td>&nbsp;|&nbsp;</td>'
									,'<td>'
										,'<a class="enduser-application-link" href="{userChangePasswordURL}" onclick="Ext.get(document.body.id).mask(\'<b> Loading...</b> \', \'x-mask-loading\');">Update Password</a>'
									,'</td>'
								,'</tr>'
							,'</table>'
						,'</td>'
					,'</tr>'
					,'<tr>'
						,'<td>'
							,'<span class="enduser-fieldlabel">Phone(s):<br></span><span class="enduser-fieldvalue">{phone}</span><br>'
							,'<span class="enduser-fieldlabel">Fax(s):<br></span><span class="enduser-fieldvalue">{fax}</span><br>'
							,'<tpl if="isExceptionClient==false">'
							,'<span class="enduser-fieldlabel">Other Email(s):<br></span><span class="enduser-fieldvalue">{email}</span><br>'
							,'</tpl>'
							,'<tpl if="isExceptionClient==true">'
							,'<span class="enduser-fieldlabel">Email(s):<br></span><span class="enduser-fieldvalue">{email}</span><br>'
							,'</tpl>'
							,'<tpl if="this.isClient(userClassCode)">'
							,'{notification}'	
							,'</tpl>'
						,'</td>'
					,'</tr>'
				,'</table>'	
				 ,{
						isClient: function(userClassCode_) {
							return userClassCode_ == IDXM_USER_CLASS_CLIENT;
						},isVendor: function(userClassCode_) {
							return userClassCode_ == IDXM_USER_CLASS_VENDOR;
						}
				});
				
		var contactTpl = new Ext.XTemplate(
                  '<table>',
                  '<tpl for="list">',
                    '<tr><td><span class="enduser-fieldvalue">{value}</font></td><td width="15"></td><td><span class="enduser-fieldvalue-small" style="font-weight:normal;">({type})</span></font></td></tr>',
                  '</tpl>',
                  '</table>'
                );	                
                
		//Find Primary Contact
		function findPrimaryContact(contactsArray){
			if((contactsArray != undefined) && (contactsArray != null) && (contactsArray.length > 0)){
				for(var i=0;i<contactsArray.length;i++){
					var contact = contactsArray[i];
					if(contact.primary){
						return contact;
					}			
				}
			}
			return null;
		}	
		
		//Remove Primary Contact
		function removePrimaryContact(contactsArray){
			var newContactArray = new Array();
			if((contactsArray != undefined) && (contactsArray != null) && (contactsArray.length > 0)){
				for(var i=0;i<contactsArray.length;i++){
					var contact = contactsArray[i];
					if(!contact.primary){
						newContactArray.push(contactsArray[i]);
					}			
				}
			}
			return newContactArray;
		}  
		
		var emailText;
		var emailArray = removePrimaryContact(dataRecord.email);
		
		if((emailArray != undefined) && (emailArray != null) && (emailArray.length > 0)){
	               	emailText = contactTpl.applyTemplate({"list":emailArray});	               		               	
		}else{
			emailText = "N/A<br>";
		}		
		
		
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

		var usernameText;
		var primaryEmail = findPrimaryContact(dataRecord.email);
		try{
			if(primaryEmail){
				usernameText = primaryEmail.value;
				usernameText = usernameText.toLowerCase();
			}else{
				if(dataRecord.accountNotificationEmailIndicator=="on")
				{
					usernameText = "User ID: "+dataRecord.userID;
				}
				else
				{
					usernameText = dataRecord.userID + "@multiplan.com";
					usernameText = usernameText.toLowerCase();
				}
			}
		}catch(e){}

		var reportsToText;
		if(!dataRecord.validReportsToIndicator){
			reportsToText =  dataRecord.reportsToText + "&nbsp;<span class='templateTextNormal'> (Needs New Manager)</span>";
		}else{
			reportsToText = dataRecord.reportsToText;
		}
		
		if(dataRecord.repricer) {
			var notificationText;
			if(dataRecord.returnAddress){
				notificationText = '<span class="enduser-fieldlabel">Advice Notification:<br></span><table><tr><td><span class="enduser-fieldvalue">'+dataRecord.returnAddress+'<br></span></td></tr></table><br>';
			}else{
				notificationText = '<span class="enduser-fieldlabel">Advice Notification:<br></span><table><tr><td><span class="enduser-fieldvalue">N/A<br></span></td></tr></table><br>';
			}
		}
		
		var doDisplayResetNetworXPassword = false;
		var enterPriceSubmitterID;
		if(dataRecord.userSecondaryIdentity && dataRecord.userSecondaryIdentity.userNetworxIdentity){
			if(dataRecord.userSecondaryIdentity.userNetworxIdentity.userStatus.statusCode == IDXM_USER_STATUS_CODE_MAP["ACTIVE"]){
				doDisplayResetNetworXPassword = true;
				enterPriceSubmitterID = dataRecord.userSecondaryIdentity.userNetworxIdentity.identityIdentifier.userID;
			}
		}				

		//Pass data to template
		var templateString = t.apply(	 
				{	name: IDXM.internalPersonFullName(dataRecord)
					,email: emailText
					,phone:phoneText
					,fax: faxText
					,username: usernameText
					,notification:notificationText
					,userDemographicsURL:config.userDemographicsURL
					,userChangePasswordURL:config.userChangePasswordURL
					,thisObjectName:config.thisObjectName
					,userClassCode:dataRecord.userClassCode
					,enterPriceSubmitterID:enterPriceSubmitterID
					,doDisplayResetNetworXPassword:doDisplayResetNetworXPassword
					,isExceptionClient:(dataRecord.accountNotificationEmailIndicator=="on")?true:false
					,isRepricer:dataRecord.repricer
				}
		);	
		
		return templateString;

	} // End: Function
	
	var applicationTpl = new Ext.XTemplate(
	  '<table>',
	  '<tpl for="list">',
	    '<tr><td><div class="enduser-application-link">> <a class="enduser-application-link" href="{link}" target="_blank">{name}</a></div></td></tr>',
	  '</tpl>',
	  '</table>'
	);
	
	var ExternalPersonPanel = 
		new Ext.Panel({
			renderTo:config.formPanelDivID
			,layout:'fit'								    
			,bodyBorder: false						    
			,border: false
			,hideBorders: true					    
			,html: externalUserTemplate(config.userData)
		});
		
	return jsonFunctionObject = {
		resetPassword: function(){	
			
			 // Reset Password PopUp
			 uRadixWindowManager.registerWindowPopup({
										key:"resetPassword"+config.nameSpace,
										windowConfig:{width:600, height:475, modal:true, autoScroll:true, closable:false,resizable:false,
												autoLoad:{	url:config.renderUrl+"?action="+config.resetPasswordAction, 
															scripts:true, 
															params:{"$$mpicallback$$" : "resetPasswordCallBack"+config.nameSpace,"$$windowKey$$":"resetPassword"+config.nameSpace,"systemUserId":config.userData.sysKey,"isNetworX":false},
															method:"POST", 
															text:"Loading Reset Password Popup..."
														}
												  }
			 });
			 
			 uRadixWindowManager.launch({id:"resetPassword"+config.nameSpace, key:"resetPassword"+config.nameSpace});			
		}	
	}		
};
