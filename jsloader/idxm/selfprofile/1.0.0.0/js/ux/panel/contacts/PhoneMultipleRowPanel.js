
// Begin: Extend component
Ext.namespace("idxm.selfprofile.ux.panel.contacts.PhoneMultipleRowContactPanel");
idxm.selfprofile.ux.panel.contacts.PhoneMultipleRowContactPanel = Ext.extend(Ext.Panel, {
			
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
					this.fieldArray[i] = new idxm.selfprofile.ux.panel.contacts.PhoneRowContactPanel({id:panelID+"dynamicID"+i, dynamicID:i,phoneContact:this.fieldArray[i],phoneTypes:this.phoneTypes,"isPhoneRequired":isPhoneRequired});
				//Add set of fields for first set
				}else{
					this.fieldArray[i] = new idxm.selfprofile.ux.panel.contacts.PhoneRowContactPanel({id:panelID+"dynamicID"+i, dynamicID:i,allowDelete:false,phoneContact:this.fieldArray[i],phoneTypes:this.phoneTypes,"isPhoneRequired":isPhoneRequired});
				}
				//Add Defautl Fields to items Arrray
				itemsArray[itemsArray.length] = this.fieldArray[i];
			}
			
			if(arrayCount < this.maxTypeRows){
				this.fieldArray[this.fieldArray.length] = new idxm.selfprofile.ux.panel.contacts.PhoneRowContactPanel({id:panelID+"dynamicID"+this.fieldArray.length, dynamicID:this.fieldArray.length,phoneTypes:this.phoneTypes,"isPhoneRequired":isPhoneRequired});
				itemsArray[itemsArray.length] = this.fieldArray[this.fieldArray.length-1];
			}
			
		//if array has no items
		}else{
			//Create Default Fields
			this.fieldArray[0] = new idxm.selfprofile.ux.panel.contacts.PhoneRowContactPanel({id:panelID+"dynamicID0", dynamicID:0,allowDelete:false,phoneTypes:this.phoneTypes,"isPhoneRequired":isPhoneRequired});
			this.fieldArray[1] = new idxm.selfprofile.ux.panel.contacts.PhoneRowContactPanel({id:panelID+"dynamicID1", dynamicID:1,phoneTypes:this.phoneTypes,"isPhoneRequired":isPhoneRequired});
			
			//Add Default Fields to itemsArray
			itemsArray[itemsArray.length] = this.fieldArray[0];
			itemsArray[itemsArray.length] = this.fieldArray[1];			
		}
	
		// Apply to this component
		Ext.apply(this, {	layout:"form",
					style:"padding-left:25px;",
					items:itemsArray
				});

		// Apply to this component configuration
		Ext.apply(this.initialConfig, {
						id:this.id,
						items: this.items
				});

		// call parent initComponent
		idxm.selfprofile.ux.panel.contacts.PhoneMultipleRowContactPanel.superclass.initComponent.call(this);
	}

});

// Register component as xtype
Ext.reg('idxm.selfprofile.ux.panel.contacts.PhoneMultipleRowContactPanel', idxm.selfprofile.ux.panel.contacts.PhoneMultipleRowContactPanel);
