// Begin: Extend component
Ext.namespace("IDXM.ux.userSubClassAndTypePanel");
IDXM.ux.userSubClassAndTypePanel = Ext.extend(Ext.Panel, {
		
			// initComponent
			initComponent : function() {
																																																																																				 															  												  				 																									
				// Apply to this component
				Ext.apply(this, {								    
								    layout:'column'								    								    
								    ,bodyBorder: false
								    ,border: false
								    ,hideBorders: true								    
								    ,style:"padding-left:10px; padding-top:10px; padding-right:10px;"
								    ,bodyStyle: "padding-left:15px;"
								    ,items: [{	
								    			//Column 1								       
										        columnWidth: .35
										        ,ctCls:"suppportPortalPanel"
										        ,items:[	{
														xtype:"label"
														,text:"Sub-Class:"
														,hidden: ((this.columnOneRadioGroup.hidden !== undefined) && this.columnOneRadioGroup.hidden) ? true : false
													}
													,this.columnOneRadioGroup
												]

										    },{	
										    	//Column 2								       
										        columnWidth: .65
										        ,style:"padding-left:10px;"
										        ,items:this.columnTwoItems									        
										    }]
						});

				// Apply to this component configuration
				Ext.apply(this.initialConfig, {												    
												    layout: this.layout
												    //,title: this.title
												    ,width: this.width
												    ,style: this.style
												    ,bodyBorder: this.bodyBorder
												    ,border: this.border
												    ,hideBorders: this.hideBorders
												    ,items: [{												       
														        columnWidth: this.columnWidth
														        ,items: this.items
														    },{
														        columnWidth: this.columnWidth
														        ,style: this.style
														        ,items: this.items
														    }]
						});

				// call parent initComponent
				IDXM.ux.userSubClassAndTypePanel.superclass.initComponent.call(this);
			}

		});
// End: Extend component

// Register component as xtype
Ext.reg('idxmUserSubClassAndTypePanel', IDXM.ux.userSubClassAndTypePanel);


// Begin: Extend component
Ext.namespace("IDXM.ux.userDatePanel");
IDXM.ux.userDatePanel = Ext.extend(Ext.Panel, {

			// initComponent
			initComponent : function() {
				// Apply to this component
				Ext.apply(this, {
							layout:"form"
							,style:"padding-left:10px; padding-right:10px;"
							,bodyStyle: "padding-left:15px;"
							,bodyBorder: false
							,border: false	
							,labelAlign: "top"
							,items:[{
									xtype:"datefield"
									,name:"startDate"
									,fieldLabel: "Start Date"
									,minValue:new Date().clearTime()
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
				IDXM.ux.userDatePanel.superclass.initComponent.call(this);
			}

		});
// End: Extend component

// Register component as xtype
Ext.reg('idxmUserDatePanel', IDXM.ux.userDatePanel);

