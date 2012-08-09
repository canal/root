
Ext.namespace("IDXM.UserProfile.Utilities.Contacts.ValidateRowContacts");
IDXM.UserProfile.Utilities.Contacts.ValidateRowContacts = function (row,startIndex,arrayOfRows,contactType,formPanelID,booleanVariableTobeSet){
		var startIndex = startIndex;
		var arrayOfRows = arrayOfRows;
		var endIndex = arrayOfRows.length;
		var rowTypeCode;
		var isRowValid = true;
		
		if(eval("row."+contactType+"TypeCode[0].getValue()") == "Other"){
			rowTypeCode = eval("row."+contactType+"Other[0].getValue()");
		}else{
			rowTypeCode = eval("row."+contactType+"TypeCode[0].getValue()");
		}
		
		if(arrayOfRows[startIndex+1]){
			
			var i;
			var field1;
			var field2;
			var currentTypeCode;
			
			for(i=startIndex+1;i < endIndex;i++){
				
				if(eval("arrayOfRows[i]."+contactType+"TypeCode[0].getValue()") == "Other"){
					currentTypeCode = eval("arrayOfRows[i]."+contactType+"Other[0].getValue()");
				}else{
					currentTypeCode = eval("arrayOfRows[i]."+contactType+"TypeCode[0].getValue()");
				}
				
				var formObj = Ext.getCmp(formPanelID).getForm();
				var formPanel = Ext.getCmp(formPanelID);				
				
				//Compare Types
				if(rowTypeCode.toLowerCase().replace(/[^a-zA-Z 0-9]+/g,'').trim() == currentTypeCode.toLowerCase().replace(/[^a-zA-Z 0-9]+/g,'').trim()){
					if( (rowTypeCode.trim() != "") && (currentTypeCode.trim() != "") ){
						isRowValid = false;
						
						var field1Array = formPanel.find("name",eval("row."+contactType+"TypeCode[0].name"));
						field1 = field1Array[0];
						
						var field2Array = formPanel.find("name",eval("arrayOfRows[i]."+contactType+"TypeCode[0].name"));
						field2 = field2Array[0];
					}
				}
			}
			
			if(field1){				
				eval(booleanVariableTobeSet+"=false;");
				field1.markInvalid("Duplicate Contact Type");
			}
	
			if(field2){
				eval(booleanVariableTobeSet+"=false;");
				field2.markInvalid("Duplicate Contact Type");	
			}
		}					
		
		if(startIndex<=endIndex){
			if(arrayOfRows[startIndex+1]){
				IDXM.UserProfile.Utilities.Contacts.ValidateRowContacts(arrayOfRows[startIndex+1],startIndex+1,arrayOfRows,contactType,formPanelID,booleanVariableTobeSet);
			}				
		}
		
		return isRowValid;
};

Ext.namespace("IDXM.UserProfile.Utilities.Contacts.ValidateEmailContacts");
IDXM.UserProfile.Utilities.Contacts.ValidateEmailContacts = function (config){
	var emailArray = new Array();
	var hasPrimary = false;
	var validEmails = true;
	var blnOneEmailEntered = false;		
	
	//Loop through Fields
	for(var i=0;i<=config.contactCounter;i++){
		var emailDeleted = Ext.getCmp(config.formId).find("name","emailDeleted"+i);
		var emailAddress = Ext.getCmp(config.formId).find("name","emailAddress"+i);
		var emailTypeCode = Ext.getCmp(config.formId).find("hiddenName","emailTypeCode"+i);
		var emailOther = Ext.getCmp(config.formId).find("name","emailOther"+i);
		
		if(emailTypeCode[0].getValue() == "Primary"){
			hasPrimary = true;
		}
		
		//If row is not deleted
		if(emailDeleted[0].getValue() != "true"){
			
			//We validate Row
			if(emailAddress[0].getValue() || emailTypeCode[0].getValue()){
				blnOneEmailEntered = true;
				if((!emailAddress[0].validate()) || (!emailTypeCode[0].validate())){
					validEmails = false;
				}else if(emailTypeCode[0].getValue() == "Other"){
					if(!emailOther[0].validate()){
						validEmails = false;
					}
				}
			}			
			
			if(validEmails){
				//If no email Number but do have email Type
				if((!emailAddress[0].getValue().trim()) && (emailTypeCode[0].getValue().trim())){
					validEmails = false;
					emailAddress[0].markInvalid("Email is Required.");
					
				//If email Number but no email Type
				}else if((emailAddress[0].getValue().trim()) && (!emailTypeCode[0].getValue().trim())){
					validEmails = false;
					emailTypeCode[0].markInvalid("Email Type is Required.");
					
				//If email type other is selected and no input value is entered
				}else if(emailTypeCode[0].getValue() == "Other"){
					if(!emailOther[0].getValue().trim()){
						validEmails = false;
						emailOther[0].markInvalid("Email Other Type is Required.");
					}else if(emailOther[0].getValue().trim().toLowerCase() == "account notification"){
						validEmails = false;
						emailOther[0].markInvalid("Email Other Type value cannot be Account Notification.");
					}
				}
			}
			
			//Populate EmailArray
			emailArray[emailArray.length] = {"emailDeleted":emailDeleted,"emailAddress":emailAddress,"emailTypeCode":emailTypeCode,"emailOther":emailOther};
		}			
	}
		
	if(validEmails){
		if(blnOneEmailEntered){	
			if(hasPrimary){
				//Validate Duplicates
				eval(config.booleanVariableTobeSet+"= true");
				IDXM.UserProfile.Utilities.Contacts.ValidateRowContacts(emailArray[0],0,emailArray,"email",config.formId,config.booleanVariableTobeSet);
				return eval(config.booleanVariableTobeSet);
			}else{
				//No Primary
				emailArray[0].emailTypeCode[0].markInvalid("Please enter Primary Email Address");
				return false;
			}
		}else{
			//No Email Entered
			emailArray[0].emailAddress[0].markInvalid("Please enter an Email Address");
			return false;			
		}
	}else{
		return validEmails;
	}
};

Ext.namespace("IDXM.UserProfile.Utilities.Contacts.ValidatePhoneContacts");
IDXM.UserProfile.Utilities.Contacts.ValidatePhoneContacts = function (config){
	var phoneArray = new Array();
	var hasPrimary = false;
	var validPhones = true;
	var blnOnePhoneEntered = false;	
	var isPhoneRequired = (config.isPhoneRequired)? true: false;
	
	//Loop through Fields
	for(var i=0;i<=config.contactCounter;i++){
		var phoneDeleted = Ext.getCmp(config.formId).find("name","phoneDeleted"+i);
		var phoneAddress = Ext.getCmp(config.formId).find("name","phoneAddress"+i);
		var phoneExtension = Ext.getCmp(config.formId).find("name","phoneExtension"+i);
		var phoneTypeCode = Ext.getCmp(config.formId).find("hiddenName","phoneTypeCode"+i);
		var phoneOther = Ext.getCmp(config.formId).find("name","phoneOther"+i);	
		
		if(phoneTypeCode[0].getValue() == "Primary"){
			hasPrimary = true;
		}		
		
		//If row is not deleted
		if(phoneDeleted[0].getValue() != "true"){
			
			//We validate Row
			if(phoneAddress[0].getValue() || phoneTypeCode[0].getValue()||phoneExtension[0].getValue()){
				blnOnePhoneEntered = true;
				if((!phoneAddress[0].validate()) || (!phoneTypeCode[0].validate())|| (!phoneExtension[0].validate())){
					validPhones = false;
				}else if(phoneTypeCode[0].getValue() == "Other"){
					if(!phoneOther[0].validate()){
						validPhones = false;
					}
				}
			}	
			
			if(validPhones){
				//If no Phone Number but do have Phone Type
				if((!phoneAddress[0].getValue().trim()) && (phoneTypeCode[0].getValue().trim())){
					validPhones = false;
					phoneAddress[0].markInvalid("Phone Number is Required.");
				
				//If Phone Number but no Phone Type
				}else if((phoneAddress[0].getValue().trim()) && (!phoneTypeCode[0].getValue().trim())){
					validPhones = false;
					phoneTypeCode[0].markInvalid("Phone Type is Required.");
	
				//If Phone Extenstion but no Phone Number or Type
				}else if((!phoneAddress[0].getValue().trim()) && (!phoneTypeCode[0].getValue().trim()) && phoneExtension[0].getValue().trim()){
					validPhones = false;
					phoneAddress[0].markInvalid("Phone Number is Required.");
					
				//If Phone type other is selected and no input value is entered
				}else if(phoneTypeCode[0].getValue() == "Other"){
					if(!phoneOther[0].getValue().trim()){
						validPhones = false;
						phoneOther[0].markInvalid("Phone Other Type is Required.");
					}else if(phoneOther[0].getValue().trim().toLowerCase() == "account notification"){
						validPhones = false;
						phoneOther[0].markInvalid("Phone Other Type value cannot be Account Notification.");
					}
				}
			}
			
			//Populate Array
			phoneArray[phoneArray.length] = {"phoneDeleted":phoneDeleted,"phoneAddress":phoneAddress,"phoneTypeCode":phoneTypeCode,"phoneOther":phoneOther};
		}			
	}
	
	if(validPhones){
		if(blnOnePhoneEntered){
			if(hasPrimary){	
				//Validate Duplicates
				eval(config.booleanVariableTobeSet+"= true");
				IDXM.UserProfile.Utilities.Contacts.ValidateRowContacts(phoneArray[0],0,phoneArray,"phone",config.formId,config.booleanVariableTobeSet);
				return eval(config.booleanVariableTobeSet);
			}else{
				//No Primary
				phoneArray[0].phoneTypeCode[0].markInvalid("Please enter Primary Phone Number");
				return false;
			}
		}else{
			if(isPhoneRequired){
				//No Phone Entered
				phoneArray[0].phoneAddress[0].markInvalid("Please enter a Phone Number");
				return false;
			}else{
				return true;
			}
		}
	}else{
		return validPhones;
	}
};

Ext.namespace("IDXM.UserProfile.Utilities.Contacts.ValidateFaxContacts");
IDXM.UserProfile.Utilities.Contacts.ValidateFaxContacts = function (config){
	var faxArray = new Array();
	var hasPrimary = false;
	var validFaxes = true;
	var blnOneFaxEnter = false;
	
	//Loop through Fields
	for(var i=0;i<=config.contactCounter;i++){
		var faxDeleted = Ext.getCmp(config.formId).find("name","faxDeleted"+i);
		var faxAddress = Ext.getCmp(config.formId).find("name","faxAddress"+i);
		var faxTypeCode = Ext.getCmp(config.formId).find("hiddenName","faxTypeCode"+i);
		var faxOther = Ext.getCmp(config.formId).find("name","faxOther"+i);		
		
		if(faxTypeCode[0].getValue() == "Primary"){
			hasPrimary = true;
		}			
		
		//If row is not deleted
		if(faxDeleted[0].getValue() != "true"){
			
			//We validate Row
			if(faxAddress[0].getValue() || faxTypeCode[0].getValue()){
				blnOneFaxEnter = true;
				if((!faxAddress[0].validate()) || (!faxTypeCode[0].validate())){
					validFaxes = false;
				}else if(faxTypeCode[0].getValue() == "Other"){
					if(!faxOther[0].validate()){
						validFaxes = false;
					}
				}
				
				if(validFaxes){
					//If no fax Number but do have fax Type
					if((!faxAddress[0].getValue().trim()) && (faxTypeCode[0].getValue().trim())){
						validFaxes = false;
						faxAddress[0].markInvalid("Fax Number is Required.");
						
					//If fax Number but no fax Type
					}else if((faxAddress[0].getValue().trim()) && (!faxTypeCode[0].getValue().trim())){
						validFaxes = false;
						faxTypeCode[0].markInvalid("Fax Type is Required.");
						
					//If fax type other is selected and no input value is entered
					}else if(faxTypeCode[0].getValue() == "Other"){
						if(!faxOther[0].getValue().trim()){
							validFaxes = false;
							faxOther[0].markInvalid("Fax Other Type is Required.");
						}else if(faxOther[0].getValue().trim().toLowerCase() == "account notification"){
							validFaxes = false;
							faxOther[0].markInvalid("Fax Other Type value cannot be Account Notification.");
						}
					}	
				}				
			}
			
			//Populate Array
			faxArray[faxArray.length] = {"faxDeleted":faxDeleted,"faxAddress":faxAddress,"faxTypeCode":faxTypeCode,"faxOther":faxOther};
		}			
	}
	
	if(validFaxes){	
		if(blnOneFaxEnter){
			if(hasPrimary){
				//Validate Duplicates
				eval(config.booleanVariableTobeSet+"= true");
				IDXM.UserProfile.Utilities.Contacts.ValidateRowContacts(faxArray[0],0,faxArray,"fax",config.formId,config.booleanVariableTobeSet);
				return eval(config.booleanVariableTobeSet);
			}else{
				//No Primary
				faxArray[0].faxTypeCode[0].markInvalid("Please enter Primary Fax Number");
				return false;
			}
		}else{
			//Return true if no faxes have been entered (Fax is not a required field)
			return true;
		}
	}else{
		return validFaxes;
	}
};
