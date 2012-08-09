/**
 * Class:   idxm.search.ux.panel.filter.internal.PersonFieldsPanel
 *
 * Author: Imran Ahmad - Multiplan 2010
 *
 * Params: @required: baseObjConfig
 *         @optional: id
 *
 */
Ext.namespace("idxm.search.ux.panel.filter.internal.PersonFieldsPanel");
idxm.search.ux.panel.filter.internal.PersonFieldsPanel = Ext.extend(Ext.Panel,
{
  ID:undefined,

  constructor: function(config)
  {
    if(!Ext.isEmpty(config.id)){this.ID=config.id;}

    var defaults = {
      items: [{
         id:this.ID
        ,layout:"form"
        ,labelAlign:"top"
        ,baseCls:"idxm-search-filter-fields-body"
        ,items:[
           {
              xtype:"textfield"
             ,id:config.id+"FirstName"
             ,name:"firstName"
             ,fieldLabel:"First Name"
           },
           {
              xtype: "combo"
             ,id:config.id+"Location"
             ,fieldLabel: "Location"
             ,name:null
             ,hiddenName:"location"
             ,mode:"local"
             ,store: new Ext.data.JsonStore({
                fields:['id', 'name']
               ,root:"rows"
               ,idProperty:"id"
               ,data:{ "rows":config.baseObjConfig.locations}
              })
             ,valueField:"id"
//             ,emptyText:"- Select One -"
             ,displayField:'name'
             ,triggerAction:'all'
             ,forceSelection:true
             ,selectOnFocus:true
             ,listeners:{
                render:function(){this.el.dom.name = this.name;}
              }
             ,typeAhead:true
             ,typeAheadDelay:0
             ,value:""
           },
           {
              xtype: "combo"
             ,id:config.id+"Department"
             ,fieldLabel: "Department"
             ,name:null
             ,hiddenName:"department"
             ,mode:"local"
             ,store: new Ext.data.JsonStore({
                fields:['id', 'name']
               ,root:"rows"
               ,idProperty:"id"
               ,data:{ "rows":config.baseObjConfig.departments}
              })
             ,valueField:"id"
//             ,emptyText:"- Select One -"
             ,displayField:'name'
             ,triggerAction:'all'
             ,forceSelection:false
             ,selectOnFocus:true
             ,listeners:{
                render:function(){this.el.dom.name = this.name;}
              }
             ,typeAhead:true
             ,typeAheadDelay:0
             ,listWidth:280
             ,value:""
           },
           {
              xtype:"idxm.search.ux.panel.filter.common.StatusComboBox"
             ,id:config.id+"Status"
             ,name:"status"
             ,dataList:config.baseObjConfig.statuses
             ,fieldLabel:"Status"
           }
         ]
       }
      ]
    };

    Ext.apply(this, defaults);
    idxm.search.ux.panel.filter.internal.PersonFieldsPanel.superclass.constructor.call(this, defaults);
  }
});
Ext.reg('idxm.search.ux.panel.filter.internal.PersonFieldsPanel', idxm.search.ux.panel.filter.internal.PersonFieldsPanel);

