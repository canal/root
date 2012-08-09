Ext.namespace("idxm.selfprofile.popups.AdviceNotificationWarning");
idxm.selfprofile.popups.AdviceNotificationWarning = function (config){

	var win = new Ext.Window({					
				width:550,
				height:215,
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
								,statusText:"Advice Notification Address"
							},{
								xtype:"panel"
								,height:100
								,style:"padding-left:15px;"
								,autoScroll:true
								,html:"<span class='advice-pop-up-description-txt'><br><b>"+config.emailOrFax+"</b> is currently where your Advice Notifications are being sent.<br></span><span class='advice-pop-up-description-txt'><br>Before you can delete <b>"+config.emailOrFax+"</b>, please deselect it as your preferred contact method using the Update Advice Notifications link from the home page.</span>"
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
