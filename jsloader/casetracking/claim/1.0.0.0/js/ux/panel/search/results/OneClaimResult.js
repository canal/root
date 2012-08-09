Ext.namespace("casetracking.claim.ux.panel.search.results.OneClaimResults");
casetracking.claim.ux.panel.search.results.OneClaimResults = Ext.extend(Ext.Panel, {

    windowObj:undefined
    ,claimData:{}
    ,oneClaimPanel:undefined
    ,hideThisObjPanel:function(){this.hide();}

    //Add Claim to Parent Window
    ,addOneClaim:function(_thisObj){
        var claimData = _thisObj.claimData;
        delete claimData.enterClaimManuallyCallBack;
        claimData["entryMethod"]="LOOKUP";

        _thisObj.windowObj.addClaim.call(_thisObj,claimData);
        _thisObj.windowObj.hideAllResultsPanel();
        _thisObj.windowObj.claimAdded.show();
        var btnSearchResults = Ext.getCmp(_thisObj.windowObj.claimAdded.searchButtonId);
        btnSearchResults.hide();
    }

    //Claim Template
    ,OneClaimResultsTemplate: function (config){

        var thisObj = this;

        var t = new Ext.XTemplate(
                            '<div class=table>'
                                ,'<div>'
                                    ,'<div class=tableLeft><div class=tableLabel>Date Of Service/Admit:</div></div>'
                                    ,'<div class=tableRight><div class=tableData>{dosFrom}</div></div>'
                                    ,'<div class=spacer></div> <!-- note no content -->'
                                ,'</div>'
                                ,'<div>'
                                    ,'<div class=tableLeft><div class=tableLabel>MultiPlan Claim#:</div></div>'
                                    ,'<div class=tableRight><div class=tableData>{mpiClaimNumber}</div></div>'
                                    ,'<div class=spacer></div> <!-- note no content -->'
                                ,'</div>'
                                ,'<div>'
                                    ,'<div class=tableLeft><div class=tableLabel>Alternate Claim #:</div></div>'
                                    ,'<div class=tableRight><div class=tableData>{alternateClaimNumber}</div></div>'
                                    ,'<div class=spacer></div> <!-- note no content -->'
                                ,'</div>'
                                ,'<div>'
                                        ,'<div class=tableLeft><div class=tableLabel>Member SSN/ID:</div></div>'
                                        ,'<div class=tableRight><div class=tableData>{memberId}</div></div>'
                                        ,'<div class=spacer></div> <!-- note no content -->'
                                ,'</div>'
                                ,'<div>'
                                        ,'<div class=tableLeft><div class=tableLabel>Patient Last Name:</div></div>'
                                        ,'<div class=tableRight><div class=tableData>{patientLastName}</div></div>'
                                        ,'<div class=spacer></div> <!-- note no content -->'
                                ,'</div>'
                                ,'<div>'
                                        ,'<div class=tableLeft><div class=tableLabel>Patient First Name:</div></div>'
                                        ,'<div class=tableRight><div class=tableData>{patientFirstName}</div></div>'
                                        ,'<div class=spacer></div> <!-- note no content -->'
                                ,'</div>'
                                ,'<div>'
                                        ,'<div class=tableLeft><div class=tableLabel>Provider Name:</div></div>'
                                        ,'<div class=tableRight><div class=tableData>{providerName}</div></div>'
                                        ,'<div class=spacer></div> <!-- note no content -->'
                                ,'</div>'
                                ,'<div>'
                                        ,'<div class=tableLeft><div class=tableLabel>Provider TIN:</div></div>'
                                        ,'<div class=tableRight><div class=tableData>{providerTin}</div></div>'
                                        ,'<div class=spacer></div> <!-- note no content -->'
                                ,'</div>'
                                ,'<div>'
                                        ,'<div class=tableLeft><div class=tableLabel>Total Charges:</div></div>'
                                        ,'<div class=tableRight><div class=tableData>{totalAmount}</div></div>'
                                        ,'<div class=spacer></div> <!-- note no content -->'
                                ,'</div>'
                                ,'<div>'
                                        ,'<div class=tableLeft><div class=tableLabel>Discount Amount:</div></div>'
                                        ,'<div class=tableRight><div class=tableData>{discountAmount}</div></div>'
                                        ,'<div class=spacer></div> <!-- note no content -->'
                                ,'</div>'
                                ,'<div>'
                                        ,'<div class=tableLeft><div class=tableLabel>Date Processed:</div></div>'
                                        ,'<div class=tableRight><div class=tableData>{processingDate}</div></div>'
                                        ,'<div class=spacer></div> <!-- note no content -->'
                                ,'</div>'
                                ,'<div class=tableContent>'
                                ,'<BR>Not what you\'re looking for?<BR>'
                                ,'Look up again or <a id="{[this.getLinkId(values.enterClaimManualLinkId,values.enterClaimManuallyCallBack)]}" class="portal-link portal-text-small" href="#">enter a claim manually.</a>'
                                ,'</div>'
                            ,'</div>'
                , {
                    getLinkId: function(_id,_callBackFunction) {
                        var id = Ext.id();
                        this.enterClaimManualCalls.defer(1, this, [id, _callBackFunction]);
                        return id;
                    },
                    enterClaimManualCalls: function(id, _callBackFunction) {
                        Ext.get(id).on('click', function(e){
                            e.stopEvent();
                            _callBackFunction.call();
                        })
                    }
                }
        );

        var pricingList = "";
        var totalAmount = "";
        var discountAmount  = "";
        var processingDate = "";
        if(config.pricingList[0]){
            pricingList = config.pricingList[0];
            totalAmount= Ext.util.Format.usMoney(pricingList.totalAmount);
            discountAmount = Ext.util.Format.usMoney(pricingList.discountAmount);
            processingDate = casetracking.core.date.convert(pricingList.processingDate);
        }

        var mpiClaimNumber = "N/A";
        var alternateClaimNumber = "N/A";
        if(config.claimIdentifierList && config.claimIdentifierList.length){
            for(var i=0;i<config.claimIdentifierList.length;i++){
            	var claim = config.claimIdentifierList[i];
            	var claimNumberSource = claim.claimNumberSource;
            	if(claimNumberSource == "MPI") {
            		mpiClaimNumber = claim.claimNumber;
            	} else if(claimNumberSource = "CLIENT") {
            		alternateClaimNumber = claim.claimNumber;
            	}
            }
        }

        var dosFrom = casetracking.core.date.convert(config.fromDateOfService);
        var dosTo = casetracking.core.date.convert(config.toDateOfService);

        var memberId = config.memberSSNID;
        var patientLastName = config.lastName;
        var patientFirstName = config.firstName;
        var patientMiddleName = config.middleName;
        var providerName = config.providerName;
        var providerTin = config.providerTIN;
        if(providerTin && providerTin.length == 9){
        	providerTin = providerTin.substr(0,2) + "-" + providerTin.substr(2,9);
        }        
        var ccode = config.ccode;
        var ccodeSource = config.ccodeSource;

        //Pass data to template
        var templateString = t.apply({
            dosFrom:dosFrom
            ,dosTo:dosTo
            ,mpiClaimNumber:mpiClaimNumber
            ,alternateClaimNumber:alternateClaimNumber
            ,memberId:memberId
            ,patientLastName:patientLastName
            ,patientFirstName:patientFirstName
            ,patientMiddleName:patientMiddleName
            ,providerName:providerName
            ,providerTin: providerTin
            ,totalAmount: totalAmount
            ,discountAmount: discountAmount
            ,processingDate: processingDate
            ,ccode:ccode
            ,ccodeSource:ccodeSource
            ,enterClaimManuallyCallBack:config.enterClaimManuallyCallBack
        });

        return templateString;

    }

	// InitComponent
	,initComponent : function(config) {

        var thisObj = this;
        this.OneClaimPanel =    new Ext.Panel({
                                    xtype: "panel"
                                    ,border: false
                                    ,cls:"portal-titles"
                                    ,autoHeight:true
                                    ,autoScroll:true
                                });

		// Apply to this component
		Ext.apply(this, {
                            layout:"form"
                            ,border:false
                            ,items:[{
                                        border:false
                                        ,height:220
                                        ,items:[
                                        		{
                                        			border:false
                                        			,style:"padding-bottom:5px;"
                                        			,html:'Click "ADD CLAIM" to associate this claim to your service case.<BR>'
                                        		}
                                        		, {
                                                    border:false
                                                    ,height:170
                                                    ,style:"padding-top:5px;padding-bottom:5px;"
                                                    ,autoScroll:true
                                                    ,items:[this.OneClaimPanel]
                                        		}
                                        		,{
                                                    xtype:"imagebutton"
                                                        ,id:"addClaimButton"
                                                        ,iconCls :"addClaimButton"
                                                        ,style:"float:right;text-align:right;"
                                                        ,handler:function(){thisObj.addOneClaim(thisObj);}
                                                    }
                                        	]
                                    }]
		});

		// call parent initComponent
		casetracking.claim.ux.panel.search.results.OneClaimResults.superclass.initComponent.call(this);
	}

    // Call After Init Component to Populate this Claim Template
    ,populateOneClaim: function(_claimData){
        _claimData["enterClaimManuallyCallBack"] =  this.enterClaimManuallyCallBack;
        this.claimData = _claimData;
        this.OneClaimPanel.el.update(this.OneClaimResultsTemplate(_claimData));
        if(!_claimData.validClaimData) {
        	Ext.getCmp('addClaimButton').hide();
        } else {
        	Ext.getCmp('addClaimButton').show();
        }
    }
});
// Register component as xtype
Ext.reg('casetracking.claim.ux.panel.search.results.OneClaimResults',casetracking.claim.ux.panel.search.results.OneClaimResults);