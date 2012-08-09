Ext.namespace("provider.claim.search.view.DefaultEmptyView");
provider.claim.search.view.DefaultEmptyView = Ext.extend(Ext.Panel, {
	
	ID: 'DefaultEmptyView',
	
	initComponent : function(config) {	

		// Apply to this component
		Ext.apply(this, {
			layout : "form",		
			bodyBorder : false,
			border : false,
			ctCls : "portal-plain-panel",
			hideBorders : true,			
			labelAlign: "top"
		});		
		// call parent initComponent
		provider.claim.search.view.DefaultEmptyView.superclass.initComponent.call(this);
	}
});
//Register component as xtype
Ext.reg('provider.claim.search.view.DefaultEmptyView',provider.claim.search.view.DefaultEmptyView);