Ext.namespace("provider.claim.search.view.CreateCaseView");
provider.claim.search.view.CreateCaseView = Ext.extend(Ext.Panel, {
	
	ID: "CreateCaseView",
	
	initComponent : function(config) {	
		
		var serviceCaseLinkId = Ext.id();
		var emailsText = "";
		var caseData = {"caseNumber": "ABC1234"};
		var confirmEMail = ["pavan@gmail.com"];
//		var userData = config.userData;
//		var claimCriteria = config.claimCriteria;
//		var claimData = config.claimData;
//		var caseData  = config.caseData;
//		var phone = config.phone;
//		var phoneType = config.phoneType;
//		var redirectUrl = config.redirectUrl;
//		var confirmEMail = config.confirmEMail;
		
		//if(config && config.confirmEMail && config.confirmEMail.length > 0) {
			emailsText+= "<span class='portal-text-tiny'>Details have been emailed to you at:</span>"
			for(var i = 0; i < confirmEMail.length; i++) {
				var email = confirmEMail[i];
				if(email != null && email != undefined) {
					emailsText+= "<span class='portal-text-tiny-bold'>&nbsp;";
					emailsText+= email;
					emailsText+= "</span>";
				}				
			}
		//}	
		var statusMessage = "<div class='uradix-statussuccess' style='display: block; margin-top: 12px; margin-bottom: 12px'>";
		statusMessage+= "<div><table cellspacing='0' cellpadding='0' border='0'>";
		statusMessage+= "<tbody><tr><td valign='middle'>";
		statusMessage+= "<div class='uradix-success-icon' style='visibility: visible;'></div></td>";
		statusMessage+= "<td width='10'></td><td><div class='uradix-statussuccess-msg'>Service Case Created</div></td>";
		statusMessage += "</tr></tbody></table></div></div>";
		
		var caseLink = "<tr><td valign='top' height=125><p>Service Case Number: <a class='portal-link-medium' href='#' id="+serviceCaseLinkId+">"+caseData.caseNumber+"</a></p><p>"+emailsText+"</p></td></tr>";
		
		var findClaimHelpLinkId = Ext.id();

		// Apply to this component
		Ext.apply(this, {
			layout : "form",		
			bodyBorder : false,
			border : false,
			ctCls : "portal-plain-panel",
			hideBorders : true,			
			labelAlign: "top",
			items: [
					{
						  xtype : "panel",
						  border: false,
						  bodyBorder: false,
						  html: 	statusMessage
					 }
					,{
						  xtype : "panel",
						  border: false,
						  bodyBorder: false,
						  html: 	"<table height='175' border=0 width=100%>"
								+ caseLink
								+ "<tr><td align='center' height=50><p></p></td></tr>"
								+ "</table>"
					 }
			        ]
		});		
		// call parent initComponent
		provider.claim.search.view.CreateCaseView.superclass.initComponent.call(this);
	}
});

//Register component as xtype
Ext.reg('provider.claim.search.view.CreateCaseView',provider.claim.search.view.CreateCaseView);