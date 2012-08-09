
// Begin: Extend component
Ext.namespace("IDXM.emailAddressFieldsPanelNoTitle");
IDXM.emailAddressFieldsPanelNoTitle = Ext.extend(Ext.Panel, {
	// initComponent
	initComponent : function() {
		
		this.emailTypes = [{"id":"","name":"- Select One -"}].concat(this.emailTypes);
		if(!this.blnDisplayAdvicesheet){this.blnDisplayAdvicesheet=false;}
		var blnDisplayAdvicesheet = this.blnDisplayAdvicesheet;
		
		this.emailDeletedJson =
		{
			id:"emailDeleted" + this.dynamicID,
			name:"emailDeleted" + this.dynamicID
		};
		
		this.emailIdJson =
		{
			id:"emailId"+ this.dynamicID,
			name:"emailId" + this.dynamicID
		};

		this.emailAddressJson =
		{																				
			hideLabel:true,
			labelSeparator:"",
			id:"emailAddress" + this.dynamicID, 	
			name :"emailAddress" + this.dynamicID, 
			maxLength : 256,
			width:200,
			msgTarget:"emailAddressTarget"+ this.dynamicID,
			msgDisplay:"",
			vtype:"email",
			validationEvent:"blur",
			//value:(this.emailContact === undefined) ? "" : (this.emailContact.value === undefined) ? "" : this.emailContact.value,
			allowBlank:true
		};
		
		this.emailTypeJson =
		{									
			hideLabel:true,
			width:225,
			labelSeparator:"",
			hiddenId:"emailTypeCode" + this.dynamicID,
			hiddenName:"emailTypeCode" + this.dynamicID,
			id:"emailTypeText" + this.dynamicID,
			name:"emailTypeText" + this.dynamicID,
			msgTarget: "emailAddressTarget"+ this.dynamicID,
			msgDisplay:"",
			mode:"local",
			store: new Ext.data.JsonStore({
					fields: ['id', 'name'],
					root : "rows",
					idProperty: "id",
					data:{ "rows":this.emailTypes}
			}),
			valueField:"id",
			emptyText: "- Select One -",
			//value:(this.emailContact === undefined) ? "" : (this.emailContact.type === undefined) ? "" : this.emailContact.type,
			displayField:'name',
			triggerAction: 'all',
			editable:false,
			allowBlank:true,
			forceSelection:false,
			selectOnFocus:true,
			listeners: {
				render : function(){this.el.dom.name = this.name;}
				,select : function(){
							if(this.getValue() == "Other"){																							
								emailTypeOtherPanel.enable();
								emailTypeOtherPanel.show();
								emailTypeOtherPanel.cascade(function(item){
								  if (item.isFormField) {
								    item.enable();
								    item.show();
								  }
								});												
							}else{
								emailTypeOtherPanel.enable();
										emailTypeOtherPanel.disable();
										emailTypeOtherPanel.hide();
										emailTypeOtherPanel.cascade(function(item){
										  if (item.isFormField) {
										    item.disable();
										    item.hide();
										  }
										});												
							}
					}
			}
		};
		
		this.emailAdviceSheetNotification = 
			new Ext.form.Hidden({		
									id:"emailAdviceSheetNotification"+ this.dynamicID,
									name:"emailAdviceSheetNotification" + this.dynamicID,
									value:false
								});	
								
		var dynamicID = this.dynamicID;		
		
		this.AdviceSheetRadioButton =
			new Ext.form.Radio({
                hideLabel: true,
                labelSeparator: '',
                boxLabel: 'Use For Advice Notification',
                name: 'AdviceNotificationCheckBox',
                inputValue: Ext.encode({"adviceType":"email","adviceIndex":dynamicID}),
                value:this.dynamicID,
                ctCls:"advice-box-label",
                cls:"advice-box-label",
                listeners:{
                	check:function(){                		
                	}
                }
            });								
		
		if(this.emailContact != undefined && this.emailContact.value != undefined){
			this.emailIdJson['value']=this.emailContact.id;
			this.emailAddressJson['value']=this.emailContact.value;
			this.emailTypeJson['value']=this.emailContact.type;
			this.emailTypeJson['hiddenValue']=this.emailContact.type;
			
			if(this.emailContact.adviceNotification != undefined){
				this.emailAdviceSheetNotification['value'] = this.emailContact.adviceNotification;
				
				if(this.emailContact.adviceNotification){
					this.AdviceSheetRadioButton.checked = this.emailContact.adviceNotification;
				}
			}
		}		
		
		this.emailDeletedObject = new Ext.form.Hidden(this.emailDeletedJson);
		this.emailIdObject = new Ext.form.Hidden(this.emailIdJson);
		this.emailAddressObject = new Ext.form.TextField(this.emailAddressJson);			
		this.emailTypeObject = new Ext.form.ComboBox(this.emailTypeJson);
						
		this.emailTypeOther = 
			new Ext.form.TextField({																				
							hideLabel:true,
							width:120,
							labelSeparator:"",
							disabled:true,
							hidden:true,
							id:"emailOther" + this.dynamicID,
							name : "emailOther" + this.dynamicID,
							maxLength : 20,
							msgTarget: "emailAddressTarget"+ this.dynamicID,
							msgDisplay:"",
							allowBlank:true
					});
					
		this.emailTypeOtherPanel = 
			new Ext.Panel({
						layout:"form",
						width:133,
						style:"padding-right:5px;",
						hidden:true,
						disabled:true,
						border:false,
						bodyBorder:false,
						hideBorders:true,
						items:[this.emailTypeOther]
					});
					
		var emailTypeOther = this.emailTypeOther;
		var emailTypeOtherPanel = this.emailTypeOtherPanel;

		if(typeof(this.allowDelete) == "undefined"){
			this.allowDelete = true;
		}

		if(this.allowDelete){
			this.interiorEraseButton = 
				new Ext.Button({arrayID:this.dynamicID,text:"X", cls :"support-portal-btn"});	
			
			this.EraseButtonPanel =
				new Ext.Panel({
					layout:"form",
					width:30,
					cls:"portal-plain-panel",										
					border:false,
					bodyBorder:false,
					hideBorders:true,
					items:[this.interiorEraseButton]
				});			

		}else{
			this.EraseButtonPanel =
				new Ext.Panel({
					layout:"form",
					width:30,
					cls:"portal-plain-panel",										
					border:false,
					bodyBorder:false,
					hideBorders:true,
					html:"&nbsp;"
				});
		}
        
        var adviceSheetJson = {border:false,bodyBorder:false,hideBorders:true};
        if(blnDisplayAdvicesheet){
        
        	adviceSheetJson =
				{
					layout:"column"									
					,cls:"portal-plain-panel"								
					,border:false
					,bodyBorder:false
					,hideBorders:true
					,items:[{width:10,html:"&nbsp;"},this.AdviceSheetRadioButton,this.emailAdviceSheetNotification]									
				};       
        }
        
		this.interiorFieldButtonPanel =
			new Ext.Panel({
							layout:"form"							
							,bodyBorder: false
							,border: false
							,hideBorders: true
							,ctCls:"portal-plain-panel"
							,items:[{
										layout:"column"									
										,cls:"portal-plain-panel"								
										,border:false
										,bodyBorder:false
										,hideBorders:true
										,items:[{
												layout:"form",
												width:205,
												cls:"portal-plain-panel",										
												border:false,
												bodyBorder:false,
												hideBorders:true,										
												items:[this.emailDeletedObject,this.emailIdObject,this.emailAddressObject]
											},{
												layout:"form",
												width:230,
												style:"padding-right:5px;",
												cls:"portal-plain-panel",										
												border:false,
												bodyBorder:false,
												hideBorders:true,
												items:[this.emailTypeObject]
											},this.emailTypeOtherPanel,this.EraseButtonPanel,{
												id:"emailAddressTarget"+ this.dynamicID,
												layout:"form",
												cls:"invalid-target-field-panel",
												style:"padding-top:5px;",
												border:false,
												bodyBorder:false,
												hideBorders:true								
											}]
									},adviceSheetJson]
					});				

		// Apply to this component
		Ext.apply(this, {
					layout:"form"							
					,bodyBorder: false
					,border: false
					,hideBorders: true
					,ctCls:"portal-plain-panel"
					,items:[this.interiorFieldButtonPanel]
				});

		// Apply to this component configuration
		Ext.apply(this.initialConfig, {
					layout: this.layout
					,style: this.style
					,ctCls: this.ctCls
					,bodyBorder: this.bodyBorder
					,border: this.border
					,width: this.width															
					,items: this.items
				});

		// call parent initComponent
		IDXM.emailAddressFieldsPanelNoTitle.superclass.initComponent.call(this);
	}
});

// Register component as xtype
Ext.reg('emailAddressFieldsPanelNoTitle', IDXM.emailAddressFieldsPanelNoTitle);

// Begin: Extend component
Ext.namespace("IDXM.emailMultiplePanel");
IDXM.emailMultiplePanel = Ext.extend(Ext.Panel, {
			
	// initComponent
	initComponent : function() {
	
		if(!this.blnDisplayAdvicesheet){this.blnDisplayAdvicesheet=false;}
	
		var panelID = this.id;
		var blnDisplayAdvicesheet = this.blnDisplayAdvicesheet;
	
		//This is initial array for all items
		var itemsArray = [{
					xtype: "label",
					text: "* Email(s):",
					cls: "supportPortalFormLabelBold"
				},{
					xtype:"panel"
					,border:false
					,bodyBorder:false
					,hideBorders:true
					,height:5
				}];
				
		//if array has items we add fields
		if(this.fieldArray.length){
			
			var arrayCount = 0;
			
			//Loop throught fields Array
			for(var i=0; i<this.fieldArray.length;i++){
				
				arrayCount += 1;
				
				//Add set of fields
				if(i){
					this.fieldArray[i] = new IDXM.emailAddressFieldsPanelNoTitle({id:panelID+"dynamicID"+i, dynamicID:i,emailContact:this.fieldArray[i],emailTypes:this.emailTypes,blnDisplayAdvicesheet:blnDisplayAdvicesheet});
				//Add set of fields for first set
				}else{
					this.fieldArray[i] = new IDXM.emailAddressFieldsPanelNoTitle({id:panelID+"dynamicID"+i, dynamicID:i,allowDelete:false,emailContact:this.fieldArray[i],emailTypes:this.emailTypes,blnDisplayAdvicesheet:blnDisplayAdvicesheet});
				}
				
				//Add Defautl Fields to items Arrray
				itemsArray[itemsArray.length] = this.fieldArray[i];
			}
			
			if(arrayCount < this.maxTypeRows){
				this.fieldArray[this.fieldArray.length] = new IDXM.emailAddressFieldsPanelNoTitle({id:panelID+"dynamicID"+this.fieldArray.length, dynamicID:this.fieldArray.length,emailTypes:this.emailTypes,blnDisplayAdvicesheet:blnDisplayAdvicesheet});
				itemsArray[itemsArray.length] = this.fieldArray[this.fieldArray.length-1];
			}
			
		//if array has no items
		}else{
			//Create Default Fields
			this.fieldArray[0] = new IDXM.emailAddressFieldsPanelNoTitle({id:panelID+"dynamicID0", dynamicID:0,allowDelete:false,emailTypes:this.emailTypes,blnDisplayAdvicesheet:blnDisplayAdvicesheet});
			this.fieldArray[1] = new IDXM.emailAddressFieldsPanelNoTitle({id:panelID+"dynamicID1", dynamicID:1,emailTypes:this.emailTypes,blnDisplayAdvicesheet:blnDisplayAdvicesheet});
			
			//Add Default Fields to itemsArray
			itemsArray[itemsArray.length] = this.fieldArray[0];
			itemsArray[itemsArray.length] = this.fieldArray[1];			
		}
		
		// Apply to this component
		Ext.apply(this, {	layout:"form",
					items:itemsArray
				});

		// Apply to this component configuration
		Ext.apply(this.initialConfig, {
						id:this.id,
						items: this.items
				});

		// call parent initComponent
		IDXM.emailMultiplePanel.superclass.initComponent.call(this);
	}

});

// Register component as xtype
Ext.reg('emailMultiplePanel', IDXM.emailMultiplePanel);


// Begin: Extend component
Ext.namespace("IDXM.emailsPanel");
IDXM.emailsPanel = Ext.extend(Ext.Panel, {

	// initComponent
	initComponent : function(config) {
		
		//Defaulting if nothing is passed
		if(!this.maxTypeRows){this.maxTypeRows=5;}
		if(!this.blnDisplayAdvicesheet){this.blnDisplayAdvicesheet=false;};
	
		// Important local Variables
		var panelID = this.id;		
		var hiddenEmailContactsCounter = new Ext.form.Hidden({name:"emailContactCounter"});
		var fieldsEmailArray;
		var emailMultiplePanel;		
		var emailTypes = this.emailTypes;
		var maxTypeRows = this.maxTypeRows;
		var unMarkAdviceSheetForFaxPanel = this.unMarkAdviceSheetForFaxPanel;
		var blnDisplayAdvicesheet = this.blnDisplayAdvicesheet;

		//Validate Fields In Panel 
		function validateFieldsInPanelHaveValue(m_EmailsObject){			

			//Is it Valid
			var isValid = true;	
			var arrayCount = 0;

			//Check to see if all fields are valid
			for(i=0;i<fieldsEmailArray.length;i++){
				if(fieldsEmailArray[i] != null){
					
					arrayCount += 1;
					
					var temp = fieldsEmailArray[i].emailAddressObject.getRawValue();
					if(temp.length <= 0){
						isValid = false;
						break;
					}

					var temp = fieldsEmailArray[i].emailTypeObject.getRawValue();
					if(temp.length <= 0){
						isValid = false;
						break;
					}
					
					var temp = fieldsEmailArray[i].emailTypeOther;
					if(temp && !temp.disabled){						
						temp = temp.getRawValue();
						if(temp.length <= 0){
							isValid = false;
							break;
						}
					}					
				}
			}
			
			//If all fields are valid Add New set of fields
			if(isValid && arrayCount < maxTypeRows){
			
				//map to local email object
				var emailsObject = m_EmailsObject;

				//Add A New Field to Array
				var newFieldPanel = new IDXM.emailAddressFieldsPanelNoTitle({id:"emailMultiplePanel"+panelID+"dynamicID"+fieldsEmailArray.length, dynamicID:fieldsEmailArray.length, emailTypes: emailTypes,blnDisplayAdvicesheet:blnDisplayAdvicesheet});
				fieldsEmailArray[fieldsEmailArray.length] = newFieldPanel;

				//Add New fields to Email Object
				emailsObject.add(newFieldPanel);

				//Add Listeners to Email Object
				addListenersFieldsInPanel(emailsObject);						

				//Do Layout for Email Object
				emailsObject.doLayout();		
			}

			return isValid;
		} //End of validate fields in Panel
		
		
		if(blnDisplayAdvicesheet){
			//Mark Advice Sheet Invalid - LOCAL FUNCTION
			function markAdviceSheet(m_adviceObject){			
				//Loop through fields
				for(i=0;i<fieldsEmailArray.length;i++){
					if(fieldsEmailArray[i] != null){
						if(m_adviceObject.adviceIndex == i){
							fieldsEmailArray[i].emailAdviceSheetNotification.setValue(true);
						}else{
							fieldsEmailArray[i].emailAdviceSheetNotification.setValue(false);
						}
					}
				}
			}//END: Mark Advice Sheet - LOCAL FUNCTION	
		}

		//Add Listeners to Fields - LOCAL FUNCTION
		function addListenersFieldsInPanel(m_EmailsObject){

			var emailsObject = m_EmailsObject;

			//Loop through Array to add Listeners
			for(i=0;i<fieldsEmailArray.length;i++){

				//If if there is something in Array
				if(fieldsEmailArray[i] != null){

					//On Blur validate Email
					fieldsEmailArray[i].emailAddressObject.on("blur",
						function(){
							validateFieldsInPanelHaveValue(emailsObject);
						}
					);

					//On Blur validate Email Type
					fieldsEmailArray[i].emailTypeObject.on("blur",
						function(){
							validateFieldsInPanelHaveValue(emailsObject);
						}
					);
					
					//On Blur validate Email Type Other
					fieldsEmailArray[i].emailTypeOther.on("blur",
						function(){
							validateFieldsInPanelHaveValue(emailsObject);
						}
					);	
							
					if(blnDisplayAdvicesheet){
						//On Check - Set Value of AdviceSheetRadion Button
						fieldsEmailArray[i].AdviceSheetRadioButton.on("check",
							function(){
								eval(unMarkAdviceSheetForFaxPanel);

								markAdviceSheet(Ext.decode(this.getRawValue()),emailsObject);

								this.checked=true;
								this.checked=false;							
							}
						);
					}

					//On Click Delete (for delete button)
					var panelToDelete = fieldsEmailArray[i].interiorFieldButtonPanel;
					try{
						fieldsEmailArray[i].interiorEraseButton.on("click",
													function(panelToDelete,emailsObject,i){
														
														var arrayID = this.arrayID;
														
														Ext.getCmp("emailMultiplePanel"+panelID+"dynamicID"+this.arrayID).cascade(function(item){
														  if (item.isFormField) {
														  	if(item.name == "emailDeleted"+arrayID){
														  		item.setValue("true");
														  	}
														  }
														});	
														
														if(blnDisplayAdvicesheet){
															fieldsEmailArray[this.arrayID].emailAdviceSheetNotification.setValue(false);
														}
														
														Ext.getCmp("emailMultiplePanel"+panelID+"dynamicID"+this.arrayID).setVisible(false);

														fieldsEmailArray[this.arrayID] = null;	
													}
											);							
					}catch(e){}
				}//End of IF	
			}//End of For
			
			//Set Hidden Counter
			hiddenEmailContactsCounter.setValue(fieldsEmailArray.length-1);
			
		}//END: Add Listeners to Fields - LOCAL FUNCTION
		
		//If Load Array
		if(this.loadArray && this.loadArray.length){	
			fieldsEmailArray = this.loadArray;
			emailMultiplePanel = new IDXM.emailMultiplePanel({id:"emailMultiplePanel"+panelID, fieldArray:this.loadArray,emailTypes:this.emailTypes,maxTypeRows:maxTypeRows,blnDisplayAdvicesheet:blnDisplayAdvicesheet});
		}else{
			fieldsEmailArray = new Array();
			emailMultiplePanel = new IDXM.emailMultiplePanel({id:"emailMultiplePanel"+panelID, fieldArray:fieldsEmailArray,emailTypes:this.emailTypes,blnDisplayAdvicesheet:blnDisplayAdvicesheet});
		}
		
		//Add Listeners
		addListenersFieldsInPanel(emailMultiplePanel);

		// Apply to this component
		Ext.apply(this, {
					layout:"form"
					,bodyBorder: false
					,border: false
					,ctCls:"portal-plain-panel"
					,hideBorders:true
					,items:[emailMultiplePanel,hiddenEmailContactsCounter]
				});

		// Apply to this component configuration
		Ext.apply(this.initialConfig, {
						layout: this.layout
						,style: this.style
						,bodyBorder: this.bodyBorder
						,border: this.border
						,ctCls:"portal-plain-panel"
						,width: this.width															
						,items: this.items
				});
		
		if(blnDisplayAdvicesheet){
			//unMarkAdviceSheet  - Public Function
			this.unMarkAdviceSheet = function(){				
				var fieldsEmailArray = this.fieldsEmailArray;			
				//Loop through fields
				for(i=0;i<fieldsEmailArray.length;i++){
					if(fieldsEmailArray[i] != null){
						fieldsEmailArray[i].emailAdviceSheetNotification.setValue(false);
					}
				}
			}//END: unMarkAdviceSheet  - Public Function
			
			//isAdvice Sheet Valid - Public Function
			this.isAdviceSheetValid = function (formPanelObject,fieldName){
				var AdviceNotificationCheckBoxFieldArray = formPanelObject.find("name",fieldName);

				var areAllNotificationChecksEmpty = true;
				var adviceNotificationValue;
				for(i=0;i<AdviceNotificationCheckBoxFieldArray.length;i++){
					if(AdviceNotificationCheckBoxFieldArray[i].getValue()){
						areAllNotificationChecksEmpty = false; 
						adviceNotificationValue = AdviceNotificationCheckBoxFieldArray[i].getRawValue();
					}
				}
				
				if(areAllNotificationChecksEmpty){
					return false;
				}else{
					var adviceNotificationValueJson = Ext.decode(adviceNotificationValue);	
					if(adviceNotificationValueJson.adviceType == "email"){
						if(!Ext.isEmpty(fieldsEmailArray[adviceNotificationValueJson.adviceIndex])){
							if(fieldsEmailArray[adviceNotificationValueJson.adviceIndex].emailAddressObject.getValue().trim() == "" &&
								fieldsEmailArray[adviceNotificationValueJson.adviceIndex].emailTypeOther.getValue().trim() == ""){
									return false;
							}else{
								return true;
							}
						}else{
							return false;
						}
					}else{
						return true;
					}
				}
			}//END: //isAdvice Sheet Valid - Public Function			
		}
		
		//Public variable
		this.fieldsEmailArray = fieldsEmailArray;

		// call parent initComponent
		IDXM.emailsPanel.superclass.initComponent.call(this);
	}

});


// Register component as xtype
Ext.reg('emailsPanel', IDXM.emailsPanel);
