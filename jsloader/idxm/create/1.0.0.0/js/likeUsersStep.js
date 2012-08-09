
// Begin: Extend component
Ext.namespace("IDXM.LikeUsersStep");
IDXM.LikeUsersStep = Ext.extend(Ext.Panel, {

			//Cancel User Window Call Back									
			cancelUser: function (action){
				if(action){
					//Close Window
					Ext.getCmp("cancelUser<portlet:namespace/>").close();

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
					Ext.getCmp("cancelUser<portlet:namespace/>").close();
				}
			},
			
			viewUserWindow: function(userID){
				return "<a class='edit-icon' href='javascript:launchUserProfileWindow(\"" + userID + "\")'><div class='edit-icon'>&nbsp;</div></a>";
			},
			
			launchUserProfileWindow: function(userID){		 
				 window.open ("<%=userProfileAdministrationURL%>?systemUserId="+userID,"User Profile Admin","status=1,toolbar=1,height=500,width=600");
			},			
			

			// initComponent
			initComponent : function() {	
			
				var LikeUsersStepObject = this.LikeUsersStepObject;
				var templateString;
				var store;
				var colModel;
				var sm = new Ext.ux.grid.RadioSelectionModel({singleSelect:true, width:25});


				//If we have this.userData
				if(this.userData && this.likeUsersList){	

					//For Person Like Users
					if(this.userData.userTypeCode == IDXM_USER_TYPE_PERSON){

						var likeUsersArray = new Array();
						for(i=0;i<this.likeUsersList.length;i++){
							likeUsersArray[i] = {};
							likeUsersArray[i]['id'] = this.likeUsersList[i].primaryIdentityIdentifier.sysKey;
							likeUsersArray[i]['name'] = this.likeUsersList[i].firstName + " " + this.likeUsersList[i].lastName;
							for(j=0;j<this.likeUsersList[i].contactDetails.emailList.length;j++){
								if(this.likeUsersList[i].contactDetails.emailList[j].primary){
									likeUsersArray[i]['email'] = this.likeUsersList[i].contactDetails.emailList[j].emailAddress;
								}
							}
							//For Interna Like Users
							if(this.userData.userClassCode == IDXM_USER_CLASS_INTERNAL){	
								likeUsersArray[i]['location'] = this.likeUsersList[i].location.locationName;
								likeUsersArray[i]['department'] = this.likeUsersList[i].department.departmentName;
							}
							likeUsersArray[i]['status'] = this.likeUsersList[i].primaryIdentityStatus.statusName;
							likeUsersArray[i]['userClassCode'] = this.likeUsersList[i].userClassCode;
							likeUsersArray[i]['userTypeCode'] = this.likeUsersList[i].userTypeCode;
						}

						likeUsersJson = {data:likeUsersArray};			


						//For Interna Like Users
						if(this.userData.userClassCode == IDXM_USER_CLASS_INTERNAL){		
							templateString = IDXM.internalPersonUserTemplate(this.userData);

							colModel = new Ext.grid.ColumnModel({
								columns:[
								  sm,
								  {id:'name', header: 'Name', sortable: true, dataIndex:"name"},
								  {header: 'Location', sortable: true, dataIndex:"location"},
								  {header: 'Department', sortable: true, dataIndex:"department"},
								  {header: 'Status', sortable: true, dataIndex:"status"},
								  {header: '', sortable: true, dataIndex:"id", renderer:eval(LikeUsersStepObject.viewUserWindow)}
								],
								defaults: {
								  sortable: true,
								  menuDisabled: true
								}
							});

							store = new Ext.data.Store({												
											reader: new Ext.data.JsonReader({
											    root: 'data',
											    totalProperty: 'totalCount',
											    idProperty: 'id',
											    fields: ['id','name', 'location', 'department', 'status','userClassCode','userTypeCode']
											})						
											,data:likeUsersJson
										});
						}

						//For Client Like Users
						if(this.userData.userClassCode == IDXM_USER_CLASS_CLIENT){

							templateString = IDXM.clientSingleUserTemplate(this.userData);

							colModel = new Ext.grid.ColumnModel({
								columns:[
								  sm,
								  {id:'name', header: 'Name', sortable: true, dataIndex:"name"},
								  {header: 'Email', sortable: true, dataIndex:"email"},
								  {header: 'Status', sortable: true, dataIndex:"status"},
								  {header: '', sortable: true, dataIndex:"id", renderer:eval(LikeUsersStepObject.viewUserWindow)}
								],
								defaults: {
								  sortable: true,
								  menuDisabled: true
								}
							});

							store = new Ext.data.Store({												
											reader: new Ext.data.JsonReader({
											    root: 'data',
											    totalProperty: 'totalCount',
											    idProperty: 'id',
											    fields: ['id','name', 'email', 'status','userClassCode','userTypeCode']
											})
											,data: likeUsersJson							
								});													
						}

						//For Vendor Like Users
						if(this.userData.userClassCode == IDXM_USER_CLASS_VENDOR){	
							templateString = IDXM.vendorSingleUserTemplate(this.userData);

							colModel = new Ext.grid.ColumnModel({
								columns:[
								  sm,
								  {id:'name', header: 'Name', sortable: true, dataIndex:"name"},
								  {header: 'Email', sortable: true, dataIndex:"email"},
								  {header: 'Status', sortable: true, dataIndex:"status"},
								  {header: '', sortable: true, dataIndex:"id", renderer:eval(LikeUsersStepObject.viewUserWindow)}
								],
								defaults: {
								  sortable: true,
								  menuDisabled: true
								}
							});

							store = new Ext.data.Store({
								reader: new Ext.data.JsonReader({
								    root: 'data',
								    totalProperty: 'totalCount',
								    idProperty: 'id',
								    fields: ['id','name', 'email', 'status','userClassCode','userTypeCode']
								})
								,data: likeUsersJson
							});													
						}

					}//End of Person Like Users
				}				

				// Apply to this component
				Ext.apply(this, {
							border:false
							,bodyBorder:false
							,hideBorders:true
							,bodyStyle:"padding:5px;"
							,items:[{
									xtype:"panel"
									,border: false
									,bodyBorder:false
									,hideBorders:true
									,items:[{
											xtype:"idxmStatusBox"
											,status:"warning"
											,statusText:this.statusText
										},{
											xtype: "panel"
											,height:8
											,border:0
											,style: "boder:none;"
											,bodyBorder:0
											,bodyStyle:"border:none"
											,hideBorders: true
										},{	
											xtype: "panel"
											,bodyBorder: false
											,border: false
											,hideBorders: true
											,autoScroll:true
											,style:"padding-left:10px; padding-right:10px;"
											,html:this.htmlText
										},{
											xtype:"panel"
											,layout:'column'								    
											,bodyBorder: false						    
											,border: false
											,hideBorders: true
											,frame:false
											,style:"padding-left:10px; padding-right:10px;"
											 ,ctCls:"idxmPanel"
											,items:[{
													columnWidth:.69,
													style: "border:1px; border-style:solid; border-color:#dddddd; padding-top:10px; padding-left:20px; padding-right:20px; padding-bottom:10px;",
													items:[{
															xtype: 'idxmLikeUsersGrid'
															,id: 'likeUserGrid<portlet:namespace/>'
															,title: '<b>Like Users</b>'
															,colModel: colModel					
															,store: store
															,width:530
															,height: 450
															,autoScroll:true					
															,buttonAlign: "right"
															,buttons: [{
																    text:"CANCEL"
																    ,type:"button"
																    ,handler:function(){
																	uRadixWindowManager.launch({id:"cancelUser<portlet:namespace/>", key:"cancelUser<portlet:namespace/>"});						    
																    }
																    ,ctCls:"support-portal-btn-cancel"
																},
																{
																    text:"CONTINUE WITH SELECTED USER"
																    ,type:"button"
																    ,handler:function(){
																	var getSelectedRecord = Ext.getCmp("likeUserGrid<portlet:namespace/>").getSelectionModel().getSelected();
																	if(getSelectedRecord){

																		var userClassCode = getSelectedRecord.data.userClassCode;
																		var userTypeCode = getSelectedRecord.data.userTypeCode;
																		var systemUserId = getSelectedRecord.id;

																		//Reset Session
																		var conn = new Ext.data.Connection();
																		conn.request({
																		    url: Wizard.PortalContainer.getActionURL("removeSessionDataAjax"),
																		    method: 'POST',			
																		    success: function(responseObject) {									    
																			uRadixCookieManager.createCookie(uRadixCookieManager.MPI_COOKIE_NAME+"systemUserId", systemUserId, 1);
																			uRadixRedirectHandler.redirect("<%=userProfileAdministrationURL%>?systemUserId="+systemUserId);

																		    },
																		     failure: function() {
																			 Ext.Msg.alert('Status', 'Unable to reset session data.');
																		     }
																		}); 						    		

																	}else{
																		Ext.MessageBox.alert('Status', 'Please select a Like User.');
																	}

																    }
																    ,ctCls:"support-portal-btn"
																}]
														}] // end items
											    },
											    {columnWidth:.01, html:"&nbsp"},
											    {
											      columnWidth:.3,
											      style: "border:1px; border-style:solid; border-color:#dddddd; padding-top:10px; padding-left:20px; padding-right:20px; padding-bottom:10px;",
											      items:[{
													title: '<b>New User</b>'
													,width:"auto"
													,height: 450
													,html: templateString
													,bodyStyle:"padding-left:15px; padding-right:15px; background-color:#eeeeee;"
													,buttonAlign: "right"
													,buttons: [{
														    text:"CONTINUE WITH NEW USER"
														    ,type:"button"
														    ,handler:function(){	    	

															//Set Like Users Continue
															var conn = new Ext.data.Connection();
															conn.request({
															    url: Wizard.PortalContainer.getActionURL("likeUserContinue"),
															    method: 'POST',			
															    success: function(responseObject) {				
																	var statusCollection = uRadixUtilities.jsonDecode(responseObject.responseText);
																	if(!statusCollection.status.success){			
																		Ext.Msg.alert('Status', 'Unable to Set Like Users Continue.');
																	}
															    },
															     failure: function() {
																 Ext.Msg.alert('Status', 'Unable to reset session data.');
															     }
															}); 

															if(this.userData.userClassCode == IDXM_USER_CLASS_INTERNAL){
																Wizard.PortalContainer.navigate({url:"internalUserStep2"});
															}else if(this.userData.userClassCode == IDXM_USER_CLASS_CLIENT){
																Wizard.PortalContainer.navigate({url:"clientUserStep2"});
															}else if(this.userData.userClassCode == IDXM_USER_CLASS_VENDOR){
																Wizard.PortalContainer.navigate({url:"vendorUserStep2"});
															}				    

														    }
														    ,ctCls:"support-portal-btn"
												  }]
											      }]
											    }]
										}]
								}]
						});
						

				// Apply to this component configuration
				Ext.apply(this.initialConfig, {
								layout: this.layout
								,style: this.style
							    	,bodyBorder: this.bodyBorder
							    	,border: this.border
							    	,width: this.width															
								,items: this.items
						});

				// call parent initComponent
				IDXM.LikeUsersStep.superclass.initComponent.call(this);
			}

});
// End: Extend component

// Register component as xtype
Ext.reg('IDXM-LikeUsersStep', IDXM.LikeUsersStep);
