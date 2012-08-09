Ext.namespace("casetracking.core.windows.WorkersCompExplanation");
casetracking.core.windows.WorkersCompExplanation = function (config){	
	
	var workersCmpDescription = "";
	workersCmpDescription+= "<span class='idxmTextMedium'>If your inquiry is regarding a Workers Comp issue, please be aware<br>";
	workersCmpDescription+= "that any field labeled with  \"Claim\" will also be appropriate for a Bill.<br><br><br>";
	workersCmpDescription+= "For example, in the \"Your Claim #\" field you would supply your Bill<br>";
	workersCmpDescription+= "number.</span>";

	var win = new Ext.Window({					
				width:400,
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
						,items:[
						        {
						        	xtype: "panel"
									,html: "Workers Comp Bills"
									,cls:"portal-title"						        	
						        }
						        ,{
									xtype: "panel"
									,html: workersCmpDescription
									,style: "padding-bottom: 10px;padding-top: 10px;"									
								}
						]
					}]
			});
	win.show();
};

