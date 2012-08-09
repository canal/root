Ext.namespace("casetracking.search.view.ux.panel.common.CloseColumnModel");
casetracking.search.view.ux.panel.common.CloseColumnModel = Ext
		.extend(
				Ext.grid.ColumnModel,
				{
					NAMESPACE : undefined,
					RENDERTO : undefined,

					// Beginning of Constructor
					constructor : function(config) {
						function isRowChangedToday(lastExternalModifyDate,
								lastModifyDate,lastLoginDate) {
							var isRowChangedToday = false;
							var dateToCompare;
							if (config.USERCLASSCODE == "INT") {
								dataField = lastModifyDate;
							} else if (config.USERCLASSCODE == "CLI" || config.USERCLASSCODE == "PRV") {
								dataField = lastExternalModifyDate;
							}
							if (!Ext.isEmpty(dataField)
									&& !Ext.isEmpty(dataField.time)
									&& !Ext.isEmpty(dataField.time.time)) {
								dateToCompare = new Date(dataField.time.time);
							}
							if (Ext.isDate(lastLoginDate)
									&& Ext.isDate(dateToCompare)
									&& (casetracking.core.date.compare({
										fromDate : lastLoginDate,
										toDate : dateToCompare
									}))) {
								isRowChangedToday = true;
							}

							return isRowChangedToday;
						}
						;
						var defaults = {
							columns : [
									{
										header : '',
										sortable : false,
										dataIndex : "lastModifiedAction",
										width : 15,
										renderer : function(value, metaData,
												record, rowIndex, colIndex,
												store) {;
											var lastExternalModifyDate;
											var lastModifyDate;
											var lastLoginDate;
											if(store && store.reader && store.reader.jsonData 
													&& store.reader.jsonData.caseList && store.reader.jsonData.caseList[rowIndex]) {
												lastExternalModifyDate = store.reader.jsonData.caseList[rowIndex].lastExternalModifyDate;
												lastModifyDate = store.reader.jsonData.caseList[rowIndex].lastModifyDate;
												lastLoginDate = (!Ext.isEmpty(store.reader.jsonData.lastLoginDate))?new Date(store.reader.jsonData.lastLoginDate):undefined;
											}
											if (isRowChangedToday(lastExternalModifyDate,lastModifyDate,lastLoginDate)) {
												return "<div class='action-req-icon' style='float:left; visibility: visible;' title='Note Added'></div>";
											} else {
												return '';
											}

											return '';
										}
									},
									{
										header : 'Closed On',
										sortable : true,
										dataIndex : "closedOnDate",
										width : 65,
										renderer : function(val) {
											if (val && val.time) {
												var dateClosedOn = '';
												if (val != null) {
													dateClosedOn = new Date(
															val.time.time);
													dateClosedOn = dateClosedOn
															.format('m/d/Y');
												}
												return dateClosedOn;
											} else {
												return val;
											}
										}
									},
									{
										id : 'caseNumber',
										header : 'Service<br>Case #',
										sortable : true,
										dataIndex : "caseNumber",
										width : 55
									},
									{
										header : 'Priority',
										sortable : true,
										dataIndex : "priority",
										renderer : function(value, metaData,
												record, rowIndex, colIndex,
												store) {
											try {
												if(record && record.json && record.json.caseContact 
														&& record.json.caseContact.callerType == 'PRV') {
													value = value.providerPriorityDetail.name;
													if(value.providerPriorityReasonDetail.name) {
														value += ' - ' + config.aCase.priority.providerPriorityReasonDetail.name;
													}
												} else {
													value = value.clientPriorityDetail.name;
													if(value.clientPriorityReasonDetail.name) {
														value += ' - ' + config.aCase.priority.clientPriorityReasonDetail.name;
													}
												}												
											} catch (e) {
											}
											return value;
										}
									},
									{
										header : "Inquiry Type",
										sortable : true,
										dataIndex : "inquiryType",
										renderer : function(value, metaData,
											record, rowIndex, colIndex,
											store) {
											var inquiryType = value;
											if(record && record.json && record.json.caseContact 
													&& record.json.caseContact.callerType == 'PRV') {
												inquiryType = record.json.originalCaseType.providerDetail.name
											}
											return inquiryType;
										}
									},
									{
										header : "Reason for<br>Inquiry",
										sortable : true,
										dataIndex : "caseSubType",
										hidden: ((config.USERCLASSCODE == "PRV") || (config.USERCLASSCODE == "CLI"))?false:true,
										renderer : function(value, metaData,
													record, rowIndex, colIndex,
													store) {
											var caseSubType = value;
											if(record && record.json && record.json.caseContact) {
												
												if(record.json.caseContact.callerType == 'PRV')
												{
													caseSubType = record.json.originalCaseType.subType.providerDetail.name;
												}
												else if(record.json.caseContact.callerType == 'CLI')
												{
													caseSubType = record.json.originalCaseType.subType.clientDetail.name;
												}												
											}
											return caseSubType;
										}
									},
									{
										header : "Network",
										sortable : true,
										dataIndex : "network",
										renderer : function(value, metaData,
												record, rowIndex, colIndex,
												store) {
											var network = value;
											if(record && record.json && record.json.caseContact 
													&& record.json.caseContact.callerType == 'PRV') {
												network = record.json.caseNetwork.providerNetworkDetail.name;												
											}
											return network;
										}										
									},
									{
										header : 'Provider Name',
										sortable : true,
										dataIndex : "providerName",
										renderer : function(val) {
					                		var returnVal = val;
					                		if(val && val.providerType){
					                			if(val.providerType == 'PRAC'){
					                				returnVal =  val.lastName + ", " + val.firstName;
					                			}else{
					                				returnVal = val.organizationName;
					                			}
					                		}else{
					                			returnVal = val.organizationName;
					                		}
					                		
					            			try{
					            				returnVal = Ext.util.Format.htmlEncode(returnVal);
					            			}catch(e){}
					            			
					            			return returnVal;
										}
									},
									{
										header : 'Submitted By',
										sortable : true,
										dataIndex : "assignedToClientUser",
										renderer : function(value, metaData,
												record, rowIndex, colIndex,
												store) {
											var val = config.parentWindow
													.getSubmittedBy(record);

											return val
										}
									} ],
							defaults : {
								sortable : true,
								menuDisabled : true
							}
						};

						Ext.apply(this, defaults);
						casetracking.search.view.ux.panel.common.CloseColumnModel.superclass.constructor
								.call(this, defaults);

					} // End of Constructor
				});
Ext.reg('casetracking.search.view.ux.panel.common.CloseColumnModel',
		casetracking.search.view.ux.panel.common.CloseColumnModel);
