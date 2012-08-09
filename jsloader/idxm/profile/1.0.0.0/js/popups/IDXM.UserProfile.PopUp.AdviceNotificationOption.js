
Ext.namespace("IDXM.UserProfile.PopUp.AdviceNotificationOption");
IDXM.UserProfile.PopUp.AdviceNotificationOption = function (config){

	var win = new Ext.Window({					
				width:600,
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
								,statusText:"Select Advice Notification Option"
							},{
								xtype:"panel"
								,height:100
								,style:"padding-left:15px;"
								,autoScroll:true
								,html:"<span class='advice-pop-up-message-txt'><BR>You must make a selection for Advice Notification<BR></span><span class='advice-pop-up-description-txt'><br>Select either an email address or fax number.</span>"
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
