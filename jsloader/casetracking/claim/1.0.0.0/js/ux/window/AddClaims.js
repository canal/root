Ext.namespace("casetracking.claim.windows.AddClaims");
casetracking.claim.windows.AddClaims = function(config) {
	var claimSearchWindowId = '';
	if(config.claimSearchWindowId && config.claimSearchWindowId != undefined) {
		claimSearchWindowId = config.claimSearchWindowId;
	} else {
		claimSearchWindowId = Ext.id() + config.nameSpace;
	}
	var thisObj = this;	

	// Claim Object
	this.claimObj = function claim() {
		var claim = {};

		claim.ccode = "";
		claim.ccodeSource = "";
		claim.entryMethod = "";
		claim.claimIdentifierList = [ {
			claimNumber : "",
			claimNumberSource : ""
		} ];
		claim.pricingList = [ {
			discountAmount : "",
			totalAmount : "",
			processingDate : ""
		} ];
		claim.fromDateOfService = "";
		claim.toDateOfService = "";
		claim.firstName = "";
		claim.middleName = "";
		claim.lastName = "";
		claim.memberSSNID = "";

		claim.providerTIN = "";
		claim.providerName = "";
		claim.providerType = "";
		claim.facTin = "";
		claim.facGroupName = "";
		claim.facContactName = "";
		claim.facContactPhone = "";
		claim.facContactPhoneExt = "";
		claim.facNpi = "";
		claim.pracTin = "";
		claim.pracFirstName = "";
		claim.pracLastName = "";
		claim.pracContactName = "";
		claim.pracContactPhone = "";
		claim.pracContactPhoneExt = "";
		claim.pracNpi = "";
		claim.npi = "";
		claim.patientDOB = null;
		claim.providerState = null;
		claim.clientIdentifierList = null;

		return claim;
	};

	// Claim Array
	this.claimArray = [];

	// Add Claim and Increment Count
	this.addClaim = function(_claim) {
		thisObj.claimArray[thisObj.claimArray.length] = _claim;
		thisObj.calculateClaimsAdded.call(thisObj, {
			operation : "add",
			quantity : 1
		});
	};

	// Return Claims Added Text
	this.claimsAdded = 0;
	this.claimsAddedText = function() {
		return "<b>" + this.claimsAdded + "</b> Claims Added";
	};

	// Claims Added Panel
	this.claimsAddedPanel = new Ext.Panel({
		border : false,
		baseCls : "claimsAddedCount",
		width : 175,
		html : this.claimsAddedText()
	});

	// Adds or Substract Claims
	this.calculateClaimsAdded = function(_params) {
		var operation = _params.operation;
		var quantity = _params.quantity;

		function incrementClaimsAdded(_incrementBy) {
			if (_incrementBy && (_incrementBy > 0)) {
				return this.claimsAdded += _incrementBy;
			} else {
				return this.claimsAdded++;
			}
		}
		;

		function decrementClaimsAdded(_decrementBy) {
			if (_decrementBy < 0) {
				return this.claimsAdded -= _decrementBy;
			} else {
				return this.claimsAdded--;
			}
		}
		;

		if (operation == "add") {
			incrementClaimsAdded.call(this, quantity);
		} else if (operation == "remove") {
			decrementClaimsAdded(this, quantity);
		}

		this.claimsAddedPanel.body.update(this.claimsAddedText());
		this.claimsAddedPanel.body.setOpacity(0);
		this.claimsAddedPanel.body.fadeIn();
	};
	/** ** End: Claims Counter ****** */

	// Map Manual Form Fields to Claim Fields
	this.mapManualFieldsToClaimFields = function(_formObj) {
		var claim = thisObj.claimObj();
		var formObj = _formObj;

		function setValue(_formField) {
			if (_formField && _formField.getValue()) {
				return _formField.getValue();
			}
			return;
		}
		;

		function setDate(_formField) {
			var _claimDateField = {};
			var formField = _formField;
			var formFieldValue;
			if (formField) {
				formFieldValue = formField.getValue();
				if (Ext.isDate(formFieldValue)) {
					formFieldValue = new Date(formFieldValue);
					_claimDateField['year'] = formFieldValue.getFullYear();
					_claimDateField['month'] = formFieldValue.getMonth();
					_claimDateField['dayOfMonth'] = formFieldValue.getDate();
					_claimDateField['hourOfDay'] = 0;
					_claimDateField['minute'] = 0;
					_claimDateField['second'] = 0;
				}
			}
			return _claimDateField;
		}
		;

		var fieldValues = formObj.getFieldValues();

		claim.entryMethod = "MANUAL";
		claim.claimIdentifierList[0].claimNumber = setValue(formObj.findField("claimNumber"));
		claim.claimIdentifierList[0].claimNumberSource = (fieldValues.claimSourceTypeRadioGroup ? fieldValues.claimSourceTypeRadioGroup.inputValue : '');
		claim.fromDateOfService = setDate(formObj.findField("dosFromManual"));
		claim.toDateOfService = setDate(formObj.findField("dosToManual"));
		
		claim.memberSSNID = setValue(formObj.findField("memberId"));
		claim.lastName = setValue(formObj.findField("patientLastName"));
		claim.firstName = setValue(formObj.findField("patientFirstName"));
				
		var validChars = /[^1234567890.]/g;
		
		var totalCharge = setValue(formObj.findField("totalCharge"));	
		claim.pricingList[0].totalAmount = removeInvalidChars(validChars, totalCharge);		
		
		claim.pricingList[0].processingDate = null;

		
		var discountAmount = setValue(formObj.findField("discountAmount"));
		claim.pricingList[0].discountAmount = removeInvalidChars(validChars, discountAmount);				

		if(fieldValues.providerTypeRadioGroup.inputValue == 'FAC') {
			var facTin = setValue(formObj.findField("facTin"));
			if(facTin == undefined) {
				facTin = '99-9999999';
			} else if(facTin && facTin.length == 0) {	
				facTin = facTin.trim();
			} 
			claim.facTin = facTin;
		} else if(fieldValues.providerTypeRadioGroup.inputValue == 'PRAC') {
			var pracTin = setValue(formObj.findField("pracTin"));
			if(pracTin == undefined) {
				pracTin = '99-9999999';
			} else if(pracTin && pracTin.length == 0) {	
				pracTin = pracTin.trim();
			} 
			claim.pracTin = pracTin;
		}		
		 		
		claim.facGroupName = setValue(formObj.findField("facGroupName"));
		claim.facContactName = setValue(formObj.findField("facContactName"));
		claim.facContactPhone = setValue(formObj.findField("facContactPhone"));
		claim.facContactPhoneExt = setValue(formObj.findField("facContactPhoneExt"));
		claim.facNpi = setValue(formObj.findField("facNpi"));
		claim.pracFirstName = setValue(formObj.findField("pracFirstName"));
		claim.pracLastName = setValue(formObj.findField("pracLastName"));
		claim.pracContactName = setValue(formObj.findField("pracContactName"));
		claim.pracContactPhone = setValue(formObj.findField("pracContactPhone"));
		claim.pracContactPhoneExt = setValue(formObj.findField("pracContactPhoneExt"));
		claim.pracNpi = setValue(formObj.findField("pracNpi"));

		var providerType = fieldValues.providerTypeRadioGroup.inputValue;
		if (providerType == "PRAC") {
			claim.providerType = 'P'
			claim.providerName = claim.pracLastName + ", "
					+ claim.pracFirstName;
			claim.providerTIN = claim.pracTin;
			claim.npi = claim.pracNpi;
		} else if (providerType == "FAC") {
			claim.providerType = 'G';
			claim.providerName = claim.facGroupName;
			claim.providerTIN = claim.facTin;
			claim.npi = claim.facNpi;
		}
		
		claim.validClaimData = true;
		thisObj.addClaim(claim);
	};
	
	function removeInvalidChars(validChars, from) {
		var tempData = from;
		if(from && from.length > 0) {
			var matches = from.match(validChars);
			if(tempData && tempData.length > 0 && matches && matches.length > 0) {
				for(var i = 0; i < matches.length; i++) {
					tempData = replaceAll(tempData, matches[i], "");	
				}			
			}	
		}
		return tempData;
	};
	
	function replaceAll(originalString, stringToReplace, replaceWithString) {
		var tmpString = originalString;
		while(tmpString.indexOf(stringToReplace) != -1) {
				tmpString = tmpString.replace(stringToReplace,replaceWithString);
		}			
		
		if(!tmpString) {
			tmpString = "";
		}
		
		return tmpString;
	};

	// Claim Search Submit
	function claimFormSubmitHandler() {
		var formPanel = Ext
				.getCmp("casetracking.claim.ux.panel.lookup.ClaimLookupForm"
						+ config.nameSpace);
		var formObj = formPanel.getForm();
		var validForm = true;	
		if(formObj) {
			var claimNumber = formObj.findField('claimNumber');
			if(claimNumber) {
				var claimNumberValue = claimNumber.getValue(); 
				if(claimNumberValue && claimNumberValue.indexOf("*") != -1 
						&& replaceAll(claimNumberValue, "*", "").trim().length < 2) {
					validForm = false;
					claimNumber.markInvalid("Minimum length is 2 (not including *)");	
				}
			}
		}

		if (validForm && formObj.isValid() && (formObj.isDirty())) {
			g_hideStatusBox();
			Ext.get(claimSearchWindowId)
					.mask('<b> Searching...</b>', 'x-mask-loading');
			formObj.submit({
				url : config.urlSubmitClaimSearch,
				params : {
					start : 0,
					limit : 10
				},
				clientValidation : true,
				isRedirect : false,
				success : function(form, action) {
					Ext.get(claimSearchWindowId).unmask();
					Ext.getCmp('claimSearchType').setValue('CLM');
					handleSearchResults(action)
				},
				failure : function(form, action) {
					thisObj.hideAllResultsPanel();
					thisObj.claimSearchErrorPanel.show();
					g_hideStatusBox();
					Ext.get(claimSearchWindowId).unmask();
				}
			});
		} else {
			g_hideStatusBox();
		}
	}
	;

	// Provider Search Submit
	function providerFormSubmitHandler() {
		var formPanel = Ext
				.getCmp("casetracking.claim.ux.panel.lookup.PatientLookupForm"
						+ config.nameSpace);
		var formObj = formPanel.getForm();
		var validForm = true;

		var dateOfServiceFromField = formPanel
				.find("name", "dateOfServiceFrom");
		var dateOfServiceToField = formPanel.find("name", "dateOfServiceTo");
		var dateOfServiceFrom = dateOfServiceFromField[0].getValue();
		var dateOfServiceTo = dateOfServiceToField[0].getValue();
		if (!Ext.isEmpty(dateOfServiceFrom) && !Ext.isEmpty(dateOfServiceTo)
				&& (Ext.isDate(dateOfServiceFrom))
				&& (Ext.isDate(dateOfServiceTo))
				&& (dateOfServiceFrom > dateOfServiceTo)) {
			dateOfServiceFromField[0]
					.markInvalid("Must be less or equal than To date");
			validForm = false;
		}
		var patientLastName = formObj.findField('patientLastName');
		if(patientLastName) {
			var patientLastNameValue = patientLastName.getValue(); 
			if(patientLastNameValue && patientLastNameValue.indexOf("*") != -1 
					&& replaceAll(patientLastNameValue, "*", "").trim().length < 2) {
				validForm = false;
				patientLastName.markInvalid("Minimum length is 2 (not including *)");	
			}
		}
		var patientFirstName = formObj.findField('patientFirstName');
		if(patientFirstName) {
			var patientFirstNameValue = patientFirstName.getValue(); 
			if(patientFirstNameValue && patientFirstNameValue.indexOf("*") != -1 
					&& replaceAll(patientFirstNameValue, "*", "").trim().length < 2) {
				validForm = false;
				patientFirstName.markInvalid("Minimum length is 2 (not including *)");	
			}
		}		
		var providerName = formObj.findField('providerName');
		if(providerName) {
			var providerNameValue = providerName.getValue(); 
			if(providerNameValue && providerNameValue.indexOf("*") != -1 
					&& replaceAll(providerNameValue, "*", "").trim().length < 2) {
				validForm = false;
				providerName.markInvalid("Minimum length is 2 (not including *)");	
			}
		}		
		
		var providerTin = Ext.getCmp("providerTin");
		var tin = '';
		if (providerTin != null) {
			tin = providerTin.getValue();
			if (tin.length > 0) {
				tin = replaceAll(tin, "-", "");
			}
		}		
		if (validForm && formObj.isValid() && (formObj.isDirty())) {
			g_hideStatusBox();
			Ext.get(claimSearchWindowId)
					.mask('<b> Searching...</b>', 'x-mask-loading');
			formObj.submit({
				url : config.urlSubmitClaimSearch,
				params : {
					start : 0,
					limit : 10,
					providerTIN : tin
				},
				clientValidation : true,
				isRedirect : false,
				success : function(form, action) {
					Ext.get(claimSearchWindowId).unmask();
					Ext.getCmp('claimSearchType').setValue('PROV');
					handleSearchResults(action)
				},
				failure : function(form, action) {
					thisObj.hideAllResultsPanel();
					thisObj.claimSearchErrorPanel.show();
					g_hideStatusBox();
					Ext.get(claimSearchWindowId).unmask();
					
					resetMultiGridStore();
				}
			});
		} else {
			g_hideStatusBox();
		}
	};
	
	function resetMultiGridStore() {
		var FIELD_CLAIMNUMBER = Ext.getCmp("claimNumber");
		var FIELD_PATIENT_FIRSTNAME = Ext.getCmp("patientFirstName");
		var FIELD_PATIENT_LASTNAME = Ext.getCmp("patientLastName");
		var FIELD_DATE_SERVICEFROM = Ext.getCmp("dateOfServiceFrom");
		var FIELD_DATE_SERVICETO = Ext.getCmp("dateOfServiceTo");
		var FIELD_PROVIDERNAME = Ext.getCmp("providerName");
		var FIELD_PROVIDERTIN = Ext.getCmp("providerTin");
		
		var _claimNumber = (FIELD_CLAIMNUMBER && FIELD_CLAIMNUMBER
				.getValue()) ? FIELD_CLAIMNUMBER.getValue().trim() : "";
		var _patientFirstName = (FIELD_PATIENT_FIRSTNAME && FIELD_PATIENT_FIRSTNAME
				.getValue()) ? FIELD_PATIENT_FIRSTNAME.getValue().trim()
				: "";
		var _patientLastName = (FIELD_PATIENT_LASTNAME && FIELD_PATIENT_LASTNAME
				.getValue()) ? FIELD_PATIENT_LASTNAME.getValue().trim()
				: "";
		var _dateOfServiceFrom = (FIELD_DATE_SERVICEFROM && FIELD_DATE_SERVICEFROM
				.getRawValue()) ? FIELD_DATE_SERVICEFROM.getRawValue()
				.trim() : "";
		var _dateOfServiceTo = (FIELD_DATE_SERVICETO && FIELD_DATE_SERVICETO
				.getRawValue()) ? FIELD_DATE_SERVICETO.getRawValue().trim()
				: "";
		var _providerName = (FIELD_PROVIDERNAME && FIELD_PROVIDERNAME
				.getValue()) ? FIELD_PROVIDERNAME.getValue().trim() : "";
		var _providerTIN = (FIELD_PROVIDERTIN && FIELD_PROVIDERTIN
				.getValue()) ? FIELD_PROVIDERTIN.getValue().trim() : "";						
		if (_providerTIN != null && _providerTIN.length > 0) {
			_providerTIN = replaceAll(_providerTIN, "-", "");
		}	

		var _gridPanel = thisObj.multipleClaimGridPanel;
		_gridPanel.STORE.setBaseParam("claimNumber", isClaimIdSearch() ? _claimNumber : "");
		_gridPanel.STORE
				.setBaseParam("patientFirstName", isClaimIdSearch() ? "" : _patientFirstName);
		_gridPanel.STORE.setBaseParam("patientLastName", isClaimIdSearch() ? "" : _patientLastName);
		_gridPanel.STORE.setBaseParam("dateOfServiceFrom",
				isClaimIdSearch() ? "" : _dateOfServiceFrom);
		_gridPanel.STORE.setBaseParam("dateOfServiceTo", isClaimIdSearch() ? "" : _dateOfServiceTo);
		_gridPanel.STORE.setBaseParam("providerName", isClaimIdSearch() ? "" :  _providerName);
		_gridPanel.STORE.setBaseParam("providerTIN", isClaimIdSearch() ? "" : _providerTIN);
		_gridPanel.STORE.setBaseParam("start", 0);
		_gridPanel.STORE.setBaseParam("limit", 10);
		
		return _gridPanel;
	};

	function handleSearchResults(action) {
		var jsonResponse = uRadixUtilities
				.jsonDecode(action.response.responseText);
		var claimSearchResponse = jsonResponse.claimSearchResponse;
		if (claimSearchResponse.totalMatchingRecords == 0) {
			thisObj.hideAllResultsPanel();
			thisObj.noSearchResults.show();
			resetMultiGridStore();
		} else if (claimSearchResponse.totalMatchingRecords == 1) {
			thisObj.hideAllResultsPanel();
			thisObj.oneSearchResultPanel.show();
			thisObj.oneSearchResultPanel
					.populateOneClaim(claimSearchResponse.claimList[0]);
		} else if (claimSearchResponse.totalMatchingRecords > 1) {
			thisObj.hideAllResultsPanel();
			thisObj.multiplanClaimPanel.show();

			var _gridPanel = resetMultiGridStore();
			_gridPanel.STORE.loadData({
				claimSearchResponse : claimSearchResponse
			});
			_gridPanel.getView().updateHeaders();
		} else {
			thisObj.hideAllResultsPanel();
			thisObj.claimSearchErrorPanel.show();
		}
	}
	;
	
    function isClaimIdSearch() {
    	var SEARCH_TYPE = Ext.getCmp('claimSearchType').setValue();
    	if(SEARCH_TYPE != null && SEARCH_TYPE != undefined && SEARCH_TYPE.getValue().trim() == 'CLM') {
    		return true;
    	} else {
    		return false;	
    	}    	
    };

	// Ids of Manual Links
	var enterClaimManuallyLinkId = Ext.id();
	var enterClaimManuallyLinkId2 = Ext.id();
	var claimSearchErrorPanelId = Ext.id();
	this.showAddClaimManualPanel = function() {
		var AddClaimsManuallyWindow = new casetracking.claim.windows.AddClaimsManually(
				{
					namespace : config.nameSpace,
					urlSubmitManualClaim : config.urlSubmitManualClaim,
					parentWindow : thisObj,
					claimSearchAddManulWindowId: claimSearchAddManulWindowId
				});
		AddClaimsManuallyWindow.show();	
	}; 	

	var winW = 550;
	if (document.body && document.body.offsetWidth) {
		winW = document.body.offsetWidth;
	}
	if (document.compatMode == 'CSS1Compat' && document.documentElement
			&& document.documentElement.offsetWidth) {
		winW = document.documentElement.offsetWidth;
	}
	if (window.innerWidth) {
		winW = window.innerWidth;
	}
	winW = winW - 200;
	
	var winH = 650;
	if (document.body && document.body.offsetHeight) {
		winH = document.body.offsetHeight;
	}
	if (document.compatMode == 'CSS1Compat' && document.documentElement
			&& document.documentElement.offsetHeight) {
		winH = document.documentElement.offsetHeight;
	}
	if (window.innerHeight) {
		winH = window.innerHeight;
	}
	// Window Object
	var win = new Ext.Window(
			{
				id : config.claimSearchWindowId,
				width : winW,
				height : winH,
				modal : true,
				resizable : true,
				layout : "fit",
				closable : false,
				plain : true,
				listeners : {

				},
				items : [ {
					xtype : "panel",
					border : false,
					autoScroll: true,
					style : "padding:2px;",
					items : [
							{
								xtype : "panel",
								border : false,
								html : "Find Claims",
								cls : "portal-title"
							},
							{
								xtype : "panel",
								border : false,								
								id : "casetracking.claim.ux.panel.lookups"
										+ config.nameSpace,
								items : [
										{
											xtype : "panel",
											border : false,
											layout : "column",
											items : [
													{
														border : false,
														columnWidth : .60,
														bodyBorder : false,
														hideBorders : true,
														style : "padding-top:5px;",
														html : 'Search by either a claim number or claim information. Click "Done" when you are finished adding up to 20 claims.'
													},
													{
														border : false,
														columnWidth : .385,
														bodyBorder : false,
														hideBorders : true,
														items : [ this.claimsAddedPanel ]
													},
													{
														border : false,
														columnWidth: .015
													}]
										},
										{
											xtype : "panel",
											border : false,
											layout : "column",
											items : [
													{
														border : false,
														columnWidth : .25,
														height : 227,
														autoScroll : false,
														items : [ {
															xtype : "uRadix.form.FormPanel",
															border : false,
															id : "casetracking.claim.ux.panel.lookup.ClaimLookupForm"
																	+ config.nameSpace,
															items : [ {
																xtype : "casetracking.claim.ux.panel.lookup.ClaimLookup",
																id : "casetracking.claim.ux.panel.lookup.ClaimLookup"
																		+ config.nameSpace,
																formSubmitHandler : claimFormSubmitHandler,
																showAddClaimManualPanel : thisObj.showAddClaimManualPanel
																,replaceAll: thisObj.replaceAll
															} ]
														} ]
													},
													{
														border : false,
														columnWidth : .25,
														height : 227,
														baseCls : "claimSearchSeparator",
														html : "<div style='text-align:center;' class='portal-text-large-xx-bold'>OR</div>"
													},
													{
														border : false,
														columnWidth : .50,
														height : 227,
														autoScroll : false,
														items : [ {
															xtype : "uRadix.form.FormPanel",
															border : false,
															id : "casetracking.claim.ux.panel.lookup.PatientLookupForm"
																	+ config.nameSpace,
															items : [ {
																xtype : "casetracking.claim.ux.panel.lookup.PatientLookup",
																id : "casetracking.claim.ux.panel.lookup.PatientLookup"
																		+ config.nameSpace,
																formSubmitHandler : providerFormSubmitHandler
															} ]
														} ]
													}
													,{
														xtype: "hidden"
														,id: "claimSearchType"
														,name: "claimSearchType"
														,value: ""
													}
													,{
														xtype: "hidden"
														,id: "invalidForm"
														,name: "invalidForm"
														,value: ""
													}													
													]
										} ]
							},
							{
								baseCls : "claimResultsSeparator"
							},
							{
								xtype : "panel",
								border : false,
								style : "padding-top:2px",
								items : [
										{
											xtype : "casetracking.claim.ux.panel.search.results.OneClaimResults",
											id : "casetracking.claim.ux.panel.search.results.OneClaimResults"
													+ config.nameSpace,
											windowObj : thisObj,
											enterClaimManuallyCallBack : thisObj.showAddClaimManualPanel,
											calculateClaimAddedCallBack : this.calculateClaimsAdded
										},
										{
											xtype : "casetracking.claim.ux.panel.search.results.NoResults",
											id : "casetracking.claim.ux.panel.search.results.NoResults"
													+ config.nameSpace,
											enterClaimManuallyLinkId : enterClaimManuallyLinkId
										},
										{
											xtype : "casetracking.claim.ux.panel.search.results.ClaimsAdded",
											id : "casetracking.claim.ux.panel.search.results.ClaimsAdded"
													+ config.nameSpace,
											windowObj : thisObj
										},
										{
											xtype : "casetracking.claim.ux.panel.search.results.MultipleClaimResults",
											id : "casetracking.claim.ux.panel.search.results.MultipleClaimResults"
													+ config.nameSpace,
											windowObj : thisObj,
											calculateClaimAddedCallBack : this.calculateClaimsAdded,
											searchSubmitURL : config.urlSubmitClaimSearch,
											enterClaimManuallyLinkId : enterClaimManuallyLinkId2
											,winW: winW
											,claimSearchResultsGridId: config.claimSearchResultsGridId
										},
										{
											xtype : "panel",
											border : false,
											id : claimSearchErrorPanelId,
											items : [
													{
														xtype : "idxmStatusBox",
														status : "error",
														statusText : 'Error(s) Encountered',
														style : "padding-top:5px;"
													},
													{
														xtype : "panel",
														style : "padding-top:5px;",
														border : false,
														bodyBroder : false,
														html : "<BR><div class='portal-text-small'><b>Sorry!!!</b> An internal error ocurred when searching for a claim.</div>"
													} ]
										} ]
							} ]
				} ],
				buttons : [ {
					width : 114,
					height : 28,
					text : 'DONE',
					handler : function() {
						config.parentWindowCallBack.call(config.parentWindow,
								thisObj.claimArray);
						win.close();
					}
				} ]
			});

	win.show();

	this.formPanel = Ext.getCmp("casetracking.claim.ux.panel.lookups"
			+ config.nameSpace);
	this.oneSearchResultPanel = Ext
			.getCmp("casetracking.claim.ux.panel.search.results.OneClaimResults"
					+ config.nameSpace);
	this.noSearchResults = Ext
			.getCmp("casetracking.claim.ux.panel.search.results.NoResults"
					+ config.nameSpace);
	this.claimAdded = Ext
			.getCmp("casetracking.claim.ux.panel.search.results.ClaimsAdded"
					+ config.nameSpace);
	this.multiplanClaimPanel = Ext
			.getCmp("casetracking.claim.ux.panel.search.results.MultipleClaimResults"
					+ config.nameSpace);
	this.multipleClaimGridPanel = this.multiplanClaimPanel.GRIDPANEL;
	this.claimSearchErrorPanel = Ext.getCmp(claimSearchErrorPanelId);
	Ext.get(enterClaimManuallyLinkId).on('click', function(e) {
		thisObj.showAddClaimManualPanel();
	}, this);
	Ext.get(enterClaimManuallyLinkId2).on('click', function(e) {
		thisObj.showAddClaimManualPanel();
	}, this);

	this.hideAllResultsPanel = function() {
		thisObj.oneSearchResultPanel.hide();
		thisObj.noSearchResults.hide();
		thisObj.claimAdded.hide();
		thisObj.multiplanClaimPanel.hide();
		thisObj.claimSearchErrorPanel.hide();
	};
	this.hideAllResultsPanel();

	return this;
};