/**
 * Class:   idxm.search.ux.panel.filter.vendor.VendorNameFieldPanel
 *
 * Author: Imran Ahmad - Multiplan 2010
 *
 * Params: @required: baseObjConfig
 *         @optional: N/A
 *
 */
Ext.namespace("idxm.search.ux.panel.filter.vendor.VendorNameFieldPanel");
idxm.search.ux.panel.filter.vendor.VendorNameFieldPanel = Ext.extend(Ext.Panel,
{
  constructor: function(config)
  {
    var defaults = {
      items: [{
         layout:"form"
        ,labelAlign:"top"
        ,baseCls:"idxm-search-filter-fields-body"
        ,items:[{
           xtype: "combo"
          ,id:config.id+"VendorName"
          ,fieldLabel: "Vendor Name"
          ,allowBlank:false
          ,name:null
          ,hiddenName:"vendorCode"
          ,mode:"local"
          ,store: new Ext.data.JsonStore({
             fields:['id', 'name']
            ,root:"rows"
            ,idProperty:"id"
            ,data:{ "rows":config.baseObjConfig.vendorNames}
           })
          ,valueField:"id"
          ,emptyText:"- Select One -"
          ,displayField:'name'
          ,triggerAction:'all'
          ,forceSelection:false
          ,selectOnFocus:true
          ,listeners:{
             render:function(){this.el.dom.name = this.name;}
           }
          ,typeAhead:true
          ,typeAheadDelay:0
         }]
       }
      ]
    };

    Ext.apply(this, defaults);
    idxm.search.ux.panel.filter.vendor.VendorNameFieldPanel.superclass.constructor.call(this, defaults);
  }
});
Ext.reg('idxm.search.ux.panel.filter.vendor.VendorNameFieldPanel', idxm.search.ux.panel.filter.vendor.VendorNameFieldPanel);

