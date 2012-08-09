Ext.namespace("casetracking.claim.ux.panel.search.results.ClaimsAdded");
casetracking.claim.ux.panel.search.results.ClaimsAdded = Ext.extend(Ext.Panel, {

	// initComponent
	initComponent : function(config) {	
	
		var thisObj = this;
		var searchButtonId = Ext.id();
		thisObj.searchButtonId = searchButtonId;
			
		// Apply to this component
		Ext.apply(this, {		
			bodyBorder: false						    
			,border: false
			,hideBorders: true
			,items : [{
					autoHeight:true
					,items:[{
								xtype:"idxmStatusBox"
								,status:"success"
								,statusText:'Claim(s) Added'
						},{
							xtype: "panel"
							,border: false					
							,cls:"portal-titles"
							,html: "<BR><div class=tableContent>You can either continue adding claims or click \"DONE\" below.</div><BR>"							
							,autoHeight:true
							,autoScroll:true							
						},{
							xtype:"imagebutton"
							,id:searchButtonId
							,iconCls :"back-to-results-icon"
							,style:"padding-left:25px;padding-top:25px;"
							,handler:function(){
                                                                        thisObj.windowObj.hideAllResultsPanel();
                                                                        thisObj.windowObj.multiplanClaimPanel.show();								
							}
						    }]
				}]
		});

		// call parent initComponent
		casetracking.claim.ux.panel.search.results.ClaimsAdded.superclass.initComponent.call(this);
	}
});
// Register component as xtype
Ext.reg('casetracking.claim.ux.panel.search.results.ClaimsAdded',casetracking.claim.ux.panel.search.results.ClaimsAdded);