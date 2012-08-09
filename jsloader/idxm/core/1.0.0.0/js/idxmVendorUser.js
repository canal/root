// Begin: Extend component
Ext.namespace("IDXM.ux.vendorFieldsPanel");
IDXM.ux.vendorFieldsPanel = 
	Ext.extend(Ext.Panel, {

			// initComponent
			initComponent : function() {
				// Apply to this component
				Ext.apply(this, {
							layout:"form"
							,style:"padding-left:10px; padding-right:10px; padding-top:10px;"	
							,bodyStyle: "padding-left:15px;"
							,bodyBorder: false
							,border: false	
							,labelAlign: "top"
							,items:[{
									xtype : "textfield",
									fieldLabel:"First Name",											
									name : "firstName",
									maxLength : 50,
									width: 200,
									//vtype: 'alpha',										
									allowBlank:false
								},{							
									xtype : "textfield",
									fieldLabel:"Last Name",											
									name : "lastName",
									maxLength : 50,
									width: 200,
									//vtype: 'alpha',										
									allowBlank:false
								},{
									xtype : "textfield",
									fieldLabel:"Email",											
									name : "userID",
									maxLength : 200,
									width: 200,
									vtype: 'email',
									validationEvent:"blur",
									allowBlank:false
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
				IDXM.ux.vendorFieldsPanel.superclass.initComponent.call(this);
			}
	});
// End: Extend component

// Register component as xtype
Ext.reg('idxmVendorFieldsPanel', IDXM.ux.vendorFieldsPanel);


// Begin: Extend component
Ext.namespace("IDXM.ux.vendorServiceProviderDropDown");
IDXM.ux.vendorServiceProviderDropDown = Ext.extend(Ext.Panel, {

			// initComponent
			initComponent : function() {
										
				if(!this.serviceProviders){this.serviceProviders = [{"id":"1","name":"Acme Services"},{"id":"2","name":"Open IAM"},{"id":"3","name":"Trihelix"}];	}				
				
				this.serviceProviders = [{"id":"","name":"- Select One -"}].concat(this.serviceProviders);
				
				// Apply to this component
				Ext.apply(this, {
							layout:"form"
							,style:"padding-left:10px; padding-right:10px;"
							,bodyStyle: "padding-left:15px;"
						    	,bodyBorder: false
						    	,border: false
						    	,labelAlign:"top"
							,items:[{
									xtype: "combo",
									id: "id_cmb_providername",
									fieldLabel: "Service Provider Name",										
									hiddenName : "vendorServiceProvider",
									name:"vendorServiceProviderText",
									mode:"local",
									store: new Ext.data.JsonStore({
											fields: ['id', 'name'],
											root : "rows",
											idProperty: "id",
											data:{ "rows":this.serviceProviders}
									}),
									valueField:"id",
									displayField:'name',
									triggerAction: 'all',
									emptyText: "- Select One -",										
									//editable:false,
									allowBlank:false,
									forceSelection:true,
									selectOnFocus:true,
									width: 200,
									listeners: {
											render : function(o){
												this.el.dom.name = this.name;
												//o.focus(true);
											}
									}
									,hidden:this.isMirroredUser
									// these are workarounds to support hiding field label
                                                                	,onHide: function(){this.getEl().up('.x-form-item').setDisplayed(false);} 
                                                                	,onShow: function(){this.getEl().up('.x-form-item').setDisplayed(true);}
									,typeAhead:true
									,typeAheadDelay:0
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
				IDXM.ux.vendorServiceProviderDropDown.superclass.initComponent.call(this);
			}

		});
// End: Extend component

// Register component as xtype
Ext.reg('idxmVendorServiceProviderDropDown', IDXM.ux.vendorServiceProviderDropDown);


// Begin: Extend component
Ext.namespace("IDXM.ux.vendorOperationalDropDown");
IDXM.ux.vendorOperationalDropDown = Ext.extend(Ext.Panel, {

			// initComponent
			initComponent : function() {
				
				if(!this.operationalVendors){this.operationalVendors = [{"id":"1","name":"Always Right Operations"},{"id":"2","name":"Monitoring World"},{"id":"3","name":"Offsite Hosting"}];	}																	
				
				this.operationalVendors = [{"id":"","name":"- Select One -"}].concat(this.operationalVendors);
				
				// Apply to this component
				Ext.apply(this, {
							layout:"form"
							,style:"padding-left:10px; padding-right:10px;"
							,bodyStyle: "padding-left:15px;"
							,bodyBorder: false
							,border: false
							,labelAlign:"top"
							,items:[{
									xtype: "combo",
									id: "id_cmb_vendorname",
									fieldLabel: "Operational Vendor Name",										
									hiddenName : "vendorOperational",
									name:"vendorOperationalText",
									mode:"local",
									store: new Ext.data.JsonStore({
											fields: ['id', 'name'],
											root : "rows",
											idProperty: "id",
											data:{ "rows":this.operationalVendors}
									}),
									valueField:"id",
									displayField:'name',
									triggerAction: 'all',
									emptyText: "- Select One -",										
									//editable:false,
									allowBlank:false,
									forceSelection:true,
									selectOnFocus:true,
									width: 200,
									listeners: {
											render : function(){this.el.dom.name = this.name;}
									}
									,hidden:this.isMirroredUser
									// these are workarounds to support hiding field label
                                                                	,onHide: function(){this.getEl().up('.x-form-item').setDisplayed(false);} 
                                                                	,onShow: function(){this.getEl().up('.x-form-item').setDisplayed(true);}
									,typeAhead:true
									,typeAheadDelay:0
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
				IDXM.ux.vendorOperationalDropDown.superclass.initComponent.call(this);
			}

		});
// End: Extend component

// Register component as xtype
Ext.reg('idxmVendorOperationalDropDown', IDXM.ux.vendorOperationalDropDown);

// Begin: Extend component
Ext.namespace("IDXM.ux.vendorMirrorUserPanel");
IDXM.ux.vendorMirrorUserPanel = 
	Ext.extend(Ext.Panel, {

			// initComponent
			initComponent : function() {
				// Apply to this component
				Ext.apply(this, {
							id:this.id+"vendorMirrorUserPanelID"
							,style:"padding-left:20px; padding-right:10px;"	
							,bodyStyle: "padding-left:15px;"							
							,layout:"form"
							,bodyStyle:"background:#EFEFEF; padding:5px;"
							,labelAlign: "top"
							,disabledClass:"disabled-panel"
							,items:[{
									xtype : "textfield",
									width: 200,
									maxLength : 200,
									fieldLabel:"User to Mirror",																																						
									name : "userNameToMirror",
									emptyText: "user@email.com",
									allowBlank:true,
									vtype: 'email'
								},{
									xtype: "label",																	
									text: "(Mirrors Groups and Roles)",
									cls: "supportPortalFormLabelSmall"
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
				IDXM.ux.vendorMirrorUserPanel.superclass.initComponent.call(this);
			}
	});
// End: Extend component

// Register component as xtype
Ext.reg('idxmVendorMirrorUserPanel', IDXM.ux.vendorMirrorUserPanel);


//vendor User Template
IDXM.vendorSingleUserTemplate = function(dataRecord){

		//This is the actual Template
		var t = new Ext.XTemplate(			
			'<br><span class="templateTextNormalBold">{name}</span><br><br>'
			,'<span class="templateTextNormal">Operational Vendor:<br></span><span class="templateTextNormalBold">{vendorOperational}</span><br><br>'				
			,'<span class="templateTextNormal">Email:<br></span><span class="templateTextNormalBold">{email}</span><br>'
			,'<tpl if="isProfile">'	
			,'<span class="templateTextNormal">Phone:<br></span><span class="templateTextNormalBold">{phone}</span><br>'
			,'<span class="templateTextNormal">Fax:<br></span><span class="templateTextNormalBold">{fax}</span><br>'
			,'</tpl>'
			,'<tpl if="isProfile && networXuserID">'
			,'<span class="templateTextNormal">NetworX User ID:<br></span><span class="templateTextNormalBold">{networXuserID}</span><br><br>'
			,'</tpl>'			
			,'<span class="templateTextNormal">Start Date:<br></span><span class="templateTextNormalBold">{[this.displayValue(values.startDate)]}</span><br><br>'
			,'<tpl if="isProfile">'	
			,'<span class="templateTextNormal">Termination Date:<br></span><span class="templateTextNormalBold">{[this.displayValue(values.endDate)]}</span><br><br>'
			,'</tpl>'
			,{
				hasValue: function(value_){
					if(value_.trim != ""){
						return true;
					}else{
						return false;
					}
				},
				displayValue:function(value_){
					if(value_ != undefined && value_ != null){
						if(value_.trim() != ""){									
							return value_;
						}else{
							return "N/A";
						}
					}else{
						return "N/A";
					}
				}
			}
		);

		var t2 = new Ext.XTemplate(			
			'<br><span class="templateTextNormalBold">{name}</span><br><br>'
			,'<span class="templateTextNormal">Service Provider:<br></span><span class="templateTextNormalBold">{vendorServiceProvider}</span><br><br>'				
			,'<span class="templateTextNormal">Email:<br></span><span class="templateTextNormalBold">{email}</span><br>'
			,'<tpl if="isProfile">'	
			,'<span class="templateTextNormal">Phone:<br></span><span class="templateTextNormalBold">{phone}</span><br>'
			,'<span class="templateTextNormal">Fax:<br></span><span class="templateTextNormalBold">{fax}</span><br>'
			,'</tpl>'
			,'<tpl if="isProfile && networXuserID">'
			,'<span class="templateTextNormal">NetworX User ID:<br></span><span class="templateTextNormalBold">{networXuserID}</span><br><br>'
			,'</tpl>'			
			,'<span class="templateTextNormal">Start Date:<br></span><span class="templateTextNormalBold">{[this.displayValue(values.startDate)]}</span><br><br>'
			,'<tpl if="isProfile">'	
			,'<span class="templateTextNormal">Termination Date:<br></span><span class="templateTextNormalBold">{[this.displayValue(values.endDate)]}</span><br><br>'
			,'</tpl>'
			,{
				hasValue: function(value_){
					if(value_.trim != ""){
						return true;
					}else{
						return false;
					}
				},
				displayValue:function(value_){
					if(value_ != undefined && value_ != null){
						if(value_.trim() != ""){									
							return value_;
						}else{
							return "N/A";
						}
					}else{
						return "N/A";
					}
				}
			}
		);

		var contactTpl = new Ext.XTemplate(
                  '<table>',
                  '<tpl for="list">',
                    '<tr><td><span class="templateTextNormalBold">{value}</font></td><td width="15"></td><td><span class="templateTextNormalBold" style="font-weight:normal;">{type}</font></td></tr>',
                  '</tpl>',
                  '</table>'
                );

		var templateString;

		var faxText;
		if((dataRecord.fax != undefined) && (dataRecord.fax != null) && (dataRecord.fax.length > 0)){
	                faxText = contactTpl.applyTemplate({"list":dataRecord.fax});
		}else{
			faxText = "N/A<br>";
		}

		var phoneText;
		if((dataRecord.phone != undefined) && (dataRecord.phone != null) && (dataRecord.phone.length > 0)){
	                phoneText = contactTpl.applyTemplate({"list":dataRecord.phone});
		}else{
			phoneText = "N/A<br>";
		}

		var emailText;
		if((dataRecord.email != undefined) && (dataRecord.email != null) && (dataRecord.email.length > 0))
		{
	                emailText = contactTpl.applyTemplate({"list":dataRecord.email});

		}
		else if((dataRecord.userID != undefined) && (dataRecord.userID != "")) {
			var userID = dataRecord.userID;
			emailText = userID.toLowerCase()+"<br>";
		}
		else
		{
			emailText = "N/A<br>";
		}
		
		var isProfile = false;
		if(dataRecord.isProfile && dataRecord.isProfile != undefined && dataRecord.isProfile != null){
			isProfile = true;
		}			
		
		

		if(dataRecord.vendorOperational){				
			
			var templateJson = {	
									name: dataRecord.firstName + " " + dataRecord.lastName
									,vendorOperational: dataRecord.vendorOperationalText
									,email: emailText
									,requestersEmail: dataRecord.requestersEmail
									,phone:phoneText
									,fax: faxText
									,startDate:dataRecord.startDate
									,endDate:dataRecord.endDate	
									,isProfile:isProfile
								};
					
			if(dataRecord.userSecondaryIdentity && dataRecord.userSecondaryIdentity.userNetworxIdentity && (dataRecord.userSecondaryIdentity.userNetworxIdentity.userStatus.statusCode == IDXM_USER_STATUS_CODE_MAP["ACTIVE"])){
				templateJson['networXuserID']=dataRecord.userSecondaryIdentity.userNetworxIdentity.identityIdentifier.userID;
			}else{
				templateJson['networXuserID']=false;
			}					

			templateString = t.apply(templateJson);
		}else if(dataRecord.vendorServiceProvider){
			
			var templateJson = {	name: dataRecord.firstName + " " + dataRecord.lastName
									,vendorServiceProvider: dataRecord.vendorServiceProviderText
									,email: emailText
									,requestersEmail: dataRecord.requestersEmail
									,phone:phoneText
									,fax: faxText
									,startDate:dataRecord.startDate
									,endDate:dataRecord.endDate	
									,isProfile:isProfile
								};
								
			if(dataRecord.userSecondaryIdentity && dataRecord.userSecondaryIdentity.userNetworxIdentity && (dataRecord.userSecondaryIdentity.userNetworxIdentity.userStatus.statusCode == IDXM_USER_STATUS_CODE_MAP["ACTIVE"])){
				templateJson['networXuserID']=dataRecord.userSecondaryIdentity.userNetworxIdentity.identityIdentifier.userID;
			}else{
				templateJson['networXuserID']=false;
			}								
			
			templateString = t2.apply(templateJson);										
		}
		
		return templateString;

}; // End: Function

