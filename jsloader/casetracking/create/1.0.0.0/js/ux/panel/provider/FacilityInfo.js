Ext.namespace("casetracking.create.ux.panel.provider.FacilityInfo");
casetracking.create.ux.panel.provider.FacilityInfo = Ext.extend(Ext.Panel, {

	// initComponent
	initComponent : function(config) {

        this.prefix = (this.prefix)?this.prefix:"";
        this.hideComponent = this.hideTitlePanel ? true : false;
		var allowBlank = false;
		if(userClassCode && userClassCode == 'INT') {
			allowBlank = true;
		}        
				
		// Apply to this component
		Ext.apply(this, {
			layout : "form",		
			bodyBorder : false,
			border : false,
			ctCls : "portal-plain-panel",
			style:"padding-top:10px;",
			hideBorders : true,
			items : [{
        	        	  xtype: "panel",
        	        	  layout : "form",	
        	        	  border: false,
        	        	  labelAlign:"top",
        	        	  items : [{
						xtype:"textfield"
						,fieldLabel:"TIN"	
						,allowBlank:allowBlank
						,name:"facTin"
						,width:200
						,vtype:"tin"
						,width:200
					      },{
						xtype:"textfield"
						,fieldLabel:"Facility Name"
						,allowBlank:false				
						,name:"facGroupName"
						,maxLength:50
						,width:200
					      },{
						xtype:"textfield"
						,hidden: this.hideComponent
						,hideLabel: this.hideComponent
						,fieldLabel:"Contact Name"	
						,allowBlank:true
						,name:"facContactName"
						,width:200
						,maxLength:30
					       },{
 	    	        	        	   xtype:"panel",
 	    	        	        	   hidden: this.hideComponent,
 	    	        	        	   layout: "column",
 	    	        	        	   border: false,
 	    	        	        	   items: [{
								xtype: "panel",
								layout : "form",
								border: false,
								labelAlign:"top",
								width:120,
								items:[{
										xtype:"textfield"
										,fieldLabel:"Contact Phone"	
										,allowBlank:true
										,name:"facContactPhone"
										,width:120        
										,vtype:"phone"
										,msgTarget:"under"	 	    	   	   			      						
									}]
								},{
										width:20,
										style:"padding-top:25px;",
										cls:"portal-plain-panel",										
										border:false,
										bodyBorder:false,
										hideBorders:true,
										html:"&nbsp;&nbsp;X&nbsp;&nbsp;&nbsp;"
								},{
									xtype: "panel",
									layout : "form",
									border: false,
									labelAlign:"top",
									width:100,
									items:[{
											xtype:"textfield"
											,fieldLabel:"&nbsp;"
											,labelSeparator:"&nbsp;"
											,allowBlank:true
											,name:"facContactPhoneExt"
											,width:45    
											,vtype:"phoneExt"
											,msgTarget:"under"	 	 	    	   	   			      						
										}]
								}]        	        	        	   
							},{
								xtype:"textfield"
									,fieldLabel:"NPI"	
									,allowBlank:true
									,name:"facNpi"
									,width:200 
									,vtype:"npi"	
									,minLength:10
									,maxLength:10
	                                ,autoCreate : {
	                                	tag : "input",
	                                    size : "10",
	                                    minLength: "10",
	                                    maxLength : "10"
	                                } 
 	          	        	 }]
        	          }]
		});

		// call parent initComponent
		casetracking.create.ux.panel.provider.FacilityInfo.superclass.initComponent.call(this);
	}
});
// Register component as xtype
Ext.reg('casetracking.create.ux.panel.provider.FacilityInfo',casetracking.create.ux.panel.provider.FacilityInfo);
