// Begin: Extend component
Ext.namespace("IDXM.ux.internalUserPersonFieldsPanel");
IDXM.ux.internalUserPersonFieldsPanel = Ext.extend(Ext.Panel, {

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
				var autoLoadValue;					//For reportsToStore 

				if(userData && userData.userClassCode && userData.userSubClassCode && userData.department){
					autoLoadValue = true;
				}else{
					autoLoadValue = false;
				}

				//autoLoadValue = false;
				
				var reportsToStore = new Ext.data.Store({
					proxy: new Ext.data.HttpProxy({
						url: this.reportsToUrl
						,method: "POST"
					})
					,baseParams: userData
					,reader: new Ext.data.JsonReader({
							root: 'payload',
							id: 'id'
						}, [
							{name: 'id', mapping: 'id'},
							{name: 'name', mapping: 'name'}
						])
					,autoLoad: autoLoadValue						
				  });	
				  
				var reportsToComboBox = new Ext.form.ComboBox({
								fieldLabel: "Reports To",
								hiddenName : "reportsTo",
								name:"reportsToText",
								mode:"local",
								valueField:"id",
								displayField:'name',
								triggerAction: 'all',
								emptyText: "- Select One -",										
								//editable:false,
								allowBlank:false,
								forceSelection:true,
								selectOnFocus:true,
								width: 200,
								store: reportsToStore,								
								autoHeight: true,
								disabled: true,
								hidden:this.isMirroredUser,
								listeners: {
										render : function(){
													this.el.dom.name = this.name;
										}
								}
								,typeAhead:true
								,typeAheadDelay:0
								// these are workarounds to support hiding field label
                                                                ,onHide: function(){this.getEl().up('.x-form-item').setDisplayed(false);} 
                                                                ,onShow: function(){this.getEl().up('.x-form-item').setDisplayed(true);}
							});

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
										xtype: "combo",
										id: "id_cmb_prefix",
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
 												render: function(o){
 													this.el.dom.name = this.name;
 													//o.focus();
 												}
										}
									},{									
										xtype : "textfield",
										fieldLabel: "First Name",												
										name : "firstName",
										maxLength : 50,
										width: 200,
										//vtype: 'alpha',
										allowBlank:false
									},{
										xtype : "textfield",
										fieldLabel: "Middle Name/Initial",
										name : "middleName",
										maxLength : 50,
										//vtype: 'alpha',
										width: 200
									},{
										xtype : "textfield",
										fieldLabel: "Last Name",
										name : "lastName",
										maxLength : 50,
										//vtype: 'alpha',
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
									},{
										xtype: "combo",
										fieldLabel: "Location",										
										hiddenName: "location",
										name:"locationText",
										mode:"local",
										store: new Ext.data.JsonStore({
												fields: ['id', 'name'],
												root : "rows",
												idProperty: "id",
												data:{ "rows":this.locationList}
										}),
										valueField:"id",
										emptyText: "- Select One -",
										displayField:'name',
										triggerAction: 'all',
										//editable:false,
										allowBlank:false,
										forceSelection:false,
										selectOnFocus:true,
										width: 200,
										listeners: {
											render : function(){this.el.dom.name = this.name;}
										}
										,typeAhead:true
										,typeAheadDelay:0
									},{
										xtype: "checkbox",										
										hideLabel: true,										
                								boxLabel: 'User Works from home',
                								name: 'blnWorksFromHome'
                 								,tabIndex:500
 										,listeners: {
 											change:function(){Ext.getCmp("id_cmb_dept").focus();}
 										}
									},{
										xtype: "combo",
 										id:"id_cmb_dept",
										fieldLabel: "Department",
										hiddenName : "department",
										name:"departmentText",
										mode:"local",
										store: new Ext.data.JsonStore({
												fields: ['id', 'name'],
												root : "rows",
												idProperty: "id",
												data:{ "rows":this.departmentList}
										}),
										valueField:"id",
										emptyText: "- Select One -",
										displayField:'name',
										triggerAction: 'all',
										//editable:false,
										allowBlank:false,
										forceSelection:false,
										selectOnFocus:true,
										width: 200,
										hidden: this.isMirroredUser,
										listeners: {
												
												render : function(){this.el.dom.name = this.name;}
												,select : function(){

													var formValues;
													try{	
														//Get the form Value
                                                                                                                var formObject = eval(formObjectName);                  //Get the form object
														formValues = formObject.getForm().getValues();
														
													}catch(e){}
													
													reportsToComboBox.store.removeAll();
													
													reportsToComboBox.setValue('');
													reportsToComboBox.setRawValue('');
													reportsToComboBox.clearInvalid();

													reportsToComboBox.store.baseParams = formValues;

                                                                                                        reportsToComboBox.store.reload({
														params: formValues
														,baseParam: formValues
													});
													reportsToComboBox.setDisabled(false);
												}
										}
                                                                               ,onHide: function(){this.getEl().up('.x-form-item').setDisplayed(false);}
 	                                                                       ,onShow: function(){this.getEl().up('.x-form-item').setDisplayed(true);}
										,typeAhead:true
										,typeAheadDelay:0
									}
									,reportsToComboBox
									,{
										xtype : "textfield",
										fieldLabel: "User ID",
										name : "personUserID",
										maxLength : 256,
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
				IDXM.ux.internalUserPersonFieldsPanel.superclass.initComponent.call(this);
			}

		});
// End: Extend component

// Register component as xtype
Ext.reg('idxmInternalUserPersonFieldsPanel', IDXM.ux.internalUserPersonFieldsPanel);


// Begin: Extend component
Ext.namespace("IDXM.ux.internalUserSystemFieldsPanel");
IDXM.ux.internalUserSystemFieldsPanel = Ext.extend(Ext.Panel, {

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
									xtype : "textfield",
 									id: "id_txt_sysname",
									fieldLabel: "System/Process Name",
									name : "systemName",
									maxLength : 200,
									width: 200,
									allowBlank:false
								},{
									xtype : "textfield",
									fieldLabel: "User ID",
									name : "systemUserID",
									maxLength : 256,
									width: 200,
									allowBlank:false
								},{
									xtype: "textfield",
									fieldLabel: "System/Process Owner",
									name: "systemProcessOwner",
									maxLength: 256,
									width: 200,
									allowBlank:false
									
								},{							
									xtype: "textarea",
									fieldLabel: "System/Process Description",											
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
				IDXM.ux.internalUserSystemFieldsPanel.superclass.initComponent.call(this);
			}

		});
// End: Extend component

// Register component as xtype
Ext.reg('idxmInternalUserSystemFieldsPanel', IDXM.ux.internalUserSystemFieldsPanel);


// Begin: Extend component
Ext.namespace("IDXM.ux.internalUserDeviceFieldsPanel");
IDXM.ux.internalUserDeviceFieldsPanel = Ext.extend(Ext.Panel, {

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
										xtype : "textfield",
										fieldLabel: "Device Name",
										name : "deviceName",
										maxLength : 50,
										width: 200,
										allowBlank:false
									},{
										xtype : "textfield",
										fieldLabel: "User ID",
										name : "deviceUserID",
										maxLength : 50,
										width: 200,
										allowBlank:false
									},{
										xtype: "textfield",
										fieldLabel: "Device Owner",
										name: "deviceOwner",
										maxLength: 50,
										width: 200,
										allowBlank:false

									},{
										xtype : "textfield",
										fieldLabel: "Device Address",
										name : "deviceAddress",
										width: 200
									},{							
										xtype: "textarea",
										fieldLabel: "Device Description",
										name : "deviceDescription",
										maxLength : 200,
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
				IDXM.ux.internalUserDeviceFieldsPanel.superclass.initComponent.call(this);
			}

		});
// End: Extend component

// Register component as xtype
Ext.reg('idxmInternalUserDeviceFieldsPanel', IDXM.ux.internalUserDeviceFieldsPanel);



// Begin: Extend component
Ext.namespace("IDXM.ux.internalUserContractorPanel");
IDXM.ux.internalUserContractorPanel = Ext.extend(Ext.Panel, {

			// initComponent
			initComponent : function() {
				
				if(!this.fieldId){
					this.fieldId = "contractorID";
				}
				
				if(!this.ContractorList){this.ContractorList = [{"id":"1","name":"Aetea"},{"id":"2","name":"All Star Staffing"},{"id":"3","name":"Creative Staffing"},{"id":"4","name":"Diamond Technologies"},{"id":"5","name":"Independent"},{"id":"6","name":"New Day Staffing"},{"id":"7","name":"Other"}];	}				
				
				var contractorHiddenField = new Ext.form.Hidden({name:"contractorText"});
				
				// Apply to this component
				Ext.apply(this, {
									layout:"form"
									,bodyBorder: false
									,border: false	
									,labelAlign: "top"				    	
									,items:[{
											xtype: "combo",
											id:this.fieldId,
											hiddenName: "contractor",
											//hiddenValue: "id",
											//fieldLabel: "Contractor",	
											hideLabel:true,
											labelSeparator:"",											
											mode:"local",								
											valueField:"id",
											emptyText: "- Select One -",
											displayField:'name',
											triggerAction: 'all',
											//editable:false,
											typeAhead:true,
											typeAheadDelay:0,
											forceSelection:true,
											selectOnFocus:true,
											allowBlank:false,
											width: 200,
											store: new Ext.data.JsonStore({
													fields: ['id', 'name'],
													root : "rows",
													idProperty: "id",
													data:{ "rows":this.ContractorList}
										},contractorHiddenField)
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
				IDXM.ux.internalUserContractorPanel.superclass.initComponent.call(this);
			} // End initComponent

}); // End: Extend component

// Register component as xtype
Ext.reg('idxmInternalUserContractorPanel', IDXM.ux.internalUserContractorPanel);


// Begin: Extend component
Ext.namespace("IDXM.ux.internalUserContractorOtherPanel");
IDXM.ux.internalUserContractorOtherPanel = Ext.extend(Ext.Panel, {

			// initComponent
			initComponent : function() {
				// Apply to this component
				Ext.apply(this, {
									layout:"form"
									,bodyBorder: false
									,border: false	
									,labelAlign: "top"				    	
									,items:[{									
													xtype : "textfield",
													hideLabel: true,												
													name : "contractorOther",
													maxLength : 200,
													width: 300,
													emptyText:"Add Firm Name",
													allowBlank:true,
													stripCharsRe:/(^\s+|\s+$)/g,
													validationDelay:2000
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
				IDXM.ux.internalUserContractorOtherPanel.superclass.initComponent.call(this);
			} // End initComponent

}); // End: Extend component

// Register component as xtype
Ext.reg('idxmInternalUserContractorOtherPanel', IDXM.ux.internalUserContractorOtherPanel);




/*  STEP 2 */

// Begin: Function 
Ext.namespace("IDXM.internalPersonFullName");
IDXM.internalPersonFullName = function(dataRecord){
	
		var prefixText;
		if(dataRecord.prefix){
			prefixText = dataRecord.prefixText;
		}else{
			prefixText = "";
		}
		
		var firstNameText;
		if(dataRecord.firstName){
			firstNameText = dataRecord.firstName;
		}else{
			firstNameText = "";
		}
		
		var middleNameText;
		if(dataRecord.middleName){
			middleNameText = dataRecord.middleName;
		}else{
			middleNameText = "";
		}
		
		var lastNameText;
		if(dataRecord.lastName){
			lastNameText = dataRecord.lastName;
		}else{
			lastNameText = "";
		}		
		
		var suffixText;
		if(dataRecord.suffix){
			suffixText = dataRecord.suffixText;
		}else{
			suffixText = "";
		}
		
		return prefixText + " " + firstNameText+ " " + middleNameText + " " + lastNameText + " " + suffixText;
};


// Begin: Function 
Ext.namespace("IDXM.internalPersonUserTemplate");
IDXM.internalPersonUserTemplate = function(dataRecord){

		//This is the actual Template
		var t = new Ext.XTemplate(
						'<br><span class="templateTextNormalBold">{name}</span><br><br>'
						,'<span class="templateTextNormal">Location:<br></span><span class="templateTextNormalBold">{location}</span> <span class="idxmTextSmall">{worksFromHome}</span><br><br>'
						,'<span class="templateTextNormal">Department:<br></span><span class="templateTextNormalBold">{department}</span><br><br>'
						,'<span class="templateTextNormal">Reports To:<br></span><span class="templateTextNormalBold">{reportsTo}</span><br><br>'
						,'<tpl if="isProfile">'		
						,'<span class="templateTextNormal">Email:<br></span><span class="templateTextNormalBold">{email}</span><br>'				
						,'<span class="templateTextNormal">Phone:<br></span><span class="templateTextNormalBold">{phone}</span><br>'
						,'<span class="templateTextNormal">Fax:<br></span><span class="templateTextNormalBold">{fax}</span><br>'
						,'</tpl>'
						,'<span class="templateTextNormal">User Name:<br></span><span class="templateTextNormalBold">{username}</span><br><br>'
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
						});

		var contactTpl = new Ext.XTemplate(
                  '<table>',
                  '<tpl for="list">',
                    '<tr><td><span class="templateTextNormalBold">{value}</font></td><td width="15"></td><td><span class="templateTextNormalBold" style="font-weight:normal;">{type}</font></td></tr>',
                  '</tpl>',
                  '</table>'
                );	
		
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
		if((dataRecord.email != undefined) && (dataRecord.email != null) && (dataRecord.email.length > 0)){
	                emailText = contactTpl.applyTemplate({"list":dataRecord.email});

		}else{
			emailText = "N/A<br>";
		}

		var usernameText;
		if(dataRecord.personUserID){
			usernameText = dataRecord.personUserID;
		}else{
			usernameText = dataRecord.userID;
		}
		usernameText = usernameText.toLowerCase();
		
		var worksFromHomeText;
		if(dataRecord.blnWorksFromHome){
			worksFromHomeText = "(User Works From Home)";
		}else{
			worksFromHomeText = "";
		}
		
		var reportsToText;
		if(!dataRecord.validReportsToIndicator){
			reportsToText =  dataRecord.reportsToText + "&nbsp;<span class='templateTextNormal'> (Needs New Manager)</span>";
		}else{
			reportsToText = dataRecord.reportsToText;
		}
		
		var isProfile = false;
		if(dataRecord.isProfile && dataRecord.isProfile != undefined && dataRecord.isProfile != null){
			isProfile = true;
		}
		
		var templateJson = 	{	name: IDXM.internalPersonFullName(dataRecord)
								,location: dataRecord.locationText
								,department: dataRecord.departmentText
								,reportsTo: reportsToText
								,email: emailText
								,phone:phoneText
								,fax: faxText
								,username: usernameText
								,worksFromHome:worksFromHomeText
								,startDate:dataRecord.startDate
								,endDate:dataRecord.endDate
								,isProfile:isProfile
							};
		if(dataRecord.userSecondaryIdentity && dataRecord.userSecondaryIdentity.userNetworxIdentity && (dataRecord.userSecondaryIdentity.userNetworxIdentity.userStatus.statusCode == IDXM_USER_STATUS_CODE_MAP["ACTIVE"])){
			templateJson['networXuserID']=dataRecord.userSecondaryIdentity.userNetworxIdentity.identityIdentifier.userID;
		}else{
			templateJson['networXuserID']=false;
		}

		//Pass data to template
		var templateString = t.apply(templateJson);	
		
		return templateString;

}; // End: Function

// Begin: Function 
Ext.namespace("IDXM.internalPersonUserGetPrimaryContact");
IDXM.internalPersonUserGetPrimaryContact = function(contactsArray){
	if((contactsArray != undefined) && (contactsArray != null) && (contactsArray.length > 0)){
		for(var i=0;i<contactsArray.length;i++){
			var contact = contactsArray[i];
			if(contact.primary){
				return contact;
			}			
		}
	}
	return null;
};

Ext.namespace("IDXM.internalPersonUserGetPrimaryEmailContact");
IDXM.internalPersonUserGetPrimaryEmailContact = function(contactsArray){	
	var emailContact = IDXM.internalPersonUserGetPrimaryContact(contactsArray);
	var email;
	if((emailContact != undefined) && (emailContact != null)){
		var email = emailContact.value;
	}
	return email;
};


// Begin: Function 
Ext.namespace("IDXM.internalSystemUserTemplate");
IDXM.internalSystemUserTemplate = function(dataRecord) {

	// This is the actual Template
	var t = new Ext.XTemplate(
				'<br><span class="templateTextNormalBold">{systemName}</span><br><br>',			
				'<span class="templateTextNormal">User ID:<br></span><span class="templateTextNormalBold">{systemUserID}</span><br><br>',
				'<span class="templateTextNormal">System/Process Owner:<br></span><span class="templateTextNormalBold">{systemProcessOwner}</span><br><br>',
				'<span class="templateTextNormal">System Description:<br></span><span class="templateTextNormalBold">{[this.displayValue(values.systemDescription)]}</span><br><br>',
				'<span class="templateTextNormal">Start Date:<br></span><span class="templateTextNormalBold">{[this.displayValue(values.startDate)]}</span><br><br>',
				'<tpl if="isProfile">',
				'<span class="templateTextNormal">Termination Date:<br></span><span class="templateTextNormalBold">{[this.displayValue(values.endDate)]}</span><br><br>',
				'</tpl>',
				{
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
			});
			

	var systemUserID = dataRecord.systemUserID;
	systemUserID = systemUserID.toLowerCase();
	
	var systemProcessOwner = dataRecord.systemProcessOwner;
	systemProcessOwner = systemProcessOwner.toLowerCase();
	
	var isProfile = false;
	if(dataRecord.isProfile && dataRecord.isProfile != undefined && dataRecord.isProfile != null){
		isProfile = true;
	}	
			
	// Pass data to template
	var templateString = t.apply({
				systemName : dataRecord.systemName,				
				systemUserID : systemUserID,
				systemProcessOwner: systemProcessOwner,
				systemDescription : dataRecord.systemDescription,
				startDate:dataRecord.startDate,
				endDate:dataRecord.endDate,
				isProfile:isProfile
			});

	return templateString;
};// End: Function


// Begin: Function 
Ext.namespace("IDXM.internalDeviceUserTemplate");
IDXM.internalDeviceUserTemplate = function(dataRecord) {

	// This is the actual Template
	var t = new Ext.XTemplate(			
			'<br><span class="templateTextNormalBold">{deviceName}</b><br><br>',
			'<span class="templateTextNormal">Device Addrress:<br></span><span class="templateTextNormalBold">{deviceAddress}</span><br><br>',
			'<span class="templateTextNormal">Device User ID:<br></span><span class="templateTextNormalBold">{deviceUserID}</span><br><br>',
			'<span class="templateTextNormal">Device Owner:<br></span><span class="templateTextNormalBold">{deviceOwner}</span><br><br>',			
			'<span class="templateTextNormal">Device Description:<br></span><span class="templateTextNormalBold">{deviceDescription}</span><br><br>',
			'<span class="templateTextNormal">Start Date:<br></span><span class="templateTextNormalBold">{[this.displayValue(values.startDate)]}</span><br><br>',
			'<tpl if="isProfile">',
			'<span class="templateTextNormal">Termination Date:<br></span><span class="templateTextNormalBold">{[this.displayValue(values.endDate)]}</span><br><br>',
			'</tpl>',
			{
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
			});

	var deviceUserID = dataRecord.deviceUserID;
	deviceUserID = deviceUserID = deviceUserID.toLowerCase();
	
	var deviceOwner = dataRecord.deviceOwner;
	deviceOwner = deviceOwner.toLowerCase();
	
	var isProfile = false;
	if(dataRecord.isProfile && dataRecord.isProfile != undefined && dataRecord.isProfile != null){
		isProfile = true;
	}		
			
	// Pass data to template
	var templateString = t.apply({
				deviceName : dataRecord.deviceName,
				deviceAddress : dataRecord.deviceAddress,				
				deviceUserID : deviceUserID,
				deviceOwner : deviceOwner,
				deviceDescription : dataRecord.deviceDescription,
				startDate:dataRecord.startDate,
				endDate:dataRecord.endDate,
				isProfile:isProfile
			});

	return templateString;
};// End: Function

