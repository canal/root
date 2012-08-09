
/**
 * THIS JS FILE CONTAINS EXTENSIONS/OVERRIDERS FOR:
 *  1.) uRadix.form.FormPanel [Ext.form.FormPanel]
 *  2.) Ext.form.Action.Submit
 *  3.) Ext.form.BasicForm
 *  4.) Ext.form.Field
 */

/**
 * Extension: uRadix.form.FormPanel extends Ext.form.FormPanel
 * This extension adds default JsonReader's that will read the
 * Error Collection JSON Format specific blocks (eg. advices, messages, input errors, etc.)
 */
Ext.namespace("uRadix.form");
uRadix.form.FormPanel = Ext.extend(Ext.form.FormPanel,
{
  initComponent: function()
  {
    Ext.apply(this, {
      buttonAlign: "right",

      // Reads form input field errors
      errorReader: new Ext.data.JsonReader(
        {
          root:"messages.inputFields",
          successProperty:"status.success"
        },
        [
          {name:'code', mapping: 'typeCD'},
          {name:'ids', mapping: 'fieldID'},
          {name:'msg', mapping: 'title'},
          {name:'msgDetail', mapping: 'description'}
        ]
      ),

      // Reads the advice (global status) response message
      adviceReader: new Ext.data.JsonReader(
        {
          root:"advice",
          successProperty:"status.success"
        },
        [
          {name:'code', mapping: 'adviceCD'},
          {name:'name', mapping: 'name'},
          {name:'description', mapping: 'description'}
        ]
      ),

      // Reads the general form field mssages
      messageReader: new Ext.data.JsonReader(
        {
          root:"messages.general"
        },
        [
          {name:'code', mapping: 'typeCD'},
          {name:'msg', mapping: 'title'},
          {name:'msgDetail', mapping: 'description'}
        ]
      ),

      // Reads the successful data response message
      reader: new Ext.data.JsonReader(
        {
          root:"data",
          successProperty:"status.success"
        },
        [
          {name:'id', mapping: 'id'},
          {name:'value', mapping: 'value'}
        ]
      )

    });

    Ext.apply(this.initialConfig,
    {
      errorReader: this.errorReader,
      adviceReader: this.adviceReader,
      messageReader: this.messageReader,
      reader: this.reader,
      buttonAlign: this.buttonAlign
    });

    this.addEvents('uradix_enterkey');
    this.keys = [{
      key:13,
      scope: this,
      fn: function(key,e) {
        this.fireEvent('uradix_enterkey', this, e );
      }
    }]

    uRadix.form.FormPanel.superclass.initComponent.call(this, arguments);

  } // end initComponent
});
Ext.reg('uRadix.form.FormPanel', uRadix.form.FormPanel);



/**
 * Overriding: Action.Submit
 * This extension overrides Action.Submit to support the Multiplan Error Collection JSON format.
 * There are now multiple json readers to read the necessary response blocks.
 * The readers are: reader, errorReader, messageReader, adviceReader
 * There is also a check to see if "isRedirect" was added to the Connection object.
 * If so, the advices json block is sent to the CookieManager instead of the ClientMessageHandler.
 */
Ext.override(Ext.form.Action.Submit,
{
  handleResponse:function(response)
  {
    var errors = [];
    var data = [];
    var messages = [];
    var advices = [];
    var successBool;

    var resp = Ext.decode(response.responseText);
    successBool = resp.status.success;

    if(this.form.errorReader)
    {
      /**
       * Reading error messages
       */
      try
      {
        var rsErr = this.form.errorReader.read(response);

        successBool = rsErr.success;

        if(!successBool)
        {
          if(rsErr.records)
          {
            for(var i=0, len=rsErr.records.length; i<len; i++)
            {
              var r = rsErr.records[i];

              for(var n=0, idslen=r.data.ids.length; n<idslen; n++)
              {
                var obj = {"id": r.data.ids[n]};

                // Add the msgDetail and msg only to the last field
                if(n == r.data.ids.length-1)
                {
                  obj = {"id": r.data.ids[n], "msg": r.data.msg, "msgDetail": r.data.msgDetail};
                }

                errors.push(obj);
              }
            }
          }
        }
      }
      catch(e){}

      if(errors.length<1)
      {
        errors = null;
      }

      /**
       * Reading success data block
       */
      if(errors == null && this.form.reader)
      {
        // perform success reader parsing
        try
        {
          rsSucc = this.form.reader.read(response);
          successBool = rsSucc.success;

          if(rsSucc.records)
          {
            for(var i=0, len=rsSucc.records.length; i<len; i++)
            {
              var r = rsSucc.records[i];
              data[i] = r.data;
            }
          }
        }
        catch(e)
        {
          successBool = resp.status.success;
        }
      }

      /**
       * Reading general messages
       */
      if(this.form.messageReader)
      {
        try
        {
          var rsMsg = this.form.messageReader.read(response);

          if(rsMsg.records)
          {
            for(var i=0, len=rsMsg.records.length; i<len; i++)
            {
              var r = rsMsg.records[i];
              messages[i] = r.data;
            }
          }
        }
        catch(e){}

        if(messages.length<1)
        {
          messages = null;
        }
      }

      /**
       * Reading advice/status messages
       */
      if(this.form.adviceReader)
      {
        try
        {
          var rsAdv = this.form.adviceReader.read(response);
          successBool = rsAdv.success;

          if(rsAdv.records)
          {
            for(var i=0, len=rsAdv.records.length; i<len; i++)
            {
              var r = rsAdv.records[i];
              advices[i] = r.data;
            }
          }
        }
        catch(e){}

        if(advices.length<1)
        {
          advices = null;
        }
      }

      return {
        success : successBool,
        data: data,
        errors : errors,
        advices : advices,
        messages: messages
      };

    }

    return Ext.decode(response.responseText);
  },

 /**
  * isRedirect - sets the "success" status message in a cookie for later retrieval (upon redirect)
  * disableAllStatusBinding - disables all auto status message binding
  * disableErrorStatusBinding - disables only error status binding
  */
  success : function(response)
  {
    var result = this.processResponse(response);
    if(result === true || result.success)
    {
      if(!this.options.disableAllStatusBinding)
      {
        if(this.options.isRedirect)
        {
          // Store status response in cookie for display on the redirected page.
          uRadixCookieManager.createCookie(uRadixCookieManager.MPI_COOKIE_NAME, uRadixUtilities.jsonEncode(result), 1);
        }
        else
        {
          if(result.advices)
          {
            uRadixClientMessageHandler.setAdvice(true, result.advices);
          }

          if(result.messages)
          {
            if(this.options.isMessageIgnore != undefined && (!this.options.isMessageIgnore))
            {
              uRadixClientMessageHandler.setMessage(true, result.messages);
            }
          }
        }
      }

      this.form.afterAction(this, true);
      return;
    }

    if(!result.success)
    {
      if(result.errors)
      {
        this.form.markInvalid(result.errors);
        this.failureType = Ext.form.Action.SERVER_INVALID;
      }

      if(!this.options.disableAllStatusBinding && !this.options.disableErrorStatusBinding)
      {
        if(result.advices)
        {
          uRadixClientMessageHandler.setAdvice(false, result.advices);
        }

        if(result.messages)
        {
          if(this.options.isMessageIgnore != undefined && (!this.options.isMessageIgnore))
          {
            uRadixClientMessageHandler.setMessage(false, result.messages);
          }
        }
      }
    }

    this.form.afterAction(this, false);
  }

});


/**
 * Overriding: Ext.form.BasicForm
 * This extension supports the Error Collection JSON Format of having a
 * short error message and a detailed error message. This override will support the passing
 * of the new 2nd argument "msgDetail" to Ext.form.Field.markInvalid(..)
 */
Ext.override(Ext.form.BasicForm,
{
    markInvalid : function(errors)
    {
        if(Ext.isArray(errors)){
            for(var i = 0, len = errors.length; i < len; i++){
                var fieldError = errors[i];
                var f = this.findField(fieldError.id);
                if(f){
                    var msgDetail = null;
                    if(fieldError.msgDetail)
                    {
                      msgDetail = fieldError.msgDetail;
                    }
                    f.markInvalid(fieldError.msg, msgDetail);
                }
            }
        }else{
            var field, id;
            for(id in errors){
                if(typeof errors[id] != 'function' && (field = this.findField(id))){
                    field.markInvalid(errors[id]);
                }
            }
        }
        return this;
    }

});




/**
 * Overriding: Ext.form.Field
 * This extension supports a new msgTarget of "sideDetails" that will display a short
 * error to the right of a field and a "more" icon to launch a msgDetails tooltip.
 */
Ext.override(Ext.form.Field,
{
  isFieldEmpty: undefined,
  
  validateFieldEmpty: function(){
      	var value = this.getValue() || this.processValue(this.getRawValue()); 
      	if (!this.allowBlank && (value === undefined || value.length < 1 || value === this.emptyText)) {
      		this.isFieldEmpty = true;
      	}else{
      		this.isFieldEmpty = false;
      	}
  },
  
  markInvalid : function(msg, msgDetail)
  {
    if(!this.rendered || this.preventMark)
    {
      // not rendered
      return;
    }

    this.el.addClass(this.invalidClass);
    switch(this.msgTarget)
    {
      case 'qtip':
        msg = msg || this.invalidText;
        this.el.dom.qtip = msg;
        this.el.dom.qclass = 'x-form-invalid-tip';
        if(Ext.QuickTips)
        {
          // fix for floating editors interacting with DND
          Ext.QuickTips.enable();
        }
        break;
      case 'title':
        msg = msg || this.invalidText;
        this.el.dom.title = msg;
        break;
      case 'under':
      
 	var titleErr = msg;
 	this.validateFieldEmpty();
 	
        if(Ext.isEmpty(msgDetail))
        {
          if(msgDetail === undefined)
          {
            // Failed built-in validation
            if(this.isFieldEmpty){
            	titleErr = "Required";
            }else{
           	 titleErr = "Incorrect";
           }
            msgDetail=msg;
          }
          else if(msgDetail === null)
          {
            // Server did not return an error description
            titleErr = msg;
          }
        }    
                
        if(!this.errorEl)
        {
          var elp = this.el.findParent('.x-form-element', 5, true);
          this.errorEl = elp.createChild({});
          //this.errorEl.setWidth(this.width);
        }
        var myId = Ext.id();
        if(this.isFieldEmpty){
		this.errorEl.update("<span class='uradix-form-invalid-icon-under'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style='font-size:11px;'>"+titleErr+"</span>");
	}else{
		this.errorEl.update("<span class='uradix-form-invalid-icon-under'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style='font-size:11px;'>"+titleErr+"</span>&nbsp;</span><span id='"+myId+"' class='uradix-form-invalid-details-icon-under' onmouseover=\"document.body.style.cursor=\'default\';\" onmouseout=\"document.body.style.cursor=\'default\';\">&nbsp;&nbsp;&nbsp;&nbsp;</span>");
	}
        
        Ext.form.Field.msgFx[this.msgFx].show(this.errorEl, this);
        
        this.errorUnder = Ext.get(myId);
        if(this.errorUnder){
		this.errorUnder.dom.qtip = msgDetail || msg;
		this.errorUnder.dom.qclass = 'x-form-invalid-tip';
		this.errorUnder.show();    
	}
        break;
      case 'side':
        msg = msg || this.invalidText;
        if(!this.errorIcon)
        {
          var elp = this.el.findParent('.x-form-element', 5, true);
          this.errorIcon = elp.createChild({cls:'x-form-invalid-icon'});
        }
        this.alignErrorIcon();
        this.errorIcon.dom.qtip = msg;
        this.errorIcon.dom.qclass = 'x-form-invalid-tip';
        this.errorIcon.show();
        this.on('resize', this.alignErrorIcon, this);
        break;
      case 'sideWithDetails':
        msg = msg || this.invalidText;
        if(!this.errorEl)
        {
          var elp = this.el.findParent('.x-form-element', 5, true);
          this.errorEl = elp.createChild({cls:'x-form-invalid-msgDetail'});
          this.errorEl.setStyle({width:"auto"});
        }
        var newMsg = msg;
        this.errorEl.update(newMsg);

        if(Ext.isIE)
        {
          this.errorEl.setLeft(this.el.getWidth()+3);
        }
        else
        {
          this.errorEl.setLeft(this.el.getWidth()+20);
        }

        this.errorEl.show();
        this.on('resize', function(){this.errorEl.alignTo(this.el, 'tl-tr', [2, 0]);}, this);

        if(msgDetail)
        {
          var detailTipId = this.errorEl.id+"_detailsTip";
          var errorDetsEl = this.errorEl.createChild({id:detailTipId, cls: 'x-form-invalid-msgDetail-more'});
          errorDetsEl.update("&nbsp;&nbsp;");
          Ext.form.Field.msgFx[this.msgFx].show(errorDetsEl, this);

          var ttip = new Ext.ToolTip({
            target: detailTipId,
            html: msgDetail,
            title: 'Error Details',
            autoHide: true,
            closable: true,
            header:true,
            width: 200
          });
        }
        break;
      case 'sideDetails':
        var titleErr = msg;
        this.validateFieldEmpty();
        
        if(Ext.isEmpty(msgDetail))
        {
          if(msgDetail === undefined)
          {
            // Failed built-in validation
            if(this.isFieldEmpty){
            	titleErr = "Required";
            }else{
	        titleErr = "Incorrect";
	    }
            msgDetail=msg;
          }
          else if(msgDetail === null)
          {
            // Server did not return an error description
            titleErr = msg;
          }
        }

        if(!this.errorIcon)
        {
          var elp = this.el.findParent('.x-form-element', 5, true);
          this.errorIcon = elp.createChild({cls:'x-form-invalid-icon'});
        }

        if(!this.errorTitle)
        {
          var elp = this.el.findParent('.x-form-element', 5, true);
          this.errorTitle = elp.createChild({html:titleErr,cls:'x-form-invalid-msgDetail-noIcon'});
        }
        else
        {
          this.errorTitle.update(titleErr);
        }

        this.alignErrorIcon();
        this.errorIcon.show();

        this.errorTitle.alignTo(Ext.get(this.errorIcon.id), 'tl-tr', [4, 0]);
        this.errorTitle.show();

        if(!Ext.isEmpty(msgDetail))
        {
          if(!this.errorDetailsIcon)
          {
            var elp = this.el.findParent('.x-form-element', 5, true);
            this.errorDetailsIcon = elp.createChild({cls:'uradix-form-invalid-details-icon'});
          }

	  if(!this.isFieldEmpty){
		  this.errorDetailsIcon.dom.qtip = msgDetail;
		  this.errorDetailsIcon.dom.qclass = 'x-form-invalid-tip';
		  this.errorDetailsIcon.alignTo(Ext.get(this.errorTitle.id), 'tl-tr', [7, 0]);
		  this.errorDetailsIcon.show();
	  }else{
	  	this.errorDetailsIcon.hide();
	  }
        }

        this.on('resize', this.alignErrorIcon, this);
        break;
      default:
        var t = Ext.getDom(this.msgTarget);
        t.innerHTML = msg;
        t.style.display = this.msgDisplay;
        break;
    }

    this.fireEvent('invalid', this, msg);
  },

    clearInvalid : function(){
        if(!this.rendered || this.preventMark){ // not rendered
            return;
        }
        this.el.removeClass(this.invalidClass);
        switch(this.msgTarget){
            case 'qtip':
                this.el.dom.qtip = '';
                break;
            case 'title':
                this.el.dom.title = '';
                break;
            case 'under':
                if(this.errorEl){
                    Ext.form.Field.msgFx[this.msgFx].hide(this.errorEl, this);
                }
                break;
            case 'side':
                if(this.errorIcon){
                    this.errorIcon.dom.qtip = '';
                    this.errorIcon.hide();
                    this.un('resize', this.alignErrorIcon, this);
                }
                break;
            case 'sideWithDetails':
                if(this.errorEl){
                    Ext.form.Field.msgFx[this.msgFx].hide(this.errorEl, this);
                }
                break;
            case 'sideDetails':
                if(this.errorIcon){
                    this.errorIcon.dom.qtip = '';
                    this.errorIcon.hide();
                    this.un('resize', this.alignErrorIcon, this);
                    if(this.errorTitle){
                        this.errorTitle.hide();
                    }
                    if(this.errorDetailsIcon){
                        this.errorDetailsIcon.hide();
                    }
                }
                break;
            default:
                var t = Ext.getDom(this.msgTarget);
                t.innerHTML = '';
                t.style.display = 'none';
                break;
        }
        this.fireEvent('valid', this);
    }

   // Patch edit: https://extjs.com/forum/showthread.php?t=17532
   ,fireKey:function(e)
   {
     if(((Ext.isIE && e.type == 'keydown') || e.type == 'keypress') && e.isSpecialKey())
     {
       this.fireEvent('specialkey', this, e);
     }
     else
     {
       this.fireEvent(e.type, this, e);
     }
   }
   ,initEvents:function()
   {
//   this.el.on(Ext.isIE ? "keydown" : "keypress", this.fireKey,  this);
     this.el.on("focus", this.onFocus, this);
     this.el.on("blur", this.onBlur, this);
     this.el.on("keydown", this.fireKey, this);
     this.el.on("keypress", this.fireKey, this);
     this.el.on("keyup", this.fireKey, this);

     // reference to original value for reset
     this.originalValue = this.getValue();
   }

});


/**
 * Overriding: Ext.layout.FormLayout
 * This override is to support bolding and setting an asterisk on required fields.
 * The allowBlank property is now being passed along in getTemplateArgs.
 */
Ext.override(Ext.layout.FormLayout,
{
  getTemplateArgs: function(field) {
    var noLabelSep = !field.fieldLabel || field.hideLabel;
    var help = typeof field.help == 'undefined' ? false : field.help;
    var helpHandler = typeof field.helpHandler == 'undefined' ? false : field.helpHandler;
    var allowBlankBasic = typeof field.allowBlankBasic == 'undefined' ? false : field.allowBlankBasic;
    return {
      id: field.id,
      label: field.fieldLabel,
      labelStyle: field.labelStyle||this.labelStyle||'',
      elementStyle: this.elementStyle||'',
      labelSeparator: noLabelSep ? '' : (typeof field.labelSeparator == 'undefined' ? this.labelSeparator : field.labelSeparator),
      itemCls: (field.itemCls||this.container.itemCls||'') + (field.hideLabel ? ' x-hide-label' : ''),
      clearCls: field.clearCls || 'x-form-clear-left'
      ,allowBlank: field.allowBlank
      ,help: help
      ,helpHandler: helpHandler
      ,allowBlankBasic: allowBlankBasic
    };
  }
});

/**
 * Overriding: Ext.layout.ContainerLayout
 * Modified fieldTpl to XTemplate and added check for allowBlank property.
 */
Ext.layout.ContainerLayout.prototype.fieldTpl = (function() {
        var t = new Ext.XTemplate(
            '<div class="x-form-item {itemCls}" tabIndex="-1">',
                '<tpl if="(allowBlank == false)&&(help == true)">',
                 	'<tpl if="(allowBlank == false)&&(allowBlankBasic == true)">',
				'<table><tr><td><label for="{id}" style="{labelStyle}" class="x-form-item-label">{label}{labelSeparator}',
                 	 '</tpl>',
			'<tpl if="(allowBlank == false)&&(allowBlankBasic == false)">',
				'<table><tr><td><label for="{id}" style="{labelStyle}" class="x-form-item-label"><b>* {label}</b>{labelSeparator}',
                 	 '</tpl>',                 	 
			'</label>',
			'</td><td><div class="uradix-form-help-details-icon" style="visibility: visible;" onclick="{helpHandler};" title="More Information" onmouseover="document.body.style.cursor=\'pointer\';" onmouseout="document.body.style.cursor=\'default\';"></div></td></tr></table>',                                 	
                '</tpl>',
                '<tpl if="(allowBlank == false)&&(help == false)">',
                 	'<tpl if="(allowBlank == false)&&(allowBlankBasic == true)">',
				'<label for="{id}" style="{labelStyle}" class="x-form-item-label">{label}{labelSeparator}',
				'</label>',				
                 	 '</tpl>',
			'<tpl if="(allowBlank == false)&&(allowBlankBasic == false)">',
				'<label for="{id}" style="{labelStyle}" class="x-form-item-label"><b>* {label}</b>{labelSeparator}',
				'</label>',				
                 	 '</tpl>',                
                '</tpl>',                
                '<tpl if="(((allowBlank === undefined) || (allowBlank === null) || (allowBlank == true)) && (help == true))">',
                '<table><tr><td><label for="{id}" style="{labelStyle}" class="x-form-item-label">{label}{labelSeparator}',
                '</label>',
                '</td><td><div class="uradix-form-help-details-icon" style="visibility: visible;" onclick="{helpHandler};" title="More Information" onmouseover="document.body.style.cursor=\'pointer\';" onmouseout="document.body.style.cursor=\'default\';"></div></td></tr></table>',
                '</tpl>',
                '<tpl if="(((allowBlank === undefined) || (allowBlank === null) || (allowBlank == true)) && (help == false))">',
                '<label for="{id}" style="{labelStyle}" class="x-form-item-label">{label}{labelSeparator}</label>',
                '</tpl>',                
                '<div class="x-form-element" id="x-form-el-{id}" style="{elementStyle}">',
                '</div><div class="{clearCls}"></div>',
            '</div>'
        );
        t.disableFormats = true;
        return t.compile();
    })();
 
 //Default validation Event to blur
 Ext.form.Field.prototype.validationEvent = "blur";

/**
 * Overriding: Ext.lib.Ajax.serializeForm(form)
 * Adding check for disabledSubmit boolean to allow submission of disabled fields.
 *
 * NEEDS SOME FIXES (commenting out)
Ext.lib.Ajax.serializeForm = function(form) {
		        var fElements = form.elements || (document.forms[form] || Ext.getDom(form)).elements,
	            	hasSubmit = false,
	            	encoder = encodeURIComponent,
		        	element,
	            	options, 
	            	name, 
	            	val,             	
	            	data = '',
	            	type;
	            	
		        Ext.each(fElements, function(element) {		            
	                name = element.name;	             
					type = element.type;
					
	                if (!(element.disabled || element.disabledSubmit) && name){
		                if(/select-(one|multiple)/i.test(type)){			                
				            Ext.each(element.options, function(opt) {
					            if (opt.selected) {
						            data += String.format("{0}={1}&", 						            					  
						            					 encoder(name),
                                                         encoder((opt.hasAttribute ? opt.hasAttribute('value') : opt.getAttribute('value') !== null) ? opt.value : opt.text));
                                }								
                            });
		                } else if(!/file|undefined|reset|button/i.test(type)) {
			                if(!(/radio|checkbox/i.test(type) && !element.checked) && !(type == 'submit' && hasSubmit)){
                                    
                                data += encoder(name) + '=' + encoder(element.value) + '&';                     
                                hasSubmit = /submit/i.test(type);    
                            } 		                
		                } 
	                }
	            });            
	            return data.substr(0, data.length - 1);
	        };
*/

Ext.ux.ResizableComboBox = Ext.extend(Ext.form.ComboBox, {
	initComponent: function(){
	    Ext.ux.ResizableComboBox.superclass.initComponent.call(this);
	    this.on('render', this.resizeToFitContent, this);
	},
	resizeToFitContent: function(){
	 if (!this.elMetrics){
	            this.elMetrics = Ext.util.TextMetrics.createInstance(this.getEl());
	 }
	 var m = this.elMetrics, width = 0, el = this.el, s = this.getSize();
	 this.store.each(function (r) {
	            var text = r.get(this.displayField);
	            width = Math.max(width, m.getWidth(text));
	        }, this);
	 if (el) {
	            width += el.getBorderWidth('lr');
	            width += el.getPadding('lr');
	        }
	 if (this.trigger) {
	            width += this.trigger.getWidth();
	 }
	 s.width = width;
	 this.setSize(s);
	 this.store.on({
	            'datachange': this.resizeToFitContent,
	            'add': this.resizeToFitContent,
	            'remove': this.resizeToFitContent,
	            'load': this.resizeToFitContent,
	            'update': this.resizeToFitContent,
	            buffer: 10,
	            scope: this
	 });
	    }
	});Ext.reg('resizable-combo', Ext.ux.ResizableComboBox);
