Ext.namespace("casetracking.update.ux.panel.basic.AdditionalCaseNumbers");
casetracking.update.ux.panel.basic.AdditionalCaseNumbers = function (config){

	var allCaseNumbers = "<table width='100%'>";
	if(config.caseList) {
		for(i = 1; i < config.caseList.length; i++) {
			var caseNumber = "<a class='enduser-application-link' href='" + config.caseNumberPath + config.caseList[i] + "'>" +config.caseList[i] +"</a>";
			allCaseNumbers+= "<tr><td>";
			allCaseNumbers+= caseNumber;
			allCaseNumbers+= "</td></tr>";	
		}	
	}
	allCaseNumbers+= "</table>";
	
	var win = new Ext.Window({					
				width:275,
				height:175,
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
									,html: config.heading
									,cls:"portal-title"						        	
						        },{
									xtype: "panel"
									,html: allCaseNumbers
									,style: "padding-bottom: 10px;padding-top: 10px;"									
							}]
					}]
			});
	win.show();
};

