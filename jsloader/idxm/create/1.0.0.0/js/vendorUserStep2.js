
Ext.namespace("IDXM.CreateUser.VendorUser.Step2");
IDXM.CreateUser.VendorUser.Step2 = function (config){
	
	//Local Variables
	var userTemplate =IDXM.vendorSingleUserTemplate(config.userData);
	var userTypeForPopUp = IDXM_USER_CLASS_VENDOR;
	
	//Bread Crumbs	      						
	if(config.navigator.breadCrumbs){														
		IDXM.Utilities.BreadCrumbBuilder(config.breadCrumbsDivID,config.navigator.breadCrumbs);
	}
	
	Ext.get(document.body.id).unmask();
	
	//Name and Information Content Panel
	var vendorUserInformationPanel = 
		new Ext.Panel	({
							bodyBorder:false,
							border:false,
							style: "padding-left:10px;",
							frame: false,
							autoScroll:true,
							width:300,
							height:404,
							html:userTemplate
						}); 
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
									,hidden: (config.mirroredUser && (config.mirroredUser != "")) ? true : false
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
									,hidden: (config.mirroredUser && (config.mirroredUser != "")) ? true : false
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
							id:"ViewTreePanelGroupID",							
							frame: false,
							ctCls: "tree-portal-node-no-icon",
							useArrows:true,
							autoScroll:true,
							width:235,
							height:400,
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
							useArrows:true,
							autoScroll:true,
							width:235,
							height:400,
							autoShow:true,
							rootVisible:false,
							containerScroll:true,
							root: treeRoleRootNode
		});					
																		
	//User Panel					
	var vendorUserColumnPanel = 
			new Ext.Panel({																					  
						     layout:'column'								    
						    ,bodyBorder: false						    
						    ,border: false
						    ,hideBorders: true
						    ,width:840						    
						    ,style:"padding-top:10px; padding-bottom:10px;"
						    ,ctCls:"support-portal-panel-head-frame" 
						    ,items: [	{width:10,html:'&nbsp;'}
						    		,{										       										
									width:310													       
									,ctCls:"support-portal-panel-head-frame"															        
									,items:[nameInfoToolbar,vendorUserInformationPanel]
								}
								,{width:10,html:'&nbsp;'}
								,{										       										
									width:510	
									,ctCls:"support-portal-panel-head-frame"																
									,items:[{	xtype:"panel"
												,layout:"column"
												,autoScroll: true														
												,items:[{	
															width:250
															,items:[groupsToolbar,treePanelGroup]
														}
														,{width:5,html:'&nbsp;'}
														,{																	
															width:250
															,items:[rolesToolbar,treePanelRoles]
														}														
												]
											}
									]														        
								}
								,{width:10,html:'&nbsp;'}
							]
						});	
						
	//Submit Function
	function formSubmitHandler() {
		
		var formObj = vendorUserFormPanel.getForm();
		
		if(formObj.isValid())
		{	
			var url = Wizard.PortalContainer.getActionURL("userCreateSubmit");		
			var formValues = formObj.getValues();
			
			Ext.getCmp("saveBtn"+config.nameSpace).disable();

			//Mask Body
			Ext.get(document.body.id).mask("<b> Loading...</b> ", "x-mask-loading");			
	
			formObj.submit({
				url: url,
				isMessageIgnore:true,
				isRedirect:true,
				success: function(form,action)
					{		
                        var formResponseJson = uRadixUtilities.jsonDecode(action.response.responseText);	
						
						if(formResponseJson.payload && formResponseJson.payload != "null"){
							var formPayLoad = uRadixUtilities.jsonDecode(formResponseJson.payload);
							uRadixRedirectHandler.redirect(config.userProfileAdministrationURL+"?systemUserId="+formPayLoad.primaryIdentityIdentifier.sysKey+"&fromUserCreate=true");
						}
					},
				failure: function(form,action)
					{	
						Ext.getCmp("saveBtn"+config.nameSpace).enable();
						Ext.get(document.body.id).unmask();
						
						uRadixWindowManager.uRadixWindowRegistry["generalErrors"+config.nameSpace].autoLoad.params[uRadixWindowManager.MPI_CALLBACK_NAME] = config.thisObjectName+".generalErrorsCallBack";
						uRadixWindowManager.uRadixWindowRegistry["generalErrors"+config.nameSpace].autoLoad.params['statusCollection'] = action.response.responseText;  						
  						uRadixWindowManager.launch({id:"generalErrors"+config.nameSpace, key:"generalErrors"+config.nameSpace});						
					}					
			});			
		}
	}						

	//URadix Form Panel
	Ext.form.Field.prototype.msgTarget = 'sideDetails';
		
	//Form Container Panel
	var vendorUserFormPanel = 
			new uRadix.form.FormPanel({											
							title:"Add Groups & Roles"
							,bodyBorder: true
							,border: true
							,autoScroll: true
							,style:"padding-top:10px;"											
							,ctCls:"support-portal-panel-frame"							
							,items: [vendorUserColumnPanel]																																					
						});	
	
	//Title Container Panel
	var vendorUserDivPanel = 
			new Ext.Panel	({
						title:"Create Vendor User",
						renderTo: config.formPanelDivID,
						bodyBorder: false,
						border: false,
						width: 850,						
						ctCls:"support-portal-panel",
						items:[{id:"idxmMirroredUserHeader", hidden:true, cls:"support-portal-panel-no-frame"},
						       vendorUserFormPanel
						      ],
						buttonAlign: "right",								
						buttons: [{
								  text:"CANCEL",
								  ctCls :"support-portal-btn-cancel",
								  handler:function(){
								  	idxm.core.popups.Cancel({doCancelFunction:jsonFunctionObject.doCancelFunction,noCancelFunction:function(){}});
								  }
							},{
								  id:"saveBtn"+config.nameSpace,
								  text:"SAVE",
								  ctCls :"support-portal-btn",
								  handler:formSubmitHandler
							}]								
					});			

        if(config.mirroredUser && (config.mirroredUser != ""))
        {
          //Show Mirrored User Header
          var tpl = new Ext.XTemplate(
            '<div style="background-color:#ffffcc; height:25px; margin-top:6px; padding-top:8px;">&nbsp;&nbsp;Mirroring User: ',
                '<b>{firstName} {lastName}</b>',
            '</div>'
          );
          tpl.overwrite(Ext.getCmp("idxmMirroredUserHeader").body, config.mirroredUser);
          Ext.getCmp("idxmMirroredUserHeader").show();
        }

	//Draw Group Tree from Session data
	if(config.selectedGroupsArray.length){
		try{ 
			//Show Tree
			IDXM.Utilities.TreeBuilder(config.selectedGroupsArray,treePanelGroup,"Groups");
		}catch(e){}		
	}else{//Default Groups
		treePanelGroup.expandPath(treePanelGroup.getRootNode().getPath());			
	}

	//Draw Role Tree from Session				
	if(config.selectedRolesArray.length){
		try{ 
			//Show Tree
			IDXM.Utilities.TreeBuilder(config.selectedRolesArray,treePanelRoles,"Roles");
		}catch(e){}		
	}else{//Default Roles
		treePanelRoles.expandPath(treePanelRoles.getRootNode().getPath());				
	}
	
	var jsonFunctionObject = {
						
		//Cancel User Call Back									
		 doCancelFunction: function(){

				var url = Wizard.PortalContainer.getActionURL("removeSessionDataAjax");			
				var conn = new Ext.data.Connection();
				conn.request({
				    url: url,
				    method: 'POST',			
				    success: function(responseObject) {				

					var statusCollection = uRadixUtilities.jsonDecode(responseObject.responseText);

					if(statusCollection.status.success){
						Wizard.PortalContainer.navigate({url:"clientUserStep1"});
					}else{
						 Ext.Msg.alert('Status', 'Unable to cancel user.');
					}
				    },
				     failure: function() {
					 Ext.Msg.alert('Status', 'Unable to reset session data.');
				     }
				});			
		},

		//General Errors User Call Back									
		generalErrorsCallBack: function(){					
			Ext.getCmp("generalErrors"+config.nameSpace).close();		
			Wizard.PortalContainer.navigate({url:Wizard.PortalContainer.getInitActionName()});
		},	

		//Draw Group Tree and Close Window
		groupPickerCallBack: function(jsonObject){			
			try{ 
				//Show Tree
				IDXM.Utilities.TreeBuilder(jsonObject.arrayOfGroups,treePanelGroup,"Groups");
			}catch(e){}

			//Close Group Picker Window
			Ext.getCmp("groupPicker"+config.nameSpace).close();		
		},

		//Draw Role Tree and Close Window
		rolePickerPickerCallBack: function(jsonObject){		
			try{ 
				//Show Tree
				IDXM.Utilities.TreeBuilder(jsonObject.arrayOfGroups,treePanelRoles,"Roles");
			}catch(e){}

			//Close Role Picker Window
			Ext.getCmp("rolePicker"+config.nameSpace).close();		
		}	
	
	}
	
	return jsonFunctionObject;
};
