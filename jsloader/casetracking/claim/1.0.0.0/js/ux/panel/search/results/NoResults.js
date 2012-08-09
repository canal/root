Ext.namespace("casetracking.claim.ux.panel.search.results.NoResults");
casetracking.claim.ux.panel.search.results.NoResults = Ext.extend(Ext.Panel, {

	// initComponent
	initComponent : function(config) {	
			
		// Apply to this component
		Ext.apply(this, {		
			bodyBorder: false						    
			,border: false
			,hideBorders: true
			,items : [{
					autoHeight:true
					,items:[{
								xtype:"idxmStatusBox"
								,status:"warning"
								,statusText:'No Matches found'
						    },{
                                xtype: "panel"
                                ,border: false
                                ,cls:"portal-titles"
                                ,style:"padding-left:10px;"
                                ,html: "<BR><div class=tableContent>No matches found.  You can try your search again or <a id='" + this.enterClaimManuallyLinkId + "' href='#' class='portal-link portal-text-small'>enter a claim manually</a>.</div>"
                                ,autoHeight:true
                                ,autoScroll:true
						}]
				}]
		});

		// call parent initComponent
		casetracking.claim.ux.panel.search.results.NoResults.superclass.initComponent.call(this);
	}
});
// Register component as xtype
Ext.reg('casetracking.claim.ux.panel.search.results.NoResults',casetracking.claim.ux.panel.search.results.NoResults);