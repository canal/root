Ext.namespace("idxm.selfprofile.links.ApplicationLinks");
idxm.selfprofile.links.ApplicationLinks = function(config) {

	var applicationTpl = new Ext.XTemplate(
			'<table width="100%">',
			'<tr>',
			'<td>',
			'<div class="links-applicationlinks-heading">My Applications</div>',
			'<div class="enduser-dotted-line">&nbsp;</div>',
			'</td>',
			'</tr>',
			'<tpl for="list">',
			'<tr><td><div class="enduser-application-link">> <a class="enduser-application-link" href="{link}" target="_blank">{name}</a></div></td></tr>',
			'</tpl>', '</table>');

	var ExternalPersonPanel = new Ext.Panel(
			{
				renderTo : config.formPanelDivID,
				layout : 'fit',
				bodyBorder : false,
				border : false,
				hideBorders : true,
				html : applicationTpl.applyTemplate ({
										"list" : IDXM.Utilities
												.ApplicationLinks({
													userClass : config.userData.userClassCode,
													env : config.enviroment,
													repricer:config.repricer
												})
									})
			});

	var jsonFunctionObject = {
		doCancel : function() {
			if (config.redirectURL) {
				eval("document." + config.redirectFormName + ".submit()");
			} else {
				document.location = config.urlUpdateProfile + "?systemUserId="
						+ config.userData.sysKey;
			}
		},
		noCancel : function() {
		}
	};
};
