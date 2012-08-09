/**
 * Class: provider.claim.search.container.ProviderClaimSearchContainer
 * Author: Pavan Methukupally - MultiPlan 2012
 *
 */
Ext.namespace("provider.claim.search.container.ProviderClaimSearchContainer");
provider.claim.search.container.ProviderClaimSearchContainer = Ext.extend(Object,
{
    ID: "ProviderClaimSearchContainer",
    NAMESPACE:undefined,
    RENDERTO:undefined,
    RENDERURL:undefined,
    WIDTH:"990",
    actionUrls:undefined,
	claimSearchCriteria:{},
	claimSearchResults:{},
	createCaseData_phone:undefined,
	createCaseData_phoneType:undefined,
	createCaseData_comments:undefined,
	createCaseData_caseData:undefined,
	renderLayoutPanel:undefined,
	contactDetails: undefined,
	supportPhoneNumber: undefined,
	tinData: undefined,

    constructor: function(config)
    {
      this.ID +=config.nameSpace;
      this.NAMESPACE=config.nameSpace;
      this.RENDERTO=config.renderTo;
      this.renderLayoutPanel(config);
      this.WIDTH = (config.width && config.width !== undefined)? config.width : "990";
      this.contactDetails = config.contactDetails;
      this.actionUrls = config.actionUrls;
      this.supportPhoneNumber = config.supportPhoneNumber;
      this.tinData = config.tinData;
    },
    renderLayoutPanel: function(config_)
    {
    	if(!config_.tinData.ReadTinsForUserResponse
    			|| !config_.tinData.ReadTinsForUserResponse.TINList 
    			|| config_.tinData.ReadTinsForUserResponse.TINList.length == 0) {
			var errorText = '<p class="portal-text-medium">There are no TINs associated to your account.</p><p class="portal-text-medium">Please call MultiPlan Support at '+config_.supportPhone+'.</p>';
    		var providerErrorPanel = new provider.claim.search.panel.ProviderErrorPanel({    			
    			id: 'providerErrorPanel',
    			renderTo:this.RENDERTO,
    			errorText: errorText,
    			width:this.WIDTH
    		});
    	} else {
    	      var searchLayoutPanel = new provider.claim.search.layout.ProviderClaimSearchLayout({
    	          id: "ProviderClaimSearchLayout"
    	         ,renderTo:this.RENDERTO
    	         ,baseObjConfig:config_
    	         ,width:this.WIDTH
    	         ,thisParentObject: this
    	       });  	
    	}  
    },
    navigate: function(config)
    {
      return;
    },
    showResults: function(cardId)
    {
    	var container = Ext.getCmp('ProviderClaimSearchResultsContainer');
    	container.remove('CreateCaseView',true);
    	container.remove('OneClaimSearchResultView',true);
    	
    	var viewToShow = null;
    	if(cardId == 'CreateCaseView') {
    		viewToShow = new provider.claim.search.view.CreateCaseView({
    			claimCriteria: this.claimSearchCriteria
    			,claimData: this.claimSearchResults
    			,caseData: this.createCaseData_caseData
    			,phone: this.createCaseData_phone
    			,phoneType: this.createCaseData_phoneType
    			,contactDetails: this.contactDetails
    		});    		
    		container.add(viewToShow );
    		container.getLayout().setActiveItem(cardId);	
    	} else if(cardId == 'OneClaimSearchResultView') {
    		viewToShow = new provider.claim.search.view.OneClaimSearchResultView({
    			claim: this.claimSearchResults    			
    		});    		
    		container.add(viewToShow );
    		container.getLayout().setActiveItem(cardId);	
    	} else {
    		container.getLayout().setActiveItem(cardId);
    	} 	
    }

});

