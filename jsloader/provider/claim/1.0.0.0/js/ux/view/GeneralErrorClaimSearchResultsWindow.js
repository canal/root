Ext.namespace("provider.claim.search.view.GeneralErrorClaimSearchResultsWindow");
provider.claim.search.view.GeneralErrorClaimSearchResultsWindow = Ext.extend(Ext.Panel, {	
	
	ID: 'GeneralErrorClaimSearchResultsWindow',
	
	constructor : function(config) {
		
		// Apply to this component
		Ext.apply(this, {
			id: config.id,
			layout : "form",		
			bodyBorder : false,
			border : false,
			ctCls : "portal-plain-panel",
			hideBorders : true,			
			labelAlign: "top",
			items: [
			        {
			        	xtype: "panel",
			        	border: false,
			        	style:"padding-top:10px;padding-bottom:10px;",
			        	layout: "column",
			        	html: 'A general error has occured.'
			        }
			        ]
		});	
		// call parent initComponent
		provider.claim.search.view.GeneralErrorClaimSearchResultsWindow.superclass.constructor.call(this);
	}
});

//Register component as xtype
Ext.reg('provider.claim.search.view.GeneralErrorClaimSearchResultsWindow',provider.claim.search.view.GeneralErrorClaimSearchResultsWindow);