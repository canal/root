
// Begin: Extend component
Ext.namespace("idxm.selfprofile.ux.panel.contacts.PhonePanel");
idxm.selfprofile.ux.panel.contacts.PhonePanel = Ext.extend(Ext.Panel, {

	// initComponent
	initComponent : function(config) {
	
		if(!this.maxTypeRows){this.maxTypeRows=5;}
	
		// Important Local Variables
		var panelID = this.id;
		var phoneTypes = this.phoneTypes;
		var isPhoneRequired = (this.isPhoneRequired != undefined)? this.isPhoneRequired : true;
		var maxTypeRows = this.maxTypeRows;	
		var hiddenPhoneContactsCounter = new Ext.form.Hidden({name:"phoneContactCounter"});		
		var fieldsPhoneArray;
		var phoneMultiplePanel;		

		//Validate Fields In Panel 
		function validateFieldsInPanelHaveValue(m_PhonesObject){

			//Is it Valid
			var isValid = true;
			var arrayCount = 0;

			//Check to see if all fields are valid
			for(i=0;i<fieldsPhoneArray.length;i++){
				if(fieldsPhoneArray[i] != null){
					
					arrayCount += 1;
					
					var temp = fieldsPhoneArray[i].phoneAddressObject.getRawValue();
					if(temp.length <= 0){
						isValid = false;
						break;
					}

					var temp = fieldsPhoneArray[i].phoneTypeObject.getRawValue();
					if(temp.length <= 0){
						isValid = false;
						break;
					}
					
					var temp = fieldsPhoneArray[i].phoneTypeOther;
					if(temp && !temp.disabled){
						temp = temp.getRawValue();
						if(temp.length <= 0){
							isValid = false;
							break;
						}
					}					
				}
			}					

			//If all fields are valid & is less than Max rows Add New set of fields
			if(isValid  && arrayCount < maxTypeRows){
				//map to local phone object
				var phonesObject = m_PhonesObject;

				//Add A New Field to Array
				var newFieldPanel = new idxm.selfprofile.ux.panel.contacts.PhoneRowContactPanel({id:"phoneMultiplePanel"+panelID+"dynamicID"+fieldsPhoneArray.length, dynamicID:fieldsPhoneArray.length,phoneTypes:phoneTypes,"isPhoneRequired":isPhoneRequired});
				fieldsPhoneArray[fieldsPhoneArray.length] = newFieldPanel;						

				//Add New fields to Phone Object
				phonesObject.add(newFieldPanel);

				//Add Listeners to Phone Object
				addListenersFieldsInPanel(phonesObject);						

				//Do Layout for Phone Object
				phonesObject.doLayout();		
			}

			return isValid;
		};
		
		//Enable Button to Mark First Row as Deleted
		function makeFirstRowDeletable(){
			var blnMakeFirstRowDeletable = true;
			for(i=1;i<fieldsPhoneArray.length;i++){			
				if(fieldsPhoneArray[i] != null){					
						if(fieldsPhoneArray[i].phoneDeletedObject.getValue() != undefined && fieldsPhoneArray[i].phoneDeletedObject.getValue() != "true"){
							if((fieldsPhoneArray[i].phoneAddressObject.getValue() != undefined && fieldsPhoneArray[i].phoneAddressObject.getValue().trim() != "")
								|| (fieldsPhoneArray[i].phoneTypeObject.getValue() != undefined && fieldsPhoneArray[i].phoneTypeObject.getValue().trim() != "")){
								blnMakeFirstRowDeletable = false;
							}
						}
				}
			}
			fieldsPhoneArray[0].EraseButtonPanel.setVisible(blnMakeFirstRowDeletable);	
		};//END: //Enable Button to Mark First Row as Deleted	

		//Add Listeners to Fields
		function addListenersFieldsInPanel(m_PhonesObject){

			var phonesObject = m_PhonesObject;

			//Loop through Array to add Listeners
			for(i=0;i<fieldsPhoneArray.length;i++){

				//If if there is something in Array
				if(fieldsPhoneArray[i] != null){

					//On Blur validate Phone
					fieldsPhoneArray[i].phoneAddressObject.on("blur",
						function(){
							validateFieldsInPanelHaveValue(phonesObject);
							if(!isPhoneRequired){
								makeFirstRowDeletable();
							}
						}
					);

					//On Blur validate Phone Type
					fieldsPhoneArray[i].phoneTypeObject.on("blur",
						function(){
							validateFieldsInPanelHaveValue(phonesObject);
							if(!isPhoneRequired){
								makeFirstRowDeletable();
							}
						}
					);
					
					//On Blur validate Phone Type Other
					fieldsPhoneArray[i].phoneTypeOther.on("blur",
						function(){
							validateFieldsInPanelHaveValue(phonesObject);
							
							if(!isPhoneRequired){
								makeFirstRowDeletable();
							}
								
						}
					);					

					//On Click Delete (for delete button)
					var panelToDelete = fieldsPhoneArray[i].interiorFieldButtonPanel;
					try{
						if(i){
							fieldsPhoneArray[i].interiorEraseButton.on("click",
														function(panelToDelete,phonesObject,i){														

															var arrayID = this.arrayID;

															Ext.getCmp("phoneMultiplePanel"+panelID+"dynamicID"+this.arrayID).cascade(function(item){
															  if (item.isFormField) {
																if(item.name == "phoneDeleted"+arrayID){
																	item.setValue("true");
																}
															  }
															});

															if(!isPhoneRequired){															
																makeFirstRowDeletable();
															}

															Ext.getCmp("phoneMultiplePanel"+panelID+"dynamicID"+this.arrayID).setVisible(false);

															fieldsPhoneArray[this.arrayID] = null;	
														}
												);
						}else{
							fieldsPhoneArray[i].interiorEraseButton.on("click",
														function(panelToDelete,phonesObject,i){

															var arrayID = this.arrayID;																									

															fieldsPhoneArray[this.arrayID].phoneAddressObject.setValue("");
															fieldsPhoneArray[this.arrayID].phoneTypeObject.setValue("");
															fieldsPhoneArray[this.arrayID].phoneTypeOther.setValue("");																						
														}
												);						
						}
					}catch(e){}
				}//End of IF	
			}//End of For
			
			//Set Hidden Counter
			hiddenPhoneContactsCounter.setValue(fieldsPhoneArray.length-1);
			
		};//End of Function
		
		//If Load Array
		if(this.loadArray && this.loadArray.length){	
			fieldsPhoneArray = this.loadArray;
			phoneMultiplePanel = new idxm.selfprofile.ux.panel.contacts.PhoneMultipleRowContactPanel({id:"phoneMultiplePanel"+panelID, fieldArray:this.loadArray,phoneTypes:this.phoneTypes,maxTypeRows:maxTypeRows,"isPhoneRequired":(this.isPhoneRequired != undefined)?this.isPhoneRequired:true});
		}else{
			fieldsPhoneArray = new Array();
			phoneMultiplePanel = new idxm.selfprofile.ux.panel.contacts.PhoneMultipleRowContactPanel({id:"phoneMultiplePanel"+panelID, fieldArray:fieldsPhoneArray,phoneTypes:this.phoneTypes,"isPhoneRequired":(this.isPhoneRequired != undefined)?this.isPhoneRequired:true});
		}
		
		//Add Listeners
		addListenersFieldsInPanel(phoneMultiplePanel);
		
		if(!isPhoneRequired){
			//Display Delete button for first Row (If appropriately)
			makeFirstRowDeletable();
		}

		// Apply to this component
		Ext.apply(this, {
					layout:"form"
					,bodyBorder: false
					,border: false
					,ctCls:"portal-plain-panel"
					,hideBorders:true
					,items:[phoneMultiplePanel,hiddenPhoneContactsCounter]
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

		// call parent initComponent
		idxm.selfprofile.ux.panel.contacts.PhonePanel.superclass.initComponent.call(this);
	}
});

// Register component as xtype
Ext.reg('idxm.selfprofile.ux.panel.contacts.PhonePanel', idxm.selfprofile.ux.panel.contacts.PhonePanel);
