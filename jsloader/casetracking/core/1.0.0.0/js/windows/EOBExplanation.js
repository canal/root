Ext.namespace("casetracking.core.windows.EOBExplanation");
casetracking.core.windows.EOBExplanation = function (config){	
	
	var eobDescription = "";
	eobDescription+= "<span class='idxmTextMedium'>Here's some placeholder text for an explanation of how to determine <br>";
	eobDescription+= "which claim or EOB to input when there are multiples.</span>";

	var win = new Ext.Window({					
				width:425,
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
									,html: "Multiple Claim / EOB "
									,cls:"portal-title"						        	
						        },{
									xtype: "panel"
									,html: eobDescription
									,style: "padding-bottom: 10px;padding-top: 10px;"									
							}]
					}]
			});
	win.show();
};

