// Begin: Extend component
Ext.namespace("idxm.core.ux.panel.PasswordHint");
idxm.core.ux.panel.PasswordHint = Ext.extend(Ext.Panel, {

			// initComponent
			initComponent : function() {
			
				// Apply to this component
				Ext.apply(this, {
								style:"border:2px solid #cccccc; padding:5px; background:#efefef; background-color:#efefef;"
								,bodyStyle:"background:#efefef; background-color:#efefef;"
								,autoHeight:true
								,width:345
								,html:"<span class='hintTextHeader'><b>Hint</b></span>"
										+"<span class='hintText'><BR>Passwords must be a <b>minimum of 8 characters</b> and contain <b>at least one</b><div style='padding:7px 0 7px 0;'><b>&nbsp;&nbsp; - numeric digit (0-9)</b><BR><b>&nbsp;&nbsp; - upper case letter (A-Z)</b></div>The following rules also apply:<BR>&nbsp;&nbsp; - Passwords are case sensitive<BR>&nbsp;&nbsp; - Passwords cannot contain the User ID of the account<BR>&nbsp;&nbsp; - Passwords cannot contain the word \"password\" <BR>&nbsp;&nbsp; - Passwords cannot contain your first or last name <BR>&nbsp;&nbsp; - Passwords cannot contain ' \" < > & <BR>&nbsp;&nbsp; - Passwords cannot be the same as one of <BR>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;your last 5 passwords</span>"
							});

				// call parent initComponent
				idxm.core.ux.panel.PasswordHint.superclass.initComponent.call(this);
			}

		});
// End: Extend component

// Register component as xtype
Ext.reg('idxm.core.ux.panel.PasswordHint', idxm.core.ux.panel.PasswordHint);

