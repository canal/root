// Begin: Extend component
Ext.namespace("IDXM.PopUp.NoAccountInActiveDirectory");
IDXM.PopUp.NoAccountInActiveDirectory = Ext.extend(Ext.Panel, {

			// initComponent
			initComponent : function() {	
			
				var windowObject = this.windowObject;
			
				// Apply to this component
				Ext.apply(this, {
							border:false
							,bodyBorder:false
							,hideBorders:true
							,bodyStyle:"padding:5px;"
							,width:this.windowObject.getInnerWidth()
							,items:[{
										xtype:"panel"
										,border: false
										,bodyBorder:false
										,hideBorders:true
										,items:[{
												xtype:"idxmStatusBox"
												,status:"warning"
												,statusText:this.statusText
											},{
												xtype: "panel"
												,height:8
												,border:0
												,style: "boder:none;"
												,bodyBorder:0
												,bodyStyle:"border:none"
												,hideBorders: true
											},{	
												xtype: "panel"
												,bodyBorder: false
												,border: false
												,hideBorders: true
												,autoScroll:true
												,style:"padding-left:10px; padding-right:10px;"
												,html:this.htmlText
											},{
												xtype:"panel"
												,layout:'column'								    
												,bodyBorder: false						    
												,border: false
												,hideBorders: true
												,frame:false
												,style:"padding-left:10px; padding-right:10px;"
												,items:[{
														columnWidth: .50
														,buttonAlign: 'left'
														,html:'&nbsp'
													},{
														columnWidth: .50
														,buttonAlign: 'right'
														,buttons:[{
																text:"CLOSE"
																,ctCls :"support-portal-btn"
																,handler:function(){														
																			windowObject.close();
																	}
															}]
													}]
											}]
									}]
						});

				// Apply to this component configuration
				Ext.apply(this.initialConfig, {
								layout: this.layout
								,style: this.style
							    	,bodyBorder: this.bodyBorder
							    	,border: this.border
							    	,width: this.width															
								,items: this.items
						});

				// call parent initComponent
				IDXM.PopUp.NoAccountInActiveDirectory.superclass.initComponent.call(this);
			}

});
// End: Extend component

// Register component as xtype
Ext.reg('IDXM-PopUp-NoAccountInActiveDirectory', IDXM.PopUp.NoAccountInActiveDirectory);

