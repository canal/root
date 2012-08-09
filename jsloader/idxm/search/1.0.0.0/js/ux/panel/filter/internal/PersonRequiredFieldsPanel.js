/**
 * Class:   idxm.search.ux.panel.filter.internal.PersonRequiredFieldsPanel
 *
 * Author: Imran Ahmad - Multiplan 2010
 *
 * Params: @required: baseObjConfig
 *         @optional: id
 *
 */
Ext.namespace("idxm.search.ux.panel.filter.internal.PersonRequiredFieldsPanel");
idxm.search.ux.panel.filter.internal.PersonRequiredFieldsPanel = Ext.extend(Ext.Panel,
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
             ,id:config.id+"LastName"
             ,name:"lastName"
             ,fieldLabel:"Last Name"
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
               return idxm.search.validation.SearchValidator.siblingRequiredCheck(val_,config.id+"LastName");
              }
           }
         ]
       }
      ]
    };

    Ext.apply(this, defaults);
    idxm.search.ux.panel.filter.internal.PersonRequiredFieldsPanel.superclass.constructor.call(this, defaults);
  }
});
Ext.reg('idxm.search.ux.panel.filter.internal.PersonRequiredFieldsPanel', idxm.search.ux.panel.filter.internal.PersonRequiredFieldsPanel);

