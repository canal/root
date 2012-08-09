/**
 * Class:   idxm.search.ux.panel.filter.internal.SystemRequiredFieldsPanel
 *
 * Author: Imran Ahmad - Multiplan 2010
 *
 * Params: @required: baseObjConfig
 *         @optional: id
 *
 */
Ext.namespace("idxm.search.ux.panel.filter.internal.SystemRequiredFieldsPanel");
idxm.search.ux.panel.filter.internal.SystemRequiredFieldsPanel = Ext.extend(Ext.Panel,
{
  constructor: function(config)
  {
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
             ,id:config.id+"Name"
             ,name:"name"
             ,fieldLabel:"Name"
             ,msgTarget:"side"
             ,validateOnBlur:false
             ,validationEvent:false
             ,validator:function(val_) {
               return idxm.search.validation.SearchValidator.siblingRequiredCheck(val_,config.id+"UserId");
              }
           },
           {
              xtype:"textfield"
             ,id:config.id+"UserId"
             ,name:"userID"
             ,fieldLabel:"User ID"
             ,msgTarget:"side"
             ,validateOnBlur:false
             ,validationEvent:false
             ,validator:function(val_) {
               return idxm.search.validation.SearchValidator.siblingRequiredCheck(val_,config.id+"Name");
              }
           }
         ]
       }
      ]
    };

    Ext.apply(this, defaults);
    idxm.search.ux.panel.filter.internal.SystemRequiredFieldsPanel.superclass.constructor.call(this, defaults);
  }
});
Ext.reg('idxm.search.ux.panel.filter.internal.SystemRequiredFieldsPanel', idxm.search.ux.panel.filter.internal.SystemRequiredFieldsPanel);

