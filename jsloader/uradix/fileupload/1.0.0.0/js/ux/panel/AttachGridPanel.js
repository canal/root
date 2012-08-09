Ext.namespace("uradix.fileupload.ux.panel.AttachFileGridPanel");
uradix.fileupload.ux.panel.AttachFileGridPanel = Ext.extend(Ext.grid.GridPanel,
{
    constructor: function(config)
    {  	
        var defaults = {
           cls:"idxm-grid"
          ,frame:false
          ,height: 125
          ,width:390
          ,autoScroll:true
      	  ,enableColumnMove:false
      	  ,enableColumnResize:false          
          ,hidden:true
          ,colModel: new Ext.grid.ColumnModel({
             columns:[
               {id:'addedOnDate', header: 'Added On', sortable: true, dataIndex:"addedOnDate"}
              ,{header: 'Name', sortable: true, dataIndex:"fileName"}
              ,{header: 'Added By', sortable: true, dataIndex:"addedByUser"}
              ,{header: 'Size', sortable: true, dataIndex:"fileSize"}
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
               root: 'searchList'
              ,fields: ['addedOnDate', 'fileName', 'addedByUser', 'fileSize']
             })
            ,data:{"searchList":[]}
           }
          ,listeners:{
             "rowdblclick":function(g,r,e) {
               var _rec = g.getStore().getAt(r);       
               //document.location = config.baseObjConfig.userProfileURL+"?systemUserId="+_rec.data.sysKey;
             }
           }
        };   
        
        Ext.apply(this, config, defaults);
        uradix.fileupload.ux.panel.AttachFileGridPanel.superclass.constructor.call(this, config);
    }          
    
});
Ext.reg('uradix.fileupload.ux.panel.AttachFileGridPanel', uradix.fileupload.ux.panel.AttachFileGridPanel);
