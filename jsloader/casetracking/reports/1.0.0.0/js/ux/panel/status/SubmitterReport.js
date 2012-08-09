Ext.namespace("casetracking.reports.ux.panel.status.SubmitterTypeReport");
casetracking.reports.ux.panel.status.SubmitterTypeReport = function(config) {
	var priorityTypes = [{
		"id" : "",
		"key" : -1,
		"name" : "- Select One -"
	}].concat(config.casePriorityList);
		
	var currentId, duplicateIds;
	var priorityArrayTemp = new Array();
	priorityArrayTemp[0]=priorityTypes[0];
	for(i=1, priorityLength=priorityTypes.length; i < priorityLength; i++){
		priorityArrayTemp[priorityArrayTemp.length]=priorityTypes[i];		
		if((priorityTypes[i-1] && priorityTypes[i]) && (priorityTypes[i-1].id && priorityTypes[i].id)){
			if((priorityTypes[i-1].id == priorityTypes[i].id)){	
				if(i == (priorityLength-1)){
					priorityArrayTemp[priorityArrayTemp.length] = {"description":priorityTypes[i].description+" - All","id":priorityTypes[i].id,"key":priorityLength,"name":priorityTypes[i].nameWithoutReasonCode+" - All","nameWithoutReasonCode":"All","priorityReasonCode":"All","priorityReasonDetail":"All"};
				}else if ((priorityTypes[i+1]) && (priorityTypes[i].id != priorityTypes[i+1].id) ){
					priorityArrayTemp[priorityArrayTemp.length] = {"description":priorityTypes[i].description+" - All","id":priorityTypes[i].id,"key":priorityLength,"name":priorityTypes[i].nameWithoutReasonCode+" - All","nameWithoutReasonCode":"All","priorityReasonCode":"All","priorityReasonDetail":"All"};
				}
			}
		}
	}
	
	var key = config.casePriorityList.length;	
	priorityArrayTemp.push({"description":"All","id":"All","key":0,"name":"All","nameWithoutReasonCode":"All","priorityReasonDetail":""});	
	priorityTypes = priorityArrayTemp;

	var submittedByUserList = [ {
		"sysKey" : "",
		"userID" : "- Select One -"
	}];
	if(config.submittedByUserList) {
		for(i = 0; i < config.submittedByUserList.length; i++) {
			var user = config.submittedByUserList[i];
			var tmpUser = new Object();
			tmpUser.sysKey = user.sysKey;
			tmpUser.userID = user.lastName + ', ' + user.firstName;
			submittedByUserList[i+1] = tmpUser;
		}
	}

	function setPriorityAndReason(selectedPriority) {
		for (i = 0; i < priorityTypes.length; i++) {
			var priority = priorityTypes[i];
			if (priority && priority.key == selectedPriority) {
				Ext.getCmp('priorityName').setValue(priority.id);
				Ext.getCmp('priorityReasonCodeId').setValue(priority.priorityReasonCode);
			}
		}
	};

	// Panel
	var submitterReportPanel = new Ext.Panel(
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
						id : "casetrackingStatusBySubmitterReportPanelForm"+ config.nameSpace,
						formObjectName : "Ext.getCmp('casetrackingStatusBySubmitterReportPanelForm"+ config.nameSpace + "')",
						items : [{
								xtype : "panel",
								border : false,
								layout : "column",
								style : "padding-top:5px;",
								html : "<a class='enduser-application-link' href='"
										+ config.reportsLandingURL
										+ "' onclick=\"Ext.get(document.body.id).mask(\'<b> Loading...</b> \', \'x-mask-loading\');\"><span class='idxmTextSmall'>Reports</a></span><span class='idxmTextSmall'> > Status by Submitter Report</span>"
							},{
								xtype : "panel",
								border : false,
								layout : "column",
								style : "padding-top:10px;",
								cls : "portal-title",
								html : "Status by Submitter Report"
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
								width : 875,
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
										labelAlign : "top",
										style : "padding-top:10px;padding-left:15px;",
										items : [{
												xtype : "combo",
												mode : "local",
												fieldLabel : "Priority",
												allowBlank : false,
												allowBlankBasic:true,
												msgTarget : "under",
												hiddenName : "PriorityId",
												name : "priorityNameTemp",
												store : new Ext.data.JsonStore(
														{
															fields : ['key','name' ],
															root : "rows",
															idProperty : "key",
															data : {
																"rows" : priorityTypes
															}
														}),
												emptyText : "- Select One -",
												valueField : "key",
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
														setPriorityAndReason(this.value);
													}
												},
												typeAhead : true,
												typeAheadDelay : 0
											},{
												xtype : "hidden",
												id : "priorityName",
												name : "priorityName",
												value : ""
											},{
												xtype : "hidden",
												id : "priorityReasonCodeId",
												name : "priorityReasonCodeId",
												value : ""
											}]
									},{
										xtype : "panel",
										border : false,
										style : "padding-top:10px;padding-left:15px;",
										layout : "form",
										labelAlign : "top",
										items : [{
												xtype : "radiogroup",
												id : "submittedByRadioGroup",
												name : "submittedByRadioGroup",
												style : "padding-left:20px;",
												fieldLabel : "Submitted By:",
												labelSeparator : "",
												vertical : true,
												allowBlank : false,
												allowBlankBasic:true,
												msgTarget : "under",
												columns : 1,
												value : "",
												items : [{
														hideLabel : true,
														boxLabel : "Everyone",
														name : "SubmitterNameRadio",
														inputValue : "All",
														checked:true,
														listeners : {
															check : function(o,b) {
																if (b) {
																	Ext.getCmp('SubmitterName').setValue(this.getRawValue());
																}
															}
														}
													},{
														hideLabel : true,
														boxLabel : "Me",
														name : "SubmitterNameRadio",
														inputValue : config.sysKey,																	
														listeners : {
															check : function(o,b) {
																if (b) {
																	Ext.getCmp('SubmitterName').setValue(this.getRawValue());
																}
															}
														}
													},{
														xtype : "panel",
														layout : "column",
														border : false,
														labelAlign : "top",
														items : [{
																xtype : "radio",
																hideLabel : true,
																boxLabel : " ",
																name : "SubmitterNameRadio",
																id : "submittedBySelect",
																inputValue : "Select",
																height : 30,
																listeners : {
																	check : function(o,b) {
																		if (b) {
																			Ext.getCmp('SubmitterName').setValue("");
																			Ext.getCmp('selectedUserName').enable();
																		} else {
																			Ext.getCmp('selectedUserName').disable();
																		}
																	}
																}
															},{
																xtype : "panel",
																layout : "column",
																border : false,
																labelAlign : "top",
																id : "selectedUserIdPanel",
																items : [{
																		xtype : "combo",
																		mode : "local",
																		fieldLabel : "",
																		allowBlank : true,
																		allowBlankBasic:true,
																		hiddenName : "SelectedUserId",
																		name : "selectedUserName",
																		id : "selectedUserName",
																		store : new Ext.data.JsonStore({
																					fields : ['sysKey','userID' ],
																					root : "rows",
																					idProperty : "sysKey",
																					data : {"rows" : submittedByUserList}
																				}),
																		emptyText : "- Select Submitter -",
																		valueField : "sysKey",
																		displayField : 'userID',
																		triggerAction : 'all',
																		editable : false,
																		disabled : true,
																		forceSelection : false,
																		selectOnFocus : true,
																		width : 200,
																		listeners : {
																			render : function() {
																				this.el.dom.name = this.name;
																			},
																			select : function() {
																				Ext.getCmp('selectedUserIdHidden').setValue(this.getValue());
																				Ext.getCmp('SubmitterName').setValue(this.getValue());
																				if (!Ext.isEmpty(this.getValue())) {
																					Ext.getCmp('selectedUserLbl').hide();
																				}
																			}
																		},
																		typeAhead : true,
																		typeAheadDelay : 0
																	},{
																		xtype : "label",
																		id : "selectedUserLbl",
																		text : "This field is required",
																		hidden : true,
																		style : "color:#c0272b;font:normal 11px tahoma, arial, helvetica, sans-serif;padding-top: 2px;padding-left:20px;"
																	},{
																		xtype : "hidden",
																		id : "selectedUserIdHidden",
																		value : "",
																		disabled : true
																	}]
															}]
													}]
											},{
												xtype : "hidden",
												name : "SubmitterName",
												id : "SubmitterName",
												value : "All"
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

	var formPanel = Ext.getCmp("casetrackingStatusBySubmitterReportPanelForm"+ config.nameSpace);
	var isFormPanelDirty = false;
	formPanel.getForm().items.each(function(f) {
		f.on("change", function() {
			isFormPanelDirty = true;
		});
	});

	// Form Submit
	function formSubmitHandler() {

		// Get Form
		var formObj = Ext.getCmp("casetrackingStatusBySubmitterReportPanelForm"+ config.nameSpace).getForm();

		var fromDate = Ext.getCmp('StartDate');
		var toDate = Ext.getCmp('EndDate');
		if (fromDate.getValue() != '' && toDate.getValue() != '' && fromDate.getValue() > toDate.getValue()) {
			fromDate.markInvalid("Must be less than or equal to 'To'");
			return;
		}

		var selectedUserIdHidden = Ext.getCmp('selectedUserIdHidden');
		var submittedBySelect = Ext.getCmp('submittedBySelect');
		if (submittedBySelect.getValue() && Ext.isEmpty(selectedUserIdHidden.getValue())) {
			Ext.getCmp('selectedUserLbl').show();
			return;
		} else {
			Ext.getCmp('selectedUserLbl').hide();
		}

		if (formObj.isValid()) {
			g_hideStatusBox();
			Ext.get(document.body.id).mask('<b> Generating Status By Submitter Report...</b>','x-mask-loading');
			formObj.submit({
						url : config.urlSubmitGenerateReport,
						clientValidation : true,
						isRedirect : false,
						success : function(form, action) {
							Ext.get(document.body.id).unmask();
							var randomNumber = Math.floor(Math.random()*11);							
							var win = window.open(config.urlViewReport,
											"SubmitterStatusReport"+randomNumber,"location=no,status=no,scrollbars=yes,resizable=yes,toolbar=no,menubar=no");
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