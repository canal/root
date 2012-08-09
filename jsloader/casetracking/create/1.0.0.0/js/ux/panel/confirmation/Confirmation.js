Ext.namespace("casetracking.create.ux.panel.confirmation.Confirmation");
casetracking.create.ux.panel.confirmation.Confirmation = function (config){	
	
	uRadixClientMessageHandler.setAdvice(true,[{"description":"Service Case(s) Created"}]);
	g_showStatusBox();
	
	var caseArray = config.caseArray;	
	
	var emailsText = "";
	if(config.confirmEMail && config.confirmEMail.length > 0) {
		emailsText+= "<span class='portal-text-tiny'>Details have been emailed to you at:</span>"
		for(var i = 0; i < config.confirmEMail.length; i++) {
			var email = config.confirmEMail[i];
			if(email != null && email != undefined) {
				emailsText+= "<br><span class='portal-text-tiny-bold'>";
				emailsText+= email;
				emailsText+= "</span>";
			}				
		}
	}	
	
	function getHorizontalBarPanel(){
		return new Ext.Panel({cls : "portal-title"});
	};	
	
	function getClaimList(_caseObject){
		
		var claimList = _caseObject.claimList;
		var arrayOfClaims= new Array();
		var listOfClaims = "";		
		
		function getClaimNumber(_claimIdentifier){
			if(_claimIdentifier && _claimIdentifier.length){
				for(var i=0;i<_claimIdentifier.length;i++){
					if(_claimIdentifier.length == 1){
						arrayOfClaims[arrayOfClaims.length]=Ext.util.Format.htmlEncode(_claimIdentifier[i].claimNumber);
					}else if(_claimIdentifier.length == 2 && _claimIdentifier[i].claimNumberSource == "MPI"){
						arrayOfClaims[arrayOfClaims.length]=Ext.util.Format.htmlEncode(_claimIdentifier[i].claimNumber);
					}
				}
			}
		};

		if(claimList && claimList.length){
			for(var i=0;i<claimList.length;i++){
				getClaimNumber(claimList[i].claimIdentifierList);				
			}
		}
		for(var i=0;i<arrayOfClaims.length;i++){
			if((i>0)&&(!Ext.isEmpty(arrayOfClaims[i]))){
				if(!Ext.isEmpty(listOfClaims)){
					listOfClaims +=", ";
				}
			}			
			listOfClaims +=arrayOfClaims[i];			
		}		
		
		return listOfClaims;
	};
	
	function casePanel(_config){	
		var serviceCaseLinkId = Ext.id();
		var uploadCaseButtonId = Ext.id();	
		var faxCoverSheetButtonId = Ext.id();
		var caseObject = _config.caseObject;		

		var claimListText="";
		var claimList = getClaimList(caseObject);
		if(claimList){
			claimListText = "<p class='portal-text-tiny'>Service case includes claims:<BR>"+claimList+"</p>"
		}
		
		var faxPanel;		
		var caseLink = "<tr><td valign='top' height=125><p><a class='portal-link-medium' href='#' id="+serviceCaseLinkId+">Service Case #:<BR>"+caseObject.caseNumber+"</a></p><p>"+emailsText+"</p>"+claimListText+"</td></tr>";
		var casePanel = null
		if((config.isAuthenticated && config.isAuthenticated == true) 
				|| config.clientType == undefined || config.clientType != "public") {	
			faxPanel = {
					  xtype : "panel",
					  border: true,
					  bodyBorder: true,
					  columnWidth: .33,
					  style: "padding-left:10;",
					  bodyCssClass: "confirm-box",
					  html: 	"<table height='175'  border=0  width=100%>"
							+ "<tr><td valign='top' height=125><p class='portal-text-medium-bold'>Fax Documents</p><p class='portal-text-small'>Fax additional information, along with the service case number, to the below number:</p><p class='portal-text-small'>Fax number:"+faxCoverSheetData.faxNumber+"</p><p class='portal-text-small'>Click the button below to print out a pre-formatted fax cover sheet.</p></td></tr>"
							+ "<tr><td align='center' height=50><p><div class='form-fax-icon' id="+faxCoverSheetButtonId +" style='visibility:visible;' onmouseover='this.style.cursor=\"pointer\";''></div></p></td></tr>"
							+ "</table>",
					listeners:{
						afterrender:function(){
							var faxCoverSheetButton = Ext.get(faxCoverSheetButtonId);
							faxCoverSheetButton.on("click",function(){
								var faxCoverSheetData = _config.faxCoverSheetData;	
								var faxCoverSheetUrl = _config.faxCoverSheetUrl;
								faxCoverSheetData["caseNumber"]=caseObject.caseNumber;
								faxCoverSheetData["providerType"]=caseObject.caseProvider.providerType;
								faxCoverSheetData["facGroupName"]=caseObject.caseProvider.organizationName;
								faxCoverSheetData["pracFirstName"]=caseObject.caseProvider.firstName;
								faxCoverSheetData["pracLastName"]=caseObject.caseProvider.lastName;	
								faxCoverSheetData["primaryParentCCode"]=(caseObject.accessClient.ccode && caseObject.accessClient.ccode.length > 0 ? caseObject.accessClient.ccode.toUpperCase() : '');			
								var faxUrl = faxCoverSheetUrl+"?faxCoverSheetData="+uRadixUtilities.jsonEncode(faxCoverSheetData);
								faxUrl = faxUrl.replace('&', '%26');
								if(config.clientType == "public"){
									faxUrl +="&clientType=public";
								}
								faxUrl += "&userClassCode="+_config.userClass;
								var win = window.open(faxUrl,"FaxCoverSheet","width=750,height=500,location=no,status=no,scrollbars=auto,resizable=yes,toolbar=no,menubar=no");													
							});													
						}								
					}					
					
				};			
			casePanel = 
				new Ext.Panel({
							border:false
							,items:[{
										  xtype:"panel",
										  layout:"column",
										  border:false,
										  items: [{
												  xtype : "panel",
												  border: false,
												  bodyBorder: false,
												  columnWidth: .33,
												  style: "padding-left:10;",
												  html: 	"<table height='175' border=0 width=100%>"
														+ caseLink
														+ "<tr><td align='center' height=50><p></p></td></tr>"
														+ "</table>"
											      },{
												  xtype : "panel",
												  border: true,
												  bodyBorder: true,
												  columnWidth: .34,
												  style: "padding-left:10;",
												  bodyCssClass: "confirm-box",
												  html: 	"<table height='175' border=0  width=100%>"
														+ "<tr><td valign='top' height=125><p class='portal-text-medium-bold'>Upload Documents</p><p class='portal-text-small'>You can now associate claims, EOBs, and other supporting documentation to the service case.</p></td></tr>"
														+ "<tr><td align='center' height=50><p><div id='"+uploadCaseButtonId+"' class='form-upload-icon' style='visibility:visible;' onmouseover='this.style.cursor=\"pointer\";'></div></p></td></tr>"
														+ "</table>",
												  listeners:{
													afterrender:function(){
														var serviceCaseLink = Ext.get(serviceCaseLinkId);
														
														if(serviceCaseLink){
															serviceCaseLink.on("click",function(){														
																Ext.get(document.body.id).mask("Opening Service Case <b>"+caseObject.caseNumber+"</b> ", "x-mask-loading");
																document.location = config.viewCaseURL+"?caseNumber="+caseObject.caseNumber;
															});
														}

														var uploadCaseButton = Ext.get(uploadCaseButtonId);
														uploadCaseButton.on("click",function(){
															config.invokeFileWindowFunction.call(this,{caseNumber:caseObject.caseNumber});
														});												
													}								
												}											
											      },faxPanel]																			
									      }
									      ,{
											  xtype : "hidden",
											  id : "faxCoverSheetData",
											  name : "faxCoverSheetData",
											  value : faxCoverSheetData
									      }
								     ]
							});
		} else {
			var loginLink = "<a href=\"" + config.loginUrl + "\" style=\"font: 14px tahoma,arial,verdana,sans-serif;color:green;\" ";
			loginLink+= " onclick=\"Ext.get(document.body.id).mask(\'<b> Loading...</b> \', \'x-mask-loading\');\">Log-in to your new account to upload claims and EOBs</a>";							
			var createCaseLinkPanel ={border:false,bodyBorder:false};
			if(config.clientType == "public"){
				caseLink ="<tr><td valign='top' height=85><p class='portal-text-large'>Service Case #:<BR>"+caseObject.caseNumber+"</p><p>"+emailsText+"</p>"+claimListText+"</td></tr>";				
				createCaseLinkPanel = 
				{
					  xtype: "panel",
					  border: false,
					  style: "padding-left: 400;padding-top:30px;",
					  html: "<a href=\"" + config.createCaseURL + "\" style=\"font: 22px tahoma,arial,verdana,sans-serif;color:black;\" onclick=\"Ext.get(document.body.id).mask(\'<b>Going to: Open a Customer Service Case...</b> \', \'x-mask-loading\');\">Open a Customer Service Case</a>"
			      };			
			}
			faxPanel = {
					  xtype : "panel",
					  border: false,
					  bodyBorder: false,
					  columnWidth: .33,
					  style: "padding-left:10;padding-top:10;",
					  html: 	"<table height='175'  border=0  width=100%>"
							+ "<tr><td valign='top' height=125><p class='portal-text-medium-bold'>Fax Documents</p><p class='portal-text-small'>Fax additional information, along with the service case number, to the below number:</p><p class='portal-text-small'>Fax number:"+faxCoverSheetData.faxNumber+"</p><p class='portal-text-small'>Click the button below to print out a pre-formatted fax cover sheet.</p></td></tr>"
							+ "<tr><td align='center' height=50><p><div class='form-fax-icon' id="+faxCoverSheetButtonId +" style='visibility:visible;' onmouseover='this.style.cursor=\"pointer\";''></div></p></td></tr>"
							+ "</table>",
					listeners:{
						afterrender:function(){
							var faxCoverSheetButton = Ext.get(faxCoverSheetButtonId);
							faxCoverSheetButton.on("click",function(){
								var faxCoverSheetData = _config.faxCoverSheetData;	
								var faxCoverSheetUrl = _config.faxCoverSheetUrl;
								faxCoverSheetData["caseNumber"]=caseObject.caseNumber;
								faxCoverSheetData["providerType"]=caseObject.caseProvider.providerType;
								faxCoverSheetData["facGroupName"]=caseObject.caseProvider.organizationName;
								faxCoverSheetData["pracFirstName"]=caseObject.caseProvider.firstName;
								faxCoverSheetData["pracLastName"]=caseObject.caseProvider.lastName;	
								faxCoverSheetData["primaryParentCCode"]=(caseObject.accessClient.ccode && caseObject.accessClient.ccode.length > 0 ? caseObject.accessClient.ccode.toUpperCase() : '');			
								var faxUrl = faxCoverSheetUrl+"?faxCoverSheetData="+uRadixUtilities.jsonEncode(faxCoverSheetData);
								faxUrl = faxUrl.replace('&', '%26');
								if(config.clientType == "public"){
									faxUrl +="&clientType=public";
								}
								faxUrl += "&userClassCode="+_config.userClass;
								var win = window.open(faxUrl,"FaxCoverSheet","width=750,height=500,location=no,status=no,scrollbars=auto,resizable=yes,toolbar=no,menubar=no");													
							});													
						}								
					}					
					
				};			
			casePanel = 
				new Ext.Panel({
							border:false
							,items:[{
										  xtype:"panel",
										  id: config.caseConfirmationPreAccountCreationPanelId,
										  layout:"column",
										  border:false,
										  items: [
										          {
										        	  xtype : "panel",
													  border: false,
													  bodyBorder: false,
													  columnWidth: .52,  
													  style: "padding-left:10;",
													  items: [
																{
																	  xtype : "panel",
																	  border: false,
																	  bodyBorder: false,
																	  html: 	"<table border=0 width=100%>"
																			+ caseLink
																			+ "</table>"
																},{
																	  xtype : "panel",
																	  id: config.uploadPanelId,
																	  border: false,
																	  bodyBorder: false,																	  
//																	  bodyCssClass: "confirm-box",
																	  style: "padding-left:10;padding-top:10;",
																	  html: 	"<table height='125' border=0  width=100%>"
																			+ "<tr><td valign='top' height=75><p class='portal-text-medium-bold'>Upload Documents</p><p class='portal-text-small'>You can now associate claims, EOBs, and other supporting documentation to the service case.</p></td></tr>"
																			+ "<tr><td align='center' height=35><p><div id='"+uploadCaseButtonId+"' class='form-upload-icon' style='visibility:visible;' onmouseover='this.style.cursor=\"pointer\";'></div></p></td></tr>"
																			+ "</table>",
																	  listeners:{
																		afterrender:function(){
																			var serviceCaseLink = Ext.get(serviceCaseLinkId);
																			
																			if(serviceCaseLink){
																				serviceCaseLink.on("click",function(){														
																					Ext.get(document.body.id).mask("Opening Service Case <b>"+caseObject.caseNumber+"</b> ", "x-mask-loading");
																					document.location = config.viewCaseURL+"?caseNumber="+caseObject.caseNumber;
																				});
																			}

																			var uploadCaseButton = Ext.get(uploadCaseButtonId);
																			uploadCaseButton.on("click",function(){
																				config.invokeFileWindowFunction.call(this,{caseNumber:caseObject.caseNumber});
																			});												
																		}								
																	}											
															      },{
															    	  xtype: "panel",
															    	  border: false,
															    	  bodyBorder: false,
															    	  cls : "portal-title"
															    	  ,height: 10
															      },faxPanel
													          ]
										          },{
													  xtype : "panel",
													  id: config.createAccountPanelId,
													  border: true,
													  bodyBorder: true,
													  columnWidth: .48,
													  style: "padding-left:25;",
													  bodyCssClass: "confirm-box",
													  html: "<table height='175' border=0  width=100% style='padding:10px;'>"
															+ "<tr><td class='portal-text-large'><b>Would you like to be notified of updates to<br>this case?<b></td></tr>"
															+ "<tr><td class='portal-text-large'><b>Create an account and you'll be able to:<b></td></tr>"
															+ "<tr><td class='portal-text-small'>- Keep track of your open customer service cases</td></tr>"
															+ "<tr><td class='portal-text-small'>- Create new cases without re-typing contact information</td></tr>"
															+ "<tr><td align='center' height=50><div><a href='#' onclick='openRegistrationWindow()' style=\"font: 14px tahoma,arial,verdana,sans-serif;color:green;\">Click here to get started</a></div></td></tr>"
															+ "</table>"															
											      }]																			
									      }
										  ,{
											  xtype:"panel",
											  layout:"column",
											  id: config.caseConfirmationPostAccountCreationPanelId,
											  border:false,
											  items: [{
														  xtype : "panel",
														  border: false,
														  bodyBorder: false,
														  columnWidth: .55,
														  style: "padding-left:10;padding-top:10;",
														  html : "<div>"
															  + "<table height='125' border=0 width='100%'>"
															  + "<tr><td valign='top' height=25><p class='portal-text-medium-bold'>Activate your account to log-in</p></td></tr>"						  
															  + "<tr><td><p class='portal-text-small'>You will receive account activation instructions at:</br></br><b>"+config.confirmEMail+"</b></br></p></td></tr>"
															  + "<tr><td><p class='portal-text-small'>If you do not receive an email within a few minutes, check your spam folder.</br></p></td></tr>"
															  + "<tr><td><p class='portal-text-small'>If you still did not receive an email, call us at "+config.contactPhoneNumberForProviderCreateAccount+".<br>Please note this number before you close the window.</p></td></tr>"
															  + "</table></div>"							
											  		},{
														  xtype : "panel",
														  border: true,
														  bodyBorder: true,
														  columnWidth: .45,
														  style: "padding-left:25;padding-left:25;",
														  bodyCssClass: "confirm-box",
														  html: "<table height='175' border=0  width='100%' style='padding:10px;'>"
																+ "<tr><td class='portal-text-large'><b>Once you log-in you'll be able to:<b></td></tr>"
																+ "<tr><td class='portal-text-small'><p>- Keep track of your open customer service cases,</br>&nbsp;&nbsp;including the case you just created</p></td></tr>"
																+ "<tr><td class='portal-text-small'><p>- Upload additional documents to your service case</p></td></tr>"
																+ "<tr><td class='portal-text-small'><p>- Create new cases without re-typing contact</br>&nbsp;&nbsp;information</p></td></tr>"
																+ "</table>"															
												      }]																			
										      }
									      ,{
											  xtype : "hidden",
											  id : "faxCoverSheetData",
											  name : "faxCoverSheetData",
											  value : faxCoverSheetData
									      }
								     ]
							});	
			
			Ext.getCmp(config.caseConfirmationPostAccountCreationPanelId).hide();
		}
		
		return casePanel;
	};
		
	//Beg: Single Claim
	if(caseArray && caseArray.length && caseArray.length == 1){		
		var casePanel = casePanel({userClass:config.userClass,caseObject:caseArray[0],faxCoverSheetData:config.faxCoverSheetData,faxCoverSheetUrl:config.faxCoverSheetUrl});
		var formPanelMultiple =
				new Ext.Panel({
							renderTo: config.formPanelDivID		
							,border: false
							,bodyBorder: false
							,hideBorders: true
							,width: 850
							,items:[casePanel]
						});	
	//Beg: Multiple Claim
	}else if(caseArray && caseArray.length && caseArray.length > 1){	
		var formPanelMultiple =
				new Ext.Panel({
							renderTo: config.formPanelDivID		
							,border: false
							,bodyBorder: false
							,hideBorders: true
							,width: 850
							,items: [{
									xtype:"panel"
									,border:false
									,html:	"<table>"
											+"<tr><td><div class='uradix-warning-icon'></div></td><td></td><td valign=top><p class='portal-text-medium-bold'>Your Service Case has been split into multiple cases</p><p class='portal-text-tiny''>Because you added claims with multiple TINs, we created one case per TIN.</p></td></tr>"
											+"</table>"

								}]		
						});
												
		for(var i=0;i<caseArray.length;i++){
			formPanelMultiple.add(new Ext.Panel({height:10,border:false}));
			formPanelMultiple.add(casePanel({userClass:config.userClass,caseObject:caseArray[i],faxCoverSheetData:config.faxCoverSheetData,faxCoverSheetUrl:config.faxCoverSheetUrl}));
			formPanelMultiple.add(getHorizontalBarPanel());
			formPanelMultiple.add(new Ext.Panel({height:20,border:false}));
		}
		formPanelMultiple.doLayout();
						
	}//End: Multiple Claim
	
				
};


