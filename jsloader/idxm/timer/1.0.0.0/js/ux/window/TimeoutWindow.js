/**
 * Class:  idxm.timer.ux.window.TimerWindow
 *
 * Author: Imran Ahmad - Multiplan 2010
 *
 * Params: @required: N/A
 *
 */
Ext.namespace("idxm.timer.ux.window.TimerWindow");
idxm.timer.ux.window.TimerWindow = Ext.extend(Ext.Window,
{
  constructor: function(config)
  {
    var defaults = {
      width:600,
      height:225,
      modal:true,
      autoScroll:true,
      closable:false,
      resizable:false,
      layout:'fit',
      plain:true,
      items:[{
         xtype:"panel"
        ,border:false
        ,bodyBorder:false
        ,hideBorders:true
        ,style:"background-color:#FFFFFF; background:#FFFFFF; padding:5px;"
        ,items:[{
           xtype:"idxmStatusBox"
          ,status:"warning-noicon"
          ,statusText:"You are about to be logged out"
         },{
           xtype:"panel"          
          ,style:"padding-left:15px;"
          ,autoScroll:true
          ,html:"<span class='portal-text-large-bold'><BR>You have been idle and will be logged off in five minutes.<BR><BR>You will lose any information that has not been submitted.<BR><BR>Do you want to remain logged in? </span>"
         }]
        ,buttons: [{
           ctCls :"support-portal-btn-cancel"
          ,text: 'LOG OUT'
          ,scope: this
          ,handler: function(){
             this.fireEvent('killSession', this);
           }
         },{
           ctCls :"support-portal-btn"
          ,text: 'REMAIN LOGGED IN'
          ,scope:this
          ,handler: function(){
             this.fireEvent('pingSession', this);
           }
         }]
      }]
    };

    var n = {};
    Ext.apply(n,config);
    Ext.applyIf(n,defaults);

    idxm.timer.ux.window.TimerWindow.superclass.constructor.call(this, n);
    this.addEvents('killSession','pingSession');
  }
});
Ext.reg('idxm.timer.ux.window.TimerWindow', idxm.timer.ux.window.TimerWindow);

