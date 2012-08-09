Ext.namespace("casetracking.create.ux.form.CaseFormInternal");
casetracking.create.ux.form.CaseFormInternal = function(config) {
	var thisObj = this;
	thisObj.basicInfoPanel = null;
	config["parentObj"]=thisObj;	
	var caseFormInternalClient = new casetracking.create.ux.form.CaseFormInternalClient(config);
	
	config["thisObjectParentNameProvider"]= config.thisObjectName+".caseFormInternalProvider";
	var caseFormInternalProvider = new casetracking.create.ux.form.CaseFormInternalProvider(config);	
	thisObj.caseFormInternalProvider =caseFormInternalProvider;	

	//Panel
	var formPanel = new Ext.Panel({
							renderTo : config.formPanelDivID,
							layout : "form",
							border : false,
							bodyBorder : false,
							hideBorders : true,
							width : 1000,
							items : [{
											xtype : "panel",
											border : false,
											cls : "portal-title",
											html : "Open a Customer Service Case"
										},{
											xtype : "panel",
											border : false,
											layout : "column",
											style:"padding-top: 8px;",
											html : "<span class='portal-text-tiny-bold'>*Required</span>"
										},{
											xtype : "panel",
											border : false,
											layout : "column",
											style: "padding-top: 5px;",
											html : "<span class='portal-text-tiny'>When you open a case on behalf of another party, you will receive emails with the case details. The client or provider will not.</span>"
										},{
											xtype: "panel",
											border:false,
											layout:"form",
											labelAlign:"top",
											items:[{
													xtype: "radiogroup",
													id:"ccodeTypeRadioGroup"+this.prefix,
													name:"ccodeTypeRadioGroup",
													fieldLabel: "<div class='portal-text-medium'>Who are you opening a case for?</div>",
													labelSeparator:"",
													vertical: true,
													allowBlank:true,
													msgTarget:"under",
													columns:1,
													value:"",
													items:[{
															hideLabel: true,
															boxLabel : "Client",
															name : "userType",
															inputValue : "CLI",
															listeners: {
																check : function(o,b){
																	if(b) {
																		caseFormInternalClient.formPanel.show();
																		caseFormInternalProvider.formPanel.hide();
																		formPanel.doLayout();
																	}									
																}
															}
														},{
															hideLabel: true,
															boxLabel : "Provider",
															name : "userType",
															inputValue : "PRV",
															listeners: {
																check : function(o,b){
																	if(b) {
																		caseFormInternalClient.formPanel.hide();
																		caseFormInternalProvider.formPanel.show();
																		formPanel.doLayout();																		
																	} 											
																}
															}
														}]
												}]
										},caseFormInternalClient.formPanel,caseFormInternalProvider.formPanel]
						});
	thisObj.formPanel = formPanel;
						
	caseFormInternalClient.formPanel.hide();
	caseFormInternalProvider.formPanel.hide();

	return this;
};
