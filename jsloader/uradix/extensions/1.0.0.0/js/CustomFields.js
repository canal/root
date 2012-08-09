
/**
 * THIS JS FILE CONTAINS THE FOLLOWING CUSTOM FIELDS:
 *  1.) uRadix.form.PhoneField [Ext.Panel]
 *  2.) uRadix.form.SSNField [Ext.Panel]
 *  3.) uRadix.form.TINField [Ext.Panel]
 *  4.) uRadix.form.DOBField [Ext.Panel]
 */

/**
 * Extension: uRadix.form.Phone extends Ext.Panel
 * This extension adds multiple text fields in a unified column Panel layout
 */
Ext.namespace("uRadix.form.PhoneField");
uRadix.form.PhoneField = Ext.extend(Ext.Panel,
{
  initComponent: function()
  {
    var hyphenSeparatorLabelTop = "<div class='x-form-item' tabindex='-1'><label class='x-form-item-label' style='width: auto;'></label><div class='x-form-element' style='padding-left: 0pt;'>-</div><div class='x-form-clear-left'/></div>";

    Ext.apply(this, {
      layout: "column",
      autoWidth: true,

      items: [
        {
          width:40,
          layout:"form",
          items: [
            {
              id:this.id+"_1",
              hideLabel:true,
              width:35,
              style:'padding-right:5px',
              maxLength:3,
              autoCreate : {tag:'input', type:'text', size:'20', autocomplete:'off', maxlength:'3'},
              xtype:"textfield",
              vtype:"numeric",
              listeners: {
                'keyup': {
                  fn: function(cmp)
                  {
                    var thisCmp = Ext.get(cmp.id);
                    if(thisCmp.dom.value.length === 3)
                    {
                      Ext.getCmp(this.id+"_2").focus();
                    }
                  },
                  scope: this
                }
              }

            }
          ]
        },
        {
          width:49,
          layout:"form",
          items: [
            {
              id:this.id+"_2",
              fieldLabel: "-",
              labelStyle:'padding-left:0px; padding-right:3px; width:5px; margin-top:3px; float:left;',
              labelSeparator: "",
              width:35,
              maxLength:3,
              autoCreate : {tag:'input', type:'text', size:'20', autocomplete:'off', maxlength:'3'},
              xtype:"textfield",
              vtype:"numeric",
              listeners: {
                'beforerender': {
                  fn: function(cmp)
                  {
                    Ext.get("x-form-el-"+cmp.id).dom.style.cssText="padding-left:5px;";
                  },
                  scope: this
                },
                'keyup': {
                  fn: function(cmp)
                  {
                    var thisCmp = Ext.get(cmp.id);
                    if(thisCmp.dom.value.length === 3)
                    {
                      Ext.getCmp(this.id+"_3").focus();
                    }
                  },
                  scope: this
                }
              }
            }
          ]
        },
        {
          width:60,
          layout:"form",
          items: [
            {
              id:this.id+"_3",
              fieldLabel: "-",
              labelStyle:'padding-left:0px; padding-right:4px; width:5px; margin-top:3px; float:left;',
              labelSeparator: "",
              width:50,
              maxLength:4,
              autoCreate : {tag:'input', type:'text', size:'20', autocomplete:'off', maxlength:'4'},
              xtype:"textfield",
              vtype:"numeric",
              listeners: {
                'beforerender': {
                  fn: function(cmp)
                  {
                    Ext.get("x-form-el-"+cmp.id).dom.style.cssText="padding-left:5px;";
                  },
                  scope: this
                }
              }
            }
          ]
        },
        {
          width:110,
          layout:"form",
          items: [
            {
              id:this.id+"Ext",
              fieldLabel: "x",
              labelStyle:'padding-left:3px; padding-right:0px; width:15px; margin-top:3px; float:left;',
              labelSeparator: "",
              width:50,
              xtype:"textfield",
              vtype:"numeric",
              listeners: {
                'beforerender': {
                  fn: function(cmp)
                  {
                    Ext.get("x-form-el-"+cmp.id).dom.style.cssText="padding-left:3px;";
                  },
                  scope: this
                }
              }
            }
          ]
        }
      ]
    });

    Ext.apply(this.initialConfig,
    {
      layout: this.layout,
      items: this.items
    });

    uRadix.form.PhoneField.superclass.initComponent.call(this);
  }
});
Ext.reg('phonefield', uRadix.form.PhoneField);



/**
 * Extension: uRadix.form.SSNField extends Ext.Panel
 * This extension adds multiple text fields in a unified column Panel layout
 */
Ext.namespace("uRadix.form.SSNField");
uRadix.form.SSNField = Ext.extend(Ext.Panel,
{
  initComponent: function()
  {
    Ext.apply(this, {
      layout: "column",
      autoWidth: true,

      items: [
        {
          width:40,
          layout:"form",
          items: [
            {
              id:this.id+"_1",
              hideLabel:true,
              width:35,
              style:'padding-right:5px',
              maxLength:3,
              autoCreate : {tag:'input', type:'text', size:'20', autocomplete:'off', maxlength:'3'},
              msgTarget: "qtip",
              xtype:"textfield",
              vtype:"numeric",
              listeners: {
                'keyup': {
                  fn: function(cmp)
                  {
                    var thisCmp = Ext.get(cmp.id);
                    if(thisCmp.dom.value.length === 3)
                    {
                      Ext.getCmp(this.id+"_2").focus();
                    }
                  },
                  scope: this
                }
              }
            }
          ]
        },
        {
          width:42,
          layout:"form",
          items: [
            {
              id:this.id+"_2",
              fieldLabel: "-",
              labelStyle:'padding-left:0px; padding-right:3px; width:5px; margin-top:3px; float:left;',
              labelSeparator: "",
              width:29,
              maxLength:2,
              autoCreate : {tag:'input', type:'text', size:'20', autocomplete:'off', maxlength:'2'},
              xtype:"textfield",
              vtype:"numeric",
              listeners: {
                'beforerender': {
                  fn: function(cmp)
                  {
                    Ext.get("x-form-el-"+cmp.id).dom.style.cssText="padding-left:5px;";
                  },
                  scope: this
                },
                'keyup': {
                  fn: function(cmp)
                  {
                    var thisCmp = Ext.get(cmp.id);
                    if(thisCmp.dom.value.length === 2)
                    {
                      Ext.getCmp(this.id+"_3").focus();
                    }
                  },
                  scope: this
                }
              }
            }
          ]
        },
        {
          width:60,
          layout:"form",
          items: [
            {
              id:this.id+"_3",
              fieldLabel: "-",
              labelStyle:'padding-left:0px; padding-right:4px; width:5px; margin-top:3px; float:left;',
              labelSeparator: "",
              width:50,
              maxLength:4,
              autoCreate : {tag:'input', type:'text', size:'20', autocomplete:'off', maxlength:'4'},
              xtype:"textfield",
              vtype:"numeric",
              listeners: {
                'beforerender': {
                  fn: function(cmp)
                  {
                    Ext.get("x-form-el-"+cmp.id).dom.style.cssText="padding-left:5px;";
                  },
                  scope: this
                }
              }
            }
          ]
        }
      ]
    });

    Ext.apply(this.initialConfig,
    {
      layout: this.layout,
      items: this.items
    });

    uRadix.form.SSNField.superclass.initComponent.call(this);
  }
});
Ext.reg('ssnfield', uRadix.form.SSNField);



/**
 * Extension: uRadix.form.TINField extends Ext.Panel
 * This extension adds multiple text fields in a unified column Panel layout
 */
Ext.namespace("uRadix.form.TINField");
uRadix.form.TINField = Ext.extend(Ext.Panel,
{
  initComponent: function()
  {
    Ext.apply(this, {
      layout: "column",
      autoWidth: true,

      items: [
        {
          width:40,
          layout:"form",
          items: [
            {
              id:this.id+"_1",
              hideLabel: true,
//              fieldLabel: this.fieldLabel,
              width:35,
              style:'padding-right:5px',
              maxLength:2,
              autoCreate : {tag:'input', type:'text', size:'20', autocomplete:'off', maxlength:'2'},
              msgTarget: "qtip",
              xtype:"textfield",
              vtype:"numeric",
              listeners: {
                'keyup': {
                  fn: function(cmp)
                  {
                    var thisCmp = Ext.get(cmp.id);
                    if(thisCmp.dom.value.length === 2)
                    {
                      Ext.getCmp(this.id+"_2").focus();
                    }
                  },
                  scope: this
                }
              }
            }
          ]
        },
        {
          width:80,
          layout:"form",
          items: [
            {
              id:this.id+"_2",
              fieldLabel: "-",
              labelStyle:'padding-left:0px; padding-right:3px; width:5px; margin-top:3px; float:left;',
              labelSeparator: "",
              width:65,
              maxLength:7,
              autoCreate : {tag:'input', type:'text', size:'20', autocomplete:'off', maxlength:'7'},
              xtype:"textfield",
              vtype:"numeric",
              listeners: {
                'beforerender': {
                  fn: function(cmp)
                  {
                    Ext.get("x-form-el-"+cmp.id).dom.style.cssText="padding-left:5px;";
                  },
                  scope: this
                }
              }
            }
          ]
        }
      ]
    });

    Ext.apply(this.initialConfig,
    {
      layout: this.layout,
      items: this.items
    });

    uRadix.form.TINField.superclass.initComponent.call(this);
  }
});
Ext.reg('tinfield', uRadix.form.TINField);



/**
 * Extension: uRadix.form.DOBField extends Ext.Panel
 * This extension adds multiple text fields in a unified column Panel layout
 */
Ext.namespace("uRadix.form.DOBField");
uRadix.form.DOBField = Ext.extend(Ext.Panel,
{
  initComponent: function()
  {
    Ext.apply(this, {
      layout: "column",
      autoWidth: true,

      items: [
        {
          width:37,
          layout:"form",
          items: [
            {
              id:this.id+"_1",
              hideLabel: true,
//              fieldLabel: this.fieldLabel,
              width:32,
              style:'padding-right:5px',
              maxLength:2,
              autoCreate : {tag:'input', type:'text', size:'20', autocomplete:'off', maxlength:'2'},
              xtype:"textfield",
              vtype:"numeric",
              emptyText: "mm",
              listeners: {
                'keyup': {
                  fn: function(cmp)
                  {
                    var thisCmp = Ext.get(cmp.id);
                    if(thisCmp.dom.value.length === 2)
                    {
                      Ext.getCmp(this.id+"_2").focus();
                    }
                  },
                  scope: this
                }
              }
            }
          ]
        },
        {
          width:42,
          layout:"form",
          items: [
            {
              id:this.id+"_2",
              fieldLabel: "/",
              labelStyle:'padding-left:0px; padding-right:3px; width:5px; margin-top:3px; float:left;',
              labelSeparator: "",
              width:29,
              maxLength:2,
              autoCreate : {tag:'input', type:'text', size:'20', autocomplete:'off', maxlength:'2'},
              xtype:"textfield",
              vtype:"numeric",
              emptyText: "dd",
              listeners: {
                'beforerender': {
                  fn: function(cmp)
                  {
                    Ext.get("x-form-el-"+cmp.id).dom.style.cssText="padding-left:5px;";
                  },
                  scope: this
                },
                'keyup': {
                  fn: function(cmp)
                  {
                    var thisCmp = Ext.get(cmp.id);
                    if(thisCmp.dom.value.length === 2)
                    {
                      Ext.getCmp(this.id+"_3").focus();
                    }
                  },
                  scope: this
                }
              }
            }
          ]
        },
        {
          width:60,
          layout:"form",
          items: [
            {
              id:this.id+"_3",
              fieldLabel: "/",
              labelStyle:'padding-left:0px; padding-right:4px; width:5px; margin-top:3px; float:left;',
              labelSeparator: "",
              width:50,
              maxLength:4,
              autoCreate : {tag:'input', type:'text', size:'20', autocomplete:'off', maxlength:'4'},
              xtype:"textfield",
              vtype:"numeric",
              emptyText: "yyyy",
              listeners: {
                'beforerender': {
                  fn: function(cmp)
                  {
                    Ext.get("x-form-el-"+cmp.id).dom.style.cssText="padding-left:5px;";
                  },
                  scope: this
                }
              }
            }
          ]
        }
      ]
    });

    Ext.apply(this.initialConfig,
    {
      layout: this.layout,
      items: this.items
    });

    uRadix.form.DOBField.superclass.initComponent.call(this);
  }
});
Ext.reg('dobfield', uRadix.form.DOBField);



/**
 * Extension: uRadix.form.ShortNameField extends Ext.Panel
 * This extension adds multiple text fields in a unified column Panel layout
 */
Ext.namespace("uRadix.form.ShortNameField");
uRadix.form.ShortNameField = Ext.extend(Ext.Panel,
{
  initComponent: function()
  {
    Ext.apply(this, {
      layout: "column",
      autoWidth: true,

      items: [
        {
          width:74,
          layout:"form",
          items: [
            {
              id:this.id+"_1",
              hideLabel: true,
//              fieldLabel: this.fieldLabel,
              width:70,
              style:'padding-right:5px',
              xtype:"textfield",
              emptyText: "first name"
            }
          ]
        },
        {
          width:22,
          layout:"form",
          items: [
            {
              id:this.id+"_2",
              fieldLabel: "",
              labelStyle:'padding-left:0px; padding-right:0px; width:0px;',
              labelSeparator: "",
              width:17,
              maxLength:1,
              autoCreate : {tag:'input', type:'text', size:'20', autocomplete:'off', maxlength:'1'},
              xtype:"textfield",
              emptyText: "i",
              listeners: {
                'beforerender': {
                  fn: function(cmp)
                  {
                    Ext.get("x-form-el-"+cmp.id).dom.style.cssText="padding-left:3px;";
                  },
                  scope: this
                },
                'keyup': {
                  fn: function(cmp)
                  {
                    var thisCmp = Ext.get(cmp.id);
                    if(thisCmp.dom.value.length === 1)
                    {
                      Ext.getCmp(this.id+"_3").focus();
                    }
                  },
                  scope: this
                }
              }
            }
          ]
        },
        {
          width:180,
          layout:"form",
          items: [
            {
              id:this.id+"_3",
              fieldLabel: "",
              labelStyle:'padding-left:0px; padding-right:0px; width:0px;',
              labelSeparator: "",
              width:70,
              xtype:"textfield",
              emptyText: "last name",
              listeners: {
                'beforerender': {
                  fn: function(cmp)
                  {
                    Ext.get("x-form-el-"+cmp.id).dom.style.cssText="padding-left:5px;";
                  },
                  scope: this
                }
              }
            }
          ]
        }
      ]
    });

    Ext.apply(this.initialConfig,
    {
      layout: this.layout,
      items: this.items
    });

    uRadix.form.ShortNameField.superclass.initComponent.call(this);
  }
});
Ext.reg('shortnamefield', uRadix.form.ShortNameField);



/**
 * Extension: uRadix.form.LongNameField extends Ext.Panel
 * This extension adds multiple text fields in a unified column Panel layout
 */
Ext.namespace("uRadix.form.LongNameField");
uRadix.form.LongNameField = Ext.extend(Ext.Panel,
{
  initComponent: function()
  {
    Ext.apply(this, {
      layout: "column",
      autoWidth: true,

      items: [
        {
          width:180,
          layout:"form",
          items: [
            {
              id:this.id+"_1",
              fieldLabel: this.fieldLabel,
              width:70,
              style:'padding-right:5px',
              xtype:"textfield",
              emptyText: "first name"
            }
          ]
        },
        {
          width:22,
          layout:"form",
          items: [
            {
              id:this.id+"_2",
              fieldLabel: "",
              labelStyle:'padding-left:0px; padding-right:0px; width:0px;',
              labelSeparator: "",
              width:17,
              maxLength:1,
              autoCreate : {tag:'input', type:'text', size:'20', autocomplete:'off', maxlength:'1'},
              xtype:"textfield",
              emptyText: "i",
              listeners: {
                'beforerender': {
                  fn: function(cmp)
                  {
                    Ext.get("x-form-el-"+cmp.id).dom.style.cssText="padding-left:3px;";
                  },
                  scope: this
                },
                'keyup': {
                  fn: function(cmp)
                  {
                    var thisCmp = Ext.get(cmp.id);
                    if(thisCmp.dom.value.length === 1)
                    {
                      Ext.getCmp(this.id+"_3").focus();
                    }
                  },
                  scope: this
                }
              }
            }
          ]
        },
        {
          width:180,
          layout:"form",
          items: [
            {
              id:this.id+"_3",
              fieldLabel: "",
              labelStyle:'padding-left:0px; padding-right:0px; width:0px;',
              labelSeparator: "",
              width:70,
              xtype:"textfield",
              emptyText: "last name",
              listeners: {
                'beforerender': {
                  fn: function(cmp)
                  {
                    Ext.get("x-form-el-"+cmp.id).dom.style.cssText="padding-left:5px;";
                  },
                  scope: this
                }
              }
            }
          ]
        }
      ]
    });

    Ext.apply(this.initialConfig,
    {
      layout: this.layout,
      items: this.items
    });

    uRadix.form.ShortNameField.superclass.initComponent.call(this);
  }
});
Ext.reg('longnamefield', uRadix.form.LongNameField);
