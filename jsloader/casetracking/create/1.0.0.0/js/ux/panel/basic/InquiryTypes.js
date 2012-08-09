var comboRecord = new Ext.data.Record.create([{name: 'id'},{name : 'name'}]);

Ext.namespace("casetracking.create.ux.panel.basic.InquiryTypes");
casetracking.create.ux.panel.basic.InquiryTypes = Ext.extend(Ext.Panel, {
	initComponent : function(config) {	
		var thisObj = this;
		thisObj.inquiryTypes = [];		
		thisObj.rd_random_category_data = new Ext.data.JsonReader({}, [ 'id', 'name']);
		thisObj.categoryComboId=Ext.id();
			
		// Apply to this component
		Ext.apply(this, {
			layout : "form",		
			bodyBorder : false,
			border : false,
			ctCls : "portal-plain-panel",
			hideBorders : true,			
			labelAlign: "top",
			items : [{
					xtype: "resizable-combo",
					mode:"local",
					allowBlank:false,
					fieldLabel: "Category",
					msgTarget:"under",
					hiddenName : "categoryId",
					name:"categoryName",
                    			help:true,
                    			helpHandler:this.callBackFunction,
					id:thisObj.categoryComboId,
					store: new Ext.data.JsonStore({
							fields: comboRecord,
							root : "rows",
							idProperty: "id",
							data:{ "rows":this.inquiryTypes},
							reader: this.rd_random_category_data
					}),
					valueField:"id",
					emptyText: "- Select One -",
					displayField:'name',
					triggerAction: 'all',
					editable:false,
					forceSelection:false,
					selectOnFocus:true,
					listeners: {
							render : function(){this.el.dom.name = this.name;}
							,select: function() {
								thisObj.parentwindow.toggleClaimProviderPanels(this.getValue());	
							}
					}
					,typeAhead:true
					,typeAheadDelay:0							

			  	}]
		});		
		// call parent initComponent
		casetracking.create.ux.panel.basic.InquiryTypes.superclass.initComponent.call(this);
	}
});
//Register component as xtype
Ext.reg('casetracking.create.ux.panel.basic.InquiryTypes',casetracking.create.ux.panel.basic.InquiryTypes);
