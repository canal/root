Ext.namespace("casetracking.create.ux.panel.eob.choose.Single");
casetracking.create.ux.panel.eob.choose.Single = Ext.extend(Ext.Panel, {

	// initComponent
	initComponent : function(config) {				
		
		var inputEobPanel   = this.inputEobPanel;
		var inputMultipleEobPanel   = this.inputMultipleEobPanel;
		var faxEobPanel   = this.faxEobPanel;				
		
		var togglePanels = IDXM.Utilities.TogglePanels();
		togglePanels.setPanels([inputMultipleEobPanel,inputEobPanel,faxEobPanel]);
		togglePanels.hidePanels();
		togglePanels.disableShowPanel(inputMultipleEobPanel);
		togglePanels.disableShowPanel(inputEobPanel);
		togglePanels.disableShowPanel(faxEobPanel);			
		
		// Apply to this component
		Ext.apply(this, {
			layout : "form",		
			bodyBorder : false,
			border : false,
			ctCls : "portal-plain-panel",
			style:"padding-top:10px;",
			hideBorders : true,
			items : [{
	        	           xtype: "label",
		        	       text : "*How are you providing the information?",
		        	       cls : "supportPortalFormLabelBold"		
			          },{
							xtype: "radiogroup",
							name:"eobChooseSingleRadioGroup",
							style:"padding-left:20;padding-top:10px;",
							hideLabel:true,
							labelSeparator:"",
							vertical: true,
							columns:1,
							value:"none",
							allowBlank: false,
							msgTarget:"under",
							items:	[{
										boxLabel : "Uploading or faxing the EOB",
										name : "eobChooseTypeSingle",
										inputValue : "UPLOAD_FAX_EOB",
										listeners: {
											check : function(o,b){
												if(b) {
													togglePanels.disableShowPanel(inputEobPanel);
													togglePanels.disableShowPanel(inputMultipleEobPanel);
													togglePanels.enableShowPanel(faxEobPanel);											
												}											
											}
										}
									  },{
										boxLabel : "Inputting the EOB",
										name : "eobChooseTypeSingle",
										inputValue : "INPUT_EOB",
										listeners: {
											check : function(o,b){
												if(b) {											
													togglePanels.enableShowPanel(inputEobPanel);
													togglePanels.disableShowPanel(inputMultipleEobPanel);
													togglePanels.disableShowPanel(faxEobPanel);											
												}									
											}
										}
									  }]
						}
			          ,faxEobPanel,inputEobPanel
			]
		});
		
		// call parent initComponent
		casetracking.create.ux.panel.eob.choose.Single.superclass.initComponent.call(this);			
	}
});
// Register component as xtype
Ext.reg('casetracking.create.ux.panel.eob.choose.Single',casetracking.create.ux.panel.eob.choose.Single);


Ext.namespace("casetracking.create.ux.panel.eob.choose.Multiple");
casetracking.create.ux.panel.eob.choose.Multiple = Ext.extend(Ext.Panel, {

	// initComponent
	initComponent : function(config) {				
				
		var inputEobPanel   = this.inputEobPanel;
		var inputMultipleEobPanel   = this.inputMultipleEobPanel;
		var faxEobPanel   = this.faxEobPanel;				
		
		var togglePanels = new IDXM.Utilities.TogglePanels();
		togglePanels.setPanels([inputMultipleEobPanel,inputEobPanel,faxEobPanel]);
		togglePanels.hidePanels();
		togglePanels.disableShowPanel(inputMultipleEobPanel);
		togglePanels.disableShowPanel(inputEobPanel);
		togglePanels.disableShowPanel(faxEobPanel);		
		
		// Apply to this component
		Ext.apply(this, {
			layout : "form",		
			bodyBorder : false,
			border : false,
			ctCls : "portal-plain-panel",
			style:"padding-top:10px;",
			hideBorders : true,
			items : [{
	        	           	xtype: "label",
		        	       text : "*How are you providing the information?",
		        	       cls : "supportPortalFormLabelBold"		
			          },{
					xtype: "radiogroup",
					name:"eobChooseMultipleRadioGroup",
					style:"padding-left:20;padding-top:10px;",
					hideLabel:true,
					labelSeparator:"",
					vertical: true,
					columns:1,
					value:"none",
					items:	[{
								boxLabel : "Uploading or faxing EOBs",
								name : "eobsChooseTypeMultiple",
								checked: true,
								inputValue : "UPLOAD_FAX_EOBS",
								listeners: {
									check : function(o,b){
										if(b) {
											togglePanels.disableShowPanel(inputEobPanel);
											togglePanels.disableShowPanel(inputMultipleEobPanel);
											togglePanels.enableShowPanel(faxEobPanel);																						
										}																			
									}
								}
							  },{
								boxLabel : "Inputting EOBs",
								name : "eobsChooseTypeMultiple",
								inputValue : "INPUT_EOBS",
								listeners: {
									check : function(o,b){
										if(b) {
											togglePanels.enableShowPanel(inputMultipleEobPanel);
											togglePanels.enableShowPanel(inputEobPanel);
											togglePanels.disableShowPanel(faxEobPanel);		
										}										
									}
								}
							  }]
				}
			          ,faxEobPanel,inputEobPanel	
			]
		});

		// call parent initComponent
		casetracking.create.ux.panel.eob.choose.Multiple.superclass.initComponent.call(this);		
	}
});
// Register component as xtype
Ext.reg('casetracking.create.ux.panel.eob.choose.Multiple',casetracking.create.ux.panel.eob.choose.Multiple);
