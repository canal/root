
function uRadixClientMessageHandler()
{
  this.DEFAULT_STATUS_DOM_ID = "uradix_statusbox";
  this.DEFAULT_STATUS_SUCC_DOM_ID = "uradix_statusboxsuccess";
  this.DEFAULT_STATUS_SUCCMSG_DOM_ID = "uradix_statusboxsuccessmsg";
  this.DEFAULT_STATUS_ERR_DOM_ID = "uradix_statusboxerror";
  this.DEFAULT_STATUS_ERRMSG_DOM_ID = "uradix_statusboxerrormsg";
  this.DEFAULT_STATUS_WARN_DOM_ID = "uradix_statusboxwarn";
  this.DEFAULT_STATUS_WARNMSG_DOM_ID = "uradix_statusboxwarnmsg";

  /*
   * This function will set the "Advice" status bar(s)
   */
  this.setAdvice=function(isSuccess, advices)
  {
    var statusBox;

    Ext.get(this.DEFAULT_STATUS_SUCC_DOM_ID).setVisibilityMode(Ext.Element.DISPLAY);
    Ext.get(this.DEFAULT_STATUS_ERR_DOM_ID).setVisibilityMode(Ext.Element.DISPLAY);
    Ext.get(this.DEFAULT_STATUS_WARN_DOM_ID).setVisibilityMode(Ext.Element.DISPLAY);

    if(isSuccess)
    {
      statusBox = Ext.get(this.DEFAULT_STATUS_SUCCMSG_DOM_ID);

      if(advices)
      {
        for(var i = 0, len = advices.length; i < len; i++)
        {
          var advice = advices[i];

          if(statusBox)
          {
            statusBox.update(advice.description, true);
          }
        }
      } // end advices check


//      this.hideStatusBox();

      Ext.get(this.DEFAULT_STATUS_ERR_DOM_ID).setVisible(false);
      Ext.get(this.DEFAULT_STATUS_WARN_DOM_ID).setVisible(false);

      Ext.get(this.DEFAULT_STATUS_SUCC_DOM_ID).setVisibilityMode(Ext.Element.DISPLAY).originalDisplay ='block';
      Ext.get(this.DEFAULT_STATUS_SUCC_DOM_ID).setVisible(true);
      Ext.get(this.DEFAULT_STATUS_SUCC_DOM_ID).dom.style.display="block";
    }
    else
    {
      statusBox = Ext.get(this.DEFAULT_STATUS_ERRMSG_DOM_ID);

      if(advices)
      {
        for(var i = 0, len = advices.length; i < len; i++)
        {
          var advice = advices[i];

          if(statusBox)
          {
            statusBox.update(advice.description, true);
          }
        }
      } // end advices check

//      this.hideStatusBox();

      Ext.get(this.DEFAULT_STATUS_SUCC_DOM_ID).setVisible(false);
      Ext.get(this.DEFAULT_STATUS_WARN_DOM_ID).setVisible(false);

      Ext.get(this.DEFAULT_STATUS_ERR_DOM_ID).setVisibilityMode(Ext.Element.DISPLAY).originalDisplay ='block';
      Ext.get(this.DEFAULT_STATUS_ERR_DOM_ID).setVisible(true);
      Ext.get(this.DEFAULT_STATUS_ERR_DOM_ID).dom.style.display="block";
    }
  };


  /*
   * This function will set the "Warning" status bar(s)
   */
  this.setWarning=function(warning)
  {
    var statusBox;

    Ext.get(this.DEFAULT_STATUS_SUCC_DOM_ID).setVisibilityMode(Ext.Element.DISPLAY);
    Ext.get(this.DEFAULT_STATUS_ERR_DOM_ID).setVisibilityMode(Ext.Element.DISPLAY);
    Ext.get(this.DEFAULT_STATUS_WARN_DOM_ID).setVisibilityMode(Ext.Element.DISPLAY);

    statusBox = Ext.get(this.DEFAULT_STATUS_WARNMSG_DOM_ID);

    if(warning)
    {
      if(statusBox)
      {
        statusBox.update(warning.description, true);
      }
    } // end advices check

    Ext.get(this.DEFAULT_STATUS_SUCC_DOM_ID).setVisible(false);
    Ext.get(this.DEFAULT_STATUS_ERR_DOM_ID).setVisible(false);

    Ext.get(this.DEFAULT_STATUS_WARN_DOM_ID).setVisibilityMode(Ext.Element.DISPLAY).originalDisplay ='block';
    Ext.get(this.DEFAULT_STATUS_WARN_DOM_ID).dom.style.display="block";
  };


  /*
   * This function will set the "General Message" modal tab window
   */
  this.setMessage=function(isSuccess, messages)
  {
    var alertBody="";
    if(messages)
    {
      for(var i=0, len=messages.length; i<len; i++)
      {
        var message = messages[i];
        alertBody = alertBody+"<b>"+message.msg+"</b><br>"+message.msgDetail+"<br><br>";
      }
    } // end messages check


    Ext.Msg.show({
     title: 'General Errors',
     msg: alertBody,
     width: 300,
     buttons: Ext.MessageBox.OK
    });

    return;
  };


  /*
   * This function will set the "General Message" modal tab window
   */
  this.setMessageAsTabs=function(isSuccess, messages)
  {
    var win = new Ext.Window({
              title: "General Messages",
              draggable: true,
              layout:'fit',
              shadow:true,
              width:400,
              height:250,
              plain: true,
              modal: true,

              items: new Ext.TabPanel({
                       id: 'genMsgTabPanel',
                       autoTabs:true,
                       activeTab:0,
                       deferredRender:false,
                       border:false
                     }),

              buttons: [{
                text: 'Close',
                handler: function()
                {
                  win.hide();
                }
              }]
    });

    var msgTabPanel = Ext.getCmp("genMsgTabPanel");

    if(messages)
    {
      for(var i = 0, len = messages.length; i < len; i++)
      {
        var message = messages[i];

        if(i === 0)
        {
          msgTabPanel.add({
            title:message.msg,
            html:message.msgDetail,
            collapsible:true,
            closable:false,
            border:false,
            autoScroll:true
          });
        }
        else
        {
          msgTabPanel.add({
            title:message.msg,
            html:message.msgDetail,
            collapsible:true,
            closable:true,
            border:false,
            autoScroll:true
          });
        }
      }
    } // end messages check

    msgTabPanel.doLayout();
    win.show(this);
    return;
  };

  /*
   * This function can be used to launch an Ext alert box.
   */
  this.setAlert=function(isSuccess, message)
  {
    var title="Error Encountered";
    if(isSuccess)
    {
      title="Success";
    }
    Ext.Msg.alert(title, message);
    return;
  };

  this.fireEvent=function(eventName, config)
  {
    return;
  };

  this.initializeStatusDOM=function(domId)
  {
    if((domId === undefined) || (domId === null))
    {
      domId = this.DEFAULT_STATUS_DOM_ID;
    }

    var t = new Ext.Template(
      '<div id="{boxErr}" class="uradix-statuserror">',
      '<div>',
      '<table cellspacing="0" cellpadding="0" border="0">',
      '<tr>',
      '<td valign="middle"><div class="uradix-error-icon" style="visibility: visible;"></div></td>',
      '<td width="10"></td>',
      '<td><div id="{boxErrMsg}" class="uradix-statuserror-msg"></div></td>',
      '</tr>',
      '</table>',
      '</div>',
      '</div>',
      '<div id="{boxSucc}" class="uradix-statussuccess">',
      '<div>',
      '<table cellspacing="0" cellpadding="0" border="0">',
      '<tr>',
      '<td valign="middle"><div class="uradix-success-icon" style="visibility: visible;"></div></td>',
      '<td width="10"></td>',
      '<td><div id="{boxSuccMsg}" class="uradix-statussuccess-msg"></div></td>',
      '</tr>',
      '</table>',
      '</div>',
      '</div>',
      '<div id="{boxWarn}" class="uradix-statuswarn">',
      '<div>',
      '<table cellspacing="0" cellpadding="0" border="0">',
      '<tr>',
      '<td valign="middle"><div class="uradix-warning-icon" style="visibility: visible;"></div></td>',
      '<td width="10"></td>',
      '<td><div id="{boxWarnMsg}" class="uradix-statuswarn-msg"></div></td>',
      '</tr>',
      '</table>',
      '</div>',
      '</div>'
    );

    t.append(domId, {boxErr: this.DEFAULT_STATUS_ERR_DOM_ID,
        boxErrMsg: this.DEFAULT_STATUS_ERRMSG_DOM_ID, boxSucc: this.DEFAULT_STATUS_SUCC_DOM_ID,
        boxSuccMsg: this.DEFAULT_STATUS_SUCCMSG_DOM_ID, boxWarn: this.DEFAULT_STATUS_WARN_DOM_ID,
        boxWarnMsg: this.DEFAULT_STATUS_WARNMSG_DOM_ID});

    this.setCookieAdvice();

    return;
  };
  
  this.setCustomStatusDOM=function(_paramObject){
	 var t = new Ext.XTemplate(
	       '<div id="{boxId}" class="uradix-statuswarn" style="display:block;">',
		'<div>',
			'<table cellspacing="0" cellpadding="0" border="0">',
				'<tr>',
					'<td valign="middle"><div class="uradix-warning-icon" style="visibility: visible;"></div></td>',
					'<td width="10"></td>',
					'<td><div class="uradix-statuswarn-msg">{boxMsg}</div></td>',
					'<tpl if="boxCallBack">',
						'<td width="10"></td>',
						'<td><div class="uradix-form-help-details-icon" style="visibility: visible;" onclick="{boxCallBack}();" title="More Information" onmouseover="document.body.style.cursor=\'pointer\';" onmouseout="document.body.style.cursor=\'default\';"></div></td>',
					'</tpl>',
				'</tr>',
			'</table>',
		'</div>',
	       '</div>');

	if(_paramObject.append){
	 	t.append(_paramObject.id, {boxId:_paramObject.boxId, boxMsg:_paramObject.boxMsg, boxCallBack:_paramObject.boxCallBack});
	 
		 return;
	}else{
		return t.apply({boxId:_paramObject.boxId, boxMsg:_paramObject.boxMsg, boxCallBack:_paramObject.boxCallBack});
	}
  };

  this.setCookieAdvice=function()
  {
    try
    {
      var queryStr = document.location.search;
      if(queryStr.indexOf(uRadixCookieManager.MPI_COOKIE_PARAMETER) != -1)
      {
        var cookieVal = uRadixCookieManager.readCookie(uRadixCookieManager.MPI_COOKIE_NAME);
        var jsonResp = uRadixUtilities.jsonDecode(cookieVal);
        if(jsonResp)
        {
          this.setAdvice(jsonResp.success, jsonResp.advices);
          uRadixCookieManager.eraseCookie(uRadixCookieManager.MPI_COOKIE_NAME);
        }
      }
    }
    catch(e){}
  };

  this.hideStatusBox=function()
  {
    Ext.get(this.DEFAULT_STATUS_ERR_DOM_ID).setVisible(false);
    Ext.get(this.DEFAULT_STATUS_SUCC_DOM_ID).setVisible(false);
    Ext.get(this.DEFAULT_STATUS_WARN_DOM_ID).setVisible(false);
  };

  /*
   * For use with bluenog portal only. This is to expand the north panel to display the status box.
   */
  this.resizeStatusPanel=function(regionID,height,viewport)
  {
	try{
	    Ext.getCmp(regionID).setHeight(height);
	    Ext.getCmp(viewport).doLayout();
	}catch(e){}
  };

  this.isVisible=function()
  {
    var returnVal = false;

    if( !Ext.isEmpty(Ext.get(this.DEFAULT_STATUS_ERR_DOM_ID)) &&
        !Ext.isEmpty(Ext.get(this.DEFAULT_STATUS_WARN_DOM_ID)) &&
        !Ext.isEmpty(Ext.get(this.DEFAULT_STATUS_WARN_DOM_ID)))
    {
      if(Ext.get(this.DEFAULT_STATUS_ERR_DOM_ID).isVisible() || Ext.get(this.DEFAULT_STATUS_SUCC_DOM_ID).isVisible() || Ext.get(this.DEFAULT_STATUS_WARN_DOM_ID).isVisible())
      {
        returnVal=true;
      }
      else
      {
        returnVal=false;
      }
    }

    return returnVal;
  };
};

uRadixClientMessageHandler = new uRadixClientMessageHandler();