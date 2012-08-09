/**
 * Class:   idxm.search.ux.panel.ResultsControllerPanel
 *
 * Author: Imran Ahmad - Multiplan 2010
 *
 * Params: @required: baseObjConfig, columnWidth
 *         @optional: N/A
 *
 */
Ext.namespace("idxm.search.ux.panel.ResultsControllerPanel");
idxm.search.ux.panel.ResultsControllerPanel = Ext.extend(Ext.Panel,
{
  NAMESPACE:undefined,
  PREFIX_ID:"idxmSearchResults",
  RESULTS_PANELS_ARR:["NoResultsPanel","TooManyResultsPanel","GridPanel"],
  RENDERURL: undefined,

  constructor: function(config)
  {
    this.NAMESPACE = config.baseObjConfig.nameSpace;
    this.RENDERURL = config.baseObjConfig.renderURL;

    var defaults = {
      columnWidth:config.columnWidth
     ,style:"padding-top:10px;padding-left:30px;"
     ,items: [{
         xtype:"idxm.search.ux.panel.results.common.ResultsContentPanel"
        ,id:this.PREFIX_ID+"NoResultsPanel"
        ,baseObjConfig:config.baseObjConfig
        ,content:"Your Search Produced No Results"
        ,hidden:true
       },
       {
         xtype:"idxm.search.ux.panel.results.common.ResultsContentPanel"
        ,id:this.PREFIX_ID+"TooManyResultsPanel"
        ,baseObjConfig:config.baseObjConfig
        ,content:"Your Search Produced Too Many Results"
        ,hidden:true
       },
       {
         xtype:"idxm.search.ux.panel.results.common.ResultsGridPanel"
        ,id:this.PREFIX_ID+"GridPanel"
        ,baseObjConfig:config.baseObjConfig
        ,hidden:true
       }
      ]
    };

    Ext.apply(this, defaults);
    idxm.search.ux.panel.ResultsControllerPanel.superclass.constructor.call(this, defaults);
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
      this.reconfigureGrid({"userClassType":obj.userClassType,
                            "searchList":obj.searchList});
    }

    this.doLayout();
  },

  /**
   * @config params: userClassType, searchList
   */
  reconfigureGrid: function(o)
  {
    var _userClassType = o.userClassType;
    var _searchUserList = o.searchList;
    var _gridPanel = Ext.getCmp(this.PREFIX_ID+"GridPanel");

    var _store;
    var _colModel;

    switch(_userClassType)
    {
      case "INTERNAL_PERSON":
      {
         _colModel = new Ext.grid.ColumnModel({
           columns:[
             {id:'name', header: 'Name', sortable: true, dataIndex:"name"}
            ,{header: 'User ID', sortable: true, dataIndex:"userID"}
            ,{header: 'Location', sortable: true, dataIndex:"locationName"}
            ,{header: 'Department', sortable: true, dataIndex:"departmentName"}
            ,{header: 'Status', sortable: true, dataIndex:"statusName"}
//            ,{sortable: true, dataIndex:"sysKey", renderer:this.sysKeyRenderer, width:18}
           ]
          ,defaults: {
             sortable: true
            ,menuDisabled: true
           }
         });

         _store = new Ext.data.Store({
           reader: new Ext.data.JsonReader({
             root: 'searchUserList'
            ,fields: [
               {name: 'name', mapping:'lastName+", "+obj.firstName'}
              ,{name: 'userID'}
              ,{name: 'locationName'}
              ,{name: 'departmentName'}
              ,{name: 'statusName'}
              ,{name: 'sysKey'}
             ]
           })
          ,data:{"searchUserList":_searchUserList}
         });

         break;
      }
      case "INTERNAL_SYS_DEVICE":
      {
         _colModel = new Ext.grid.ColumnModel({
           columns:[
             {id:'name', header: 'Name', sortable: true, dataIndex:"name"}
            ,{header: 'User ID', sortable: true, dataIndex:"userID"}
            ,{header: 'Type', sortable: true, dataIndex:"type", renderer:this.getSystemDeviceLabel}
            ,{header: 'Owner', sortable: true, dataIndex:"owner"}
            ,{header: 'Status', sortable: true, dataIndex:"statusName"}
//            ,{sortable: true, dataIndex:"sysKey", renderer:this.sysKeyRenderer, width:18}
           ]
          ,defaults: {
             sortable: true
            ,menuDisabled: true
           }
         });

         _store = new Ext.data.Store({
           reader: new Ext.data.JsonReader({
             root: 'searchUserList'
            ,fields: [
               {name: 'name', mapping:'systemProcessName'}
              ,{name: 'userID'}
              ,{name: 'type'}
              ,{name: 'owner', mapping:'systemProcessOwnerUserID'}
              ,{name: 'statusName'}
              ,{name: 'sysKey'}
             ]
           })
          ,data:{"searchUserList":_searchUserList}
         });

         break;
      }
      case "CLIENT":
      {
         _colModel = new Ext.grid.ColumnModel({
           columns:[
             {id:'name', header: 'Name', sortable: true, dataIndex:"name", width:70}
            ,{header: 'Email/User ID', sortable: true, dataIndex:"email", width:140}
            ,{header: 'Client', sortable: true, dataIndex:"client"}
            ,{header: 'Status', sortable: true, dataIndex:"statusName"}
//            ,{sortable: true, dataIndex:"sysKey", renderer:this.sysKeyRenderer, width:18}
           ]
          ,defaults: {
             sortable: true
            ,menuDisabled: true
           }
         });

         _store = new Ext.data.Store({
           reader: new Ext.data.JsonReader({
             root: 'searchUserList'
            ,fields: [
               {name: 'name', mapping:'lastName+", "+obj.firstName'}
              ,{name: 'email', mapping:'userID'}
              ,{name: 'client', mapping:'organizationName'}
              ,{name: 'statusName'}
              ,{name: 'sysKey'}
             ]
           })
          ,data:{"searchUserList":_searchUserList}
         });

         break;
      }
      case "VENDOR":
      {
         _colModel = new Ext.grid.ColumnModel({
           columns:[
             {id:'name', header: 'Name', sortable: true, dataIndex:"name", width:70}
            ,{header: 'Email', sortable: true, dataIndex:"email", width:140}
            ,{header: 'Vendor Name', sortable: true, dataIndex:"vendorName"}
            ,{header: 'Status', sortable: true, dataIndex:"statusName"}
//            ,{sortable: true, dataIndex:"sysKey", renderer:this.sysKeyRenderer, width:18}
           ]
          ,defaults: {
             sortable: true
            ,menuDisabled: true
           }
         });

         _store = new Ext.data.Store({
           reader: new Ext.data.JsonReader({
             root: 'searchUserList'
            ,fields: [
               {name: 'name', mapping:'lastName+", "+obj.firstName'}
              ,{name: 'email', mapping:'userID'}
              ,{name: 'vendorName', mapping:'organizationName'}
              ,{name: 'statusName'}
              ,{name: 'sysKey'}
             ]
           })
          ,data:{"searchUserList":_searchUserList}
         });

         break;
      }
      case "PROVIDER":
      {
         _colModel = new Ext.grid.ColumnModel({
           columns:[
             {id:'name', header: 'Name', sortable: true, dataIndex:"name", width:70}
            ,{header: 'Email/User ID', sortable: true, dataIndex:"email", width:140}            
            ,{header: 'Status', sortable: true, dataIndex:"statusName"}
//            ,{sortable: true, dataIndex:"sysKey", renderer:this.sysKeyRenderer, width:18}
           ]
          ,defaults: {
             sortable: true
            ,menuDisabled: true
           }
         });

         _store = new Ext.data.Store({
           reader: new Ext.data.JsonReader({
             root: 'searchUserList'
            ,fields: [
               {name: 'name', mapping:'lastName+", "+obj.firstName'}
              ,{name: 'email', mapping:'userID'}              
              ,{name: 'statusName'}
              ,{name: 'sysKey'}
             ]
           })
          ,data:{"searchUserList":_searchUserList}
         });

         break;
      }
    }

    if((!Ext.isEmpty(_store)) && (!Ext.isEmpty(_colModel)))
    {
      _gridPanel.reconfigure(_store, _colModel);
    }

    return;
  },

  sysKeyRenderer: function(value, metaData, record, rowIndex, colIndex, store)
  {
    return "<a href='./profile/userProfileAdministration.psml?systemUserId="+value+"' class='icon-search-contextmenu'></a>";
  },

  getSystemDeviceLabel: function(value, metaData, record, rowIndex, colIndex, store)
  {
    return "System/Process";
  }

});
Ext.reg('idxm.search.ux.panel.ResultsControllerPanel', idxm.search.ux.panel.ResultsControllerPanel);

