Ext.Ajax.timeout = 7200000;
Ext.namespace("casetracking.search.view.ux.panel.ViewAllPanels");
casetracking.search.view.ux.panel.ViewAllPanels = Ext.extend(uRadix.form.FormPanel,
{
  NAMESPACE:undefined,
  RENDERTO:undefined,
  SEARCH_CASE_SUBMIT_URL:undefined,
  CASE_URL:undefined,
  PRIORITY_LIST:undefined,
  SUBMITTED_BY_LIST:undefined,
  FORM_CMPS:undefined,
  COLMODELOPEN:undefined,
  COLMODELCLOSE:undefined,
  STOREOPEN:undefined,
  STORECLOSE:undefined,
  GRIDPANELOPEN:undefined,
  GRIDPANELCLOSE:undefined,
  MPI_VIEW_ALL_CASES_COOKIE_NAME:"$$mpi_casetracking_viewall_search_filters$$",
  FIELD_FILTER_SOURCE_ID:undefined,
  SUMITTED_BY_USER_NAME_URL:undefined,
  SUBMITTED_BY_USER_NAME_STORE:undefined,

  //Beginning of Constructor
  constructor: function(config)
  {
    var thisObj = this;
    this.NAMESPACE = config.namespace;
    this.RENDERTO = config.renderTo;
    this.SEARCH_CASE_SUBMIT_URL = config.searchCaseSubmitUrl;
    this.CASE_URL = config.caseUrl;
    this.FIELD_FILTER_SOURCE_ID = (config.fieldIds.filterSourceId && (config.fieldIds.filterSourceId !== undefined))? config.fieldIds.filterSourceId : this.FIELD_FILTER_SOURCE_ID;
    this.USERCLASSCODE = config.userClassCode;
    this.SUMITTED_BY_USER_NAME_URL = config.submittedByUserNameUrl;
    
    //BEG: PRIORITY & SUBMITTED BY LIST 
    this.PRIORITY_LIST = config.priorityList;    
    this.SUBMITTED_BY_LIST = config.submittedByList;            
    if(this.PRIORITY_LIST && this.PRIORITY_LIST.length){
    	this.PRIORITY_LIST = [{"id":"","name":"Select","nameWithoutReasonCode":"- Select -"}].concat(this.PRIORITY_LIST);
    }  
    
    var submittedByPanel = {
    		xtype: "panel"
    		,columnWidth:.7
    		,border: false
    		,html: "&nbsp;"
    };
	if(config.userClassCode && config.userClassCode != 'PRV') {
		if(config.isManager) {
			var submittedByNameStore = new Ext.data.Store({
				proxy: new Ext.data.HttpProxy({
					url: config.submittedByUserNameUrl
					,method: "POST"
				})
				,reader: new Ext.data.JsonReader({
						root: 'submitedByUserNameList',
						id: 'id'
					}, [
						{name: 'id', mapping: 'id'},
						{name: 'name', mapping: 'name'}
					])
				,autoLoad: true	
				,listeners: {
					load: function(records, options) {
						var submittedByUserNameId = Ext.getCmp('submittedByUserNameId').getValue();
						var combo = Ext.getCmp('submittedByUserName');
						if(combo) {					
							combo.setValue(submittedByUserNameId);
						}
					}
				}
			  });       	
			submittedByPanel = 
			{                                                					 	
					xtype: "panel"
					,columnWidth:.7
					,layout:"form"
					,border: false
					,labelAlign:"top"
					,hidden: !config.isManager
					,items:[{
						xtype: "resizable-combo",
						mode:"local",	
						fieldLabel: "Filter by Submitter",			  									
						hiddenName : "submitterId",
						allowBlank:true,
						name:"submittedByUserName",
						id:"submittedByUserName",	
						msgTarget:"under",
						store: submittedByNameStore,
						valueField:"id",
						emptyText: "- Select One -",
						displayField:'name',
						triggerAction: 'all',
						editable:false,
						forceSelection:false,
						selectOnFocus:true,
						listeners: {
								render : function(){this.el.dom.name = this.name;}
								,select: function(combo, record, index) {
									Ext.getCmp('submittedByUserNameDesc').setValue(record.data.name);
									Ext.getCmp('submittedByUserNameId').setValue(record.data.id);
								}
						}
						,typeAhead:true
						,typeAheadDelay:0
					}]
					}
		}
		
		this.FORM_CMPS =  
					[submittedByPanel,{
						xtype: "panel"
						,columnWidth:.2
						,layout:"form"
						,border: false
						,labelAlign:"top"
						,items:[{
								xtype: "resizable-combo",
								mode:"local",
								fieldLabel: "Filter by Priority",			  									
								hiddenName : "priorityId",
								allowBlank:true,
								name:"priorityName",
								id:"priorityName",	
								msgTarget:"under",
								store: new Ext.data.JsonStore({
										fields: ['id', 'nameWithoutReasonCode'],
										root : "rows",
										idProperty: "id",
										data:{ "rows":this.PRIORITY_LIST}
								}),
								valueField:"id",
								emptyText: "- Select -",
								displayField:'nameWithoutReasonCode',
								triggerAction: 'all',
								editable:false,
								forceSelection:false,
								selectOnFocus:true,
								listeners: {
										render : function(){this.el.dom.name = this.name;}
								}
								,typeAhead:true
								,typeAheadDelay:0
							}]
					},{
						xtype: "panel"
						,columnWidth:.1
						,layout:"form"
						,border: false
						,labelAlign:"top"
						,items:[{
							   height:15
							},{
								xtype:"button"
								,id:"filterById"
								,style: "float:right;"
								,text:"&nbsp;&nbsp;FILTER&nbsp;&nbsp;"
								,ctCls :"support-portal-btn"
								,handler:this.SEARCHSUBMIT
							}]
					},{
						xtype: "hidden"
						,id : "submittedByUserNameDesc"
						,value: ""
					},{
						xtype: "hidden"
							,id : "submittedByUserNameId"
							,value: ""
					}];	
		}
	this.getSubmittedBy = function(record) {
		var submittedBy = "";
		if(thisObj.USERCLASSCODE == "INT" || thisObj.USERCLASSCODE == "PRV"){
			submittedBy = record.data.createByUserOriginal.firstName + " " + record.data.createByUserOriginal.lastName;
		}else if(thisObj.USERCLASSCODE == "CLI"){
			if(record.data.createByUserOriginal.userClass && record.data.createByUserOriginal.userClass.internal) {
				submittedBy = "MultiPlan";
			} else {
				submittedBy = record.data.createByUserOriginal.firstName + " " + record.data.createByUserOriginal.lastName;
			}
		}
		
		return submittedBy;
	}
    //Colum Model and Stores
    this.STOREOPEN = new casetracking.search.view.ux.panel.common.OpenStore({searchCaseSubmitUrl:this.SEARCH_CASE_SUBMIT_URL}); 
	this.COLMODELOPEN = new casetracking.search.view.ux.panel.common.OpenColumnModel({USERCLASSCODE:thisObj.USERCLASSCODE, store:this.STOREOPEN, parentWindow : thisObj});
	this.STORECLOSE =  new casetracking.search.view.ux.panel.common.CloseStore({searchCaseSubmitUrl:this.SEARCH_CASE_SUBMIT_URL});
	this.COLMODELCLOSE = new casetracking.search.view.ux.panel.common.CloseColumnModel({USERCLASSCODE:thisObj.USERCLASSCODE, store:this.STORECLOSE, parentWindow : thisObj});                     	   	     
	this.GRIDVIEW = new Ext.grid.GridView({ 
		forceFit: true, 
		getRowClass : function (row, index) {
			var cls = ''; 			
			var data = row.data; 
			var dataField = data.lastExternalModifyDate;
			var dateToCompare;
			var lastLoginDate = (!Ext.isEmpty(row.store.reader.jsonData.lastLoginDate))?new Date(row.store.reader.jsonData.lastLoginDate):undefined;
			if(thisObj.USERCLASSCODE == "INT"){
				dataField = data.lastModifyDate;
			}else if(thisObj.USERCLASSCODE == "CLI" || thisObj.USERCLASSCODE == "PRV"){
				dataField = data.lastExternalModifyDate;
			}			
			if(!Ext.isEmpty(dataField) && !Ext.isEmpty(dataField.time)&& !Ext.isEmpty(dataField.time.time)){
				dateToCompare = new Date(dataField.time.time);
			}
			if(Ext.isDate(lastLoginDate) && Ext.isDate(dateToCompare) && (casetracking.core.date.compare({fromDate:lastLoginDate,toDate:dateToCompare}))){
				cls = 'grid-row-highlight'; 
			}

			return cls;
		} 
		,emptyText:'<div align="center" class="casetrackingGridEmpty"><BR><BR><BR><BR><b>No open service cases</b></div>'
	});
	this.GRIDCLOSEVIEW = new Ext.grid.GridView({ 
		forceFit: true, 
		getRowClass : function (row, index) {
			var cls = ''; 			
			var data = row.data;
			var dataField = undefined;		
			var dateToCompare;
			var lastLoginDate = (!Ext.isEmpty(row.store.reader.jsonData.lastLoginDate))?new Date(row.store.reader.jsonData.lastLoginDate):undefined;
			if(row.store.reader.jsonData.caseList) {
				if(thisObj.USERCLASSCODE == "INT"){
					dataField = row.store.reader.jsonData.caseList[index].lastModifyDate;
				}else if(thisObj.USERCLASSCODE == "CLI" || thisObj.USERCLASSCODE == "PRV"){
					dataField = row.store.reader.jsonData.caseList[index].lastExternalModifyDate;
				}
			}				
			if(!Ext.isEmpty(dataField) && !Ext.isEmpty(dataField.time)&& !Ext.isEmpty(dataField.time.time)){
				dateToCompare = new Date(dataField.time.time);
			}
			if(Ext.isDate(lastLoginDate) && Ext.isDate(dateToCompare) && (casetracking.core.date.compare({fromDate:lastLoginDate,toDate:dateToCompare}))){
				cls = 'grid-row-highlight'; 
			}

			return cls;
		} 
		,emptyText:'<div align="center" class="casetrackingGridEmpty"><BR><BR><BR><BR><b>No closed service cases</b></div>'
	});   	
    
    this.GRIDPANELOPEN = 
            new casetracking.search.view.ux.panel.common.GridPanel({
                    caseUrl:this.CASE_URL
                    ,colmodel:this.COLMODELOPEN
                    ,store:this.STOREOPEN 
                    ,view:this.GRIDVIEW
                    ,height:350     
                    ,emptyText:'<div align="center" class="casetrackingGridEmpty"><BR><BR><BR><BR><b>No open service cases</b></div>'
            });   
    this.GRIDPANELCLOSE = 
            new casetracking.search.view.ux.panel.common.GridPanel({
                    caseUrl:this.CASE_URL
                    ,colmodel:this.COLMODELCLOSE
                    ,store:this.STORECLOSE
                    ,view:this.GRIDCLOSEVIEW
                    ,height:325      
                    ,emptyText:'<div align="center" class="casetrackingGridEmpty"><BR><BR><BR><BR><b>No closed service cases</b></div>'
            });     
    
    this.TABPANEL = new Ext.TabPanel({
        activeTab:0,
        plain:true,
        height:378,
        defaults:{autoScroll: true},
        items:[{
                    title: 'Open Service Cases'
                    ,autoHeight:true
                    //,layout:'fit'
                    ,items:  [this.GRIDPANELOPEN]
               },{
                    title: 'Closed Service Cases',
                    //layout:'fit',
                    items:  [this.GRIDPANELCLOSE]
               }]
    });                                      

    /* Defaults */
    var defaults = 
            {
				renderTo : this.RENDERTO,
				layout : "form",
				id: "searchForm"+this.NAMESPACE,
				border : false,
				bodyBorder : false,
				hideBorders : true,
				title:"View Service Cases",
				ctCls:"support-portal-panel", 
				style:"padding-top:5px;padding-bottom:5px;",        								
				width : 950,
				items : [{
    						xtype : "panel",
    						autoScroll : true,    						
    						items:[{
        								xtype:"panel"
        								,layout:"column"
        								,border : false
        								,bodyBorder : false
        								,hideBorders : true
        								//,width:400
        								,items:this.FORM_CMPS   
        								,style:"padding-top:5px;"        	
    				                },this.TABPANEL]
					 }]
    		//Begining of listener
		    ,listeners: 
		    {
				"uradix_enterkey": this.SEARCHSUBMIT
				,"afterrender":
					function() {
						// Read filter values from cookie
						var _cookieData = uRadixCookieManager.readCookie(this.MPI_VIEW_ALL_CASES_COOKIE_NAME);
						uRadixCookieManager.eraseCookie(this.MPI_VIEW_ALL_CASES_COOKIE_NAME);
						_cookieData = Ext.util.JSON.decode(_cookieData);
						if(!Ext.isEmpty(_cookieData) && ((/posted=1/.test(window.location.hash)) == true))
						{
							var submittedByUserNameDesc = '';
							var submittedByUserName = '';
							for(var i = 0; i < _cookieData.length; i++) {
								if(_cookieData[i].id == 'submittedByUserNameDesc') {
									submittedByUserNameDesc = _cookieData[i].value;					
								}
								if(_cookieData[i].id == 'submittedByUserName') {	
									submittedByUserName = _cookieData[i].value;
								}
							}	 
							
							this.getForm().setValues(_cookieData);
							
							var combo = Ext.getCmp('submittedByUserName');
							if(combo){
								combo.setValue(submittedByUserNameDesc);
								combo.setRawValue(submittedByUserName);	
							}
							this.add
							({
								id:this.FIELD_FILTER_SOURCE_ID
								, xtype:"hidden"
								,name:this.FIELD_FILTER_SOURCE_ID
								,value:"cookie"
							});
							this.SEARCHSUBMIT();
						}
					}
		    }//End of listener  					 
		    };
    Ext.apply(this, defaults);
    casetracking.search.view.ux.panel.ViewAllPanels.superclass.constructor.call(this, defaults);
    
  } //End of Constructor
  
  //Beg: Search Submit
  ,SEARCHSUBMIT:function(){
        var _instance = undefined;
        
        if(this.getXType() == "casetracking.search.view.ux.panel.ViewAllPanels")
        {
          _instance = this;
        }
        else
        {
          _instance = this.findParentByType("casetracking.search.view.ux.panel.ViewAllPanels");      
        } 

        var _formPanel = Ext.getCmp("searchForm"+_instance.NAMESPACE);
        var _form = _formPanel.getForm(); 
        var _priorityField = Ext.getCmp("priorityName");
        var _submitterField = Ext.getCmp("submittedByUserNameId");    
        var _originalActiveTab = _instance.TABPANEL.getActiveTab();  
        
        // Assemble field values for cookie store
        var _fieldData = new Array();
        _instance.findBy(function(c,ct){
        if(c.isFormField)
        {
          if(!Ext.isEmpty(c.getValue()) && !c.disabled)
          {       	  
        	  if(c.getXType() == "datefield"){        		 
        		  _fieldData.push({"id":c.id,"value":c.getRawValue()});
        	  }else{
        		  c.setValue(c.getValue().trim());
        		  _fieldData.push({"id":c.id,"value":c.getValue()});
        	  }            
          }
        }
        },this);
        //Set Cookie
        if(!Ext.isEmpty(_fieldData))
        {
            uRadixCookieManager.createCookie(_instance.MPI_VIEW_ALL_CASES_COOKIE_NAME, Ext.util.JSON.encode(_fieldData), 1);
        }        
        
        var  _storeOpen = 
                new Ext.data.Store({
    			        reader: 
    			        	new Ext.data.JsonReader({
    			        			root: 'caseList'
    			        			,fields: [
    			        			          	{name: 'lastModifiedAction', mapping:'createDate'}
    								           ,{name: 'createdOnDate',mapping:'createDate'}
    								           ,{name: 'reopenOnDate',mapping:'lastOpenDate'}
    								           ,{name: 'priority',mapping:'priority'}
    								           ,{name: 'caseNumber'}
    								           ,{name: 'inquiryType',mapping:'originalCaseType.clientDetail.name'}
    								           ,{name: 'network',mapping:'caseNetwork.clientNetworkDetail.name'}
    								           ,{name: 'providerName',mapping:'caseProvider'}
    								           ,{name: 'createdByUser',mapping:'assignedToClientUser'}
    								           ,{name: 'assignedToClientUser',mapping:'assignedToClientUser'}
    								           ,{name: 'assignedToProviderUser',mapping:'assignedToProviderUser'}
    								           ,{name: 'assignedToServiceUser',mapping:'assignedToServiceUser'}	
    								           ,{name: 'createdByUserForInternal',mapping:'createByUser'}
    								           ,{name: 'lastExternalModifyDate',mapping:'lastExternalModifyDate'}
									   ,{name: 'lastModifyDate',mapping:'lastModifyDate'}   
									   ,{name: 'createByUserOriginal', mapping: 'createByUserOriginal'}
    								 ]
    			        			,totalProperty: 'totalNumberOfRecords'
    			        	})
    				   ,proxy: new Ext.data.HttpProxy ({url:_instance.SEARCH_CASE_SUBMIT_URL})				   
    				   ,remoteSort: true
    				   ,baseParams: {
    					   				caseNumber:""
    					   				,createdByDateFrom:""
    					   				,createdByDateTo:""
    					   				,providerName:""
    					   				,statusId:"OPEN"
    					   				,priorityId:_priorityField.getValue()
    					   				,submittedByUserName:_submitterField.getValue()
    					   				,isAllSearch:"true"    					   				
		   				}
    			       	                  
                });   
                
        if((!Ext.isEmpty(_storeOpen)) && (!Ext.isEmpty(_instance.COLMODELOPEN)))
        {
    		_storeOpen.on('beforeload', function() {	
    			var el = _instance.GRIDPANELOPEN.getGridEl();
    			if (typeof el == 'object') {
    				el.mask("Loading Records...", "x-mask-loading");
    			}
    		});	
    		
    		_storeOpen.on('load', function() {
    			var el = _instance.GRIDPANELOPEN.getGridEl();
    			el.unmask();
    		}); 
    		
    		_instance.TABPANEL.setActiveTab(0);
    		_instance.GRIDPANELOPEN.reconfigure(_storeOpen, _instance.COLMODELOPEN);
    		var _gridPagingToolbarOpen = _instance.GRIDPANELOPEN.getBottomToolbar();
    		_gridPagingToolbarOpen.bindStore(_storeOpen);
    		var _viewOpen = _instance.GRIDPANELOPEN.getView();
    		_viewOpen.getRowClass = function (row, index) { 
				var cls = ''; 			
				var data = row.data; 
				var dataField = data.lastExternalModifyDate;
				var dateToCompare;
				var lastLoginDate = (!Ext.isEmpty(_storeOpen.reader.jsonData.lastLoginDate))?new Date(_storeOpen.reader.jsonData.lastLoginDate):undefined;
	
				if(_instance.USERCLASSCODE == "INT"){
					dataField = data.lastModifyDate;
				}else if(_instance.USERCLASSCODE == "CLI"){
					dataField = data.lastExternalModifyDate;
				}
	
				if(!Ext.isEmpty(dataField) && !Ext.isEmpty(dataField.time)&& !Ext.isEmpty(dataField.time.time)){
					dateToCompare = new Date(dataField.time.time);
				}
	
				if(Ext.isDate(lastLoginDate) && Ext.isDate(dateToCompare) && (casetracking.core.date.compare({fromDate:lastLoginDate,toDate:dateToCompare}))){
					cls = 'grid-row-highlight'; 
				}
	
				return cls;    		
    		};
    		_storeOpen.load({params:{start:0, limit:10}});    
            	window.location.hash="posted=1";  
        } 
        
        var  _storeClosed = 
                new Ext.data.Store({
    			        reader: 
    			        	new Ext.data.JsonReader({
    			        			root: 'caseList'
    			        			,fields: [
    			        			          	{name: 'lastModifiedAction', mapping:'createDate'}
    								           ,{name: 'closedOnDate',mapping:'lastCloseDate'}
    								           ,{name: 'priority',mapping:'priority'}
    								           ,{name: 'caseNumber'}
    								           ,{name: 'inquiryType',mapping:'originalCaseType.clientDetail.name'}
    								           ,{name: 'network',mapping:'caseNetwork.clientNetworkDetail.name'}
    								           ,{name: 'providerName',mapping:'caseProvider'}
    								           ,{name: 'createdByUser',mapping:'assignedToClientUser'}
    								           ,{name: 'assignedToClientUser',mapping:'assignedToClientUser'}
    								           ,{name: 'assignedToProviderUser',mapping:'assignedToProviderUser'}
    								           ,{name: 'assignedToServiceUser',mapping:'assignedToServiceUser'}	
    								           ,{name: 'createdByUserForInternal',mapping:'createByUser'}
    								           ,{name: 'lastExternalModifyDate',mapping:'lastExternalModifyDate'}
    								           ,{name: 'lastModifyDate',mapping:'lastModifyDate'}
    								           ,{name: 'createByUserOriginal', mapping: 'createByUserOriginal'}
    								 ]
    			        			,totalProperty: 'totalNumberOfRecords'
    			        	})
    				   ,proxy: new Ext.data.HttpProxy ({url:_instance.SEARCH_CASE_SUBMIT_URL})				   
    				   ,remoteSort: true
    				   ,baseParams: {
			   					         caseNumber:""
    					   				,createdByDateFrom:""
    					   				,createdByDateTo:""
    					   				,providerName:""
    					   				,statusId:"CLOSED"
    					   				,priorityId:_priorityField.getValue()
    					   				,submittedByUserName:_submitterField.getValue()
    					   				,isAllSearch:"true"  					   				
		   				}    			       	                  
                });  
                
	var _viewClose= _instance.GRIDPANELCLOSE.getView();
	_viewClose.getRowClass = function (row, index) { 	
		var cls = ''; 			
		var data = row.data; 
		var dataField = data.lastExternalModifyDate;
		var dateToCompare;
		var lastLoginDate = (!Ext.isEmpty(_storeClosed.reader.jsonData.lastLoginDate))?new Date(_storeClosed.reader.jsonData.lastLoginDate):undefined;

		if(_instance.USERCLASSCODE == "INT"){
			dataField = data.lastModifyDate;
		}else if(_instance.USERCLASSCODE == "CLI"){
			dataField = data.lastExternalModifyDate;
		}

		if(!Ext.isEmpty(dataField) && !Ext.isEmpty(dataField.time)&& !Ext.isEmpty(dataField.time.time)){
			dateToCompare = new Date(dataField.time.time);
		}

		if(Ext.isDate(lastLoginDate) && Ext.isDate(dateToCompare) && (casetracking.core.date.compare({fromDate:lastLoginDate,toDate:dateToCompare}))){
			cls = 'grid-row-highlight'; 
		}

		return cls;    		
	};                
                
       if((!Ext.isEmpty(_storeClosed)) && (!Ext.isEmpty(_instance.COLMODELCLOSE)))
        {
    		_storeClosed.on('beforeload', function() {	
    			var el = _instance.GRIDPANELCLOSE.getGridEl();
    			if (typeof el == 'object') {
    				el.mask("Loading Records...", "x-mask-loading");
    			}
    		});	
    		
    		_storeClosed.on('load', function() {
    			var el = _instance.GRIDPANELCLOSE.getGridEl();
    			el.unmask();
    		}); 
    		
    		_instance.TABPANEL.setActiveTab(1);
    		_instance.GRIDPANELCLOSE.reconfigure(_storeClosed, _instance.COLMODELCLOSE);
    		var _gridPagingToolbarClosed = _instance.GRIDPANELCLOSE.getBottomToolbar();
    		_gridPagingToolbarClosed.bindStore(_storeClosed);
    		_storeClosed.load({params:{start:0, limit:10}});    
            	window.location.hash="posted=1";  
        }    
        
        _instance.TABPANEL.setActiveTab(_originalActiveTab);                                                
  } //End of Search Submit
  
});
Ext.reg('casetracking.search.view.ux.panel.ViewAllPanels', casetracking.search.view.ux.panel.ViewAllPanels);
