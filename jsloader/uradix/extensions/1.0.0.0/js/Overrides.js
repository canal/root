/**
 * Overriding: Ext.tree.TreePanel to support a getUnchecked function
 */
Ext.tree.TreePanel.prototype.getUnchecked = function(a, startNode){
  startNode = startNode || this.root;
  var r = [];
  var f = function()
  {
    if((this.attributes.checked != undefined) && (this.attributes.checked == false))
    {
      r.push(!a ? this : (a == 'id' ? this.id : this.attributes[a]));
    }
  };

  startNode.cascade(f);
  return r;
};

Ext.extend(Ext.data.ScriptTagProxy, Ext.data.DataProxy, {
    /**
     * @cfg {String} url The URL from which to request the data object.
     */
    /**
     * @cfg {Number} timeout (optional) The number of milliseconds to wait for a response. Defaults to 30 seconds.
     */
    timeout : 30000,
    /**
     * @cfg {String} callbackParam (Optional) The name of the parameter to pass to the server which tells
     * the server the name of the callback function set up by the load call to process the returned data object.
     * Defaults to "callback".<p>The server-side processing must read this parameter value, and generate
     * javascript output which calls this named function passing the data object as its only parameter.
     */
    callbackParam : "callback",
    /**
     *  @cfg {Boolean} nocache (optional) Defaults to true. Disable caching by adding a unique parameter
     * name to the request.
     */
    nocache : true,

    /**
     * HttpProxy implementation of DataProxy#doRequest
     * @param {String} action
     * @param {Ext.data.Record/Ext.data.Record[]} rs If action is <tt>read</tt>, rs will be null
     * @param {Object} params An object containing properties which are to be used as HTTP parameters
     * for the request to the remote server.
     * @param {Ext.data.DataReader} reader The Reader object which converts the data
     * object into a block of Ext.data.Records.
     * @param {Function} callback The function into which to pass the block of Ext.data.Records.
     * The function must be passed <ul>
     * <li>The Record block object</li>
     * <li>The "arg" argument from the load function</li>
     * <li>A boolean success indicator</li>
     * </ul>
     * @param {Object} scope The scope in which to call the callback
     * @param {Object} arg An optional argument which is passed to the callback as its second parameter.
     */
    doRequest : function(action, rs, params, reader, callback, scope, arg) {
        var p = Ext.urlEncode(Ext.apply(params, this.extraParams));

        var url = this.buildUrl(action, rs);
        if (!url) {
            throw new Ext.data.Api.Error('invalid-url', url);
        }
        url = Ext.urlAppend(url, p);

        if(this.nocache){
            url = Ext.urlAppend(url, '_dc=' + (new Date().getTime()));
        }
        var transId = ++Ext.data.ScriptTagProxy.TRANS_ID;
        var trans = {
            id : transId,
            action: action,
            cb : "stcCallback"+transId,
            scriptId : "stcScript"+transId,
            params : params,
            arg : arg,
            url : url,
            callback : callback,
            scope : scope,
            reader : reader
        };
        window[trans.cb] = this.createCallback(action, rs, trans);
        url += String.format("&{0}={1}", "callback", this.callbackParam);
        if(this.autoAbort !== false){
            this.abort();
        }

        trans.timeoutId = this.handleFailure.defer(this.timeout, this, [trans]);

        var script = document.createElement("script");
        script.setAttribute("src", url);
        script.setAttribute("type", "text/javascript");
        script.setAttribute("id", trans.scriptId);
        this.head.appendChild(script);

        this.trans = trans;
    },

    // @private createCallback
    createCallback : function(action, rs, trans) {
        var self = this;
        return function(res) {
            self.trans = false;
            self.destroyTrans(trans, true);
            if (action === Ext.data.Api.actions.read) {
                self.onRead.call(self, action, trans, res);
            } else {
                self.onWrite.call(self, action, trans, res, rs);
            }
        };
    },
    /**
     * Callback for read actions
     * @param {String} action [Ext.data.Api.actions.create|read|update|destroy]
     * @param {Object} trans The request transaction object
     * @param {Object} res The server response
     * @private
     */
    onRead : function(action, trans, res) {
        var result;
        try {
            result = trans.reader.readRecords(res);
        }catch(e){
            // @deprecated: fire loadexception
            this.fireEvent("loadexception", this, trans, res, e);

            this.fireEvent('exception', this, 'response', action, trans, res, e);
            trans.callback.call(trans.scope||window, null, trans.arg, false);
            return;
        }
        if (result.success === false) {
            // @deprecated: fire old loadexception for backwards-compat.
            this.fireEvent('loadexception', this, trans, res);

            this.fireEvent('exception', this, 'remote', action, trans, res, null);
        } else {
            this.fireEvent("load", this, res, trans.arg);
        }
        trans.callback.call(trans.scope||window, result, trans.arg, result.success);
    },
    /**
     * Callback for write actions
     * @param {String} action [Ext.data.Api.actions.create|read|update|destroy]
     * @param {Object} trans The request transaction object
     * @param {Object} res The server response
     * @private
     */
    onWrite : function(action, trans, response, rs) {
        var reader = trans.reader;
        try {
            // though we already have a response object here in STP, run through readResponse to catch any meta-data exceptions.
            var res = reader.readResponse(action, response);
        } catch (e) {
            this.fireEvent('exception', this, 'response', action, trans, res, e);
            trans.callback.call(trans.scope||window, null, res, false);
            return;
        }
        if(!res.success === true){
            this.fireEvent('exception', this, 'remote', action, trans, res, rs);
            trans.callback.call(trans.scope||window, null, res, false);
            return;
        }
        this.fireEvent("write", this, action, res.data, res, rs, trans.arg );
        trans.callback.call(trans.scope||window, res.data, res, true);
    },

    // private
    isLoading : function(){
        return this.trans ? true : false;
    },

    /**
     * Abort the current server request.
     */
    abort : function(){
        if(this.isLoading()){
            this.destroyTrans(this.trans);
        }
    },

    // private
    destroyTrans : function(trans, isLoaded){
        this.head.removeChild(document.getElementById(trans.scriptId));
        clearTimeout(trans.timeoutId);
        if(isLoaded){
            window[trans.cb] = undefined;
            try{
                delete window[trans.cb];
            }catch(e){}
        }else{
            // if hasn't been loaded, wait for load to remove it to prevent script error
            window[trans.cb] = function(){
                window[trans.cb] = undefined;
                try{
                    delete window[trans.cb];
                }catch(e){}
            };
        }
    },

    // private
    handleFailure : function(trans){
        this.trans = false;
        this.destroyTrans(trans, false);
        if (trans.action === Ext.data.Api.actions.read) {
            // @deprecated firing loadexception
            this.fireEvent("loadexception", this, null, trans.arg);
        }

        this.fireEvent('exception', this, 'response', trans.action, {
            response: null,
            options: trans.arg
        });
        try{
        	trans.callback.call(trans.scope||window, null, trans.arg, false);
        }catch(e){}
    },

    // inherit docs
    destroy: function(){
        this.abort();
        Ext.data.ScriptTagProxy.superclass.destroy.call(this);
    }
});
