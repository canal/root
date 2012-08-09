Ext.namespace("casetracking.core.windows.PriorityExplanation");
casetracking.core.windows.PriorityExplanation = function (config){
	
	var priorities;
	var inquiryIdCmp = Ext.getCmp(config.inquiryId);
	var inquiryId = inquiryIdCmp.getValue();
	
	if(inquiryId == config.negotiationServicesCode ){
		priorities = config.caseNegotiationServicesPriorityList;
	}else{
		priorities = config.priorities;
	}	
	
	var items = [];
	if(priorities != null && priorities.length > 0) {
		var index = 0;
		for(var i = 0; i < priorities.length; i++) {
			var priority = priorities[i];
			if(priority.id == "") {
				continue;
			}
			
			var obj = new Object();			
			var html = "<span style='font: bold 14px tahoma,arial,verdana,sans-serif;'>";
			html+= priority.name;
			html+= "</span>";			
			obj.xtype = "panel";
			obj.html = html;
			obj.border = false;
			obj.style = "padding-bottom: 1px;padding-top: 5px;";
			items[index++] = obj;
			
			var obj2 = new Object();			
			var html2 = "<span class='idxmTextMedium'>";
			html2+= priority.description;
			html2+= "</span>";			
			obj2.xtype = "panel";
			obj2.html = html2;
			obj2.border = false;
			items[index++] = obj2;						
		}
	}		

	var win = new Ext.Window({					
				width:550,
				height:250,
				modal:true,
				autoScroll:true,
				resizable:false,
				layout:'fit',
				plain:true,
				items:[{
						xtype:"panel"
						,border:false
						,bodyBorder:false
						,hideBorders:true
						,autoScroll:true
						,style:"background-color:#FFFFFF; background:#FFFFFF; padding:5px;"		
						,items:[
						        {
						        	xtype: "panel"
									,html: "Priority Explanation"
									,cls:"portal-title"						        	
						        }
						        ,{
									xtype: "panel"
									,html: "<span class='idxmTextMedium'>Find out which priority is appropriate for your situation.</span>"
									,style: "padding-bottom: 10px;padding-top: 10px;"									
								}
								,{
									xtype: "panel"
									,border:false
									,style: "padding-left: 10px;"
									,border:false
									,bodyBorder:false
									,hideBorders:true									
									,items: [items]
								}
						]
					}]
			});
	win.show();
};

