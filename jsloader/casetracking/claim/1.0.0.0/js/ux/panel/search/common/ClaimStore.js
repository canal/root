Ext.namespace("casetracking.claim.ux.panel.search.common.ClaimStore");
casetracking.claim.ux.panel.search.common.ClaimStore = Ext.extend(Ext.data.Store,
{
  NAMESPACE:undefined,
  SEARCH_SUBMIT_URL:undefined,

  //Beginning of Constructor
  constructor: function(config)
  {   
   
   
    var FIELD_CLAIMNUMBER= Ext.getCmp("claimNumber");
    var FIELD_PATIENT_FIRSTNAME= Ext.getCmp("patientFirstName");
    var FIELD_PATIENT_LASTNAME= Ext.getCmp("patientLastName");
    var FIELD_DATE_SERVICEFROM= Ext.getCmp("dateOfServiceFrom");
    var FIELD_DATE_SERVICETO= Ext.getCmp("dateOfServiceTo");
    var FIELD_PROVIDERNAME= Ext.getCmp("providerName");
    var FIELD_PROVIDERTIN= Ext.getCmp("providerTIN");
    
    function loadBaseParamValue(_field){
    	if(config.INIT){
    		return "";
    	}else{
    		return (_field)?_field.getValue().trim():_field.getValue();
    	}
    }
    	
    var defaults = {
				reader: new Ext.data.JsonReader({
							root: 'claimSearchResponse.claimList'
							,fields: [
								   {name: 'fromDateOfService',mapping:'fromDateOfService'}
								    ,{name: 'toDateOfService',mapping:'toDateOfService'}
								    ,{name: 'claimIdentifierList',mapping:'claimIdentifierList'}
									,{name: 'clientIdentifierList',mapping:'clientIdentifierList'}
								    ,{name: 'memberSSNID',mapping:'memberSSNID'}
									 ,{name: 'patientDOB',mapping:'patientDOB'}
									  ,{name: 'providerState',mapping:'providerState'}
								    ,{name: 'patientName',mapping:'lastName+", "+obj.firstName'}
								    ,{name: 'lastName',mapping:'lastName'}
								    ,{name: 'middleName',mapping:'middleName'}
								    ,{name: 'firstName',mapping:'firstName'}
								    ,{name: 'providerName',mapping:'providerName'}
								    ,{name: 'providerTIN',mapping:'providerTIN'}
								    ,{name: 'pricingList',mapping:'pricingList'}
								    ,{name: 'entryMethod',mapping:'entryMethod'}
								    ,{name: 'validClaimData',mapping:'validClaimData'}
								    ,{name: 'pracNpi', mapping:'pracNpi'}
								    ,{name: 'facNpi', mapping:'facNpi'}
								    ,{name: 'providerType', mapping:'providerType'}
								    ,{name: 'npi', mapping:'npi'}
								  ]
							,totalProperty: 'claimSearchResponse.totalMatchingRecords'
				})
				,totalProperty: 'claimSearchResponse.totalMatchingRecords'
				,remoteSort: true
				,baseParams: {
						claimNumber:loadBaseParamValue(FIELD_CLAIMNUMBER)
						,patientFirstName:loadBaseParamValue(FIELD_PATIENT_FIRSTNAME)
						,patientLastName:loadBaseParamValue(FIELD_PATIENT_LASTNAME)		
						,dateOfServiceFrom:loadBaseParamValue(FIELD_DATE_SERVICEFROM)
						,dateOfServiceTo:loadBaseParamValue(FIELD_DATE_SERVICETO)	
						,providerName:loadBaseParamValue(FIELD_PROVIDERNAME)
						,providerTIN:loadBaseParamValue(FIELD_PROVIDERTIN)
			       }				
			};
    if(config.SEARCH_SUBMIT_URL){
        defaults['proxy']= new Ext.data.HttpProxy ({
	            url: config.SEARCH_SUBMIT_URL
	        });
    }

    Ext.apply(this, defaults);
    casetracking.claim.ux.panel.search.common.ClaimStore.superclass.constructor.call(this, defaults);
    
  } //End of Constructor
});
Ext.reg('casetracking.claim.ux.panel.search.common.ClaimStore', casetracking.claim.ux.panel.search.common.ClaimStore);        
