
Ext.namespace("idxm.selfprofile.validation.RowContacts");
idxm.selfprofile.validation.RowContacts = function (row,startIndex,arrayOfRows,contactType,formPanelID,booleanVariableTobeSet){
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
				idxm.selfprofile.validation.RowContacts(arrayOfRows[startIndex+1],startIndex+1,arrayOfRows,contactType,formPanelID,booleanVariableTobeSet);
			}				
		}
		
		return isRowValid;
};
