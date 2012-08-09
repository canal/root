Ext.namespace("provider.claim.search.view.ZeroClaimSearchResultsView");
provider.claim.search.view.ZeroClaimSearchResultsView = Ext.extend(Ext.Panel, {
	
	ID: 'ZeroClaimSearchResultsView',
	
	initComponent : function(config) {
		var thisObj = this;
		var claimHelpLinkId = Ext.id();
		// Apply to this component
		Ext.apply(this, {
			id: "ZeroClaimSearchResultsView",
			layout : "form",		
			bodyBorder : false,
			border : false,
			ctCls : "portal-plain-panel",
			hideBorders : true,			
			labelAlign: "top",
			items: [
			        {
			        	xtype: "panel",
			        	cls: "portal-text-medium",
			        	html: "<div>Your search yielded no claims.<br><br>Please verify your search criteria and try agan.</div>"
			        }
			        ,{
			        	xtype: "panel",
			        	cls : "portal-title",
			        	style: "padding-top:10px;"
			        }
			        ,{
			        	xtype: "panel",
			        	cls: "portal-text-small",
			        	html: "<div>If you still experience problems, <a id='"+claimHelpLinkId+"' class='portal-link' href='#'>click here</a></div>",		        	
			        	style: "padding-top:10px;",
			        	listeners : {
							afterrender : function() {
								var claimHelpLink = Ext.get(claimHelpLinkId);
								claimHelpLink
								.on(
										"click",
										function() {
											thisObj.thisParentObject.showResults.call(thisObj.thisParentObject, 'AdditionalInformationView');
										});
							}
			        	}
			        }
			        ]
		});	
		
		// call parent initComponent
		provider.claim.search.view.ZeroClaimSearchResultsView.superclass.initComponent.call(this);
	}
});
//Register component as xtype
Ext.reg('provider.claim.search.view.ZeroClaimSearchResultsView',provider.claim.search.view.ZeroClaimSearchResultsView);