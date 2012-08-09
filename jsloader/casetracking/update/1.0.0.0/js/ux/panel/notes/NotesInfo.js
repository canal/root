Ext.namespace("casetracking.update.ux.panel.notes.NotesInfoMessage");
casetracking.update.ux.panel.notes.NotesInfoMessage = function(config) {

	var notesInfoPanel = new Ext.Panel(
			{
				//renderTo : config.formPanelDivID,
				layout : 'fit',
				bodyBorder : false,
				border : false,
				hideBorders : true,
				id: 'notesInfoMessagePanelId',
				items : [{
					autoHeight : true,
					items : [{
							xtype : "panel",
							border : false,
							cls : "casetracking-title",
							bodyCssClass : "casetracking-title-body",
							html : "Notes"
						},{
							xtype : "panel",
							border : false,
							bodyBorder : false,
							height:165,
							style : "padding-left: 10;padding-top:5px;",
							html : "<table><tr><td align='center'><span class='portal-text-small-bold'>There are no notes</span></td></tr></table>"
						}]
				}]
			});
	
	return notesInfoPanel;
};

// notes panel with notes
Ext.namespace("casetracking.update.ux.panel.notes.NotesInfo");
casetracking.update.ux.panel.notes.NotesInfo = function(config) {	
	
	var notesInfoPanel = new Ext.Panel(
			{
				bodyBorder : false,
				border : false,
				hideBorders : true,	
				id: 'notesInfoPanelId',
				items : [{
					autoHeight : true,
					items : [{
							xtype : "panel",
							border : false,
							cls : "casetracking-title",
							bodyCssClass : "casetracking-title-body",
							html : "Notes"
						},{
							xtype : "panel",
							border : false,
							cls : "portal-titles",
							html : "<div style='width:100%; height:150px; overflow:auto;'><table width='100%' id='caseNotesTbl'></table>",
							height : 165,
							autoScroll : true
						}]
				} ]
			});
	
	return notesInfoPanel;
};

//notes button panel
Ext.namespace("casetracking.update.ux.panel.notes.NotesInfoButtons");
casetracking.update.ux.panel.notes.NotesInfoButtons = function(config) {
	var notesInfoButtonsPanel = new Ext.Panel(
			{
				//renderTo : config.formPanelDivID,
				layout : 'fit',
				bodyBorder : false,
				border : false,
				hideBorders : true,
				items : [ {
					autoHeight : true,
					items : [
							{
								xtype : "panel",
								layout : "column",
								border : false,
								bodyBorder : false,
								items : [
										{
											xtype : "panel",
											border : false,
											bodyBorder : false,
											columnWidth : .99,
											style : "padding-top:5px;",
											html : "<table><tr><td align='left'><div class='form-refresh-icon' style='visibility: visible;' onmouseover='this.style.cursor=\"pointer\";' onclick='refreshNotes();'></div></td></tr></table>"
										},
										{
											xtype : "panel",
											border : false,
											bodyBorder : false,
											width : 105,	
											style : "padding-top:5px;",
											html : "<table width='100%' cellpadding='0' cellspacing='0'><tr><td align='right'><div class='form-add-note-icon' style='visibility: visible;' onmouseover='this.style.cursor=\"pointer\";' onclick='addNotePopup();'></div></td></tr></table>"
										} ]
							} ]
				} ]
			});
	
	return notesInfoButtonsPanel;
};