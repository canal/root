Ext.namespace("idxm.core.popups.Cancel");
idxm.core.popups.Cancel = function (config){

	var win = new Ext.Window({					
				width:450,
				height:175,
				modal:true,
				autoScroll:true,
				closable:false,
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
									xtype:"idxmStatusBox"
									,status:"warning"
									,statusText:"Unsaved Work"
								},{
									xtype:"panel"
									,style:"padding-left:15px;"
									,autoScroll:true
									,html:"<BR><span class='support-portal-panel-medium'>Click <b>YES, I WANT TO CANCEL</b> to proceed with your request.</span><BR><BR><span class='support-portal-panel-medium'>Click  <b>NEVER MIND</b> to remain on the current screen.</span>"
								},{	
						xtype:"panel"
						,layout:'column'								    
						,bodyBorder: false						    
						,border: false
						,hideBorders: true							
						,items:[{
								columnWidth: .40
								,buttonAlign: 'left'
								,buttons:[{
										text:"NEVER MIND",
										ctCls :"support-portal-btn-cancel",
										handler:function(){													
												config.noCancelFunction();
												win.hide();
											}
									}]
							},{
								columnWidth: .60
								,buttonAlign: 'right'
								,buttons:[{
										text:"YES, I WANT TO CANCEL",
										width:200,
										ctCls :"support-portal-btn",
										handler:function(){														
													config.doCancelFunction();
													win.hide();
											}
									}]
							}]
						}]
					}]
			});
	win.show();
};

