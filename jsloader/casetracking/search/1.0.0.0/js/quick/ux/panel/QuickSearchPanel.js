/**
 * Class:   casetracking.search.quick.ux.panel.QuickSearchPanel
 * Extends: uRadix.form.FormPanel
 *
 * Author: Roberto Brenes - MultiPlan 2011
 *
 * Params: @required: baseObjConfig, columnWidth
 *         @optional: N/A
 *
 */
Ext.namespace("casetracking.search.quick.ux.panel.QuickSearchPanel");
casetracking.search.quick.ux.panel.QuickSearchPanel = Ext.extend(uRadix.form.FormPanel,
{
  NAMESPACE:undefined,
  PREFIX_ID:"caseTrackingFilterPanel",
  RENDERURL: undefined,
  CASEURL: undefined,
  OPEN_CASE_URL:undefined,
  SEARCH_CASE_URL:undefined,
  SEARCH_SUBMIT_URL: undefined,
  QUICK_SEARCH_SUBMIT_URL: undefined,
  MPI_SEARCH_COOKIE_NAME: "$$mpi_casetracking_search_filters$$",
  FIELD_CASE_NUMBER_ID:"caseNumber",
  FIELD_CREATED_BY_DATE_FROM_ID:"createdByDateFrom",
  FIELD_CREATED_BY_DATE_TO_ID:"createdByDateTo",
  BUTTON_SEARCH_ID:"searchButton",

  constructor: function(config)
  {
    this.NAMESPACE = config.nameSpace;
    this.RENDERURL = config.renderURL;
    this.CASEURL = config.caseURL;
    this.OPEN_CASE_URL = config.openCaseURL;
    this.SEARCH_CASE_URL = config.searchCaseURL;
    this.SEARCH_SUBMIT_URL = config.searchSubmitURL;
    this.QUICK_SEARCH_SUBMIT_URL = config.quickSearchSubmitURL;
    this.MPI_SEARCH_COOKIE_NAME = this.MPI_SEARCH_COOKIE_NAME;
    if(config.fieldIds && (config.fieldIds !== undefined)){
    	this.FIELD_CASE_NUMBER_ID = (config.fieldIds.caseNumberId && (config.fieldIds.caseNumberId !== undefined))? config.fieldIds.caseNumberId: this.FIELD_CASE_NUMBER_ID;
    	this.FIELD_CREATED_BY_DATE_FROM_ID = (config.fieldIds.createdByDateFromId && (config.fieldIds.createdByDateFromId !== undefined))? config.fieldIds.createdByDateFromId : this.FIELD_CREATED_BY_DATE_FROM_ID;
    	this.FIELD_CREATED_BY_DATE_TO_ID = (config.fieldIds.createdByDateToId && (config.fieldIds.createdByDateToId !== undefined))? config.fieldIds.createdByDateToId : this.FIELD_CREATED_BY_DATE_FROM_ID;
    }
    var caseSearchRequiredFieldsArray = [this.FIELD_CASE_NUMBER_ID,this.FIELD_CREATED_BY_DATE_FROM_ID,this.FIELD_CREATED_BY_DATE_TO_ID];
    this.BUTTON_SEARCH_ID = (config.buttonIds.searchButton && (config.buttonIds.searchButton !== undefined))? config.buttonIds.searchButton : this.BUTTON_SEARCH_ID;    
    
    var defaults = 
    {
    		buttonAlign:"right"
    	    	,border:false
    	    	,renderTo:config.renderTo
    		,labelAlign:"top"
    		,items: [{
    			xtype:"panel"
    			,border:false
    			,html:"<div class='form-open-case-icon' style='visibility: visible;' onclick='Ext.getBody().mask(\"Open Service Case...\", \"x-mask-loading\"); window.location=\""+this.OPEN_CASE_URL+"\";' onmouseover=\"document.body.style.cursor=\'pointer\';\" onmouseout=\"document.body.style.cursor=\'default\';\"></div>"
    		},{
    			xtype: 'panel',
    			border:false,
    			title:"Search Service Cases",
    			ctCls:"support-portal-panel", 
    			style:"padding-top:5px;padding-bottom:5px;",
    			html:"<table width='100%'><tr><td align='right'><div onclick='Ext.getBody().mask(\"Advanced Search...\", \"x-mask-loading\"); window.location=\""+this.SEARCH_CASE_URL+"\";' onmouseover=\"document.body.style.cursor=\'pointer\';\" onmouseout=\"document.body.style.cursor=\'default\';\"><a href='#' class='casetrackingLink'>More Search Options</a></div></td></tr></table></div>"
    		},{ 
				xtype: 'textfield',
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
			},{
				xtype: 'panel',
				border:true,
				html:"<div class='casetrackingTextMedium'><b>OR</b></div>"
			},{
				height:10
			},{
				xtype: "label",
				bodyStyle: "padding-left:15px;",
				text: "Service Case Created Date:",
				cls: "supportPortalFormLabel"
			},{
				xtype: "panel"
				,border: false
				,layout:"column"
				,width:250
				,items:	[{
						xtype: "panel"
						,columnWidth:.5
				       		,layout:"form"
				       		,border: false
				       		,labelAlign:"top"
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
									return casetracking.search.validation.SearchValidator.oneFieldRequiredCheck(caseSearchRequiredFieldsArray);
								}	
									}]
						},{
							xtype: "panel"
							,columnWidth:.5
							,layout:"form"
							,border: false
							,labelAlign:"top"
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
										return casetracking.search.validation.SearchValidator.oneFieldRequiredCheck(caseSearchRequiredFieldsArray);
									}								
								}]
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
						//var _cookieData = uRadixCookieManager.readCookie(this.MPI_SEARCH_COOKIE_NAME);
						//_cookieData = Ext.util.JSON.decode(_cookieData);						
						//this.getForm().setValues(_cookieData);
					}
		    }//End of listener
 
    };//End of Defaults
    
    Ext.apply(this, defaults);
    casetracking.search.quick.ux.panel.QuickSearchPanel.superclass.constructor.call(this, defaults);
  },

  filterSearchSubmit: function()
  {
    var _instance = undefined;

    if(this.getXType() == "casetracking.search.quick.ux.panel.QuickSearchPanel")
    {
      _instance = this;
    }
    else
    {
      _instance = this.findParentByType("casetracking.search.quick.ux.panel.QuickSearchPanel");      
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
      
      _instance.el.mask("Searching...", "x-mask-loading");      
           
      var caseNumberField = Ext.getCmp(_instance.FIELD_CASE_NUMBER_ID);
      var caseNumberValue = caseNumberField.getValue();
      caseNumberValue = (caseNumberValue && caseNumberValue.trim())? caseNumberValue.trim():caseNumberValue;
      
      //Begin: If We have a case value
      if(caseNumberValue){      	
      
	      //Begin: Form Submit
	      _form.submit({
	          url: _instance.SEARCH_SUBMIT_URL,
	          isMessageIgnore:true,
	          success: function(form,action)
	          {
	
	            var _resp = Ext.decode(action.response.responseText);
	            var _searchList = _resp.caseList;
	            var _totalNumberOfRecords = _resp.totalNumberOfRecords;
	                     
	            if(_searchList.length > 0 && _totalNumberOfRecords > 0)
	            {
	            	window.location = _instance.CASEURL+"?caseNumber="+caseNumberValue;  
	            }
	            else
	            {
	              caseNumberField.markInvalid("None Found","Your search returned no results");
	              _instance.el.unmask();
	              Ext.getCmp(_instance.BUTTON_SEARCH_ID).enable();
	            }
	          },
	          failure: function(form,action)
	          {
	        	caseNumberField.markInvalid("None Found","Your search returned no results");
	            g_showStatusBox();
	            _instance.el.unmask();
	            Ext.getCmp(_instance.BUTTON_SEARCH_ID).enable();
	          }
	        }); //End Of Submit
	    
      }else{
      	  	      //Begin: Form Submit
	  	      _form.submit({
	  	          url: _instance.QUICK_SEARCH_SUBMIT_URL,
	  	          isMessageIgnore:true,
	  	          success: function(form,action)
	  	          {	  		  	                     
	  	            window.location = _instance.SEARCH_CASE_URL+"?#posted=1";  
	  	          },
	  	          failure: function(form,action)
	  	          {	  	        	
	  	            _instance.el.unmask();
	  	            Ext.getCmp(_instance.BUTTON_SEARCH_ID).enable();
	  	          }
	        }); //End Of Submit
    	  
      }//End: If we have a case value
    }
  }

});
Ext.reg('casetracking.search.quick.ux.panel.QuickSearchPanel', casetracking.search.quick.ux.panel.QuickSearchPanel);