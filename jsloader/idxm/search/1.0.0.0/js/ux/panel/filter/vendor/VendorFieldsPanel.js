/**
 * Class:   idxm.search.ux.panel.filter.vendor.VendorFieldsPanel
 *
 * Author: Imran Ahmad - Multiplan 2010
 *
 * Params: @required: baseObjConfig
 *         @optional: id
 *
 */
Ext.namespace("idxm.search.ux.panel.filter.vendor.VendorFieldsPanel");
idxm.search.ux.panel.filter.vendor.VendorFieldsPanel = Ext.extend(Ext.Panel,
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
    idxm.search.ux.panel.filter.vendor.VendorFieldsPanel.superclass.constructor.call(this, defaults);
  }
});
Ext.reg('idxm.search.ux.panel.filter.vendor.VendorFieldsPanel', idxm.search.ux.panel.filter.vendor.VendorFieldsPanel);

