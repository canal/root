
// Begin: Extend component
Ext.namespace("idxm.selfprofile.ux.panel.contacts.PhoneRowContactPanel");
idxm.selfprofile.ux.panel.contacts.PhoneRowContactPanel = Ext.extend(Ext.Panel, {
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
		idxm.selfprofile.ux.panel.contacts.PhoneRowContactPanel.superclass.initComponent.call(this);
	}
});

// Register component as xtype
Ext.reg('idxm.selfprofile.ux.panel.contacts.PhoneRowContactPanel', idxm.selfprofile.ux.panel.contacts.PhoneRowContactPanel);
