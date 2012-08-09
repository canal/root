Ext.namespace("casetracking.help.Faq");
casetracking.help.Faq = function(config) {
	var FaqPanel = null;
	
	if(config.userClassCode && config.userClassCode == 'ANONUSER') {
		FaqPanel = new Ext.Panel({
			renderTo : config.formPanelDivID,
			layout : 'column',
			bodyBorder : false,
			border : false,
			hideBorders : true,
			width : 485,
			items : [ {
				autoHeight : true,
				items :[{
						xtype:"panel",
						border:false,								
						html:"<a href='"+ config.customerserviceOpenCaseUrl + "' class='portal-link-small' onclick='Ext.getBody().mask(\"Back to Open New Service Case...\", \"x-mask-loading\");'>< Back to Open New Service Case</div>",
						style:"padding-bottom:10px;"
					},{
						xtype : "panel",
						border : false,
						cls : "portal-title",
						html : "FAQ",
						width : 485,
						layout : "column"
					},{
						xtype : "panel",
						border : false,
						cls : "portal-titles",
						html : "<div style='width:100%; overflow:auto;'><table width='100%' id='faqsTbl'></table>",
						width : 485,
						autoHeight : true,
						autoScroll : true
					}]
			}]
		});		
	} else {
		FaqPanel = new Ext.Panel({
			renderTo : config.formPanelDivID,
			layout : 'column',
			bodyBorder : false,
			border : false,
			hideBorders : true,
			width : 485,
			items : [{
				autoHeight : true,
				items :[{
						xtype : "panel",
						border : false,
						cls : "portal-title",
						html : "FAQ",
						width : 485,
						layout : "column"
					},{
						xtype : "panel",
						border : false,
						cls : "portal-titles",
						html : "<div style='width:100%; overflow:auto;'><table width='100%' id='faqsTbl'></table>",
						width : 485,
						autoHeight : true,
						autoScroll : true
					}]
			}]
		});		
	}
	addFaqsToTable(config.faqsList);

	return FaqPanel;
};

function addFaqsToTable(faqsList) {
	removeTableData('faqsTbl');
	if (faqsList) {
		for (i = 0; i < faqsList.length; i++) {
			var faq = faqsList[i];
			if (faq != null) {
				addFaq(faq);
			}
		}
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

function addFaq(faq) {
	if (faq != null) {
		var faqsTblRowsSize = document.getElementById('faqsTbl').rows.length;
		var faqsTblRow = document.getElementById('faqsTbl').insertRow(faqsTblRowsSize);
		var faqsTblCell = faqsTblRow.insertCell(0);
		var faqRecord = "<div><table width='100%;' cellspacing='8' cellpadding='10'>";
		faqRecord += "<tr id='faq" + faqsTblRowsSize + "' onclick='toggleFaq(this.id);'><td align='left'>";		
		faqRecord += "<a href='#' class='enduser-application-link'>";
		faqRecord += "<span class='idxmTextMedium'>";
		faqRecord += faq.id;	
		faqRecord += "</span>";
		faqRecord += "</a>";			
		faqRecord += "</td></tr>";
		faqRecord += "<tr id='faq" + faqsTblRowsSize + "Description' style='display: none;'><td align='left'>";
		faqRecord += "<span class='idxmTextMedium'>";
		faqRecord += faq.description;
		faqRecord += "</span>";
		faqRecord += "</td></tr>";
		faqRecord += "</table></div>";

		faqsTblCell.innerHTML = faqRecord;
	}
};

function toggleFaq(id) {
	var toggleElement = document.getElementById(id + "Description");
	if (toggleElement) {
		if (toggleElement.style.display == "block" || toggleElement.style.display == "inline") {
			toggleElement.style.display = "none";
		} else {
			toggleElement.style.display = "block";
		}
	}
};

