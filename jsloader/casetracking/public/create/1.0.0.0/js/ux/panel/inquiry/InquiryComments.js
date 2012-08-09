Ext.namespace("casetracking.createpublic.ux.panel.inquiry.InquiryComments");
casetracking.createpublic.ux.panel.inquiry.InquiryComments = Ext.extend(Ext.Panel, {
	// initComponent
	initComponent : function(config) {						
		// Apply to this component
		Ext.apply(this, {
					layout:"form"
					,border: false
					,labelAlign:"top"
					,items: [{							
							xtype: "textarea",
							fieldLabel: "Comments",		
							name: "commentsRequired",
							maxLength: 1024,
							width: 375,
							allowBlank:false,
							msgTarget:"under"
						}]
			
					});
		// call parent initComponent
		casetracking.createpublic.ux.panel.inquiry.InquiryComments.superclass.initComponent.call(this);
	}
});
// Register component as xtype
Ext.reg('casetracking.createpublic.ux.panel.inquiry.InquiryComments',casetracking.createpublic.ux.panel.inquiry.InquiryComments);

Ext.namespace("casetracking.createpublic.ux.panel.inquiry.InquiryCommentsOptional");
casetracking.createpublic.ux.panel.inquiry.InquiryCommentsOptional = Ext.extend(Ext.Panel, {
	// initComponent
	initComponent : function(config) {						
		// Apply to this component
		Ext.apply(this, {
					layout:"form"
					,border: false
					,labelAlign:"top"
					,items: [{							
							xtype: "textarea",
							fieldLabel: "Comments",		
							name: "commentsOptional",
							maxLength: 1024,
							width: 375,
							msgTarget:"under"
						}]
			
					});
		// call parent initComponent
		casetracking.createpublic.ux.panel.inquiry.InquiryCommentsOptional.superclass.initComponent.call(this);
	}
});
// Register component as xtype
Ext.reg('casetracking.createpublic.ux.panel.inquiry.InquiryCommentsOptional',casetracking.createpublic.ux.panel.inquiry.InquiryCommentsOptional);