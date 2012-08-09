Ext.namespace("casetracking.reports.ux.form.ReportsForm");
casetracking.reports.ux.form.ReportsForm = function(config) {
	// Panel
	var formPanel = new Ext.Panel(
			{
				renderTo : config.formPanelDivID,
				layout : "form",
				border : false,
				bodyBorder : false,
				hideBorders : true,
				width : 875,
				items : [{
						xtype : "uRadix.form.FormPanel",
						autoScroll : true,
						id : "casetrackingReportsPanelForm" + config.nameSpace,
						formObjectName : "Ext.getCmp('casetrackingReportsPanelForm"+ config.nameSpace + "')",
						items : [{
								xtype : "panel",
								border : false,
								layout : "column",
								style : "padding-top:10px;",
								cls : "portal-title",
								html : "Reports"
							},{
								xtype : "panel",
								border : false,
								html : "<span  class='idxmTextNormal'>Customer Service Reports</span>",
								style : "padding-top:20px;padding-left:20px;"
							},{
								xtype : "panel",
								border : false,
								layout : "form",
								style : "padding-top:20px;padding-left:40px;",
								html : "<span class='casetrackingReportTitle'>Aging Report</span>"
							},{
								xtype : "panel",
								border : false,
								style : "padding-top:10px;padding-left:50px;",
								html : "<table width='525px;'><tr><td>This report shows the age of open and/or closed service cases that were</td></tr><tr><td>opened or reopened within the date range you specify. Service cases are</td></tr><tr><td>broken out by submitter and grouped by the following age ranges: 0-5 days,</td></tr><tr><td>6-10 days, 11-17 days and 18+ days. You also choose the calculation method -</td></tr><tr><td>either calendar or business days.</td></tr><tr><td>&nbsp</td></tr><tr><td align='right'><a class='enduser-application-link' href='"+config.agingReportURL+"' onclick=\"Ext.get(document.body.id).mask(\'<b> Loading...</b> \', \'x-mask-loading\');\"><span class='idxmTextSmall'>Run Report ></span></a></td></tr></table>"
							},{
								xtype : "panel",
								border : false,
								layout : "form",
								style : "padding-top:20px;padding-left:40px;",
								html : "<span class='casetrackingReportTitle'>Status by Inquiry Type Report</span>"
							},{
								xtype : "panel",
								border : false,
								style : "padding-top:10px;padding-left:50px;",
								html : "<table width='525px'><tr><td>This report shows service cases submitted according to Inquiry Type for open</td></tr><tr><td>and/or closed cases that were opened or reopened within the date range you</td></tr><tr><td>specify. You can specify an Inquiry Type (e.g. Claim Network Pricing, Quality</td></tr><tr><td>of Care, etc.) or choose to run them all. Some types allow you to drill down by</td></tr><tr><td>category. You also choose the calculation method - either calendar or business</td></tr><tr><td>days</td></tr><tr><td>&nbsp</td></tr><tr><td align='right'><a class='enduser-application-link' href='"+config.statusInquiryReportURL+"' onclick=\"Ext.get(document.body.id).mask(\'<b> Loading...</b> \', \'x-mask-loading\');\"><span class='idxmTextSmall'>Run Report ></span></a></td></tr></table>"
							},{
								xtype : "panel",
								border : false,
								layout : "form",
								style : "padding-top:20px;padding-left:40px;",
								html : "<span class='casetrackingReportTitle'>Status by Submitter Report</span>"
							},{
								xtype : "panel",
								border : false,
								style : "padding-top:10px;padding-left:50px;",
								html : "<table width='525px'><tr><td>This report shows basic details for each submitter's open and/or closed service</td></tr><tr><td>cases that were opened or reopened within the date range you specify. You</td></tr><tr><td>can base your report on a single submitter's name and/or priority level or</td></tr><tr><td>choose to run them all. You also choose the calculation method - either</td></tr><tr><td>calendar or business days.</td></tr><tr><td>&nbsp</td></tr><tr><td align='right'><a class='enduser-application-link' href='"+config.statusSubmiterReportURL+"' onclick=\"Ext.get(document.body.id).mask(\'<b> Loading...</b> \', \'x-mask-loading\');\"><span class='idxmTextSmall'>Run Report ></span></a></td></tr></table>"
							}]
					}]
			});

	return this;
};