/**
 * Class:   idxm.search.ux.panel.filter.vendor.VendorRequiredFieldsPanel
 *
 * Author: Imran Ahmad - Multiplan 2010
 *
 * Params: @required: baseObjConfig
 *         @optional: panelType
 *
 */
Ext.namespace("idxm.search.ux.panel.filter.vendor.VendorRequiredFieldsPanel");
idxm.search.ux.panel.filter.vendor.VendorRequiredFieldsPanel = Ext.extend(Ext.Panel,
{
  PANEL_TYPE: "vendor",

  constructor: function(config)
  {
    if(!Ext.isEmpty(config.panelType)) {this.PANEL_TYPE=config.panelType;}

    var defaults = {
      items: [{
         layout:"form"
        ,labelAlign:"top"
        ,baseCls:"idxm-search-filter-fields-body"
        ,items:[{
              xtype:"label"
             ,html:"<b>*Provide at least one:</b><br><br>"
           },
           {
              xtype:"textfield"
             ,id:config.id+this.PANEL_TYPE+"LastName"
             ,name:"lastName"
             ,fieldLabel:"Last Name"
             ,msgTarget:"side"
             ,validateOnBlur:false
             ,validationEvent:false
             ,validator:function(val_) {
               var _curr = this.findParentByType("idxm.search.ux.panel.filter.vendor.VendorRequiredFieldsPanel");
               return idxm.search.validation.SearchValidator.siblingRequiredCheck(val_,config.id+_curr.PANEL_TYPE+"Email");
              }
           },
           {
              xtype:"textfield"
             ,id:config.id+this.PANEL_TYPE+"Email"
             ,name:"email"
             ,fieldLabel:(this.PANEL_TYPE == "vendor")?"Email":"Email/User ID"
             ,msgTarget:"side"
             ,vtype:(this.PANEL_TYPE == "vendor")?"email":undefined
             ,validateOnBlur:false
             ,validationEvent:false
             ,validator:function(val_) {
               var _curr = this.findParentByType("idxm.search.ux.panel.filter.vendor.VendorRequiredFieldsPanel");
               return idxm.search.validation.SearchValidator.siblingRequiredCheck(val_,config.id+_curr.PANEL_TYPE+"LastName");
              }
           }
         ]
       }
      ]
    };

    Ext.apply(this, defaults);
    idxm.search.ux.panel.filter.vendor.VendorRequiredFieldsPanel.superclass.constructor.call(this, defaults);
  }
});
Ext.reg('idxm.search.ux.panel.filter.vendor.VendorRequiredFieldsPanel', idxm.search.ux.panel.filter.vendor.VendorRequiredFieldsPanel);

