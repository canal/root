Ext.namespace("casetracking.create.ux.form.CaseFormInternalClient");
casetracking.create.ux.form.CaseFormInternalClient = function(config) {

    var thisObj = this;
	var togglePanels = new IDXM.Utilities.TogglePanels();

	thisObj.basicInfoPanelContainerId = Ext.id();

	var claimListFieldId = Ext.id();
	thisObj.loadClaimsCallBack = function (_claimArray){
		if(_claimArray && _claimArray.length){
		    claimGridPanel.STORE.loadData({claimSearchResponse:{claimList:_claimArray,totalMatchingRecords:_claimArray.length}},true);
		    claimGridPanel.STORE.fireEvent('addedRecords');

		    thisObj.showClaimPanel();
		}
	};
	var selectClaimPanel = new casetracking.create.ux.panel.claim.SelectClaim({_config:config,parentWindow:thisObj,parentWindowCallBack:thisObj.loadClaimsCallBack});
	thisObj.selectClaimPanel = selectClaimPanel;

	var claimGridPanel =  new casetracking.claim.ux.panel.search.common.ClaimsGridPanel({height:150,width: 985,hidden:true,id: Ext.id(),isCreate:true});
	var claimGridPanelStore = claimGridPanel.getStore();
	claimGridPanelStore.on('addedRecords',function(){
	    thisObj.selectClaimPanel.findClaimsButton.hide();
	    thisObj.selectClaimPanel.findMoreClaimsButton.show();
	});
	thisObj.claimGridPanel = claimGridPanel;

	var deleteClaimsButtonId = Ext.id();
	var deleteClaimsButton = new casetracking.core.buttons.imagebutton({id:"deleteClaimsButton"+deleteClaimsButtonId,hidden:true,iconCls:"deleteClaimsButton",style:"float:right;text-align:right;"});
	deleteClaimsButton.on('click',function(){
		var sm = claimGridPanel.getSelectionModel();
		var records = sm.getSelections();
		for(var i=0;i<records.length;i++){
		    claimGridPanelStore.remove(records[i]);
		}
		if(!claimGridPanelStore.getCount()){
		    thisObj.selectClaimPanel.findClaimsButton.show();
		    thisObj.selectClaimPanel.findMoreClaimsButton.hide();
		    claimGridPanel.hide();
		    deleteClaimsButton.hide();
		    togglePanels.disableHidePanel(claimPanel);
		}
	});
	thisObj.deleteClaimButton = deleteClaimsButton;

	var claimPanel = new Ext.Panel({
		border:false
		,hidden: true
		,style:"padding-top:10px;"
		,items:[claimGridPanel,{xtype:"hidden",name:"claimList",id:claimListFieldId}]
		,buttons:[deleteClaimsButton]
	});
	thisObj.claimPanel = claimPanel;

	thisObj.showClaimPanel = function(){
		var store = claimGridPanel.getStore();
		togglePanels.enableShowPanel(claimPanel);
		if(store.getCount()){
		    claimGridPanel.show();
		    deleteClaimsButton.show();
		    thisObj.selectClaimPanel.findClaimsButton.hide();
		    thisObj.selectClaimPanel.findMoreClaimsButton.show();
		}else{
		    thisObj.selectClaimPanel.findClaimsButton.show();
		    thisObj.selectClaimPanel.findMoreClaimsButton.hide();
		}
	};

	thisObj.hideClaimPanel = function(){
		thisObj.selectClaimPanel.findClaimsButton.hide();
		thisObj.selectClaimPanel.findMoreClaimsButton.hide();
		claimGridPanel.hide();
		deleteClaimsButton.hide();
		togglePanels.disableHidePanel(claimPanel);
	};

	thisObj.prepareClaimsForSubmit = function(){
		var claimData = [];
		claimGridPanel.STORE.each(function(r){
			claimData.push(r.data);
		});
		var claimListField = Ext.getCmp(claimListFieldId);
		claimListField.setValue(Ext.util.JSON.encode(claimData));
	};


	var providerInfoPanel = new casetracking.create.ux.panel.provider.ProviderInfo({
		caseProviderTypeList : config.caseProviderTypeList
		,prefix:"clientInternal"
	});
	thisObj.providerInfoPanel = providerInfoPanel;

	var emptyTitlePanel = new Ext.Panel({
		border : false,
		cls : "casetracking-title",
		style:"padding-top:20px;",
		bodyCssClass:"casetracking-title-body",
		html : "&nbsp;"
	});
	thisObj.emptyTitlePanel = emptyTitlePanel;

	var eobInfoPanel = new casetracking.create.ux.panel.eob.EOBInfo({});
	thisObj.eobInfoPanel = eobInfoPanel;
	var contact = new casetracking.create.ux.panel.contact.Contact({parentObj:thisObj});
	
	var lastCCode = "";
	var lastCCodeType = "";
	var lastInquiryName = "";
	var lastCategoryName = "";
	var lastNetworkName = "";
	var lastPriorityName = "";
	var lastInquiryCaseDescription = "";
	
	var isValidSubmit = false;
	thisObj.validateCCode = function(){
		var clientCCodeFieldValue = contact.clientInfo.clientCCodeField.getValue();		
		var ccodeTypeRadioGroupFieldValue = contact.clientInfo.ccodeTypeRadioGroup.getValue().inputValue;					
		
		if((!Ext.isEmpty(ccodeTypeRadioGroupFieldValue)&&(contact.clientInfo.ccodeTypeRadioGroup.isValid()) 
				&& ((!Ext.isEmpty(ccodeTypeRadioGroupFieldValue) 
						&& (ccodeTypeRadioGroupFieldValue.trim() != lastCCodeType)))
						&& !Ext.isEmpty(clientCCodeFieldValue))
			|| (!Ext.isEmpty(clientCCodeFieldValue)&&(contact.clientInfo.clientCCodeField.isValid()) && ((!Ext.isEmpty(clientCCodeFieldValue) && (clientCCodeFieldValue.trim() != lastCCode))))) {
			formPanel.el.mask('<b> Validating CCode...</b>', 'x-mask-loading');
			var conn = new Ext.data.Connection();
			conn.request({
					    url: config.urlSubmitValidateCCode,
					    method: 'POST',
					    params: {
						ccode:clientCCodeFieldValue.trim()
						,ccodeType:ccodeTypeRadioGroupFieldValue
					    },
					    success: function(responseObject) {	
					    	
						formPanel.el.unmask();
						var response = uRadixUtilities.jsonDecode(responseObject.responseText);	
						
						if(response.status.statusCD == "C"){							
						
							var basicInfoPanelContainer = Ext.getCmp(thisObj.basicInfoPanelContainerId);

							function reloadBasicPanel(){

								var inquiryName = basicInfoPanelContainer.find("name","inquiryName");
								lastInquiryName = (inquiryName && inquiryName.length)?inquiryName[0].getValue():"";
								var categoryName = basicInfoPanelContainer.find("name","categoryName");
								lastCategoryName = (categoryName && categoryName.length)?categoryName[0].getValue():"";
								var inquiryCaseDescription = basicInfoPanelContainer.find("name","inquiryCaseDescription");
								lastInquiryCaseDescription = (inquiryCaseDescription && inquiryCaseDescription.length)?inquiryCaseDescription[0].getValue():"";						
								var networkName = basicInfoPanelContainer.find("name","networkName");
								lastNetworkName = (networkName && networkName.length)?networkName[0].getValue():"";	
								var tmpPriorityName = basicInfoPanelContainer.find("name","tmpPriorityName");
								lastPriorityName = (tmpPriorityName && tmpPriorityName.length)?tmpPriorityName[0].getValue():"";													

								basicInfoPanelContainer.removeAll();

								var basicInfoPanel = new casetracking.create.ux.panel.basic.BasicInfo({
										thisObjectName : "basicInfoPanel",
										thisObjectParentName : config.thisObjectName,
										userData : config.userData,
										caseNetworkList : uRadixUtilities.jsonDecode(response.caseNetworkList),
										casePriorityList : uRadixUtilities.jsonDecode(response.casePriorityList),
										caseNegotiationServicesPriorityList: uRadixUtilities.jsonDecode(response.caseNegotiationServicesPriorityList),
										caseTypeList : uRadixUtilities.jsonDecode(response.caseTypeList),
										negotiationServicesCode: config.negotiationServicesCode
										,selectClaimPanel: selectClaimPanel
										,providerInfoPanel: providerInfoPanel
										,emptyTitlePanel: emptyTitlePanel
									});
								basicInfoPanelContainer.add(basicInfoPanel);					
								basicInfoPanelContainer.doLayout();	
								var inquiryName = basicInfoPanelContainer.find("name","inquiryName");
								if(!Ext.isEmpty(lastInquiryName)){inquiryName[0].setValue(lastInquiryName); inquiryName[0].fireEvent("select");}
								var categoryName = basicInfoPanelContainer.find("name","categoryName");
								if(!Ext.isEmpty(lastCategoryName)){categoryName[0].setValue(lastCategoryName);categoryName[0].fireEvent("select");}
								var inquiryCaseDescription = basicInfoPanelContainer.find("name","inquiryCaseDescription");
								if(!Ext.isEmpty(lastInquiryCaseDescription)){inquiryCaseDescription[0].setValue(lastInquiryCaseDescription);}
								var networkName = basicInfoPanelContainer.find("name","networkName");
								if(!Ext.isEmpty(lastNetworkName)){networkName[0].setValue(lastNetworkName);}	
								var tmpPriorityName = basicInfoPanelContainer.find("name","tmpPriorityName");
								if(!Ext.isEmpty(lastPriorityName)){tmpPriorityName[0].setValue(lastPriorityName);	}
								config.parentObj.basicInfoPanel=basicInfoPanel;
								thisObj.basicInfoPanel = basicInfoPanel;
							};				

							if(!Ext.isEmpty(clientCCodeFieldValue) && (clientCCodeFieldValue.trim() != lastCCode)
									|| !Ext.isEmpty(ccodeTypeRadioGroupFieldValue) && (ccodeTypeRadioGroupFieldValue.trim() != lastCCodeType)){					
								reloadBasicPanel();
								lastCCode = clientCCodeFieldValue.trim();
								lastCCodeType = ccodeTypeRadioGroupFieldValue.trim();
							}
							
							isValidSubmit = true;
						}else{
 							contact.clientInfo.clientCCodeField.markInvalid("Not a valid Super CCode");	
 							isValidSubmit = false;
						}						
					    },
					     failure: function() {
					     	alert("CCode Validate Call Failed!!!");						
					     }
					});
		}
	};

	// Form Submit
	function formSubmitHandler() {
		// Get Form		
		var formObj = Ext.getCmp("casetrackingCaseCreatePanelFormInternalClient" + config.nameSpace).getForm();
		var validForm = true;
		var claimInformationFieldId = selectClaimPanel.selectedClaimInfoId;
		var claimInformationField = Ext.getCmp(claimInformationFieldId);
		var claimInformation = claimInformationField.getValue();
		var isClaimRequired = Ext.getCmp('isClaimRequired');
		if(formObj.isValid()){
			//Check if Add Claims, then are there any Claims
			if(claimInformation == "MULTIPLE_CLAIMS" || (isClaimRequired && isClaimRequired.getValue() == 'true')){
				if(claimGridPanel && claimGridPanel.getStore()){
					if(!claimGridPanel.getStore().getCount()) {
						if(isClaimRequired && isClaimRequired.getValue() == 'true') {
							new casetracking.create.windows.NoClaimsAdded({message: 'You must add a claim.'});
						} else {
							new casetracking.create.windows.NoClaimsAdded({message: 'You must add a claim or select "No" in the Claim Information section.'});
						}					
						validForm=false;	
					} else if(claimGridPanel.getStore().getCount() > 20) {
						new casetracking.create.windows.MaxClaimsAllowed({});
						validForm=false;	
					}
				}
			}
		}
		
		if(!validForm || !isValidSubmit) {
			return;
		}

		if(validForm && formObj.isValid()) {
			g_hideStatusBox();
            		thisObj.prepareClaimsForSubmit();
			Ext.get(document.body.id).mask('<b> Creating Service Case...</b>', 'x-mask-loading');
			var categoryPanel = thisObj.basicInfoPanel.inquiryTypesPanel;		
			var categoryPanelVisibility = categoryPanel.isVisible();	
			if(!categoryPanelVisibility){
				categoryPanel.setVisible(true);
			}	
			
			formObj.submit({
				url : config.urlSubmitCreateCase,
				params: {
					claimInformation: claimInformation
				},
				clientValidation : true,
				isRedirect : false,
				success : function(form, action) {
					Ext.get(document.body.id).unmask();
					config.parentObj.formPanel.removeAll();
					config.parentObj.formPanel.body.load({url:config.urlCreateCaseConfirm, scripts:true, loadMask:true});				
				},
				failure : function(form, action) {
					uRadixClientMessageHandler.setAdvice(false,[{"description":"Error(s) Encountered"}]);
					g_showStatusBox();					
					Ext.getCmp("updateButton" + config.nameSpace).enable();					
					Ext.get(document.body.id).unmask();
					config.parentObj.formPanel.el.dom.scrollIntoView();	
				}
			});	
			categoryPanel.setVisible(categoryPanelVisibility);
			categoryPanel.doLayout();
		}else{
			uRadixClientMessageHandler.setAdvice(false,[{"description":"Error(s) Encountered"}]);
			g_showStatusBox();
			formPanel.el.dom.scrollIntoView();
		}
	};

	//FormPanel
	var formPanel = new uRadix.form.FormPanel({
							autoScroll : true,
							id : "casetrackingCaseCreatePanelFormInternalClient"+ config.nameSpace,
							formObjectName : "Ext.getCmp('casetrackingCaseCreatePanelFormInternalClient"+ config.nameSpace + "')",
							border:false,
							bodyBorder:false,							
							items : [{
									xtype: "panel",
									border:false,
									layout:"form",
									items:[contact]
								},{												
									xtype : "panel",
									id:thisObj.basicInfoPanelContainerId,
									border : false,
									layout : "form",
									items : [{border:false}]
								},{
									xtype : "panel",
									border : false,
									layout : "form",
									buttonAlign:"right",
									items : [selectClaimPanel,claimPanel]
								},{
									xtype : "panel",
									border : false,
									layout : "column",
									items : [ {
										border : false,
										columnWidth : .60,
										bodyBorder : false,
										hideBorders : true,
										items : [ eobInfoPanel ]
									}, {
										border : false,
										columnWidth : .40,
										bodyBorder : false,
										hideBorders : true,
										items : [ providerInfoPanel,emptyTitlePanel ]
									}]
								},{
									xtype : "panel",
									border : false,
									layout : "column",
									items : [ {
										border : false,
										columnWidth : .50,
										bodyBorder : false,
										hideBorders : true,
										items : [ {
											id : "cancelButton" + config.nameSpace,
											xtype: "button",
											text: "CANCEL",
											style: "padding-top: 35px;float: left;",
											ctCls : "support-portal-btn-cancel"	
											,handler:function(){											
												if(isFormPanelDirty){
													idxm.core.popups.Cancel({doCancelFunction:jsonObject.doCancel,noCancelFunction:jsonObject.noCancel});
												}else{
														formPanel.getForm().reset();
														g_hideStatusBox();
														togglePanels.hidePanels();
														thisObj.hideClaimPanel();
														thisObj.resetClaimsGridPanel();	
														formPanel.el.dom.scrollIntoView();	
												}
											}											
										}]
									}, {
										border : false,
										columnWidth : .50,
										bodyBorder : false,
										hideBorders : true,
										items : [ {
											id : "updateButton" + config.nameSpace,
											xtype: "button",
											text: "OPEN SERVICE CASE",
											style: "padding-top: 35px;float: right;",
											ctCls : "support-portal-btn",
											handler : formSubmitHandler
										} ]
									}]
								}]
						});
	thisObj.formPanel = formPanel;	
			
	var togglePanelsMain = new IDXM.Utilities.TogglePanels();	
	togglePanelsMain.setPanels([
	                            selectClaimPanel,  
	                            providerInfoPanel, providerInfoPanel.practitionerPanel,providerInfoPanel.facilityPanel
                                ,eobInfoPanel.faxEobPanelSingle,eobInfoPanel.faxEobPanelMultiple
                                ,eobInfoPanel.inputEobPanel,eobInfoPanel.chooseEobPanelSingle
                                ,eobInfoPanel.chooseEobPanelMultiple
                            ]);
	togglePanelsMain.hidePanels();
	
	var isFormPanelDirty = false;
	formPanel.getForm().items.each(function(f){
									f.on("change",function(){
										isFormPanelDirty = true;
									});
								});
	
	this.resetClaimsGridPanel = function() {
		claimGridPanelStore.removeAll();
        selectClaimPanel.findClaimsButton.hide();
        selectClaimPanel.findMoreClaimsButton.hide();
        claimGridPanel.hide();
        deleteClaimsButton.hide();
        togglePanels.disableHidePanel(claimPanel);		
	};	
	
	var jsonObject = {
		doCancel:function(){
			formPanel.getForm().reset();
			g_hideStatusBox();
			togglePanelsMain.hidePanels();
			thisObj.hideClaimPanel();
			thisObj.resetClaimsGridPanel();			
			formPanel.el.dom.scrollIntoView();				
		},
		noCancel:function(){}	
	};	
	thisObj.jsonObject = jsonObject;
			
	return thisObj;
};
