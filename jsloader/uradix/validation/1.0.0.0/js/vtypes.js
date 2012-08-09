Ext.apply(Ext.form.VTypes, {

    'ssn': function(v){  
        var re = /^([0-6]\d{2}|7[0-6]\d|77[0-2])([ \-]?)(\d{2})\2(\d{4})$/;  
        if(v.length < 9 || v.length > 11 ){
        	return false;
        }            
        return function(v){  
            return re.test(v);  
        }; 
    },  
    'ssnText' : 'SSN must be 9 numbers long',
    tin: function(v){  
        var re = /^\d{2}\-?\d{7}$/;  
    	return re.test(v)
    },  
    tinText : 'Not a valid TIN. Must be in format "12-3456789 or 123456789"',    
    tinMask: /[\d\-]/,  
	
	dollar: function(v){
		return  /^[\$]?[\d]*(.[\d]{2})?$/;
	},
	dollarText: 'Not a valid dollar amount. Must be in the format "$123.45" ($ symbol and cents optional).',
	dollarMask: /[\d\$.]/,
	
	email: function(v) {
		return /[a-z0-9#$%&'*+-/=?^_`{¦}~\.\-@]/i.test(v);
	},
	emailText: 'This field should be an e-mail address in the format "user@example.com"',
	emailMask: /[a-z0-9#$%&'*+-/=?^_`{¦}~\.\-@]/i,
	
	namePart: function(v) {			
		return /^[a-z \.\'-]+$/i.test(v);
	},
	namePartText: 'Incorrect Name Format.  Name can only contain letters, apostrophes and hyphens and must be at least 1 character long.',
	namePartMask: /^[a-z \.\'-]+$/i,
		
	  phone: function(v)
	  {
	    var phoneNumberStripped = v.replace(/[^a-zA-Z 0-9]+/g,'');  
	    var alphanum = /[a-z0-9_]/i;
	 
	    if(phoneNumberStripped.length < 10 || phoneNumberStripped.length > 15 ){
	    	return false;
	    }
	
	    return alphanum.test(phoneNumberStripped);
	  },
	  phoneText: 'Not a valid phone/fax number.  Must be in the format 912-232-2332 or 800-ABC-HOME.',	

	  phoneExt: function(v)
	  {
	    var phoneExtNumberStripped = v.replace(/[^a-zA-Z 0-9]+/g,'');  
	    var alphanum = /[a-z0-9_]/i;
	 
	    if(phoneExtNumberStripped.length > 5 ){
	    	return false;
	    }
	
	    return alphanum.test(phoneExtNumberStripped);
	  },
	  phoneExtText: 'Not a valid phone extension.  Must be in the format 2345.',	
  
  numeric: function(v)
  {
    var numeric = /^[0-9_]+$/;
    return numeric.test(v);
  },
  numericText: 'This field should only contain numbers and _',
  numericMask : /[0-9_]/i,

  ccode: function(val,field)
  {
    var ccode = /^[0-9\-]+$/;

    if(ccode.test(val))
    {
      if(val.length<=50)
      {
        if( !( (val.startsWith("-")) || (val.endsWith("-")) ) )
        {
          return true;
        }
      }
    }

    return false;
  },
  ccodeText: "This is an invalid CCode.",

  dea: function(v)
  {
    var dea = /^[A-Za-z]{2}[\d]{7}$/;
    return dea.test(v);
  },
  deaText: 'This is an invalid DEA.',

  medicaid: function(v)
  {
    var medicaid = /^[\d]{5,10}$/;
    return medicaid.test(v);
  },
  medicaidText: 'This is an invalid Medicaid ID.',

  medicare: function(v)
  {
    var medicare = /^[\d]{5,10}$/;
    return medicare.test(v);
  },
  medicareText: 'This is an invalid Medicare ID.',

  upin: function(v)
  {
    var upin = /^[\w]{6}$/;
    return upin.test(v);
  },
  upinText: 'This is an invalid UPIN.',

  npi: function(v){  
	var re = /^\d{10}$/;  
	return re.test(v)
  },  
  npiText : 'This is an invalid NPI.',    
  npiMask: /[\d]/,  

  cpt: function(v)
  {
    var cpt = /^[\d]{4}[\w]{1}$/;
    return cpt.test(v);
  },
  cptText: 'This is an invalid CPT.',

  cptmodifier: function(v)
  {
    var cptmodifier = /^[\w]{2}$/;
    return cptmodifier.test(v);
  },
  cptmodifierText: 'This is an invalid CPT Modifier.',

  drg: function(v)
  {
    var drg = /^[\d]{1,3}$/;
    return drg.test(v);
  },
  drgText: 'This is an invalid DRG.',

  hcpc: function(v)
  {
    var hcpc = /^[A-Za-z]{1}[\d]{4}$/;
    return hcpc.test(v);
  },
  hcpcText: 'This is an invalid HCPC.',

  hcpcmodifier: function(v)
  {
    var hcpcmodifier = /^[\w]{2}$/;
    return hcpcmodifier.test(v);
  },
  hcpcmodifierText: 'This is an invalid HCPC Modifier.',

  revcode: function(v)
  {
    var revcode = /^[1-9]{1}[\d]{0,3}$/;
    return revcode.test(v);
  },
  revcodeText: 'This is an invalid Revenue Code.',

  icd9: function(v)
  {
    var icd9 = /^[a-zA-Z0-9.]{3,6}$/;
    return icd9.test(v);
  },
  icd9Text: 'This is an invalid ICD9.',


  daterange: function(val, field)
  {
    var date = field.parseDate(val);

    var dispUpd = function(picker)
    {
      var ad = picker.activeDate;
      picker.activeDate = null;
      picker.update(ad);
    };

    if(field.startDateField)
    {
      var sd = Ext.getCmp(field.startDateField);
      sd.maxValue = date;
      if (sd.menu && sd.menu.picker)
      {
        sd.menu.picker.maxDate = date;
        dispUpd(sd.menu.picker);
      }
    }
    else if(field.endDateField)
    {
      var ed = Ext.getCmp(field.endDateField);
      ed.minValue = date;
      if(ed.menu && ed.menu.picker)
      {
        ed.menu.picker.minDate = date;
        dispUpd(ed.menu.picker);
      }
    }

    return true;
  },

  remote: function(val, field)
  {
//    alert("IN!");
/*
    var response = Ext.Ajax.request({
      url:'Services/User.aspx',
      method:'GET',
      async: false,
      params: {cmd: 'CHECKUSERNAME', userName: field.getValue()},
      disableCaching : true  //Just to be explicit
    });

    if(response && response.fullStatus.isOK)
    {
      return Ext.decode(response.responseText).success;
    }
    else
    {
      return false;
    }
*/
    return false;
  },
  remoteText: "Failed remote validation",

  time: function(v)
  {
    var time = /^([1-9]|1[0-9]):([0-5][0-9])(\s[a|p]m)$/i;
    return time.test(v);
  },
  timeText: 'Not a valid time. Must be in the format \"12:34 PM\".',
  timeMask: /[\d\s:amp]/i

});

