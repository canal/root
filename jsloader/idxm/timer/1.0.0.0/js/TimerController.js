/**
 * Class: idxm.timer.TimerController
 *
 * Author: Imran Ahmad - Multiplan 2010
 *
 * Params: @required: killSessionUrl, pingSessionUrl
 *         @optional: timeOutInterval, timeOutWarnInterval
 *
 */
Ext.namespace("idxm.timer.TimerController");
idxm.timer.TimerController = Ext.extend(Object,
{
    PREFIX_ID: "idxmTimer",
    DEFAULT_TIMEOUT_MAIN: 1440000, // ms
    DEFAULT_TIMEOUT_WARN: 300000, // ms
    BASECONFIG: {},
    TIMER_TASK_OBJ: undefined,
    TIMER_TASK_INNER_OBJ: undefined,
    TIMEOUT_WINDOW: undefined,
    URL_KILL_SESSION: undefined,
    URL_PING_SESSION: undefined,

    constructor: function(config)
    {
      if(!Ext.isEmpty(config)){this.BASECONFIG=config;}
      this.URL_CHECK_SESSION_ALIVE = config.sessionAliveLink;
      this.URL_KILL_SESSION = config.killSessionUrl;
      this.URL_PING_SESSION = config.pingSessionUrl;
    },
    startTimers: function(o)
    {
      if(o.main)
      {
        // Start main timer
        if(Ext.isEmpty(this.TIMER_TASK_OBJ))
        {
          this.TIMER_TASK_OBJ = new Ext.util.DelayedTask(function() {
            this.showTimeoutWindow();
          }, this);
        }

        this.TIMER_TASK_OBJ.delay((Ext.isEmpty(this.BASECONFIG.timeOutInterval)==false)?this.BASECONFIG.timeOutInterval:this.DEFAULT_TIMEOUT_MAIN);
      }

      if(o.inner)
      {
        // Start inner/popup timer
        if(Ext.isEmpty(this.TIMER_TASK_INNER_OBJ))
        {
          this.TIMER_TASK_INNER_OBJ = new Ext.util.DelayedTask(function() {
            this.checkSessionAlive({ping:false,o:o});
          }, this);
        }

        this.TIMER_TASK_INNER_OBJ.delay((Ext.isEmpty(this.BASECONFIG.timeOutWarnInterval)==false)?this.BASECONFIG.timeOutWarnInterval:this.DEFAULT_TIMEOUT_WARN);
      }
    },
    stopTimers: function()
    {
      if(!Ext.isEmpty(this.TIMER_TASK_OBJ))
      {
        this.TIMER_TASK_OBJ.cancel();
      }

      if(!Ext.isEmpty(this.TIMER_TASK_INNER_OBJ))
      {
        this.TIMER_TASK_INNER_OBJ.cancel();
      }
    },
    showTimeoutWindow: function()
    {
      this.TIMEOUT_WINDOW = new idxm.timer.ux.window.TimerWindow();
      this.TIMEOUT_WINDOW.show();

      this.TIMEOUT_WINDOW.on("killSession", function(o) {
        this.killSession(o);
      }, this);

      this.TIMEOUT_WINDOW.on("pingSession", function(o) {
        this.pingSession(o);
      }, this);

      this.startTimers({"inner":true});

      return;
    },
    checkSessionAlive: function(config){ 
		  thisObject = this;
    	
	      Ext.Ajax.request({
	        url: this.URL_CHECK_SESSION_ALIVE,
	        success: function(response){	        	
	        	var jsonResponse = uRadixUtilities.jsonDecode(response.responseText);
	        	if((!Ext.isEmpty(jsonResponse.status))&&(!Ext.isEmpty(jsonResponse.status.sessionAlive))&&(jsonResponse.status.sessionAlive)){
	        	  
	        	  //Close Window & stop timer
	        	  thisObject.TIMEOUT_WINDOW.close();
	        	  thisObject.stopTimers();	        	  
	        	  
	        	  //Check for Portlet URLs
        	  	  var succesPortletUrls =idxm.timer.PortletRefresherArrayController.refreshPortletUrl(thisObject);			      
			      if(!succesPortletUrls){
			      	window.location = window.location;
			      }    	  
	        	  
			      //If Ping then we call continue path
	        	  if(config.ping){
				      Ext.Ajax.request({
				        url: thisObject.URL_PING_SESSION,
				        success: Ext.emptyFn,
				        failure: Ext.emptyFn
				      });
	        	  }

	        	  //Restart Timmer
	        	  thisObject.startTimers({"main":true});	        	  
	        	  
	        	}else{	 
	        		 if(config.ping){	        		 	
	        		 	alert('We are Sorry your Session has time out.  Please login again.');
	        		 	thisObject.killSession(config.o);
	        		 }else{
	        		 	thisObject.killSession(config.o);
	        		 }
	        	}
	        },
	        failure: function(){
	        	  Ext.Msg.alert('Status', 'Check Session Alive Ajax Call Failed.');	        	  
	        	  thisObject.killSession(config.o);
	        }
	      });	     
    },
    killSession: function(o)
    {
      this.TIMEOUT_WINDOW.close();
      this.stopTimers();

      uRadixRedirectHandler.redirect(this.URL_KILL_SESSION);
    },
    pingSession: function(o)
    {
      this.checkSessionAlive({ping:true,o:o});      
    }
    
});

