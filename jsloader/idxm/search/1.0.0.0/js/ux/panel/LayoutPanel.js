/**
 * Class: idxm.search.ux.panel.LayoutPanel
 * Author: Imran Ahmad - Multiplan 2010
 *
 * Params: @required: id, renderTo, baseObjConfig
 *         @optional: N/A
 *
 */
Ext.namespace("idxm.search.ux.panel.LayoutPanel");
idxm.search.ux.panel.LayoutPanel = Ext.extend(Ext.Panel,
{
  NAMESPACE:undefined,

  constructor: function(config)
  {
    this.NAMESPACE = config.baseObjConfig.nameSpace;

    var defaults = {
      id:config.id
     ,title:"Search User"
     ,ctCls:"support-portal-panel"
     ,renderTo:config.renderTo
     ,width:990
     ,bodyBorder: false
     ,border: false
     ,buttonAlign:"right"
     ,layout:"column"
     ,items: [{
         xtype:"idxm.search.ux.panel.FilterControllerPanel"
        ,baseObjConfig:config.baseObjConfig
        ,columnWidth: .22
       },
       {
//         title: 'Column 2'
         xtype:"idxm.search.ux.panel.ResultsControllerPanel"
        ,baseObjConfig:config.baseObjConfig
        ,columnWidth: .78
       }
      ]
    };

    Ext.apply(this, defaults);
    idxm.search.ux.panel.LayoutPanel.superclass.constructor.call(this, defaults);
  }
});
Ext.reg('idxm.search.ux.panel.LayoutPanel', idxm.search.ux.panel.LayoutPanel);

