Ext.apply(Ext.form.VTypes, {

  siblingRequiredText: 'One of these fields is required',
  siblingRequired: function(val, field)
  {
    val = val.trim();
    if(Ext.isEmpty(val))
    {
      var val2 = Ext.getCmp(field.siblingField).getValue();
      val2 = val2.trim();
      if(Ext.isEmpty(val2))
      {
        return false;
      }
    }
    else
    {
      return true;
    }
  }

});



