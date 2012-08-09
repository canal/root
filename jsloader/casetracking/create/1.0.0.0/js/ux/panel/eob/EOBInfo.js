Ext.namespace("casetracking.create.ux.panel.eob.EOBInfo");
casetracking.create.ux.panel.eob.EOBInfo = Ext.extend(Ext.Panel, {

	// initComponent
	initComponent : function(config) {			

		var faxEobPanelSingle   = new casetracking.create.ux.panel.eob.FaxInfo.Single ({});		
		var faxEobPanelMultiple   = new casetracking.create.ux.panel.eob.FaxInfo.Multiple ({});	
		
		var inputEobPanel   = new casetracking.create.ux.panel.eob.InputInfo ({border: false});	
		var inputMultipleEobPanel   = new casetracking.create.ux.panel.eob.MultipleInputInfo ({border: false});
		var chooseEobPanelSingle   = new casetracking.create.ux.panel.eob.choose.Single ({border: false,inputMultipleEobPanel:inputMultipleEobPanel,inputEobPanel:inputEobPanel,faxEobPanel:faxEobPanelSingle});
		var chooseEobPanelMultiple   = new casetracking.create.ux.panel.eob.choose.Multiple ({border: false,inputMultipleEobPanel:inputMultipleEobPanel,inputEobPanel:inputEobPanel,faxEobPanel:faxEobPanelMultiple});
		
		this.faxEobPanelSingle = faxEobPanelSingle;
		this.faxEobPanelMultiple = faxEobPanelMultiple;
		this.inputEobPanel = inputEobPanel;
		this.inputMultipleEobPanel = inputMultipleEobPanel;
		this.chooseEobPanelSingle = chooseEobPanelSingle;
		this.chooseEobPanelMultiple = chooseEobPanelMultiple;
		
		// Apply to this component
		Ext.apply(this, {
			layout : "form",		
			bodyBorder : false,
			border : false,
			ctCls : "portal-plain-panel",
			style:"padding-top:10px;",
			hideBorders : true,
			items : [{
			        	  xtype : "panel",
			        	  border : false,
			        	  cls : "casetracking-title",
			        	  style:"padding-top:10px;",
			        	  bodyCssClass:"casetracking-title-body",
			        	  html : "EOB Information"
			          },{
			          	xtype:"panel"
			          	,border:false
			          	,bodyBorder:false
			          	,style:"padding-right:10px"
			          	,items:[{
							  xtype: "panel",
							  border: false,
							  style:"padding-top:10px;",
							  html: "<span class='portal-text-medium'>Are you supplying information about an EOB or EOBs?</span>"
						  },{
							  xtype: "panel",
							  border: false,
							  style:"padding-top:10px;padding-bottom:10px;",
							  html: "<span class='portal-text-tiny'>An EOB is required for us to properly research provider rate or participation disputes. Please select 'yes' and proceed with the options for submission.</span>"
						  },{			        	  
									xtype: "radiogroup",
									name:"eobRadioGroup",
									style:"padding-left:20;padding-top:10px;",
									hideLabel:true,
									labelSeparator:"",
									vertical: true,
									columns:1,
									value:"NO_EOBS",
									items:	[{
											boxLabel : "Yes, a single EOB",
											name : "eobInformation",
											inputValue : "SINGLE_EOB",
											listeners: {
												check : function(o,b){
													if(b){
														var togglePanels = IDXM.Utilities.TogglePanels();													
														togglePanels.disableShowPanel(inputEobPanel);
														togglePanels.disableShowPanel(inputMultipleEobPanel);
														togglePanels.enableShowPanel(chooseEobPanelSingle);													
														togglePanels.disableShowPanel(faxEobPanelSingle);
														togglePanels.disableShowPanel(chooseEobPanelMultiple);
														togglePanels.disableShowPanel(faxEobPanelMultiple);

														var eobChooseSingleRadioGroup = chooseEobPanelSingle;
														var eobChooseSingleRadioGroupArray = eobChooseSingleRadioGroup.findByType("radio");
														for(i=0;i<eobChooseSingleRadioGroupArray.length;i++){
															if(eobChooseSingleRadioGroupArray[i].getValue() == true){
																eobChooseSingleRadioGroupArray[i].fireEvent("check",eobChooseSingleRadioGroupArray,true);														
															}
														}	
													}
												}
											}
										  },{
											boxLabel : "Yes, multiple EOBs",
											name : "eobInformation",
											inputValue : "MULTIPLE_EOB",
											listeners: {
												check : function(o,b){
													if(b){
														var togglePanels = IDXM.Utilities.TogglePanels();												
														togglePanels.disableShowPanel(inputEobPanel);	
														togglePanels.disableShowPanel(inputMultipleEobPanel);
														togglePanels.disableShowPanel(chooseEobPanelSingle);
														togglePanels.disableShowPanel(faxEobPanelSingle);													
														togglePanels.enableShowPanel(chooseEobPanelMultiple);
														togglePanels.disableShowPanel(faxEobPanelMultiple);														

														var eobChooseMultipleRadioGroup = chooseEobPanelMultiple;											
														var eobChooseMultipleRadioGroupArray = eobChooseMultipleRadioGroup.findByType("radio");
														for(i=0;i<eobChooseMultipleRadioGroupArray.length;i++){
															if(eobChooseMultipleRadioGroupArray[i].getValue() == true){
																eobChooseMultipleRadioGroupArray[i].fireEvent("check",eobChooseMultipleRadioGroupArray,true);														
															}
														}
													}
												}
											}
										  },{
												boxLabel : "No",
												name : "eobInformation",
												inputValue : "NO_EOBS",
												checked: true,
												listeners: {
													check : function(o,b){
														if(b){
															var togglePanels = IDXM.Utilities.TogglePanels();
															togglePanels.disableShowPanel(inputEobPanel);		
															togglePanels.disableShowPanel(inputMultipleEobPanel);
															togglePanels.disableShowPanel(chooseEobPanelSingle);
															togglePanels.disableShowPanel(faxEobPanelSingle);													
															togglePanels.disableShowPanel(chooseEobPanelMultiple);
															togglePanels.disableShowPanel(faxEobPanelMultiple);															
														} 											
													}
												}
										}]
								},chooseEobPanelSingle,chooseEobPanelMultiple,faxEobPanelSingle,faxEobPanelMultiple,inputMultipleEobPanel,inputEobPanel]
			          }			          
			]
		});

		// call parent initComponent
		casetracking.create.ux.panel.eob.EOBInfo.superclass.initComponent.call(this);
	}
});
// Register component as xtype
Ext.reg('casetracking.create.ux.panel.eob.EOBInfo',casetracking.create.ux.panel.eob.EOBInfo);
