Ext.namespace("idxm.selfprofile.view.profile.ExternalPersonSummary");
idxm.selfprofile.view.profile.ExternalPersonSummary = function (config){	
	
	function externalUserTemplate (dataRecord){			

		//This is the actual Template
		var t = new Ext.XTemplate(
				'<table width="100%">'
					,'<tr>'
						,'<td>'
						,'<div class="enduser-internalperson-name">My Profile</div>'						
						,'<div class="enduser-dotted-line">&nbsp;</div>'
						,'</td>'
					,'</tr>'				
					,'<tr>'
						,'<td>'
							,'<div class="enduser-internalperson-name">{name}</div>'
							,'<div class="enduser-internalperson-userid">{username}</div>'							
							,'<div class="enduser-dotted-line">&nbsp;</div>'
						,'</td>'
					,'</tr>'
					,'<tr>'
						,'<td>'
							,'<span class="enduser-fieldlabel">Email(s):<br></span><span class="enduser-fieldvalue">{email}</span><br>'						
							,'<span class="enduser-fieldlabel">Phone(s):<br></span><span class="enduser-fieldvalue">{phone}</span><br>'
							,'<div class="enduser-dotted-line">&nbsp;</div>'
						,'</td>'
					,'</tr>'
					,'<tr>'
					,'<td align="right" style="padding-left:370px;">'
						,'<table>'
							,'<tr">'
								,'<td>'
									,'<a class="enduser-application-link" href="{viewProfileURL}" onclick="Ext.get(document.body.id).mask(\'<b> Loading...</b> \', \'x-mask-loading\');">View Full</a>&nbsp;>'
								,'</td>'
							,'</tr>'
						,'</table>'
					,'</td>'
				,'</tr>'					
				,'</table>'	
		);
				
		var contactTpl = new Ext.XTemplate(
                  '<table>',
                  '<tpl for="list">',
                    '<tr><td><span class="enduser-fieldvalue">{value}</font></td><td width="15"></td><td><span class="enduser-fieldvalue-small" style="font-weight:normal;">({type})</span></font></td></tr>',
                  '</tpl>',
                  '</table>'
                );	                                
		
		var emailText;
		var newEmailArray = dataRecord.email;
		
		if((newEmailArray != undefined) && (newEmailArray != null) && (newEmailArray.length > 0)){					
			if(config.userData.accountNotificationEmailIndicator=='on') {
				newEmailArray = getExceptionalClientEmailList(dataRecord.email);
			}  else {
				newEmailArray = getClientEmailList(dataRecord.email);
			}
			
			emailText = contactTpl.applyTemplate({"list":newEmailArray});	
		}else{
			emailText = "N/A<br>";
		}				
		
		var phoneText;
		if((dataRecord.phone != undefined) && (dataRecord.phone != null) && (dataRecord.phone.length > 0)){
	                phoneText = contactTpl.applyTemplate({"list":dataRecord.phone});
		}else{
			phoneText = "N/A<br>";
		}	
		
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

		//Pass data to template
		var templateString = t.apply(	 
				{	name: IDXM.internalPersonFullName(dataRecord)
					,email: emailText
					,phone:phoneText
					,username: usernameText
					,thisObjectName:config.thisObjectName
					,userClassCode:dataRecord.userClassCode
					,viewProfileURL:config.viewProfileURL
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
	
	var ExternalPersonSummaryPanel = 
		new Ext.Panel({
			renderTo:config.formPanelDivID
			,layout:'fit'								    
			,bodyBorder: false						    
			,border: false
			,hideBorders: true					    
			,html: externalUserTemplate(config.userData)	
		});				
};
