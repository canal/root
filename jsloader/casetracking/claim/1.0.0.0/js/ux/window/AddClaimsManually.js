Ext.namespace("casetracking.claim.windows.AddClaimsManually");
casetracking.claim.windows.AddClaimsManually = function(config) {	
	var windowClientMessengerDomId = Ext.id();
	var titleId = Ext.id();
	var claimAddedPanelId = Ext.id();
	var enterClaimLinkId = Ext.id();

	// ManualClaimSubmit
	function formManualClaimSubmitHandler() {
		var formPanel = Ext
				.getCmp("AddClaimManualProviderInfoPanel"
						+ config.nameSpace);
		var formObj = formPanel.getForm();
		var validForm = true;

		var dateFromField = formPanel.find("name",
				"dosFrom");
		var dateToField = formPanel.find("name", "dosTo");
		var dateFrom = dateFromField[0].getValue();
		var dateTo = dateToField[0].getValue();
		if (!Ext.isEmpty(dateFrom) && !Ext.isEmpty(dateTo)
				&& (Ext.isDate(dateFrom))
				&& (Ext.isDate(dateTo))
				&& (dateFrom > dateTo)) {
			dateFromField[0]
					.markInvalid("Must be less or equal than To date");
			validForm = false;
		}

		if (validForm && formObj.isValid()) {
			g_hideStatusBox();
			Ext.get(win.el.id).mask(
					'<b> Adding Claim...</b>',
					'x-mask-loading');
			formObj
					.submit({
						url : config.urlSubmitManualClaim,
						clientValidation : true,
						isRedirect : false,
						success : function(form, action) {
							Ext.get(win.el.id).unmask();
							var jsonResponse = uRadixUtilities
									.jsonDecode(action.response.responseText);
							var claim = config.parentWindow
									.mapManualFieldsToClaimFields(formObj);
							formObj.reset();
							formPanel.hide();
							var claimAddedPanel = Ext
									.getCmp(claimAddedPanelId);
							claimAddedPanel.show();
						},
						failure : function(form, action) {
							g_hideStatusBox();
							Ext.get(win.el.id).unmask();
							win.el.dom.scrollIntoView();
						}
					});
		} else {
			win.el.dom.scrollIntoView();
		}
	}
	;

	var winW = 550;
	if (document.body && document.body.offsetWidth) {
		winW = document.body.offsetWidth;
	}
	if (document.compatMode == 'CSS1Compat'
			&& document.documentElement
			&& document.documentElement.offsetWidth) {
		winW = document.documentElement.offsetWidth;
	}
	if (window.innerWidth) {
		winW = window.innerWidth;
	}
	winW = winW - 250;
//	if (winW < 850) {
//		winW = 850;
//	}

	var winH = 650;
	if (document.body && document.body.offsetHeight) {
		winH = document.body.offsetHeight;
	}
	if (document.compatMode == 'CSS1Compat'
			&& document.documentElement
			&& document.documentElement.offsetHeight) {
		winH = document.documentElement.offsetHeight;
	}
	if (window.innerHeight) {
		winH = window.innerHeight;
	}

	var win = new Ext.Window({
		id : config.claimSearchAddManulWindowId,
		width : winW,
		height : winH,
		modal : true,
		layout : "fit",
		resizable : true,
		autoScroll : true,
		plain : true,
		closable : false,
		items : [ {
			xtype : "panel",
			border : false,
			style : "padding:5px;",
			resizable : true,
			autoScroll : true,
			items : [
					{
						xtype : "panel",
						id : titleId,
						border : false,
						html : "Enter Claim",
						cls : "portal-title"
					},
					{
						xtype : "panel",
						border : false,
						bodyBroder : false,
						id : claimAddedPanelId,
						hidden : true,
						resizable : true,
						autoScroll : true,
						items : [
								{
									xtype : "idxmStatusBox",
									status : "success",
									statusText : 'Claim Added',
									style : "padding-top:5px;"
								},
								{
									xtype : "panel",
									style : "padding-top:5px; text-align:center;",
									border : false,
									bodyBroder : false,
									resizable : true,
									autoScroll : true,
									html : "<BR><BR><a id='"
											+ enterClaimLinkId
											+ "' class='portal-link-medium' href='#'>Enter Another Claim</a>",
									listeners : {
										afterrender : function() {
											var enterClaimLink = Ext
													.get(enterClaimLinkId);
											enterClaimLink
													.on(
															"click",
															function() {
																var claimAddedPanel = Ext
																		.getCmp(claimAddedPanelId);
																claimAddedPanel
																		.hide();
																var AddClaimManualProviderInfoPanel = Ext
																		.getCmp("AddClaimManualProviderInfoPanel"
																				+ config.nameSpace);
																var AddClaimManualProviderInfoForm = AddClaimManualProviderInfoPanel
																		.getForm();
																AddClaimManualProviderInfoForm
																		.reset();
																AddClaimManualProviderInfoPanel
																		.show();

																var providerPanel = Ext
																		.getCmp("casetracking.create.ux.panel.provider.ProviderInfo"
																				+ config.nameSpace);
																providerPanel.practitionerPanel
																		.hide();
																providerPanel.facilityPanel
																		.hide();
															});
										}
									}
								} ]
					},
					{
						xtype : "uRadix.form.FormPanel",
						border : false,
						layout : "form",
						id : "AddClaimManualProviderInfoPanel"
								+ config.nameSpace,
						listeners : {
							afterrender : function() {
								var providerPanel = Ext
										.getCmp("casetracking.create.ux.panel.provider.ProviderInfo"
												+ config.nameSpace);
								providerPanel.practitionerPanel
										.hide();
								providerPanel.facilityPanel
										.hide();
							}
						},
						items : [
								{
									id : windowClientMessengerDomId,
									border : false
								},
								{
									xtype : "panel",
									border : false,
									layout : "column",
									resizable : true,
									autoScroll : true,
									height : 435,
									items : [
											{
												border : false,
												columnWidth : .50,
												items : [ {
													xtype : "casetracking.claim.ux.panel.manual.AddClaimManually",
													id : "casetracking.claim.ux.panel.manual.AddClaimManually"
															+ config.nameSpace,
													autoScroll : true
												} ]
											},
											{
												border : false,
												columnWidth : .50,
												items : [ {
													xtype : "casetracking.create.ux.panel.provider.ProviderInfo",
													id : "casetracking.create.ux.panel.provider.ProviderInfo"
															+ config.nameSpace,
													prefix : "manual"
															+ config.nameSpace,
													hideTitlePanel : true
												} ]
											} ]
								},
								{
									xtype : "imagebutton",
									cls : "addClaimButton",
									style : "float:right;text-align:right;",
									handler : formManualClaimSubmitHandler
								} ]
					} ]
		} ],
		buttons : [ {
			text : "DONE",
			handler : function() {
				var formPanel = Ext
						.getCmp("AddClaimManualProviderInfoPanel"
								+ config.nameSpace);
				var formObj = formPanel
						.getForm();
				if (formObj.isDirty()) {
					idxm.core.popups
							.Cancel({
								noCancelFunction : function() {
								},
								doCancelFunction : function() {
									win
											.close();
								}
							});
				} else {
					win.close();
				}
			}
		} ]
	});
	
	return win;
			
};