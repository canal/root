Ext.namespace("IDXM.EndUser.Activate.Step5");
IDXM.EndUser.Activate.Step5 = function (config){
	
	g_hideStatusBox();
	Ext.get(document.body.id).unmask();

	var template = 
			new Ext.Template(	
				'<table width="100%" border="0">'
					,'<tr>'
						,'<td align="center" width="700">'
							,'<span class="idxm-confirm-identity-confirmation">'
								,'Congratulations, your account is now active.<BR><BR>'
								,'The details of your account have been emailed to you{displayEmail}.<BR><BR>'
								,'{applications}'
							,'</span>'
						,'</td>'
					,'</tr>'
				,'</table>'	
			);
			
		var applicationTpl = new Ext.XTemplate(
	                 '<table>',
	                 '<tpl for="list">',
	                   '<tr><td align="center"><a class="idxm-confirm-identity-confirmation" href="{link}" target="_blank">{name}</a><BR><BR></td></tr>',                   
	                 '</tpl>',
	                 '</table>'
	               );
	    
	    var displayEmail = "";
		if(config.accountActivationJson.userClassCode == IDXM_USER_CLASS_CLIENT){
			 displayEmail = " at " + config.accountActivationJson.detailsOFAccountEmailedToAddress;
		}
		
		var applicationLinks = IDXM.Utilities.ApplicationLinks({userClass:config.accountActivationJson.userClassCode,env:config.enviroment,repricer:config.accountActivationJson.repricer});;		
			
		var confirmIdentityTemplate = template.apply({
					applications : applicationTpl.applyTemplate({"list":applicationLinks})
					,displayEmail: displayEmail
				});	
				
		uRadixClientMessageHandler.setAdvice(true,[{"description":"Your Account Has Been Activated"}]);
        g_showStatusBox();				
				
		var confirmationPanel = 
			new Ext.Panel({
				renderTo:"windowContainer"
				,border:false
				,bodyBorder:false
				,hideBorders:true
				,html:confirmIdentityTemplate
			});	
};