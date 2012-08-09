Ext.namespace("idxm.login.popups.PasswordCanNotReset");
idxm.login.popups.PasswordCanNotReset = function (config){

	var win = new Ext.Window({					
				width:500,
				height:185,
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
								,statusText:"Can not Reset your Password"
							},{
								xtype:"panel"
								,height:100
								,style:"padding-left:15px;"
								,autoScroll:true
								,html:"<span class='advice-pop-up-message-txt'><BR>Your password cannot be reset at this time.  This is most likely because you have already changed your password today.<BR><BR> Please Contact Support at <b>877-685-8411</b> for assistance in resetting your password.</span>"
							}]
					,buttons: [{
									ctCls :"support-portal-btn",
									text: 'OK',
									handler: function(){
										win.close();
									}
						}]
				}]
			});
	win.show();
};
