
/**
 * Class:   idxm.login.ux.panel.password.ForgotPasswordRequestPanel
 * Extends: uRadix.form.FormPanel
 *
 * Author: Imran Ahmad - Multiplan 2010
 *
 * Params: @required: baseObjConfig, columnWidth
 *         @optional: N/A
 *
 */
Ext.namespace("idxm.login.ux.panel.password.ForgotPasswordRequestPanel");
idxm.login.ux.panel.password.ForgotPasswordRequestPanel = Ext.extend(uRadix.form.FormPanel,
{
  BASE_CONFIG:undefined,
  PREFIX_ID:"idxmFilterPanel",
  FORM_SUBMIT_ACTION: "forgotPasswordSubmit",

  constructor: function(config)
  {
    this.BASE_CONFIG = config;
    if(!Ext.isEmpty(config.submitAction)){this.FORM_SUBMIT_ACTION=config.submitAction;}

    var defaults = {
      buttonAlign:"right"
     ,labelAlign:"top"
     ,border:false
     ,bodyBorder:false
     ,hideBorders:true
     ,renderTo:config.renderTo
     ,width:800
     ,items: [{
          xtype: "panel"
         ,border: false
         ,cls:"portal-title"
         ,html: "Forgot Your Password?"
        },
        {
          xtype: "panel"
         ,border: false
         ,width:480
         ,style:"padding-left:10px; padding-top:10px; padding-bottom:10px;"
         ,html: "Please provide the email address you use to log in and we will send you instructions for resetting your password."
        },
        {
          xtype: "panel"
         ,layout:"form"
         ,border:false
         ,width:500
         ,style:"padding-left:30px;"
         ,items:[
           {
             name: "email"
            ,xtype: "textfield"
            ,fieldLabel: "Your Email"
            ,allowBlank: false
            ,width:200
            ,msgTarget: "sideDetails"
           }
          ]
         ,buttons:[
           {
             id:"cancelButton"
            ,text:"CANCEL"
            ,ctCls :"support-portal-btn-cancel"
            ,handler:function(){history.back();}
           }
          ,{
             id:"initiateButton"
            ,text:"RESET MY PASSWORD"
            ,ctCls :"support-portal-btn"
            ,handler:this.formSubmit
           }
          ]
        }
      ]
     ,listeners: {
        "uradix_enterkey": this.formSubmit
       ,"render":function(){g_hideStatusBox();}
      }
    };

    Ext.apply(this, defaults);
    idxm.login.ux.panel.password.ForgotPasswordRequestPanel.superclass.constructor.call(this, defaults);
  },

  formSubmit: function()
  {
    if(Ext.isEmpty(this.REF))
    {
      if(this.getXType() == "idxm.login.ux.panel.password.ForgotPasswordRequestPanel")
      {
        this.REF = this;
      }
      else
      {
        this.REF = this.findParentByType("idxm.login.ux.panel.password.ForgotPasswordRequestPanel");      
      }
    }

    if(this.REF.getForm().isValid())
    {
      g_hideStatusBox();

      var _form = this.REF.getForm();
      Ext.getCmp("initiateButton").disable();

      var _url = this.REF.BASE_CONFIG.renderUrl+"?action="+this.REF.FORM_SUBMIT_ACTION;

      _form.submit({
        url: _url,
        isMessageIgnore:true,
        disableErrorStatusBinding:true,
        success: function(form,action)
        {
          g_showStatusBox();
          var _resp = Ext.decode(action.response.responseText);
          Wizard.PortalContainer.navigate({url:_resp.navigator.nextAction});

          Ext.getCmp("initiateButton").enable();
        },
        failure: function(form,action)
        {
        	
			var jsonResponse = uRadixUtilities.jsonDecode(action.response.responseText);
			
			if(jsonResponse.messages.general){
				for(var i=0; i<jsonResponse.messages.general.length;i++){
					if(jsonResponse.messages.general[i].faultID == "5102"){
						idxm.login.popups.PasswordCanNotReset();												
					}
				}
			}
			
          	g_hideStatusBox();
          	Ext.getCmp("initiateButton").enable();
        }
      });
    }
    else
    {
      Ext.getCmp("initiateButton").enable();
    }
  }

});
Ext.reg('idxm.login.ux.panel.password.ForgotPasswordRequestPanel', idxm.login.ux.panel.password.ForgotPasswordRequestPanel);

