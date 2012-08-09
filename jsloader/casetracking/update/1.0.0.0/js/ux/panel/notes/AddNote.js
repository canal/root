Ext.namespace("casetracking.update.ux.panel.notes.AddNote");
casetracking.update.ux.panel.notes.AddNote = function(config) {

	function formSubmitHandler() {
		var noteTextCmp = Ext.getCmp('noteText');
		var noteText = noteTextCmp.getValue();
		if(noteText == null || noteText.length == 0) {
			noteTextCmp.markInvalid("Type your note and then click Add Note.");
			return;
		}
		
		// Get Form
		var formObj = Ext.getCmp("casetrackingCaseUpdateAddNotePanelForm" + config.nameSpace).getForm();

		g_hideStatusBox();
		Ext.get('AddServiceCaseNoteWindow').mask('<b> Adding Service Case Note...</b>','x-mask-loading');
		formObj.submit({
			url : config.urlAddNote,
			clientValidation : true,
			isRedirect : false,
			success : function(form, action) {
				 Ext.get('AddServiceCaseNoteWindow').unmask();
				var formResponseJson = uRadixUtilities
						.jsonDecode(action.response.responseText);
				if (formResponseJson.noteInfo
						&& formResponseJson.noteInfo.addNoteList) {
					var note = formResponseJson.noteInfo.addNoteList[0];
					addNote(note, true);
					toggleNotesPanels(formResponseJson.noteInfo.addNoteList);
				}
				win.close();
			},
			failure : function(form, action) {
				g_showStatusBox();
				Ext.getCmp("updateButton" + config.nameSpace).enable();
				Ext.get('AddServiceCaseNoteWindow').unmask();
			}
		});
	};
	
	var win = new Ext.Window(
			{
				width : 490,
				height : 355,
				modal : true,
				autoScroll : false,
				resizable : true,
				layout : 'fit',
				plain : true,
				id: 'AddServiceCaseNoteWindow',
				items : [ {
					xtype : "panel",
					border : false,
					bodyBorder : false,
					hideBorders : true,
					autoScroll : false,
					style : "background-color:#FFFFFF; background:#FFFFFF; padding:5px;",
					items : [ {
						xtype : "uRadix.form.FormPanel",
						autoScroll : true,
						id : "casetrackingCaseUpdateAddNotePanelForm"
								+ config.nameSpace,
						formObjectName : "Ext.getCmp('casetrackingCaseUpdateAddNotePanelForm"
								+ config.nameSpace + "')",
						items : [ {
							xtype : "panel",
							border : false,
							bodyBorder : false,
							hideBorders : true,
							autoScroll : false,
							style : "padding-top: 0px;",
							items : [
									{
										xtype : "panel",
										html : "Add Note",
										cls : "portal-title",
										border : false,
										bodyBorder : false,
										hideBorders : true,
										style : "padding-top: 0px;"
									},{
										xtype : "panel",
										layout : "form",
										border : false,
										labelAlign : "top",
										style : "padding-top: 8px;",
										items : [ {
											xtype : "textarea",
											name : "noteText",
											id : "noteText",
											maxLength : 1024,
											msgTarget : "under",
											width : 445,
											height : 195
										}]
									},{
										xtype : "panel",
										border : false,
										layout : "column",
										style : "padding-top: 20px;",
										items : [{
													border : false,
													columnWidth : .50,
													bodyBorder : false,
													hideBorders : true,
													items : [{
														id : "cancelButton"
																+ config.nameSpace,
														xtype : "button",
														text : "CANCEL",
														style : "float: left;",
														ctCls : "support-portal-btn-cancel",
														handler : function() {
															if (isFormPanelDirty) {
																idxm.core.popups
																		.Cancel({
																			doCancelFunction : jsonObject.doCancel,
																			noCancelFunction : jsonObject.noCancel
																		});
															} else {
																win.close();
															}
														}
													}]
												},{
													border : false,
													columnWidth : .47,
													bodyBorder : false,
													hideBorders : true,
													items : [{
														id : "updateButton"
																+ config.nameSpace,
														xtype : "button",
														text : "ADD NOTE",
														style : "float: right;",
														ctCls : "support-portal-btn",
														handler : formSubmitHandler
													}]
												},{
													xtype : "hidden",
													id : "caseNumber",
													name : "caseNumber",
													value : config.caseNumber
												}]
									}]
						}]
					}],
					listeners : {
						uradix_enterkey : formSubmitHandler
					}
				}]
			});
	win.show();

	var formPanel = Ext.getCmp("casetrackingCaseUpdateAddNotePanelForm"+ config.nameSpace);
	var isFormPanelDirty = false;
	formPanel.getForm().items.each(function(f) {
		f.on("change", function() {
			isFormPanelDirty = true;
		});
	});

	var jsonObject = {
		doCancel : function() {
			win.close();
		},
		noCancel : function() {}
	};
	this.jsonObject = jsonObject;
};
