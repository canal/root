
// Begin: Extend component
Ext.namespace("IDXM.ux.idxmInternalSystemUserProfilePanel");
IDXM.ux.idxmInternalSystemUserProfilePanel = Ext.extend(Ext.Panel, {

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
										xtype:"hidden"
										,name:"sysKey"
									},{
									xtype : "textfield",
									fieldLabel: "System Name",
									name : "systemName",
									maxLength : 50,
									width: 200,
									allowBlank:false
								},{
									xtype: "textfield",
									fieldLabel: "System/Process Owner",
									name: "systemProcessOwner",
									maxLength: 50,
									width: 200,
									allowBlank:false
									
								},{							
									xtype: "textarea",
									fieldLabel: "System Description",											
									name: "systemDescription",
									maxLength: 200,
									width: 200
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
				IDXM.ux.idxmInternalSystemUserProfilePanel.superclass.initComponent.call(this);
			}

		});
// End: Extend component

// Register component as xtype
Ext.reg('idxmInternalSystemUserProfilePanel', IDXM.ux.idxmInternalSystemUserProfilePanel);
