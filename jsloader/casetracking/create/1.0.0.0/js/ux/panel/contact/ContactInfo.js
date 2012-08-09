Ext.namespace("casetracking.create.ux.panel.contact.ContactInfo");
casetracking.create.ux.panel.contact.ContactInfo = Ext.extend(Ext.Panel, {

	// initComponent
	initComponent : function(config) {
	
	
	
	// Apply to this component
		Ext.apply(this, {
			layout : "form",		
			bodyBorder : false,
			border : false,
			ctCls : "portal-plain-panel",
			hideBorders : true,
			width:425,
			labelAlign: "top",
			items : [{
					xtype:"textfield"
					,fieldLabel:"Contact First Name"
					,allowBlank:false
					,name:"contactFirstName"
					,width:200
					,maxLength:30
				 },{
					xtype:"textfield"
					,fieldLabel:"Contact Last Name"
					,allowBlank:false
					,name:"contactLastName"
					,width:200
					,maxLength:30
				 },{
					xtype:"textfield"
					,fieldLabel:"Contact Email"
					,allowBlank:false
					,name:"contactEmail"
					,width:200
					,vtype:"email"			
				},{
						xtype: "panel",
						layout : "column",
						border: false,
						labelAlign:"top",
						items: [{
								xtype: "panel",
								layout : "form",
								border: false,
								labelAlign:"top",
								width:140,
								items:[{
										xtype:"textfield"
										,fieldLabel:"Contact Phone"	
										,allowBlank:false
										,name:"contactPhone"
										,width:140        
										,vtype:"phone"
										,msgTarget:"under"	 	    	   	   			      						
									}]
							},{
								width:15,
								style:"padding-top:25px; text-align:center;",
								cls:"portal-plain-panel",										
								border:false,		    								
								html:"X"
							},{
								xtype: "panel",
								layout : "form",
								border: false,
								labelAlign:"top",
								width : 100,
								items:[{
										xtype:"textfield"
										,fieldLabel:"&nbsp;"
										,labelSeparator:"&nbsp;"
										,allowBlank:true
										,name:"contactPhoneExt"
										,width:45    
										,vtype:"phoneExt"
										,msgTarget:"under"	 	 	    	   	   			      						
									}]
							}]        	        	        	   
				},{
					xtype:"textfield"
					,fieldLabel:"Contact Fax"	
					,allowBlank:true
					,name:"contactFax"
					,width:140        
					,vtype:"phone"
					,msgTarget:"under"	 	    	   	   			      						
				}]
		});		
		// call parent initComponent
		casetracking.create.ux.panel.contact.ContactInfo.superclass.initComponent.call(this);
	}
});		

//Register component as xtype
Ext.reg('casetracking.create.ux.panel.contact.ContactInfo',casetracking.create.ux.panel.contact.ContactInfo);