Ext.namespace("casetracking.update.ux.panel.contact.ContactInfo");
casetracking.update.ux.panel.contact.ContactInfo = function (config){	
	
	function contactInfoTemplate (){
		
		//This is the actual Template
		var t = new Ext.XTemplate(
				'<table width="100%">'
				,'<tr>'
				,'<td align="left">'
				,'<span class="portal-text-small-bold">First Name: </span>'
				,'</td>'
				,'<td align="left">'
				,'<span class="portal-text-small">{contactFirstName}</span>'
				,'</td>'				
				,'</tr>'
				,'<tr>'
				,'<td align="left">'
				,'<span class="portal-text-small-bold">Last Name: </span>'
				,'</td>'
				,'<td align="left">'
				,'<span class="portal-text-small">{contactLastName}</span>'
				,'</td>'				
				,'</tr>'				
				,'<tr>'
				,'<td align="left">'
				,'<span class="portal-text-small-bold">Email: </span>'
				,'</td>'
				,'<td align="left">'
				,'<span class="portal-text-small">{contactEmail}</span>'
				,'</td>'				
				,'</tr>'	
				,'<td align="left">'
				,'<span class="portal-text-small-bold">Phone: </span>'
				,'</td>'
				,'<td align="left">'
				,'<span class="portal-text-small">{contactPhone}</span>'
				,'</td>'				
				,'</tr>'					
				,'<tr>'
				,'<td align="left">'
				,'<span class="portal-text-small-bold">Fax: </span>'
				,'</td>'
				,'<td align="left">'
				,'<span class="portal-text-small">{contactFax}</span>'
				,'</td>'				
				,'</tr>'
				,'<tr>'
				,'<td align="left">'
				,'<span class="portal-text-small-bold">Type: </span>'
				,'</td>'
				,'<td align="left">'
				,'<span class="portal-text-small">{contactType}</span>'
				,'</td>'				
				,'</tr>'
				,'<tpl if="displayCCode == true">'
				,'<tr>'
				,'<td align="left">'
				,'<span class="portal-text-small-bold">CCode: </span>'
				,'</td>'
				,'<td align="left">'
				,'<span class="portal-text-small">{ccode}</span>'
				,'</td>'				
				,'</tr>'				
				,'</tpl>'
				,'</table>'
				);				
		
		var contactFirstName = 'N/A';
		if((!Ext.isEmpty(config.caseContact.firstName)) && config.caseContact.firstName.trim().length > 0){
			contactFirstName = config.caseContact.firstName;
		}
		var contactLastName = 'N/A';
		if((!Ext.isEmpty(config.caseContact.lastName)) && config.caseContact.lastName.trim().length > 0){
			contactLastName = config.caseContact.lastName;
		}		
		var contactEmail = 'N/A';
		if((!Ext.isEmpty(config.caseContact.email)) && config.caseContact.email.trim().length > 0){
			contactEmail = config.caseContact.email;
		}		
		var contactPhone = 'N/A';
		if(!Ext.isEmpty(config.caseContact.phone)){
			contactPhone = config.caseContact.phone;
			try{
				if(!Ext.isEmpty(config.caseContact.phoneExt) && !Ext.isEmpty(config.caseContact.phoneExt.trim())){
					contactPhone += " x " + config.caseContact.phoneExt;
				}
			}catch(e){}
		}		
		var contactFax = 'N/A';
		if(!Ext.isEmpty(config.caseContact.fax)){
			contactFax = config.caseContact.fax;
		}	
		var contactType = '';
		if(!Ext.isEmpty(config.caseContact.callerType)){
			if(config.caseContact.callerType == "CLI"){
				contactType = "Client";
			}
			if(config.caseContact.callerType == "PRV"){
				contactType = "Provider";
			}
		}	
		
		var displayCCode = false;
		var ccode = '';
		if(!Ext.isEmpty(config.accessClient.ccode)){
			displayCCode=true;
			ccode = config.accessClient.ccode;
			ccode = ccode.toUpperCase();
		}		
		
		//Pass data to template
		var templateString = t.apply(	 
				{	
					contactFirstName: contactFirstName
					,contactLastName: contactLastName
					,contactEmail: contactEmail
					,contactPhone: contactPhone
					,contactFax: contactFax
					,contactType: contactType
					,displayCCode:displayCCode
					,ccode:ccode
				}
		);	

		return templateString;
		
	} // end template function
	
	var contactInfoPanel = 
		new Ext.Panel({
			bodyBorder: false						    
			,border: false
			,hideBorders: true		
			,items: [{
					autoHeight:true
					,items:[{
					       	  xtype : "panel",
					       	  border : false,
					       	  cls : "casetracking-title",
					       	  style:"padding-top:10px;",
					       	  bodyCssClass:"casetracking-title-body",
					       	  html : "Contact Information"
					       },{
					    	   xtype: "panel",
					    	   border: false,					
					    	   cls:"portal-titles",
					    	   style:"padding-top:5px;",
					    	   html: contactInfoTemplate()
					    	   ,autoHeight:true
					    	   ,autoScroll:true
					       }]
				}]
		});
	
	return contactInfoPanel;
};

