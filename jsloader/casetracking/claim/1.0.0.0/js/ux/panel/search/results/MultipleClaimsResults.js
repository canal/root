Ext.namespace("casetracking.claim.ux.panel.search.results.MultipleClaimResults");
casetracking.claim.ux.panel.search.results.MultipleClaimResults = Ext.extend(Ext.Panel,{

  NAMESPACE:undefined,
  SEARCH_SUBMIT_URL: undefined,
  URL:undefined,
  STORE:undefined,
  CHECKBOXMODEL:undefined,
  COLMODEL:undefined,
  GRIDPANEL:undefined,

  constructor: function(config)
  {
    var thisObj = this;
	this.SEARCH_SUBMIT_URL = config.searchSubmitURL;
    this.GRIDPANEL = new casetracking.claim.ux.panel.search.common.ClaimsGridPanel({SEARCH_SUBMIT_URL:this.SEARCH_SUBMIT_URL,height:160,width: config.winW-50,DISPLAYPAGINGBAR:true,claimSearchResultsGridId:config.claimSearchResultsGridId,isCreate:false});
    Ext.apply(this,{
                        border: false
                        ,buttonAlign:"right"  
                        ,items : [  {
                                        border:false
                                        ,style:"padding-bottom:5px;"
                                        ,html:'Click "ADD CLAIMS" to associate selected claims with your service case. You may add up to 20 claims to each case.'
                                    },
                                    this.GRIDPANEL
                                    ,{
                                        height:10
                                        ,border:false
                                    },{
                                        xtype:"panel"
                                        ,layout:"column"
                                        ,border:false
                                        ,items:[{
                                                    columnWidth:.50
                                                    ,border:false
                                                    ,style:"padding-top:10px;"
                                                    ,html:"<div class=tableContent>Not what you're looking for? Look up again or <a id='" + config.enterClaimManuallyLinkId + "' href='#' class='portal-link portal-text-small'>enter a claim manually.</a></div>"
                                                },{
                                                    columnWidth:.485
                                                    ,border:false
                                                    ,items:[{
                                                                id:"addClaimsButton"
                                                                ,xtype:"imagebutton"
                                                                ,iconCls :"addClaimsButton"
                                                                ,style:"float:right;text-align:right;padding-top:10px;padding-right:25px;"
                                                                ,handler:function(){
                                                                    var gridPanel = thisObj.GRIDPANEL;
                                                                    var sm = gridPanel.getSelectionModel();
                                                                    var claimArray = sm.getSelections();
                                                                    if(claimArray && claimArray.length){
                                                                        for(var i=0;i<claimArray.length;i++){
                                                                            var claim = claimArray[i].data;
                                                                            claim['entryMethod']="LOOKUP";
                                                                            config.windowObj.addClaim.call(thisObj,claim);
                                                                        }
                                                                        config.windowObj.hideAllResultsPanel();
                                                                        config.windowObj.claimAdded.show();
                                                                         var btnSearchResults = Ext.getCmp(config.windowObj.claimAdded.searchButtonId);
        								btnSearchResults.show();
                                                                    }
                                                                }
                                                            }]
                                                },{
                                                	border : false,
													columnWidth: .015
                                                }]
                                }]
		});
    casetracking.claim.ux.panel.search.results.MultipleClaimResults.superclass.constructor.call(this, config);
  }

});
// Register component as xtype
Ext.reg('casetracking.claim.ux.panel.search.results.MultipleClaimResults',casetracking.claim.ux.panel.search.results.MultipleClaimResults);