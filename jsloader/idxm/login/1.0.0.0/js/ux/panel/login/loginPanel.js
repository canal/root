/**
 * Class:   idxm.login.ux.panel.login.LoginPanel
 * Extends: Ext.Panel
 *
 * Author: Roberto Brenes - Multiplan 2011
 *
 *
 */
Ext.namespace("idxm.login.ux.panel.login.LoginPanel");
idxm.login.ux.panel.login.LoginPanel = Ext.extend(Ext.Panel,
{
	BASE_CONFIG:undefined,
	RENDER_TO:undefined,
	LOGIN_PANEL_ID:undefined,
	LOGIN_FORM_PANEL_ID:undefined,
	REQUEST_FORGOT_PASSWORD_URL:undefined,
	
	constructor: function(config)
  	{
  		this.BASE_CONFIG = config;
  		this.RENDER_TO = config.renderTo;
  		this.LOGIN_PANEL_ID = config.loginPanelId;
  		this.LOGIN_FORM_PANEL_ID = config.loginFormPanelId;
  		this.REQUEST_FORGOT_PASSWORD_URL = config.requestForgotPasswordUrl;
  		
		var defaults = {
				renderTo:this.RENDER_TO
				,border:false
				,bodyBorder:false
				,hideBorders:true
				,baseCls :"portal-login-outter"										
				,items:[{
						xtype:"panel"						
						,items:[
						    new idxm.login.ux.panel.login.LoginFormPanel(this.BASE_CONFIG) 
							,{
								xtype:"panel"
								,border:false
								,baseCls: "portal-login-inner"
								,html:"<table  width='100%'><tr><td align='right'><a href='" + this.REQUEST_FORGOT_PASSWORD_URL + "' >Forgot Your Password?</a></td></tr></table>"
							}]
					}]		
		};
			
		Ext.apply(this, defaults);
    		idxm.login.ux.panel.login.LoginPanel.superclass.constructor.call(this, defaults);		  		  		
  	}
});
Ext.reg('idxm.login.ux.panel.login.LoginPanel', idxm.login.ux.panel.login.LoginPanel);