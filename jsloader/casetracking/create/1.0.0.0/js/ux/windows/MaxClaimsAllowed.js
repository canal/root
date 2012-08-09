Ext.namespace("casetracking.create.windows.MaxClaimsAllowed");
casetracking.create.windows.MaxClaimsAllowed = function (config){	
	var msg = 'You cannot add more than 20 claims to a single case. For additional<br>claims, you can either open another case, '
		      + 'or you can upload or fax<br>them as part of this case. Fax/upload instructions will be provided<br>on the next screen.';
	if(config.message) {
		msg = config.message;
	}
	var win = new Ext.Window({					
				width:475,
				height:205,
				closable:false,
				modal:true,
				autoScroll:true,
				resizable:false,
				layout:'fit',
				plain:true,
				items:[{
						xtype:"panel"
						,border:false
						,bodyBorder:false
						,hideBorders:true
						,autoScroll:true
						,style:"background-color:#FFFFFF; background:#FFFFFF; padding:5px;"		
						,items:[{
								xtype:"idxmStatusBox"
								,status:"warning"
								,statusText:'Maximum claims added'
							},{
								xtype: "panel"
								,style:"padding-top:25px; padding-bottom:10px;"
								,html: '<div class="portal-text-medium"">'+msg+'</div>'								
							}]
						,buttons:[{
							ctCls : "support-portal-btn"
							,text:"CLOSE"
							,handler:function(){win.close();}
						}]
					}]
			});
	win.show();
};

