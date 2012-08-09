function findAccountNotificationContact(contactsArray) {
	if((contactsArray != undefined) && (contactsArray != null) && (contactsArray.length > 0)){
		for(var i=0;i<contactsArray.length;i++){
			var contact = contactsArray[i];
			if(contact.type == 'Account Notification'){
				return contact;
			}			
		}
	}
	return null;
}

function findAlternateNotificationContact(contactsArray) {
	var newEmailArray = new Array();
	if((contactsArray != undefined) && (contactsArray != null) && (contactsArray.length > 0)){
		for(var i=0;i<contactsArray.length;i++){
			var contact = contactsArray[i];
			if(contact.type == 'Alternate'){
				newEmailArray.push(contact);
			}			
		}
	}
	return newEmailArray;
}	

function getExceptionalClientEmailList(contactsArray) {
	var newEmailArray = new Array();
	var accountNotificationEmail = findAccountNotificationContact(contactsArray);
	if(accountNotificationEmail != null) {		
		newEmailArray.push(accountNotificationEmail);				
	}	
	var alternateNotificatonEmails = findAlternateNotificationContact(contactsArray);
	if(alternateNotificatonEmails.length > 0) {
		for(var i = 0; i < alternateNotificatonEmails.length; i++) {
			newEmailArray.push(alternateNotificatonEmails[i]);
		}
	}
	
	return newEmailArray;
}

function getClientEmailList(contactsArray) {
	var newEmailArray = new Array();
	var primaryEmail = findPrimaryEmailContact(contactsArray);
	if(primaryEmail != null) {		
		newEmailArray.push(primaryEmail);				
	}	
	var alternateEmails = findAlternateEmailContact(contactsArray);
	if(alternateEmails.length > 0) {
		for(var i = 0; i < alternateEmails.length; i++) {
			newEmailArray.push(alternateEmails[i]);
		}
	}
	
	return newEmailArray;
}

function findPrimaryEmailContact(contactsArray) {
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

function findAlternateEmailContact(contactsArray) {
	var newEmailArray = new Array();
	if((contactsArray != undefined) && (contactsArray != null) && (contactsArray.length > 0)){
		for(var i=0;i<contactsArray.length;i++){
			var contact = contactsArray[i];
			if(!contact.primary){
				newEmailArray.push(contact);
			}			
		}
	}
	return newEmailArray;
}

function isUserInRepricerRole(roleList) {
	var userInRole = false;
	if(roleList) {
		for(i = 0; i < roleList.length; i++) {
			var roles = roleList[i].children;
			if(roles) {
				for(j = 0; j < roles.length; j++) {
					var role = roles[j];
					if(role != null && role != undefined && (role.id == 'RMHCFAREP' || role.id == 'RMUBREP')) {
						userInRole = true;
					}
				}
			}
		}		
	}
	
	return userInRole;
}