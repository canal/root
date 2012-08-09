
// Begin: Extend component
Ext.namespace("idxm.selfprofile.ux.panel.contacts.EmailPanel");
idxm.selfprofile.ux.panel.contacts.EmailPanel = Ext.extend(Ext.Panel, {

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
				var newFieldPanel = new idxm.selfprofile.ux.panel.contacts.EmailRowPanel({id:"emailMultiplePanel"+panelID+"dynamicID"+fieldsEmailArray.length, dynamicID:fieldsEmailArray.length, emailTypes: emailTypes,blnDisplayAdvicesheet:blnDisplayAdvicesheet});
				fieldsEmailArray[fieldsEmailArray.length] = newFieldPanel;

				//Add New fields to Email Object
				emailsObject.add(newFieldPanel);

				//Add Listeners to Email Object
				addListenersFieldsInPanel(emailsObject);						

				//Do Layout for Email Object
				emailsObject.doLayout();		
			}

			return isValid;
		}; //End of validate fields in Panel
		
		
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
			
		};//END: Add Listeners to Fields - LOCAL FUNCTION
		
		//If Load Array
		if(this.loadArray && this.loadArray.length){	
			fieldsEmailArray = this.loadArray;
			emailMultiplePanel = new idxm.selfprofile.ux.panel.contacts.EmailMultipleRowPanel({id:"emailMultiplePanel"+panelID, fieldArray:this.loadArray,emailTypes:this.emailTypes,maxTypeRows:maxTypeRows,blnDisplayAdvicesheet:blnDisplayAdvicesheet});
		}else{
			fieldsEmailArray = new Array();
			emailMultiplePanel = new idxm.selfprofile.ux.panel.contacts.EmailMultipleRowPanel({id:"emailMultiplePanel"+panelID, fieldArray:fieldsEmailArray,emailTypes:this.emailTypes,blnDisplayAdvicesheet:blnDisplayAdvicesheet});
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
		idxm.selfprofile.ux.panel.contacts.EmailPanel.superclass.initComponent.call(this);
	}

});

// Register component as xtype
Ext.reg('idxm.selfprofile.ux.panel.contacts.EmailPanel', idxm.selfprofile.ux.panel.contacts.EmailPanel);
