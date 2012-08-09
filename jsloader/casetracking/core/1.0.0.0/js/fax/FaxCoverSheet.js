Ext.namespace("casetracking.core.fax.FaxCoverSheet");
casetracking.core.fax.FaxCoverSheet = function (config){	
	
	function faxCoverSheetTemplate (dataRecord){
		
		//This is the actual Template
		var t = new Ext.XTemplate(
				'<table width="100%">'
				,'<tr>'
				,'<td align="center">'
				,'<table width="60%">'
					,'<tr><td></td></tr>'
					,'<tr><td><br></td></tr>'
					,'<tr><td><br></td></tr>'
					,'<tr><td><br></td></tr>'
					,'<tr>'
						,'<td colspan="2" align="center">'
							,'<div style="font-size:18.0pt;font-family:Arial">Customer Service Portal Fax Cover Sheet</div>'
						,'</td>'
					,'</tr>'
					,'<tr><td><br></td></tr>'
					,'<tr><td><br></td></tr>'
					,'<tr>'
						,'<td>'
							,'<table width="100%" border="1" cellpadding="0" cellspacing="0">'
								,'<tr>'
									,'<td style="width: 50%;">'
										,'<div style="padding: 5px;font-size:20.0pt;font-family:Arial">Sent To:</div>'
									,'</td>'
									,'<td style="width: 50%;">'
										,'<div style="padding: 5px;font-size:20.0pt;font-family:Arial">Sent From:</div>'
									,'</td>'								
								,'</tr>'
								,'<tr>'
									,'<td style="width: 50%;">'
										,'<div style="padding: 5px;"><b><span style="font-size:12.0pt;font-family:Arial">Name: </span></b><span style="font: 12px tahoma,arial,verdana,sans-serif;">Service Operations</span></div>'
									,'</td>'
									,'<td style="width: 50%;">'
										,'<div style="padding: 5px;"><b><span style="font-size:12.0pt;font-family:Arial">Sender Name: </span></b></div>'
									,'</td>'								
								,'</tr>'
								,'<tr>'
									,'<td style="width: 50%;">'
										,'<div style="padding: 5px;"><b><span style="font-size:12.0pt;font-family:Arial">Fax: </span></b><888-850-7604 for MPI cases<br>&nbsp;or 855-235-4755 for Viant cases></div>'
									,'</td>'
									,'<td style="width: 50%;">'
										,'<div style="padding: 5px;"><b><span style="font-size:12.0pt;font-family:Arial">Client Name: </span></b></div>'
									,'</td>'								
								,'</tr>'	
								,'<tr>'
									,'<td style="width: 50%;">'
										,'<div style="padding: 5px;"><b><span style="font-size:12.0pt;font-family:Arial">Telephone: </span></b></div>'
									,'</td>'
									,'<td style="width: 50%;">'
										,'<div style="padding: 5px;"><b><span style="font-size:12.0pt;font-family:Arial">Date: </span></b><span style="font-size:12.0pt;font-family:Arial">{currentDate}</span></div>'
									,'</td>'								
								,'</tr>'
								,'<tr>'
									,'<td style="width: 50%;">'
										,'<div style="padding: 5px;"><b><span style="font-size:12.0pt;font-family:Arial">Re: </span></b>{caseNumber}</div>'
									,'</td>'
									,'<td style="width: 50%;">'
										,'<div style="padding: 5px;"></b><span style="font-size:12.0pt;font-family:Arial">Client Fax #: </span></b></div>'
									,'</td>'								
								,'</tr>'
								,'<tr>'
									,'<td style="width: 50%;">'
										,'<div style="padding: 5px;"><b><span style="font-size:12.0pt;font-family:Arial"># of Pages: </span></b></div>'
									,'</td>'
									,'<td style="width: 50%;">'
										,'<div style="padding: 5px;"><b><span style="font-size:12.0pt;font-family:Arial">Client Phone #: </span></b></div>'
									,'</td>'								
								,'</tr>'							
							,'</table>'
						,'</td>'
					,'</tr>'					
				,'</table>'
				,'</td>'
				,'</tr>'
				,'<tr><td></td></tr>'
				,'<tr><td></td></tr>'
				,'<tr><td></td></tr>'
				,'<tr>'
				,'<td align="center">'
				,'<table width="60%">'
					,'<tr>'
						,'<td>'
							,'<div style="padding: 5px;"><span style="font-size:12.0pt;font-family:Arial">This fax includes documents related to:</span></div>'
						,'</td>'
					,'</tr>'
					,'<tr><td><br></td></tr>'
					,'<tr>'
						,'<td>'
							,'<div style="padding: 5px;"><b><span style="font-size:12.0pt;font-family:Arial">Case Reference Number: </span></b>{caseNumber}</div>'
						,'</td>'
					,'</tr>'
					,'<tr><td><br></td></tr>'
					,'<tr>'
						,'<td>'
							,'<div style="padding: 5px;"><b><span style="font-size:12.0pt;font-family:Arial">Provider / Facility Name: </span></b></div>'
						,'</td>'
					,'</tr>'
					,'<tr><td><br></td></tr>'
					,'<tr>'
						,'<td>'
							,'<div style="padding: 5px;"><b><span style="font-size:12.0pt;font-family:Arial">Parent Client ID: </span></b></div>'
						,'</td>'
					,'</tr>'					
				,'</table>'
				,'</td>'
				,'</tr>'
				,'</table>'
				);
		
		var currentDate = new Date();
		var month = currentDate.getMonth() + 1;
		
		var currentDateText = month;
		currentDateText+= "/";
		currentDateText+= currentDate.getDate();
		currentDateText+= "/";
		currentDateText+= currentDate.getFullYear();
		currentDateText+= "</span>"	;
		
		//Pass data to template
		var templateString = t.apply(	 
				{	
					currentDate: currentDateText
					,caseNumber: config.caseNumber
				}
		);	
		
		return templateString;
		
	} // end template function
	
	var win = new Ext.Window({					
				width:750,
				height:650,
				modal:true,
				autoScroll:true,
				maximizable:true,
				layout:'fit',
				plain:true,
				items:[{
						xtype:"panel"						
						,bodyBorder:false
						,border: false
						,hideBorders:true
						,style:"background-color:#FFFFFF; background:#FFFFFF; padding:5px;"	
						,html: faxCoverSheetTemplate({})
					}]
			});
	win.show();
};

