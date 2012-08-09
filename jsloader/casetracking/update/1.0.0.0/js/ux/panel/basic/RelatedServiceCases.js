Ext.namespace("casetracking.update.ux.panel.basic..RelatedServiceCases");
casetracking.update.ux.panel.basic.RelatedServiceCases = function (config){	
	
	var description = "<span class='idxmTextMedium'>The service case you submitted concerns multiple providers; therefore, we have created separate service case numbers for each provider. <BR><BR>Navigation to the original and related service cases is provided below at left. <br><br>Splitting service cases in this manner helps us to expedite resolution, and we will notify you of the progress of each service case.</span>";

	var win = new Ext.Window({					
				width:500,
				height:200,
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
									,html: "Related Service Cases"
									,cls:"portal-title"						        	
						        }
						        ,{
									xtype: "panel"
									,html: description
									,style: "padding-bottom: 10px;padding-top: 10px;"									
								}
						]
					}]
			});
	win.show();
};


