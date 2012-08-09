
// Begin: Extend component
Ext.namespace("idxm.selfprofile.ux.panel.InternalPerson");
idxm.selfprofile.ux.panel.InternalPerson = Ext.extend(Ext.Panel, {

			// initComponent
			initComponent : function() {

				//Default Data
				if(!this.prefixList){this.prefixList = [{"id":"1","name":"Dr."},{"id":"2","name":"Miss"},{"id":"3","name":"Mr."},{"id":"4","name":"Mrs."},{"id":"5","name":"Rev."}]; }				
				if(!this.suffixList){this.suffixList = [{"id":"1","name":"II"},{"id":"2","name":"III"},{"id":"3","name":"IV"},{"id":"4","name":"Esq."},{"id":"5","name":"Jr."},{"id":"6","name":"Sr."}];	}										
				if(!this.locationList){this.locationList = [{"id":"","name":"- Select One -"},{"id":"1","name":"Arlingnton"},{"id":"2","name":"Brookfield"},{"id":"3","name":"Dallas"},{"id":"4","name":"DePere"},{"id":"5","name":"Irvine"},{"id":"6","name":"Kansas City"},{"id":"5","name":"New Orleans"},{"id":"6","name":"New York"},{"id":"5","name":"Remote"},{"id":"6","name":"Rockville"},{"id":"6","name":"Rosemont"},{"id":"6","name":"Syracuse"},{"id":"6","name":"Waltham"}];	}
				if(!this.departmentList){this.departmentList = [{"id":"","name":"- Select One -"},{"id":"1","name":"Customer Service"},{"id":"2","name":"HR"},{"id":"3","name":"Legal"},{"id":"4","name":"Management"},{"id":"5","name":"Operations"},{"id":"6","name":"IT"}];	}								

				this.prefixList = [{"id":"","name":"- Select One -"}].concat(this.prefixList);	 			
				this.suffixList = [{"id":"","name":"- Select One -"}].concat(this.suffixList);	 			
				
				var formObjectName = this.formObjectName;		//The form object Name
				var userData = this.userData;				//The form Data as JSON


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
									xtype: "hidden",
									name: "userTypeCode"										
								},{
									xtype: "hidden",
									name: "userClassCode"
								},{
									xtype: "hidden",
									name: "userSubClassCode"
								},{										
									xtype: "combo",												
									fieldLabel: "Prefix",										
									hiddenName : "prefix",
									name:"prefixText",
									mode:"local",
									store: new Ext.data.JsonStore({
											fields: ['id', 'name'],
											root : "rows",
											idProperty: "id",
											data:{ "rows":this.prefixList}
									}),
									valueField:"id",
									displayField:'name',
									triggerAction: 'all',
									emptyText: "- Select One -",										
									//editable:false,
									forceSelection:true,
									selectOnFocus:true,
									width: 200,
									typeAhead:true,
									typeAheadDelay:0,
									listeners: {
											render : function(){this.el.dom.name = this.name;}
									}
								},{									
									xtype : "textfield",
									fieldLabel: "First Name",												
									name : "firstName",
									maxLength : 50,
									width: 200,
									allowBlank:false
								},{
									xtype : "textfield",
									fieldLabel: "Middle Name/Initial",
									name : "middleName",
									maxLength : 50,
									width: 200
								},{
									xtype : "textfield",
									fieldLabel: "Last Name",
									name : "lastName",
									maxLength : 50,
									width: 200,
									allowBlank:false
								},{
									xtype: "combo",
									fieldLabel: "Suffix",
									hiddenName : "suffix",
									name:"suffixText",
									mode:"local",
									store: new Ext.data.JsonStore({
											fields: ['id', 'name'],
											root : "rows",
											idProperty: "id",
											data:{ "rows":this.suffixList}
									}),
									valueField:"id",
									emptyText: "- Select One -",
									displayField:'name',
									triggerAction: 'all',
									//editable:false,
									forceSelection:false,
									selectOnFocus:true,
									width: 200,
									listeners: {
											render : function(){this.el.dom.name = this.name;}
									}
									,typeAhead:true
									,typeAheadDelay:0
								}]	
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
				idxm.selfprofile.ux.panel.InternalPerson.superclass.initComponent.call(this);
			}

		});
// End: Extend component

// Register component as xtype
Ext.reg('idxm.selfprofile.ux.panel.InternalPerson', idxm.selfprofile.ux.panel.InternalPerson);
