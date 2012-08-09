/**
 * Class:   idxm.search.ux.panel.filter.provider.ProviderRequiredFieldsPanel
 *
 * Author: Imran Ahmad - Multiplan 2010
 *
 * Params: @required: baseObjConfig
 *         @optional: N/A
 *
 */
Ext.namespace("idxm.search.ux.panel.filter.provider.ProviderRequiredFieldsPanel");
idxm.search.ux.panel.filter.provider.ProviderRequiredFieldsPanel = Ext.extend(Ext.Panel,
{
  constructor: function(config)
  {
  	
  	var providerRequiredFieldArray = [config.id+"providerEmail"
  									,config.id+"providerLastName"
  									,config.id+"providerFirstName"
  									/*,config.id+"ProviderName"
  									,config.id+"CCode"*/];
  	
    var defaults = {
      items: [{
         layout:"form"
        ,labelAlign:"top"
        ,baseCls:"idxm-search-filter-fields-body"
        ,items:[{
              xtype:"textfield"
             ,id:config.id+"providerEmail"
             ,name:"email"
             ,fieldLabel:"Email"
             ,msgTarget:"side"             
             ,validateOnBlur:false
             ,validationEvent:false
             ,validator:function(val_) {
               return idxm.search.validation.SearchValidator.oneFieldRequiredCheck(providerRequiredFieldArray);
              }
           },{
               xtype:"textfield"
               ,id:config.id+"providerFirstName"
               ,name:"firstName"
               ,fieldLabel:"First Name"
               ,msgTarget:"side"
               ,validateOnBlur:false
               ,validationEvent:false
               ,validator:function(val_) {
                 return idxm.search.validation.SearchValidator.oneFieldRequiredCheck(providerRequiredFieldArray);
                }
            },{
               xtype:"textfield"
               ,id:config.id+"providerLastName"
               ,name:"lastName"
               ,fieldLabel:"Last Name"
               ,msgTarget:"side"
               ,validateOnBlur:false
               ,validationEvent:false
               ,validator:function(val_) {
                return idxm.search.validation.SearchValidator.oneFieldRequiredCheck(providerRequiredFieldArray);
              }
           }/*,{
              xtype:"textfield"
             ,id:config.id+"CCode"
             ,name:"ccode"
             ,fieldLabel:"CCode"
             ,msgTarget:"side"
             ,validateOnBlur:false
             ,validationEvent:false
             ,validator:function(val_) {
               return idxm.search.validation.SearchValidator.oneFieldRequiredCheck(providerRequiredFieldArray);
              }
           },{
              xtype:"idxm.search.ux.panel.filter.common.StatusComboBox"
             ,id:config.id+"Status"
             ,name:"status"
             ,dataList:config.baseObjConfig.statuses
             ,fieldLabel:"Status"             
           }*/
         ]
       }
      ]
    };

    Ext.apply(this, defaults);
    idxm.search.ux.panel.filter.provider.ProviderRequiredFieldsPanel.superclass.constructor.call(this, defaults);
  }
});
Ext.reg('idxm.search.ux.panel.filter.provider.ProviderRequiredFieldsPanel', idxm.search.ux.panel.filter.provider.ProviderRequiredFieldsPanel);

