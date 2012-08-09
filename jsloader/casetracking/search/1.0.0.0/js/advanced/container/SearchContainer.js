/**
 * Class: casetracking.search.advanced.container.SearchContainer
 * Author: Roberto Brenes - MultiPlan 2011
 *
 */
Ext.namespace("casetracking.search.advanced.container.SearchContainer");
casetracking.search.advanced.container.SearchContainer = Ext.extend(Object,
{
    ID: "caseTrackingAdvancedSearchLayoutPanel",
    NAMESPACE:undefined,
    RENDERTO:undefined,
    RENDERURL:undefined,
    WIDTH:"990",

    constructor: function(config)
    {
      this.ID +=config.nameSpace;
      this.NAMESPACE=config.nameSpace;
      this.RENDERTO=config.renderTo;
      this.renderLayoutPanel(config);
      this.WIDTH = (config.width && config.width !== undefined)? config.width : "990";
    },
    renderLayoutPanel: function(config_)
    {
      var searchLayoutPanel = new casetracking.search.advanced.ux.panel.LayoutPanel({
         id: this.ID
        ,renderTo:this.RENDERTO
        ,baseObjConfig:config_
        ,width:this.WIDTH
      });
    },
    navigate: function(config)
    {
      return;
    }

});

