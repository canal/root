/**
 * Description: This file contains global overrides to Ext.data.Connection to initialize
 *              the timeout counter whenever a server interaction occurs.
 *
 * Author: Imran Ahmad - Multiplan 2010
 *
 */

Ext.override(Ext.data.Connection, {
        // private
        handleResponse : function(response){
            var idxmTimer = JSLoader.getEnv("IDXM_TIMER_OBJECT");
            if(!Ext.isEmpty(idxmTimer))
            {
              idxmTimer.stopTimers();
              idxmTimer.startTimers({"main":true});
            }

            this.transId = false;
            var options = response.argument.options;
            response.argument = options ? options.argument : null;
            this.fireEvent("requestcomplete", this, response, options);
            if(options.success){
                options.success.call(options.scope, response, options);
            }
            if(options.callback){
                options.callback.call(options.scope, options, true, response);
            }
        },

        // private
        handleFailure : function(response, e){
            var idxmTimer = JSLoader.getEnv("IDXM_TIMER_OBJECT");
            if(!Ext.isEmpty(idxmTimer))
            {
              idxmTimer.stopTimers();
              idxmTimer.startTimers({"main":true});
            }

            // PGIDFE-8: Support for ajax request timeout alert
            if(response.isTimeout)
            {
               Ext.Msg.show({
                 title:'Timeout',
                 msg: '<div style="padding-top:7px;">Sorry, your request has timed out. Please contact support if the problem persists.</div>',
                 icon: Ext.MessageBox.WARNING
               });
            }

            this.transId = false;
            var options = response.argument.options;
            response.argument = options ? options.argument : null;
            this.fireEvent("requestexception", this, response, options, e);
            if(options.failure){
                options.failure.call(options.scope, response, options);
            }
            if(options.callback){
                options.callback.call(options.scope, options, false, response);
            }
        }
});

        