
Ext.namespace("IDXM.UserProfile.Read");
IDXM.UserProfile.Read = function (config){

	//Overriding setMessages from URadix
  	uRadixClientMessageHandler.setMessage=function(isSuccess, messages){return;}

	//Local Variables
	var userTemplate;
	var userTemplateHeight;
	var addAnotherUserText;
	var userTemplateWidth;

	//Set Template & addAnotherUserText
	var alteredUserData = config.userData;
	alteredUserData['isProfile']=true;
	if(config.userData){
		if(config.userData.userTypeCode == IDXM_USER_TYPE_PERSON){
			if(config.userData.userClassCode == IDXM_USER_CLASS_INTERNAL){				
				userTemplate = IDXM.internalPersonUserTemplate(alteredUserData);
				userTemplateHeight = 404;
				userTemplateWidth = 300;
				addAnotherUserText = "ADD ANOTHER INTERNAL USER";
			}else if(config.userData.userClassCode == IDXM_USER_CLASS_CLIENT){
				userTemplate = IDXM.clientSingleUserTemplate(alteredUserData);
				userTemplateHeight = 404;
				userTemplateWidth = 300;
				addAnotherUserText = "ADD ANOTHER CLIENT USER";
			}else if(config.userData.userClassCode == IDXM_USER_CLASS_VENDOR){
				userTemplate = IDXM.vendorSingleUserTemplate(alteredUserData);
				userTemplateHeight = 404;
				userTemplateWidth = 300;
				addAnotherUserText = "ADD ANOTHER VENDOR USER";
			}
			else if(config.userData.userClassCode == IDXM_USER_CLASS_PROVIDER){				
				userTemplate = IDXM.providerSingleUserTemplate(alteredUserData);
				userTemplateHeight = 404;
				userTemplateWidth = 300;
				addAnotherUserText = "ADD ANOTHER PROVIDER USER";
			}
		}else if(config.userData.userTypeCode == IDXM_USER_TYPE_SYSTEM){
			userTemplate = IDXM.internalSystemUserTemplate(alteredUserData);
			userTemplateHeight = 404;
			userTemplateWidth = 300;
			addAnotherUserText = "ADD ANOTHER INTERNAL USER";
		}else if(config.userData.userTypeCode == IDXM_USER_TYPE_DEVICE){
			userTemplate = IDXM.internalDeviceUserTemplate(alteredUserData);
			userTemplateHeight = 404;
			userTemplateWidth = 300;
			addAnotherUserText = "ADD ANOTHER INTERNAL USER";
		}

                // Adding systemUserId to registered window params
                if(config.userData.sysKey !== undefined && config.userData.sysKey != "")
                {
					uRadixWindowManager.uRadixWindowRegistry["updateUserId"+config.nameSpace].autoLoad.params['systemUserId'] = config.userData.sysKey;
					uRadixWindowManager.uRadixWindowRegistry["updateStatus"+config.nameSpace].autoLoad.params['systemUserId'] = config.userData.sysKey;
					uRadixWindowManager.uRadixWindowRegistry["updateSubClass"+config.nameSpace].autoLoad.params['systemUserId'] = config.userData.sysKey;
					uRadixWindowManager.uRadixWindowRegistry["resendAccountActivation"+config.nameSpace].autoLoad.params['systemUserId'] = config.userData.sysKey;
					uRadixWindowManager.uRadixWindowRegistry["accessHistory"+config.nameSpace].autoLoad.params['systemUserId'] = config.userData.sysKey;
					uRadixWindowManager.uRadixWindowRegistry["resetPassword"+config.nameSpace].autoLoad.params['systemUserId'] = config.userData.sysKey;
					uRadixWindowManager.uRadixWindowRegistry["groupPicker"+config.nameSpace].autoLoad.params['systemUserId'] = config.userData.sysKey;
					uRadixWindowManager.uRadixWindowRegistry["rolePicker"+config.nameSpace].autoLoad.params['systemUserId'] = config.userData.sysKey;
					uRadixWindowManager.uRadixWindowRegistry["ccodePicker"+config.nameSpace].autoLoad.params['systemUserId'] = config.userData.sysKey;
                }
	}

	//Name and Information Content Panel
	var internalUserInformationPanel = 
		new Ext.Panel	({
					bodyBorder:false,
					border:false,
					style: "padding-left:10px;",
					frame: false,
					autoScroll:true,
					height:userTemplateHeight,
					width:userTemplateWidth,
					html:userTemplate
				});

	//Demographics Button
	var userDemographicsPopUpButton = {};
	if(config.userDemographicsURL){
		userDemographicsPopUpButton = {
			xtype:'tbbutton'
			,iconCls: 'edit-icon'
			,text:''	    												
			,handler: function(){										
				uRadixRedirectHandler.redirect(config.userDemographicsURL+"&systemUserId="+config.userData.sysKey);
			}
		};	
	}
	
	var AddAnotherUserButtonPanel;
	if(config.blnShowAddAnotherUserButton == true){
		AddAnotherUserButtonPanel =	{
											xtype:"panel"
											,border:false
											,bodyBorder:false
											,hideBorders:true
											,layout:"form"
											,buttonAlign: 'right'
											,buttons:[{
														id:"addAnotherUserButton"+config.nameSpace,
														text:addAnotherUserText,
														cls :"support-portal-btn-cancel",
														handler:function(){uRadixRedirectHandler.redirect(config.mirrorUserURL);}
													
											}]	
									};
	}else{
		AddAnotherUserButtonPanel = {
											xtype:"panel"
											,border:false
											,bodyBorder:false
											,hideBorders:true
											,html:"&nbsp"	
									};
	}

	//Name Toolbar
	var nameInfoToolbar =  
		new Ext.Toolbar	({ 
					ctCls: "toolbar-portal-panel-head-frame"
					,autoheight:true
					,items:[{
							xtype: 'tbtext'
							,text: 'Name & Information'
						},{
							xtype: 'tbfill'
						},userDemographicsPopUpButton]
				});

	
	if(!(config.userData.userTypeCode == IDXM_USER_TYPE_PERSON && config.userData.userClassCode == IDXM_USER_CLASS_PROVIDER)){
		//Groups and Roles Toolbar
		var groupsAndRolesToolbar = 
			new Ext.Toolbar	({ 
						ctCls: "toolbar-portal-panel-head-frame"
						,autoheight:true							
						,items:[{
								xtype: 'tbtext'
								,text: 'Groups & Roles'
							},{
								xtype: 'tbfill'
							}]
					});	
					
		//Groups Toolbar 
		var groupsToolbar = 
			new Ext.Toolbar	({ 
								ctCls: "toolbar-portal-panel-head-frame"
								,autoheight:true	    									
								,items:[{
										xtype: 'tbtext'
										,text: 'Groups'										
									},{
										xtype: 'tbfill'
									},{
										xtype:'tbbutton'
										,iconCls: 'edit-icon'
										,text:''	    												
										,handler: function(){										
											uRadixWindowManager.uRadixWindowRegistry["groupPicker"+config.nameSpace].autoLoad.params[uRadixWindowManager.MPI_CALLBACK_NAME] = config.thisObjectName+".groupPickerCallBack";
											uRadixWindowManager.launch({id:"groupPicker"+config.nameSpace, key:"groupPicker"+config.nameSpace});
										}
									}]
							});		
	
		//Roles Toolbar					
		var rolesToolbar =  
			new Ext.Toolbar	({ 
								ctCls: "toolbar-portal-panel-head-frame"
								,autoheight:true	    									
								,items:[{
										xtype: 'tbtext'
										,text: 'Roles'
									},{
										xtype: 'tbfill'
									},{
										xtype:'tbbutton'
										,iconCls: 'edit-icon'
										,text:''	    												
										,handler: function(){
											uRadixWindowManager.uRadixWindowRegistry["rolePicker"+config.nameSpace].autoLoad.params[uRadixWindowManager.MPI_CALLBACK_NAME] = config.thisObjectName+".rolePickerPickerCallBack";
											uRadixWindowManager.launch({id:"rolePicker"+config.nameSpace, key:"rolePicker"+config.nameSpace});										
										}
									}]
							});	
		
		//Tree Panel Group Root
	 	var treeGroupRootNode = new Ext.tree.TreeNode({	id: "groupsTreeRootID"+config.nameSpace,
										text: "Groups",
										draggable: false,												
										leaf:false
									});
	
		//Tree Panel Group Root - Append Child Nodes
		if(config.defaultGroups){
			treeGroupRootNode.appendChild(config.defaultGroups);
		}
		
		//Tree Panel Group
		var treePanelGroup = new Ext.tree.TreePanel({
								id:"ViewTtreePanelGroupID",							
								frame: false,
								ctCls: "tree-portal-node-no-icon",
								height: (config.userData.userTypeCode == IDXM_USER_TYPE_PERSON && config.userData.userClassCode == IDXM_USER_CLASS_INTERNAL)? 400 : 400,
								width:(config.userData.userTypeCode == IDXM_USER_TYPE_PERSON && config.userData.userClassCode == IDXM_USER_CLASS_CLIENT)? 235 : 245,
								useArrows:true,
								autoScroll:true,
								autoShow:true,
								rootVisible:false,
								containerScroll: true,
								root: treeGroupRootNode
			});
					
			
		//Tree Panel Role Root
	 	var treeRoleRootNode = new Ext.tree.TreeNode({	id: "rolessTreeRootID"+config.nameSpace,
										text: "Roles",
										draggable: false,												
										leaf:false
									});
	
		//Tree Panel Group Root - Append Child Nodes
		if(config.defaultRoles){		
			treeRoleRootNode.appendChild(config.defaultRoles);
		}
			
		//Tree Panel Roles
		var treePanelRoles = new Ext.tree.TreePanel({
								id:"ViewTtreePanelRoleID",							
								frame: false,
								ctCls: "tree-portal-node-no-icon",
								height:(config.userData.userTypeCode == IDXM_USER_TYPE_PERSON && config.userData.userClassCode == IDXM_USER_CLASS_INTERNAL)? 400 : 400,
								width:(config.userData.userTypeCode == IDXM_USER_TYPE_PERSON && config.userData.userClassCode == IDXM_USER_CLASS_CLIENT)? 235 : 245,
								useArrows:true,
								autoScroll:true,
								autoShow:true,
								rootVisible:false,
								containerScroll: true,
								root: treeRoleRootNode
			});
	}
	
	//If Client
	if(config.userData.userTypeCode == IDXM_USER_TYPE_PERSON && config.userData.userClassCode == IDXM_USER_CLASS_CLIENT){
		var formPanelWidth = 1100;
				
		//Tree Panel CCode Root
		var treeCCodeRootNode = new Ext.tree.TreeNode({	id: "ccodesTreeRootID"+config.nameSpace,
									text: "CCodes",
									draggable: false,												
									leaf:false
								});
								
		var mpiTreeNode = null;
		if(config.mpiCCodeList != null && config.mpiCCodeList && config.mpiCCodeList.length > 0) {
			mpiTreeNode = new Ext.tree.TreeNode({ id: IDXM_CLIENT_SOURCE_MULTIPLAN+config.nameSpace,
								  text: "MultiPlan CCodes",
								  draggable: false,
								  leaf:false,
								  expanded: true,
								  recursive: false
								});
			addChildNodes(mpiTreeNode, config.mpiCCodeList)
			
			treeCCodeRootNode.appendChild(mpiTreeNode);
		}
		
		var viantTreeNode = null;
		if(config.viantCCodeList != null && config.viantCCodeList && config.viantCCodeList.length > 0) {
			viantTreeNode = new Ext.tree.TreeNode({ id: IDXM_CLIENT_SOURCE_VIANT+config.nameSpace,
								  text: "Viant CCodes",
								  draggable: false,
								  leaf:false,
								  expanded: true,
								  recursive: false
								});
			addChildNodes(viantTreeNode, config.viantCCodeList)
			
			treeCCodeRootNode.appendChild(viantTreeNode);		
		}														

		//Tree Panel CCodes
		var treePanelCCodes= new Ext.tree.TreePanel({
								id:"ViewTtreePanelRoleID",							
								frame: false,
								ctCls: "tree-portal-node-no-icon",
								height:400,
								width:245,
								useArrows:true,
								autoScroll:true,
								autoShow:true,
								rootVisible:false,
								containerScroll: true,
								root: treeCCodeRootNode
		});		
		
		
		var ccodesGroupsAndRolesToolbar = 
			new Ext.Toolbar	({ 
					ctCls: "toolbar-portal-panel-head-frame"
					,autoheight:true							
					,items:[{
							xtype: 'tbtext'
							,text: 'CCodes, Groups & Roles'
						},{
							xtype: 'tbfill'
						}]
				});			
	
		var ccodesToolbar =  
			new Ext.Toolbar	({ 
								ctCls: "toolbar-portal-panel-head-frame"
								,autoheight:true	    									
								,items:[{
										xtype: 'tbtext'
										,text: 'Access CCodes'
									},{
										xtype: 'tbfill'
									},{
										xtype:'tbbutton'
										,iconCls: 'edit-icon'
										,text:''	    												
										,handler: function(){
											uRadixWindowManager.uRadixWindowRegistry["ccodePicker"+config.nameSpace].autoLoad.params[uRadixWindowManager.MPI_CALLBACK_NAME] = config.thisObjectName+".ccodePickerCallBack";
											uRadixWindowManager.launch({id:"ccodePicker"+config.nameSpace, key:"ccodePicker"+config.nameSpace});
										}
									}]
							});			
	
		//Form Container Panel
		var internalUserFormPanel = 
			new uRadix.form.FormPanel({																					  
						     layout:'column'
						     ,id: 'internalUserFormPanel'+config.nameSpace
						    ,bodyBorder: false						    
						    ,border: false
						    ,hideBorders: true
						    ,width:1100
						    //,width:850
						    ,cls:"user-profile-body" 
						    ,items: [{																					  
								     layout:'column'								    
								    ,bodyBorder: false						    
								    ,border: false
								    ,hideBorders: true
								    ,ctCls:"user-profile-body-column"
								    ,items: 	[{										       										
											width:310													       
											,ctCls:"support-portal-panel-head-frame"															        
											,items:[nameInfoToolbar,internalUserInformationPanel]
										}
										,{width:10,html:'&nbsp;'}
										,{										       										
											width:755	
											//width:510
											,ctCls:"support-portal-panel-head-frame"																
											,items:[{	xtype:"panel"
														,layout:"column"
														,autoScroll: true														
														,items:[{																	
																width:240
																,items:[ccodesToolbar,treePanelCCodes]
															}
															,{width:5,html:'&nbsp;'}
															,{	
																width:250
																,items:[groupsToolbar,treePanelGroup]
															}
															,{width:5,html:'&nbsp;'}
															,{																	
																width:250														
																,items:[rolesToolbar,treePanelRoles]
															}]
													}]														        
											}]
								}]
						});
		var isReadCCodes = false;
		function readCCodes(node) {				
			if(!isReadCCodes) {
				var url = config.renderUrl+'?action=readCCode&blnAllChildCCodes='+userData.blnAllChildCCodes+'&primaryParentCCode='+userData.ccodeParent;	
				
				// Mask Body
				Ext.get(document.body.id).mask("<b> Refreshing CCodes...</b> ", "x-mask-loading");
					
				Ext.Ajax.request({
				   url: url,
				   success: function(result, request) 
				   	    {
						var response = uRadixUtilities.jsonDecode(result.responseText);
						var mpiMultiLevelCCodeList = response.mpiMultiLevelCCodeList;
						if(mpiTreeNode != null && mpiMultiLevelCCodeList != null && mpiMultiLevelCCodeList.length > 0) {
							while(mpiTreeNode.firstChild) {
							    mpiTreeNode.removeChild(mpiTreeNode.firstChild);
							}
							var mpiList = uRadixUtilities.jsonDecode(mpiMultiLevelCCodeList);
							for(i = 0; i < mpiList.length; i++) {
								var ccode = mpiList[i];								
								if(node.id == ccode.id) {
									ccode.expanded = true;
								}
								mpiTreeNode.appendChild(ccode);
							}
							mpiTreeNode.expand();
						}
						
						var viantMultiLevelCCodeList = response.viantMultiLevelCCodeList;						
						if(viantTreeNode != null && viantMultiLevelCCodeList != null && viantMultiLevelCCodeList.length > 0) {
							while(viantTreeNode.firstChild) {
							    viantTreeNode.removeChild(viantTreeNode.firstChild);
							}
							viantTreeNode.appendChild(uRadixUtilities.jsonDecode(viantMultiLevelCCodeList));
							viantTreeNode.expand();
						}
						
						isReadCCodes = true;
						Ext.get(document.body.id).unmask();
				   	    },
				   failure: function(result, request)
				   	    {
		   	    			Ext.get(document.body.id).unmask();
				   	    }
				});
				

			}		
		}
	}else{
		var formPanelWidth = 850;
		
		if(config.userData.userTypeCode == IDXM_USER_TYPE_PERSON && config.userData.userClassCode == IDXM_USER_CLASS_INTERNAL){
			var nameInformationJson = {										       										
				width:310
				,ctCls:"support-portal-panel-head-frame"															        
				,items:[nameInfoToolbar,internalUserInformationPanel]
			};				
		}else{
			var nameInformationJson = {										       										
				width:310													       
				,ctCls:"support-portal-panel-head-frame"															        
				,items:[nameInfoToolbar,internalUserInformationPanel]
			};			
		}
		
		//Form Container Panel
		if(config.userData.userClassCode == IDXM_USER_CLASS_PROVIDER)
		{
			var internalUserFormPanel = 
				new uRadix.form.FormPanel({											
								bodyBorder: false
								,border: false
								,autoScroll: true																	
								,cls:"user-profile-body" 							
								,items: [{																					  
									     layout:'column'								    
									    ,bodyBorder: false						    
									    ,border: false
									    ,hideBorders: true
									    ,ctCls:"user-profile-body-column"
									    ,items: 	[nameInformationJson]
											}]
							});	
		} else{
			var internalUserFormPanel = 
				new uRadix.form.FormPanel({											
								bodyBorder: false
								,border: false
								,autoScroll: true																	
								,cls:"user-profile-body" 							
								,items: [{																					  
									     layout:'column'								    
									    ,bodyBorder: false						    
									    ,border: false
									    ,hideBorders: true
									    ,ctCls:"user-profile-body-column"
									    ,items: 	[nameInformationJson
											,{width:10,html:'&nbsp;'}
											,{										       										
												width:510	
												,ctCls:"support-portal-panel-head-frame"																
												,items:[{	xtype:"panel"
															,layout:"column"
															,autoScroll: true														
															,items:[
																	{	
																		width:250
																		,items:[groupsToolbar,treePanelGroup]
																	}
																	,{width:5,html:'&nbsp;'}
																	,{																	
																		width:250															
																		,items:[rolesToolbar,treePanelRoles]
																	}
																]
														}]														        
												}]
											}]
				});
		}		
		
	}
	
	//Title Container Panel
	var internalUserDivPanel = 
		new Ext.Panel({
						renderTo: config.formPanelDivID,
						bodyBorder: false,
						border: false,
						//style: "padding-left:7px;",
						width: formPanelWidth,						
						items:[{
								xtype: "panel",
								border: false,					
								cls:"portal-title",
								html: "User Profile"	
							},{
								xtype: "panel",
								height:8,
								border:0,
								style: "boder:none;",
								bodyBorder:0,
								bodyStyle:"border:none",
								hideBorders: true
							},{
								xtype: "idxm.profile.ux.ProfileBar",
								nameSpace: config.nameSpace,
								statusCode: config.userData.userStatus.statusCode,
								statusName: config.userData.userStatus.statusName,
								userSubClassCode: config.userData.userSubClassCode,
								userFirstName:config.userData.firstName,
								userLastName:config.userData.lastName,
								userReportsToIndicator: config.userData.validReportsToIndicator,
								mirrorUserURL: config.mirrorUserURL,
								sysKey: config.userData.sysKey,
								userTypeCode: config.userData.userTypeCode,
								userClassCode: config.userData.userClassCode,
								isLocked:config.userData.userStatus.locked,
								lastLoginDate:config.userData.lastLoginDate
							},internalUserFormPanel,AddAnotherUserButtonPanel]								
					});
	if(!(config.userData.userTypeCode == IDXM_USER_TYPE_PERSON && config.userData.userClassCode == IDXM_USER_CLASS_PROVIDER)){
		//Expand Groups Tree
		if(config.defaultGroups.length){
			treePanelGroup.expandPath(treePanelGroup.getRootNode().getPath());			
		}
	
		//Expand Roles Tree				
		if(config.defaultRoles.length){
			treePanelRoles.expandPath(treePanelRoles.getRootNode().getPath());				
		}
	}
	
	return jsonFunctionObject = {
	
		//Cancel User Call Back									
		cancelUser: function(action){
			if(action){
				//Close Window
				Ext.getCmp("cancelUser"+config.nameSpace).close();

				//Reset Session
				var conn = new Ext.data.Connection();
				conn.request({
					url: Wizard.PortalContainer.getActionURL("removeSessionDataAjax"),
					method: 'POST',			
					success: function(responseObject) {				
						Wizard.PortalContainer.navigate({url:Wizard.PortalContainer.getInitActionName()});
					},
					failure: function() {
						Ext.Msg.alert('Status', 'Unable to reset session data.');
					}
				});			

			}else{
				//Close Window
				Ext.getCmp("cancelUser"+config.nameSpace).close();
			}
		},	
	
		//General Errors User Call Back									
		generalErrorsCallBack: function(){					
			Ext.getCmp("generalErrors"+config.nameSpace).close();		
			Wizard.PortalContainer.navigate({url:Wizard.PortalContainer.getInitActionName()});
		},

		//Draw Group Tree and Close Window
		groupPickerCallBack: function(jsonObject){			
			try{ 
				if(!Ext.isEmpty(jsonObject.arrayOfGroups))
				{
					//Show Tree
					IDXM.Utilities.TreeBuilder(jsonObject.arrayOfGroups,treePanelGroup,"Groups");
				}
			}catch(e){}

			//Close Group Picker Window
			Ext.getCmp("groupPicker"+config.nameSpace).close();

			if(Ext.isEmpty(jsonObject.noRedirect)) {
                                var _url = window.location.protocol+"//"+window.location.host+window.location.pathname+"?systemUserId="+uRadixUtilities.getParameter(window.location.search,"systemUserId");
				uRadixRedirectHandler.redirect(_url);
			}
		},

		//Draw Role Tree and Close Window
		rolePickerPickerCallBack: function(jsonObject){		
			try{
				if(!Ext.isEmpty(jsonObject.arrayOfGroups))
				{
					//Show Tree
					IDXM.Utilities.TreeBuilder(jsonObject.arrayOfGroups,treePanelRoles,"Roles");
				}
			}catch(e){}

			//Close Group Picker Window
			Ext.getCmp("rolePicker"+config.nameSpace).close();

			if(Ext.isEmpty(jsonObject.noRedirect)) {
                                var _url = window.location.protocol+"//"+window.location.host+window.location.pathname+"?systemUserId="+uRadixUtilities.getParameter(window.location.search,"systemUserId");
				uRadixRedirectHandler.redirect(_url);
			}

		},
		
		//Close CCode Window & reload
		ccodePickerCallBack: function(jsonObject){
			if(jsonObject.windowObject){
				jsonObject.windowObject.close();
			}

                        var _url = window.location.protocol+"//"+window.location.host+window.location.pathname+"?systemUserId="+uRadixUtilities.getParameter(window.location.search,"systemUserId");
			uRadixRedirectHandler.redirect(_url);
		}
	
	}
	
	return jsonFunctionObject;	
	
	function addChildNodes(nodeToAddChilds, children) {
		if(nodeToAddChilds != null && children != null) {
			for(i = 0; i < children.length; i++) {
				var child = children[i];
				var childTreeNode = new Ext.tree.TreeNode({ id: child.id,
									  text: child.text,
									  draggable: false,
									  leaf:child.leaf,
									  expanded: child.expanded,
									  listeners: {
									  	click: function(node, event) {
									  			readCCodes(node);
									  	}
									  }
								});
				nodeToAddChilds.appendChild(childTreeNode);
			}
		}
	}
};
