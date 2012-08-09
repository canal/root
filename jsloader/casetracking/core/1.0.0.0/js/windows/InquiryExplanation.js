Ext.namespace("casetracking.core.windows.InquiryExplanation");
casetracking.core.windows.InquiryExplanation = function (config){

	var win = new Ext.Window({					
				width:550,
				height:275,
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
						,style:"background-color:#FFFFFF; background:#FFFFFF; padding:5px;"		
						,items:[{
						        	xtype: "panel"
								,html: "Explanation of Inquiry Types"
								,cls:"portal-title"						        	
						        },{
								xtype: "panel"
								,html: "<span class='idxmTextMedium'>Not sure what to select? See an explanation of each inquiry type by selecting<br>it in the dropdown.</span>"
								,style: "padding-bottom: 10px;padding-top: 10px;"
							},{
									xtype: "panel"
									,border:false
									,style: "padding: 20px;"
									,items: [{
													xtype: "resizable-combo",
													mode:"local",
													fieldLabel: "",
													hideLabel: false,
													hiddenName : "popupInquiryId",									
													name:"popupInquiryId",							
													store: new Ext.data.JsonStore({
															fields: ['id', 'name'],
															root : "rows",
															idProperty: "id",
															data:{ "rows":config.inquiries}
													}),
													valueField:"id",
													emptyText: "- Select One -",
													displayField:'name',
													triggerAction: 'all',
													editable:false,
													forceSelection:false,
													selectOnFocus:true,
													width: 200,
													listeners: {
														render: function(){this.el.dom.name = this.name;}
									          				,select: function(combo, record, index) {
									          					if(config.inquiries != null && config.inquiries.length > 0) {
									          						for(var i = 0; i < config.inquiries.length; i++) {
									          							var inquiry = config.inquiries[i];
									          							if(inquiry != null 
									          									&& inquiry.id == record.json.id 
									          									&& inquiry.description != undefined) {									          								
									          								var pnlInquiryDescriptionId = Ext.get("pnlInquiryDescriptionId");
									          								pnlInquiryDescriptionId.update(inquiry.description);
									          							}
									          						}
									          					}
									          				}
													},
													typeAhead:true,
													typeAheadDelay:0
										},{
									        	  xtype: "panel"
									        	  ,border: false
									        	  ,style: "padding-bottom: 10px;padding-top: 10px;"
									        	  ,items:[{
												xtype: "panel",
												id: "pnlInquiryDescriptionId",
												border:false,
												bodyBorder:false,
												hideBorders:true,
												style: "font: 12px tahoma,arial,verdana,sans-serif;",
												height:75 
									        	  }]
									        }]
							}]
					}]
			});
	win.show();
};

