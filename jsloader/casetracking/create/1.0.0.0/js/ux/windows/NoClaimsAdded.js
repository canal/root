Ext.namespace("casetracking.create.windows.NoClaimsAdded");
casetracking.create.windows.NoClaimsAdded = function (config){	
	var msg = 'You must add a claim or select "No" in the Claim Information section.';
	if(config.message) {
		msg = config.message;
	}
	var win = new Ext.Window({					
				width:475,
				height:175,
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
								,statusText:'Information Needed'
							},{
								xtype: "panel"
								,style:"padding-top:25px; padding-bottom:10px;"
								,html: '<div class="portal-text-medium">'+msg+'</div>'								
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

