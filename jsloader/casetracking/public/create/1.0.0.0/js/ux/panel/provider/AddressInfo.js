Ext.namespace("casetracking.createpublic.ux.panel.provider.AddressInfo");
casetracking.createpublic.ux.panel.provider.AddressInfo = Ext.extend(Ext.Panel, {

	// initComponent
	initComponent : function(config) {		

		// Apply to this component
		Ext.apply(this, {
			layout : "form",		
			bodyBorder : false,
			border : false,
			ctCls : "portal-plain-panel",
			style:"padding-top:10px;",
			hideBorders : true,
			width:425,
			items : [{
					  xtype: "panel",
					  layout : "form",	
					  border: false,
					  labelAlign:"top",
					  items : [{
								xtype:"textfield"
								,fieldLabel:"Address"	
								,allowBlank:false
								,id:"address"
								,name:"address"
								,width:200
								,maxLength:255
							},{
								xtype:"textfield"
								,fieldLabel:"City"	
								,allowBlank:false
								,id:"city"
								,name:"city"
								,width:200
								,maxLength:100
							},{
								xtype:"textfield"
								,fieldLabel:"State"	
								,allowBlank:false
								,id:"state"
								,name:"state"
								,width:25
								,minLength: 2
								,maxLength: 2
							},{
								xtype:"textfield"
								,fieldLabel:"Zip Code"	
								,allowBlank:false
								,id:"zipCode"
								,name:"zipCode"
								,width:75
								,maxLength:10
							},{
								xtype:"textfield"
								,fieldLabel:"Provider TIN"	
								,allowBlank:false
								,id:"tin"
								,name:"tin"
								,width:200
								,vtype:"tin"
							},{
								xtype:"textfield"
									,fieldLabel:"NPI"	
									,allowBlank:true
									,id:"npi"
									,name:"npi"
									,width:200 
									,vtype:"npi"	
									,minLength:10
									,maxLength:10
	                                ,autoCreate : {
	                                	tag : "input",
	                                    size : "10",
	                                    minLength: "10",
	                                    maxLength : "10"
	                                } 
							}]
        	          	}]
		});

		// call parent initComponent
		casetracking.createpublic.ux.panel.provider.AddressInfo.superclass.initComponent.call(this);
	}
});

// Register component as xtype
Ext.reg('casetracking.createpublic.ux.panel.provider.AddressInfo',casetracking.createpublic.ux.panel.provider.AddressInfo);