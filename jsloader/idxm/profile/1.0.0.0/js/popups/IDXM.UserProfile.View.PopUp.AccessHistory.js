
Ext.namespace("IDXM.UserProfile.View.PopUp.AccessHistory");
IDXM.UserProfile.View.PopUp.AccessHistory = function (config){

	Ext.form.Field.prototype.msgTarget = 'sideDetails';
	
	var endDateHtml = "";
	if(config.endDate && config.endDate != undefined && config.endDate != null && config.endDate.trim() != ""){
		endDateHtml = "<td width='10'>&nbsp;</td><td><span class='idxmTextSmall'><b>Termination Date:</b> "+config.endDate+"</span></td>"
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
											,html: "Access History - Last " + config.historyPeriod + " Days"
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
											,labelAlign:"top"
											,autoScroll:true
											,items:[{
														xtype:"panel"
														,border:false
														,bodyBorder:false
														,hideBorders:true
														,html:"<table><tr><td><span class='idxmTextSmall'><b>Start Date:</b> "+config.startDate+"</span></td>" + endDateHtml + "</tr></table>"
													},{
														xtype: "panel"
														,height:8
														,border:0
														,style: "boder:none;"
														,bodyBorder:0
														,bodyStyle:"border:none"
														,hideBorders: true
													},{
														xtype:"grid"
														,autoScroll:true
														,height:180
														,buttonAlign: "right"
														,cm:new Ext.grid.ColumnModel({
																		columns:[
																		  {id:'loginDate', header: 'Date', sortable: true, dataIndex:"loginDate"},
																		  {header: 'Log in Time', sortable: true, dataIndex:"loginTime"},
																		  {header: 'Successful', sortable: true, dataIndex:"logonSuccessIndicator",renderer:function(val){if(val){return "Yes"}else{return "No"}}}
																		],
																		defaults: {
																		  sortable: true,
																		  menuDisabled: true
																		}
																	})
														,store:	new Ext.data.Store({
																	reader: new Ext.data.JsonReader({
																				root: 'data',
																				fields: ['loginDate', 'loginTime','logonSuccessIndicator']
																			})
																	,data: {
																				data:config.historyData
																			}
																})
													}]
											,buttonAlign:"right"
											,buttons:[{
														id:"closeButton"
														,text:"CLOSE"
														,ctCls :"support-portal-btn"
														,handler:function(){config.windowObject.close()}
													}]
										}]
							}]
				});
				
	config.windowObject.setHeight(windowContainerObject.getInnerHeight()+IDXM_POPUP_CLOSABLE_WINDOW_HEIGHT_ADJUST);

};
