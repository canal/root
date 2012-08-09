/**
 * Class: idxm.search.validation.SearchValidator
 *
 * Description: Singleton class for global field level validation
 *
 * Author: Imran Ahmad - Multiplan 2010
 *
 */
Ext.namespace("idxm.search.validation.SearchValidator");
idxm.search.validation.SearchValidator = function() {

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
  			fieldVal_ = Ext.getCmp(fieldArray_[i]).getValue();
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
}

idxm.search.validation.SearchValidator = new idxm.search.validation.SearchValidator();
