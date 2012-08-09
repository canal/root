/**
 * Class:   casetracking.search.advanced.ux.panel.ResultsControllerPanel
 *
 * Author: Roberto Brenes - MultiPlan 2011
 *
 * Params: @required: baseObjConfig, columnWidth
 *         @optional: N/A
 *
 */
Ext.namespace("casetracking.search.advanced.ux.panel.ResultsControllerPanel");
casetracking.search.advanced.ux.panel.ResultsControllerPanel = Ext.extend(Ext.Panel,
{
  NAMESPACE:undefined,
  PREFIX_ID:"caseTrackingSearchResults",
  RESULTS_PANELS_ARR:["NoResultsPanel","TooManyResultsPanel","TitlePanel","GridPanel"],
  RENDERURL: undefined,
  SEARCH_SUBMIT_URL: undefined,
  FIELD_CASE_NUMBER_ID:"caseNumber",
  FIELD_CREATED_BY_DATE_FROM_ID:"createdByDateFrom",
  FIELD_CREATED_BY_DATE_TO_ID:"createdByDateTo",
  FIELD_PROVIDER_NAME_ID:"providerName",
  FIELD_STATUS_ID:"statusId",
  FIELD_FILTER_SOURCE_ID:undefined,  
  FIELD_CCODE_NAME_ID:"ccode",
  USERCLASSCODE:undefined,

  constructor: function(config)
  {
    this.NAMESPACE = config.baseObjConfig.nameSpace;
    this.RENDERURL = config.baseObjConfig.renderURL;
    this.SEARCH_SUBMIT_URL = config.baseObjConfig.searchSubmitURL;
    this.USERCLASSCODE = config.baseObjConfig.userClassCode;
    if(config.baseObjConfig.fieldIds && (config.baseObjConfig.fieldIds !== undefined)){
    	this.FIELD_CASE_NUMBER_ID = (config.baseObjConfig.fieldIds.caseNumberId && (config.baseObjConfig.fieldIds.caseNumberId !== undefined))? config.baseObjConfig.fieldIds.caseNumberId: this.FIELD_CASE_NUMBER_ID;
    	this.FIELD_CREATED_BY_DATE_FROM_ID = (config.baseObjConfig.fieldIds.createdByDateFromId && (config.baseObjConfig.fieldIds.createdByDateFromId !== undefined))? config.baseObjConfig.fieldIds.createdByDateFromId : this.FIELD_CREATED_BY_DATE_FROM_ID;
    	this.FIELD_CREATED_BY_DATE_TO_ID = (config.baseObjConfig.fieldIds.createdByDateToId && (config.baseObjConfig.fieldIds.createdByDateToId !== undefined))? config.baseObjConfig.fieldIds.createdByDateToId : this.FIELD_CREATED_BY_DATE_FROM_ID;
    	this.FIELD_PROVIDER_NAME_ID = (config.baseObjConfig.fieldIds.providerNameId && (config.baseObjConfig.fieldIds.providerNameId !== undefined))? config.baseObjConfig.fieldIds.providerNameId : this.FIELD_PROVIDER_NAME_ID;    	
    	this.FIELD_STATUS_ID = (config.baseObjConfig.fieldIds.statusId && (config.baseObjConfig.fieldIds.statusId !== undefined))? config.baseObjConfig.fieldIds.statusId : this.FIELD_STATUS_ID;
    	this.FIELD_FILTER_SOURCE_ID = (config.baseObjConfig.fieldIds.filterSourceId && (config.baseObjConfig.fieldIds.filterSourceId !== undefined))? config.baseObjConfig.fieldIds.filterSourceId : this.FIELD_FILTER_SOURCE_ID;
    }      

    var defaults = {
      columnWidth:config.columnWidth
     ,style:"padding-left:30px;"
     ,border:false
     ,items: [{
    	 	xtype:"panel",
    		border:false,
    		id:this.PREFIX_ID+"TitlePanel",
    		title:"Search Results",
    		ctCls:"support-portal-panel",
    		hidden:true
       },{
         xtype:"casetracking.search.advanced.ux.panel.results.common.ResultsContentPanel"
        ,id:this.PREFIX_ID+"NoResultsPanel"
        ,baseObjConfig:config.baseObjConfig
        ,content:"Your Search Produced No Results"
        ,hidden:true
       },
       {
         xtype:"casetracking.search.advanced.ux.panel.results.common.ResultsContentPanel"
        ,id:this.PREFIX_ID+"TooManyResultsPanel"
        ,baseObjConfig:config.baseObjConfig
        ,content:"Your Search Produced Too Many Results"
        ,hidden:true
       },
       {
         xtype:"casetracking.search.advanced.ux.panel.results.common.ResultsGridPanel"
        ,id:this.PREFIX_ID+"GridPanel"
        ,baseObjConfig:config.baseObjConfig
        ,hidden:true
       }
      ]
    };

    Ext.apply(this, defaults);
    casetracking.search.advanced.ux.panel.ResultsControllerPanel.superclass.constructor.call(this, defaults);
  },

  /**
   * @config params: panelId
   *       optional: userClassType, searchList
   */
  toggleResultsPanels: function(obj)
  {
    var panelId_ = obj.panelId;

    for(i=0;i<this.RESULTS_PANELS_ARR.length;i++)
    {
      Ext.getCmp(this.PREFIX_ID+this.RESULTS_PANELS_ARR[i]).hide();
      Ext.getCmp(this.PREFIX_ID+this.RESULTS_PANELS_ARR[i]).disable();
      Ext.getCmp(this.PREFIX_ID+this.RESULTS_PANELS_ARR[i]).cascade(function(item){
        if(item.isFormField)
        {
          item.hide();
          item.disable();
        }
      });
    }

    Ext.getCmp(this.PREFIX_ID+panelId_).enable();
    Ext.getCmp(this.PREFIX_ID+panelId_).show();
    Ext.getCmp(this.PREFIX_ID+panelId_).cascade(function(item){
      if(item.isFormField)
      {
        item.show();
        item.enable();
      }
    });

    if(!Ext.isEmpty(obj.searchList))
    {
      this.reconfigureGrid({"searchList":obj.searchList});
    }

    this.doLayout();
  },
  
  toggleTitlePanel:function(obj){
	  var panelId_ = obj.panelId;
	  if(! Ext.getCmp(this.PREFIX_ID+"TitlePanel").isVisible()){
	      Ext.getCmp(this.PREFIX_ID+"TitlePanel").enable();
	      Ext.getCmp(this.PREFIX_ID+"TitlePanel").show();
	      Ext.getCmp(this.PREFIX_ID+"TitlePanel").cascade(function(item){
	        if(item.isFormField)
	        {
	          item.show();
	          item.enable();
	        }
	      });		  
	  }else{
	      Ext.getCmp(this.PREFIX_ID+"TitlePanel").hide();
	      Ext.getCmp(this.PREFIX_ID+"TitlePanel").disable();
	      Ext.getCmp(this.PREFIX_ID+"TitlePanel").cascade(function(item){
	        if(item.isFormField)
	        {
	          item.hide();
	          item.disable();
	        }
	      });		  
	  }	  
	  
	  this.doLayout();
  },  

  /**
   * @config params: userClassType, searchList
   */
  reconfigureGrid: function(o)
  {
    //var _searchList = o.searchList;
    //var _totalNumberOfRecords = o.totalNumberOfRecords;
    var _gridPanel = Ext.getCmp(this.PREFIX_ID+"GridPanel");

    var _store;
    var _colModel;
    var FIELD_CASE_NUMBER = Ext.getCmp(this.FIELD_CASE_NUMBER_ID);
    var FIELD_CREATED_BY_DATE_FROM = Ext.getCmp(this.FIELD_CREATED_BY_DATE_FROM_ID);
    var FIELD_CREATED_BY_DATE_TO = Ext.getCmp(this.FIELD_CREATED_BY_DATE_TO_ID);
    var FIELD_PROVIDER_NAME = Ext.getCmp(this.FIELD_PROVIDER_NAME_ID);
    var FIELD_STATUS = Ext.getCmp(this.FIELD_STATUS_ID+"ID");
    var FIELD_CCODE_NAME = Ext.getCmp(this.FIELD_CCODE_NAME_ID);
    
	function isRowChangedToday(lastExternalModifyDate, lastModifyDate) {
		var isRowChangedToday = false;
		var dataField = lastExternalModifyDate;
		var dateToCompare;
		var lastLoginDate = (!Ext.isEmpty(READER.jsonData.lastLoginDate))?new Date(READER.jsonData.lastLoginDate):undefined;
		if(this.USERCLASSCODE == "INT"){
			dataField = lastModifyDate;
		}else if(this.USERCLASSCODE == "CLI"){
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

    _colModel = new Ext.grid.ColumnModel({
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
					                 	header: '<BR>Created On'
					                	 ,sortable: true
					                	 ,dataIndex:"createdOnDate"
					                	 ,width:40
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
					                 }
					                ,{	header: '<BR>Priority'
					                	, sortable: true
					                	, dataIndex:"priority"
					                	,width:50
				                		,renderer: function(val) {				                			
											try{
												val =  val.clientPriorityDetail.name;
											}catch(e){}
											return val;
										}					                		
					                }
					                ,{id:'caseNumber', header: '<BR>Service 	Case #', sortable: true, dataIndex:"caseNumber",width:50}
					                ,{
					                	header: '<BR>Provider Name'
					                	,sortable:true
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
		             
	var _baseParams = {
					caseNumber:(FIELD_CASE_NUMBER.getValue())?FIELD_CASE_NUMBER.getValue().trim():FIELD_CASE_NUMBER.getValue()
					,createdByDateFrom:FIELD_CREATED_BY_DATE_FROM.getRawValue()
					,createdByDateTo:FIELD_CREATED_BY_DATE_TO.getRawValue()
					,providerName:(FIELD_PROVIDER_NAME.getValue())?FIELD_PROVIDER_NAME.getValue().trim():FIELD_PROVIDER_NAME.getValue()
					,statusId:FIELD_STATUS.getValue()
					,isAllSearch:true
			       };
	
	if(this.USERCLASSCODE == "INT"){
		_baseParams[this.FIELD_CCODE_NAME_ID]=(FIELD_CCODE_NAME.getValue())?FIELD_CCODE_NAME.getValue().trim():FIELD_CCODE_NAME.getValue(); 
	}
	
	var GRIDVIEW = new Ext.grid.GridView({ 
		forceFit: true, 
		getRowClass : function (row, index) {               
			var cls = ''; 			
			var data = row.data; 
			if(isRowChangedToday(data.lastExternalModifyDate, data.lastModifyDate)) {
				cls = 'grid-row-highlight';
			}
			return cls;
		} 
	}); 
	
	var READER =		           
		new Ext.data.JsonReader({
				root: 'caseList'
				,fields: [
  			          		{name: 'actionReqIcon', mapping:'createDate'}
				           ,{name: 'createdOnDate',mapping:'createDate'/*,type: 'date', dateFormat: 'timestamp'*/}
				           ,{name: 'priority',mapping:'priority'}
				           ,{name: 'caseNumber'}
				           ,{name: 'providerName',mapping:'caseProvider'}		
						   ,{name: 'lastExternalModifyDate',mapping:'lastExternalModifyDate'}
						   ,{name: 'lastModifyDate',mapping:'lastModifyDate'}    				           
						   ]
				,totalProperty: 'totalNumberOfRecords'
		});	

      _store = new Ext.data.Store({
			        reader: READER
				   ,proxy: new Ext.data.HttpProxy ({url: this.SEARCH_SUBMIT_URL})				   
				   ,remoteSort: true
				   ,baseParams: _baseParams				

      });     

    if((!Ext.isEmpty(_store)) && (!Ext.isEmpty(_colModel)))
    {
      _gridPanel.reconfigure(_store, _colModel);
      _gridPagingToolbar = _gridPanel.getBottomToolbar();
      _gridPagingToolbar.bindStore(_store);
      _store.load({params:{start:0, limit:10}});      
    }    

    return;
  }

});
Ext.reg('casetracking.search.advanced.ux.panel.ResultsControllerPanel', casetracking.search.advanced.ux.panel.ResultsControllerPanel);