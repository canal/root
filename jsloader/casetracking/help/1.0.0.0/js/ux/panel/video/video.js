Ext.namespace("casetracking.help.Videos");
casetracking.help.Videos = function(config) {
	
	function videoTemplate (_config){
		//This is the actual Template
        var htmlStr = "" + document.getElementById(_config.htmlTemplate).innerHTML;
		var t = new Ext.XTemplate(htmlStr);

		return t.apply();
    }
	
	var VideoPanel =
		new Ext.Panel({
			renderTo:config.formPanelDivID,
			layout:'column',
			bodyBorder: false,
			border: false,
			hideBorders: true,
			width:485,
			items: [{
					autoHeight:true
					,items:[
                        {
							xtype : "panel",
							border : false,
							cls : "portal-title",
							html : "Training Videos",
							layout : "column"					       	  
                        },
                        {
							xtype: "panel",
							border: false,					
							cls:"portal-titles",
							style:"padding-top:5px;",
							html: videoTemplate(config),
							width:485,
							autoHeight:true,
							autoScroll:true
                        }
                ]
				}]
		});	
	return VideoPanel;
};