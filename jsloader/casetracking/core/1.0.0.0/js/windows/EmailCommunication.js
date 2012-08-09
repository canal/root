Ext.namespace("casetracking.core.windows.EmailCommunication");
casetracking.core.windows.EmailCommunication = function (config){	
	
	var emailDescription = "";
	emailDescription+= "<span class='portal-text-medium'>MultiPlan will always send you an email when your service case is created, closed or reopened. <br>";
	emailDescription+= "<br>You can also choose to receive notifications when MultiPlan has added a note to your service case. <br>";
	emailDescription+= "<br>The email will come from Noreplycustserv@Multiplan.com. Be sure this email address is added to your \"safe\" list if you utilize email filters.</span>"

	var win = new Ext.Window({					
				width:425,
				height:215,
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
						        	xtype: "panel"
									,html: "Email Notification"
									,cls:"portal-title"						        	
						        },{
									xtype: "panel"
									,html: emailDescription
									,style: "padding-bottom: 10px;padding-top: 10px;"									
							}]
					}]
			});
	win.show();
};

