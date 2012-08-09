var caseNumberPath = window.location.pathname + "?caseNumber=";

function addNotePopup() {
	casetracking.update.ux.panel.notes.AddNote({
		caseNumber : aCase.caseNumber,
		nameSpace : nameSpace,
		urlAddNote : urlAddNote
	});
};

function addAttachmentPopup() {
	Ext.get(document.body.id).mask('<b>Adding Attachment...</b>',
			'x-mask-loading');
	Ext.Ajax.request({
		url : urlAddAttachment,
		params : {
			caseNumber : aCase.caseNumber
		},
		success : function(result, request) {
			var response = uRadixUtilities.jsonDecode(result.responseText);
			Ext.get(document.body.id).unmask();
		},
		failure : function(result, request) {
			Ext.get(document.body.id).unmask();
		}
	});
};

function reopenCaseReasonPopup() {
	Ext.get(document.body.id).mask('<b>Loading Re-open Reasons...</b>',
			'x-mask-loading');
	Ext.Ajax.request({
		url : urlReopenCaseStatusSubmit,
		params : {
			sortAs : aCase.caseContact.callerType
		},
		success : function(result, request) {
			Ext.get(document.body.id).unmask();
			var response = uRadixUtilities.jsonDecode(result.responseText);
			var caseEventList = response.caseEventList;
			casetracking.update.ux.panel.basic.ReOpenCase({
				caseNumber : aCase.caseNumber,
				nameSpace : nameSpace,
				reopenCaseSubmit : reopenCaseSubmit,
				caseEventList : caseEventList
			});
		},
		failure : function(result, request) {
			g_showStatusBox();
			Ext.getCmp("updateButton" + config.nameSpace).enable();
			Ext.get(document.body.id).unmask();
		}
	});
};

function refreshNotes() {
	Ext.get(document.body.id).mask('<b>Refreshing Notes...</b>',
			'x-mask-loading');
	Ext.Ajax.request({
		url : urlRefreshNotes,
		params : {
			caseNumber : aCase.caseNumber
		},
		success : function(result, request) {
			var response = uRadixUtilities.jsonDecode(result.responseText);
			addNotesToTable(response.noteList);
			Ext.get(document.body.id).unmask();
		},
		failure : function(result, request) {
			Ext.get(document.body.id).unmask();
		}
	});
};

function refreshAttachments(AttachmentGridId) {
	Ext.get(document.body.id).mask('<b>Refreshing Attachments...</b>',
			'x-mask-loading');
	Ext.Ajax.request({
		url : urlRefreshAttachments,
		params : {
			caseNumber : aCase.caseNumber
		},
		success : function(result, request) {
			var response = uRadixUtilities.jsonDecode(result.responseText);
			var attachmentGrid = Ext.getCmp(AttachmentGridId);
			var store = new Ext.data.Store({
				reader : new Ext.data.JsonReader({
					root : 'attachmentsList',
					fields : [ 'createDate', 'file.fileName', 'createByUser',
							'file.sizeInByte' ]
				}),
				data : response
			});

			attachmentGrid.reconfigure(store, attachmentGrid.getColumnModel());
			Ext.get(document.body.id).unmask();
		},
		failure : function(result, request) {
			Ext.get(document.body.id).unmask();
		}
	});
};

function callBackRefreshAttachments(config) {
};

function callBackRelatedServiceCases() {
	new casetracking.update.ux.panel.basic.RelatedServiceCases({});
};

function addNotesToTable(notesList, isNewNotes) {
	removeTableData('caseNotesTbl');
	if (notesList) {
		for (i = 0; i < notesList.length; i++) {
			var note = notesList[i];
			if (note != null) {
				addNote(note, isNewNotes);
			}
		}
		toggleNotesPanels(notesList);
	}
};

function removeTableData(tableName) {
	var table = document.getElementById(tableName);
	if (table != null) {
		var numberRows = table.rows.length;
		for (i = numberRows - 1; i >= 0; i--) {
			table.deleteRow(i);
		}
	}
};

function addNote(note, isNew) {
	if (note != null && note.noteType != 'SYNOPSIS') {
		var caseNotesTblRow = document.getElementById('caseNotesTbl')
				.insertRow(0);
		var caseNotesTblCell = caseNotesTblRow.insertCell(0);
		var noteRecord = "<div><table width='100%;' cellspacing='0' cellpadding='3'>";
		if (userClassCode
				&& userClassCode[0] == 'INT'
				&& (isNew || (note.createByUser && note.createByUser.userClass && note.createByUser.userClass.internal))) {
			noteRecord += "<tr class='casetracking-note-tr-mpi portal-text-small'>";
			noteRecord += "<td>Added By: " + note.createByUser.firstName
					+ " " + note.createByUser.lastName
					+ " {MultiPlan}</td>";
		} else if (userClassCode
				&& userClassCode[0] == 'INT'
				&& (note.createByUser && note.createByUser.userClass && note.createByUser.userClass.client)) {
			noteRecord += "<tr class='casetracking-title-body'>";
			noteRecord += "<td class='casetracking-note-td portal-text-small'>Added By: "
					+ note.createByUser.firstName
					+ " "
					+ note.createByUser.lastName + " {Client}</td>";
		} else if (userClassCode
				&& userClassCode[0] == 'CLI'
				&& (isNew || (note.createByUser && note.createByUser
						&& note.createByUser.userClass && note.createByUser.userClass.client))) {
			noteRecord += "<tr class='casetracking-title-body'>";
			noteRecord += "<td class='casetracking-note-td portal-text-small'>Added By: "
					+ note.createByUser.firstName
					+ " "
					+ note.createByUser.lastName + "</td>";
		} else if (note.createByUser.firstName == 'MultiPlan'
				|| note.createByUser.lastName == 'MultiPlan') {
			noteRecord += "<tr class='casetracking-note-tr-mpi portal-text-small'>";
			noteRecord += "<td>Added By: " + note.createByUser.firstName
					+ " " + note.createByUser.lastName + "</td>";
		} else {
			noteRecord += "<tr class='casetracking-title-body'>";
			noteRecord += "<td class='casetracking-note-td portal-text-small'>Added By: "
					+ note.createByUser.firstName
					+ " "
					+ note.createByUser.lastName + "</td>";
		}
		if (note.createDate) {
			noteRecord += "<td align='right' class='casetracking-note-td portal-text-small'>"
					+ formatDate(note.createDate) + "</td>";
		} else {
			noteRecord += "<td>&nbsp;</td>";
		}
		noteRecord += "</tr>";// end note info
		// start note text
		noteRecord += "<tr>";
		if (note.noteText) {
			noteRecord += "<td class='portal-text-small' style='padding: 5px;' colspan='2'>"
					+ note.noteText.replace(new RegExp("\\n", "g"), "<br>")
					+ "<BR><BR></td>";
		} else {
			noteRecord += "<td>&nbsp;</td>";
		}
		noteRecord += "</tr>";// end note text
		noteRecord += "</table></div>";

		caseNotesTblCell.innerHTML = noteRecord;
	}
};

function formatDate(dateTime) {
	var formattedDate = '';
	if (dateTime) {
		if (dateTime.time.hours > 12) {
			formattedDate = formattedDate + (dateTime.time.hours - 12);
		} else {
			formattedDate = formattedDate + dateTime.time.hours;
		}
		formattedDate = formattedDate + ':';
		if (dateTime.time.minutes < 10) {
			formattedDate = formattedDate + '0' + dateTime.time.minutes;
		} else {
			formattedDate = formattedDate + dateTime.time.minutes;
		}
		formattedDate = formattedDate + ' ';

		if (dateTime.time.hours >= 12) {
			formattedDate = formattedDate + 'PM ET ';
		} else {
			formattedDate = formattedDate + 'AM ET ';
		}
		var createDate = new Date(dateTime.time.time);
		var createDateStr = createDate.format('n/j/Y');
		formattedDate = formattedDate + ' ' + createDateStr;
	}
	return formattedDate;

};

function backToSearchResults() {
	Ext.get(document.body.id).mask('<b>Going back to search results...</b>',
			'x-mask-loading');
	history.go(-1);
};

function toggleGrid(gridId, gridIconId) {
	var grid = Ext.getCmp(gridId);
	if (grid != null && grid != undefined) {
		if (grid.isVisible()) {
			grid.setVisible(false);
			document.getElementById(gridIconId).className = 'grid-expand-icon';
		} else {
			grid.setVisible(true);
			document.getElementById(gridIconId).className = 'grid-collapse-icon';
		}
	}
};

function toggleNotesPanels(noteList) {
	if(!noteList || noteList.length == 0 
			|| (noteList.length == 1 && noteList[0].noteType && noteList[0].noteType == 'SYNOPSIS')) {
		Ext.getCmp('notesInfoMessagePanelId').show();
		Ext.getCmp('notesInfoPanelId').hide();
	} else if (noteList && noteList.length > 0) {
		Ext.getCmp('notesInfoMessagePanelId').hide();
		Ext.getCmp('notesInfoPanelId').show();
	}
}

Ext.namespace("casetracking.update.ux.form.CaseForm");
casetracking.update.ux.form.CaseForm = function(config) {
	
	var winW = 650;
	if (document.body && document.body.offsetWidth) {
		winW = document.body.offsetWidth;
	}
	if (document.compatMode == 'CSS1Compat' && document.documentElement
			&& document.documentElement.offsetWidth) {
		winW = document.documentElement.offsetWidth;
	}
	if (window.innerWidth) {
		winW = window.innerWidth;
	}
	winW = winW - 200;
	if(winW < 650) {
		winW = 650;
	}

	var caseInfoPanel = new casetracking.update.ux.panel.basic.CaseInfo({
		aCase : config.aCase,
		CLIENT : config.CLIENT,
		PROVIDER : config.PROVIDER,
		INTERNAL : config.INTERNAL
	});
	
	var notesInfoMessagePanel = new casetracking.update.ux.panel.notes.NotesInfoMessage(
			{
				aCase : config.aCase,
				nameSpace : config.nameSpace,
				urlAddNote : config.urlAddNote
			});
	var notesInfoPanel = new casetracking.update.ux.panel.notes.NotesInfo({
		aCase : config.aCase,
		nameSpace : config.nameSpace,
		urlAddNote : config.urlAddNote
	});

	var notesInfoButtons = new casetracking.update.ux.panel.notes.NotesInfoButtons(
			{
				aCase : config.aCase,
				nameSpace : config.nameSpace,
				urlAddNote : config.urlAddNote,
				urlRefreshNotes : config.urlRefreshNotes
			});
	var providerInfoPanel = new casetracking.update.ux.panel.provider.ProviderInfo(
			{
				provider : config.aCase.caseProvider,
				caseProviderTypeList : config.caseProviderTypeList
			});
	var attachmentsInfoPanel = new casetracking.update.ux.panel.attachments.AttachmentsInfo(
			{
				aCase : config.aCase,
				nameSpace : config.nameSpace,
				urlAddAttachment : config.urlAddAttachment,
				AttachmentGridId : config.AttachmentGridId
			});
	var attachmentsInfoMessagePanel = new casetracking.update.ux.panel.attachments.AttachmentsInfoMessage(
			{
				aCase : config.aCase,
				nameSpace : config.nameSpace,
				urlAddAttachment : config.urlAddAttachment
			});
	var attachmentsInfoButtons = new casetracking.update.ux.panel.attachments.AttachmentsInfoButtons(
			{
				aCase : config.aCase,
				nameSpace : config.nameSpace,
				urlAddAttachment : config.urlAddAttachment,
				urlRefreshAttachments : config.urlRefreshAttachments,
				invokeFileWindowFunction : config.invokeFileWindowFunction,
				AttachmentGridId : config.AttachmentGridId
			});
	var claimsInfoPanel = new casetracking.update.ux.panel.claims.ClaimInfo({
		aCase : config.aCase,
		nameSpace : config.nameSpace
	});
	var claimsInfoMessagePanel = new casetracking.update.ux.panel.claims.ClaimsInfoMessage(
			{
				aCase : config.aCase,
				nameSpace : config.nameSpace
			});
	var eobInfoPanel = new casetracking.update.ux.panel.eob.EobInfo({
		aCase : config.aCase
	});
	var contactPanel = new casetracking.update.ux.panel.contact.ContactInfo(
			config.aCase);

	var isBackToSearchButton = false;
	if (config.fromSearch && config.fromSearch == 'true') {
		isBackToSearchButton = true;
	}

	var clonedCaseList = config.aCase.clonedCaseList;
	var createFromCaseNumber = config.aCase.createFromCaseNumber;
	var cloneMessage = false;
	if (clonedCaseList && clonedCaseList.length) {
		cloneMessage = "This service case has been split into multiple service cases";
	} else if (createFromCaseNumber) {
		cloneMessage = "This service case was created from another service case";
	} else if (clonedCaseList && clonedCaseList.length && createFromCaseNumber) {
		cloneMessage = "This service case has created from another service case and split into multiple service cases";
	}
		
	var formPanel = null;
	var serviceCaseTip = '';
	if (!Ext.isEmpty(userClassCode) && userClassCode[0] == 'PRV') {
		// Panel
		formPanel = new Ext.Panel(
				{
					renderTo : config.formPanelDivID,
					layout : "form",
					border : false,
					bodyBorder : false,
					hideBorders : true,
					width : winW,
					items : [ {
						xtype : "uRadix.form.FormPanel",
						autoScroll : true,
						id : "casetrackingCaseCreateUpdatePanelForm"
								+ config.nameSpace,
						formObjectName : "Ext.getCmp('casetrackingCaseCreateUpdatePanelForm"
								+ config.nameSpace + "')",
						items : [
								{
									xtype : "panel",
									border : false,
									hidden : !isBackToSearchButton,
									style : "padding-bottom: 10px;",
									html : "<table><tr><td align='left'><div class='form-back-to-results-icon' style='visibility: visible;' onmouseover='this.style.cursor=\"pointer\";' onclick='backToSearchResults();'></div></td></tr></table>"
								},
								{
									xtype : "panel",
									border : false,
									cls : "portal-title",
									html : "Service Case # "
											+ config.aCase.caseNumber
								},
								{
									xtype : "panel",
									border : false,
									hidden : !cloneMessage,
									style : "padding-top: 10px;",
									html : uRadixClientMessageHandler
											.setCustomStatusDOM({
												append : false,
												boxId : Ext.id,
												boxMsg : cloneMessage,
												boxCallBack : "callBackRelatedServiceCases"
											})
								},
								{
									xtype : "panel",
									border : false,
									layout : "column",
									style : "padding-top: 8px;padding-bottom: 8px;",
									html : "<span class='idxmTextSmall'>For service cases related to <b>Workers' Compensation</b> and <b>Auto Medical</b>, the term \"claim\" refer to \"bill\".</span>"
								},
								{
									xtype : "panel",
									border : false,
									layout : "column",
									style : "padding-top:10px;",
									items : [
											{
												border : false,
												columnWidth : .45,
												bodyBorder : false,
												hideBorders : true,
												items : [ caseInfoPanel ]
											},
											{
												width : 10,
												border : false,
												html : "&nbsp;"
											},
											{
												border : false,
												columnWidth : .55,
												bodyBorder : false,
												hideBorders : true,
												items : [ notesInfoPanel,
														notesInfoMessagePanel,
														notesInfoButtons ]
											} ]
								},
								{
									xtype : "panel",
									border : false,
									layout : "column",
									style : "padding-top:10px;",
									items : [ {
										border : false,
										columnWidth : .49,
										bodyBorder : false,
										hideBorders : true,
										items : [ providerInfoPanel ]
									}, {
										columnWidth : .02,
										border : false,
										html : "&nbsp;"
									}, {
										border : false,
										columnWidth : .49,
										bodyBorder : false,
										hideBorders : true,
										items : [ claimsInfoPanel ]
									} ]
								},
								{
									xtype : "panel",
									border : false,
									style : "padding-top:10px;",
									items : [ {
										border : false,
										bodyBorder : false,
										hideBorders : true,
										items : [ attachmentsInfoPanel,
												attachmentsInfoMessagePanel,
												attachmentsInfoButtons ]
									} ]
								} ]
					} ]
				});
	} else {
		// Panel
		formPanel = new Ext.Panel(
				{
					renderTo : config.formPanelDivID,
					layout : "form",
					border : false,
					bodyBorder : false,
					hideBorders : true,
					width : winW,
					items : [ {
						xtype : "uRadix.form.FormPanel",
						autoScroll : true,
						id : "casetrackingCaseCreateUpdatePanelForm"
								+ config.nameSpace,
						formObjectName : "Ext.getCmp('casetrackingCaseCreateUpdatePanelForm"
								+ config.nameSpace + "')",
						items : [
								{
									xtype : "panel",
									border : false,
									hidden : !isBackToSearchButton,
									style : "padding-bottom: 10px;",
									html : "<table><tr><td align='left'><div class='form-back-to-results-icon' style='visibility: visible;' onmouseover='this.style.cursor=\"pointer\";' onclick='backToSearchResults();'></div></td></tr></table>"
								},
								{
									xtype : "panel",
									border : false,
									cls : "portal-title",
									html : "Service Case # "
											+ config.aCase.caseNumber
								},
								{
									xtype : "panel",
									border : false,
									hidden : !cloneMessage,
									style : "padding-top: 10px;",
									html : uRadixClientMessageHandler
											.setCustomStatusDOM({
												append : false,
												boxId : Ext.id,
												boxMsg : cloneMessage,
												boxCallBack : "callBackRelatedServiceCases"
											})
								},
								{
									xtype : "panel",
									border : false,
									layout : "column",
									style : "padding-top: 8px;padding-bottom: 8px;",
									html : "<span class='idxmTextSmall'>For service cases related to <b>Workers' Compensation</b> and <b>Auto Medical</b>, the terms \"claim\" and \"EOB\" refer to \"bill\" and \"EOR\".</span>"
								},
								{
									xtype : "panel",
									border : false,
									layout : "column",
									style : "padding-top:10px;",
									items : [
											{
												border : false,
												columnWidth : .45,
												bodyBorder : false,
												hideBorders : true,
												items : [ caseInfoPanel ]
											},
											{
												width : 10,
												border : false,
												html : "&nbsp;"
											},
											{
												border : false,
												columnWidth : .55,
												bodyBorder : false,
												hideBorders : true,
												items : [ notesInfoPanel,
														notesInfoMessagePanel,
														notesInfoButtons ]
											} ]
								},
								{
									xtype : "panel",
									border : false,
									layout : "column",
									style : "padding-top:10px;",
									items : [ {
										border : false,
										columnWidth : .34,
										bodyBorder : false,
										hideBorders : true,
										items : [ providerInfoPanel ]
									}, {
										width : 10,
										border : false,
										html : "&nbsp;"
									}, {
										border : false,
										columnWidth : .34,
										bodyBorder : false,
										hideBorders : true,
										items : [ contactPanel ]
									}, {
										width : 10,
										border : false,
										html : "&nbsp;"
									}, {
										border : false,
										columnWidth : .32,
										bodyBorder : false,
										hideBorders : true,
										items : [ eobInfoPanel ]
									} ]
								},
								{
									xtype : "panel",
									border : false,
									style : "padding-top:10px;",
									items : [ {
										border : false,
										bodyBorder : false,
										hideBorders : true,
										items : [ claimsInfoPanel,
												claimsInfoMessagePanel ]
									} ]
								},
								{
									xtype : "panel",
									border : false,
									style : "padding-top:10px;",
									items : [ {
										border : false,
										bodyBorder : false,
										hideBorders : true,
										items : [ attachmentsInfoPanel,
												attachmentsInfoMessagePanel,
												attachmentsInfoButtons ]
									} ]
								} ]
					} ]
				});

		if (config.aCase.claimList && config.aCase.claimList.length > 0) {
			claimsInfoPanel.show();
			claimsInfoMessagePanel.hide();
		} else {
			claimsInfoPanel.hide();
			claimsInfoMessagePanel.show();
		}
	}

	if (config.aCase.noteList && config.aCase.noteList.length > 0) {
		notesInfoPanel.show();
		notesInfoMessagePanel.hide();
	} else {
		notesInfoPanel.hide();
		notesInfoMessagePanel.show();
	}
	if (config.aCase.attachmentFileList
			&& config.aCase.attachmentFileList.length > 0) {
		attachmentsInfoPanel.show();
		attachmentsInfoMessagePanel.hide();
	} else {
		attachmentsInfoPanel.hide();
		attachmentsInfoMessagePanel.show();
	}
	if (config.aCase.status == 'CLOSED') {
		notesInfoButtons.hide();
		attachmentsInfoButtons.hide();
	}
	// add notes to NotesInfo
	addNotesToTable(config.aCase.noteList);
	toggleNotesPanels(config.aCase.noteList, false);

	var publicObjects = {
		caseInfoPanel : caseInfoPanel,
		notesInfoMessagePanel : caseInfoPanel,
		notesInfoPanel : notesInfoPanel,
		notesInfoButtons : notesInfoButtons,
		providerInfoPanel : providerInfoPanel,
		attachmentsInfoPanel : attachmentsInfoPanel,
		attachmentsInfoMessagePanel : attachmentsInfoMessagePanel,
		attachmentsInfoButtons : attachmentsInfoButtons,
		claimsInfoPanel : claimsInfoPanel,
		eobInfoPanel : eobInfoPanel
	};

	return publicObjects;
};