/**
 * Extension: IDXM.tree.TreeCheckboxPicker extends Ext.Panel
 * This extension adds multiple text fields in a unified column Panel layout
 */
Ext.namespace("IDXM.tree.TreeCheckboxPicker");
IDXM.tree.TreeCheckboxPicker = Ext.extend(uRadix.form.FormPanel,
{

  initComponent: function()
  { 	
	/** Tree Parameters
	 * 	Required
	 * 	treePanelID
	 * 	treePanelDataURL
	 * 	treePanelRootID
	 * 	Optional
	 * 	treePanelFrame
	 * 	treePanelNodeType
	 */
  	
  	var treePanelName = this.treePanelName;

	 //Root Node
	 var treeRootNode = new Ext.tree.TreeNode({	id: this.treePanelRootID,
							text: this.treePanelName,
							draggable: false,												
							leaf:false
						});

	//Append Child Nodes to Root Node
	treeRootNode.appendChild(this.treeNodesToLoad);	

	//Tree Panel
	var treePanel = new Ext.tree.TreePanel({
							id:this.treePanelID,
							title:this.treePanelTitle,
							frame: this.treePanelFrame,
							ctCls: "tree-portal-node-no-icon",
							cls: "idxm-tree-panel",
							useArrows:true,
							autoScroll:true,
							height:375,
							width:260,
							autoShow:true,								
							rootVisible:true,
							containerScroll: true,
							style:"background-color:#ffffff; padding-left:10px; padding-top:10px; padding-right:10px; padding-bottom:10px;",
							bodyStyle:"padding-top:7px;",
							selModel: new Ext.tree.MultiSelectionModel({}),
							root: treeRootNode
	});	

	 //Root Node
	 var treeRootNodeLeft = new Ext.tree.TreeNode({	id: this.treePanelRootID + "left",
							text: this.treePanelName,
							draggable: false,												
							leaf:false
						});			 	


	//Tree Panel
	var treePanelLeft = new Ext.tree.TreePanel({
							id:this.treePanelID + "left",
							title:"Selected " + this.treePanelTitle,
							frame: this.treePanelFrame,
							cls: "idxm-tree-panel",
							useArrows:true,
							autoScroll:true,
							height:375,
							width:260,
							autoShow:true,
							rootVisible:true,
							containerScroll: true,
							style:"background-color:#ffffff; padding-top:10px; padding-right:10px; padding-bottom:10px;",
							bodyStyle:"padding-top:7px;",
							selModel: new Ext.tree.MultiSelectionModel({}),
							root: treeRootNodeLeft
	});	

	//Return number of spaces
	function getSpaces(numberOfSpaces){			
		var spacesToReturn = "";
		var spaces = "&nbsp;&nbsp;&nbsp;&nbsp;";

		for(var i=1;i<=numberOfSpaces;i++){
			spacesToReturn += spaces;
		}

		return spacesToReturn;
	}

	//Check to see if the parent node id is in the array
	function isParentInArray(parentNode,grpArr){
		for(var a=0; a<grpArr.length; a++){
			if(parentNode.parentNode.id == grpArr[a].id){
				return true;
			}
		}
		return false;
	}

	//Push Parent Nodes to Array if they are not there
	function pushParentsToArray(checkedNode,grpArr){
		try{
				if(checkedNode.parentNode != null){
					if(!isParentInArray(checkedNode,grpArr)){
						pushParentsToArray(checkedNode.parentNode,grpArr);

						if(checkedNode.parentNode.parentNode){
							grpArr.push({"id":checkedNode.parentNode.id, "space": getSpaces(checkedNode.parentNode.getDepth()),"text": checkedNode.parentNode.text,"parentID": checkedNode.parentNode.parentNode.id, "parent": checkedNode.parentNode.parentNode.text});
						}else{
							grpArr.push({"id":checkedNode.parentNode.id, "space": getSpaces(checkedNode.parentNode.getDepth()),"text": checkedNode.parentNode.text,"parentID": "", "parent": ""});
						}						
					}
			}
		}catch(e){}
	}

	//Returns true if parent node is checked
	function findIfAnyParentIsChecked(node){
		if(node.parentNode.id != treePanel.getRootNode().id){	
			if(node.parentNode.getUI().isChecked()){
				return true;
			}else{
				if(node.parentNode){
					return findIfAnyParentIsChecked(node.parentNode);
				}
			}			
		}

		return false;
	}

	//Get Final Group Array
	function getFinalGroupsArray(){
	    var grpArr = Array();
	    var grpParenArr = Array();
	    var checkedGrps = treePanel.getChecked();

	    if(checkedGrps.length){
			//Build grpArray with checked nodes including parent inheritance
			for(var i=0; i<checkedGrps.length; i++)
			{
				pushParentsToArray(checkedGrps[i],grpArr);

				if(checkedGrps[i].parentNode){
					if(checkedGrps[i].hasChildNodes()){
						grpArr.push({"id":checkedGrps[i].id, "space": getSpaces(checkedGrps[i].getDepth()),"text": checkedGrps[i].text ,"parentID": checkedGrps[i].parentNode.id ,"parent": checkedGrps[i].parentNode.text});
					}else{
						grpArr.push({"id":checkedGrps[i].id, "space": getSpaces(checkedGrps[i].getDepth()),"text": checkedGrps[i].text,"parentID": checkedGrps[i].parentNode.id,"parent": checkedGrps[i].parentNode.text});
					}
				}else{
					grpArr.push({"id":checkedGrps[i].id, "space": getSpaces(checkedGrps[i].getDepth()),"text": checkedGrps[i].text,"parentID": "", "parent": ""});
				}												
			}
	    }
	    return grpArr;
	}		

	//Function to Set Values on Flat Array
	function setValues(){
		var finalGroupArray = getFinalGroupsArray();

		//Show Right Tree
		IDXM.Utilities.TreeBuilder(finalGroupArray,treePanelLeft,treePanelName);			

		var checkedIdArrayString = Ext.encode(treePanel.getChecked("id"));			
		hiddenField4SelectedNodes.setValue(checkedIdArrayString);
		hiddenField4SelectedNodeArray.setValue(Ext.encode(finalGroupArray));	
	}

	//Function to Toggle Children
	function toggleChildren(node){
		if(node.id != treePanel.getRootNode().id){			

			node.expand();

			if(node.getUI().isChecked()){
				function checkAndDisableChildren(node){
					try{
						node.getUI().toggleCheck(true);
					}catch(e){}
				}

				node.eachChild(checkAndDisableChildren);					
			}else{
				//Uncheck Parent when unchecking child
				if(node.parentNode){
					if(node.parentNode.id != treePanel.getRootNode().id){
						if(node.parentNode.getUI().isChecked()){
							node.parentNode.getUI().toggleCheck(false);
						}
					}
				}
			}
		}
	}	

	//View Selected Groups when a check box is checked/unchecked
	treePanel.on("checkchange", function(node){setValues(); toggleChildren(node);},this,{buffer:1000});

	//View Selected Groups when a node is expanded
	treePanel.on("expandnode", function(node){setValues(); toggleChildren(node);},this,{buffer:1000});

	//OnClick Event
	treePanel.on("click", function(node){
	  if(!node.disabled)
	  {
//            toggleChildren(node);

		if(node.getUI().isChecked()){

			node.getUI().toggleCheck(false);

			function uncheckAndEnableChildren1(node){
				try{
					node.getUI().toggleCheck(false);
					node.eachChild(uncheckAndEnableChildren1);
				}catch(e){}
			}
			node.eachChild(uncheckAndEnableChildren1);
		}else{
			node.getUI().toggleCheck(true);
		}
          }
	});

	var columnTreePickViewerPanel = new Ext.Panel({
							id:this.treePickerID,
							layout:"column",
							//style:"padding-left:10px; padding-top:10px; padding-right:10px;",
							frame:false,
							border: false,
							bodyBorder: false,
							items: [
									{columnWidth: .45,items:[treePanel],border:false}
									,{columnWidth: .10, html:"&nbsp;", border:false}
									,{columnWidth: .45,items:[treePanelLeft],border:false}
							]
						});

	var hiddenField4SelectedNodes = new Ext.form.Hidden({id:this.selecteTreeValuesID,name:this.selecteTreeValuesID,hidden:true,value:""});						
	var hiddenField4SelectedNodeArray = new Ext.form.Hidden({id:this.selecteTreeNodeArrayID,name:this.selecteTreeNodeArrayID,hidden:true,value:""});

	//Aply this to Panel
	Ext.apply(this, {					
				layout:"form",	
				border: false,
				frame: false,
				bodyBorder: false,				
				items: [columnTreePickViewerPanel,hiddenField4SelectedNodes,hiddenField4SelectedNodeArray]				
			});

	//Apply initial config
	Ext.apply(this.initialConfig,{layout: this.layout,items: this.items});  	

	IDXM.tree.TreeCheckboxPicker.superclass.initComponent.call(this, arguments);
  }

});
Ext.reg('treeCheckboxPicker', IDXM.tree.TreeCheckboxPicker);

