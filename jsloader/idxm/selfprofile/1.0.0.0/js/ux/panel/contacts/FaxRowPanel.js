
// Begin: Extend component
Ext.namespace("idxm.selfprofile.ux.panel.contacts.FaxRowContactPanel");
idxm.selfprofile.ux.panel.contacts.FaxRowContactPanel = Ext.extend(Ext.Panel, {
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
							maxLength : 30,
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
		idxm.selfprofile.ux.panel.contacts.FaxRowContactPanel.superclass.initComponent.call(this);
	}
});

// Register component as xtype
Ext.reg('idxm.selfprofile.ux.panel.contacts.FaxRowContactPanel', idxm.selfprofile.ux.panel.contacts.FaxRowContactPanel);
