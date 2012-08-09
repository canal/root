
// Begin: Extend component
Ext.namespace("idxm.selfprofile.ux.panel.contacts.EmailRowPanel");
idxm.selfprofile.ux.panel.contacts.EmailRowPanel = Ext.extend(Ext.Panel, {
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
		idxm.selfprofile.ux.panel.contacts.EmailRowPanel.superclass.initComponent.call(this);
	}
});

// Register component as xtype
Ext.reg('idxm.selfprofile.ux.panel.contacts.EmailRowPanel', idxm.selfprofile.ux.panel.contacts.EmailRowPanel);
