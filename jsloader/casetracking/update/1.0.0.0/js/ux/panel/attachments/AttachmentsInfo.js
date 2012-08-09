Ext
		.namespace("casetracking.update.ux.panel.attachments.AttachmentsInfoMessage");
casetracking.update.ux.panel.attachments.AttachmentsInfoMessage = function(
		config) {

	var attachmentsInfoPanel = new Ext.Panel(
			{
				// renderTo : config.formPanelDivID,
				layout : 'fit',
				bodyBorder : false,
				border : false,
				hideBorders : true,
				items : [ {
					autoHeight : true,
					items : [
							{
								xtype : "panel",
								border : false,
								cls : "casetracking-title",
								style : "padding-top:10px;",
								bodyCssClass : "casetracking-title-body",
								html : "Attachments"
							},
							{
								xtype : "panel",
								layout : "column",
								border : false,
								bodyBorder : false,
								items : [ {
									xtype : "panel",
									border : false,
									bodyBorder : false,
									height : 50,
									style : "padding-top:5px;",
									html : "<table><tr><td align='center'><span class='portal-text-small-bold'>No attachments</span></td></tr></table>"
								} ]
							} ]
				} ]
			});

	return attachmentsInfoPanel;
}

Ext.namespace("casetracking.update.ux.panel.attachments.AttachmentsInfo");
casetracking.update.ux.panel.attachments.AttachmentsInfo = function(config) {

	var AttachmentGridId = (config.AttachmentGridId && config.AttachmentGridId !== undefined) ? config.AttachmentGridId
			: "casetracking.update.ux.panel.attachments.AttachmentsDefaultGridId";

	var attachmentsInfoPanel = new Ext.Panel(
			{
				bodyBorder : false,
				border : false,
				hideBorders : true,
				items : [ {
					autoHeight : true,
					items : [
							{
								xtype : "panel",
								border : false,
								cls : "casetracking-title",
								style : "padding-top:10px;",
								bodyCssClass : "casetracking-title-body",
								layout: "column",
								items : [
										{
											xtype : "panel",
											border : false,
											bodyBorder : false,
											columnWidth : .5,
											cls : "casetracking-title",
											bodyCssClass : "casetracking-title-body",
											html : "Attachments"
										},
										{
											xtype : "panel",
											border : false,
											bodyBorder : false,
											columnWidth : .5,
											cls : "casetracking-title",
											bodyCssClass : "casetracking-title-body",
											html : "<table width='100%' cellpadding='0' cellspacing='0'><tr><td align='right'><div id='casetracking.update.ux.panel.attachments.AttachmentsInfoGridIcon' class='grid-collapse-icon' style='visibility: visible;' onmouseover='this.style.cursor=\"pointer\";' onclick='toggleGrid(\""
													+ AttachmentGridId
													+ "\", this.id);'></div></td></tr></table>"
										} ]
							},
							{
								xtype : "grid",
								autoScroll : true,
								border : false,
								height : 140,
								buttonAlign : "right",
								id : AttachmentGridId,
								stripeRows : true,
								cm : new Ext.grid.ColumnModel(
										{
											columns : [
													{
														header : 'Added On',
														sortable : true,
														width : 90,
														dataIndex : "createDate",
														renderer : function(val) {
															if (val.time) {
																var dateNoteAddedStr = '';
																if (val != null) {
																	dateNoteAddedStr = new Date(
																			val.time.time);
																	dateNoteAddedStr = dateNoteAddedStr
																			.format('m/d/Y');
																}
																return dateNoteAddedStr;
															} else {
																return val;
															}
														}
													},
													{
														header : 'Name',
														sortable : true,
														width : 200,
														dataIndex : "file.fileName"
													},
													{
														header : 'Added By',
														sortable : true,
														width : 200,
														dataIndex : "createByUser",
														renderer : function(val) {
															if (val.firstName) {
																return val.firstName
																		+ " "
																		+ val.lastName;
															} else {
																return val;
															}
														}
													},
													{
														header : 'Size',
														width : 90,
														sortable : true,
														dataIndex : "file.sizeInByte",
														renderer : function(val) {
															return Ext.util.Format
																	.fileSize(val);
														}
													} ],
											defaults : {
												sortable : true,
												menuDisabled : true
											}
										}),
								store : new Ext.data.Store({
									reader : new Ext.data.JsonReader({
										root : 'data',
										fields : [ 'createDate',
												'file.fileName',
												'createByUser',
												'file.sizeInByte' ]
									}),
									data : {
										data : config.aCase.attachmentFileList
									}
								})
							} ]
				} ]
			});

	return attachmentsInfoPanel;
};

// notes button panel
Ext
		.namespace("casetracking.update.ux.panel.attachments.AttachmentsInfoButtons");
casetracking.update.ux.panel.attachments.AttachmentsInfoButtons = function(
		config) {

	var attachmentsInfoButtonsPanel = new Ext.Panel(
			{
				layout : 'fit',
				bodyBorder : false,
				border : false,
				hideBorders : true,
				items : [ {
					autoHeight : true,
					items : [ {
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
									style : "padding-left: 10;padding-top:5px;",
									html : "<table><tr><td align='left'><div class='form-refresh-icon' style='visibility: visible;' onmouseover='this.style.cursor=\"pointer\";' onclick='refreshAttachments(\""
											+ config.AttachmentGridId
											+ "\");'></div></td></tr></table>"
								},
								{
									xtype : "panel",
									border : false,
									bodyBorder : false,
									width : 140,
									style : "padding-left: 0;padding-top:5px;",
									html : "<table width='100%'><tr><td align='right'><div class='form-add-attachment-icon' style='visibility: visible;' onmouseover='this.style.cursor=\"pointer\";' onclick='"
											+ config.invokeFileWindowFunction
											+ "();'></div></td></tr></table>"
								} ]
					} ]
				} ]
			});

	return attachmentsInfoButtonsPanel;
};