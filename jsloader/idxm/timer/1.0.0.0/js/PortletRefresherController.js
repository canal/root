/**
 * Class: idxm.timer.TimerController
 *
 * Author: Roberto Brenes - Multiplan 2010
 *
 */
Ext.namespace("idxm.timer.PortletRefresherArrayController");
idxm.timer.PortletRefresherArrayController = Ext.extend(Object,
{
	URLARRAY: new Array(),
	BASECONFIG: {},
	constructor: function(config)
    {
      if(!Ext.isEmpty(config)){this.BASECONFIG=config;}
    },addPortletUrlToArray:function(_URL){
    	if(!Ext.isEmpty(_URL)){
    		this.URLARRAY[this.URLARRAY.length]=_URL;
    	}
    },refreshPortletUrl:function(){
    	if(!Ext.isEmpty(this.URLARRAY)){
    		var success = true;
    		for(i=0;i<this.URLARRAY.length;i++){
    			if(!Ext.isEmpty(this.URLARRAY[i])){
    				var url = this.URLARRAY[i];
					var conn = new Ext.data.Connection();
					conn.request({
						url: url,
						method: 'POST',
						success: function(form,action){},
						failure: function() {
							alert('Please Login again.  We were unable to renew your session');
							success = false;
							thisObject.killSession({});
						}
					});    				
    			}
    		}
    		return success;
    	}    	
    }
});

idxm.timer.PortletRefresherArrayController = new idxm.timer.PortletRefresherArrayController({});

