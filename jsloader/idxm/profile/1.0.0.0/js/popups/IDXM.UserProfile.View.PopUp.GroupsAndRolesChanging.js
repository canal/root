
Ext.namespace("IDXM.UserProfile.View.PopUp.GroupsAndRolesChanging");
IDXM.UserProfile.View.PopUp.GroupsAndRolesChanging = function (config){

	Ext.form.Field.prototype.msgTarget = 'sideDetails';

	var windowContainerObject =
		new uRadix.form.FormPanel({
					renderTo:config.renderTo
					,border:false
					,bodyBorder:false
					,hideBorders:true
					,bodyStyle:"padding:5px;"
					,width:config.windowObject.getInnerWidth()
					,items:[{
								xtype:"idxmStatusBox"
								,status:"warning"
								,statusText:'Groups and/or Roles are Changing'
							},{
								xtype:"panel"
								,autoScroll:true
								,height:170
								,contentEl:config.contentEl
								,style:"padding-left:10px; padding-right:10px;"
							},{
								xtype:"panel"
								,layout:"column"
								,border:false
								,bodyBorder:false
								,hideBorders:true
								,items:[{
											columnWidth: .50
											,buttonAlign: 'left'
											,buttons:[{
													text:"CANCEL",
													ctCls :"support-portal-btn-cancel",
													handler:function(){
															config.callBackWrapper();
														}
												}]
										},{
											columnWidth: .50
											,buttonAlign: 'right'
											,buttons:[{
													text:"OK",
													ctCls :"support-portal-btn",
													handler:function(){
															config.callBackWrapper({ok:true});
														}
												}]
										}]
						}]
				});
				
	config.windowObject.setHeight(windowContainerObject.getInnerHeight()+IDXM_POPUP_WINDOW_HEIGHT_ADJUST);					

};
