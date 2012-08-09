Ext.namespace("casetracking.update.ux.panel.provider.ProviderInfo");
casetracking.update.ux.panel.provider.ProviderInfo = function (config){	
	
	function providerInfoTemplate (){
		
		//This is the actual Template
		var t = new Ext.XTemplate(
				'<table width="100%">'
				,'<tr>'
				,'<td align="left">'
				,'<span class="portal-text-small-bold">Provider Type: </span>'
				,'</td>'
				,'<td align="left">'
				,'<span class="portal-text-small">{providerType}</span>'
				,'</td>'				
				,'</tr>'
				,'<tr>'
				,'<td align="left">'
				,'<span class="portal-text-small-bold">TIN: </span>'
				,'</td>'
				,'<td align="left">'
				,'<span class="portal-text-small">{tinSsn}</span>'
				,'</td>'				
				,'</tr>'	
				,'<td align="left">'
				,'<span class="portal-text-small-bold">NPI: </span>'
				,'</td>'
				,'<td align="left">'
				,'<span class="portal-text-small">{npi}</span>'
				,'</td>'				
				,'</tr>'					
				,'<tr>'
				,'<td align="left">'
				,'<span class="portal-text-small-bold">Name: </span>'
				,'</td>'
				,'<td align="left">'
				,'<span class="portal-text-small">{name}</span>'
				,'</td>'				
				,'</tr>'
				,'<tr>'
				,'<tpl if="!isProviderUser">'
				,'<td align="left">'
				,'<span class="portal-text-small-bold">Contact Name: </span>'
				,'</td>'
				,'<td align="left">'
				,'<span class="portal-text-small">{contactName}</span>'
				,'</td>'				
				,'</tr>'
				,'<tr>'
				,'<td align="left">'
				,'<span class="portal-text-small-bold">Contact Phone: </span>'
				,'</td>'
				,'<td align="left">'
				,'<span class="portal-text-small">{contactPhone}</span>'
				,'</td>'				
				,'</tr>'	
				,'</tpl>'
				,'<tpl if="isProviderUser">'
				,'<tr>'
				,'<td align="left">'				
				,'<span class="portal-text-small-bold">Address: </span>'
				,'</td>'				
				,'<td align="left">'
				,'<span class="portal-text-small">{address}</span>'
				,'</td>'				
				,'</tr>'
				,'<tr>'
				,'<td align="left">'				
				,'<span class="portal-text-small-bold">City: </span>'
				,'</td>'					
				,'<td align="left">'
				,'<span class="portal-text-small">{city}</span>'
				,'</td>'				
				,'</tr>'
				,'<tr>'
				,'<td align="left">'				
				,'<span class="portal-text-small-bold">State: </span>'
				,'</td>'					
				,'<td align="left">'
				,'<span class="portal-text-small">{state}</span>'
				,'</td>'				
				,'</tr>'
				,'<tr>'
				,'<td align="left">'				
				,'<span class="portal-text-small-bold">Zip Code: </span>'
				,'</td>'					
				,'<td align="left">'
				,'<span class="portal-text-small">{zipcode}</span>'
				,'</td>'				
				,'</tr>'				
				,'</tpl>'				
				,'</table>'
				);
		
		var name = '';
		if(config.provider.organizationName && config.provider.organizationName.length > 0) {
			name+= config.provider.organizationName;
		} else if(config.provider.lastName && config.provider.lastName.length > 0
				&& config.provider.firstName && config.provider.firstName.length){
			name+= config.provider.lastName + ', ' + config.provider.firstName;
		} else if(config.provider.lastName && config.provider.lastName.length > 0){
			name+= config.provider.lastName;
		} else if(config.provider.firstName && config.provider.firstName.length){
			name+= config.provider.firstName;
		}
		if(name){
			try{
				name = Ext.util.Format.htmlEncode(name);
			}catch(e){}
		}
		
		var contactPhone = '';
		if(config.provider.contactPhone && config.provider.contactPhone.length > 0) {
			contactPhone+= config.provider.contactPhone;
		}

		if(contactPhone.length == 0) {
			contactPhone = 'N/A';
		}		
		var providerType= '';
		for(i = 0; i < config.caseProviderTypeList.length; i++) {
			var provType = config.caseProviderTypeList[i];
			if(provType.id == config.provider.providerType) {
				providerType = provType.name;
			}
			if(providerType == "Facility/Ancillary/Group"){
				providerType = "Facility/Ancillary";
			}			
		}
		if(Ext.isEmpty(providerType)){
			providerType='N/A';
		}
		var npi = '';
		if(config.provider.npi && config.provider.npi.length > 0) {
			npi+= config.provider.npi;
		} else {
			npi = 'N/A';
		}	
		var contactName = '';
		if(config.provider.contactName && config.provider.contactName.length > 0) {
			contactName = config.provider.contactName;
		} else {
			contactName = 'N/A';
		}
		var address='',city='',state='',zipcode='',isProviderUser=false;
		if(!Ext.isEmpty(userClassCode) && userClassCode[0] == 'PRV'){
			isProviderUser = true;
			if(!Ext.isEmpty(config.provider.address.addressLine1)) {
				address = config.provider.address.addressLine1;
			} else {
				address = 'N/A'
			}
			if(!Ext.isEmpty(config.provider.address.city)) {
				city = config.provider.address.city;
			} else {
				city = 'N/A'
			}
			if(!Ext.isEmpty(config.provider.address.state)) {
				state = config.provider.address.state.stateAbbreviation;
			} else {
				state = 'N/A'
			}
			if(!Ext.isEmpty(config.provider.address.zipcode)) {
				zipcode = config.provider.address.zipcode;
			} else {
				zipcode = 'N/A'
			}			
		}
		//Pass data to template
		var templateString = t.apply(	 
				{	
					providerType: providerType
					,tinSsn: config.provider.tinSsn
					,contactName: contactName
					,name: name
					,contactPhone: contactPhone
					,npi: npi
					,isProviderUser: isProviderUser
					,address:address
					,city:city
					,state:state
					,zipcode:zipcode
				}
		);	

		return templateString;
		
	} // end template function
	
	var ProviderInfoPanel = 
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
					       	  html : "Provider Information"
					       },{
					    	   xtype: "panel",
					    	   border: false,					
					    	   cls:"portal-titles",
					    	   style:"padding-top:5px;",
					    	   html: providerInfoTemplate()
					    	   ,autoHeight:true
					    	   ,autoScroll:true
					       }]
				}]
		});
	
	return ProviderInfoPanel;
};

