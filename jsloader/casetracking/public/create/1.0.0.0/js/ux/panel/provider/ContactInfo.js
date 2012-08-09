Ext.QuickTips.init();

Ext.namespace("casetracking.createpublic.ux.panel.provider.ContactInfo");
casetracking.createpublic.ux.panel.provider.ContactInfo = Ext.extend(Ext.Panel, {
	
	// initComponent
	initComponent : function(config) {	
		
		var loginLink = "<a href=\"" + loginUrl + "\" style=\"font: 14px tahoma,arial,verdana,sans-serif;color:green;\" ";
		loginLink+= " onclick=\"Ext.get(document.body.id).mask(\'<b> Loading...</b> \', \'x-mask-loading\');\">Already have an account? Log-in here.</a>";		
		
		// Apply to this component
		Ext.apply(this, {
			layout : "form",		
			bodyBorder : false,
			border : false,
			ctCls : "portal-plain-panel",
			hideBorders : true,
			width:505,
			labelAlign: "top",
			items: [{
					xtype: "panel",
					style : "padding-top: 2px;padding-bottom: 2px;",
					style: "padding-bottom:10;",
					width: 505,									  
					html: 	"<div class='portal-login-outter' >"
							+ "<p class='portal-text-medium'>"+loginLink+"</p><p class='portal-text-small'>Otherwise, once you submit your customer service case below, you'll be given the option to create an account so that you can easily track your cases.</p>"
							+ "</div>"					
				},{
					xtype:"textfield"
					,fieldLabel:"Contact First Name"
					,allowBlank:false
					,id:"contactFirstName"
					,name:"contactFirstName"
					,width:200
					,maxLength:30
					//,style: "padding-top: 5px;"
				 },{
					xtype:"textfield"
					,fieldLabel:"Contact Last Name"
					,allowBlank:false
					,id:"contactLastName"
					,name:"contactLastName"
					,width:200
					,maxLength:30
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
									,id:"contactPhone"
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
									,id:"contactPhoneExt"
									,name:"contactPhoneExt"
									,width:45    
									,vtype:"phoneExt"
									,msgTarget:"under"	 	 	    	   	   			      						
								}]
						}]        	        	        	   
			},{
				xtype:"textfield"
				,fieldLabel:"Contact Fax"	
				,allowBlank:false
				,id:"contactFax"
				,name:"contactFax"
				,width:140        	
				,vtype:"phone"
			},{
				xtype:"textfield"
				,fieldLabel:"Contact Email"
				,allowBlank:false
				,id:"contactEmail"
				,name:"contactEmail"
				,width:200
				,vtype:"email"			
			}]
		});		
		// call parent initComponent
		casetracking.createpublic.ux.panel.provider.ContactInfo.superclass.initComponent.call(this);
	}	
});
//Register component as xtype
Ext.reg('casetracking.createpublic.ux.panel.provider.ContactInfo',casetracking.createpublic.ux.panel.provider.ContactInfo);