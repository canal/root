Ext.namespace("casetracking.createpublic.ux.form.CaseForm");
casetracking.createpublic.ux.form.CaseForm = function(config) {

	var CaseFormHelpWindow;
	ShowCaseFormHelpWindow = function(infoType){
	    var title = "";
	    var content = "";
	    var winHeight=300;
	    
		if(config.infoContent) {
			for(var i = 0; i < config.infoContent.length; i++) {
				var obj = config.infoContent[i];
				if(obj != null && obj != undefined && obj.infoType == infoType) {
					title = obj.title;
					content = obj.content;
					winHeight = obj.winHeight;
					break;
				}
			}
		}	   

	    CaseFormHelpWindow = new Ext.Window({
		layout: 'fit',
		width: 680,
		height: winHeight,
		modal: true,
		frame:true,
		shadow:false,
		border:true,
		tbar:false,
		closable:false,
		items: [
		    {
			xtype : "panel",
			border : false,
			style : "padding:10px 10px 10px 10px;",
			items:[{
				xtype : "panel",
				border : false,
				cls : "portal-title",
				html : title
			    },{
				xtype : "panel",
				border : false,
				style : "padding-top: 2px;padding-bottom: 2px;",
				html : content
			    },{
				xtype : "button",
				text : "DONE",
				border : false,
				style : "marginTop: 20px; float: right;",
				ctCls : "support-portal-btn",
				handler : function(){CaseFormHelpWindow.close()}
			    }
			]
		    }

		]
	    });
	    CaseFormHelpWindow.show();
	};

	var thirdPartyInfoPanel = 
		new casetracking.createpublic.ux.panel.thirdparty.ThirdParty({
				urlTpiForm : config.urlTpiForm
			});
	this.thirdPartyInfoPanel = thirdPartyInfoPanel;

	var doctorFacilityInfoPanel = 
		new casetracking.createpublic.ux.panel.provider.DoctorFacility({
				thisObjectName: config.thisObjectName + "." + "doctorFacilityInfoPanel",
				caseNetworkList : config.caseNetworkList,
				caseTypeList : config.caseTypeList,
				otherSubTypeId : otherSubTypeId,
				caseSubTypesList: config.caseSubTypesList
			});
	this.doctorFacilityInfoPanel = doctorFacilityInfoPanel;

	// Form Submit
	function formSubmitHandler() {

		var fromDate = Ext.getCmp('dosFrom');
		var toDate = Ext.getCmp('dosTo');
		if (fromDate != null && toDate != null
				&& fromDate.getValue() > toDate.getValue()) {
			fromDate.markInvalid("Must be less than or <br>equal to 'DOS To'");
			return;
		}

		// Get Form
		var formObj = Ext.getCmp("casetrackingCaseCreatePublicPanelForm" + config.nameSpace).getForm();

		if (formObj.isValid()) {
			g_hideStatusBox();
			Ext.get(document.body.id).mask('<b> Creating Case...</b>','x-mask-loading');
			formObj.submit({
						url : config.urlSubmitCreateCase,
						clientValidation : true,
						isRedirect : false,
						success : function(form, action) {
							Ext.get(document.body.id).unmask();
							formPanel.removeAll();
							formPanel.body.load({
								url : config.urlCreateCaseConfirm,
								scripts : true,
								loadMask : true
							});
						},
						failure : function(form, action) {
							g_showStatusBox();
							Ext.getCmp("updateButton" + config.nameSpace).enable();
							Ext.get(document.body.id).unmask();
							formPanel.el.dom.scrollIntoView();
						}
					});
		} else {
			uRadixClientMessageHandler.setAdvice(false, [{"description" : "Error(s) Encountered"}]);
			g_showStatusBox();
			formPanel.el.dom.scrollIntoView();
		}
	};

	var help = "<div class='portal-login-outter' >";
	if(config.infoContent) {
		for(var i = 0; i < config.infoContent.length; i++) {
			var obj = config.infoContent[i];
			if(obj != null && obj != undefined) {
				help = help + obj.id;
			}
		}
	}
	// //Panel
	var formPanel = new Ext.Panel(
			{
				renderTo : config.formPanelDivID,
				layout : "form",
				border : false,
				bodyBorder : false,
				hideBorders : true,
				width : 900,
				items : [{
					xtype : "uRadix.form.FormPanel",
					autoScroll : true,
					id : "casetrackingCaseCreatePublicPanelForm"+ config.nameSpace,
					formObjectName : "Ext.getCmp('casetrackingCaseCreatePublicPanelForm"+ config.nameSpace + "')",
					items : [
							{
								xtype : "panel",
								border : false,
								cls : "portal-title",
								html : "Open a Customer Service Case",
								layout : "column"
							},{
								xtype : "panel",
								border : false,
								hidden: config.isAuthenticated,
								layout : "column",
								style : "padding-top: 8px;padding-bottom: 8px;",
								html : "<span class='idxmTextSmall'>Do you have questions? <a href='"+config.customerserviceFaqUrl+"' class='portal-link-small' onclick='Ext.getBody().mask(\"Opening FAQ...\", \"x-mask-loading\");'>See our FAQ</a> or download our <a href='"+config.customerserviceUserGuideUrl+"' target='_blank' class='portal-link-small'>User Guide</a> (pdf).</span>"
							},{
								xtype : "panel",
								border : false,
								layout : "column",
								style : "padding-top: 8px;",
								html : "<span class='idxmTextMedium'><b>Are you looking to:</b></span>"
							},{
								xtype : "panel",
								border : false,
								layout : "column",
								style : "padding-top: 2px;padding-bottom: 2px;",
								html : help
							},{
								xtype : "panel",
								border : false,
								layout : "column",
								style : "padding-top: 8px;",
								html : "<span class='idxmTextSmall'><b>For all other inquiries proceed below to open a customer service case.</b></span>"
							},{
								xtype : "panel",
								layout : "form",
								border : false,
								hidden: config.isAuthenticated,
								labelAlign : "top",
								style : "padding-top:10px;",
								items : [{
										xtype : "radiogroup",
										id : "customerTypeRadioGroup",
										name : "customerTypeRadioGroup",
										style : "padding-left:20px;padding-bottom:10px",
										fieldLabel : "<span class='idxmTextSmall'>What type of entity are you?</span>",
										labelSeparator : "",
										vertical : true,
										columns : 1,
										value : "",
										items : [{
												hideLabel : true,
												autoWidth: true,
												autoHeight: true,
												boxLabel : "<span class='idxmTextMedium'>Rendering Health Facility, Practitioner or Group Practice </span> <span class='idxmTextSmall'>(Licensed health care providers that render services to patients or an authorized &nbsp;&nbsp;&nbsp;&nbsp;   representative thereof)</span>",
												name : "customerTypeInformation",
												inputValue : "DOCTOR",
												listeners : {
													check : function(o, b) {
														if (b) {
															var togglePanels = IDXM.Utilities.TogglePanels();
															togglePanels.setPanels([thirdPartyInfoPanel,doctorFacilityInfoPanel ]);
															togglePanels.enableShowPanel(doctorFacilityInfoPanel);
															togglePanels.disableShowPanel(thirdPartyInfoPanel);
															togglePanels.disableShowPanel(doctorFacilityInfoPanel.providerInfo.practitionerPanel);
															togglePanels.disableShowPanel(doctorFacilityInfoPanel.providerInfo.facilityPanel);
															togglePanels.disableShowPanel(doctorFacilityInfoPanel.providerInfo.addressPanel);
															togglePanels.disableShowPanel(doctorFacilityInfoPanel.inquiryInfo.inquiryClaimEOBInfo);
															togglePanels.disableShowPanel(doctorFacilityInfoPanel.inquiryInfo.inquiryComments);
															var providerTypeRadioGroup = Ext.getCmp("providerTypeRadioGroup");
															var providerTypeRadioGroupArray = providerTypeRadioGroup.findByType("radio");
															for (i = 0; i < providerTypeRadioGroupArray.length; i++) {
																if (providerTypeRadioGroupArray[i].getValue() == true) {
																	providerTypeRadioGroupArray[i].fireEvent("check");
																	if (providerTypeRadioGroupArray[i].getItemId() == 'providerTypePrac') {
																		togglePanels.enableShowPanel(doctorFacilityInfoPanel.providerInfo.practitionerPanel);
																		togglePanels.enableShowPanel(doctorFacilityInfoPanel.providerInfo.addressPanel);
																	} else if (providerTypeRadioGroupArray[i].getItemId() == 'providerTypeFac') {
																		togglePanels.enableShowPanel(doctorFacilityInfoPanel.providerInfo.facilityPanel);
																		togglePanels.enableShowPanel(doctorFacilityInfoPanel.providerInfo.addressPanel);
																	}
																}
															}
															Ext.getCmp('buttonsPanel').show();
														}
													}
												}
											},{
												hideLabel : true,
												autoWidth: true,
												autoHeight: true,												
												boxLabel : "<span class='idxmTextMedium'>Third Party </span><span class='idxmTextSmall'>(Entity not affiliated with the above. (Examples: a law office or collection agency))</span>",
												name : "customerTypeInformation",
												inputValue : "THIRD_PARTY",
												listeners : {
													check : function(o, b) {
														if (b) {
															var togglePanels = IDXM.Utilities.TogglePanels();
															togglePanels.setPanels([thirdPartyInfoPanel,doctorFacilityInfoPanel ]);
															togglePanels.disableShowPanel(doctorFacilityInfoPanel);
															togglePanels.enableShowPanel(thirdPartyInfoPanel);
															Ext.getCmp('buttonsPanel').hide();
														}
													}
												}
											}
											]
											
									}]
							},{
								xtype : "panel",
								border : false,
								layout : "form",
								items : [thirdPartyInfoPanel,doctorFacilityInfoPanel]
							},{
								xtype : "panel",
								id : "buttonsPanel",
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
												style : "padding-top: 35px;float: left;",
												ctCls : "support-portal-btn-cancel",
												handler : function() {
													if (isFormPanelDirty) {
														idxm.core.popups.Cancel({doCancelFunction : jsonObject.doCancel,noCancelFunction : jsonObject.noCancel});
													} else {
														formPanel.getForm().reset();
														g_hideStatusBox();
														formPanel.el.dom.scrollIntoView();
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
												text : "OPEN CASE",
												style : "padding-top: 35px;float: right;",
												ctCls : "support-portal-btn",
												handler : formSubmitHandler
										}]
									}]
							}]
				}],
				listeners : {uradix_enterkey : formSubmitHandler}
			});
			
	var togglePanels = IDXM.Utilities.TogglePanels();
	togglePanels.setPanels([ thirdPartyInfoPanel, doctorFacilityInfoPanel,
			doctorFacilityInfoPanel.providerInfo.practitionerPanel,
			doctorFacilityInfoPanel.providerInfo.facilityPanel,
			doctorFacilityInfoPanel.providerInfo.addressPanel,
			doctorFacilityInfoPanel.inquiryInfo.inquiryInfoTop,
			doctorFacilityInfoPanel.inquiryInfo.inquiryClaimEOBInfo,
			doctorFacilityInfoPanel.inquiryInfo.inquiryComments ]);
	togglePanels.hidePanels();
	
	Ext.getCmp('buttonsPanel').hide();
	
	if(config.isAuthenticated) {
		togglePanels.enableShowPanel(doctorFacilityInfoPanel);
		togglePanels.disableShowPanel(thirdPartyInfoPanel);
		togglePanels.disableShowPanel(doctorFacilityInfoPanel.providerInfo.practitionerPanel);
		togglePanels.disableShowPanel(doctorFacilityInfoPanel.providerInfo.facilityPanel);
		togglePanels.disableShowPanel(doctorFacilityInfoPanel.providerInfo.addressPanel);
		togglePanels.disableShowPanel(doctorFacilityInfoPanel.inquiryInfo.inquiryInfoTop);
		togglePanels.disableShowPanel(doctorFacilityInfoPanel.inquiryInfo.inquiryClaimEOBInfo);
		togglePanels.disableShowPanel(doctorFacilityInfoPanel.inquiryInfo.inquiryComments);		
		Ext.getCmp('buttonsPanel').show();
	}
	
	var formPanel = Ext.getCmp("casetrackingCaseCreatePublicPanelForm"+ config.nameSpace);
	
	var isFormPanelDirty = false;
	
	formPanel.getForm().items.each(function(f) {
		f.on("change", function() {
			isFormPanelDirty = true;
		});
	});			

	var jsonObject = {
		doCancel : function() {
			formPanel.getForm().reset();
			g_hideStatusBox();
			formPanel.el.dom.scrollIntoView();
			resetPanel();
		},
		noCancel : function() {}
	};
	this.jsonObject = jsonObject;
	
	function resetPanel() {
		togglePanels.hidePanels();
		if(config.isAuthenticated) {
			togglePanels.enableShowPanel(doctorFacilityInfoPanel);
			togglePanels.enableShowPanel(doctorFacilityInfoPanel.inquiryInfo.inquiryCommentsOptional);			
			togglePanels.disableShowPanel(thirdPartyInfoPanel);
			togglePanels.disableShowPanel(doctorFacilityInfoPanel.providerInfo.practitionerPanel);
			togglePanels.disableShowPanel(doctorFacilityInfoPanel.providerInfo.facilityPanel);
			togglePanels.disableShowPanel(doctorFacilityInfoPanel.providerInfo.addressPanel);
			togglePanels.disableShowPanel(doctorFacilityInfoPanel.inquiryInfo.inquiryInfoTop);
			togglePanels.disableShowPanel(doctorFacilityInfoPanel.inquiryInfo.inquiryClaimEOBInfo);
			togglePanels.disableShowPanel(doctorFacilityInfoPanel.inquiryInfo.inquiryComments);
		}
	};
	
	return this;
};