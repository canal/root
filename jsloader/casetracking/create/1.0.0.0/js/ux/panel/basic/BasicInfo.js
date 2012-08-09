Ext.namespace("casetracking.create.ux.panel.basic.BasicInfo");
casetracking.create.ux.panel.basic.BasicInfo = Ext.extend(Ext.Panel, {
	
	thisObject: this,
	thisObjectName: undefined,
	thisObjectParentName: undefined,
	inquiries : undefined,
	priorities : undefined,
	caseNegotiationServicesPriorityList: undefined,
	inquiryTypesPanel: undefined,
	providerInfoPanel: undefined,
	selectClaimPanel: undefined,
	claimRequiredPanel: undefined,
	claimOptionalPanel: undefined,
	emptyTitlePanel: undefined,
	togglePanels: undefined,
	showInquiriesWindow : function(){
		casetracking.core.windows.InquiryExplanation({inquiries:this.inquiries});
	},
	showCategoriesWindow : function(){
		casetracking.core.windows.CategoryExplanation({"categoryPanel":this.inquiryTypesPanel,"inquiries":this.inquiries});
	},
	showPrioritiesWindow : function(){
		casetracking.core.windows.PriorityExplanation({priorities:this.priorities,caseNegotiationServicesPriorityList:this.caseNegotiationServicesPriorityList,inquiryId:"lastSelectedInquiryId",negotiationServicesCode:this.negotiationServicesCode});
	},	
	toggleClaimProviderPanels: function(categoryId) {
		if(Ext.isEmpty(categoryId)) {
			this.hideClaimProviderPanels();
			Ext.getCmp(this.selectClaimPanel.selectedClaimInfoId).setValue('NO_CLAIMS');
			Ext.getCmp('isClaimRequired').setValue('false');
		} else {
			var selectedInquiry = Ext.getCmp('inquiryName').getValue();
			if(selectedInquiry && categoryId) {
				for(var i = 0; i < this.inquiries.length; i++) {
					var inquiry = this.inquiries[i];
					if(inquiry && inquiry.id == selectedInquiry) {
						var categories = inquiry.caseCategoryLookupList; 
						for(var j = 0; j < categories.length; j++) {
							var category = categories[j];
							var inquiry = this.inquiries[i];
							if(category && category.id == categoryId) {								
								Ext.getCmp('isClaimRequired').setValue(category.claimRequired);
								var selectedClaimInfoId = Ext.getCmp(this.selectClaimPanel.selectedClaimInfoId);
								if(category.claimRequired) {
									this.togglePanels.enableShowPanel(this.selectClaimPanel);
									this.togglePanels.disableShowPanel(this.claimOptionalPanel);	
									this.togglePanels.enableShowPanel(this.claimRequiredPanel);
									this.togglePanels.disableShowPanel(this.providerInfoPanel);
									this.togglePanels.disableShowPanel(this.providerInfoPanel.practitionerPanel);
									this.togglePanels.disableShowPanel(this.providerInfoPanel.facilityPanel);
									this.selectClaimPanel.parentWindow.showClaimPanel();
									this.togglePanels.enableShowPanel(this.emptyTitlePanel);
									selectedClaimInfoId.setValue('MULTIPLE_CLAIMS');
								} else {
									this.togglePanels.enableShowPanel(this.selectClaimPanel);
									this.togglePanels.disableShowPanel(this.claimRequiredPanel);	
									this.togglePanels.enableShowPanel(this.claimOptionalPanel);																
									this.togglePanels.disableShowPanel(this.emptyTitlePanel);	
									var radioGroupArray = this.selectClaimPanel.find("id",this.selectClaimPanel.selectClaimRadioGroupId);	
									var checkedRadio = radioGroupArray[0].getValue();
									var checkedValue = checkedRadio.getRawValue();
									if(checkedValue == 'MULTIPLE_CLAIMS') {
										this.selectClaimPanel.addClaims();
										this.selectClaimPanel.parentWindow.showClaimPanel();
									} else if(checkedValue == 'NO_CLAIMS') {											
										this.selectClaimPanel.noClaims();
										this.selectClaimPanel.parentWindow.hideClaimPanel();
									}																									
								}
							}
						}
					}
				}	
			}	
		}
	},	
	hideClaimProviderPanels: function() {
		this.togglePanels.disableShowPanel(this.selectClaimPanel);
		this.togglePanels.disableShowPanel(this.claimRequiredPanel);	
		this.togglePanels.disableShowPanel(this.claimOptionalPanel);
		this.togglePanels.disableShowPanel(this.providerInfoPanel);	
		this.togglePanels.disableShowPanel(this.providerInfoPanel.practitionerPanel);
		this.togglePanels.disableShowPanel(this.providerInfoPanel.facilityPanel);		
		this.selectClaimPanel.parentWindow.hideClaimPanel();
		this.togglePanels.enableShowPanel(this.emptyTitlePanel);
		Ext.getCmp('isClaimRequired').setValue('false');
	},
	
	// initComponent
	initComponent : function(config) {

        var thisObj = this;
		this.inquiries = [{"id":"","name":"- Select One -"}].concat(this.caseTypeList);			
		var inquiryTypes = [{"id":"","name":"- Select One -"}].concat(this.inquiries);		
		this.networks = [{"id":"","name":"- Select One -"}].concat(this.caseNetworkList);	        	
        	
		var inquiryTypesPanel = new casetracking.create.ux.panel.basic.InquiryTypes ({callBackFunction:this.thisObjectParentName+"."+this.thisObjectName+".showCategoriesWindow()"
																					  ,parentwindow: thisObj});
        this.inquiryTypesPanel = inquiryTypesPanel;        	
		inquiryTypesPanel.hide();		

		this.priorities = this.casePriorityList;
		var priorityTypes = this.priorities;
		this.caseNegotiationServicesPriorityList = this.caseNegotiationServicesPriorityList;
		var negotiationServicesPriorityTypes = this.caseNegotiationServicesPriorityList;
		var negotiationServicesCode = this.negotiationServicesCode;
		var tmpPriorityTypes = this.priorities;
		
		this.providerInfoPanel = thisObj.providerInfoPanel;
		this.selectClaimPanel = thisObj.selectClaimPanel;
		this.claimRequiredPanel = Ext.getCmp(thisObj.selectClaimPanel.claimRequiredPanelId);
		this.claimOptionalPanel = Ext.getCmp(thisObj.selectClaimPanel.claimOptionalPanelId);
		this.emptyTitlePanel = thisObj.emptyTitlePanel;
		this.togglePanels = IDXM.Utilities.TogglePanels();
		//this.togglePanels.setPanels([this.selectClaimPanel, this.providerInfoPanel,this.claimRequiredPanel,this.claimOptionalPanel]);		
		
		function handleNegotiationServices(selectedCaseType) {		
			var cmbNetworkName = Ext.getCmp("networkName");
			if(selectedCaseType == negotiationServicesCode) {
				tmpPriorityTypes = negotiationServicesPriorityTypes;				
				cmbNetworkName.disable();
			} else {
				tmpPriorityTypes = priorityTypes;
				cmbNetworkName.enable();
			}			
			
			var cmbPriorityName = Ext.getCmp("tmpPriorityName");
			cmbPriorityName.reset();
			
			var cmbStore = cmbPriorityName.getStore();		
			cmbStore.removeAll();					        							          									
				
			var theArray = new Array();
			for(var i = 0; i< tmpPriorityTypes.length; i++) {
				theArray[theArray.length]=new comboRecord({'key': tmpPriorityTypes[i].key,'name': tmpPriorityTypes[i].name});
			}	
			cmbStore.add(theArray);	
			cmbPriorityName.setValue(getDefaultPriority(tmpPriorityTypes));			
		};
		
		function getDefaultPriority(prioritiesList) {
			var selectedPriority = '';
			for(var i = 0; i< prioritiesList.length; i++) {
				if(prioritiesList[i].id == 'STANDARD') {
					selectedPriority = prioritiesList[i].key;
					break;
				}
			}			
			if(selectedPriority == '') {
				selectedPriority = prioritiesList[0].key;
			}
			setPriorityAndReason(selectedPriority);
			return selectedPriority;
		};
		
		function setPriorityAndReason(selectedPriority) {
			for(i=0; i < tmpPriorityTypes.length; i++) {
				var priority = tmpPriorityTypes[i];				
				if(priority && priority.key == selectedPriority) {
					Ext.getCmp('priorityId').setValue(priority.id);
					Ext.getCmp('priorityReasonCodeId').setValue(priority.priorityReasonCode);
				}
			}
		};		
		
		// Apply to this component
		Ext.apply(this, {
			layout : "form",		
			bodyBorder : false,
			border : false,
			ctCls : "portal-plain-panel",
			hideBorders : true,
			items : [{
			        	  xtype : "panel",
			        	  border : false,
			        	  cls : "casetracking-title",
			        	  style:"padding-top:10px;",
			        	  bodyCssClass:"casetracking-title-body",
			        	  html : "Basic Information"
			          },{
						xtype : "panel",
						border : false,
						layout : "column",
						items : [{
							border : false,
							columnWidth : .60,
							bodyBorder : false,
							hideBorders : true,
							items : [{
									  xtype: "panel",
									  layout: "form",
									  border: false,
									  items: [{
											  xtype: "panel",
											  layout : "form",	
											  border: false,
											  items : [{
													   xtype : "panel",
													   border : false,
													   layout: "column",	
													   items: [{
															  xtype: "panel",
															  layout : "form",	
															  columnWidth:.55,
															  border: false,
															  labelAlign: "top",
															  items: [{
																	xtype: "resizable-combo",
																	mode:"local",
																	fieldLabel: "What is Your Inquiry",
																	labelSeparator:"?",
																	help:true,
																	helpHandler:this.thisObjectParentName+"."+this.thisObjectName+".showInquiriesWindow()",
																	msgTarget:"under",
																	hiddenName : "inquiryId",
																	allowBlank:false,
																	name:"inquiryName",	
																	id:"inquiryName",		
																	store: new Ext.data.JsonStore({
																			fields: ['id', 'name'],
																			root : "rows",
																			idProperty: "id",
																			data:{ "rows":this.inquiries}
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
																			handleNegotiationServices(this.getValue());					        							          					
																			Ext.getCmp("lastSelectedInquiryId").setValue(this.getValue());
																			var isShowInquiryPanel = false;
																			var enableDisableDone = false;
																			if(this.getValue() != '' && this.getValue().length > 0) {
																				for(var i = 0; i < inquiryTypes.length; i++) {
																					var inquiry = inquiryTypes[i];
																					if(inquiry.id == this.getValue()) {
																						var categories = inquiry.caseCategoryLookupList;
																						if(categories != undefined && categories != null && categories.length > 0) {		

																							var tmpCategories = [{"id":"","name":"- Select One -"}].concat(categories);
																							var cmbCategoryId = Ext.getCmp(thisObj.inquiryTypesPanel.categoryComboId);
																							cmbCategoryId.reset();

																							var cmbStore = cmbCategoryId.getStore();					        							          									
																							cmbStore.removeAll();					        							          									

																							var theArray = new Array();
																							for(var i = 0; i< tmpCategories.length; i++) {
																								theArray[theArray.length]=new comboRecord({'id': tmpCategories[i].id,'name': tmpCategories[i].name});
																							}
																							cmbStore.add(theArray);			
																							if(categories.length == 1) {
																								var category = categories[0];
																								var categoryId = category.id
																								cmbCategoryId.setValue(categoryId);
																								isShowInquiryPanel = false;
																								thisObj.toggleClaimProviderPanels(categoryId);																								
																							} else {
																								isShowInquiryPanel = true;
																								thisObj.hideClaimProviderPanels();
																							}				        							          									
																						}
																						break;
																					}
																				}					        							          						
																			} else {
																				thisObj.hideClaimProviderPanels();
																			}

																			if(!isShowInquiryPanel) {
																				inquiryTypesPanel.hide();
																			} else {
																				inquiryTypesPanel.show();
																			}
																		}
																	}
																	,typeAhead:true
																	,typeAheadDelay:0			        				  									
															  }]
														   },{
															   xtype: "hidden",
															   id: "lastSelectedInquiryId",
															   value: ""
														   },{
															   xtype: "hidden",
															   id: "isClaimRequired",
															   name: "isClaimRequired",
															   value: "false"
														   },{															   
															  xtype: "panel",
															  layout : "form",	
															  columnWidth:.45,
															  border: false,
															  items: [inquiryTypesPanel]
														   }]
												   }]
										  },{
											  xtype: "panel",
											  layout : "form",	
											  border: false,
											  labelAlign: "top",
											  items : [{
													xtype: "resizable-combo",
													mode:"local",			  									
													fieldLabel: "Network",			  									
													hiddenName : "networkId",
													allowBlank:false,
													name:"networkName",
													id:"networkName",	
													msgTarget:"under",
													store: new Ext.data.JsonStore({
															fields: ['id', 'name'],
															root : "rows",
															idProperty: "id",
															data:{ "rows":this.networks}
													}),
													valueField:"id",
													emptyText: "- Select One -",
													displayField:'name',
													triggerAction: 'all',
													editable:false,
													forceSelection:false,
													selectOnFocus:true,
													//width: 200,
													listeners: {
															render : function(){this.el.dom.name = this.name;}
													}
													,typeAhead:true
													,typeAheadDelay:0
												  }]
										  },{
											  xtype: "panel",
											  layout : "form",	
											  border: false,
											  labelAlign: "top",
											  items : [{
													xtype: "resizable-combo",
													mode:"local",
													fieldLabel: "Priority",
													help:true,
													helpHandler:this.thisObjectParentName+"."+this.thisObjectName+".showPrioritiesWindow()",
													allowBlank:true,
													hiddenName : "tmpPriorityId",
													name:"tmpPriorityName",
													id: "tmpPriorityName",
													store: new Ext.data.JsonStore({
															fields: ['key', 'name'],
															root : "rows",
															idProperty: "key",
															data:{ "rows":this.priorities}
													}),
													valueField:"key",
													displayField:'name',
													triggerAction: 'all',
													editable:false,
													forceSelection:false,
													selectOnFocus:true,
													width: 200,
													listeners: {
															render : function(){this.el.dom.name = this.name;}
															,afterrender: function() {
																var selectedPriority = getDefaultPriority(priorityTypes);
																this.setValue(selectedPriority);			        	        	  						
															}
															,select: function() {
																setPriorityAndReason(this.value);
															}
													}
													,typeAhead:true
													,typeAheadDelay:0
											  },{
												   xtype: "hidden",
												   id: "priorityId",
												   name: "priorityId",
												   value: ""
											   },{
												   xtype: "hidden",
												   id: "priorityReasonCodeId",
												   name: "priorityReasonCodeId",
												   value: ""
											   }]
										  }]
								  }]							
						}, {
							border : false,
							columnWidth : .40,
							bodyBorder : false,
							hideBorders : true,
							items : [ {
									  xtype: "panel",
									  layout : "form",	
									  border: false,
									  style:"padding-top:5px;",
									  labelAlign:"top",
									  items : [{							
											xtype: "textarea",
											fieldLabel: "Describe Your Inquiry",		
											name: "inquiryCaseDescription",
											maxLength: 1024,
											width: 375,
											height:140,
											allowBlank:false,
											msgTarget:"under"
										  }]
			        	         	}]							
						}]
				}]
		});
		// call parent initComponent
		casetracking.create.ux.panel.basic.BasicInfo.superclass.initComponent.call(this);
	}
});
// Register component as xtype
Ext.reg('casetracking.create.ux.panel.basic.BasicInfo',casetracking.create.ux.panel.basic.BasicInfo);
