
// Begin: Extend component
Ext.namespace("IDXM.phoneAddressFieldsPanelNoTitle");
IDXM.phoneAddressFieldsPanelNoTitle = Ext.extend(Ext.Panel, {
	// initComponent
	initComponent : function() {
		
		var isPhoneRequired = (this.isPhoneRequired != undefined) ? this.isPhoneRequired : true;
		
		this.phoneTypes = [{"id":"","name":"- Select One -"}].concat(this.phoneTypes);
		
		this.phoneDeletedJson =
		{
			id:"phoneDeleted" + this.dynamicID,
			name:"phoneDeleted" + this.dynamicID,
			value:false
		};
		
		this.phoneIdJson =
		{
			id:"phoneId"+ this.dynamicID,
			name:"phoneId" + this.dynamicID
		};		

		this.phoneAddressJson =
		{
			hideLabel:true,
			labelSeparator:"",
			id:"phoneAddress" + this.dynamicID,
			name :"phoneAddress" + this.dynamicID, 
			maxLength : 256,
			width:200,
			msgTarget: "phoneAddressTarget"+ this.dynamicID,
			msgDisplay:"",
			//value:(this.phoneContact === undefined) ? "" : (this.phoneContact.value === undefined) ? "" : this.phoneContact.value,
			vtype:"phone",
			validationEvent:"blur",
			allowBlank:true//!isPhoneRequired
		};
		
		this.phoneExtensionJson =
		{
			hideLabel:true,
			labelSeparator:"",
			id:"phoneExtension" + this.dynamicID,
			name :"phoneExtension" + this.dynamicID, 
			maxLength : 10,
			maxLengthText: "The maximum length for phone extension is 10",
			width:50,
			msgTarget: "phoneAddressTarget"+ this.dynamicID,
			msgDisplay:"",
			//value:(this.phoneContact === undefined) ? "" : (this.phoneContact.value === undefined) ? "" : this.phoneContact.value,
			vtype:"phoneExt",
			validationEvent:"blur",
			allowBlank:true
		};
		
		this.phoneTypeJson = 
		{									
			hideLabel:true,
			width:225,
			labelSeparator:"",
			hiddenId:"phoneTypeCode" + this.dynamicID,
			hiddenName:"phoneTypeCode" + this.dynamicID,
			id:"phoneTypeText" + this.dynamicID,
			name:"phoneTypeText" + this.dynamicID,
			msgTarget: "phoneAddressTarget"+ this.dynamicID,
			msgDisplay:"",
			mode:"local",
			store: new Ext.data.JsonStore({
					fields: ['id', 'name'],
					root : "rows",
					idProperty: "id",
					data:{ "rows":this.phoneTypes}
			}),
			valueField:"id",
			emptyText: "- Select One -",
			//value:(this.phoneContact === undefined) ? "" : (this.phoneContact.type === undefined) ? "" : this.phoneContact.type,
			displayField:'name',
			triggerAction: 'all',
			editable:false,
			allowBlank:true,//!isPhoneRequired,
			forceSelection:false,
			selectOnFocus:true,
			listeners: {
				render : function(){this.el.dom.name = this.name;}
				,select : function(){
							if(this.getValue() == "Other"){																							
								phoneTypeOtherPanel.enable();
								phoneTypeOtherPanel.show();
								phoneTypeOtherPanel.cascade(function(item){
								  if (item.isFormField) {
								    item.enable();
								    item.show();
								  }
								});												
							}else{
								phoneTypeOtherPanel.enable();
										phoneTypeOtherPanel.disable();
										phoneTypeOtherPanel.hide();
										phoneTypeOtherPanel.cascade(function(item){
										  if (item.isFormField) {
										    item.disable();
										    item.hide();
										  }
										});												
							}
					}
			}
		};
		
		if(this.phoneContact != undefined && this.phoneContact.value != undefined){
			this.phoneIdJson['value']=this.phoneContact.id;
			this.phoneAddressJson['value']=this.phoneContact.value;
			this.phoneExtensionJson['value']=this.phoneContact.extention;
			this.phoneTypeJson['value']=this.phoneContact.type;
			this.phoneTypeJson['hiddenValue']=this.phoneContact.type;
		}
		
		this.phoneDeletedObject = new Ext.form.Hidden(this.phoneDeletedJson);
		this.phoneIdObject = new Ext.form.Hidden(this.phoneIdJson);
		this.phoneAddressObject = new Ext.form.TextField(this.phoneAddressJson);
		this.phoneExtensionObject = new Ext.form.TextField(this.phoneExtensionJson);
		this.phoneTypeObject = new Ext.form.ComboBox(this.phoneTypeJson);
						
		this.phoneTypeOther = 
			new Ext.form.TextField({																				
							hideLabel:true,
							width:120,
							labelSeparator:"",
							disabled:true,
							hidden:true,
							id:"phoneOther" + this.dynamicID,
							name:"phoneOther" + this.dynamicID,
							maxLength : 20,
							msgTarget: "phoneAddressTarget"+ this.dynamicID,
							msgDisplay:"",
							allowBlank:true//!isPhoneRequired
					});
					
		this.phoneTypeOtherPanel = 
			new Ext.Panel({
						layout:"form",
						width:133,
						style:"padding-right:5px;",
						hidden:true,
						disabled:true,
						border:false,
						bodyBorder:false,
						hideBorders:true,
						items:[this.phoneTypeOther]
					});
					
		var phoneTypeOther = this.phoneTypeOther;
		var phoneTypeOtherPanel = this.phoneTypeOtherPanel;

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

		this.interiorFieldButtonPanel =
			new Ext.Panel({
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
								items:[this.phoneDeletedObject,this.phoneIdObject,this.phoneAddressObject]
							},{
								layout:"form",
								width:10,
								style:"padding-top:5px;",
								cls:"portal-plain-panel",										
								border:false,
								bodyBorder:false,
								hideBorders:true,
								html:"X"								
							},{
								layout:"form",
								width:55,
								style:"padding-right:5px;",
								cls:"portal-plain-panel",										
								border:false,
								bodyBorder:false,
								hideBorders:true,
								items:[this.phoneExtensionObject]
							},{
								layout:"form",
								width:230,
								style:"padding-right:5px;",
								cls:"portal-plain-panel",										
								border:false,
								bodyBorder:false,
								hideBorders:true,
								items:[this.phoneTypeObject]
							},this.phoneTypeOtherPanel,this.EraseButtonPanel,{
								id:"phoneAddressTarget"+ this.dynamicID,
								layout:"form",
								cls:"invalid-target-field-panel",
								style:"padding-top:5px;",
								border:false,
								bodyBorder:false,
								hideBorders:true								
							}]																												
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
		IDXM.phoneAddressFieldsPanelNoTitle.superclass.initComponent.call(this);
	}
});

// Register component as xtype
Ext.reg('phoneAddressFieldsPanelNoTitle', IDXM.phoneAddressFieldsPanelNoTitle);

// Begin: Extend component
Ext.namespace("IDXM.phoneMultiplePanel");
IDXM.phoneMultiplePanel = Ext.extend(Ext.Panel, {
			
	// initComponent
	initComponent : function() {
	
		var panelID = this.id;
		var isPhoneRequired = (this.isPhoneRequired != undefined)? this.isPhoneRequired : true;
	
		//This is initial array for all items
		var itemsArray = [{
					xtype: "label",
					text: (isPhoneRequired) ? "* Phone(s):" : "Phone(s):",
					cls: (isPhoneRequired) ? "supportPortalFormLabelBold" : "supportPortalFormLabel"
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
					this.fieldArray[i] = new IDXM.phoneAddressFieldsPanelNoTitle({id:panelID+"dynamicID"+i, dynamicID:i,phoneContact:this.fieldArray[i],phoneTypes:this.phoneTypes,"isPhoneRequired":isPhoneRequired});
				//Add set of fields for first set
				}else{
					this.fieldArray[i] = new IDXM.phoneAddressFieldsPanelNoTitle({id:panelID+"dynamicID"+i, dynamicID:i,allowDelete:false,phoneContact:this.fieldArray[i],phoneTypes:this.phoneTypes,"isPhoneRequired":isPhoneRequired});
				}
				//Add Defautl Fields to items Arrray
				itemsArray[itemsArray.length] = this.fieldArray[i];
			}
			
			if(arrayCount < this.maxTypeRows){
				this.fieldArray[this.fieldArray.length] = new IDXM.phoneAddressFieldsPanelNoTitle({id:panelID+"dynamicID"+this.fieldArray.length, dynamicID:this.fieldArray.length,phoneTypes:this.phoneTypes,"isPhoneRequired":isPhoneRequired});
				itemsArray[itemsArray.length] = this.fieldArray[this.fieldArray.length-1];
			}
			
		//if array has no items
		}else{
			//Create Default Fields
			this.fieldArray[0] = new IDXM.phoneAddressFieldsPanelNoTitle({id:panelID+"dynamicID0", dynamicID:0,allowDelete:false,phoneTypes:this.phoneTypes,"isPhoneRequired":isPhoneRequired});
			this.fieldArray[1] = new IDXM.phoneAddressFieldsPanelNoTitle({id:panelID+"dynamicID1", dynamicID:1,phoneTypes:this.phoneTypes,"isPhoneRequired":isPhoneRequired});
			
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
		IDXM.phoneMultiplePanel.superclass.initComponent.call(this);
	}

});

// Register component as xtype
Ext.reg('phoneMultiplePanel', IDXM.phoneMultiplePanel);


// Begin: Extend component
Ext.namespace("IDXM.phonesPanel");
IDXM.phonesPanel = Ext.extend(Ext.Panel, {

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
				var newFieldPanel = new IDXM.phoneAddressFieldsPanelNoTitle({id:"phoneMultiplePanel"+panelID+"dynamicID"+fieldsPhoneArray.length, dynamicID:fieldsPhoneArray.length,phoneTypes:phoneTypes,"isPhoneRequired":isPhoneRequired});
				fieldsPhoneArray[fieldsPhoneArray.length] = newFieldPanel;						

				//Add New fields to Phone Object
				phonesObject.add(newFieldPanel);

				//Add Listeners to Phone Object
				addListenersFieldsInPanel(phonesObject);						

				//Do Layout for Phone Object
				phonesObject.doLayout();		
			}

			return isValid;
		}
		
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
		}//END: //Enable Button to Mark First Row as Deleted	

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
			
		}//End of Function
		
		//If Load Array
		if(this.loadArray && this.loadArray.length){	
			fieldsPhoneArray = this.loadArray;
			phoneMultiplePanel = new IDXM.phoneMultiplePanel({id:"phoneMultiplePanel"+panelID, fieldArray:this.loadArray,phoneTypes:this.phoneTypes,maxTypeRows:maxTypeRows,"isPhoneRequired":(this.isPhoneRequired != undefined)?this.isPhoneRequired:true});
		}else{
			fieldsPhoneArray = new Array();
			phoneMultiplePanel = new IDXM.phoneMultiplePanel({id:"phoneMultiplePanel"+panelID, fieldArray:fieldsPhoneArray,phoneTypes:this.phoneTypes,"isPhoneRequired":(this.isPhoneRequired != undefined)?this.isPhoneRequired:true});
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
		IDXM.phonesPanel.superclass.initComponent.call(this);
	}

	});


// Register component as xtype
Ext.reg('phonesPanel', IDXM.phonesPanel);
