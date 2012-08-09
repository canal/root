Ext.namespace("casetracking.create.ux.form.CaseForm");
casetracking.create.ux.form.CaseForm = function(config) {
    var thisObj = this;

    var togglePanels = new IDXM.Utilities.TogglePanels();

    var claimListFieldId = Ext.id();
    this.loadClaimsCallBack = function (_claimArray){
        if(_claimArray && _claimArray.length){
            claimGridPanel.STORE.loadData({claimSearchResponse:{claimList:_claimArray,totalMatchingRecords:_claimArray.length}},true);
            claimGridPanel.STORE.fireEvent('addedRecords');
            thisObj.showClaimPanel();
        }
    };

    var selectClaimPanel = new casetracking.create.ux.panel.claim.SelectClaim({_config:config,parentWindow:thisObj,parentWindowCallBack:thisObj.loadClaimsCallBack});
    this.selectClaimPanel = selectClaimPanel;

    var claimGridPanel =  new casetracking.claim.ux.panel.search.common.ClaimsGridPanel({height:150, width: 985, hidden:true, id: Ext.id(),isCreate:true});
    var claimGridPanelStore = claimGridPanel.getStore();
    claimGridPanelStore.on('addedRecords',function(){
            thisObj.selectClaimPanel.findClaimsButton.hide();
            thisObj.selectClaimPanel.findMoreClaimsButton.show();
        });
    this.claimGridPanel = claimGridPanel;

    var deleteClaimsButton = new casetracking.core.buttons.imagebutton({id:"deleteClaimsButton",hidden:true,iconCls:"deleteClaimsButton",style:"float:right;text-align:right;"});
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
    this.deleteClaimButton = deleteClaimsButton;

    var claimPanel = new Ext.Panel({
        border:false
        ,hidden:true
        ,style:"padding-top:10px;"
        ,items:[claimGridPanel,{xtype:"hidden",name:"claimList",id:claimListFieldId}]
        ,buttons:[deleteClaimsButton]
    });
    this.claimPanel = claimPanel;

    this.showClaimPanel = function(){
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

    this.hideClaimPanel = function(){
        thisObj.selectClaimPanel.findClaimsButton.hide();
        thisObj.selectClaimPanel.findMoreClaimsButton.hide();
        claimGridPanel.hide();
        deleteClaimsButton.hide();
        togglePanels.disableHidePanel(claimPanel);
    };

    this.prepareClaimsForSubmit = function(){
        var claimData = [];
        claimGridPanel.STORE.each(function(r){
          claimData.push(r.data);
        });

        var claimListField = Ext.getCmp(claimListFieldId);
        claimListField.setValue(Ext.util.JSON.encode(claimData));
    };


	var providerInfoPanel = new casetracking.create.ux.panel.provider.ProviderInfo({
		caseProviderTypeList : config.caseProviderTypeList
		,prefix:"client"
	});
	this.providerInfoPanel = providerInfoPanel;

    var emptyTitlePanel = new Ext.Panel({
        border : false,
        cls : "casetracking-title",
        style:"padding-top:20px;",
        bodyCssClass:"casetracking-title-body",
        html : "&nbsp;"
    });
    this.emptyTitlePanel = emptyTitlePanel;
	
	var eobInfoPanel = new casetracking.create.ux.panel.eob.EOBInfo({});
	this.eobInfoPanel = eobInfoPanel;

	var basicInfoPanel = new casetracking.create.ux.panel.basic.BasicInfo({
		thisObjectName : "basicInfoPanel",
		thisObjectParentName : config.thisObjectName,
		userData : config.userData,
		caseNetworkList : config.caseNetworkList,
		casePriorityList : config.casePriorityList,
		caseNegotiationServicesPriorityList: config.caseNegotiationServicesPriorityList,
		caseTypeList : config.caseTypeList,
		negotiationServicesCode: config.negotiationServicesCode
		,selectClaimPanel: selectClaimPanel
		,providerInfoPanel: providerInfoPanel
		,emptyTitlePanel: emptyTitlePanel
	});
	this.basicInfoPanel = basicInfoPanel;

	// Form Submit
	function formSubmitHandler() {
		// Get Form		
		var formObj = Ext.getCmp("casetrackingCaseCreatePanelForm" + config.nameSpace).getForm();
		var validForm = true;
		var claimInformationFieldId = selectClaimPanel.selectedClaimInfoId;
		var claimInformationField = Ext.getCmp(claimInformationFieldId);
		var claimInformation = claimInformationField.getValue();
		var isClaimRequired = Ext.getCmp('isClaimRequired').getValue();
		if(formObj.isValid()){
			//Check if Add Claims, then are there any Claims
			if(claimInformation == "MULTIPLE_CLAIMS" || isClaimRequired == 'true'){
				if(claimGridPanel && claimGridPanel.getStore()){
					if(!claimGridPanel.getStore().getCount()) {
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
		}		
		
		if(!validForm) {
			return;
		}

		if(formObj.isValid()) {
			g_hideStatusBox();
            thisObj.prepareClaimsForSubmit();
			Ext.get(document.body.id).mask('<b> Creating Service Case...</b>', 'x-mask-loading');
			formObj.submit({
				url : config.urlSubmitCreateCase,
				params: {
					claimInformation: claimInformation
				},				
				clientValidation : true,
				isRedirect : false,
				success : function(form, action) {
					Ext.get(document.body.id).unmask();
					formPanel.removeAll();
					formPanel.body.load({url:config.urlCreateCaseConfirm, scripts:true, loadMask:true});				
				},
				failure : function(form, action) {
					uRadixClientMessageHandler.setAdvice(false,[{"description":"Error(s) Encountered"}]);
					g_showStatusBox();
					Ext.getCmp("updateButton" + config.nameSpace).enable();					
					Ext.get(document.body.id).unmask();
					formPanel.el.dom.scrollIntoView();					
				}
			});	
		}else{
			uRadixClientMessageHandler.setAdvice(false,[{"description":"Error(s) Encountered"}]);
			g_showStatusBox();
			formPanel.el.dom.scrollIntoView();
		}
	};

	// //Panel
	var formPanel = new Ext.Panel({
							renderTo : config.formPanelDivID,
							layout : "form",
							border : false,
							bodyBorder : false,
							hideBorders : true,
							width : 1000,
							items : [{
									xtype : "uRadix.form.FormPanel",
									autoScroll : true,
									id : "casetrackingCaseCreatePanelForm"+ config.nameSpace,
									formObjectName : "Ext.getCmp('casetrackingCaseCreatePanelForm"+ config.nameSpace + "')",
									items : [{
											xtype : "panel",
											border : false,
											cls : "portal-title",
											html : "Open New Service Case",
											layout : "column"
										},{
											xtype : "panel",
											border : false,
											layout : "column",
											html : "<span class='portal-text-tiny-bold'>*Required</span>"
										},{
											xtype : "panel",
											border : false,
											layout : "column",
											style: "padding-top: 8px;padding-bottom: 8px;",
											html : "<span class='portal-text-tiny'>For service cases related to <b>Workers' Compensation</b> and <b>Auto Medical</b>, the terms \"claim\" and \"EOB\" refer to \"bill\" and \"EOR\".</span>"
										},{												
											xtype : "panel",
											border : false,
											layout : "form",
											items : [basicInfoPanel]
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
									}]
						});
	
	var togglePanels = IDXM.Utilities.TogglePanels();	
	togglePanels.setPanels([
	                        	selectClaimPanel,  
								providerInfoPanel,providerInfoPanel.practitionerPanel,providerInfoPanel.facilityPanel
                                ,eobInfoPanel.faxEobPanelSingle,eobInfoPanel.faxEobPanelMultiple
                                ,eobInfoPanel.inputEobPanel,eobInfoPanel.chooseEobPanelSingle
                                ,eobInfoPanel.chooseEobPanelMultiple
                            ]);
	togglePanels.hidePanels();
	
	var formPanel = Ext.getCmp("casetrackingCaseCreatePanelForm"+config.nameSpace);
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
			togglePanels.hidePanels();
			thisObj.hideClaimPanel();
			thisObj.resetClaimsGridPanel();
			formPanel.el.dom.scrollIntoView();				
		},
		noCancel:function(){}	
	};	
	this.jsonObject = jsonObject;

	return this;
};
