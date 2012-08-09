Ext.namespace("casetracking.create.ux.panel.eob.InputInfo");
casetracking.create.ux.panel.eob.InputInfo = Ext.extend(Ext.Panel, {

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
			labelAlign:"top",
			items : [{
						xtype:"textfield"
  						,fieldLabel:"Non-covered Amount"	
  						,hideLabel: false
  						,allowBlank:false
  						,name:"nonCoveredAmount"
  						,width:200
  						,vtype:"dollar"
  						,autoCreate:{tag: "input",size:"14",maxLength:"14"}
					},{
						xtype:"textfield"
						,fieldLabel:"Network Discount Amount"	
						,hideLabel: false
						,allowBlank:false					
						,name:"discountOnClaim"
						,width:200
						,vtype:"dollar"
						,autoCreate:{tag: "input",size:"14",maxLength:"14"}
					},{
						xtype:"textfield"
						,fieldLabel:"Payment Amount"	
						,hideLabel: false
						,allowBlank:false
						,name:"paymentAmount"
						,width:200
						,vtype:"dollar"						
						,autoCreate:{tag: "input",size:"14",maxLength:"14"}
					},{
						xtype:"textfield"
						,fieldLabel:"Allowable Amount"	
						,hideLabel: false
						,allowBlank:false
						,name:"allowableAmount"
						,width:200
						,vtype:"dollar"
						,autoCreate:{tag: "input",size:"14",maxLength:"14"}
					},{
						xtype:"numberfield"
						,fieldLabel:"Co-Ins %"	
						,hideLabel: false
						,allowBlank:false
						,name:"conIns"
						,width:200
						,minValue: 0
						,maxValue: 100
						,autoCreate:{tag: "input",size:"3",maxLength:"3"}
					},{
						xtype:"textfield"
						,fieldLabel:"Deductible"	
						,hideLabel: false
						,allowBlank:false
						,name:"deductable"
						,width:200
						,vtype:"dollar"
						,autoCreate:{tag: "input",size:"14",maxLength:"14"}
					},{
						xtype:"datefield"
						,name:"dateOfPayment"
						,fieldLabel: "Date of Payment"
						,hideLabel: false
						,msgTarget:"under"
					},{
						xtype:"textfield"
						,fieldLabel:"Check #"	
						,hideLabel: false
						,allowBlank:true
						,name:"checkNumber"
						,width:200
					},{
						xtype:"textfield"
						,fieldLabel:"Payment Details"	
						,hideLabel: false
						,allowBlank:true
						,name:"paymentDetails"
						,width:200
        	          }]
		});

		// call parent initComponent
		casetracking.create.ux.panel.eob.InputInfo.superclass.initComponent.call(this);
	}

});

// Register component as xtype
Ext.reg('casetracking.create.ux.panel.eob.InputInfo',casetracking.create.ux.panel.eob.InputInfo);

Ext.namespace("casetracking.create.ux.panel.eob.MultipleInputInfo");
casetracking.create.ux.panel.eob.MultipleInputInfo = Ext.extend(Ext.Panel, {

	// initComponent
	initComponent : function(config) {		
		
		// Apply to this component		
		Ext.apply(this, {
		    layout:'form'
		    ,labelAlign:"top"
		    ,defaults: { bodyStyle:'padding:10px;padding-left:0px;'}
		    ,items: [{
					  xtype: "panel",
					  border: true,
					  style:"padding-top:10px;padding-top:5px;",
					  bodyCssClass: "info-box",							
					  html: "<table height='50'><tr><td>&nbsp;</td><td><div class='uradix-form-info-details-icon' style='visibility: visible;'></div></td><td><span class='portal-text-medium'>You can upload or fax additional EOBs after the case has been created. Instructions will be provided on the next screen.</span></td></tr></table>"
				},{
					  xtype: "panel",
					  border: false,
					  style:"padding-top:5px;padding-bottom:5px;",
					  html: "<table><tr><td><span class='portal-text-large'>Provide information from one of the EOBs</span></td></tr></table>"					
				}]			
		});

		// call parent initComponent
		casetracking.create.ux.panel.eob.MultipleInputInfo.superclass.initComponent.call(this);
	}
});
// Register component as xtype
Ext.reg('casetracking.create.ux.panel.eob.MultipleInputInfo',casetracking.create.ux.panel.eob.MultipleInputInfo);