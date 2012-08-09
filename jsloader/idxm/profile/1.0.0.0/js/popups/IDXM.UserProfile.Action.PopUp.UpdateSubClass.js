
Ext.namespace("IDXM.UserProfile.Action.PopUp.UpdateSubClass");
IDXM.UserProfile.Action.PopUp.UpdateSubClass = function (config){

	var contractorPanel = new IDXM.ux.internalUserContractorPanel({fieldId:"contractorField"+config.nameSpace,hidden:true,disabled:true,ContractorList:config.contractorList});
	var contractorOtherPanel = new IDXM.ux.internalUserContractorOtherPanel({fieldId:"contractorOtherField"+config.nameSpace,hidden:true,disabled:true});
	Ext.getCmp("contractorField"+config.nameSpace).on("select",function(){
							if(this.getValue() == "IDXM_CNTRCT_Other"){
								contractorOtherPanel.enable();
								contractorOtherPanel.show();
								contractorOtherPanel.cascade(function(item){
								  if (item.isFormField) {
									item.enable();
									item.show();
									item.allowBlank=false;
								  }
								});
							}else{
								contractorOtherPanel.disable();
								contractorOtherPanel.hide();
								contractorOtherPanel.cascade(function(item){
								  if (item.isFormField) {
									item.disable();
									item.hide();
									item.allowBlank=true;
								  }
								});
							}
						});

	if(!Ext.isEmpty(config.userData.contractor))
	{
		contractorPanel.enable();
		contractorPanel.show();
		Ext.getCmp("contractorField"+config.nameSpace).enable();
		Ext.getCmp("contractorField"+config.nameSpace).show();
		Ext.getCmp("contractorField"+config.nameSpace).setValue(config.userData.contractor);
	}

	Ext.form.Field.prototype.msgTarget = 'sideDetails';
	
	function formSubmitHandler(){

		Ext.getCmp("nextButton").disable();
		//Get Form
		var formObj = Ext.getCmp("IDXMuserProfileActionPopUpUpdateUserSubClassForm"+config.nameSpace).getForm();

		formObj.submit({
						url: config.urlSubmitAction,
						clientValidation:true,
						isRedirect:true,
						success: function(form,action)
						{
							config.windowObject.close();
							Ext.getCmp("nextButton").enable();

							var _url = window.location.protocol+"//"+window.location.host+window.location.pathname+"?systemUserId="+uRadixUtilities.getParameter(window.location.search,"systemUserId");
							uRadixRedirectHandler.redirect(_url);
						},
						failure: function(form,action)
						{
							//var formResponseJson = uRadixUtilities.jsonDecode(action.response.responseText);
							//if((formResponseJson.advice != undefined) && (formResponseJson.advice != null))
							//{
							//	g_showStatusBox();
							//}

							Ext.getCmp("nextButton").enable();
						}				
		});
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
											,html: "Update Sub-Class"
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
											,id:"IDXMuserProfileActionPopUpUpdateUserSubClassForm"+config.nameSpace
											,labelAlign:"top"
											,autoScroll:true											
											,height:175
											,items:[{
														xtype: "combo",
														fieldLabel: "Sub-Class",
														hiddenName : "userSubClassCode",
														name:"subClassText",
														mode:"local",
														store: new Ext.data.JsonStore({
																fields: ['id', 'name'],
																root : "rows",
																idProperty: "id",
																data:{ "rows":config.subClassDataArray}
														}),
														valueField:"id",
														displayField:'name',
														triggerAction: 'all',
														value:config.userData.userSubClassCode,
														editable:false,
														forceSelection:true,
														selectOnFocus:true,
														width: 200,
														allowBlank:false,
														listeners: {
																render : function(){this.el.dom.name = this.name;}
																,select: function(){
																	if(this.getValue() == IDXM_USER_SUB_CLASS_CONSULTANT){
																		contractorPanel.enable();
																		contractorPanel.show();
																		contractorPanel.cascade(function(item){
																		  if (item.isFormField) {
																			item.enable();
																			item.show();
																			if(item.hiddenName == "contractor"){item.allowBlank=false;}
																		  }
																		});
																	}else{
																		contractorPanel.disable();
																		contractorPanel.hide();
																		contractorPanel.cascade(function(item){
																		  if (item.isFormField) {
																			item.disable();
																			item.hide();
																			item.allowBlank=true;
																		  }
																		});
																	}
																}
														}
													},contractorPanel,contractorOtherPanel]
											,buttonAlign:"right"
											,buttons:[{
														id:"cancelButton"
														,text:"CANCEL"
														,ctCls :"support-portal-btn-cancel"
														,handler:function(){config.windowObject.close();}
													},{
														id:"nextButton"
														,text:"UPDATE"
														,ctCls :"support-portal-btn"
														,handler:formSubmitHandler
													}]
										}]
							}]
				});

	config.windowObject.setHeight(windowContainerObject.getInnerHeight()+IDXM_POPUP_WINDOW_HEIGHT_ADJUST);

};
