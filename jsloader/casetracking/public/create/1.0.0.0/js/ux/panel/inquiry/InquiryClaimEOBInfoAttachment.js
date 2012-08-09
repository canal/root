Ext.namespace("casetracking.createpublic.ux.panel.inquiry.InquiryInfoTop");
casetracking.createpublic.ux.panel.inquiry.InquiryInfoTop = Ext.extend(Ext.Panel, {
	// initComponent
	initComponent : function(config) {		
		// Apply to this component
		Ext.apply(this, {
					layout:"form"
					,border: false
					,labelAlign:"top"
					,items: [{
							xtype: "panel"
							,border: true
							,width: 400
							,style:"padding-top:10px;padding-bottom:10px;"
							,bodyCssClass:"info-box"			
							,html: "<table height='50' style='padding:2px;'><tr><td valign='top'><div class='uradix-form-info-details-icon' style='visibility: visible;'></div></td><td width=5px></td><td><span class='idxmTextMedium'>In order to research your claim inquiry, a copy of the claim is &nbsp;required.<br><br>You can upload or fax a copy of the claim after the service case&nbsp;has been created.  Instructions are provided on the next screen.</span></td></tr></table>"
						}]			
					});
		// call parent initComponent
		casetracking.createpublic.ux.panel.inquiry.InquiryInfoTop.superclass.initComponent.call(this);
	}
});
// Register component as xtype
Ext.reg('casetracking.createpublic.ux.panel.inquiry.InquiryInfoTop',casetracking.createpublic.ux.panel.inquiry.InquiryInfoTop);

Ext.namespace("casetracking.createpublic.ux.panel.inquiry.InquiryClaimEOBInfo");
casetracking.createpublic.ux.panel.inquiry.InquiryClaimEOBInfo = Ext.extend(Ext.Panel, {

	// initComponent
	initComponent : function(config) {				
		
		// Apply to this component
		Ext.apply(this, {
					layout:"form"
					,border: false
					,labelAlign:"top"
					,width:425
					,items: [{
							xtype:"textfield"
							,fieldLabel:"Patient First Name"	
							,hideLabel: false
							,allowBlank:false
							,id:"patientFirstName"
							,name:"patientFirstName"
							,width:200
						},{
							xtype:"textfield"
							,fieldLabel:"Patient Last Name"	
							,hideLabel: false
							,allowBlank:false
							,id:"patientLastName"
							,name:"patientLastName"
							,width:200
						},{
							xtype: "panel"
							,border: false
							,layout:"column"
							,style:"padding-top:10px;"
							,width:250
							,items:[{
									xtype: "panel"
									,columnWidth:.5
									,layout:"form"
									,border: false
									,labelAlign:"top"
									,items:[{
											xtype:"datefield"
											,name:"dosFrom"
											,id:"dosFrom"
											,fieldLabel: "DOS From"
											,hideLabel: false
											,allowBlank:false
											,msgTarget:"under"
											,maxValue: new Date()
										}]
								},{
									xtype: "panel"
									,columnWidth:.5
									,layout:"form"
									,border: false
									,labelAlign:"top"
									,items:[{
											xtype:"datefield"
											,name:"dosTo"
											,id:"dosTo"
											,fieldLabel: "DOS To"
											,hideLabel: false
											,allowBlank:false
											,msgTarget:"under"
											,maxValue: new Date()
										}]
								}]

						},{
							xtype:"textfield"
							,fieldLabel:"Total Charge"	
							,hideLabel: false
							,allowBlank:false
							,id:"totalCharge"
							,name:"totalCharge"
							,width:200
							,vtype:"dollar"
							,autoCreate:{tag: "input",size:"14",maxLength:"14"}
						}]			
				});
		// call parent initComponent
		casetracking.createpublic.ux.panel.inquiry.InquiryClaimEOBInfo.superclass.initComponent.call(this);
	}
});
// Register component as xtype
Ext.reg('casetracking.createpublic.ux.panel.inquiry.InquiryClaimEOBInfo',casetracking.createpublic.ux.panel.inquiry.InquiryClaimEOBInfo);