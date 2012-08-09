Ext.namespace("casetracking.claim.ux.panel.lookup.PatientLookup");
casetracking.claim.ux.panel.lookup.PatientLookup = Ext.extend(Ext.Panel, {	

	// initComponent
	initComponent : function(config) {

        thisObj = this;
		
		// Apply to this component
		Ext.apply(this, {
			layout : "form",		
			bodyBorder : false,
			border : false,
			hideBorders : true,
			labelAlign:"top",
			items : [{
			        	  xtype : "panel",
			        	  border : false,
			        	  baseCls : "portal-subtitle-bold",
			        	  style:"padding-top:10px;",
			        	  html : "Lookup by Patient Name and Date"
			          },{
			        	  xtype : "panel",
			        	  border : false,			          
			        	  html:"<div>Enter multiple criteria to narrow your results. <a id='claimSearchTips' href='#' class='portal-link portal-text-small'>See Tips</a>.</div>"
						  ,listeners : {
								afterrender : function() {
									var claimSearchTips = Ext
											.get('claimSearchTips');
									claimSearchTips
											.on(
													"click",
													function() {
														new casetracking.core.windows.ClaimSearchInformation({});
													});
								}
							}			        		  
			          },{
                            xtype: "panel",
                            layout : "form",
                            border: false,
                            labelAlign: "top",
                            items: [{
                                        xtype : "panel",
                                        border : false,
                                        layout : "column",
                                        style : "padding-top:5px;",
                                        width : 325,
                                        items : [{
                                                xtype : "panel",
                                                columnWidth : .5,
                                                layout : "form",
                                                border : false,
                                                labelAlign : "top",
                                                items : [{
                                                        xtype : "textfield",
                                                        name : "patientLastName",
                                                        id : "patientLastName",
                                                        fieldLabel : "Last Name",
                                                        allowBlank : true,
                                                        width : 150,
                                                        msgTarget : "under"
                                                    }]
                                            },{
                                                xtype : "panel",
                                                columnWidth : .5,
                                                layout : "form",
                                                border : false,
                                                labelAlign : "top",
                                                items : [{
                                                        xtype : "textfield",
                                                        name : "patientFirstName",
                                                        id : "patientFirstName",
                                                        fieldLabel : "First Name",
                                                        hideLabel : false,
                                                        allowBlank : true,
                                                        width : 150,
                                                        msgTarget : "under"
                                                    }]
                                            }]
                                },{
                                    xtype : "panel",
                                    border : false,
                                    layout : "column",
                                    width : 325,
                                    items : [{
                                            xtype : "panel",
                                            columnWidth : .5,
                                            layout : "form",
                                            border : false,
                                            labelAlign : "top",
                                            items : [{
                                                    xtype : "datefield",
                                                    name : "dateOfServiceFrom",
                                                    id : "dateOfServiceFrom",
                                                    fieldLabel : "From",
                                                    hideLabel : false,
                                                    allowBlank : true,
                                                    width:150,
                                                    msgTarget : "under",
                                                    maxValue : new Date()
                                                }]
                                        },{
                                            xtype : "panel",
                                            columnWidth : .5,
                                            layout : "form",
                                            border : false,
                                            labelAlign : "top",
                                            items : [{
                                                    xtype : "datefield",
                                                    name : "dateOfServiceTo",
                                                    id : "dateOfServiceTo",
                                                    fieldLabel : "To",
                                                    hideLabel : false,
                                                    allowBlank : true,
                                                    width:150,
                                                    msgTarget : "under",
                                                    maxValue : new Date()
                                                }]
                                        }]
                                },{
                                    xtype:"textfield"
                                    ,fieldLabel:"Provider Name"
                                    ,allowBlank:true
                                    ,id:"providerName"
                                    ,name:"providerName"
                                    ,width:300
                                    ,msgTarget:"under"
                                    ,maxLength:200
                                },{
                                    xtype:"panel"
                                    ,border:false
                                    ,layout:"column"
                                    ,items:[{
                                                columnWidth:.65
                                                ,border:false
                                                ,layout:"form"
                                                ,items:[{
                                                            xtype:"textfield"
                                                            ,fieldLabel:"Provider TIN"
                                                            ,allowBlank:true
                                                            ,id:"providerTin"
                                                            ,name:"providerTin"
                                                            ,width:125
                                                            ,vtype:"tin"  
                                        					,autoCreate : {
                                        						tag : "input",
                                        						size : "10",
                                        						minLength: "9",
                                        						maxLength : "10"
                                        					}                                                            	
                                                            ,listeners: {
                                                            	blur: function (o) {
                                                            		var value = o.getValue();
                                                            		Ext.form.VTypes.tin(value);
                                                            	}
                                                            }
                                                        }]
                                            },{
                                                columnWidth:.35
                                                ,border:false
                                                ,layout:"form"
                                                ,style:"padding-top:15px;padding-right:25px;"
                                                ,items:[{xtype:"imagebutton",iconCls:"findClaimButton",style:"float:right;text-align:right;",handler:thisObj.formSubmitHandler}]
                                            }]
                                }]
                        }]
		});

		// call parent initComponent
		casetracking.claim.ux.panel.lookup.PatientLookup.superclass.initComponent.call(this);
	}
});
// Register component as xtype
Ext.reg('casetracking.claim.ux.panel.lookup.PatientLookup',casetracking.claim.ux.panel.lookup.PatientLookup);