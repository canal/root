/**
 * Class:   idxm.search.ux.panel.filter.common.FilterUserClassPanel
 *
 * Author: Imran Ahmad - Multiplan 2010
 *
 * Params: @required: id, baseObjConfig
 *         @optional: N/A
 *
 */
Ext.namespace("idxm.search.ux.panel.filter.common.FilterUserClassPanel");
idxm.search.ux.panel.filter.common.FilterUserClassPanel = Ext.extend(Ext.Panel,
{
  NAMESPACE:undefined,
  ID:undefined,
  DATA_USER_CLASS:[{"id":"1","name":"Internal - Person"},
                   {"id":"2","name":"Internal - System/Process"},
                   {"id":"3","name":"Client"},
                   {"id":"4","name":"Vendor"},
                   {"id":"5","name":"Provider"}],

  constructor: function(config)
  {
    this.NAMESPACE = config.baseObjConfig.nameSpace;
    this.ID = config.id;
    if(!Ext.isEmpty(config.baseObjConfig.userClasses)){this.DATA_USER_CLASS=config.baseObjConfig.userClasses;}

    var defaults = {
      items: [{
         id:config.id
        ,layout:"form"
        ,labelAlign:"top"
        ,items:[{
             xtype: "combo"
            ,id:config.id+"Combo"
            ,fieldLabel: "User Class"
            ,hiddenName:"userClass"
            ,mode:"local"
            ,store: new Ext.data.JsonStore({
               fields: ['id', 'name']
              ,root : "rows"
              ,idProperty: "id"
              ,data:{"rows":this.DATA_USER_CLASS}
             })
            ,valueField:"id"
            ,displayField:'name'
            ,allowBlank:false
            ,triggerAction: 'all'
            ,value:"INTERNAL_PERSON"
            ,forceSelection:true
            ,selectOnFocus:true
            ,width: 200
            ,listeners:{
               select:function(combo,record,index) {
                 var controller_ = this.findParentByType("idxm.search.ux.panel.FilterControllerPanel");
                 controller_.toggleFilterPanels(record.id);
               },
               render:function(o) {
                 this.el.dom.name = this.name;
                 var controller_ = this.findParentByType("idxm.search.ux.panel.FilterControllerPanel");
//                 controller_.toggleFilterPanels("INTERNAL_PERSON");
               }
             }
            ,typeAhead:true
            ,typeAheadDelay:0
           }
         ]
       }
      ]
    };

    Ext.apply(this, defaults);
    idxm.search.ux.panel.filter.common.FilterUserClassPanel.superclass.constructor.call(this, defaults);
  }
});
Ext.reg('idxm.search.ux.panel.filter.common.FilterUserClassPanel', idxm.search.ux.panel.filter.common.FilterUserClassPanel);

