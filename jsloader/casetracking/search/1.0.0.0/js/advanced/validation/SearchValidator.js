/**
 * Class: casetracking.search.validation.SearchValidator
 *
 * Description: Singleton class for global field level validation
 *
 * Author: Roberto Brenes - MultiPlan 2011
 *
 */
Ext.namespace("casetracking.search.validation.SearchValidator");
casetracking.search.validation.SearchValidator = function() {

  this.siblingRequiredCheck = function(val_, siblingField_)
  {
    var returnVal = true;

    try {
      val_ = val_.trim();
      sibVal_ = Ext.getCmp(siblingField_).getValue();
      sibVal_ = sibVal_.trim();

      if(Ext.isEmpty(val_) && Ext.isEmpty(sibVal_))
      {
        returnVal = "One of these fields is required.";
      }
    }
    catch(e){}

    return returnVal;
  },
  this.oneFieldRequiredCheck = function(fieldArray_)
  {
  	var returnVal = "One of these fields is required.";  	  	
  	try {
  		for(var i=0;i<fieldArray_.length;i++){  			
  			field_ = Ext.getCmp(fieldArray_[i]);
  			fieldVal_ = field_.getRawValue();
  			fieldVal_ = fieldVal_.trim();

			if(!Ext.isEmpty(fieldVal_))
			{
				returnVal = true;
			}  			
  		}
  	}
  	catch(e){}  	  	
  	return returnVal;
  };
};
casetracking.search.validation.SearchValidator = new casetracking.search.validation.SearchValidator();


Ext.namespace("casetracking.search.validation.CompareDateRange");
casetracking.search.validation.CompareDateRange = function(fieldFrom, fieldTo,isRequired) {
	var fieldFrom = Ext.getCmp(fieldFrom);
	var fieldTo = Ext.getCmp(fieldTo);

	var dateFromTxt = fieldFrom.getRawValue();
	var dateToTxt = fieldTo.getRawValue();
    
   if((!Ext.isEmpty(dateFromTxt)) && (!Ext.isEmpty(dateToTxt)) ){
	    var dateFrom = fieldFrom.parseDate(dateFromTxt);
	    var dateTo = fieldTo.parseDate(dateToTxt);	   
	    if(!dateFrom){
	        return "From Date must be a date.";
	    }
	    if(!dateTo){
	        return "To Date must be a date.";
	    }	    
	    
	    dateFrom = dateFrom.clearTime();
	    dateTo = dateTo.clearTime();
	    
	    if(!dateFrom.between(dateFrom,dateTo)){
	    	return "From date must be less than To date.";
	    }
   }else{
	   if((Ext.isEmpty(dateFromTxt)) && (!Ext.isEmpty(dateToTxt)) ){
		   return "From date is required.";
	   }else if((!Ext.isEmpty(dateFromTxt)) && (Ext.isEmpty(dateToTxt)) ){
		   return "To date is required.";
	   }else{
		   if(isRequired){
			   return false;
		   }else{
			   return true;
		   }		   
	   }	   
   }
    
    return true;
};