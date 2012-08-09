Ext.namespace("casetracking.create.ux.panel.basic.ProviderInquiry");
casetracking.create.ux.panel.basic.ProviderInquiry = Ext.extend(Ext.Panel, {

	thisObject: this,
	thisObjectName: undefined,
	thisObjectParentName: undefined,
	appeals:undefined,
	showAppealExplanationWindow : function(){
		casetracking.core.windows.AppealExplanation({"rows":this.appeals});
	},	
	
	// initComponent
	initComponent : function(config) {
		var thisObj = this;
		
		var caseTypeList = this.caseTypeList;
		this.networks = [{"id":"","name":"- Select One -"}].concat(this.caseNetworkList);			
		this.appeals = [{"id":"","name":"- Select One -"}];
		if(this.caseSubTypesList) {
			for(i = 0; i < this.caseSubTypesList.length; i++) {
				var caseSubType = caseSubTypesList[i];
				if(caseSubType.name == 'Other') {
					caseSubType.id = 'Other';
				}
				this.appeals.push(caseSubType);			
			}
		}	
		
		var claimRequiredPanel = Ext.getCmp(thisObj.selectClaimPanel.claimRequiredPanelId);
		var claimOptionalPanel = Ext.getCmp(thisObj.selectClaimPanel.claimOptionalPanelId);		
		var providerInfoPanel = thisObj.providerInfoPanel;
		var selectClaimPanel = thisObj.selectClaimPanel;
		
		var inquiryCaseDescriptionRequiredPanel = new Ext.Panel({
			border: false,
			id: "inquiryCaseDescriptionRequiredPanel",
			hidden: true,
			disabled: true,	
			layout: "form",
			items: [{							
				xtype: "textarea",
				fieldLabel: "Comments",
				id: "commentsRequired",
				name: "commentsRequired",
				maxLength: 1024,
				width: 375,
				height:140,
				allowBlank:false,
				msgTarget:"under"
			  }]
		});
		thisObj.inquiryCaseDescriptionRequiredPanel = inquiryCaseDescriptionRequiredPanel;		
		
		var inquiryCaseDescriptionOptionalPanel = new Ext.Panel({
			border: false,
			id: "inquiryCaseDescriptionOptionalPanel",
			hidden: true,
			disabled: true,	
			layout: "form",
			items: [{							
				xtype: "textarea",
				fieldLabel: "Comments",
				id: "commentsOptional",
				name: "commentsOptional",
				maxLength: 1024,
				width: 375,
				height:140,
				allowBlank:true,
				msgTarget:"under"
			  }]
		});
		thisObj.inquiryCaseDescriptionOptionalPanel = inquiryCaseDescriptionOptionalPanel;		
		
		var togglePanels = IDXM.Utilities.TogglePanels();
		togglePanels.setPanels([claimRequiredPanel,claimOptionalPanel,inquiryCaseDescriptionRequiredPanel,inquiryCaseDescriptionOptionalPanel]);		
	
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
					xtype: "resizable-combo",
					mode:"local",			  									
					fieldLabel: "Network",			  															
					allowBlank:false,
					hiddenName : "networkId",
					name:"networkNames",	
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
					listeners: {
							render : function(){this.el.dom.name = this.name;}
					}
					,typeAhead:true
					,typeAheadDelay:0
				  },{
					  xtype: "panel",
					  layout : "form",	
					  border: false,
					  labelAlign: "top",
					  style:"padding-top:10px;",
					  items : [{
							xtype: "resizable-combo",
							mode:"local",			  									
							fieldLabel: "Reason for Inquiry",			  									
							hiddenName : "categoryId",				
							allowBlank:false,
							name:"categoryName",
							msgTarget:"under",
							labelSeparator: " ",
							help: true,
							helpHandler: "" + thisObj.thisObjectParentName + "." + "showAppealExplanationWindow()",							
							store: new Ext.data.JsonStore({
									fields: ['id', 'name'],
									root : "rows",
									idProperty: "id",
									data:{ "rows":this.appeals}
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
									,select: function(){
										var selValue = this.getValue();	
										if(Ext.isEmpty(selValue)){
											togglePanels.disableShowPanel(inquiryCaseDescriptionRequiredPanel);
											togglePanels.disableShowPanel(inquiryCaseDescriptionOptionalPanel);
											togglePanels.disableShowPanel(selectClaimPanel);
											togglePanels.disableShowPanel(providerInfoPanel);
											Ext.getCmp('isProvClaimRequired').setValue('false');
										} else {
											// find the case type of this category
											for(i = 0; i < caseSubTypesList.length; i++) {
												var caseSubType = caseSubTypesList[i];
												if(caseSubType.id == selValue) {
													Ext.getCmp('inquiryId').setValue(caseSubType.caseType);													
													if(caseSubType.claimRequired) {
														togglePanels.enableShowPanel(selectClaimPanel);
														togglePanels.disableShowPanel(claimOptionalPanel);	
														togglePanels.enableShowPanel(claimRequiredPanel);
														togglePanels.disableShowPanel(providerInfoPanel);
														thisObj.selectClaimPanel.parentWindow.showClaimPanel();
														togglePanels.disableShowPanel(inquiryCaseDescriptionRequiredPanel);
														togglePanels.enableShowPanel(inquiryCaseDescriptionOptionalPanel);													
													} else {
														togglePanels.enableShowPanel(selectClaimPanel);
														togglePanels.enableShowPanel(claimOptionalPanel);
														togglePanels.disableShowPanel(claimRequiredPanel);																								
														togglePanels.enableShowPanel(providerInfoPanel);	
														thisObj.selectClaimPanel.parentWindow.hideClaimPanel();
														togglePanels.enableShowPanel(inquiryCaseDescriptionRequiredPanel);
														togglePanels.disableShowPanel(inquiryCaseDescriptionOptionalPanel);													
													}
													
													Ext.getCmp('isProvClaimRequired').setValue(caseSubType.claimRequired);
												}
											}
										}																																					
									}
							}
							,typeAhead:true
							,typeAheadDelay:0						  
					  }]
				  },{
						xtype: "hidden",
						id: "inquiryId",
						name: "inquiryId",
						value: ""
					}
				  ,{
						xtype: "hidden",
						id: "isProvClaimRequired",
						value: "false"
					}
					,inquiryCaseDescriptionRequiredPanel, inquiryCaseDescriptionOptionalPanel]
		});		
		// call parent initComponent
		casetracking.create.ux.panel.basic.ProviderInquiry.superclass.initComponent.call(this);
	}
});		

//Register component as xtype
Ext.reg('casetracking.create.ux.panel.basic.ProviderInquiry',casetracking.create.ux.panel.basic.ProviderInquiry);