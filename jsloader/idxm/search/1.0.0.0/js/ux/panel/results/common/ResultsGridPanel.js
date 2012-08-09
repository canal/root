/**
 * Class:   idxm.search.ux.panel.results.common.ResultsGridPanel
 *
 * Author: Imran Ahmad - Multiplan 2010
 *
 * Params: @required: id, baseObjConfig, content
 *         @optional: N/A
 *
 */
Ext.namespace("idxm.search.ux.panel.results.common.ResultsGridPanel");
idxm.search.ux.panel.results.common.ResultsGridPanel = Ext.extend(Ext.grid.GridPanel,
{
  constructor: function(config)
  {  	
    var defaults = {
       cls:"idxm-grid"
      ,frame:false
      ,autoHeight:true
//      ,height: 350
      ,colModel: new Ext.grid.ColumnModel({
         columns:[
           {id:'name', header: 'Name', sortable: true, dataIndex:"firstName"}
          ,{header: 'Location', sortable: true, dataIndex:"locationName"}
          ,{header: 'Department', sortable: true, dataIndex:"departmentName"}
          ,{header: 'Status', sortable: true, dataIndex:"statusName"}
         ]
        ,defaults: {
           sortable: true
          ,menuDisabled: true
         }
       })
      ,stripeRows:true
      ,viewConfig: {
         // custom row height
         rowHeight: 25
        ,scrollOffset: 0
        ,autoFill:true
        ,forceFit:true
       }
      ,store: {
         reader: new Ext.data.JsonReader({
           root: 'searchUserList'
          ,fields: ['name', 'location', 'department', 'status']
         })
        ,data:{"searchUserList":[]}
       }
      ,listeners:{
         "rowdblclick":function(g,r,e) {
           var _rec = g.getStore().getAt(r);
/*
           var indexLastSlash = document.location.pathname.lastIndexOf("/");
           var folders = document.location.pathname.substring(0,indexLastSlash+1);
           var _profileUrl = document.location.protocol+"//"+document.location.host+folders+"profile/userProfileAdministration.psml?systemUserId="+_rec.data.sysKey;
           document.location = _profileUrl;
*/           
           document.location = config.baseObjConfig.userProfileURL+"?systemUserId="+_rec.data.sysKey;
         }
       }
    };

    Ext.apply(this, config, defaults);
    idxm.search.ux.panel.results.common.ResultsGridPanel.superclass.constructor.call(this, config);
  }
});
Ext.reg('idxm.search.ux.panel.results.common.ResultsGridPanel', idxm.search.ux.panel.results.common.ResultsGridPanel);

