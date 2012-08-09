/**
 * Class:   idxm.search.ux.panel.filter.common.StatusComboBox
 *
 * Author: Imran Ahmad - Multiplan 2010
 *
 * Params: @required: dataList
 *         @optional: name, fieldLabel
 *
 */
Ext.namespace("idxm.search.ux.panel.filter.common.StatusComboBox");
idxm.search.ux.panel.filter.common.StatusComboBox = Ext.extend(Ext.form.ComboBox,
{
  constructor: function(config)
  {
    var defaults = {
       fieldLabel: config.fieldLabel
      ,id:config.id
      ,name:null
      ,hiddenName:config.name
      ,mode:"local"
      ,store: new Ext.data.JsonStore({
         fields: ['id', 'name']
        ,root : "rows"
        ,idProperty: "id"
        ,data:{"rows":config.dataList}
       })
      ,valueField:"id"
      ,displayField:'name'
      ,triggerAction: 'all'
      ,forceSelection:true
      ,selectOnFocus:true
//      ,emptyText: "- Any -"
      ,listeners:{
          render:function(){this.el.dom.name = this.name;}
       }
      ,typeAhead:true
      ,typeAheadDelay:0
      ,value:""
    };

    Ext.apply(this, defaults);
    idxm.search.ux.panel.filter.common.StatusComboBox.superclass.constructor.call(this, defaults);
  }
});
Ext.reg('idxm.search.ux.panel.filter.common.StatusComboBox', idxm.search.ux.panel.filter.common.StatusComboBox);

