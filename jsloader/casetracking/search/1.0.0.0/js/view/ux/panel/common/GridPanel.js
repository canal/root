Ext.namespace("casetracking.search.view.ux.panel.common.GridPanel");
casetracking.search.view.ux.panel.common.GridPanel = Ext.extend(Ext.grid.GridPanel,
{
  NAMESPACE:undefined,
  CASE_URL:undefined,
  STORE:undefined,
  COLMODEL:undefined,
  EMPTY_TEXT:undefined,
  GRIDVIEW:undefined,

  //Beginning of Constructor
  constructor: function(config)
  {   
    this.CASE_URL = config.caseUrl;
    this.STORE = config.store;
    this.COLMODEL = config.colmodel;
    this.EMPTY_TEXT = (config.emptyText && config.emptyText !== undefined)?config.emptyText : "";
    this.GRIDVIEW = config.view;
    
    var defaults = {
      frame:false
      //,cls:"idxm-grid"
      ,layout:'fit'
      ,border:false     
      ,enableColumnMove:false
      ,enableColumnResize:false
      ,colModel: this.COLMODEL
      ,stripeRows:true
      ,height:config.height
      ,viewConfig: {
         rowHeight: 25
        ,scrollOffset: 0
        ,autoFill:true
        ,forceFit:true
        ,emptyText:this.EMPTY_TEXT
       }
      ,store: this.STORE
      ,bbar: new Ext.PagingToolbar({
  	    pageSize: 10,
	    displayInfo: true,
	    emptyMsg: '',
	    border:false,
	    store: this.STORE
      })
      ,listeners:{
         "rowdblclick":function(g,r,e) {        	 
           var _rec = g.getStore().getAt(r);  
           g.el.mask("Opening Service Case <b>"+_rec.data.caseNumber+"</b>", "x-mask-loading");
           document.location = this.CASE_URL+"?caseNumber="+_rec.data.caseNumber+"&fromSearch=true";
         }
       }
    };    
    
    if(this.GRIDVIEW){
    	defaults['view']=this.GRIDVIEW;
    }

    Ext.apply(this, defaults);
    casetracking.search.view.ux.panel.common.GridPanel.superclass.constructor.call(this, defaults);
    
  } //End of Constructor
});
Ext.reg('casetracking.search.view.ux.panel.common.GridPanel', casetracking.search.view.ux.panel.common.GridPanel);      

function openCase(caseURL, caseNumber) {
	Ext.get(document.body.id).mask("Opening Service Case <b>"+caseNumber+"</b>", "x-mask-loading");
	document.location = caseURL +"?caseNumber="+caseNumber+"&fromSearch=true";
}