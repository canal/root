
// Begin: Extend component
Ext.namespace("idxm.selfprofile.ux.panel.contacts.FaxPanel");
idxm.selfprofile.ux.panel.contacts.FaxPanel = Ext.extend(Ext.Panel, {

	// initComponent
	initComponent : function(config) {
		
		//Defaulting if nothing is passed
		if(!this.maxTypeRows){this.maxTypeRows=5;}
		if(!this.blnDisplayAdvicesheet){this.blnDisplayAdvicesheet=false;};
	
		// Important local Variables
		var panelID = this.id;
		var faxTypes = this.faxTypes;
		var maxTypeRows = this.maxTypeRows;
		var hiddenFaxContactsCounter = new Ext.form.Hidden({name:"faxContactCounter"});
		var unMarkAdviceSheetForEmailPanel = this.unMarkAdviceSheetForEmailPanel;
		var fieldsFaxArray;
		var faxMultiplePanel;
		var blnDisplayAdvicesheet = this.blnDisplayAdvicesheet;

		//Validate Fields In Panel - LOCAL FUNCTION
		function validateFieldsInPanelHaveValue(m_FaxsObject){

			//Is it Valid
			var isValid = true;
			var arrayCount = 0;

			//Check to see if all fields are valid
			for(i=0;i<fieldsFaxArray.length;i++){
				if(fieldsFaxArray[i] != null){
					
					arrayCount += 1;
					
					var temp = fieldsFaxArray[i].faxAddressObject.getRawValue();
					if(temp.length <= 0){
						isValid = false;
						break;
					}

					var temp = fieldsFaxArray[i].faxTypeObject.getRawValue();
					if(temp.length <= 0){
						isValid = false;
						break;
					}
					
					var temp = fieldsFaxArray[i].faxTypeOther;
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
				//map to local fax object
				var faxsObject = m_FaxsObject;

				//Add A New Field to Array
				var newFieldPanel = new idxm.selfprofile.ux.panel.contacts.FaxRowContactPanel({id:"faxMultiplePanel"+panelID+"dynamicID"+fieldsFaxArray.length, dynamicID:fieldsFaxArray.length, faxTypes:faxTypes,blnDisplayAdvicesheet:blnDisplayAdvicesheet});
				fieldsFaxArray[fieldsFaxArray.length] = newFieldPanel;						

				//Add New fields to Fax Object
				faxsObject.add(newFieldPanel);

				//Add Listeners to Fax Object
				addListenersFieldsInPanel(faxsObject);						

				//Do Layout for Fax Object
				faxsObject.doLayout();		
			}

			return isValid;
		};//END: Validate Fields In Panel - LOCAL FUNCTION
		
		if(blnDisplayAdvicesheet){	
			//Mark Advice Sheet Invalid - LOCAL FUNCTION
			function markAdviceSheet(m_adviceObject){			
				//Loop through fields
				for(i=0;i<fieldsFaxArray.length;i++){
					if(fieldsFaxArray[i] != null){
						if(m_adviceObject.adviceIndex == i){
							fieldsFaxArray[i].faxAdviceSheetNotification.setValue(true);
						}else{
							fieldsFaxArray[i].faxAdviceSheetNotification.setValue(false);
						}
					}
				}
			}//END: Mark Advice Sheet - LOCAL FUNCTION	
		}
		
		
		//Enable Button to Mark First Row as Deleted
		function makeFirstRowDeletable(){
			var blnMakeFirstRowDeletable = true;
			for(i=1;i<fieldsFaxArray.length;i++){			
				if(fieldsFaxArray[i] != null){					
						if(fieldsFaxArray[i].faxDeletedObject.getValue() != undefined && fieldsFaxArray[i].faxDeletedObject.getValue() != "true"){
							if((fieldsFaxArray[i].faxAddressObject.getValue() != undefined && fieldsFaxArray[i].faxAddressObject.getValue().trim() != "")
								|| (fieldsFaxArray[i].faxTypeObject.getValue() != undefined && fieldsFaxArray[i].faxTypeObject.getValue().trim() != "")){
								blnMakeFirstRowDeletable = false;
							}
						}
				}
			}
			fieldsFaxArray[0].EraseButtonPanel.setVisible(blnMakeFirstRowDeletable);	
		};//END: //Enable Button to Mark First Row as Deleted

		//Add Listeners to Fields - LOCAL FUNCTION
		function addListenersFieldsInPanel(m_FaxsObject){

			var faxsObject = m_FaxsObject;

			//Loop through Array to add Listeners
			for(i=0;i<fieldsFaxArray.length;i++){

				//If if there is something in Array
				if(fieldsFaxArray[i] != null){

					//On Blur validate Fax
					fieldsFaxArray[i].faxAddressObject.on("blur",
						function(){
							validateFieldsInPanelHaveValue(faxsObject);
							makeFirstRowDeletable();
						}
					);

					//On Blur validate Fax Type
					fieldsFaxArray[i].faxTypeObject.on("blur",
						function(){
							validateFieldsInPanelHaveValue(faxsObject);
							makeFirstRowDeletable();
						}
					);
					
					//On Blur validate Fax Type Other
					fieldsFaxArray[i].faxTypeOther.on("blur",
						function(){												
							validateFieldsInPanelHaveValue(faxsObject);
							makeFirstRowDeletable();
						}
					);		
					
					if(blnDisplayAdvicesheet){
						//On Check - Set Value of AdviceSheetRadion Button
						fieldsFaxArray[i].AdviceSheetRadioButton.on("check",
							function(){
							
								makeFirstRowDeletable();

								eval(unMarkAdviceSheetForEmailPanel);

								markAdviceSheet(Ext.decode(this.getRawValue()),faxsObject);

								this.checked=true;
								this.checked=false;							
							}
						);	
					}

					//On Click Delete (for delete button)
					var panelToDelete = fieldsFaxArray[i].interiorFieldButtonPanel;
					try{
						if(i){
							fieldsFaxArray[i].interiorEraseButton.on("click",
										function(panelToDelete,faxsObject,i){

											var arrayID = this.arrayID;																									

											Ext.getCmp("faxMultiplePanel"+panelID+"dynamicID"+this.arrayID).cascade(function(item){
											  if (item.isFormField) {
												if(item.name == "faxDeleted"+arrayID){
													item.setValue("true");
												}
											  }
											});

											//fieldsFaxArray[this.arrayID].faxDeletedObject.setValue("true");	

											makeFirstRowDeletable();

											if(blnDisplayAdvicesheet){
												fieldsFaxArray[this.arrayID].faxAdviceSheetNotification.setValue(false);
											}														

											Ext.getCmp("faxMultiplePanel"+panelID+"dynamicID"+this.arrayID).setVisible(false);

											fieldsFaxArray[this.arrayID] = null;									

										}
								);	
						}else{
							fieldsFaxArray[i].interiorEraseButton.on("click",
														function(panelToDelete,faxsObject,i){

															var arrayID = this.arrayID;																									

															fieldsFaxArray[this.arrayID].faxAddressObject.setValue("");
															fieldsFaxArray[this.arrayID].faxTypeObject.setValue("");
															fieldsFaxArray[this.arrayID].faxTypeOther.setValue("");
															if(blnDisplayAdvicesheet){
																fieldsFaxArray[this.arrayID].faxAdviceSheetNotification.setValue(false);
															}																							

														}
												);							
						}
					}catch(e){}
				}//End of IF	
			}//End of For
			
			//Set Hidden Counter
			hiddenFaxContactsCounter.setValue(fieldsFaxArray.length-1);
			
		};//END: Add Listeners to Fields - LOCAL FUNCTION

		
		//If Load Array
		if(this.loadArray && this.loadArray.length){	
			fieldsFaxArray = this.loadArray;
			faxMultiplePanel = new idxm.selfprofile.ux.panel.contacts.FaxMultipleRowContactPanel({id:"faxMultiplePanel"+panelID, fieldArray:this.loadArray,faxTypes:this.faxTypes,maxTypeRows:maxTypeRows,blnDisplayAdvicesheet:blnDisplayAdvicesheet});
		}else{
			fieldsFaxArray = new Array();
			faxMultiplePanel = new idxm.selfprofile.ux.panel.contacts.FaxMultipleRowContactPanel({id:"faxMultiplePanel"+panelID, fieldArray:fieldsFaxArray,faxTypes:this.faxTypes,blnDisplayAdvicesheet:blnDisplayAdvicesheet});		
		}
		
		//Add Listeners
		addListenersFieldsInPanel(faxMultiplePanel);
		
		//Display Delete button for first Row (If appropriately)
		makeFirstRowDeletable();

		// Apply to this component
		Ext.apply(this, {
					layout:"form"
					,bodyBorder: false
					,border: false
					,ctCls:"portal-plain-panel"
					,hideBorders:true
					,items:[faxMultiplePanel,hiddenFaxContactsCounter]
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
				var fieldsFaxArray = this.fieldsFaxArray;			
				//Loop through fields
				for(i=0;i<fieldsFaxArray.length;i++){
					if(fieldsFaxArray[i] != null){
						fieldsFaxArray[i].faxAdviceSheetNotification.setValue(false);
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
					if(adviceNotificationValueJson.adviceType == "fax"){
						if(!Ext.isEmpty(fieldsFaxArray[adviceNotificationValueJson.adviceIndex])){
							if(fieldsFaxArray[adviceNotificationValueJson.adviceIndex].faxAddressObject.getValue().trim() == "" &&
								fieldsFaxArray[adviceNotificationValueJson.adviceIndex].faxTypeOther.getValue().trim() == ""){
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
		this.fieldsFaxArray = fieldsFaxArray;		
		

		// call parent initComponent
		idxm.selfprofile.ux.panel.contacts.FaxPanel.superclass.initComponent.call(this);
	}

});


// Register component as xtype
Ext.reg('idxm.selfprofile.ux.panel.contacts.FaxPanel', idxm.selfprofile.ux.panel.contacts.FaxPanel);
