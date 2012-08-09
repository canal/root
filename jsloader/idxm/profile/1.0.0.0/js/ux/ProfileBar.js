
/**
 * Class: idxm.profile.ux.ProfileBar
 * Author: Imran Ahmad - Multiplan 2009
 *
 * Params: @required: namespace, statusCode, statusName, userSubClassCode,
 *                    mirrorUserURL, sysKey, userTypeCode, userClassCode, lastLoginDate
 *         @optional: hideAllIcons, isLocked
 *
 */
Ext.namespace("idxm.profile.ux.ProfileBar");
idxm.profile.ux.ProfileBar = Ext.extend(Ext.Panel,
{
  STATUS_TABLE: new Ext.XTemplate("<table border='0' cellspacing='3' cellpadding='0' width='100%'><tr>",
                                  "<td style='width:325px;' valign='middle'>",
                                    "<table border='0' cellspacing='0' cellpadding='0' width='100%'><tr>",
                                      "<td width='150'><span class='status-{statusCode}'>{statusName}</span></td>",
                                      '<tpl if="hideAllIcons == false">',
                                        '<tpl if="isLocked == true">',
                                          "<td width='18'><span class='icon-locked' id='profile_icon_locked' qtip='Account is Locked'></span></td>",
                                        "</tpl>",
                                      "</tpl>",
                                      '<tpl if="hideAllIcons == false">',
                                        '<tpl if="this.isResendActivationShowable(userClassCode, statusCode, isLocked)">',
                                          "<td width='18'><a href='javascript:uRadixWindowManager.launch({registryResendAccountActivation});' class='icon-resendactivation' id='profile_icon_resendactivation' qtip='Resend Activation Email'></a></td>",
                                        "</tpl>",
                                      "</tpl>",
                                      '<tpl if="this.isLoginDateShowable(statusCode, lastLoginDate)">',
                                        "<td width='150'><span class='idxmTextSmall'>&nbsp;&nbsp;Last Log-in: <b>{lastLoginDate}</b></span></td>",
                                        '<tpl if="hideAllIcons == false">',
                                          "<td width='18'><span><a href='javascript:uRadixWindowManager.launch({registryAccessHistory});' class='icon-accesshistory' id='profile_icon_accesshistory' qtip='View Log-in History'></a></span></td>",
                                        "</tpl>",
                                      "</tpl>",
                                      "<td></td>",
                                    "</tr></table>",
                                  "</td>",
                                  "<td style='width:300px;' valign='middle'>",
                                    "<table border='0' cellspacing='0' cellpadding='0' width='100%'><tr>",
                                      "<td style='width:230px; padding:0px; margin:0px;'><span class='idxmTextSmall'>&nbsp;&nbsp;User Class: <b>{userSubClassLabel}</b></span></td>",
                                      '<tpl if="hideAllIcons == false">',
                                        '<tpl if="this.isInternal(userClassCode) && this.isPerson(userTypeCode)">',
                                          "<td align='left' valign='middle'><a href='javascript:uRadixWindowManager.launch({registryUpdateSubClass});' class='icon-updatesubclass' id='profile_icon_updatesubclass' qtip='Update Sub Class'></a></td>",
                                        "</tpl>",
                                      '</tpl>',
                                    "</tr></table>",
                                  "</td>",
                                  "<td></td>",
                                  '<tpl if="hideAllIcons == false">',
                                    "<td align='right' style='width:30px;'><a href='javascript:uRadixWindowManager.launch({registryUpdateStatus});' class='icon-updatestatus' id='profile_icon_updatestatus' qtip='Update Status'></a></td>",
                                    '<tpl if="this.isInternal(userClassCode)">',
                                      "<td align='right' style='width:30px;'><a href='javascript:uRadixWindowManager.launch({registryUpdateUser});' class='icon-updateuser' id='profile_icon_updateuser' qtip='Update User ID'></a></td>",
                                    "</tpl>",
                                    '<tpl if="this.isResetPasswordShowable(userClassCode, statusCode) == true">',
                                      "<td align='right' style='width:30px;'><a href='javascript:uRadixWindowManager.launch({registryResetPassword});' class='icon-resetpassword' id='profile_icon_resetpassword' qtip='Reset Password'></a></td>",
                                    "</tpl>",
                                    '<tpl if="this.isPerson(userTypeCode) && (!this.isInternal(userClassCode))">',
                                      '<tpl if="!this.isProvider(userClassCode)">',
                                         "<tpl if='mirrorUserURL'>",
                                            "<td align='right' style='width:30px;'><a href='{mirrorUserURL}?mirrorUserId={sysKey}&userTypeCode={userTypeCode}' class='icon-mirror' id='profile_icon_mirror' qtip='Mirror User'></a></td>",
                                         "</tpl>",
                                      '</tpl>',
                                    "</tpl>",
                                    '<tpl if="this.isPerson(userTypeCode) && this.isInternal(userClassCode)">',
                                     '<tpl if="(userReportsToIndicator)">',
                                      "<tpl if='mirrorUserURL'>",
                                        "<td align='right' style='width:30px;'><a href='{mirrorUserURL}?mirrorUserId={sysKey}&userTypeCode={userTypeCode}' class='icon-mirror' id='profile_icon_mirror' qtip='Mirror User'></a></td>",
                                      "</tpl>",                                     
                                     "</tpl>",
                                     '<tpl if="(!userReportsToIndicator)">',
                                      "<tpl if='mirrorUserURL'>",                                      
                                        "<td align='right' style='width:30px;'><a href='javascript:idxm.profile.popups.InvalidReportsTo(\"{userFirstName}\",\"{userLastName}\");' class='icon-mirror' id='profile_icon_mirror' qtip='Mirror User'></a></td>",
                                      "</tpl>",
                                      "</tpl>",
                                    "</tpl>",                                    
                                  "</tpl>",
                                  "</tr></table>",
                                  {
                                    isInternal: function(userClassCode_) {
                                      return userClassCode_ == IDXM_USER_CLASS_INTERNAL;
                                    },
                                    isLoginDateShowable: function(statusCode_, lastLoginDate_) {
                                    	 return (!Ext.isEmpty(lastLoginDate_));
                                    },
                                    isResendActivationShowable: function(userClassCode_, statusCode_, isLocked_) {
                                      var returnVal = false;
                                      if(this.isInternal(userClassCode_) == false)
                                      {
                                        if((isLocked_ == false) && (statusCode_ == IDXM_USER_STATUS_CODE_MAP["PENDING_USER_VALIDATION"]))
                                        {
                                          returnVal = true;
                                        }
                                      }
                                      return returnVal;
                                    },
                                    isPerson: function(userTypeCode_) {
                                      return userTypeCode_ == IDXM_USER_TYPE_PERSON;
                                    },
                                    isResetPasswordShowable: function(userClassCode_, statusCode_) {
                                      var returnVal = false;
                                      if(this.isInternal(userClassCode_) == false)
                                      {
                                        if((statusCode_ == IDXM_USER_STATUS_CODE_MAP["ACTIVE"] || statusCode_ == IDXM_USER_STATUS_CODE_MAP["PENDING_INITIAL_LOGIN"]))
                                        {
                                          returnVal = true;
                                        }
                                      }
                                      return returnVal;
                                    },
                                    isProvider: function(userClassCode_) {
                                        return userClassCode_ == IDXM_USER_CLASS_PROVIDER;
                                    }
                                  }),

  constructor: function(config)
  {
    var defaults = {
      border: true,
      cls:"user-profile-toolbar",
      bodyBorder:false,
      bodyCssClass: "user-profile-toolbar-body",
      html: this.STATUS_TABLE.applyTemplate({"nameSpace":config.nameSpace
                                             ,"statusCode":config.statusCode
                                             ,"statusName":config.statusName
                                             ,"userSubClassLabel":IDXM_USER_TYPE_MAP[config.userSubClassCode]
                                             ,"userFirstName":config.userFirstName
                                             ,"userLastName":config.userLastName
                                             ,"userReportsToIndicator":config.userReportsToIndicator
                                             ,"mirrorUserURL":config.mirrorUserURL
                                             ,"sysKey":config.sysKey
                                             ,"userTypeCode":config.userTypeCode
                                             ,"userClassCode":config.userClassCode
                                             ,"lastLoginDate":config.lastLoginDate
                                             ,"isLocked":((config.isLocked != undefined) && (config.isLocked == true)) ? true : false
                                             ,"hideAllIcons":((config.hideAllIcons != undefined) && (config.hideAllIcons == true)) ? true : false
                                             ,"registryUpdateUser":'{id:"updateUserId'+config.nameSpace+'", key:"updateUserId'+config.nameSpace+'"}'
                                             ,"registryUpdateStatus":'{id:"updateStatus'+config.nameSpace+'", key:"updateStatus'+config.nameSpace+'"}'
                                             ,"registryResendAccountActivation":'{id:"resendAccountActivation'+config.nameSpace+'", key:"resendAccountActivation'+config.nameSpace+'"}'
                                             ,"registryAccessHistory":'{id:"accessHistory'+config.nameSpace+'", key:"accessHistory'+config.nameSpace+'"}'
                                             ,"registryResetPassword":'{id:"resetPassword'+config.nameSpace+'", key:"resetPassword'+config.nameSpace+'"}'
                                             ,"registryUpdateSubClass":'{id:"updateSubClass'+config.nameSpace+'", key:"updateSubClass'+config.nameSpace+'"}'
                                           })
    };

    Ext.apply(this, defaults);
    idxm.profile.ux.ProfileBar.superclass.constructor.call(this, defaults);
  }
});
Ext.reg('idxm.profile.ux.ProfileBar', idxm.profile.ux.ProfileBar);

