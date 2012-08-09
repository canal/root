/**
 * Class:   casetracking.search.advanced.ux.panel.results.common.ResultsGridPanel
 *
 * Author: Roberto Brenes - MultiPlan 2011
 *
 * Params: @required: id, baseObjConfig, content
 *         @optional: N/A
 *
 */
Ext.namespace("casetracking.search.advanced.ux.panel.results.common.ResultsGridPanel");
casetracking.search.advanced.ux.panel.results.common.ResultsGridPanel = Ext.extend(Ext.grid.GridPanel,
{
  SEARCH_SUBMIT_URL: undefined,
  CASE_URL:undefined,
  	
  constructor: function(config)
  {  	
	this.SEARCH_SUBMIT_URL = config.baseObjConfig.searchSubmitURL;
	this.CASE_URL = config.baseObjConfig.caseURL;
	var _layoutPanel = this.findParentByType("casetracking.search.advanced.ux.panel.LayoutPanel");
	
	function isRowChangedToday(lastExternalModifyDate, lastModifyDate) {
		var isRowChangedToday = false;
		var dataField = lastExternalModifyDate;
		var dateToCompare;
		var lastLoginDate = (!Ext.isEmpty(GRIDVIEW.grid.store.reader.jsonData.lastLoginDate))?new Date(GRIDVIEW.grid.store.reader.jsonData.lastLoginDate):undefined;
		if(config.baseObjConfig.userClassCode == "INT"){
			dataField = lastModifyDate;
		}else if(config.baseObjConfig.userClassCode == "CLI"){
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
		,emptyText:'<div align="center" class="casetrackingGridEmpty"><BR><b>No Cases</b></div>'
	}); 
	
	var READER =		           
		new Ext.data.JsonReader({
				root: 'caseList'
				,fields: [
  			          		{name: 'actionReqIcon', mapping:'createDate'}
  			          	   ,{name: 'createdOnDate',mapping:'createDate.time.time',type: 'date', dateFormat: 'timestamp'}
				           ,{name: 'priority',mapping:(('priority' !== null)&&('priority.clientPriorityDetail' !== undefined)&&('priority.clientPriorityDetail.name' !== undefined))?'priority':null}
				           ,{name: 'caseNumber'}
				           ,{name: 'providerName',mapping:'caseProvider'}		
						   ,{name: 'lastExternalModifyDate',mapping:'lastExternalModifyDate'}
						   ,{name: 'lastModifyDate',mapping:'lastModifyDate'}    				           
						   ]
				,totalProperty: 'totalNumberOfRecords'
		});	

	var store = 
		new Ext.data.Store({
	        reader: READER
			   ,proxy: new Ext.data.HttpProxy ({url: this.SEARCH_SUBMIT_URL})				   
			   ,remoteSort: true
		  ,baseParams: {
	           city:"Nueva Jork"
	           }
		});
	  
    var defaults = {
      frame:false
      ,border:false
      ,autoHeight:true
      ,enableColumnMove:false
      ,enableColumnResize:false     	
      ,colModel: new Ext.grid.ColumnModel({
         columns:[
                  {header: 'Created On', sortable: true, dataIndex:"createdOnDate"}
	              ,{header: 'Priority', sortable: true, dataIndex:"priority"}
	              ,{id:'caseNumber', header: 'Case #', sortable: true, dataIndex:"caseNumber"}
	              ,{header: 'Provider Name', sortable: true, dataIndex:"providerName"}
         ]
        ,defaults: {
           sortable: true
          ,menuDisabled: true
         }
       })
      ,stripeRows:true
      ,viewConfig: {
         rowHeight: 25
        ,scrollOffset: 0
        ,autoFill:true
        ,forceFit:true
       }
      ,store: store
      ,view:GRIDVIEW
      ,bbar: new Ext.PagingToolbar({
  	    pageSize: 10,
	    displayInfo: true,
	    emptyMsg: 'No Cases',
	    border:false,
	    store: store
      })
      ,listeners:{
         "rowdblclick":function(g,r,e) {        	 
           var _rec = g.getStore().getAt(r);  
           g.el.mask("Opening Service Case <b>"+_rec.data.caseNumber+"</b>", "x-mask-loading");
           document.location = this.CASE_URL +"?caseNumber="+_rec.data.caseNumber+"&fromSearch=true";
         }
       }
    };

    Ext.apply(this, config, defaults);
    casetracking.search.advanced.ux.panel.results.common.ResultsGridPanel.superclass.constructor.call(this, config);
  }
});
Ext.reg('casetracking.search.advanced.ux.panel.results.common.ResultsGridPanel', casetracking.search.advanced.ux.panel.results.common.ResultsGridPanel);

