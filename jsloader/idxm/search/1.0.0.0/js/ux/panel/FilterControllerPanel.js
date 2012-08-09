/**
 * Class:   idxm.search.ux.panel.FilterControllerPanel
 * Extends: uRadix.form.FormPanel
 *
 * Author: Imran Ahmad - Multiplan 2010
 *
 * Params: @required: baseObjConfig, columnWidth
 *         @optional: N/A
 *
 */
Ext.namespace("idxm.search.ux.panel.FilterControllerPanel");
idxm.search.ux.panel.FilterControllerPanel = Ext.extend(uRadix.form.FormPanel,
{
  NAMESPACE:undefined,
  PREFIX_ID:"idxmFilterPanel",
  FILTER_PANELS_ARR:["InternalPersonPanel","InternalSystemPanel","ClientPanel","VendorPanel", "ProviderPanel"],
  CLASS_PANELS_MAP: {"INTERNAL_PERSON":"InternalPersonPanel",
                     "INTERNAL_SYS_DEVICE":"InternalSystemPanel",
                     "CLIENT":"ClientPanel",
                     "VENDOR":"VendorPanel",
                     "PROVIDER":"ProviderPanel"},
  RENDERURL: undefined,
  SEARCH_SUBMIT_ACTION: "searchUserSubmit",
  MPI_SEARCH_COOKIE_NAME: "$$mpi_idxm_search_filters$$",

  constructor: function(config)
  {
    this.NAMESPACE = config.baseObjConfig.nameSpace;
    this.RENDERURL = config.baseObjConfig.renderURL;
    this.PROFILEURL = config.baseObjConfig.userProfileURL;
    this.MPI_SEARCH_COOKIE_NAME = this.MPI_SEARCH_COOKIE_NAME+this.NAMESPACE;

    var defaults = {
      buttonAlign:"right"
     ,columnWidth:config.columnWidth
     ,style:"padding-top:10px;"
     ,items: [{
         xtype:"idxm.search.ux.panel.filter.common.FilterUserClassPanel"
        ,id:this.PREFIX_ID+"UserClass"
        ,baseObjConfig:config.baseObjConfig
       },
       {
         id:this.PREFIX_ID+"InternalPersonPanel"
        ,hidden:false
        ,items:[{
             xtype:"idxm.search.ux.panel.filter.internal.PersonRequiredFieldsPanel"
            ,id:this.PREFIX_ID+"InternalPersonPanelRequiredFields"
            ,baseObjConfig:config.baseObjConfig
           },
           {style:"padding-top:10px;"},
           {
             xtype:"idxm.search.ux.panel.filter.internal.PersonFieldsPanel"
            ,id:this.PREFIX_ID+"InternalPersonPanelFields"
            ,baseObjConfig:config.baseObjConfig
           }
         ]
       },
       {
         id:this.PREFIX_ID+"InternalSystemPanel"
        ,hidden:true
        ,items:[{
             xtype:"idxm.search.ux.panel.filter.internal.SystemRequiredFieldsPanel"
            ,id:this.PREFIX_ID+"InternalSystemPanelRequiredFields"
            ,baseObjConfig:config.baseObjConfig
           },
           {style:"padding-top:10px;"},
           {
             xtype:"idxm.search.ux.panel.filter.internal.SystemFieldsPanel"
            ,id:this.PREFIX_ID+"InternalSystemPanelFields"
            ,baseObjConfig:config.baseObjConfig
           }
         ]
       },
       {
         id:this.PREFIX_ID+"ClientPanel"
        ,hidden:true
        ,items:[{
             xtype:"idxm.search.ux.panel.filter.client.ClientRequiredFieldsPanel"
            ,id:this.PREFIX_ID+"ClientPanelRequiredFields"
            ,baseObjConfig:config.baseObjConfig
           }
           /*,
           {html:"<center><font style='font-size:14px; font-weight:bold;'>AND</font></center>", style:"padding-top:10px; padding-bottom:10px;"},
           {
             xtype:"idxm.search.ux.panel.filter.vendor.VendorRequiredFieldsPanel"
            ,id:this.PREFIX_ID+"ClientPanelRequiredFields2"
            ,baseObjConfig:config.baseObjConfig
            ,panelType:"client"
           },*/
           /*{style:"padding-top:10px;"},
           {
             xtype:"idxm.search.ux.panel.filter.vendor.VendorFieldsPanel"
            ,id:this.PREFIX_ID+"ClientPanelFields"
            ,baseObjConfig:config.baseObjConfig
           }*/
         ]
       },
       {
         id:this.PREFIX_ID+"VendorPanel"
        ,hidden:true
        ,items:[{
             xtype:"idxm.search.ux.panel.filter.vendor.VendorNameFieldPanel"
            ,id:this.PREFIX_ID+"VendorPanelNameFields"
            ,baseObjConfig:config.baseObjConfig
           },
           {style:"padding-top:10px;"},
           {
             xtype:"idxm.search.ux.panel.filter.vendor.VendorRequiredFieldsPanel"
            ,id:this.PREFIX_ID+"VendorPanelRequiredFields"
            ,baseObjConfig:config.baseObjConfig
           },
           {style:"padding-top:10px;"},
           {
             xtype:"idxm.search.ux.panel.filter.vendor.VendorFieldsPanel"
            ,id:this.PREFIX_ID+"VendorPanelFields"
            ,baseObjConfig:config.baseObjConfig
           }
         ]
       },
       {
           id:this.PREFIX_ID+"ProviderPanel"
          ,hidden:true
          ,items:[{
               xtype:"idxm.search.ux.panel.filter.provider.ProviderRequiredFieldsPanel"
              ,id:this.PREFIX_ID+"ProviderPanelRequiredFields"
              ,baseObjConfig:config.baseObjConfig
             }
             /*,
             {html:"<center><font style='font-size:14px; font-weight:bold;'>AND</font></center>", style:"padding-top:10px; padding-bottom:10px;"},
             {
               xtype:"idxm.search.ux.panel.filter.vendor.VendorRequiredFieldsPanel"
              ,id:this.PREFIX_ID+"ClientPanelRequiredFields2"
              ,baseObjConfig:config.baseObjConfig
              ,panelType:"client"
             },*/
             /*{style:"padding-top:10px;"},
             {
               xtype:"idxm.search.ux.panel.filter.vendor.VendorFieldsPanel"
              ,id:this.PREFIX_ID+"ClientPanelFields"
              ,baseObjConfig:config.baseObjConfig
             }*/
           ]
       },
       {height:10},
       {
         xtype:"button"
        ,id:"searchButton"
        ,style: "float:right;"
        ,text:"&nbsp;&nbsp;SEARCH&nbsp;&nbsp;"
        ,ctCls :"support-portal-btn"
        ,handler:this.filterSearchSubmit
       }
      ]
     ,listeners: {
        "uradix_enterkey": this.filterSearchSubmit
       ,"afterrender":function() {
          // Read filter values from cookie
          var _cookieData = uRadixCookieManager.readCookie(this.MPI_SEARCH_COOKIE_NAME);
          uRadixCookieManager.eraseCookie(this.MPI_SEARCH_COOKIE_NAME);
          _cookieData = Ext.util.JSON.decode(_cookieData);

          if(!Ext.isEmpty(_cookieData) && ((/posted=1/.test(window.location.hash)) == true))
          {
            this.getForm().setValues(_cookieData);
            this.toggleFilterPanels(Ext.getCmp(this.PREFIX_ID+"UserClassCombo").getValue());
            this.add({id:"_idxm_search_source_hidden_field", xtype:"hidden",
                      name:"filterSource", value:"cookie"});
            this.filterSearchSubmit();
          }
          else
          {
            this.toggleFilterPanels("INTERNAL_PERSON");
          }
        }
      }
    };

    Ext.apply(this, defaults);
    idxm.search.ux.panel.FilterControllerPanel.superclass.constructor.call(this, defaults);
  },

  filterSearchSubmit: function()
  {
    var _instance = undefined;

    if(this.getXType() == "idxm.search.ux.panel.FilterControllerPanel")
    {
      _instance = this;
    }
    else
    {
      _instance = this.findParentByType("idxm.search.ux.panel.FilterControllerPanel");      
    }

    if(_instance.getForm().isValid())
    {
      g_hideStatusBox();
      Ext.getCmp("searchButton").disable();
      var _form = _instance.getForm();

      // Assemble field values for cookie store
      var _fieldData = new Array();
      _instance.findBy(function(c,ct){
        if(c.isFormField)
        {
          if(!Ext.isEmpty(c.getValue()) && !c.disabled)
          {
            _fieldData.push({"id":c.id,"value":c.getValue()});
          }
        }
      },this);

      if(!Ext.isEmpty(_fieldData))
      {
        uRadixCookieManager.createCookie(_instance.MPI_SEARCH_COOKIE_NAME, Ext.util.JSON.encode(_fieldData), 1);
      }

      var _layoutPanel = _instance.findParentByType("idxm.search.ux.panel.LayoutPanel");
      var _resultsPanel = _layoutPanel.findByType("idxm.search.ux.panel.ResultsControllerPanel")[0];
      var _filterPanel = _instance;
      var _url = _instance.RENDERURL+"?action="+_instance.SEARCH_SUBMIT_ACTION;
      var _fldPrefix = _instance.PREFIX_ID;

      _filterPanel.el.mask("Searching...", "x-mask-loading");

      _form.submit({
        url: _url,
        isMessageIgnore:true,
        success: function(form,action)
        {
          window.location.hash="posted=1";
          if(Ext.getCmp("_idxm_search_source_hidden_field") !== undefined)
          {
            Ext.getCmp("_idxm_search_source_hidden_field").setValue("");
          }

          var _resp = Ext.decode(action.response.responseText);
          var _searchList = _resp.searchUserList;
          if(_searchList.length > 0)
          {
            if(_searchList.length == 1 && (Ext.isEmpty(_resp.filterSource) || _resp.filterSource != "cookie"))
            {
              // Go directly to User Profile *only* when filterSource is not cookie
              var _profileUrl = _instance.PROFILEURL +"?systemUserId="+_searchList[0].sysKey;
              document.location = _profileUrl;
            }
            else
            {
              // Toggle to ResultsGridPanel and pass type, data
              var _usrClassFld = _form.findField("userClass");
              _resultsPanel.toggleResultsPanels({panelId:"GridPanel"
                 ,userClassType:_usrClassFld.getValue()
                 ,searchList:_searchList
              });

              _filterPanel.el.unmask();
              Ext.getCmp("searchButton").enable();
            }
          }
          else
          {
            _resultsPanel.toggleResultsPanels({panelId:"NoResultsPanel"});
            _filterPanel.el.unmask();
            Ext.getCmp("searchButton").enable();
          }
        },
        failure: function(form,action)
        {
          g_showStatusBox();
          _filterPanel.el.unmask();
          Ext.getCmp("searchButton").enable();
        }
      });
    }
  },

  toggleFilterPanels: function(userClass_)
  {
    for(i=0;i<this.FILTER_PANELS_ARR.length;i++)
    {
      Ext.getCmp(this.PREFIX_ID+this.FILTER_PANELS_ARR[i]).hide();
      Ext.getCmp(this.PREFIX_ID+this.FILTER_PANELS_ARR[i]).disable();
      Ext.getCmp(this.PREFIX_ID+this.FILTER_PANELS_ARR[i]).cascade(function(item){
        if(item.isFormField)
        {
          item.hide();
          item.disable();
        }
      });
    }

    Ext.getCmp(this.PREFIX_ID+this.CLASS_PANELS_MAP[userClass_]).enable();
    Ext.getCmp(this.PREFIX_ID+this.CLASS_PANELS_MAP[userClass_]).show();
    Ext.getCmp(this.PREFIX_ID+this.CLASS_PANELS_MAP[userClass_]).cascade(function(item){
      if(item.isFormField)
      {
        item.show();
        item.enable();
      }
    });

    this.doLayout();
  }

});
Ext.reg('idxm.search.ux.panel.FilterControllerPanel', idxm.search.ux.panel.FilterControllerPanel);

