Ext.namespace("casetracking.claim.ux.panel.search.results.MultipleClaimDisplay");
casetracking.claim.ux.panel.search.results.MultipleClaimDisplay = Ext.extend(Ext.grid.GridPanel,{

  NAMESPACE:undefined,
  SEARCH_SUBMIT_URL: undefined,
  URL:undefined,
  STORE:undefined,
  CHECKBOXMODEL:undefined,
  COLMODEL:undefined,
  GRIDPANEL:undefined,

  constructor: function(config)
  {
	this.SEARCH_SUBMIT_URL = config.searchSubmitURL;

	this.STORE =
		new Ext.data.Store({
			reader: new Ext.data.JsonReader({
						root: 'claimList'
						,fields: [
						           {name: 'fromDateOfService',mapping:'fromDateOfService'}
                                    ,{name: 'toDateOfService',mapping:'toDateOfService'}
                                    ,{name: 'claimNumber',mapping:'claimIdentifierList[0].claimNumber'}
                                    ,{name: 'claimNumberSource',mapping:'claimIdentifierList[0].claimNumberSource'}
                                    ,{name: 'memberSSNID',mapping:'memberSSNID'}
                                    ,{name: 'patientName',mapping:'lastName'}
                                    ,{name: 'middleName',mapping:'middleName'}
                                    ,{name: 'firstName',mapping:'firstName'}
                                    ,{name: 'providerName',mapping:'providerName'}
                                    ,{name: 'providerTin',mapping:'providerTIN'}
                                    ,{name: 'totalAmount',mapping:'pricingList[0].totalAmount'}
                                    ,{name: 'discountAmount',mapping:'pricingList[0].discountAmount'}
                                    ,{name: 'processingDate',mapping:'pricingList[0].processingDate'}
						          ]
           })
          ,data:{"claimList":[]}
		});

        this.CHECKBOXMODEL = new Ext.grid.CheckboxSelectionModel({id:Ext.id(),header:"",singleSelect:false,width:37,sortable:false});

        this.COLMODEL =
            new Ext.grid.ColumnModel({
			        		columns:[this.CHECKBOXMODEL
                                    , {	header: 'Date of<br>Service'
					                	 ,sortable: false
					                	 ,dataIndex:"fromDateOfService"
					                	 ,renderer: function(val) {
                                            var fromDate = new Date(val.time.time);
                                            fromDate = fromDate.format("m/d/Y");
                                            return fromDate;
										}
          					       },{
                                        id:'claimNumber', header: 'Claim #', sortable: true, dataIndex:"claimNumber"
                                    },{	header: 'Member<br>SSN / ID'
					                	, sortable: false
					                	, dataIndex:"memberSSNID"
				                		,renderer: function(val) {
											return val;
										}
					                },{
					                	header: 'Patient Name'
					                	,sortable:false
					                	,dataIndex:"patientName"
					                	,renderer:function(val){
					                		return val;
					                	}
					                },{
					                	header: 'Provider Name'
					                	,sortable:false
					                	,dataIndex:"providerName"
					                	,renderer:function(val){
					                		return val;
					                	}
					                },{
					                	header: 'Provider<br>Tin'
					                	,sortable:false
					                	,dataIndex:"providerTin"
					                	,renderer:function(val){
					                		return val;
					                	}
					                },{
					                	header: 'Total<br>Amount'
					                	,sortable:false
					                	,dataIndex:"totalAmount"
					                	,renderer:function(val){
					                		return val;
					                	}
					                },{
					                	header: 'Disc<br>Amt'
					                	,sortable:false
					                	,dataIndex:"discountAmount"
					                	,renderer:function(val){
					                		return val;
					                	}
					                },{
					                	header: 'Processing<br>Date'
					                	,sortable:false
					                	,dataIndex:"processingDate"
					                	,renderer:function(val){
                                            var processingDate = new Date(val.time.time);
                                            processingDate = processingDate.format("m/d/Y");
                                            return processingDate;					                		
					                	}
					                }
					               ]
			              	,defaults: {sortable: true,menuDisabled: true}
		             });

    var defaults = {
            cls:"idxm-grid"
            ,frame:false
            ,border:false
            ,enableColumnMove:false
            ,enableColumnResize:false
            ,height:100
            ,selMode:this.CHECKBOXMODEL
            ,colModel: this.COLMODEL
            ,stripeRows:true
            ,viewConfig: {
                 rowHeight: 25
                ,scrollOffset: 0
                ,autoFill:true
                ,forceFit:true
            }
            ,store: this.STORE
            ,listeners:{
             "rowdblclick":function(g,r,e) {
             }
            }
    };

    Ext.apply(this, config, defaults);
    casetracking.claim.ux.panel.search.results.MultipleClaimDisplay.superclass.constructor.call(this, config);
  }

});
// Register component as xtype
Ext.reg('casetracking.claim.ux.panel.search.results.MultipleClaimDisplay',casetracking.claim.ux.panel.search.results.MultipleClaimDisplay);