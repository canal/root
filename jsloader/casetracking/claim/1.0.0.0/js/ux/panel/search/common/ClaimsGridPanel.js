Ext.namespace("casetracking.claim.ux.panel.search.common.ClaimsGridPanel");
casetracking.claim.ux.panel.search.common.ClaimsGridPanel = Ext.extend(Ext.grid.GridPanel,{

  NAMESPACE:undefined,
  SEARCH_SUBMIT_URL: undefined,
  URL:undefined,
  STORE:undefined,
  CHECKBOXMODEL:undefined,
  COLMODEL:undefined,
  PAGINGBAR:undefined,
  DISPLAYPAGINGBAR:false,

  constructor: function(config)
  {
  	function isDisabled(_record){  		
  		return !_record.data.validClaimData;
  	};  
  
	this.SEARCH_SUBMIT_URL = config.SEARCH_SUBMIT_URL;
    	this.DISPLAYPAGINGBAR = config.DISPLAYPAGINGBAR;
	this.STORE = (config.STORE)?config.STORE:new casetracking.claim.ux.panel.search.common.ClaimStore({INIT:true, SEARCH_SUBMIT_URL:this.SEARCH_SUBMIT_URL});
    this.COLMODEL = (config.COLMODEL)?config.COLMODEL:new casetracking.claim.ux.panel.search.common.ClaimColumnModel({isCreate: config.isCreate});
    this.PAGINGBAR = (config.PAGINGBAR)?config.PAGINGBAR:new Ext.PagingToolbar({
    															pageSize:10
    															,displayInfo:true
    															,emptyMsg: 'No Claims'
    															,border:false
    															,store: this.STORE
    															,isCreate: config.isCreate});
    var claimSearchResultsGridId = '';
    if(config.claimSearchResultsGridId && config.claimSearchResultsGridId != undefined) {
    	claimSearchResultsGridId = config.claimSearchResultsGridId;
    } else {
    	claimSearchResultsGridId = Ext.id() + config.nameSpace;
    }
    var defaults = {
      frame:false
      ,border:false
      ,enableColumnMove:false
      ,enableColumnResize:false
      ,sm:this.COLMODEL.CHECKBOXMODEL
      ,selModel:this.COLMODEL.CHECKBOXMODEL
      ,colModel: this.COLMODEL
      ,stripeRows:true
      ,viewConfig: {
         rowHeight: 25
        ,scrollOffset: 0
        ,autoFill:true
        ,forceFit:true
       }
      ,id: claimSearchResultsGridId
      ,store:this.STORE
      ,listeners:{
         "rowdblclick":function(g,r,e) {        
         },
	"rowclick":function(g,r,e) {         
		var record = g.getStore().getAt(r);
		if (isDisabled(record)){
		    g.getSelectionModel().deselectRow(r);
		}         
         
         }         
       }
    };

    if(this.DISPLAYPAGINGBAR){
      defaults['bbar']=this.PAGINGBAR;
    }
    if(config.width) {
    	defaults['width'] = config.width;
    }

    Ext.apply(this, config, defaults);
    casetracking.claim.ux.panel.search.common.ClaimsGridPanel.superclass.constructor.call(this, config);
  }

});
// Register component as xtype
Ext.reg('casetracking.claim.ux.panel.search.common.ClaimsGridPanel',casetracking.claim.ux.panel.search.common.ClaimsGridPanel);