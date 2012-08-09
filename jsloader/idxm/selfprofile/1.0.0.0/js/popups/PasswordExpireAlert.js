
Ext.namespace("idxm.selfprofile.popups.PasswordExpireAlert");
idxm.selfprofile.popups.PasswordExpireAlert = function (config){

	var win = new Ext.Window({					
				width:400,
				height:175,
				modal:true,
				autoScroll:true,
				closable:false,
				resizable:false,
				layout:'fit',
				plain:true,
				buttonAlign:"center",
				items:[{
					xtype:"panel"
					,border:false
					,bodyBorder:false
					,hideBorders:true
					,style:"background-color:#FFFFFF; background:#FFFFFF; padding:5px;"
					,items:[{
								xtype:"idxmStatusBox"
								,status:"warning"
								,statusText:"Your Password will expire in " + config.passwordExpirationDays + " day"
							},{
								xtype:"panel"
								,height:100
								,style:"padding-left:15px;"
								,autoScroll:true
								,html:"<span class='advice-pop-up-message-txt'><BR>Please update your password.</span>"
							}]
					,buttons: [{
									ctCls :"support-portal-btn",
									text: 'OK',
									handler: function(){
										win.hide();
									}
						}]
				}]
			});
	win.show();
};
