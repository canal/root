Ext.namespace("casetracking.help.UserGuide");
casetracking.help.UserGuide = function(config) {
	
	function userGuideTemplate (){		
		//This is the actual Template
		var t = new Ext.XTemplate(
				'<table width="100%">'
				,'<tr>'
				,'<td align="left">'
				,'<span class="idxmTextMedium">For further assistance, please view our User Guide.</span>'
				,'</td>'				
				,'</tr>'
				,'<tr>'
				,'<td align="left">'
				,'<span class="portal-link"><a href="#" onclick="userGuideWindow();" ><table><tr><td width=25 align=left><div class="pdf-icon" style="visibility: visible;"></div></td><td><span class="idxmTextSmall">Last updated: ' + config.lastUpdated + '<BR>' + config.docSize + '</span></td></tr></table></a></span>'
				,'</td>'
				,'</tr>'
				,'</table>'
				);
		 		
		//Pass data to template
		var templateString = t.apply({UserGuideURL: config.userGuideURL});	

		return templateString;
		
	}; // end template function
	
	var UserGuidePanel = 
		new Ext.Panel({
			renderTo:config.formPanelDivID
			,layout:'column'								    
			,bodyBorder: false						    
			,border: false
			,hideBorders: true		
			,width:485
			,items: [{
					autoHeight:true
					,items:[{
							xtype : "panel",
							border : false,
							cls : "portal-title",
							html : "User Guide",
							layout : "column"					       	  
					       },{
							xtype: "panel",
							border: false,					
							cls:"portal-titles",
							style:"padding-top:5px;",
							html: userGuideTemplate()
							,width:485
							,autoHeight:true
							,autoScroll:true
					       }]
				}]
		});	
	return UserGuidePanel;
};
function userGuideWindow() {	
	var win = window.open(UserGuideURL,"UserGuide","width=750,height=500,location=no,status=no,scrollbars=auto,resizable=yes,toolbar=no,menubar=no");
};