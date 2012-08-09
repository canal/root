Ext.namespace("casetracking.reports.ux.panel.status.InquiryTypeReport");
casetracking.reports.ux.panel.status.InquiryTypeReport = function(config) {
	var categoryTypesPanel = new casetracking.reports.ux.panel.status.CategoryTypes({});
	categoryTypesPanel.hide();
	var caseTypeList = config.caseTypeList;
	caseTypeList.push({"caseCategoryLookupList":[{"description":"All","id":"All","name":"All"}],"description":"All","id":"All","name":"All"});
	var inquiryTypes = [{"id" : "","name" : "- Select One -"}].concat(caseTypeList);
	
	// Panel
	var againgReportPanel = new Ext.Panel(
			{
				renderTo : config.formPanelDivID,
				layout : "form",
				border : false,
				bodyBorder : false,
				hideBorders : true,
				width : 875,
				items : [{
						xtype : "uRadix.form.FormPanel",
						autoScroll : true,
						id : "casetrackingStatusByInquiryReportPanelForm"+ config.nameSpace,
						formObjectName : "Ext.getCmp('casetrackingStatusByInquiryReportPanelForm"+ config.nameSpace + "')",
						items : [{
								xtype : "panel",
								border : false,
								layout : "column",
								style : "padding-top:5px;",
								html : "<a class='enduser-application-link' href='"
										+ config.reportsLandingURL
										+ "' onclick=\"Ext.get(document.body.id).mask(\'<b> Loading...</b> \', \'x-mask-loading\');\"><span class='idxmTextSmall'>Reports</a></span><span class='idxmTextSmall'> > Status by Inquiry Type Report</span>"
							},{
								xtype : "panel",
								border : false,
								layout : "column",
								style : "padding-top:10px;",
								cls : "portal-title",
								html : "Status by Inquiry Type Report"
							},{
								xtype : "panel",
								border : false,
								html : "<span  class='idxmTextSmall'>All fields are required.</span>",
								style : "padding-top:10px;padding-left:10px;"
							},{
								xtype : "panel",
								border : false,
								style : "padding-top:10px;padding-left:15px;",
								layout : "form",
								width : 675,
								items : [{
										xtype : "panel",
										border : false,
										style : "padding-top:10px;padding-left:15px;",
										layout : "form",
										labelAlign : "top",
										items : [{
												xtype : "radiogroup",
												id : "ageCalculatedByRadioGroup",
												name : "ageCalculatedByRadioGroup",
												style : "padding-left:20px;",
												fieldLabel : "Age Calculated By:",
												labelSeparator : "",
												vertical : true,
												allowBlank : false,
												allowBlankBasic:true,
												msgTarget : "under",
												columns : 1,
												value : "",
												items : [{
													hideLabel : true,
													boxLabel : "Business Day",
													name : "Aging",
													inputValue : "B"
												},{
													hideLabel : true,
													boxLabel : "Calendar Day",
													name : "Aging",
													inputValue : "C"
												}]
											}]
									},{
										xtype : "panel",
										border : false,
										layout : "column",
										style : "padding-top:10px;padding-left:15px;",
										width : 250,
										html : "Opened or Reopened Between:",
										items : [{
													xtype : "panel",
													columnWidth : .5,
													layout : "form",
													border : false,
													labelAlign : "top",
													items : [{
															xtype : "datefield",
															name : "StartDate",
															id : "StartDate",
															fieldLabel : "From",
															hideLabel : false,
															allowBlank : false,
															allowBlankBasic:true,
															msgTarget : "under",
															maxValue : new Date()
														}]
											},{
												xtype : "panel",
												columnWidth : .5,
												layout : "form",
												border : false,
												labelAlign : "top",
												items : [{
													xtype : "datefield",
													name : "EndDate",
													id : "EndDate",
													fieldLabel : "To",
													hideLabel : false,
													allowBlank : false,
													allowBlankBasic:true,
													msgTarget : "under",
													maxValue : new Date()
												}]
											}]

									},{
										xtype : "panel",
										border : false,
										style : "padding-top:10px;padding-left:15px;",
										layout : "form",
										labelAlign : "top",
										items : [{
												xtype : "radiogroup",
												id : "caseStatusRadioGroup",
												name : "caseStatusRadioGroup",
												style : "padding-left:20px;",
												fieldLabel : "Service Case Status:",
												labelSeparator : "",
												vertical : true,
												allowBlank : false,
												allowBlankBasic:true,
												msgTarget : "under",
												columns : 1,
												value : "",
												items : [{
														hideLabel : true,
														boxLabel : "Open",
														name : "Status",
														inputValue : "Open",
														checked:true
													},{
														hideLabel : true,
														boxLabel : "Closed",
														name : "Status",
														inputValue : "Closed"
													},{
														hideLabel : true,
														boxLabel : "All",
														name : "Status",
														inputValue : "All"
													}]
											}]
									},{
										xtype : "panel",
										border : false,
										style : "padding-top:10px;padding-left:15px;",
										layout : "form",
										labelAlign : "top",
										items : [{
												xtype : "radiogroup",
												id : "caseCreatedViaRadioGroup",
												name : "caseCreatedViaRadioGroup",
												style : "padding-left:20px;",
												fieldLabel : "Created Via:",
												labelSeparator : "",
												vertical : true,
												allowBlank : false,
												allowBlankBasic:true,
												msgTarget : "under",
												columns : 1,
												value : "",
												items : [{
														hideLabel : true,
														boxLabel : "Portal",
														name : "CallSource",
														inputValue : "P",
														checked:true
													},{
														hideLabel : true,
														boxLabel : "All Other (phone, fax, email, etc.)",
														name : "CallSource",
														inputValue : "N"
													},{
														hideLabel : true,
														boxLabel : "All",
														name : "CallSource",
														inputValue : "A"
													}]
											}]										
									},{
										xtype : "panel",
										layout : "form",
										border : false,
										style : "padding-top:10px;padding-left:15px;",
										items : [{
												xtype : "panel",
												border : false,
												layout : "column",
												items : [{
														xtype : "panel",
														layout : "form",
														columnWidth : .40,
														border : false,
														labelAlign : "top",
														items : [{
																xtype : "combo",
																mode : "local",
																fieldLabel : "Inquiry Type",
																msgTarget : "under",
																hiddenName : "InquiryId",
																allowBlank : false,
																allowBlankBasic:true,
																name : "InquiryName",
																store : new Ext.data.JsonStore({
																			fields : ['id','name' ],
																			root : "rows",
																			idProperty : "id",
																			data : {"rows" : inquiryTypes}
																		}),
																valueField : "id",
																emptyText : "- Select One -",
																displayField : 'name',
																triggerAction : 'all',
																editable : false,
																forceSelection : false,
																selectOnFocus : true,
																width : 200,
																listeners : {
																	render : function() {
																		this.el.dom.name = this.name;
																	},
																	select : function() {
																		var isShowInquiryPanel = false;
																		var enableDisableDone = false;
																		if (this.getValue() != '' && this.getValue().length > 0) {
																			for ( var i = 0; i < inquiryTypes.length; i++) {
																				var inquiry = inquiryTypes[i];
																				if (inquiry.id == this.getValue()) {
																					var categories = inquiry.caseCategoryLookupList;
																					if (categories != undefined
																							&& categories != null
																							&& categories.length > 0) {

																						var tmpCategories = [{"id" : "","name" : "- Select One -"}]
																								.concat(categories);
																						var cmbCategoryId = Ext.getCmp("categoryIdCombo");
																						cmbCategoryId.reset();

																						var cmbStore = cmbCategoryId.getStore();
																						cmbStore.removeAll();

																						var theArray = new Array();
																						for ( var i = 0; i < tmpCategories.length; i++) {
																							theArray[theArray.length] = new comboRecord(
																									{
																										'id' : tmpCategories[i].id,
																										'name' : tmpCategories[i].name
																									});
																						}

																						theArray[theArray.length] = new comboRecord({'id' : 'All','name':'All'});

																						cmbStore.add(theArray);
																						if (categories.length == 1) {
																							var categoryId = categories[0].id
																							cmbCategoryId
																									.setValue(categoryId);
																							isShowInquiryPanel = false;
																						} else {
																							isShowInquiryPanel = true;
																						}
																						break;
																					}																					
																				}
																			}
																		}
																		if (!isShowInquiryPanel) {
																			categoryTypesPanel.hide();
																		} else {
																			categoryTypesPanel.show();
																		}
																	}
																},
																typeAhead : true,
																typeAheadDelay : 0
															}]
													},{
														xtype : "panel",
														layout : "form",
														columnWidth : .40,
														border : false,
														items : [categoryTypesPanel]
													}]
											}]
									},{
										xtype : "panel",
										border : false,
										layout : "column",
										items : [{
												border : false,
												columnWidth : .50,
												bodyBorder : false,
												hideBorders : true,
												items : [{
													id : "cancelButton"+ config.nameSpace,
													xtype : "button",
													text : "CANCEL",
													style : "padding-top: 15px;",
													ctCls : "support-portal-btn-cancel",
													handler : function() {
														if (isFormPanelDirty) {
															idxm.core.popups.Cancel({
																		doCancelFunction : jsonObject.doCancel,
																		noCancelFunction : jsonObject.noCancel
																	});
														} else {
															Ext.get(document.body.id).mask('<b> Loading...</b>','x-mask-loading');
															document.location = config.reportsLandingURL;
														}
													}
												}]
											},{
												border : false,
												columnWidth : .50,
												bodyBorder : false,
												hideBorders : true,
												items : [{
														id : "updateButton"+ config.nameSpace,
														xtype : "button",
														text : "RUN REPORT",
														style : "padding-top: 15px;",
														ctCls : "support-portal-btn",
														handler : formSubmitHandler
													}]
											}]
									}]
							}]
				}]
			});

	var formPanel = Ext.getCmp("casetrackingStatusByInquiryReportPanelForm"+ config.nameSpace);
	var isFormPanelDirty = false;
	formPanel.getForm().items.each(function(f) {
		f.on("change", function() {
			isFormPanelDirty = true;
		});
	});

	// Form Submit
	function formSubmitHandler() {

		// Get Form
		var formObj = Ext.getCmp("casetrackingStatusByInquiryReportPanelForm"+ config.nameSpace).getForm();

		var fromDate = Ext.getCmp('StartDate');
		var toDate = Ext.getCmp('EndDate');
		if (fromDate.getValue() != '' && toDate.getValue() != ''
				&& fromDate.getValue() > toDate.getValue()) {
			fromDate.markInvalid("Must be less than or equal to 'To'");
			return;
		}

		if (formObj.isValid()) {
			g_hideStatusBox();
			Ext.get(document.body.id).mask('<b> Generating Status By Inquiry Type Report...</b>','x-mask-loading');
			formObj.submit({
				url : config.urlSubmitGenerateReport,
				clientValidation : true,
				isRedirect : false,
				success : function(form, action) {
					Ext.get(document.body.id).unmask();
					var randomNumber = Math.floor(Math.random()*11);				
					var win = window.open(config.urlViewReport,"InquiryStatusReport"+randomNumber,"location=no,status=no,scrollbars=yes,resizable=yes,toolbar=no,menubar=no");
				},
				failure : function(form, action) {
					g_showStatusBox();
					Ext.getCmp("updateButton" + config.nameSpace).enable();
					Ext.get(document.body.id).unmask();
					formPanel.el.dom.scrollIntoView();	
				}
			});
		}
	};

	var jsonObject = {
		doCancel : function() {
			Ext.get(document.body.id).mask('<b> Loading...</b>','x-mask-loading');
			document.location = config.reportsLandingURL;
		},
		noCancel : function() {}
	};
	this.jsonObject = jsonObject;

	return this;
};