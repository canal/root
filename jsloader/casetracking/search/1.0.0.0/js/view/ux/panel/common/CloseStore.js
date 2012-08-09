Ext.namespace("casetracking.search.view.ux.panel.common.CloseStore");
casetracking.search.view.ux.panel.common.CloseStore = Ext.extend(Ext.data.Store,
{
  NAMESPACE:undefined,
  SEARCH_CASE_SUBMIT_URL:undefined,

  //Beginning of Constructor
  constructor: function(config)
  {   
    this.SEARCH_CASE_SUBMIT_URL = config.searchCaseSubmitUrl;
    var defaults = {
    			        reader: 
    			        	new Ext.data.JsonReader({
    			        			root: 'caseList'
    			        			,fields: [
    								            {name: 'closedOnDate',mapping:'lastCloseDate'}
    								           ,{name: 'priority',mapping:'priority'}
    								           ,{name: 'caseNumber'}
    								           ,{name: 'inquiryType',mapping:'originalCaseType.clientDetail.name'}
    								           ,{name: 'network',mapping:'caseNetwork.clientNetworkDetail.name'}
    								           ,{name: 'providerName',mapping:'caseProvider'}
    								           ,{name: 'createdByUser',mapping:'assignedToClientUser'}
    								           ,{name: 'assignedToClientUser',mapping:'assignedToClientUser'}
    								           ,{name: 'assignedToProviderUser',mapping:'assignedToProviderUser'}
    								           ,{name: 'assignedToServiceUser',mapping:'assignedToServiceUser'}	
    								           ,{name: 'createdByUserForInternal',mapping:'createByUser'}
    								           ,{name: 'createByUserOriginal', mapping: 'createByUserOriginal'}
    								           ]
    			        			,totalProperty: 'totalNumberOfRecords'
    			        	})
    				   ,proxy: new Ext.data.HttpProxy ({url:this.SEARCH_CASE_SUBMIT_URL})				   
    				   ,remoteSort: true
    				   ,baseParams: {
								caseNumber:""
								,createdByDateFrom:""
								,createdByDateTo:""
								,providerName:""
								,statusId:"CLOSED"
								,isAllSearch:"true"
		   				} 	       	                  
            };     

    Ext.apply(this, defaults);
    casetracking.search.view.ux.panel.common.CloseStore.superclass.constructor.call(this, defaults);
    
  } //End of Constructor
});
Ext.reg('casetracking.search.view.ux.panel.common.CloseStore', casetracking.search.view.ux.panel.common.CloseStore);        
