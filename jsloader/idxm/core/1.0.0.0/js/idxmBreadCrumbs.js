Ext.namespace("IDXM.Utilities.BreadCrumbBuilder");
IDXM.Utilities.BreadCrumbBuilder = function(breadCrumbPanelDivID,breadCrumbsArray){

	var breadCrumbPanel = 
		new Ext.Panel({
			id: breadCrumbPanelDivID+"EXT_ID",
			renderTo: breadCrumbPanelDivID,
			frame:false,
			bodyBorder:false,
			border:false,
			layout:"column"
		});

	var breadCrumbObject = {"breadCrumbsArray":breadCrumbsArray};		

	if(breadCrumbsArray.length == 1){
		var tpl = new Ext.XTemplate(	'<tpl for="breadCrumbsArray">'
						,'<tpl if="[xindex] == 1" >'
						,'<a class="breadCrumbActive-portal">{linkText}</a>'
						,'</tpl>'													
					,'</tpl>'
				);
	}else{
		var tpl = new Ext.XTemplate(	'<tpl for="breadCrumbsArray">'
						,'<tpl if="[xindex] == 1" >'
						,'<a class="breadCrumb-portal" href="javascript:Wizard.PortalContainer.navigate({url:\'{linkActionName}\'})">{linkText}</a>'
						,'</tpl>'
						,'<tpl if="[xindex] != 1" >'
						,' <span class="breadCrumbSeparator-portal"> > </span> <a class="breadCrumbActive-portal">{linkText}</a>'
						,'</tpl>'							
					,'</tpl>'
				);	
	}
	tpl.overwrite(breadCrumbPanel.body, breadCrumbObject);			
};//End of IDXM.Utilities.BreadCrumbBuilder

Ext.namespace("IDXM.Utilities.BreadCrumbBuilderPlain");
IDXM.Utilities.BreadCrumbBuilderPlain = function(breadCrumbPanelDivID,breadCrumbsArray){

	var breadCrumbPanel = 
		new Ext.Panel({
			id: breadCrumbPanelDivID+"EXT_ID",
			renderTo: breadCrumbPanelDivID,
			frame:false,
			bodyBorder:false,
			border:false,
			layout:"column"
		});

	var breadCrumbObject = {"breadCrumbsArray":breadCrumbsArray};		

	if(breadCrumbsArray.length == 1){
		var tpl = new Ext.XTemplate(	'<tpl for="breadCrumbsArray">'
						,'<tpl if="[xindex] == 1" >'
						,'<a class="breadCrumbActive-portal">{linkText}</a>'
						,'</tpl>'													
					,'</tpl>'
				);
	}else{
		var tpl = new Ext.XTemplate(	'<tpl for="breadCrumbsArray">'
						,'<tpl if="[xindex] == 1" >'
						,'<a class="breadCrumbActive-portal">{linkText}</a>'
						,'</tpl>'
						,'<tpl if="[xindex] != 1" >'
						,' <span class="breadCrumbSeparator-portal"> > </span> <span class="breadCrumbInactive-portal">{linkText}</span>'
						,'</tpl>'							
					,'</tpl>'
				);	
	}
	tpl.overwrite(breadCrumbPanel.body, breadCrumbObject);			
};//End of IDXM.Utilities.BreadCrumbBuilderPlain

