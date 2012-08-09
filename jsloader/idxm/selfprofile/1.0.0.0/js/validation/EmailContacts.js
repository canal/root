
Ext.namespace("idxm.selfprofile.validation.EmailContacts");
idxm.selfprofile.validation.EmailContacts = function (config){
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
					emailAddress[0].markInvalid("Email Number is Required.");
					
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
				idxm.selfprofile.validation.RowContacts(emailArray[0],0,emailArray,"email",config.formId,config.booleanVariableTobeSet);
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

