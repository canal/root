Ext.namespace("casetracking.createpublic.ux.panel.thirdparty.ThirdParty");
casetracking.createpublic.ux.panel.thirdparty.ThirdParty = function(config) {	
	function thirdPartyTemplate() {
		// This is the actual Template
		var t = new Ext.XTemplate(
				'<table width="100%">',
				'<tr>',
				'<td align="left">',
				'<div class="idxmTextMedium">Please call us at 1-800-950-7040 to initiate an inquiry. The representative will ask you to fax a Confidentiality</div>',
				'</td>',
				'</tr>',
				'<td align="left">',
				'<div class="idxmTextMedium">Letter signed by the provider referenced in your inquiry (if you have not already done so).</div>',
				'</td>',
				'</tr>',				
				'<tr>',
				'<td>',
				'&nbsp;',
				'</td>',
				'</tr>',				
				'<tr>',				
				'<td align="left">',
				'<div class="idxmTextMedium">You can <a href="{urlTpiForm}" style=\"font: 11px tahoma,arial,verdana,sans-serif;color:black;\"">download the Confidentiality letter here</a> and fax the completed, signed form to the appropriate fax</div>',
				'</td>', 
				'</tr>', 
				'<tr>',				
				'<td align="left">',
				'<div class="idxmTextMedium">number based on the network related to your inquiry:</div>',
				'</td>', 
				'</tr>', 
				'<tr>',
				'<td>',
				'&nbsp;',
				'</td>',
				'</tr>',
				'<tr>',
				'<td>',
				'<table width="50%">',
				'<tr><td><div class="idxmTextMedium">MultiPlan fax number:</div></td><td><div class="idxmTextMedium">1-888-850-7604</div></td></tr>',
				'<tr><td><div class="idxmTextMedium">Viant fax number:</div></td><td><div class="idxmTextMedium">1-855-235-4755</div></td></tr>',
				'</table>',
				'</td>',
				'</tr>',			
				'</table>');
		// Pass data to template
		var templateString = t.apply({
			urlTpiForm : config.urlTpiForm
		});

		return templateString;
	}; // end template function

	var ThirdPartyPanel = new Ext.Panel({
		layout : 'column',
		bodyBorder : false,
		border : false,
		hideBorders : true,
		items : [{
				autoHeight : true,
				items : [{
					xtype : "panel",
					border : false,
					cls : "portal-titles",
					html : thirdPartyTemplate(),
					width : 850,
					autoHeight : true,
					autoScroll : true
				}]
			} ]
	});

	return ThirdPartyPanel;
};