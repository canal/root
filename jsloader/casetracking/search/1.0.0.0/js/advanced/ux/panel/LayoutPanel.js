/**
 * Class: casetracking.search.advanced.ux.panel.LayoutPanel
 * Author: Roberto Brenes - MultiPlan 2011
 *
 * Params: @required: id, renderTo, baseObjConfig
 *         @optional: N/A
 *
 */
Ext.namespace("casetracking.search.advanced.ux.panel.LayoutPanel");
casetracking.search.advanced.ux.panel.LayoutPanel = Ext.extend(Ext.Panel,
{
  NAMESPACE:undefined,

  constructor: function(config)
  {
    this.NAMESPACE = config.baseObjConfig.nameSpace;

    var defaults = {
      id:config.id
     ,renderTo:config.renderTo
     ,width:config.baseObjConfig.width                 
     ,bodyBorder: false
     ,border: false
     ,buttonAlign:"right"
     ,layout:"column"
     ,items: [{
         xtype:"casetracking.search.advanced.ux.panel.FilterControllerPanel"
        ,baseObjConfig:config.baseObjConfig
        ,columnWidth: .32
       },
       {
//         title: 'Column 2'
         xtype:"casetracking.search.advanced.ux.panel.ResultsControllerPanel"
        ,baseObjConfig:config.baseObjConfig
        ,columnWidth: .65
       }
      ]
    };

    Ext.apply(this, defaults);
    casetracking.search.advanced.ux.panel.LayoutPanel.superclass.constructor.call(this, defaults);
  }
});
Ext.reg('casetracking.search.advanced.ux.panel.LayoutPanel', casetracking.search.advanced.ux.panel.LayoutPanel);

