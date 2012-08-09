Ext.namespace("casetracking.update.ux.panel.basic.ReOpenCase");
casetracking.update.ux.panel.basic.ReOpenCase = function (config){	

	function formSubmitHandler() {
		// Get Form
		var reopenReason = Ext.getCmp('reopenReasonIdCombo').getValue();
		if(reopenReason == '') {
			return;
		}
		var formObj = Ext.getCmp("casetrackingCaseUpdateReopenCasePanelForm" + config.nameSpace).getForm();		
		Ext.get('ReOpenCaseWindow').mask('<b> Re-opening Service Case...</b>', 'x-mask-loading');		
		g_hideStatusBox();
		Ext.Ajax.request({
			   url: reopenCaseSubmit,
			   isRedirect:true,
			   params: {caseNumber: aCase.caseNumber,eventTypeReasonCode: reopenReason},
			   success : function(form, action) {
				   Ext.get('ReOpenCaseWindow').unmask();
				   formPanel.removeAll();
				   window.location = window.location;			  		
			   },			   
			   failure: function(result, request)
			   	    {
						g_showStatusBox();
						Ext.getCmp("updateButton" + config.nameSpace).enable();
						Ext.get('ReOpenCaseWindow').unmask();
			   	    }
			});			
	};
	
	var caseEventList = [{"id":"","name":"- Select a Reason -"}].concat(config.caseEventList);
	var win = new Ext.Window({					
				width:350,
				height:275,
				modal:true,
				autoScroll:true,
				resizable:false,
				layout:'fit',
				plain:true,
				id: 'ReOpenCaseWindow',
				items:[{
						xtype:"panel"
						,border:false
						,bodyBorder:false
						,hideBorders:true
						,autoScroll:true
						,style:"background-color:#FFFFFF; background:#FFFFFF; padding:5px;"		
						,items:[{
						        	xtype: "panel",
									layout : "form",
									border : false,
									bodyBorder : false,
									hideBorders : true,
									items: [									        
									        {
								          		xtype : "uRadix.form.FormPanel",
								          		autoScroll : true,
								          		id : "casetrackingCaseUpdateReopenCasePanelForm"+config.nameSpace,
												formObjectName : "Ext.getCmp('casetrackingCaseUpdateReopenCasePanelForm"
														+ config.nameSpace + "')",	
												items: [{
												        	xtype: "panel"
															,html: "Select Reason"
															,cls:"portal-title"		
															,border : false
															,bodyBorder : false
															,hideBorders : true																
												        },{
															xtype: "panel"
															,html: "In order to reopen this service case you must select a reason."
															,style: "padding-top: 10px;"	
															,border : false
															,bodyBorder : false
															,hideBorders : true																	
												        }	
									        	        ,{
									        	        	xtype: "panel",
									        	        	layout : "form",	
									        	        	border: false,
									        	        	labelAlign: "top",
									        	        	items : [{
										  								xtype: "resizable-combo",
										  								mode:"local",			  									
										  								fieldLabel: "",			  									
										  								hiddenName : "eventTypeReasonCode",
										  								msgTarget:"under",
										  								name:"eventTypeReasonName",	
										  								id:"reopenReasonIdCombo",
										  								store: new Ext.data.JsonStore({
										  										fields: ['id', 'name'],
										  										root : "rows",
										  										idProperty: "id",
										  										data:{ "rows":caseEventList}
										  								}),
										  								valueField:"id",
										  								emptyText: "- Select One -",
										  								displayField:'name',
										  								triggerAction: 'all',
										  								editable:false,
										  								forceSelection:false,
										  								selectOnFocus:true,
										  								//width: 200,
										  								listeners: {
										  										render : function(){this.el.dom.name = this.name;}
										  									}
										  								,typeAhead:true
										  								,typeAheadDelay:0
									  							  	 }]
									        	          }
												        ,{
															xtype : "panel",
															border : false,
															layout : "column",
															style: "padding-top: 60px;",
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
																			win.close();
																		}
																	}											
																} ]
															}, {
																border : false,
																columnWidth : .50,
																bodyBorder : false,
																hideBorders : true,
																items : [ {
																	id : "updateButton" + config.nameSpace,
																	xtype: "button",
																	text: "REOPEN",
																	style: "padding-top: 35px;float: right;",
																	ctCls : "support-portal-btn",
																	handler : formSubmitHandler
																} ]
															},{
																xtype: "hidden",
																id: "caseNumber",
																name: "caseNumber",
																value: config.caseNumber
															}]
														}]
									        }]
						        }]
			        	,listeners : {
							uradix_enterkey : formSubmitHandler
						}
					}]
			});
	win.show();
	
	var formPanel = Ext.getCmp("casetrackingCaseUpdateReopenCasePanelForm"+config.nameSpace);
	var isFormPanelDirty = false;
	formPanel.getForm().items.each(function(f){
		f.on("change",function(){
			isFormPanelDirty = true;
		});
	});					

	var jsonObject = {
		doCancel:function(){
			win.close();
		},
		noCancel:function(){}	
	};	
	this.jsonObject = jsonObject;	
};

