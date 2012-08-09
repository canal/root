function viewMoreInquiryDescription() {
	document.getElementById('noteTextDiv').style.display = 'none';
	document.getElementById('viewMoreLinkDiv').style.display = 'none';
	document.getElementById('viewAllNoteTextDiv').style.display = 'inline';
	document.getElementById('viewLessLinkDiv').style.display = 'inline';
};

function hideMoreInquiryDescription() {	
	document.getElementById('noteTextDiv').style.display = 'inline';	
	document.getElementById('viewMoreLinkDiv').style.display = 'inline';
	document.getElementById('viewLessLinkDiv').style.display = 'none';
	document.getElementById('viewAllNoteTextDiv').style.display = 'none';
};

function toggleDisplay(layer_ref){
	var me = document.getElementById(layer_ref);
	if (me.style.display=="block" || me.style.display=="inline"){
			me.style.display="none";
	} else {
		me.style.display="block";
	}
};

function viewAllAdditionalCases(){	
	new casetracking.update.ux.panel.basic.AdditionalCaseNumbers({caseList: aCase.clonedCaseList,heading: "Releated Service Cases", caseNumberPath:caseNumberPath});
};

Ext.namespace("casetracking.update.ux.panel.basic.CaseInfo");
casetracking.update.ux.panel.basic.CaseInfo = function (config){	
	function caseInfoTemplate (){
		
		//This is the actual Template
		var t = new Ext.XTemplate(
				'<table width="95%">'				
				,'<tr>'
				,'<td align="left">'
				,'<table width="100%">'
					,'<tr>'
					,'<td align="left">'
					,'<span class="portal-text-small-bold">Status: </span>'
					,'</td>'
					,'<td align="left">'				
						,'<table>'
						,'<tr>'
						,'<td align="left"><span class="portal-text-small">{status}</span></td>'
						,'<tpl if="status == \'Closed\' && canReopenCase">'
						,'<td><div class="form-reopen-case-icon" style="visibility: visible;" onmouseover="this.style.cursor=\'pointer\';" onclick="reopenCaseReasonPopup();"></div></td>'
						,'</tpl>'
						,'</tr>'
						,'</table>'
					,'</td>'				
					,'</tr>'
					,'<tr>'
					,'<td align="left">'
					,'<span class="portal-text-small-bold">Created On: </span>'
					,'</td>'
					,'<td align="left">'
					,'<span class="portal-text-small">{createdOn}</span>'
					,'</td>'				
					,'</tr>'	
					,'<tr>'
					,'<td align="left">'
					,'<span class="portal-text-small-bold">Created By: </span>'
					,'</td>'
					,'<td align="left">'
					,'<span class="portal-text-small">{createByUser}</span>'
					,'</td>'				
					,'</tr>'
					,'<tr>'
					,'<td align="left">'
					,'<span class="portal-text-small-bold">Reopened On: </span>'
					,'</td>'
					,'<td align="left">'
					,'<span class="portal-text-small">{reopenedOn}</span>'
					,'</td>'				
					,'</tr>'
					,'<tr>'
					,'<td align="left">'
					,'<span class="portal-text-small-bold">Reopened Reason: </span>'
					,'</td>'
					,'<td align="left">'
					,'<span class="portal-text-small">{reopenedReason}</span>'
					,'</td>'				
					,'</tr>'
					,'<td align="left" nowrap="nowrap">'
					,'<span class="portal-text-small-bold">Original Service Case #: </span>'
					,'</td>'
					,'<td align="left">'
					,'<span class="portal-text-small">{originalServiceCase}</span>'
					,'</td>'				
					,'</tr>'
					,'<td align="left" nowrap="nowrap">'
					,'<span class="portal-text-small-bold">Related Service Case #s: </span>'
					,'</td>'
					,'<td align="left">'
					,'<span class="portal-text-small">{relatedServiceCases}</span>'
					,'</td>'				
					,'</tr>'				
					,'<tr>'
					,'<td align="left">'
					,'<span class="portal-text-small-bold">Inquiry Type: </span>'
					,'</td>'
					,'<td align="left">'
					,'<span class="portal-text-small">{inquiryType}</span>'
					,'</td>'				
					,'</tr>'
					,'<tr>'
					,'<td align="left">'
					,'<span class="portal-text-small-bold">Reason for Inquiry: </span>'
					,'</td>'
					,'<td align="left">'
					,'<span class="portal-text-small">{categoryType}</span>'
					,'</td>'				
					,'</tr>'	
					,'<tr>'
					,'<td align="left">'
					,'<span class="portal-text-small-bold">Priority: </span>'
					,'</td>'
					,'<td align="left">'
					,'<span class="portal-text-small">{priorityType}</span>'
					,'</td>'				
					,'</tr>'	
					,'<tr>'
					,'<td align="left">'
					,'<span class="portal-text-small-bold">Network: </span>'
					,'</td>'
					,'<td align="left">'
					,'<span class="portal-text-small">{caseNetwork}</span>'			
					,'</td>'				
					,'</tr>'
					,'<tr><td><br></td></tr>'				
				,'</table>'
				,'</td>'
				,'</tr>'
				,'<tr>'
				,'<td align="left" colspan="2">'
				,'<span style="font: bold 15px tahoma,arial,verdana,sans-serif;color:#000000;">Inquiry Description: </span>'				
				,'</tr>'	
				,'<tr>'
				,'<td align="left" colspan="2">'
				,'<div id="noteTextDiv" class="portal-text-small">{noteText}</div>'	
				,'<div id="viewAllNoteTextDiv" class="portal-text-small" style="display:none;">{viewAllNoteText}</div>'	
				,'</tr>'
				,'<tpl if="viewAllLink == true">'
				,'<tr>'
				,'<td align="right" colspan="2">'
				,'<div id="viewMoreLinkDiv" class="portal-text-small"><a class="enduser-application-link" href="#" onclick="viewMoreInquiryDescription();"><span class="portal-text-small">View More</span></a></div>'				
				,'<div id="viewLessLinkDiv" class="portal-text-small" style="display:none;"><a class="enduser-application-link" href="#" onclick="hideMoreInquiryDescription();"><span class="portal-text-small">Hide More</span></a></div>'
				,'</tr>'
				,'</tpl>'
				,'</table>'
				);		
		
		var createDate = new Date(config.aCase.createDate.time.time);
		var createdOn = createDate.getMonth()+1 + "/" + createDate.getDate() + "/" + createDate.getFullYear();
		var reopenedOn = '', reopenedReason = '';
		if(config.aCase.lastOpenDate) {
			var lastOpenDate = new Date(config.aCase.lastOpenDate.time.time);
			reopenedOn = lastOpenDate.getMonth()+1 + "/" + lastOpenDate.getDate() + "/" + lastOpenDate.getFullYear();
		}
		if(reopenedOn == '') {
			reopenedOn = 'N/A';
		}
		var inquiryType = '',categoryType='',priorityType = '',caseNetwork = '';
		if(config.aCase.caseOrigin) {
			if(config.aCase.caseContact) {
				if(config.aCase.caseContact.callerType && config.aCase.caseContact.callerType == 'CLI') {
					caseNetwork = config.aCase.caseNetwork.clientNetworkDetail.name;
					inquiryType = config.aCase.originalCaseType.clientDetail.name;
					categoryType = config.aCase.originalCaseType.subType.clientDetail.name;
					priorityType = config.aCase.priority.clientPriorityDetail.name;
					if(config.aCase.priority.clientPriorityReasonDetail.name) {
						priorityType += ' - ' + config.aCase.priority.clientPriorityReasonDetail.name;
					}
				} else {
					caseNetwork = config.aCase.caseNetwork.providerNetworkDetail.name;
					inquiryType = config.aCase.originalCaseType.providerDetail.name;
					categoryType = config.aCase.originalCaseType.subType.providerDetail.name;
					priorityType = config.aCase.priority.providerPriorityDetail.name;
					if(config.aCase.priority.providerPriorityReasonDetail.name) {
						priorityType += ' - ' + config.aCase.priority.providerPriorityReasonDetail.name;
					}
				}	
			}

			reopenedReason = ""; //aCase.causeForAppeal.clientAppealDetail;
		}
		if(config.aCase.caseHistory) {
			for(i=0;i < config.aCase.caseHistory.length; i++) {
				var history = config.aCase.caseHistory[i];
				if(history.eventTypeCode == 'REOPEN') {
					if(userClassCode && userClassCode[0] == 'INT') {
						reopenedReason = history.internalEventTypeReasonDetail.name;	
					} else {
						reopenedReason = history.clientEventTypeReasonDetail.name;
					}
				}
			}
		}
		if(reopenedReason == '' || reopenedReason == null) {
			reopenedReason = 'N/A';
		}
		var noteText = 'N/A',viewAllNoteText='',viewAllLink = false;		
		if (config.aCase.noteList && config.aCase.noteList.length > 0) {
			var hasSynopsis = false;
			for(i = 0; i < config.aCase.noteList.length; i++) {
				var note = config.aCase.noteList[i];
				if(note && note.noteType && note.noteType == 'SYNOPSIS') {
					viewAllNoteText = note.noteText;
					if(viewAllNoteText.length > 350) {
						noteText = viewAllNoteText.substring(0, 349).replace(new RegExp( "\\n", "g" ),"<br>");	
						viewAllLink = true;
					} else {
						noteText = viewAllNoteText.replace(new RegExp( "\\n", "g" ),"<br>");
					}	
				}
			}
		}
		viewAllNoteText = viewAllNoteText.replace(new RegExp( "\\n", "g" ),"<br>");
		
		var status = '';
		if (config.aCase.status == 'OPEN') {
			status = 'Open';
		} else if(config.aCase.status == 'CLOSED') {
			status = 'Closed';
		}
		
		var createByUser = "";
		if(userClassCode) {
			if(userClassCode[0] == 'INT') {
				createByUser = aCase.createByUserOriginal.firstName + ' ' + aCase.createByUserOriginal.lastName;
			} else if(userClassCode[0] == 'CLI' || userClassCode[0] == 'PRV') {
				if(aCase.createByUserOriginal && aCase.createByUserOriginal.userClass && aCase.createByUserOriginal.userClass.internal) {
					createByUser = "MultiPlan";
				} else if(aCase.createByUserOriginal && (aCase.createByUserOriginal.firstName || aCase.createByUserOriginal.lastName)){
					createByUser = aCase.createByUserOriginal.firstName + ' ' + aCase.createByUserOriginal.lastName;
				}
			}
		} else if(aCase.createByUserOriginal && (aCase.createByUserOriginal.firstName || aCase.createByUserOriginal.lastName)){
			createByUser = aCase.createByUserOriginal.firstName + ' ' + aCase.createByUserOriginal.lastName;
		}				
		
		var originalServiceCase = "N/A";
		if(aCase.createFromCaseNumber){
			originalServiceCase = "<a class='enduser-application-link' href='" + caseNumberPath  + aCase.createFromCaseNumber + "'>" +aCase.createFromCaseNumber +"</a>";
		};	
		
		var relatedServiceCases = "N/A";
		if(aCase.clonedCaseList && aCase.clonedCaseList.length){
			if(aCase.clonedCaseList.length == 1){
				relatedServiceCases = "<a class='enduser-application-link' href='" + caseNumberPath + aCase.clonedCaseList[0] + "'>" +aCase.clonedCaseList[0] +"</a>";
			}else if(aCase.clonedCaseList.length ==2){
				relatedServiceCases = "<a class='enduser-application-link' href='" + caseNumberPath + aCase.clonedCaseList[0] + "'>" +aCase.clonedCaseList[0] +"</a>&nbsp;&nbsp;<a class='enduser-application-link' href='" + caseNumberPath + aCase.clonedCaseList[1] + "'>" +aCase.clonedCaseList[1] +"</a>";
			}else if(aCase.clonedCaseList.length > 2){
				relatedServiceCases = "<a class='enduser-application-link' href='" + caseNumberPath + aCase.clonedCaseList[0] + "'>" +aCase.clonedCaseList[0] +"</a>&nbsp;&nbsp;<a class='enduser-application-link' href='#' onclick='viewAllAdditionalCases();'>View More</a>";
			}			
		}		
		
		//Pass data to template
		var templateString = t.apply(	 
				{	
					status: status
					,createByUser: createByUser
					,createdOn: createdOn
					,reopenedOn: reopenedOn
					,canReopenCase: canReopenCase
					,reopenedReason: reopenedReason
					,originalServiceCase:originalServiceCase
					,relatedServiceCases:relatedServiceCases
					,inquiryType: inquiryType
					,categoryType: categoryType
					,caseNetwork: caseNetwork
					,priorityType: priorityType
					,noteText: noteText
					,viewAllNoteText: viewAllNoteText
					,viewAllLink: viewAllLink
				}
		);	
		return templateString;
		
	} // end template function
		
	var CaseInfoPanel = 
		new Ext.Panel({
			layout:'column'								    
			,bodyBorder: false						    
			,border: false
			,hideBorders: true		
			//,width:485
			,items: [{
					autoHeight:true
					,items:[{
							xtype: "panel",
							border: false,					
							cls:"portal-titles",
							html: caseInfoTemplate()
							//,width:485
							,autoHeight:true
							,autoScroll:true							
						}]
				}]
		});
	
	return CaseInfoPanel;
};

