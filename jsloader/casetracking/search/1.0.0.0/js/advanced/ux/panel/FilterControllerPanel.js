/**
 * Class:   casetracking.search.advanced.ux.panel.FilterControllerPanel
 * Extends: uRadix.form.FormPanel
 *
 * Author: Roberto Brenes - MultiPlan 2011
 *
 * Params: @required: baseObjConfig, columnWidth
 *         @optional: N/A
 *
 */
Ext.namespace("casetracking.search.advanced.ux.panel.FilterControllerPanel");
casetracking.search.advanced.ux.panel.FilterControllerPanel = Ext.extend(uRadix.form.FormPanel,
{
  thisObj: undefined,
  NAMESPACE:undefined,
  PREFIX_ID:"caseTrackingFilterPanel",
  RENDERURL: undefined,
  CASEURL: undefined,
  SEARCH_SUBMIT_URL: undefined,
  MPI_SEARCH_COOKIE_NAME: "$$mpi_casetracking_search_filters$$",
  FIELD_CASE_NUMBER_ID:"caseNumber",
  FIELD_CREATED_BY_DATE_FROM_ID:"createdByDateFrom",
  FIELD_CREATED_BY_DATE_TO_ID:"createdByDateTo",
  FIELD_CCODE_NAME_ID:"ccode",
  FIELD_PROVIDER_NAME_ID:"providerName",
  FIELD_STATUS_ID:"statusId",
  FIELD_FILTER_SOURCE_ID:undefined,
  BUTTON_SEARCH_ID:"searchButton",

  constructor: function(config)
  {
	var thisObj = this;
    	this.NAMESPACE = config.baseObjConfig.nameSpace;
    	this.RENDERURL = config.baseObjConfig.renderURL;
    	this.CASEURL = config.baseObjConfig.caseURL;
    	this.MPI_SEARCH_COOKIE_NAME = this.MPI_SEARCH_COOKIE_NAME;
    	this.SEARCH_SUBMIT_URL = config.baseObjConfig.searchSubmitURL;
	if(config.baseObjConfig.fieldIds && (config.baseObjConfig.fieldIds !== undefined)){
		this.FIELD_CASE_NUMBER_ID = (config.baseObjConfig.fieldIds.caseNumberId && (config.baseObjConfig.fieldIds.caseNumberId !== undefined))? config.baseObjConfig.fieldIds.caseNumberId: this.FIELD_CASE_NUMBER_ID;
		this.FIELD_CREATED_BY_DATE_FROM_ID = (config.baseObjConfig.fieldIds.createdByDateFromId && (config.baseObjConfig.fieldIds.createdByDateFromId !== undefined))? config.baseObjConfig.fieldIds.createdByDateFromId : this.FIELD_CREATED_BY_DATE_FROM_ID;
		this.FIELD_CREATED_BY_DATE_TO_ID = (config.baseObjConfig.fieldIds.createdByDateToId && (config.baseObjConfig.fieldIds.createdByDateToId !== undefined))? config.baseObjConfig.fieldIds.createdByDateToId : this.FIELD_CREATED_BY_DATE_FROM_ID;
		this.FIELD_PROVIDER_NAME_ID = (config.baseObjConfig.fieldIds.providerNameId && (config.baseObjConfig.fieldIds.providerNameId !== undefined))? config.baseObjConfig.fieldIds.providerNameId : this.FIELD_PROVIDER_NAME_ID;    	
		this.FIELD_STATUS_ID = (config.baseObjConfig.fieldIds.statusId && (config.baseObjConfig.fieldIds.statusId !== undefined))? config.baseObjConfig.fieldIds.statusId : this.FIELD_STATUS_ID;
		this.FIELD_FILTER_SOURCE_ID = (config.baseObjConfig.fieldIds.filterSourceId && (config.baseObjConfig.fieldIds.filterSourceId !== undefined))? config.baseObjConfig.fieldIds.filterSourceId : this.FIELD_FILTER_SOURCE_ID;
	}
    	var caseSearchRequiredFieldsArray = [this.FIELD_CASE_NUMBER_ID,this.FIELD_CREATED_BY_DATE_FROM_ID,this.FIELD_CREATED_BY_DATE_TO_ID,this.FIELD_PROVIDER_NAME_ID];
    	this.BUTTON_SEARCH_ID = (config.baseObjConfig.buttonIds.searchButton && (config.baseObjConfig.buttonIds.searchButton !== undefined))? config.baseObjConfig.buttonIds.searchButton : this.BUTTON_SEARCH_ID;
    	var userClassCode = config.baseObjConfig.userClassCode;
    	var ccodePanel = {};
    	if(userClassCode == "INT"){
    		caseSearchRequiredFieldsArray[caseSearchRequiredFieldsArray.length]=this.FIELD_CCODE_NAME_ID;
    		ccodePanel = {
					xtype: 'textfield',
					id: this.FIELD_CCODE_NAME_ID,
					name: this.FIELD_CCODE_NAME_ID,
					fieldLabel:"CCode",
					hideLabel: false,
					allowBlank:true,
					width:200,
					maxLength: 40,
					validateOnBlur:false,
					validationEvent:false,
					validator:function(val_) {
						return casetracking.search.validation.SearchValidator.oneFieldRequiredCheck(caseSearchRequiredFieldsArray);
					}
				};
    	}
    	var defaults = 
    {
    		buttonAlign:"right"
    		,columnWidth:config.columnWidth
    	    	,border:false		
    		,labelAlign:"top"
    		//Beginning of form items
    		,items: [{
    				xtype: "panel"
				,border: false
				,layout:"column"
				,baseCls:'title'
    				,items:	[{
							xtype: "panel"
							,columnWidth:.9
							,html:"<div>Search Service Cases</div>"
						},{
							xtype: "panel"
							,columnWidth:.1	
							,html:"<div class='uradix-form-help-details-icon' style='visibility: visible; float:right;' onclick='casetracking.core.windows.SearchInformation();' title='More Information' onmouseover='document.body.style.cursor=\"pointer\";' onmouseout='document.body.style.cursor=\"default\";'></div>"
						}]
    		},{
    			xtype: 'panel',
    			border:false,
    			ctCls:"support-portal-panel", 
    			style:"padding-top:5px;padding-bottom:10px;",
    			html:"<div></div><div class='casetrackingTextSmall'>Search by Service Case # or other criteria. When<br>searching by other criteria, using more than one<br>will narrow your results.</div>"
    		},{
    			xtype:'panel'
    			,baseCls:"idxm-search-filter-fields-body"
			    ,layout:"form"
        		,labelAlign:"top"    			
    			,items:[
    					{ 
						xtype: 'textfield',
						baseCls:"idxm-search-filter-fields-body",
						id: this.FIELD_CASE_NUMBER_ID,
						name: this.FIELD_CASE_NUMBER_ID,
						fieldLabel:"Service Case #",
						hideLabel: false,
						allowBlank:true,
						width:150,
						maxLength: 40,
						validateOnBlur:false,
						validationEvent:false,
						validator:function(val_) {
							return casetracking.search.validation.SearchValidator.oneFieldRequiredCheck(caseSearchRequiredFieldsArray);
						}				
					}
    			
    			]
    		},{
			xtype: 'panel',
			border:true,
			style:"padding-top:10px; padding-bottom:10px",
			html:"<div class='casetrackingTextMedium'><b><center>OR</center></b></div>"
		},{
    			xtype:'panel'
    			,baseCls:"idxm-search-filter-fields-body"
			,layout:"form"
        		,labelAlign:"top"    			
    			,items:[{
				xtype: "label",
				bodyStyle: "padding-left:15px;",
				text: "Service Case Created Date:",
				cls: "supportPortalFormLabel"
			},{
				xtype: "panel"
				,border: false
				,layout:"column"
				,baseCls:"idxm-search-filter-datefields-body"					
				,width:200
				,items:	[{
							columnWidth:.5
							,layout:"form"
							,border: false
							,labelAlign:"top"
							,baseCls:"idxm-search-filter-datefields-body"
							,items:[{
										xtype:"datefield"
											,name:this.FIELD_CREATED_BY_DATE_FROM_ID
											,id:this.FIELD_CREATED_BY_DATE_FROM_ID
											,fieldLabel: "From"
											,hideLabel: false
											,allowBlank:true
											,msgTarget:"under"
											,maxValue: new Date()
										,validateOnBlur:false
										,validationEvent:false
									    ,validator:function(val_) {		
										return (casetracking.search.validation.SearchValidator.oneFieldRequiredCheck(caseSearchRequiredFieldsArray));							            	
									      }
										,format: 'm/d/Y' 
								}]
							},{
								xtype: "panel"
								,columnWidth:.5
								,layout:"form"
								,border: false
								,labelAlign:"top"
								,baseCls:"idxm-search-filter-datefields-body"
								,style:"padding-top:0px;padding-bottom:10px;"
								,items:[{
										xtype:"datefield"
											,name:this.FIELD_CREATED_BY_DATE_TO_ID
											,id:this.FIELD_CREATED_BY_DATE_TO_ID
											,fieldLabel: "To"
											,hideLabel: false
											,allowBlank:true
											,msgTarget:"under"
											,maxValue: new Date()
										,validateOnBlur:false
										,validationEvent:false
									    ,validator:function(val_) {		
										return (casetracking.search.validation.SearchValidator.oneFieldRequiredCheck(caseSearchRequiredFieldsArray));
									      }
										,format: 'm/d/Y' //mm/dd/YYYY

									}]
						}]							
			},{
				xtype: "panel"
				,border: false
				,layout:"form"
				,baseCls:"idxm-search-filter-datefields-body"				
				,items:[{								
						xtype: "panel"
						,layout:"form"
						,border: true
						,labelAlign:"top"
						,baseCls:"idxm-search-filter-datefields-body"
						,items:[ccodePanel,{
								xtype: 'textfield',
								id: this.FIELD_PROVIDER_NAME_ID,
								name: this.FIELD_PROVIDER_NAME_ID,
								fieldLabel:"Provider Name",
								hideLabel: false,
								allowBlank:true,
								width:200,
								maxLength: 40,
								validateOnBlur:false,
								validationEvent:false,
								validator:function(val_) {
									return casetracking.search.validation.SearchValidator.oneFieldRequiredCheck(caseSearchRequiredFieldsArray);
								}
							},{
								xtype: 'panel',
								border:true,
								baseCls:"idxm-search-filter-datefields-body",
								style:"padding-top:0px;padding-bottom:15px;",
								html:"<div class='casetrackingTextSmall'>Use Practitioner Last Name or Facility Name</div>"
							}]
					}]					
			},{
				xtype: "panel"
				,border: false
				,layout:"form"
				,baseCls:"idxm-search-filter-datefields-body"
				,items:[{								
						xtype: "panel"
						,layout:"form"
						,border: true
						,labelAlign:"top"
						,baseCls:"idxm-search-filter-datefields-body"
						,items:[{
								xtype: "combo",
								mode:"local",
								fieldLabel: "Status",
								allowBlank:true,				
								hiddenName : this.FIELD_STATUS_ID,
								name:this.FIELD_STATUS_ID+"NAME",	
								id:this.FIELD_STATUS_ID+"ID",
								store: new Ext.data.JsonStore({
										fields: new Ext.data.Record.create([{name: 'id'},{name : 'name'}]),
										root : "rows",
										idProperty: "id",
										data:{ "rows":[{id:"All",name:"All"},{id:"OPEN",name:"Open"},{id:"CLOSED",name:"Closed"}]},
										reader: new Ext.data.JsonReader({}, ['id', 'name'])
								}),
								valueField:"id",
								//emptyText: "- Select One -",
								displayField:'name',
								triggerAction: 'all',
								editable:false,
								forceSelection:false,
								selectOnFocus:true,
								width: 100,
								listeners: {
										render : function(){this.el.dom.name = this.name;}
										,select: function() {}
								}
								,typeAhead:true
								,typeAheadDelay:0
								,value:"All"								
							}]
					}]					
			},{
				xtype:"hidden"
				,id:"isAllSearch"
				,name:"isAllSearch"
				,value:"true"
			}]    
			
    		},{
				height:10
			},{
				xtype:"button"
				,id:this.BUTTON_SEARCH_ID
				,style: "float:right;"
				,text:"&nbsp;&nbsp;SEARCH&nbsp;&nbsp;"
				,ctCls :"support-portal-btn"
				,handler:this.filterSearchSubmit
			}]//End of form items
    
    		//Begining of listener
		    ,listeners: 
		    {
				"uradix_enterkey": this.filterSearchSubmit
				,"afterrender":
					function() {
						// Read filter values from cookie
						var _cookieData = uRadixCookieManager.readCookie(this.MPI_SEARCH_COOKIE_NAME);
						uRadixCookieManager.eraseCookie(this.MPI_SEARCH_COOKIE_NAME);
						_cookieData = Ext.util.JSON.decode(_cookieData);
						
						if(!Ext.isEmpty(_cookieData) && ((/posted=1/.test(window.location.hash)) == true))
						{
							this.getForm().setValues(_cookieData);
							
							this.add
							({
								id:this.FIELD_FILTER_SOURCE_ID
								, xtype:"hidden"
								,name:this.FIELD_FILTER_SOURCE_ID
								,value:"cookie"
							});
							this.filterSearchSubmit();
						}
					}
		    }//End of listener       
    };//End of Defaults

    Ext.apply(this, defaults);
    casetracking.search.advanced.ux.panel.FilterControllerPanel.superclass.constructor.call(this, defaults);
  },

  filterSearchSubmit: function()
  {
    var _instance = undefined;

    if(this.getXType() == "casetracking.search.advanced.ux.panel.FilterControllerPanel")
    {
      _instance = this;
    }
    else
    {
      _instance = this.findParentByType("casetracking.search.advanced.ux.panel.FilterControllerPanel");      
    }

    if(_instance.getForm().isValid())
    {
      g_hideStatusBox();
      Ext.getCmp(_instance.BUTTON_SEARCH_ID).disable();
      var _form = _instance.getForm();

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
        uRadixCookieManager.createCookie(_instance.MPI_SEARCH_COOKIE_NAME, Ext.util.JSON.encode(_fieldData), 1);
      }

      var _layoutPanel = _instance.findParentByType("casetracking.search.advanced.ux.panel.LayoutPanel");
      var _resultsPanel = _layoutPanel.findByType("casetracking.search.advanced.ux.panel.ResultsControllerPanel")[0];
      var _filterPanel = _instance;
      var _url = _instance.SEARCH_SUBMIT_URL;

      _filterPanel.el.mask("Searching...", "x-mask-loading");

      _form.submit({
        url: _url,
        isMessageIgnore:true,
        success: function(form,action)
        {
          window.location.hash="posted=1";
          if(Ext.getCmp(_instance.FIELD_FILTER_SOURCE_ID) !== undefined)
          {
            Ext.getCmp(_instance.FIELD_FILTER_SOURCE_ID).setValue("");
          }

          var _resp = Ext.decode(action.response.responseText);
          var _searchList = _resp.caseList;
          var _totalNumberOfRecords = _resp.totalNumberOfRecords;
                   
          if(_searchList.length > 0)
          {
            if(_searchList.length == 1 && (Ext.isEmpty(_resp.filterSource) || _resp.filterSource != "cookie"))
            {
              // Go directly to Case *only* when filterSource is not cookie
              var _caseUrl = _instance.CASEURL +"?caseNumber="+_searchList[0].caseNumber+"&fromSearch=true";
              document.location = _caseUrl;
            }
            else
            {
              // Toggle to ResultsGridPanel and pass results data
              _resultsPanel.toggleResultsPanels({panelId:"GridPanel",searchList:_searchList,totalNumberOfRecords:_totalNumberOfRecords});
              _resultsPanel.toggleTitlePanel({panelId:"TitlePanel",searchList:_searchList});
             
              _filterPanel.el.unmask();
              Ext.getCmp(_instance.BUTTON_SEARCH_ID).enable();
            }
          }
          else
          {
        	//Toggle to No Results Panel
            _resultsPanel.toggleResultsPanels({panelId:"NoResultsPanel"});
            _resultsPanel.toggleTitlePanel({panelId:"TitlePanel"});
            _filterPanel.el.unmask();
            Ext.getCmp(_instance.BUTTON_SEARCH_ID).enable();
          }
        },
        failure: function(form,action)
        {
          g_showStatusBox();
          _filterPanel.el.unmask();
          Ext.getCmp(_instance.BUTTON_SEARCH_ID).enable();
        }
      });
    }
  }

});
Ext.reg('casetracking.search.advanced.ux.panel.FilterControllerPanel', casetracking.search.advanced.ux.panel.FilterControllerPanel);