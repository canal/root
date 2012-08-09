Ext.namespace("casetracking.update.ux.panel.claims.ClaimsInfoMessage");
casetracking.update.ux.panel.claims.ClaimsInfoMessage = function(config) {

	var claimsInfoMessagePanel = new Ext.Panel(
			{
				bodyBorder : false,
				border : false,
				hideBorders : true,
				items : [ {
					autoHeight : true,
					items : [
							{
								xtype : "panel",
								border : false,
								cls : "casetracking-title",
								style : "padding-top:10px;",
								bodyCssClass : "casetracking-title-body",
								html : "Claims"
							},
							{
								xtype : "panel",
								layout : "column",
								border : false,
								bodyBorder : false,
								items : [ {
									xtype : "panel",
									border : false,
									bodyBorder : false,
									height : 50,
									style : "padding-top:5px;",
									html : "<table><tr><td align='center'><span class='portal-text-small-bold'>No Claims Available</span></td></tr></table>"
								} ]
							} ]
				} ]
			});

	return claimsInfoMessagePanel;
}

Ext.namespace("casetracking.update.ux.panel.claims.ClaimInfo");
casetracking.update.ux.panel.claims.ClaimInfo = function(config) {
	var claimsInfoPanel = null;
	if(!Ext.isEmpty(userClassCode) && userClassCode[0] == 'PRV'){
		function claimInfoTemplate(){
			
			//This is the actual Template
			var t = new Ext.XTemplate(
					'<table width="100%">'
					,'<tr>'
					,'<td align="left">'
					,'<span class="portal-text-small-bold">DOS/Admit: </span>'
					,'</td>'
					,'<td align="left">'
					,'<span class="portal-text-small">{dosAdmit}</span>'
					,'</td>'				
					,'</tr>'	
					,'<td align="left">'
					,'<span class="portal-text-small-bold">Patient Name: </span>'
					,'</td>'
					,'<td align="left">'
					,'<span class="portal-text-small">{patientName}</span>'
					,'</td>'				
					,'</tr>'					
					,'<tr>'
					,'<td align="left">'
					,'<span class="portal-text-small-bold">Total Charges: </span>'
					,'</td>'
					,'<td align="left">'
					,'<span class="portal-text-small">{totalCharges}</span>'
					,'</td>'				
					,'</tr>'							
					,'</table>'
					);
			
			var dosAdmit='',patientName='',totalCharges='';
			if(!Ext.isEmpty(config.aCase.claimList) && config.aCase.claimList.length > 0) {
				var claim = config.aCase.claimList[0];
				var dos = new Date(claim.dateOfServiceFrom.time.time);
				dosAdmit = dos.getMonth()+1 + "/" + dos.getDate() + "/" + dos.getFullYear();
				if(claim.patientLastName && claim.patientLastName.length > 0
						&& claim.patientFirstName && claim.patientFirstName.length > 0){
					patientName = claim.patientLastName + ', ' + claim.patientFirstName;
				} else if(claim.patientLastName && claim.patientLastName.length > 0){
					patientName = claim.patientLastName;
				} else if(claim.patientFirstName && claim.patientFirstName.length > 0){
					patientName = claim.patientFirstName;
				}
				if(patientName){
					try{
						patientName = Ext.util.Format.htmlEncode(patientName);
					}catch(e){}
				}
				totalCharges = claim.totalCharge;
			} else {
				dosAdmit ='N/A';patientName='N/A';totalCharges='N/A';
			}			
			
			
			//Pass data to template
			var templateString = t.apply(	 
					{	
						dosAdmit: dosAdmit
						,patientName: patientName
						,totalCharges: totalCharges
					}
			);	

			return templateString;
			
		} // end template function
		
		claimsInfoPanel = 
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
						       	  html : "Claim Information"
						       },{
						    	   xtype: "panel",
						    	   border: false,					
						    	   cls:"portal-titles",
						    	   style:"padding-top:5px;",
						    	   html: claimInfoTemplate()
						    	   ,autoHeight:true
						    	   ,autoScroll:true
						       }]
					}]
			});
	} else {
		var ClaimGridId = (config.ClaimGridId && config.ClaimGridId !== undefined) ? config.ClaimGridId
				: "casetracking.update.ux.panel.claims.ClaimsGridId"
						+ config.nameSpace;

		claimsInfoPanel = new Ext.Panel(
				{
					bodyBorder : false,
					border : false,
					hideBorders : true,
					items : [ {
						autoHeight : true,
						items : [
								{
									xtype : "panel",
									border : false,
									bodyCssClass : "casetracking-title-body",
									style : "padding-top:10px;",
									cls : "casetracking-title",
									layout: "column",
									items : [
											{
												xtype : "panel",
												border : false,
												bodyBorder : false,
												columnWidth : .5,
												cls : "casetracking-title",
												bodyCssClass : "casetracking-title-body",
												html : "Claims"
											},
											{
												xtype : "panel",
												border : false,
												bodyBorder : false,
												columnWidth : .5,
												cls : "casetracking-title",
												bodyCssClass : "casetracking-title-body",
												html : "<table width='100%' cellpadding='0' cellspacing='0'><tr><td align='right'><div id='casetracking.update.ux.panel.claims.ClaimsGridIcon' class='grid-collapse-icon' style='visibility: visible;' onmouseover='this.style.cursor=\"pointer\";' onclick='toggleGrid(\""
														+ ClaimGridId
														+ "\", this.id);'></div></td></tr></table>"
											} ]
								},
								{
									xtype : "grid",
									autoScroll : true,
									border : false,
									height : 140,
									buttonAlign : "right",
									id : ClaimGridId,
									stripeRows : true,
									cm : new Ext.grid.ColumnModel(
											{
												columns : [
														{
															header : 'Dos/<br>Admit',
															sortable : false,
															dataIndex : "fromDateOfService",
															width : 70,
															renderer : function(val) {
																if (val && val.time) {
																	var dateStr = '';
																	dateStr = new Date(
																			val.time.time);
																	dateStr = dateStr
																			.format('m/d/Y');
																	return dateStr;
																} else {
																	return val;
																}
															}
														},
														{
															id : 'claimNumber',
															header : 'Claim #',
															sortable : false,
															dataIndex : "claimIdentifierList",
															width:100,
															renderer : function(val) {
							                                   	var claimNumber = '';
							                                    for(var i=0;i<val.length;i++){
							                                    	var claim = val[i];
							                                    	var claimNumberSource = claim.claimNumberSource;
							                                    	if(claimNumberSource == "MPI") {
							                                    		claimNumber = claim.claimNumber;
							                                    	} 
							                                    }                     
							                                    return Ext.util.Format.htmlEncode(claimNumber);  
															}
														},
						                                {	header: 'Alt Claim #'
						                                   , sortable: false
						                                   , dataIndex:"claimIdentifierList"
						                                   ,renderer: function(val) {
							                                   	var claimNumber = '';
							                                    for(var i=0;i<val.length;i++){
							                                    	var claim = val[i];
							                                    	var claimNumberSource = claim.claimNumberSource;
							                                    	if(claimNumberSource == "CLIENT") {
							                                    		claimNumber = claim.claimNumber;
							                                    	} 
							                                    }                                    	
							                                    return Ext.util.Format.htmlEncode(claimNumber);                                 	   
						                                   }  																																							
						                                },
														{
															header : 'Member<br>SSN / ID',
															sortable : false,
															dataIndex : "memberSSNID",
															renderer : function(val) {
																return Ext.util.Format.htmlEncode(val);;
															}
														},
														{
															header : '<BR>Patient Name',
															sortable : false,
															dataIndex : "patientName",
															renderer : function(val) {
																return val;
															}
														},
														{
															header : '<BR>Provider Name',
															sortable : false,
															dataIndex : "providerName",
															renderer : function(val) {
																try{
																	return Ext.util.Format.htmlEncode(val);
																}catch(e){
																	return val;
																}
															}
														},
														{
															header : 'Provider<br>TIN',
															sortable : false,
															dataIndex : "providerTIN",
															renderer : function(val) {
																return val;
															}
														},
														{
															header : 'Total<br>Charges',
															sortable : false,
															dataIndex : "totalCharge",
															renderer : function(val) {
																return val;
															}
														},
														{
															header : 'Discount<br>Amount',
															sortable : false,
															dataIndex : "discountedTotalCharge",
															renderer : function(val) {
																return val;
															}
														},{
															header : 'Date<br>Processed',
															sortable : false,
															dataIndex : "processedDate",
															width : 90,
															renderer : function(val) {
																if (val && val.time) {
																	var dateStr = '';
																	dateStr = new Date(
																			val.time.time);
																	dateStr = dateStr
																			.format('m/d/Y');
																	return dateStr;
																} else {
																	return val;
																}
															}
														}],
												defaults : {
													sortable : true,
													menuDisabled : true
												}
											}),
									store : new Ext.data.Store(
											{
												reader : new Ext.data.JsonReader(
														{
															root : 'claimList',
															fields : [
																	{
																		name : 'fromDateOfService',
																		mapping : 'dateOfServiceFrom'
																	},
																	{
																		name : 'toDateOfService',
																		mapping : 'dateOfServiceTo'
																	},
																	{
																		name : 'claimIdentifierList',
																		mapping : 'claimIdentifierList'
																	},
																	{
																		name : 'memberSSNID',
																		mapping : 'memberID'
																	},
																	{
																		name : 'patientName',
																		mapping : 'patientLastName+", "+obj.patientFirstName'
																	},
																	{
																		name : 'lastName',
																		mapping : 'patientLastName'
																	},
																	{
																		name : 'firstName',
																		mapping : 'patientFirstName'
																	},
																	{
																		name : 'providerName',
																		mapping : 'providerName'
																	},
																	{
																		name : 'providerTIN',
																		mapping : 'providerTIN'
																	},
																	{
																		name : 'totalCharge',
																		mapping : 'totalCharge'
																	},
																	{
																		name : 'discountedTotalCharge',
																		mapping : 'discountedTotalCharge'
																	},
																	{
																		name:'processedDate',
																		mapping: 'processedDate'
																	}
															// Processing Date
															]
														}),
												data : config.aCase
											})
								} ]
					} ]
				});
	}
	return claimsInfoPanel;
};