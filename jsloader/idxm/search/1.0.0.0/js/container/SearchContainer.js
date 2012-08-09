/**
 * Class: idxm.search.container.SearchContainer
 * Author: Imran Ahmad - Multiplan 2010
 *
 */
Ext.namespace("idxm.search.container.SearchContainer");
idxm.search.container.SearchContainer = Ext.extend(Object,
{
    ID: "idxmSearchLayoutPanel",
    NAMESPACE:undefined,
    RENDERTO:undefined,
    USERCLASSES:undefined,
    LOCATIONS:undefined,
    DEPARTMENTS:undefined,
    STATUSES:undefined,
    VENDORNAMES:undefined,
    RENDERURL:undefined,

    constructor: function(config)
    {
      var defaultArr = {id:"", name:"- Any -"};
      config.locations.unshift(defaultArr);
      config.departments.unshift(defaultArr);
      config.statuses.unshift(defaultArr);

      this.NAMESPACE=config.nameSpace;
      this.RENDERTO=config.renderTo;
      this.USERCLASSES=config.userClasses;
      this.LOCATIONS=config.locations;
      this.DEPARTMENTS=config.departments;
      this.STATUSES=config.statuses;
      this.VENDORNAMES=config.vendorNames;
      this.RENDERURL=config.renderURL;

      this.renderLayoutPanel(config);
    },
    renderLayoutPanel: function(config_)
    {
      var searchLayoutPanel = new idxm.search.ux.panel.LayoutPanel({
         id: this.ID
        ,renderTo:this.RENDERTO
        ,baseObjConfig:config_
      });
    },
    navigate: function(config)
    {
      return;
    }

});

