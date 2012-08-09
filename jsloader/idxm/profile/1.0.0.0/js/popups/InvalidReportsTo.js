
Ext.namespace("idxm.profile.popups.InvalidReportsTo");
idxm.profile.popups.InvalidReportsTo = function (firstName,lastName){

	var win = new Ext.Window({					
				width:450,
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
								,statusText:"User Does Not Have a Valid Reports To"
							},{
								xtype:"panel"
								,height:100
								,style:"padding-left:15px;"
								,autoScroll:true
								,html:"<span><BR><b>" + firstName + " " + lastName + "</b> does not currently have a valid 'Reports To'.<br><br>A valid 'Reports To' must be selected in order to mirror this user.</span>"
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
