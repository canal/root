Ext.namespace("casetracking.core.windows.SearchInformation");
casetracking.core.windows.SearchInformation = function (config){	
	
	var searchDescription = "";
	searchDescription+= "<span class='idxmTextMedium'>If you enter a Service Case #, there is no need to enter additional criteria (Service Case Created Dates, Provider Name or Status). <br>";
	searchDescription+= "<br>If you enter both the Service Case # and any other criteria, the search will only use the Service Case # and not return results if no cases match the Service Case #. <br>";
	searchDescription+= "<br>If your Service Case # search yields no results, you might have an incorrect Service Case #. Try your search again using only the other criteria and leave the Service Case # blank.</span>";

	var win = new Ext.Window({					
				width:425,
				height:245,
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
						,items:[
						        {
						        	xtype: "panel"
									,html: "Search"
									,cls:"portal-title"						        	
						        }
						        ,{
									xtype: "panel"
									,html: searchDescription
									,style: "padding-bottom: 10px;padding-top: 10px;"									
								}
						]
					}]
			});
	win.show();
};

