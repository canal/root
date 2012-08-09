var comboRecord = new Ext.data.Record.create([{name: 'id'},{name : 'name'}]);

Ext.namespace("casetracking.reports.ux.panel.status.CategoryTypes");
casetracking.reports.ux.panel.status.CategoryTypes = Ext.extend(Ext.Panel, {
	initComponent : function(config) {	
		
		this.inquiryTypes = [];
		
		this.rd_random_category_data = new Ext.data.JsonReader({}, [ 'id', 'name']);
			
		// Apply to this component
		Ext.apply(this, {
			layout : "form",		
			bodyBorder : false,
			border : false,
			ctCls : "portal-plain-panel",
			hideBorders : true,
			width:425,
			labelAlign: "top",
			items : [{
						xtype: "combo",
						mode:"local",
						allowBlank:false,
						fieldLabel: "Category",
						msgTarget:"under",
						hiddenName : "CategoryId",
						name:"CategoryName",	
						id:"categoryIdCombo",
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
						width: 200,
						listeners: {
								render : function(){this.el.dom.name = this.name;}
								,select: function() {}
						}
						,typeAhead:true
						,typeAheadDelay:0
				}]
		});		
		// call parent initComponent
		casetracking.reports.ux.panel.status.CategoryTypes.superclass.initComponent.call(this);
	}
});

//Register component as xtype
Ext.reg('casetracking.reports.ux.panel.status.CategoryTypes',casetracking.reports.ux.panel.status.CategoryTypes);
