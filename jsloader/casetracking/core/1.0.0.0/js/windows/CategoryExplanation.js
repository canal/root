Ext.namespace("casetracking.core.windows.CategoryExplanation");
casetracking.core.windows.CategoryExplanation = function (config){


    var categoryPanel = config.categoryPanel;
    var categoryCombo = categoryPanel.findByType("resizable-combo");
    var categoryComboStore = categoryCombo[0].getStore();
    var records = [];
        categoryComboStore.each(function(r){
        records.push(r.copy());
    });
    var categoryStore = new Ext.data.Store({
        recordType: categoryComboStore.recordType
    });
    categoryStore.add(records);

	var win = new Ext.Window({					
				width:400,
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
								,html: "Explanation of Category Types"
								,cls:"portal-title"						        	
						        },{
								xtype: "panel"
								,html: "<span class='idxmTextMedium'>Not sure what to select? See an explanation of each category type by selecting it in the dropdown.</span>"
								,style: "padding-top: 10px;"
							},{
									xtype: "panel"
									,border:false
									,style: "padding: 10px; padding-left:20px;"
									,items: [{
                                                xtype: "resizable-combo",
                                                mode:"local",
                                                fieldLabel: "",
                                                hideLabel: false,
                                                store: categoryStore,
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
                                                                    if(inquiry.caseCategoryLookupList){
                                                                        for(var a=0;a < inquiry.caseCategoryLookupList.length;a++){
                                                                            if(inquiry.caseCategoryLookupList[a].id == record.data.id){
                                                                                var pnlCategoryDescriptionId = Ext.get("pnlCategoryDescriptionId");
                                                                                pnlCategoryDescriptionId.update(inquiry.caseCategoryLookupList[a].description);
                                                                            }
                                                                        }
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
						id: "pnlCategoryDescriptionId",
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

