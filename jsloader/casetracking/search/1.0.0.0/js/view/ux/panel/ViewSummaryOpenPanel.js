Ext.namespace("casetracking.search.view.ux.panel.ViewSummaryOpenPanel");
casetracking.search.view.ux.panel.ViewSummaryOpenPanel = Ext.extend(Ext.Panel,
{
  NAMESPACE:undefined,
  RENDERTO:undefined,
  SEARCH_CASE_SUBMIT_URL:undefined,
  CASE_URL:undefined,
  STORE:undefined,
  COLMODEL:undefined,
  GRIDPANEL:undefined,
  USERCLASSCODE:undefined,

  //Beginning of Constructor
  constructor: function(config)
  {
    var thisObj = this;
    this.NAMESPACE = config.namespace;
    this.RENDERTO = config.renderto;
    this.SEARCH_CASE_SUBMIT_URL = config.searchCaseSubmitUrl;
    this.CASE_URL = config.caseUrl;
    this.USERCLASSCODE = config.userClassCode;
    
    	this.COLMODEL = 
            new Ext.grid.ColumnModel({
			        		columns:[
					                 {	
					                	 header: ''
					                	 ,sortable: false
					                	 ,dataIndex:"actionReqIcon"
					                	 ,width: 15
						                 ,renderer: function(value, metaData, record, rowIndex, colIndex, store){	
											if(isRowChangedToday(record.data.lastExternalModifyDate, record.data.lastModifyDate)) {
												return "<div class='action-req-icon' style='float:left; visibility: visible;' title='Note Added'></div>";	
											} else {
												return '';
											}	
										}
					                 },	{
					                	 header: 'Created On'
					                	 ,sortable: false
					                	 ,dataIndex:"createdOnDate"
					                	 ,renderer: function(val) {
											if(val.time){
												var dateCreatedOn = '';
												if (val != null) {
													dateCreatedOn = new Date(val.time.time);
													dateCreatedOn = dateCreatedOn.format('m/d/Y');
												}		
												return dateCreatedOn;
											}else{
												return val;
											}																
										}
          					       },{
                                        id:'caseNumber', header: 'Service<br>Case #', sortable: false, dataIndex:"caseNumber"
                                    },{	header: 'Priority'
					                	, sortable: false
					                	, dataIndex:"priority"
										,renderer : function(value, metaData,
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
					                },{
					                	header: 'Provider Name'
					                	,sortable:false
					                	,dataIndex:"providerName"
					                	,renderer:function(val){
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
					                }
					               ]
			              	,defaults: {sortable: true,menuDisabled: true}
		             });
		             
	this.READER =		           
		new Ext.data.JsonReader({
				root: 'caseList'
				,fields: [
				          	{name: 'actionReqIcon', mapping:'createDate'}
						   ,{name: 'createdOnDate',mapping:'createDate'}
						   ,{name: 'priority',mapping:'priority'}
						   ,{name: 'caseNumber'}
						   ,{name: 'inquiryType',mapping:'originalCaseType.clientDetail.name'}
						   ,{name: 'network',mapping:'caseNetwork.clientNetworkDetail.name'}
						   ,{name: 'providerName',mapping:'caseProvider'}
						   ,{name: 'createdByUser',mapping:'createByUser.lastName+", "+obj.createByUser.firstName'}
						   ,{name: 'lastExternalModifyDate',mapping:'lastExternalModifyDate'}
						   ,{name: 'lastModifyDate',mapping:'lastModifyDate'} 
						   ,{name: 'createByUserOriginal', mapping: 'createByUserOriginal'}
						   ]
				,totalProperty: 'totalNumberOfRecords'
		});		             
    
    this.STORE = 
             new Ext.data.Store({
    			        reader:this.READER
    				   ,proxy: new Ext.data.HttpProxy ({url:this.SEARCH_CASE_SUBMIT_URL})				   
    				   ,remoteSort: true
    				   ,baseParams: {
							caseNumber:""
							,createdByDateFrom:""
							,createdByDateTo:""
							,providerName:""
							,statusId:"OPEN"
							,isAllSearch:"false"
		   				}	       	                  
            });     
            
	this.GRIDVIEW = new Ext.grid.GridView({ 
		forceFit: true, 
		getRowClass : function (row, index) {               
			var cls = ''; 			
			var data = row.data; 
			if(isRowChangedToday(data.lastExternalModifyDate, data.lastModifyDate)) {
				cls = 'grid-row-highlight';
			}
			return cls;
		}
		,emptyText:'<div align="center" class="casetrackingGridEmpty"><BR><b>No open service cases</b></div>' 
	});         
	
	function isRowChangedToday(lastExternalModifyDate, lastModifyDate) {
		var isRowChangedToday = false;
		var dataField = lastExternalModifyDate;
		var dateToCompare;
		var lastLoginDate = (!Ext.isEmpty(thisObj.READER.jsonData.lastLoginDate))?new Date(thisObj.READER.jsonData.lastLoginDate):undefined;
		
		if(thisObj.USERCLASSCODE == "INT"){
			dataField = lastModifyDate;
		}else if(thisObj.USERCLASSCODE == "CLI" || thisObj.USERCLASSCODE == "PRV"){
			dataField = lastExternalModifyDate;
		}
		
		if(!Ext.isEmpty(dataField) && !Ext.isEmpty(dataField.time)&& !Ext.isEmpty(dataField.time.time)){
			dateToCompare = new Date(dataField.time.time);
		}
		if(Ext.isDate(lastLoginDate) && Ext.isDate(dateToCompare) && (casetracking.core.date.compare({fromDate:lastLoginDate,toDate:dateToCompare}))){
			isRowChangedToday = true; 
		}
		
		return isRowChangedToday;
	};
            
    this.GRIDPANEL =
         new Ext.grid.GridPanel({
              frame:false
              ,layout:'fit'
              ,border:false     
              ,colModel: this.COLMODEL
              ,stripeRows:true
              ,autoHeight:true
	      ,enableColumnMove:false
	      ,enableColumnResize:false  
	      ,style:"padding-top:5px;" 
              ,loadMask:true
              ,viewConfig: {
                 rowHeight: 20
                ,scrollOffset: 0
                ,autoFill:true
                ,forceFit:true
                ,emptyText:'<div align="center" class="casetrackingGridEmpty"><BR><b>No open service cases</b></div>'
               }
               ,view:this.GRIDVIEW
              ,store: this.STORE
              ,listeners:{
                 "rowdblclick":function(g,r,e) {        	 
                   var _rec = g.getStore().getAt(r);  
                   g.el.mask("Opening Service Case <b>"+_rec.data.caseNumber+"</b>", "x-mask-loading");
                   document.location = thisObj.CASE_URL +"?caseNumber="+_rec.data.caseNumber;
                 }
               }
            });              
  
    /* Defaults */
    var defaults = {        
        renderTo:this.RENDERTO
        ,title:'My Open Service Cases'
        ,ctCls:"support-portal-panel"  
        ,bodyBorder: false
        ,border: false      
        ,items:[this.GRIDPANEL]          
    };

    Ext.apply(this, defaults);
    casetracking.search.view.ux.panel.ViewSummaryOpenPanel.superclass.constructor.call(this, defaults);
    
  } //End of Constructor
});
Ext.reg('casetracking.search.view.ux.panel.ViewSummaryOpenPanel', casetracking.search.view.ux.panel.ViewSummaryOpenPanel);
