
Ext.namespace("idxm.selfprofile.view.profile.InternalPerson");
idxm.selfprofile.view.profile.InternalPerson = function (config){

	function internalUserTemplate (dataRecord){

		//This is the actual Template
		var t = new Ext.XTemplate(
				'<table width="100%">'
					,'<tr>'
						,'<td>'
							,'<div class="enduser-internalperson-name">{name}</div>'
							,'<div class="enduser-internalperson-userid">{username}</div>'
							,'<div class="enduser-internalperson-department">{department}</div>'
							,'<div class="enduser-dotted-line">&nbsp;</div>'
						,'</td>'
					,'</tr>'
					,'<tr>'
						,'<td align="right">'
							,'<table>'
								,'<tr>'
									,'<td>'
										,'<a class="enduser-application-link" href="{userDemographicsURL}">Update Profile</a>'
									,'</td>'
									,'<tpl if="doDisplayResetNetworXPassword">'
										,'<td>&nbsp;|&nbsp;</td>'
										,'<td>'
										,'<a class="enduser-application-link" href="{userChangePasswordURL}">Update NetworX Password</a>'
										,'</td>'
									,'</tpl>'
								,'</tr>'
							,'</table>'
						,'</td>'
					,'</tr>'
					,'<tr>'
						,'<td>'
							,'<span class="enduser-fieldlabel">Phone(s):<br></span><span class="enduser-fieldvalue">{phone}</span><br>'
							,'<span class="enduser-fieldlabel">Fax(s):<br></span><span class="enduser-fieldvalue">{fax}</span><br>'						
							,'<span class="enduser-fieldlabel">Other Email(s):<br></span><span class="enduser-fieldvalue">{email}</span><br>'
							,'<span class="enduser-fieldlabel">Location:<br></span><span class="enduser-fieldvalue">{location}</span> <span class="idxmTextSmall">{worksFromHome}</span><br><br>'
							,'<span class="enduser-fieldlabel">Reports To:<br></span><span class="enduser-fieldvalue">{reportsTo}</span><br><br>'
							,'<tpl if="doDisplayResetNetworXPassword">'
								,'<span class="enduser-fieldlabel">NetworX User ID:<br></span><span class="enduser-fieldvalue">{enterPriceSubmitterID}</span><br><br>'
							,'</tpl>'
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
		if(primaryEmail){
			usernameText = primaryEmail.value;
		}else{
			usernameText = dataRecord.userID + "@multiplan.com";
		}
		try{
			usernameText = usernameText.toLowerCase();
		}catch(e){}
		
		var reportsToText;
		if(!dataRecord.validReportsToIndicator){
			reportsToText =  dataRecord.reportsToText + "&nbsp;<span class='templateTextNormal'> (Needs New Manager)</span>";
		}else{
			reportsToText = dataRecord.reportsToText;
		}
		
		var doDisplayResetNetworXPassword = false;
		var enterPriceSubmitterID = "";
		if(dataRecord.userSecondaryIdentity && dataRecord.userSecondaryIdentity.userNetworxIdentity){
			if(dataRecord.userSecondaryIdentity.userNetworxIdentity.userStatus.statusCode == IDXM_USER_STATUS_CODE_MAP["ACTIVE"]){
				doDisplayResetNetworXPassword = true;
				enterPriceSubmitterID = dataRecord.userSecondaryIdentity.userNetworxIdentity.identityIdentifier.userID;
			}
		}

		//Pass data to template
		var templateString = t.apply(	 
				{	name: IDXM.internalPersonFullName(dataRecord)
					,location: dataRecord.locationText
					,department: dataRecord.departmentText
					,reportsTo: reportsToText
					,email: emailText
					,phone:phoneText
					,fax: faxText
					,username: usernameText
					,userDemographicsURL:config.userDemographicsURL
					,userChangePasswordURL:config.userChangePasswordURL
					,thisObjectName:config.thisObjectName
					,doDisplayResetNetworXPassword:doDisplayResetNetworXPassword
					,enterPriceSubmitterID:enterPriceSubmitterID
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
		
	var applications = [
				{name:"Enterprice",link:"http://enterprice.multiplan.com"}
			];	
	
	var InternalPersonPanel = 
		new Ext.Panel({
			renderTo:config.formPanelDivID
			,layout:'fit'								    
			,bodyBorder: false						    
			,border: false
			,hideBorders: true					    
			,html: internalUserTemplate(config.userData)
		});
		
	return jsonFunctionObject = {
		resetNetworXPassword: function(){	
			
			 // Reset NetworX Password PopUp
			 uRadixWindowManager.registerWindowPopup({
										key:"resetNetworXPassword"+config.nameSpace,
										windowConfig:{width:475, height:600, modal:true, autoScroll:true, closable:false,resizable:false,
												autoLoad:{	url:config.renderUrl+"?action="+config.resetPasswordAction, 
															scripts:true, 
															params:{"$$mpicallback$$" : "resetNetworXPasswordCallback"+config.nameSpace,"$$windowKey$$":"resetNetworXPassword"+config.nameSpace,"systemUserId":config.userData.sysKey,"isNetworX":true},
															method:"POST", 
															text:"Loading Reset NetworX Password Popup..."
														}
												  }
			 });
			 
			 uRadixWindowManager.launch({id:"resetNetworXPassword"+config.nameSpace, key:"resetNetworXPassword"+config.nameSpace});
		}	
	}		
};
