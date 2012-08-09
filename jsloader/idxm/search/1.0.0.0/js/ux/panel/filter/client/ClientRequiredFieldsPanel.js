/**
 * Class:   idxm.search.ux.panel.filter.client.ClientRequiredFieldsPanel
 *
 * Author: Imran Ahmad - Multiplan 2010
 *
 * Params: @required: baseObjConfig
 *         @optional: N/A
 *
 */
Ext.namespace("idxm.search.ux.panel.filter.client.ClientRequiredFieldsPanel");
idxm.search.ux.panel.filter.client.ClientRequiredFieldsPanel = Ext.extend(Ext.Panel,
{
  constructor: function(config)
  {
  	
  	var clientRequiredFieldArray = [config.id+"clientEmail"
  									,config.id+"clientLastName"
  									,config.id+"clientFirstName"
  									,config.id+"ClientName"
  									,config.id+"CCode"];
  	
    var defaults = {
      items: [{
         layout:"form"
        ,labelAlign:"top"
        ,baseCls:"idxm-search-filter-fields-body"
        ,items:[{
              xtype:"textfield"
             ,id:config.id+"clientEmail"
             ,name:"email"
             ,fieldLabel:"Email/User ID"
             ,msgTarget:"side"             
             ,validateOnBlur:false
             ,validationEvent:false
             ,validator:function(val_) {
               return idxm.search.validation.SearchValidator.oneFieldRequiredCheck(clientRequiredFieldArray);
              }
           },{
              xtype:"textfield"
             ,id:config.id+"clientLastName"
             ,name:"lastName"
             ,fieldLabel:"Last Name"
             ,msgTarget:"side"
             ,validateOnBlur:false
             ,validationEvent:false
             ,validator:function(val_) {
               return idxm.search.validation.SearchValidator.oneFieldRequiredCheck(clientRequiredFieldArray);
              }
           },{
              xtype:"textfield"
             ,id:config.id+"clientFirstName"
             ,name:"firstName"
             ,fieldLabel:"First Name"
             ,msgTarget:"side"
             ,validateOnBlur:false
             ,validationEvent:false
             ,validator:function(val_) {
               return idxm.search.validation.SearchValidator.oneFieldRequiredCheck(clientRequiredFieldArray);
              }
           },{
              xtype:"textfield"
             ,id:config.id+"ClientName"
             ,name:"clientName"
             ,fieldLabel:"Client Name"
             ,msgTarget:"side"
             ,validateOnBlur:false
             ,validationEvent:false
             ,validator:function(val_) {
               return idxm.search.validation.SearchValidator.oneFieldRequiredCheck(clientRequiredFieldArray);
              }
           },{
              xtype:"textfield"
             ,id:config.id+"CCode"
             ,name:"ccode"
             ,fieldLabel:"CCode"
             ,msgTarget:"side"
             ,validateOnBlur:false
             ,validationEvent:false
             ,validator:function(val_) {
               return idxm.search.validation.SearchValidator.oneFieldRequiredCheck(clientRequiredFieldArray);
              }
           },{
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
    idxm.search.ux.panel.filter.client.ClientRequiredFieldsPanel.superclass.constructor.call(this, defaults);
  }
});
Ext.reg('idxm.search.ux.panel.filter.client.ClientRequiredFieldsPanel', idxm.search.ux.panel.filter.client.ClientRequiredFieldsPanel);

