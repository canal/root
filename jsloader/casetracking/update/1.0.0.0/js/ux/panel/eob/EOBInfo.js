Ext.namespace("casetracking.update.ux.panel.eob.EobInfo");
casetracking.update.ux.panel.eob.EobInfo = function (config){	
	function eobInfoTemplate (){
		
		//This is the actual Template
		var t = new Ext.XTemplate(
				'<table width="100%">'
				,'<tr>'
				,'<td align="left">'
				,'<span class="portal-text-small-bold">Non-covered Amount: </span>'
				,'</td>'
				,'<td align="left">'
				,'<span class="portal-text-small">{nonCoveredAmount}</span>'
				,'</td>'				
				,'</tr>'
				,'<tr>'
				,'<td align="left">'
				,'<span class="portal-text-small-bold">Network Discount Amount: </span>'
				,'</td>'
				,'<td align="left">'
				,'<span class="portal-text-small">{discountAmount}</span>'
				,'</td>'				
				,'</tr>'	
				,'<tr>'
				,'<td align="left">'
				,'<span class="portal-text-small-bold">Payment Amount: </span>'
				,'</td>'
				,'<td align="left">'
				,'<span class="portal-text-small">{paymentAmount}</span>'
				,'</td>'				
				,'</tr>'
				,'<tr>'
				,'<td align="left">'
				,'<span class="portal-text-small-bold">Allowable Amount: </span>'
				,'</td>'
				,'<td align="left">'
				,'<span class="portal-text-small">{allowableAmount}</span>'
				,'</td>'				
				,'</tr>'
				,'<tr>'
				,'<td align="left">'
				,'<span class="portal-text-small-bold">Co-Ins %: </span>'
				,'</td>'
				,'<td align="left">'
				,'<span class="portal-text-small">{coInsurancePercentage}</span>'
				,'</td>'				
				,'</tr>'
				,'<tr>'
				,'<td align="left">'
				,'<span class="portal-text-small-bold">Deductible: </span>'
				,'</td>'
				,'<td align="left">'
				,'<span class="portal-text-small">{deductable}</span>'
				,'</td>'				
				,'</tr>'
				,'<tr>'
				,'<td align="left">'
				,'<span class="portal-text-small-bold">Date of Payment: </span>'
				,'</td>'
				,'<td align="left">'
				,'<span class="portal-text-small">{dateOfPayment}</span>'
				,'</td>'				
				,'</tr>'
				,'<tr>'
				,'<td align="left">'
				,'<span class="portal-text-small-bold">Check #: </span>'
				,'</td>'
				,'<td align="left">'
				,'<span class="portal-text-small">{checkNumber}</span>'
				,'</td>'				
				,'</tr>'
				,'<tr>'
				,'<td align="left">'
				,'<span class="portal-text-small-bold">Payment Details: </span>'
				,'</td>'
				,'<td align="left">'
				,'<span class="portal-text-small">{paymentDetails}</span>'
				,'</td>'				
				,'</tr>'						
				,'</table>'
				);
		
		var dateOfPayment = 'N/A', paymentDetails = 'N/A', checkNumber = 'N/A', discountAmount = 'N/A', nonCoveredAmount = 'N/A'
			, paymentAmount = 'N/A', allowableAmount = 'N/A', coInsurancePercentage = 'N/A', deductable = 'N/A';
		var numberOfClaims = numberOfClaims = config.aCase.numberOfClaimsReported;
		if(config.aCase.eobList && config.aCase.eobList[0]) {
			checkNumber = config.aCase.eobList[0].checkNumber;
			if(checkNumber == '') {
				checkNumber = 'N/A';
			}				
			discountAmount = config.aCase.eobList[0].discountAmount;
			if(discountAmount == '') {
				discountAmount = 'N/A';
			}			
			nonCoveredAmount = config.aCase.eobList[0].nonCoveredAmount;
			if(nonCoveredAmount == '') {
				nonCoveredAmount = 'N/A';
			}			
			paymentAmount = config.aCase.eobList[0].paymentAmount;
			if(paymentAmount == '') {
				paymentAmount = 'N/A';
			}			
			allowableAmount = config.aCase.eobList[0].allowableAmount;
			if(allowableAmount == '') {
				allowableAmount = 'N/A';
			}			
			coInsurancePercentage = config.aCase.eobList[0].coInsurancePercentage;
			if(coInsurancePercentage == '') {
				coInsurancePercentage = 'N/A';
			}			
			deductable = config.aCase.eobList[0].deductable;
			if(deductable == '') {
				deductable = 'N/A';
			}				
			paymentDetails = config.aCase.eobList[0].paymentDetails;
			if(paymentDetails == '') {
				paymentDetails = 'N/A';
			}			
			if(config.aCase.eobList[0].dateOfPayment) {
				var paymentDate = new Date(config.aCase.eobList[0].dateOfPayment.time.time);
				dateOfPayment = paymentDate.getMonth()+1 + "/" + paymentDate.getDate() + "/" + paymentDate.getFullYear();
			} 	
			if(dateOfPayment == '') {
				paymentDetails = 'N/A';
			}				
		} 		
		//Pass data to template
		var templateString = t.apply(	 
				{	
					nonCoveredAmount: nonCoveredAmount
					,discountAmount: discountAmount
					,paymentAmount: paymentAmount
					,allowableAmount: allowableAmount
					,coInsurancePercentage: coInsurancePercentage
					,deductable: deductable
					,dateOfPayment: dateOfPayment
					,checkNumber: checkNumber
					,paymentDetails: paymentDetails
				}
		);	

		return templateString;
		
	} // end template function
	
	var EobInfoPanel = 
		new Ext.Panel({
			bodyBorder: false						    
			,border: false
			,hideBorders: true		
			,items: [{
					autoHeight:true
					,items:[{
					       	  xtype : "panel",
					       	  border : false,
					       	  cls : "casetracking-title",
					       	  style:"padding-top:10px;",
					       	  bodyCssClass:"casetracking-title-body",
					       	  html : "EOB Information"
					       },{
					    	   xtype: "panel",
					    	   border: false,					
					    	   cls:"portal-titles",
					    	   style:"padding-top:5px;",
					    	   html: eobInfoTemplate()
					    	   ,autoHeight:true
					    	   ,autoScroll:true
					       }]
				}]
		});
	
	return EobInfoPanel;
};

