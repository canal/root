Ext.namespace("casetracking.create.ux.form.CaseFormInternalProvider");
casetracking.create.ux.form.CaseFormInternalProvider = function(config) {
	var thisObj = this;

	var togglePanels = new IDXM.Utilities.TogglePanels();

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
		,hidden:true
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
		,prefix:"providerInternal"
		,parentObjectName: config.thisObjectName
	});
	thisObj.providerInfoPanel = providerInfoPanel;

	var emptyTitlePanel = new Ext.Panel({
		border : false,
		cls : "casetracking-title",
		style:"padding-top:20px;",
		html : "&nbsp;",
		hidden:true
	});
	thisObj.emptyTitlePanel = emptyTitlePanel;
	config['selectClaimPanel']=selectClaimPanel;
	config['providerInfoPanel']=providerInfoPanel;
	config['thisObjectParentName']=config.thisObjectParentNameProvider+".contact";
	var contact = new casetracking.create.ux.panel.contact.ProviderContact(config);
	this.contact = contact;

	// Form Submit
	function formSubmitHandler() {
		// Get Form		
		var formObj = Ext.getCmp("casetrackingCaseCreatePanelFormInternalProvider" + config.nameSpace).getForm();
		var validForm = true;
		
		if(formObj.isValid()){
			//Check if Add Claims, then are there any Claims
			
			function validateClaimRequired(){
				if(claimGridPanel && claimGridPanel.getStore()){
					if(!claimGridPanel.getStore().getCount()) {
						var isClaimRequired = Ext.getCmp('isProvClaimRequired').getValue();
						if(isClaimRequired == 'true') {
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
			
			var providerInquiryPanel = contact.providerInquiry;
			var appealReasonFieldArray = providerInquiryPanel.find("name","inquiryId");
			if(config.otherSubTypeId == appealReasonFieldArray[0].getValue()){
				validateClaimRequired();
			}
			var claimInformationFieldId = selectClaimPanel.selectedClaimInfoId;
			var claimInformationField = Ext.getCmp(claimInformationFieldId);
			var isClaimRequired = Ext.getCmp('isProvClaimRequired').getValue();
			if(claimInformationField.getValue() == "MULTIPLE_CLAIMS" || isClaimRequired == 'true'){
				validateClaimRequired();
			}
		}				
		
		if(!validForm) {
			return;
		}

		if(validForm && formObj.isValid()) {
			g_hideStatusBox();
            		thisObj.prepareClaimsForSubmit();
			Ext.get(document.body.id).mask('<b> Creating Service Case...</b>', 'x-mask-loading');
			formObj.submit({
				url : config.urlSubmitCreateCaseProvider,
				params: {
					isClaimRequired: Ext.getCmp('isProvClaimRequired').getValue()
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
		}else{
			uRadixClientMessageHandler.setAdvice(false,[{"description":"Error(s) Encountered"}]);
			g_showStatusBox();
			formPanel.el.dom.scrollIntoView();
		}
	};

	//FormPanel
	var formPanel = new uRadix.form.FormPanel({
							autoScroll : true,
							id : "casetrackingCaseCreatePanelFormInternalProvider"+ config.nameSpace,
							formObjectName : "Ext.getCmp('casetrackingCaseCreatePanelFormInternalProvider"+ config.nameSpace + "')",
							border:false,
							bodyBorder:false,							
							items : [{
									xtype: "panel",
									border:false,
									layout:"form",
									items:[contact]
								},{
									xtype : "panel",
									layout : "form",
									buttonAlign:"right",
									items : [selectClaimPanel,claimPanel]
								},{
									xtype : "panel",
									border : false,
									layout : "form",
									items : [ providerInfoPanel,emptyTitlePanel]
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
                                selectClaimPanel, providerInfoPanel, providerInfoPanel.practitionerPanel,providerInfoPanel.facilityPanel
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
