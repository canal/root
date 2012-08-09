Ext.namespace("casetracking.core.windows.ClaimSearchInformation");
casetracking.core.windows.ClaimSearchInformation = function (config){	
	
	var searchDescription = "";
	searchDescription+= "<span class='idxmTextMedium'>For First Name, Last Name and Provider Name you can use a wild card search. <br>";
	searchDescription+= "<br>Put an * in the word you want completed and we'll fill in the blanks. You must<br>use at least two characters before the *.<br>";
	searchDescription+= "<br>Example: smi* would return Smith, Smithens and Smithson.</span>";

	var win = new Ext.Window({					
				width:525,
				height:190,
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
									,html: "Claim Search Tips"
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

