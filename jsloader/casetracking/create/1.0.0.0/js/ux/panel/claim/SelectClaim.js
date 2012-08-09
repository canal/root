Ext.namespace("casetracking.create.ux.panel.claim.SelectClaim");
casetracking.create.ux.panel.claim.SelectClaim = Ext.extend(Ext.Panel, {

    initComponent : function(config) {

        var thisObj = this;        
        var togglePanels = new IDXM.Utilities.TogglePanels();
        var findClaimsButton = new casetracking.core.buttons.imagebutton({
                iconCls : "findClaimsButton"
                ,id:Ext.id()
                ,hidden:true
                ,handler:function(){
                    var _config = thisObj._config;
                    _config["parentWindow"]=thisObj.parentWindow;
                    _config["parentWindowCallBack"]=thisObj.parentWindowCallBack;
                    casetracking.claim.windows.AddClaims(_config);
                }
            });
        this.findClaimsButton = findClaimsButton;
        var findMoreClaimsButton = new casetracking.core.buttons.imagebutton({
                 iconCls : "findMoreClaimsButton"
                 ,id:Ext.id()
                ,hidden:true
                ,handler:function(){
                    var _config = thisObj._config;
                    _config["parentWindow"]=thisObj.parentWindow;
                    _config["parentWindowCallBack"]=thisObj.parentWindowCallBack;
                    casetracking.claim.windows.AddClaims(_config);
                }
        });
        this.findMoreClaimsButton = findMoreClaimsButton;
        
        var selectedClaimInfoId = Ext.id();
        this.selectedClaimInfoId = selectedClaimInfoId;
        
        var claimRequiredPanelId = Ext.id();
        this.claimRequiredPanelId = claimRequiredPanelId;
        
        var claimOptionalPanelId = Ext.id();
        this.claimOptionalPanelId = claimOptionalPanelId;  
        
        var selectClaimRadioGroupId = Ext.id();
        this.selectClaimRadioGroupId = selectClaimRadioGroupId;
        
        this.addClaims = function() {
			thisObj.parentWindow.showClaimPanel();
			togglePanels.enableShowPanel(thisObj.parentWindow.emptyTitlePanel);
			togglePanels.disableHidePanel(thisObj.parentWindow.providerInfoPanel);
			togglePanels.disableHidePanel(thisObj.parentWindow.providerInfoPanel.practitionerPanel);
	    	togglePanels.disableHidePanel(thisObj.parentWindow.providerInfoPanel.facilityPanel);
			Ext.getCmp(selectedClaimInfoId).setValue("MULTIPLE_CLAIMS");
        };
        
        this.noClaims = function() {
		    thisObj.parentWindow.hideClaimPanel();
		    togglePanels.enableShowPanel(thisObj.parentWindow.providerInfoPanel);
		    var radioGroupArray = thisObj.parentWindow.providerInfoPanel.find("id",thisObj.parentWindow.providerInfoPanel.radioId);
		    var radioGroupValue = radioGroupArray[0].getValue();
		    if(radioGroupValue && radioGroupValue.inputValue == 'FAC'){
		    	togglePanels.disableHidePanel(thisObj.parentWindow.providerInfoPanel.practitionerPanel);
		    	togglePanels.enableShowPanel(thisObj.parentWindow.providerInfoPanel.facilityPanel);
		    }else if (radioGroupValue && radioGroupValue.inputValue == 'PRAC'){
		    	togglePanels.disableHidePanel(thisObj.parentWindow.providerInfoPanel.facilityPanel);
		    	togglePanels.enableShowPanel(thisObj.parentWindow.providerInfoPanel.practitionerPanel);
		    }else{
		    	togglePanels.disableHidePanel(thisObj.parentWindow.providerInfoPanel.practitionerPanel);
		    	togglePanels.disableHidePanel(thisObj.parentWindow.providerInfoPanel.facilityPanel);
		    }
		    togglePanels.disableHidePanel(thisObj.parentWindow.emptyTitlePanel);
		    Ext.getCmp(selectedClaimInfoId).setValue("NO_CLAIMS");
        };

        Ext.apply(this, {
                layout : "form",
                bodyBorder : false,
                border : false,
                ctCls : "portal-plain-panel",
                style:"padding-top:10px;",
                hideBorders : true,
                items :
                [{
                    xtype : "panel",
                    border : false,
                    cls : "casetracking-title",
                    style:"padding-top:10px; padding-bottom:10px;",
                    bodyCssClass:"casetracking-title-body",
                    html : "Claim Information"
                },{
		    xtype:"panel"
		    ,id:claimRequiredPanelId
		    ,border:false
		    ,hidden:true
		    ,html:"<span class='portal-text-medium'>You must provide at least one claim. You may add up to 20 claims to each case. Please use the FIND CLAIM button to initiate the process.</span>"                
                },{
                	xtype:"panel"
                	,id:claimOptionalPanelId
                	,border:false
                	,items:[{
				    xtype:"panel"
				    ,border:false
				    ,html:"<span class='portal-text-medium'>Are you supplying information about a claim or claims? You may add up to 20 claims to each case.</span>"				   
				},{
					xtype: "radiogroup",
					name:"claimsRadioGroup",
					id: this.selectClaimRadioGroupId,
					style:"padding-left:20;padding-top:10px;",
					hideLabel:true,
					labelSeparator:"",
					vertical: true,
					columns:1,
					value:"NO_CLAIMS",
					items:[{
							hideLabel: true,
							boxLabel : "Yes",
							name : "claimInformation",
							inputValue : "MULTIPLE_CLAIMS",
							listeners: {
								check : function(o,b){
									if(b) {
										thisObj.addClaims();
									}
								}
							}
						  },{
							hideLabel: true,
							boxLabel : "No",
							name : "claimInformation",
							inputValue : "NO_CLAIMS",
							checked: true,
							listeners: {
									check : function(o,b){
										if(b) {
										    thisObj.noClaims();
										}
									}
								}
						  }]
				},{
					    xtype: "hidden",
					    id: selectedClaimInfoId,
					    value: "NO_CLAIMS"
				}]
                },{
                    height:10
                },findClaimsButton,findMoreClaimsButton]
        });

		// call parent initComponent
		casetracking.create.ux.panel.claim.SelectClaim.superclass.initComponent.call(this);
	}
});
// Register component as xtype
Ext.reg('casetracking.create.ux.panel.claim.SelectClaim',casetracking.create.ux.panel.claim.SelectClaim);