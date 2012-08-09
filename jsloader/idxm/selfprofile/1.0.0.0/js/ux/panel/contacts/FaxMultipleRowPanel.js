
// Begin: Extend component
Ext.namespace("idxm.selfprofile.ux.panel.contacts.FaxMultipleRowContactPanel");
idxm.selfprofile.ux.panel.contacts.FaxMultipleRowContactPanel = Ext.extend(Ext.Panel, {
			
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
					this.fieldArray[i] = new idxm.selfprofile.ux.panel.contacts.FaxRowContactPanel({id:panelID+"dynamicID"+i, dynamicID:i,faxContact:this.fieldArray[i],faxTypes:this.faxTypes,blnDisplayAdvicesheet:blnDisplayAdvicesheet});
				//Add set of fields for first set
				}else{
					this.fieldArray[i] = new idxm.selfprofile.ux.panel.contacts.FaxRowContactPanel({id:panelID+"dynamicID"+i, dynamicID:i,allowDelete:false,faxContact:this.fieldArray[i],faxTypes:this.faxTypes,blnDisplayAdvicesheet:blnDisplayAdvicesheet});
				}
				//Add Defautl Fields to items Arrray
				itemsArray[itemsArray.length] = this.fieldArray[i];
			}
			
			if(arrayCount < this.maxTypeRows){
				this.fieldArray[this.fieldArray.length] = new idxm.selfprofile.ux.panel.contacts.FaxRowContactPanel({id:panelID+"dynamicID"+this.fieldArray.length, dynamicID:this.fieldArray.length,faxTypes:this.faxTypes,blnDisplayAdvicesheet:blnDisplayAdvicesheet});
				itemsArray[itemsArray.length] = this.fieldArray[this.fieldArray.length-1];
			}
			
		//if array has no items
		}else{
			//Create Default Fields
			this.fieldArray[0] = new idxm.selfprofile.ux.panel.contacts.FaxRowContactPanel({id:panelID+"dynamicID0", dynamicID:0,allowDelete:false,faxTypes:this.faxTypes,blnDisplayAdvicesheet:blnDisplayAdvicesheet});
			this.fieldArray[1] = new idxm.selfprofile.ux.panel.contacts.FaxRowContactPanel({id:panelID+"dynamicID1", dynamicID:1,faxTypes:this.faxTypes,blnDisplayAdvicesheet:blnDisplayAdvicesheet});
			
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
		idxm.selfprofile.ux.panel.contacts.FaxMultipleRowContactPanel.superclass.initComponent.call(this);
	}

});

// Register component as xtype
Ext.reg('idxm.selfprofile.ux.panel.contacts.FaxMultipleRowContactPanel', idxm.selfprofile.ux.panel.contacts.FaxMultipleRowContactPanel);
