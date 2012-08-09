
Ext.namespace("idxm.selfprofile.validation.PhoneContacts");
idxm.selfprofile.validation.PhoneContacts = function (config){
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
							validFaxes = false;
							phoneOther[0].markInvalid("Fax Other Type value cannot be Account Notification.");							
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
				idxm.selfprofile.validation.RowContacts(phoneArray[0],0,phoneArray,"phone",config.formId,config.booleanVariableTobeSet);
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
