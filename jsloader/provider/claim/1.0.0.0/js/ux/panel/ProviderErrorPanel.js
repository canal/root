Ext.namespace("provider.claim.search.panel.ProviderErrorPanel");
provider.claim.search.panel.ProviderErrorPanel = Ext.extend(Ext.Panel, {	
	
	ID: 'ProviderErrorPanel',
	
	constructor : function(config) {
		
		uRadixClientMessageHandler.setAdvice(false,[{"description":"Error(s) Encountered<br>"}]);
		g_showStatusBox();
		
		// Apply to this component
		Ext.apply(this, {
			id: config.id,
			renderTo : config.renderTo,
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
			        	html: config.errorText
			        }
			        ]
		});	
		// call parent initComponent
		provider.claim.search.panel.ProviderErrorPanel.superclass.constructor.call(this);
	}
});

//Register component as xtype
Ext.reg('provider.claim.search.panel.ProviderErrorPanel',provider.claim.search.panel.ProviderErrorPanel);