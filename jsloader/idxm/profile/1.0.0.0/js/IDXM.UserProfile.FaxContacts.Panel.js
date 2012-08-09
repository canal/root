
// Begin: Extend component
Ext.namespace("IDXM.faxAddressFieldsPanelNoTitle");
IDXM.faxAddressFieldsPanelNoTitle = Ext.extend(Ext.Panel, {
	// initComponent
	initComponent : function() {		
		
		this.faxTypes = [{"id":"","name":"- Select One -"}].concat(this.faxTypes);
		if(!this.blnDisplayAdvicesheet){this.blnDisplayAdvicesheet=false;}
		var blnDisplayAdvicesheet = this.blnDisplayAdvicesheet;		
		
		this.faxDeletedJson =
		{
			id:"faxDeleted" + this.dynamicID,
			name:"faxDeleted" + this.dynamicID,
			value:false
		};
		
		this.faxIdJson =
		{
			id:"faxId"+ this.dynamicID,
			name:"faxId" + this.dynamicID
		};			
		
		this.faxAddressJson =
		{																				
			hideLabel:true,
			labelSeparator:"",
			id:"faxAddress" + this.dynamicID, 	
			name :"faxAddress" + this.dynamicID,
			maxLength : 256,
			width:200,
			msgTarget: "faxAddressTarget"+ this.dynamicID,
			msgDisplay:"",
			vtype:"phone",
			validationEvent:"blur",
			//value:(this.faxContact === undefined) ? "" : (this.faxContact.value === undefined) ? "" : this.faxContact.value,
			allowBlank:true
		};
		
		this.faxTypeJson =
		{									
			hideLabel:true,
			width:225,
			labelSeparator:"",
			hiddenId:"faxTypeCode" + this.dynamicID,
			hiddenName:"faxTypeCode" + this.dynamicID,
			id:"faxTypeText" + this.dynamicID,
			name:"faxTypeText" + this.dynamicID,
			msgTarget: "faxAddressTarget"+ this.dynamicID,
			msgDisplay:"",
			mode:"local",
			store: new Ext.data.JsonStore({
					fields: ['id', 'name'],
					root : "rows",
					idProperty: "id",
					data:{ "rows":this.faxTypes}
			}),
			valueField:"id",
			emptyText: "- Select One -",
			//value:(this.faxContact === undefined) ? "" : (this.faxContact.type === undefined) ? "" : this.faxContact.type,
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
								faxTypeOtherPanel.enable();
								faxTypeOtherPanel.show();
								faxTypeOtherPanel.cascade(function(item){
								  if (item.isFormField) {
								    item.enable();
								    item.show();
								  }
								});												
							}else{
								faxTypeOtherPanel.enable();
										faxTypeOtherPanel.disable();
										faxTypeOtherPanel.hide();
										faxTypeOtherPanel.cascade(function(item){
										  if (item.isFormField) {
										    item.disable();
										    item.hide();
										  }
										});												
							}
					}
			}
		};
		
		this.faxAdviceSheetNotification = 
			new Ext.form.Hidden({		
									id:"faxAdviceSheetNotification"+ this.dynamicID,
									name:"faxAdviceSheetNotification" + this.dynamicID,
									value:false
								});
		
		var dynamicID = this.dynamicID;		
		
		this.AdviceSheetRadioButton =
			new Ext.form.Radio({
                hideLabel: true,
                labelSeparator: '',
                boxLabel: 'Use For Advice Notification',
                name: 'AdviceNotificationCheckBox',
                inputValue: Ext.encode({"adviceType":"fax","adviceIndex":dynamicID}),
                value:this.dynamicID,
                ctCls:"advice-box-label",
                cls:"advice-box-label",
                listeners:{
                	check:function(){
                		
                	}
                }
            });			
		
		if(this.faxContact != undefined && this.faxContact.value != undefined){
			this.faxIdJson['value']=this.faxContact.id;
			this.faxAddressJson['value']=this.faxContact.value;
			this.faxTypeJson['value']=this.faxContact.type;
			this.faxTypeJson['hiddenValue']=this.faxContact.type;
			
			if(this.faxContact.adviceNotification != undefined){
				this.faxAdviceSheetNotification['value'] = this.faxContact.adviceNotification;
				
				if(this.faxContact.adviceNotification){
					this.AdviceSheetRadioButton.checked = this.faxContact.adviceNotification;
				}
			}			
		}			
		
		this.faxDeletedObject = new Ext.form.Hidden(this.faxDeletedJson);
		this.faxIdObject = new Ext.form.Hidden(this.faxIdJson);
		this.faxAddressObject = new Ext.form.TextField(this.faxAddressJson);				
		this.faxTypeObject = new Ext.form.ComboBox(this.faxTypeJson);
						
		this.faxTypeOther = 
			new Ext.form.TextField({																				
							hideLabel:true,
							width:120,
							labelSeparator:"",
							disabled:true,
							hidden:true,
							id:"faxOther" + this.dynamicID,
							name :"faxOther" + this.dynamicID,	
							maxLength : 20,
							msgTarget: "faxAddressTarget"+ this.dynamicID,
							msgDisplay:"",
							allowBlank:true
					});
					
		this.faxTypeOtherPanel = 
			new Ext.Panel({
						layout:"form",
						width:133,
						style:"padding-right:5px;",
						hidden:true,
						disabled:true,
						border:false,
						bodyBorder:false,
						hideBorders:true,
						items:[this.faxTypeOther]
					});
					
		var faxTypeOther = this.faxTypeOther;
		var faxTypeOtherPanel = this.faxTypeOtherPanel;

		if(typeof(this.allowDelete) == "undefined"){
			this.allowDelete = true;
		}

		if(this.allowDelete){
			this.interiorEraseButton = 
				new Ext.Button({arrayID:this.dynamicID,text:"X", ctCls :"support-portal-btn"});	
			
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
			this.interiorEraseButton = 
				new Ext.Button({arrayID:this.dynamicID,text:"X", ctCls :"support-portal-btn"});			
		
			this.EraseButtonPanel =
				new Ext.Panel({
					layout:"form",
					width:30,
					cls:"portal-plain-panel",										
					border:false,
					bodyBorder:false,
					hideBorders:true,
					hidden:true,
					items:[this.interiorEraseButton]
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
				,items:[{width:10,html:"&nbsp;"},this.AdviceSheetRadioButton,this.faxAdviceSheetNotification]									
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
												items:[this.faxDeletedObject,this.faxIdObject,this.faxAddressObject]
											},{
												layout:"form",
												width:230,
												style:"padding-right:5px;",
												cls:"portal-plain-panel",										
												border:false,
												bodyBorder:false,
												hideBorders:true,
												items:[this.faxTypeObject]
											},this.faxTypeOtherPanel,this.EraseButtonPanel,{
												id:"faxAddressTarget"+ this.dynamicID,
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
		IDXM.faxAddressFieldsPanelNoTitle.superclass.initComponent.call(this);
	}
});

// Register component as xtype
Ext.reg('faxAddressFieldsPanelNoTitle', IDXM.faxAddressFieldsPanelNoTitle);

// Begin: Extend component
Ext.namespace("IDXM.faxMultiplePanel");
IDXM.faxMultiplePanel = Ext.extend(Ext.Panel, {
			
	// initComponent
	initComponent : function() {
	
		if(!this.blnDisplayAdvicesheet){this.blnDisplayAdvicesheet=false;}
	
		var panelID = this.id;
		var blnDisplayAdvicesheet = this.blnDisplayAdvicesheet;
	
		//This is initial array for all items
		var itemsArray = [{
					xtype: "label",
					text: "Fax(s):",
					cls: "supportPortalFormLabel"
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
					this.fieldArray[i] = new IDXM.faxAddressFieldsPanelNoTitle({id:panelID+"dynamicID"+i, dynamicID:i,faxContact:this.fieldArray[i],faxTypes:this.faxTypes,blnDisplayAdvicesheet:blnDisplayAdvicesheet});
				//Add set of fields for first set
				}else{
					this.fieldArray[i] = new IDXM.faxAddressFieldsPanelNoTitle({id:panelID+"dynamicID"+i, dynamicID:i,allowDelete:false,faxContact:this.fieldArray[i],faxTypes:this.faxTypes,blnDisplayAdvicesheet:blnDisplayAdvicesheet});
				}
				//Add Defautl Fields to items Arrray
				itemsArray[itemsArray.length] = this.fieldArray[i];
			}
			
			if(arrayCount < this.maxTypeRows){
				this.fieldArray[this.fieldArray.length] = new IDXM.faxAddressFieldsPanelNoTitle({id:panelID+"dynamicID"+this.fieldArray.length, dynamicID:this.fieldArray.length,faxTypes:this.faxTypes,blnDisplayAdvicesheet:blnDisplayAdvicesheet});
				itemsArray[itemsArray.length] = this.fieldArray[this.fieldArray.length-1];
			}
			
		//if array has no items
		}else{
			//Create Default Fields
			this.fieldArray[0] = new IDXM.faxAddressFieldsPanelNoTitle({id:panelID+"dynamicID0", dynamicID:0,allowDelete:false,faxTypes:this.faxTypes,blnDisplayAdvicesheet:blnDisplayAdvicesheet});
			this.fieldArray[1] = new IDXM.faxAddressFieldsPanelNoTitle({id:panelID+"dynamicID1", dynamicID:1,faxTypes:this.faxTypes,blnDisplayAdvicesheet:blnDisplayAdvicesheet});
			
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
		IDXM.faxMultiplePanel.superclass.initComponent.call(this);
	}

});

// Register component as xtype
Ext.reg('faxMultiplePanel', IDXM.faxMultiplePanel);


// Begin: Extend component
Ext.namespace("IDXM.faxsPanel");
IDXM.faxsPanel = Ext.extend(Ext.Panel, {

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
				var newFieldPanel = new IDXM.faxAddressFieldsPanelNoTitle({id:"faxMultiplePanel"+panelID+"dynamicID"+fieldsFaxArray.length, dynamicID:fieldsFaxArray.length, faxTypes:faxTypes,blnDisplayAdvicesheet:blnDisplayAdvicesheet});
				fieldsFaxArray[fieldsFaxArray.length] = newFieldPanel;						

				//Add New fields to Fax Object
				faxsObject.add(newFieldPanel);

				//Add Listeners to Fax Object
				addListenersFieldsInPanel(faxsObject);						

				//Do Layout for Fax Object
				faxsObject.doLayout();		
			}

			return isValid;
		}//END: Validate Fields In Panel - LOCAL FUNCTION
		
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
		}//END: //Enable Button to Mark First Row as Deleted

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
			
		}//END: Add Listeners to Fields - LOCAL FUNCTION

		
		//If Load Array
		if(this.loadArray && this.loadArray.length){	
			fieldsFaxArray = this.loadArray;
			faxMultiplePanel = new IDXM.faxMultiplePanel({id:"faxMultiplePanel"+panelID, fieldArray:this.loadArray,faxTypes:this.faxTypes,maxTypeRows:maxTypeRows,blnDisplayAdvicesheet:blnDisplayAdvicesheet});
		}else{
			fieldsFaxArray = new Array();
			faxMultiplePanel = new IDXM.faxMultiplePanel({id:"faxMultiplePanel"+panelID, fieldArray:fieldsFaxArray,faxTypes:this.faxTypes,blnDisplayAdvicesheet:blnDisplayAdvicesheet});		
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
		IDXM.faxsPanel.superclass.initComponent.call(this);
	}

});


// Register component as xtype
Ext.reg('faxsPanel', IDXM.faxsPanel);
