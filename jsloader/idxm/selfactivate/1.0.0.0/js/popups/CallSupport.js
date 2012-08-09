Ext.namespace("idxm.selfactivate.popups.CallSupport");
idxm.selfactivate.popups.CallSupport = function (config){

	var win = new Ext.Window({					
				width:400,
				height:200,
				modal:true,
				autoScroll:true,
				closable:false,
				resizable:false,
				layout:'fit',
				plain:true,
				items:[{
					xtype:"panel"
					,border:false
					,bodyBorder:false
					,hideBorders:true
					,style:"background-color:#FFFFFF; background:#FFFFFF; padding:5px;"
					,items:[{
								xtype:"idxmStatusBox"
								,status:"warning"
								,statusText:"Please Call Support"
							},{
								xtype:"panel"
								,autoHeight:true								
								,autoScroll:true
								,html:"<div align='center'><BR><span class='idxm-activate-text-bold'><BR>Please call MultiPlan support<BR><BR><b>877-685-8411</b>.</span></div>"
							}]
					,buttons: [{
									ctCls :"support-portal-btn",
									text: 'CLOSE',
									handler: function(){
										win.hide();
									}
						}]
				}]
			});
	win.show();
};