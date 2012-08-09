Ext.namespace("IDXM.Utilities.TogglePanels");
IDXM.Utilities.TogglePanels = function (){
	
	var panelsArray = new Array();
	
	function disableFieldsInPanel(m_panelsObject){
		m_panelsObject.cascade(function(item){
		  if (item.isFormField) {
		    item.disable();
		  }
		});			
	}
	
	function enableFieldsInPanel(m_panelsObject){
		m_panelsObject.cascade(function(item){
		  if (item.isFormField) {
		    item.enable();
		  }
		});			
	}	

	var jsonObject = {
		
		//Set Panels
		setPanels:function(m_panelsArray){
			panelsArray = m_panelsArray;
		},
		
		//Get Panels
		getPanelsArray:function(){
			return panelsArray;
		},
		
		//Hide Panels
		hidePanels:function(){
			for(var i=0;i<panelsArray.length;i++){
				panelsArray[i].disable();
				panelsArray[i].hide();
				disableFieldsInPanel(panelsArray[i]);
			}
		},
		
		//Show Panels
		showPanel:function(m_panelObject){
			jsonObject.hidePanels();
			m_panelObject.enable();
			m_panelObject.show();
			enableFieldsInPanel(m_panelObject);
		},
		
		//Enable Panel
		enablePanel:function(m_panelObject){
			m_panelObject.enable();			
			enableFieldsInPanel(m_panelObject);		
		},
		
		//Disable Panel
		disablePanel:function(m_panelObject){
			m_panelObject.disable();			
			disableFieldsInPanel(m_panelObject);		
		},
		
		//Enable Show Panel
		enableShowPanel:function(m_panelObject){
			m_panelObject.enable();		
			m_panelObject.show();
			enableFieldsInPanel(m_panelObject);
            m_panelObject.doLayout();
		},		
		
		//Disable Hide Panel
		disableShowPanel:function(m_panelObject){
			m_panelObject.disable();	
			m_panelObject.hide();
			disableFieldsInPanel(m_panelObject);
            m_panelObject.doLayout();
		},

		//Disable Hide Panel
		disableHidePanel:function(m_panelObject){
			m_panelObject.disable();
			m_panelObject.hide();
			disableFieldsInPanel(m_panelObject);
		}
	};
	
	return jsonObject;
};

Ext.namespace("IDXM.Utilities.HideAndShowPanel");
IDXM.Utilities.HideAndShowPanel = function (config){
	var panel;
	if(config.name){
		panel = Ext.getCmp(config.name);
	}else if(config.object){
		panel = config.object;
	}

	if(panel){
		if(panel.isVisible()){
			panel.setVisible(false);
		}else{
			panel.setVisible(true);				
		}
	}
};

Ext.namespace("IDXM.Utilities.PreferencesHideAndShow");
IDXM.Utilities.PreferencesHideAndShow = function(config) {
	new Ext.Panel	({
				renderTo : config.renderTo,
				border : false,
				bodyBorder : false,
				hideBorders : true,
				width : 650,
				hidden:false,
				items : [	{
							xtype : "panel",
							html: 	'<table width="100%"><tr>'
								+ '<td align="left"><span class="preferences-heading">'+ config.title + '</span></td>'
								+ '<td align="right">'
								+ '<div class="preferences-heading-update" onclick="IDXM.Utilities.HideAndShowPanel({name:\'' + config.togglePanelId + '\'});" onmouseover="document.body.style.cursor=\'pointer\';" onmouseout="document.body.style.cursor=\'default\';">Update</div>'
								+ '</td>'
								+'</tr></table>'
								+ '<div class="preferences-solid-line">&nbsp;</div>'
						}
					]
			});
};


Ext.namespace("IDXM.Utilities.TreeBuilder");
IDXM.Utilities.TreeBuilder = function(array,treePanel,treePanelName){
	
	if(!treePanelName){
		treePanelName = "No Root Name was provided"
	}

	if(treePanel){
		//Default Root Node
		var treeRootNode = new Ext.tree.TreeNode	({	id: treePanel.getRootNode().id + "_root",
									text: treePanelName,
									draggable: false,												
									leaf:false
								});
	}
		
	//Array
	if(array){
	
		if(array[0]){
			//New Root Node
			treeRootNode = new Ext.tree.TreeNode	({	id: array[0].id,
										text:treePanelName,
										draggable: false,												
										leaf:false
									});		
		}

		if(array[1] && treeRootNode){
			for(var i=1;i<array.length;i++){																		

				//If Root Node
				if(array[0].id == array[i].parentID){
					var isNodeParentInTree = treeRootNode;
				}else{										
					var isNodeParentInTree;

					function returnParenNode(childNode){					
						if(childNode.id == array[i].parentID){
							isNodeParentInTree = childNode;
						}else{
							if(childNode.hasChildNodes()){
								childNode.eachChild(returnParenNode);						
							}
						}																	
					}

					treeRootNode.eachChild(returnParenNode);					
				}																								

				var isNodeInTree = treeRootNode.findChild("id",array[i].id);				

				if (!isNodeInTree && isNodeParentInTree){																			

					isNodeParentInTree.appendChild(new Ext.tree.TreeNode({	id:array[i].id,
												text: array[i].text,
												draggable: false,												
												leaf:false,
												expanded:true
											}));
				}						
			}															
		}
		
	}
	
	if(treePanel){
		treePanel.setRootNode(treeRootNode);
		treePanel.expandPath(treeRootNode.getPath());
	}	
};//End of IDXM.Utilities.TreeBuilder


Ext.namespace("IDXM.Utilities");
IDXM.Utilities.createErrorList = function (arr, width){
  var errorTpl = new Ext.XTemplate(
    '<table width="{width}" cellspacing="0" cellpadding="0">',
      '<tr><td colspan="3" height="10">&nbsp;</td></tr>',
      '<tpl for="list">',
        '<tr><td valign="top"><b>{#}.</b></td><td width="10"></td><td style="padding-bottom:5px;"><font class="templateTextNormalBold" style="font-weight:normal; font-family:verdana; font-size:11px;">{comment}</font></td></tr>',
      '</tpl>',
    '</table>'
  );

  return errorTpl.applyTemplate({"list":arr, "width":width});
};

IDXM.Utilities.createErrorFieldList = function (arr, width){
  var errorTpl = new Ext.XTemplate(
    '<table width="{width}" cellspacing="0" cellpadding="0">',
      '<tr><td colspan="3" height="10">&nbsp;</td></tr>',
      '<tpl for="list">',
        '<tr><td valign="top"><b>{#}.</b></td><td width="10"></td><td style="padding-bottom:5px;"><font class="templateTextNormalBold" style="font-weight:normal; font-family:verdana; font-size:11px;">{description}</font></td></tr>',
      '</tpl>',
    '</table>'
  );

  return errorTpl.applyTemplate({"list":arr, "width":width});
};

Ext.namespace("IDXM.Utilities");
IDXM.Utilities.ApplicationLinks = function (config){
	
	var valueToReturn;
	
	if(config.userClass.toLowerCase() == "client"){
		
		var applicationsClientEnterprice = 
			{
				dev:[{name:"Go to EnterPrice Homepage",link:"http://rck-vmdevweb-61:91/"},{name:"Go to Portal Homepage",link:"http://rck-dev-ptl-01/bluenog"}]
				,dev11g:[{name:"Go to EnterPrice Homepage",link:"http://dev.enterprice.multiplan.com/"},{name:"Go to Portal Homepage",link:"http://dev.client.multiplan.com/bluenog"}]
				,sqa:[{name:"Go to EnterPrice Homepage",link:"http://sqa.multiplan.com:91"},{name:"Go to Portal Homepage",link:"http://rck-vmsqabn-01/bluenog"}]
				,sqa11g:[{name:"Go to EnterPrice Homepage",link:"http://sqa11g.enterprice.multiplan.com/"},{name:"Go to Portal Homepage",link:"http://sqa11g.client.multiplan.com/bluenog"}]
				,uat9i:[{name:"Go to EnterPrice Homepage",link:"http://uat.enterprice.multiplan.com/"},{name:"Go to Portal Homepage",link:"http://uat.client.multiplan.com/bluenog"}]
				,uat11g:[{name:"Go to EnterPrice Homepage",link:"http://uat11g.enterprice.multiplan.com/"},{name:"Go to Portal Homepage",link:"http://uat11g.client.multiplan.com/bluenog"}]
				,prod:[{name:"Go to EnterPrice Homepage",link:"https://enterprice.multiplan.com"},{name:"Go to Portal Homepage",link:"https://client.multiplan.com"}]
			};
			
		var applicationsClient = 
			{
				dev:[{name:"Go to Portal Homepage",link:"http://rck-dev-ptl-01/bluenog"}]
				,dev11g:[{name:"Go to Portal Homepage",link:"http://dev.client.multiplan.com/bluenog"}]
				,sqa:[{name:"Go to Portal Homepage",link:"http://rck-vmsqabn-01/bluenog"}]
				,sqa11g:[{name:"Go to Portal Homepage",link:"http://sqa11g.client.multiplan.com/bluenog"}]
				,uat9i:[{name:"Go to Portal Homepage",link:"http://uat.client.multiplan.com/bluenog"}]
				,uat11g:[{name:"Go to Portal Homepage",link:"http://uat11g.client.multiplan.com/bluenog"}]
				,prod:[{name:"Go to Portal Homepage",link:"https://client.multiplan.com"}]
			};			
		
		if(config.repricer){		
			valueToReturn = eval("applicationsClientEnterprice."+config.env);
		}else{
			valueToReturn = eval("applicationsClient."+config.env);
		}
		
		if(valueToReturn){
			return valueToReturn;
		}else{
			return eval("applicationsClient.dev");
		}

	}

	if(config.userClass.toLowerCase() == "vendor"){
		var applicationsVendor = 
			{
				dev:[
						{name:"Provider Matching",link:"http://develop.multiplan.com/app/providermatch"}
						,{name:"FNX",link:"http://vm-dev-web-50.multiplan.com/fnx/"}
						,{name:"FNX Provider Matching",link:""}
						,{name:"Reqlog",link:"http://develop.multiplan.com/app/reqlog"}
						,{name:"MP3 Facility",link:""}
						,{name:"Customer Service",link:"http://develop.multiplan.com/app/facility/"}
						,{name:"Portal Homepage",link:"http://rck-dev-ptl-01/bluenog"}
					]
				,dev11g:[
						{name:"Provider Matching",link:"http://develop.multiplan.com/app/providermatch"}
						,{name:"FNX",link:"http://vm-dev-web-50.multiplan.com/fnx/"}
						,{name:"FNX Provider Matching",link:""}
						,{name:"Reqlog",link:"http://develop.multiplan.com/app/reqlog"}
						,{name:"MP3 Facility",link:""}
						,{name:"Customer Service",link:"http://develop.multiplan.com/app/facility/"}
						,{name:"Portal Homepage",link:"http://dev.enterprice.multiplan.com/bluenog"}
					]	
				,sqa:[
						{name:"Provider Matching",link:"http://sqa.multiplan.com/app/providermatch"}
						,{name:"FNX",link:"http://rck-vmdevweb-74.multiplan.com/fnx/"}
						,{name:"FNX Provider Matching",link:"http://rck-vmdevweb-74.multiplan.com/match/"}
						,{name:"Reqlog",link:"http://sqa.multiplan.com/app/reqlog/"}
						,{name:"MP3 Facility",link:"http://sqa.multiplan.com/app/facility/"}
						,{name:"Customer Service",link:"http://sqa.multiplan.com:86/"}		
						,{name:"Portal Homepage",link:"http://rck-vmsqabn-01/bluenog"}						
					]					
				,sqa11g:[
						{name:"Provider Matching",link:"http://sqa11g.www.multiplan.com/app/providermatch/"}
						,{name:"FNX",link:"http://sqa11g.apps.multiplan.com/fnx/"}
						,{name:"FNX Provider Matching",link:"http://sqa11g.apps.multiplan.com/match/"}
						,{name:"Reqlog",link:"http://sqa11g.www.multiplan.com/app/reqlog/"}
						,{name:"MP3 Facility",link:"http://sqa11g.www.multiplan.com/app/facility/"}
						,{name:"Customer Service",link:"http://sqa11g.servicetracking.multiplan.com"}		
						,{name:"Portal Homepage",link:"http://sqa11g.enterprice.multiplan.com/bluenog"}						
					]
				,uat9i:[
						{name:"Provider Matching",link:"http://uat.multiplan.com/app/providermatch"}
						,{name:"FNX",link:"http://rck-vm-uat-b-01.multiplan.com/fnx/"}
						,{name:"FNX Provider Matching",link:"http://rck-vm-uat-b-01.multiplan.com/match"}
						,{name:"Reqlog",link:"http://uat.multiplan.com/app/reqlog/"}
						,{name:"MP3 Facility",link:"http://uat.multiplan.com/app/facility/"}
						,{name:"Customer Service",link:"http://sqa.multiplan.com:86/"}	
						,{name:"Portal Homepage",link:"http://uat.enterprice.multiplan.com/bluenog"}
					]
				,uat11g:[
						{name:"Provider Matching",link:"http://uat11g.www.multiplan.com/app/providermatch/"}
						,{name:"FNX",link:"http://uat11g.apps.multiplan.com/fnx/"}
						,{name:"FNX Provider Matching",link:"http://uat11g.apps.multiplan.com/match/"}
						,{name:"Reqlog",link:"http://uat11g.www.multiplan.com/app/reqlog/"}
						,{name:"MP3 Facility",link:"http://uat11g.www.multiplan.com/app/facility/"}
						,{name:"Customer Service",link:"http://uat11g.servicetracking.multiplan.com"}		
						,{name:"Portal Homepage",link:"http://uat11g.enterprice.multiplan.com/bluenog"}	
					]					
				,prod:[
						{name:"Provider Matching",link:"http://www.multiplan.com/app/providermatch"}
						,{name:"FNX",link:"http://apps.multiplan.com/fnx"}
						,{name:"FNX Provider Matching",link:"http://apps.multiplan.com/match"}
						,{name:"Reqlog",link:"http://www.multiplan.com/app/reqlog/"}
						,{name:"MP3 Facility",link:"http://www.multiplan.com/app/facility/"}
						,{name:"Customer Service",link:"http://servicetracking.multiplan.com/"}	
						,{name:"Portal Homepage",link:"https://vendor.multiplan.com"}
					]
			};
			
			valueToReturn = eval("applicationsVendor."+config.env);
			
			if(valueToReturn){
				return valueToReturn;
			}else{
				return eval("applicationsVendor.dev");
			}			

	}
	
	
	if(config.userClass.toLowerCase() == "provider"){
		var applicationsProvider = 
			{
				dev:[
						{name:"Portal Homepage",link:"http://provider.multiplan.com/bluenog"}
					]
				,dev11g:[
						{name:"Portal Homepage",link:"http://dev.enterprice.multiplan.com/bluenog"}
					]	
				,sqa:[
						{name:"Portal Homepage",link:"http://sqa.provider.multiplan.com/bluenog/portal"}						
					]					
				,sqa11g:[
						{name:"Portal Homepage",link:"http://sqa11g.enterprice.multiplan.com/bluenog"}						
					]
				,uat9i:[
						{name:"Portal Homepage",link:"http://uat.enterprice.multiplan.com/bluenog"}
					]
				,uat11g:[
						{name:"Portal Homepage",link:"http://uat11g.enterprice.multiplan.com/bluenog"}	
					]					
				,prod:[
						{name:"Portal Homepage",link:"https://provider.multiplan.com"}
					]
			};
			
			valueToReturn = eval("applicationsProvider."+config.env);
			
			if(valueToReturn){
				return valueToReturn;
			}else{
				return eval("applicationsProvider.dev");
			}			

	}
};