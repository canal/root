
Ext.namespace("idxm.selfprofile.validation.FaxContacts");
idxm.selfprofile.validation.FaxContacts = function (config){
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
				idxm.selfprofile.validation.RowContacts(faxArray[0],0,faxArray,"fax",config.formId,config.booleanVariableTobeSet);
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
