Ext.namespace("casetracking.create.ux.panel.provider.ProviderInfo");
casetracking.create.ux.panel.provider.ProviderInfo = Ext.extend(Ext.Panel, {

	// initComponent
	initComponent : function(config) {

        this.prefix = (this.prefix)?this.prefix:"";
        this.hideTitlePanel = (this.hideTitlePanel)?true:false;

	var practitionerPanel   = new casetracking.create.ux.panel.provider.PractitionerInfo ({prefix:this.prefix, hideTitlePanel:this.hideTitlePanel});
	this.practitionerPanel = practitionerPanel;

	var facilityPanel   = new casetracking.create.ux.panel.provider.FacilityInfo ({prefix:this.prefix, hideTitlePanel:this.hideTitlePanel});
	this.facilityPanel = facilityPanel;

        var togglePanels = new IDXM.Utilities.TogglePanels();
        togglePanels.setPanels([practitionerPanel,facilityPanel]);

        var titlePanel = {
			        	  xtype : "panel",
			        	  border : false,
			        	  cls : "casetracking-title",
			        	  style:"padding-top:20px;",
			        	  bodyCssClass:"casetracking-title-body",
			        	  html : "Provider Information"
			          };
        if(this.hideTitlePanel){
            titlePanel = {};
        }
        
	this.radioId = "providerTypeRadioGroup"+this.prefix;
		
		// Apply to this component
		Ext.apply(this, {
			layout : "form",		
			bodyBorder : false,
			border : false,
			ctCls : "portal-plain-panel",
			hideBorders : true,
			labelAlign:"top",
			items : [titlePanel,{
		          			xtype: "panel",
		          			layout : "form",	
		          			border: false,
		          			labelAlign: "top",	
		          			style:"padding-top:10px;",
		          			items: [
		          			        {
		          			        	xtype: "radiogroup",
		          			        	name:"providerTypeRadioGroup",
		          			        	id:"providerTypeRadioGroup"+this.prefix,
		          			        	fieldLabel: "Provider Type:",
		          			        	labelSeparator:"",
		          			        	vertical: true,
		          			        	allowBlank:false,
		          			        	msgTarget:"under",
		          			        	columns:1,
		          			        	value:"",
								items:[{
										hideLabel: true,
										boxLabel : "Practitioner/Individual Provider",
										name : "providerType",
										inputValue : "PRAC",
										listeners: {
											check : function(o,b){
												if(b) {
													togglePanels.enableShowPanel(practitionerPanel);
													togglePanels.disableShowPanel(facilityPanel);
												}									
											}
										}
									},{
										hideLabel: true,
										boxLabel : "Facility/Ancillary",
										name : "providerType",
										inputValue : "FAC",
										listeners: {
											check : function(o,b){
												if(b) {
													togglePanels.enableShowPanel(facilityPanel);
													togglePanels.disableShowPanel(practitionerPanel);
												} 											
											}
										}
									}]
							}]	        				        	        		  	        				        	        	 
		          		}
			          ,practitionerPanel,facilityPanel
			]
		});

		// call parent initComponent
		casetracking.create.ux.panel.provider.ProviderInfo.superclass.initComponent.call(this);
	}
});
// Register component as xtype
Ext.reg('casetracking.create.ux.panel.provider.ProviderInfo',casetracking.create.ux.panel.provider.ProviderInfo);