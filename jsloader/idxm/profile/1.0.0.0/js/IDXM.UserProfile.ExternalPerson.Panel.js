// Begin: Extend component
Ext.namespace("IDXM.ux.externalUserProfile");
IDXM.ux.externalUserProfile = Ext.extend(Ext.Panel, {

			// initComponent
			initComponent : function() {
			
				// Apply to this component
				Ext.apply(this, {
							layout:"form"
							,bodyBorder: false
							,border: false							
							,hideBorders: true
							,labelAlign: "top"								   														
							,items:[{
										xtype:"hidden"
										,name:"sysKey"
									},{									
										xtype : "textfield",
										fieldLabel: "First Name",												
										name : "firstName",
										maxLength : 50,
										width: 200,
										validateOnBlur: true,
										allowBlank:false
									},{
										xtype : "textfield",
										fieldLabel: "Last Name",
										name : "lastName",
										maxLength : 50,
										width: 200,
										allowBlank:false
									}
								]	
				});

				// Apply to this component configuration
				Ext.apply(this.initialConfig, {
								layout:this.layout
								,style:this.style
							    	,bodyBorder: this.bodyBorder
							    	,border: this.border							    
							    	,width: this.width															
								,items:this.items
						});

				// call parent initComponent
				IDXM.ux.externalUserProfile.superclass.initComponent.call(this);
			}

		});
// End: Extend component

// Register component as xtype
Ext.reg('idxmExternalUserProfilePanel', IDXM.ux.externalUserProfile);
