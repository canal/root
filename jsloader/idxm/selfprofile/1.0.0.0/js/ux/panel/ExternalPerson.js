
// Begin: Extend component
Ext.namespace("idxm.selfprofile.ux.panel.ExternalPerson");
idxm.selfprofile.ux.panel.ExternalPerson = Ext.extend(Ext.Panel, {

			// initComponent
			initComponent : function() {
			
				// Apply to this component
				Ext.apply(this, {
							layout:"form"
							,style:"padding-left:10px; padding-right:10px;"
							,bodyStyle: "padding-left:15px;"
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
										msgTarget:"sideDetails",
										validateOnBlur: true,
										allowBlank:false
									},{
										xtype : "textfield",
										fieldLabel: "Last Name",
										name : "lastName",
										msgTarget:"sideDetails",
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
				idxm.selfprofile.ux.panel.ExternalPerson.superclass.initComponent.call(this);
			}

		});
// End: Extend component

// Register component as xtype
Ext.reg('idxm.selfprofile.ux.panel.ExternalPerson', idxm.selfprofile.ux.panel.ExternalPerson);