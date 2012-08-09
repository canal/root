Ext.namespace("casetracking.createpublic.ux.panel.inquiry.InquiryInfo");
casetracking.createpublic.ux.panel.inquiry.InquiryInfo = Ext.extend(Ext.Panel, {
	
	appeals:undefined,

	showAppealExplanationWindow : function(){
		casetracking.core.windows.AppealExplanation({rows:this.appeals});
	},	
	
	// initComponent
	initComponent : function(config) {
		
		this.networks = [{"id":"","name":"- Select One -"}].concat(this.caseNetworkList);
		this.appeals = [{"id":"","name":"- Select One -"}];
		if(this.caseSubTypesList) {
			for(i = 0; i < this.caseSubTypesList.length; i++) {
				this.appeals.push(caseSubTypesList[i]);			
			}
		}
		var caseTypeList = this.caseTypeList;		
		
		var inquiryInfoTop = new casetracking.createpublic.ux.panel.inquiry.InquiryInfoTop({});
		this.inquiryInfoTop = inquiryInfoTop;
		
		var inquiryClaimEOBInfo = new casetracking.createpublic.ux.panel.inquiry.InquiryClaimEOBInfo({});
		this.inquiryClaimEOBInfo = inquiryClaimEOBInfo;
		
		var inquiryComments = new casetracking.createpublic.ux.panel.inquiry.InquiryComments({});
		this.inquiryComments = inquiryComments;		
		
		var inquiryCommentsOptional = new casetracking.createpublic.ux.panel.inquiry.InquiryCommentsOptional({});
		this.inquiryCommentsOptional = inquiryCommentsOptional;	
		
		// Apply to this component
		Ext.apply(this, {
			layout : "form",		
			bodyBorder : false,
			border : false,
			ctCls : "portal-plain-panel",
			hideBorders : true,
			width:900,
			items: [{
			        	  xtype : "panel",
			        	  border : false,
			        	  cls : "casetracking-title",
			        	  style:"padding-top:10px;",
			        	  bodyCssClass:"casetracking-title-body",
			        	  html : "Inquiry Information"
			          },{
					  xtype: "panel",
					  layout : "form",	
					  border: false,
					  labelAlign: "top",
					  style:"padding-top:10px;",
					  items : [{
								xtype: "resizable-combo",
								mode:"local",			  									
								fieldLabel: "Network",			  									
								hiddenName : "networkId",
								allowBlank:false,
								msgTarget:"under",
								name:"networkId",							
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
							}]
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
							msgTarget:"under",
							name:"categoryName",		
							labelSeparator: " ",
							help: true,
							helpHandler: "" + this.thisObjectName + "." + "showAppealExplanationWindow()",						
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
									,select: function() {
										var selValue = this.getValue();
										if(selValue == '') {
											var togglePanels = IDXM.Utilities.TogglePanels();
											togglePanels.setPanels([inquiryInfoTop,inquiryClaimEOBInfo]);			          			        							
											togglePanels.disableShowPanel(inquiryInfoTop);
											togglePanels.disableShowPanel(inquiryClaimEOBInfo); 
											togglePanels.disableShowPanel(inquiryComments);  
											togglePanels.disableShowPanel(inquiryCommentsOptional);
											Ext.getCmp('isClaimRequired').setValue('false');
										} else {
											var togglePanels = IDXM.Utilities.TogglePanels();													
											// find the case type of this category
											for(i = 0; i < caseSubTypesList.length; i++) {
												var caseSubType = caseSubTypesList[i];
												if(caseSubType.id == selValue) {
													Ext.getCmp('inquiryId').setValue(caseSubType.caseType);
														if(caseSubType.claimRequired) {
															togglePanels.enableShowPanel(inquiryInfoTop);
															togglePanels.enableShowPanel(inquiryClaimEOBInfo);
															togglePanels.enableShowPanel(inquiryCommentsOptional);
															togglePanels.disableShowPanel(inquiryComments);														
														} else {
															togglePanels.disableShowPanel(inquiryInfoTop);
															togglePanels.disableShowPanel(inquiryClaimEOBInfo);  
															togglePanels.disableShowPanel(inquiryCommentsOptional);
															togglePanels.enableShowPanel(inquiryComments);
														}	
														Ext.getCmp('isClaimRequired').setValue(caseSubType.claimRequired);													
												}
											}											
										}
									}
							}
							,typeAhead:true
							,typeAheadDelay:0
				},{
					xtype: "hidden",
					id: "inquiryId",
					name: "inquiryId",
					value: ""
				},{
					xtype: "hidden",
					id: "isClaimRequired",
					name: "isClaimRequired",
					value: "false"
				}]
			},inquiryInfoTop,inquiryClaimEOBInfo,inquiryCommentsOptional,inquiryComments ]
		});
		
		// call parent initComponent
		casetracking.createpublic.ux.panel.inquiry.InquiryInfo.superclass.initComponent.call(this);
	}
});
//Register component as xtype
Ext.reg('casetracking.createpublic.ux.panel.inquiry.InquiryInfo',casetracking.createpublic.ux.panel.inquiry.InquiryInfo);