Ext.namespace("provider.claim.search.panel.AdditionalInfomationPanel");
provider.claim.search.panel.AdditionalInfomationPanel = Ext.extend(Ext.Panel, {

	// initComponent
	constructor : function(config) {    
				
		// Apply to this component
		Ext.apply(this, {
			id: config.id,
			layout : "form",		
			bodyBorder : false,
			border : false,
			hideBorders : true,
			ctCls : "portal-plain-panel",
			name : "AdditionalInformation",
			style : "padding-left: 15px;",
			width : 390,
			items : [
					{
						xtype : "panel",
						layout : "form",
						border : false,
						labelAlign : "top",
						items : [ {
							xtype : "textarea",
							fieldLabel : "Additional Information (optional)",
							name : "callMeInfo",
							maxLength : 1024,
							width : 375
						} ]
					},
					{
						xtype : "button",
						id : "callMeBtn",
						style : "float:right;",
						text : "<div>CALL ME</div>"
						//ctCls : "support-portal-btn"
					// ,handler:this.filterSearchSubmit
					} ]
		});

		// call parent initComponent
		provider.claim.search.panel.AdditionalInfomationPanel.superclass.constructor.call(this);
	}
});
// Register component as xtype
Ext.reg('provider.claim.search.panel.AdditionalInfomationPanel',provider.claim.search.panel.AdditionalInfomationPanel);
