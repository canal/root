
Ext.namespace("IDXM.UserProfile.Action.PopUp.UpdateStatus");
IDXM.UserProfile.Action.PopUp.UpdateStatus = function (config){

	Ext.form.Field.prototype.msgTarget = 'sideDetails';

	var lockAccount;
	var lockHtml;
	if((config.userIsLocked != undefined) && (config.userIsLocked == true)){
		lockAccount = {boxLabel: 'Unlock Account', name: 'statusAction', inputValue: 'unLockAcct'};
		lockHtml = "<td><span class='icon-locked' id='profile_icon_locked'></span></td>";
	}else{
		lockAccount = {boxLabel: 'Lock Account', name: 'statusAction', inputValue: 'lockAcct'};
		lockHtml ="";
	}
	
	var terminateAccount = {boxLabel: 'Terminate Account', name: 'statusAction', inputValue: 'terminateAcct'};
	var terminateAccountDatePanel =
				new Ext.Panel ({
						layout:"form"
						,labelAlign:"top"
						,style:"padding-left:25px"
						,border:false
						,bodyBorder:false
						,hideBorders:true
						,items:[{	xtype:"datefield"
									,minValue:new Date().clearTime()
									,id:"terminateDateIdField"
									,fieldLabel:"Terminate On"
									,name:"date"
									,width:200
									,value: new Date().clearTime()
									,allowBlank:true
								}]
					});
	var changeStartDate = {boxLabel: 'Change Start Date', name: 'statusAction', inputValue: 'changeStartDt'};
	var changeStartDatePanel =
			new Ext.Panel({
						layout:"form"
						,labelAlign:"top"
						,style:"padding-left:25px"
						,border:false
						,bodyBorder:false
						,hideBorders:true
						,items:[{	xtype:"datefield"
									,minValue:new Date().clearTime()
									,id:"changeStartDateIdField"
									,fieldLabel:"Start On"
									,name:"date"
									,width:200
									,value: new Date().clearTime()
									,hidden: (config.userData.userClassCode == IDXM_USER_CLASS_PROVIDER)
									,hideLabel: (config.userData.userClassCode == IDXM_USER_CLASS_PROVIDER)
									,hiddenValue: new Date().clearTime()
									,allowBlank:true
								}]
					});
					
	var changeStartDateAsActivate = {boxLabel: 'Activate Account', name: 'statusAction', inputValue: 'changeStartDt'};
	var changeStartDatePanelAsActivate =
			new Ext.Panel({
						layout:"form"
						,labelAlign:"top"
						,style:"padding-left:25px"
						,border:false
						,bodyBorder:false
						,hideBorders:true
						,items:[{	xtype:"datefield"
									,minValue:new Date().clearTime()
									,id:"changeStartDateIdField"
									,fieldLabel:"Activate On"
									,name:"date"
									,width:200
									,value: new Date().clearTime()
									,hidden: (config.userData.userClassCode == IDXM_USER_CLASS_PROVIDER)
									,hideLabel: (config.userData.userClassCode == IDXM_USER_CLASS_PROVIDER)
									,hiddenValue: new Date().clearTime()
									,allowBlank:true
								}]
					});					
					
	var activateAccount = {boxLabel: 'Activate Account', name: 'statusAction', inputValue: 'activateAcct'};
	var activateDatePanel =
			new Ext.Panel({
						layout:"form"
						,labelAlign:"top"
						,style:"padding-left:25px"
						,border:false
						,bodyBorder:false
						,hideBorders:true
						,items:[{	xtype:"datefield"
									,minValue:new Date().clearTime()
									,id:"activateDateIdField"
									,fieldLabel:"Activate On"
									,name:"date"
									,width:200
									,value: new Date().clearTime()
									,allowBlank:true
								}]
					});					

	var statusItems = [];
	var dateFieldToggler = IDXM.Utilities.TogglePanels();
	dateFieldToggler.disableShowPanel(terminateAccountDatePanel);
	dateFieldToggler.disableShowPanel(changeStartDatePanel);
	dateFieldToggler.disableShowPanel(activateDatePanel);

	var currentStatusRadioGroup =
	{
		xtype: "radiogroup"
		,vertical: true
		,columns:1
		,style:"padding-left:15;"
	};

	var datePanel;

	//Active Status
	if(config.userStatusCode == IDXM_USER_STATUS_CODE_MAP["ACTIVE"]){

		//Check first Item by Default
		lockAccount["checked"] = true;

		//Add Listener
		terminateAccount["listeners"] = {
							check : function(){
										var dateFieldToggler = IDXM.Utilities.TogglePanels();

										if(this.checked){
											dateFieldToggler.enableShowPanel(terminateAccountDatePanel);
										}else{
											dateFieldToggler.disableShowPanel(terminateAccountDatePanel);
										}
									}
						};

		//Set Radion Buttons
		statusItems[statusItems.length] = lockAccount;
		statusItems[statusItems.length] = terminateAccount;

		//Set Date Panel - This most be the last field
		datePanel = terminateAccountDatePanel;

	//Inactive Status
	}else if(config.userStatusCode == IDXM_USER_STATUS_CODE_MAP["INACTIVE"]){

		//Check first Item by Default
		activateAccount["checked"] = true;

		//Set Radion Buttons
		statusItems[statusItems.length] = activateAccount;
		statusItems[statusItems.length] = lockAccount;
		statusItems[statusItems.length] = terminateAccount;

		//Set Date Panel - This most be the last field
		datePanel = {border:false,bodyBorder:false,hideBorders:true};

	//Terminated Status
	}else if(config.userStatusCode == IDXM_USER_STATUS_CODE_MAP["TERMINATED"]){

		//Check first Item by Default
		changeStartDateAsActivate["checked"] = true;

		//Set Radion Buttons
		statusItems[statusItems.length] = changeStartDateAsActivate;

		//Set Date Panel - This most be the last field
		datePanel = changeStartDatePanelAsActivate;
		
		if(!(config.userData.userClassCode == IDXM_USER_CLASS_PROVIDER))
		{
			dateFieldToggler.enableShowPanel(changeStartDatePanelAsActivate);
		}
		
		//Add Listener
		activateAccount["listeners"] = {
							check : function(){
										var dateFieldToggler = IDXM.Utilities.TogglePanels();

										if(this.checked){
											dateFieldToggler.enableShowPanel(activateDatePanel);
										}else{
											dateFieldToggler.disableShowPanel(activateDatePanel);
										}
									}
						};		

	//Pending Start Date Status
	}else if(config.userStatusCode == IDXM_USER_STATUS_CODE_MAP["PENDING_START_DATE"]){

		//Check first Item by Default
		lockAccount["checked"] = true;

		//Add Listener
		changeStartDate["listeners"] = {
							check : function(){

										var dateFieldToggler = IDXM.Utilities.TogglePanels();

										if(this.checked){
											dateFieldToggler.enableShowPanel(changeStartDatePanel);
										}else{
											dateFieldToggler.disableShowPanel(changeStartDatePanel);
										}
									}
						};
						
		//Set Radion Buttons
		statusItems[statusItems.length] = lockAccount;
		statusItems[statusItems.length] = terminateAccount;
		statusItems[statusItems.length] = changeStartDate;

		//Set Date Panel - This most be the last field
		datePanel = changeStartDatePanel;

	//Pending Log In Status
	}else if(config.userStatusCode == IDXM_USER_STATUS_CODE_MAP["PENDING_INITIAL_LOGIN"]){

		//Check first Item by Default
		lockAccount["checked"] = true;

		//Set Radion Buttons
		statusItems[statusItems.length] = lockAccount;
		statusItems[statusItems.length] = terminateAccount;

		if(config.userData.userClassCode != IDXM_USER_CLASS_INTERNAL){
			//Set Date Panel - This most be the last field
			datePanel = {border:false,bodyBorder:false,hideBorders:true};							
		}else{		
			statusItems[statusItems.length] = changeStartDate;
			
			//Add Listener
			changeStartDate["listeners"] = {
								check : function(){
	
											var dateFieldToggler = IDXM.Utilities.TogglePanels();
	
											if(this.checked){
												dateFieldToggler.enableShowPanel(changeStartDatePanel);
											}else{
												dateFieldToggler.disableShowPanel(changeStartDatePanel);
											}
										}
							};	
							
			//Set Date Panel - This most be the last field
			datePanel = changeStartDatePanel;			
		}

	//Pending Validation Status
	}else if(config.userStatusCode == IDXM_USER_STATUS_CODE_MAP["PENDING_USER_VALIDATION"]){

		//Check first Item by Default
		lockAccount["checked"] = true;

		//Add Listener
		changeStartDate["listeners"] = {
							check : function(){

										var dateFieldToggler = IDXM.Utilities.TogglePanels();

										if(this.checked){
											dateFieldToggler.enableShowPanel(changeStartDatePanel);
										}else{
											dateFieldToggler.disableShowPanel(changeStartDatePanel);
										}
									}
						};
		
		
		
		//Set Radion Buttons
		statusItems[statusItems.length] = lockAccount;
		statusItems[statusItems.length] = terminateAccount;
		
		if((config.userData.userClassCode != IDXM_USER_CLASS_PROVIDER) && 
				((config.userData.userClassCode == IDXM_USER_CLASS_CLIENT) || (config.userData.userClassCode == IDXM_USER_CLASS_VENDOR))){
			statusItems[statusItems.length] = changeStartDate;
		}
		
		//Set Date Panel - This most be the last field
		datePanel = changeStartDatePanel;		
	}




	//Add all Radiobuttons to Radio Group
	currentStatusRadioGroup["items"] = statusItems;

	function formSubmitHandler(){
		
				//Get Form
				var statusViewURadixFormPanel = Ext.getCmp("statusViewURadixFormPanel"+config.namespace);
				var formObj = statusViewURadixFormPanel.getForm();
				
				var updateButton = Ext.getCmp("updateButton"+config.namespace);
				
				updateButton.disable();
				
				if(formObj.isValid()){
					
					updateButton.disable();
					
					formObj.submit({
									url: config.urlSubmitUpdateStatus,
									clientValidation:true,
									isRedirect:true,
									success: function(form,action)
									{				
										config.windowObject.close();
										uRadixRedirectHandler.redirect(config.userBaseURL);
									},
									failure: function(form,action)
									{													
										g_showStatusBox();
										updateButton.enable();
	
									}				
					});
				} 
	}

	var windowContainerObject =
		new Ext.Panel({
					renderTo:config.renderTo
					,border:false
					,bodyBorder:false
					,hideBorders:true
					,bodyStyle:"padding:5px;"
					,width:config.windowObject.getInnerWidth()
					,items:[{
								xtype:"panel"
								,border: false
								,bodyBorder:false
								,hideBorders:true
								,items:[{
											xtype: "panel"
											,border: false
											,cls:"portal-title"
											,html: "Update Status"
										},{
											xtype: "panel"
											,height:8
											,border:0
											,style: "boder:none;"
											,bodyBorder:0
											,bodyStyle:"border:none"
											,hideBorders: true
										},{

											xtype:"uRadix.form.FormPanel"
											,id:"statusViewURadixFormPanel"+config.namespace
											,labelAlign:"top"
											,autoScroll:true
											,height:250
											,items:[{
														xtype: "panel"
														,border:false
														,bodyBorder:false
														,hideBorders:true
														,html:"<table border='0' cellspacing='3'><tr><td><span class='templateTextNormal' style='font-size:12px;'>Currrent Status:</span></td><td><span class='status-"+config.userStatusCode +"'>"+config.userStatusName+"</span></td>"+lockHtml+"</tr></table>"
													},currentStatusRadioGroup,datePanel]
													,buttonAlign:"right"
													,buttons:[{
																	id:"cancelButton"+config.namespace
																	,text:"CANCEL"
																	,ctCls :"support-portal-btn-cancel"
																	,handler:function(){config.windowObject.close()}
																},{
																	id:"updateButton"+config.namespace
																	,text:"UPDATE"
																	,ctCls :"support-portal-btn"
																	,handler:formSubmitHandler
																}]
													,listeners: 	{uradix_enterkey: formSubmitHandler}
										}]
							}]
				});

	var statusViewURadixFormPanel = Ext.getCmp("statusViewURadixFormPanel"+config.namespace);
	var statusViewURadixForm = statusViewURadixFormPanel.getForm();
	
	
	config.windowObject.setHeight(windowContainerObject.getInnerHeight()+IDXM_POPUP_WINDOW_HEIGHT_ADJUST);

};
