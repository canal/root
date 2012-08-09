Ext.namespace("casetracking.createpublic.ux.panel.confirmation.Confirmation");
casetracking.createpublic.ux.panel.confirmation.Confirmation = function (config){	
	
	uRadixClientMessageHandler.setAdvice(true,[{"description":"Service Case Created"}]);
	g_showStatusBox();
	
	var emailsText = "";
	if(config.confirmEMail) {
		emailsText+= "<span class='idxmTextMedium'>Details have been emailed to you at:</span><br>";
		emailsText+= "<span class='templateTextNormalBold'>";
		emailsText+= config.confirmEMail;
		emailsText+= "</span><br>";
	}
	
	var createCaseLink = "<a href=\"" + config.createCaseURL + "\" style=\"font: 22px tahoma,arial,verdana,sans-serif;color:black;\" ";
	createCaseLink+= " onclick=\"Ext.get(document.body.id).mask(\'<b> Loading...</b> \', \'x-mask-loading\');\">Open New Service Case</a>";	

	var faxCoverSheetUrl = config.faxCoverSheetUrl;
	var faxCoverSheetData = uRadixUtilities.jsonEncode(config.faxCoverSheetData);
	
	var formPanel =
			new Ext.Panel({
						renderTo: config.formPanelDivID		
						,border: false
						,bodyBorder: false
						,hideBorders: true
						,width: 850
						,items: [{
								  xtype : "panel",
								  border: false,
								  html : "Service Case Number: "+config.caseNumber,
								  style: "font: 22px tahoma,arial,verdana,sans-serif;padding-left: 325;padding-top:20px;"
							      },{
								  xtype : "panel",
								  html : emailsText,
								  style: "padding-left: 325;padding-top:15px;"
							      },{
								  xtype: "panel",
								  layout: "column",
								  items: [{
										  xtype : "panel",
										  border: true,
										  bodyBorder: true,
										  width: 450,
										  columnWidth: .58,
										  style: "padding-left: 200;padding-top:25px;",
										  bodyCssClass: "confirm-box",
										  html: "<table height='152'><tr><td><span style='font: 22px tahoma,arial,verdana,sans-serif;padding-left: 10;padding-top:10px;'>Upload Documents</span></td></tr>"
												+ "<tr><td>&nbsp;</td></tr>"
												+ "<tr><td>&nbsp;</td></tr>"
												+ "<tr><td><span class='idxmTextMedium' style='padding-left: 10;'>You can now associate claims, EOBs, and other</span><br><span class='idxmTextMedium' style='padding-left: 10;'>supporting documentation to the service case.</span></td></tr>"
												+ "<tr><td>&nbsp;</td></tr>"
												+ "<tr><td>&nbsp;</td></tr>"
												+ "<tr><td>&nbsp;</td></tr>"
												+ "<tr><td>&nbsp;</td></tr>"
												+ "<tr><td align='center'><div class='form-upload-icon' style='visibility: visible;' onmouseover='this.style.cursor=\"pointer\";' onclick=\""+config.invokeFileWindowFunction+"();\"'></div></td></tr></table>"
												+ "<tr><td>&nbsp;</td></tr>"
												+ "<tr><td>&nbsp;</td></tr>"
												+ "<tr><td>&nbsp;</td></tr>"	
												+ "</table>"
									      },{
										  xtype : "panel",
										  border: true,
										  bodyBorder: true,
										  width: 425,
										  columnWidth: .42,
										  style: "padding-left: 40;padding-top:25px;",
										  bodyCssClass: "confirm-box",
										  html: "<table height='150'><tr><td><span style='font: 22px tahoma,arial,verdana,sans-serif;padding-left: 10;padding-top:10px;'>Fax Documents</span></td></tr>"
												+ "<tr><td><span class='idxmTextMedium' style='padding-left: 10;'>Fax additional information, along with the Service</span></td></tr>"
												+ "<tr><td><span class='idxmTextMedium' style='padding-left: 10;'>case number, to the appropriate number:</span></td></tr>"									        		  	
												+ "<tr><td>"
												+ "<table>"	
												+ "<tr><td><br></td></tr>"
												+ "<tr><td><span class='idxmTextMedium' style='padding-left: 10;'>Fax number:</span></td><td><span class='idxmTextMedium'>"+config.faxCoverSheetData.faxNumber+"</span></td></tr>"
												+ "<tr><td>&nbsp;</td></tr>"												
												+ "</table>"
												+ "</td></tr>"									        		  	
												+ "<tr><td><br><span class='idxmTextMedium' style='padding-left: 10;'>Click the button below to print out a pre-formatted</span></td></tr>"
												+ "<tr><td><span class='idxmTextMedium' style='padding-left: 10;'>fax cover sheet.</span></td></tr>"
												+ "<tr><td align='center'><div class='form-fax-icon' style='visibility: visible;' onmouseover='this.style.cursor=\"pointer\";' onclick=\"printFaxCoverSheet('"+config.faxCoverSheetUrl+"');\"'></div></td></tr></table>"
									      }]
							      },{
								  xtype: "panel",
								  border: false,
								  style: "padding-left: 400;padding-top:30px;",
								  html: createCaseLink

							      },{
								  xtype : "hidden",
								  id : "faxCoverSheetData",
								  name : "faxCoverSheetData",
								  value : faxCoverSheetData
							      }]		
						});
};

function printFaxCoverSheet(faxCoverSheetUrl) {	
	var faxCoverSheetData = Ext.getCmp('faxCoverSheetData').getValue();
	var faxUrl = faxCoverSheetUrl+"?faxCoverSheetData="+faxCoverSheetData+"&clientType=public";
	var win = window.open(faxUrl,"FaxCoverSheet","width=750,height=500,location=no,status=no,scrollbars=auto,resizable=yes,toolbar=no,menubar=no");
};
