// Begin: Extend component
Ext.namespace("IDXM.StatusBox");
IDXM.StatusBox = Ext.extend(Ext.Panel, {
		initComponent : function() {
		
				//Defaults to Error
				var iconCss = "error-icon";				
				var statusCss = "statusError";
				var statusCssText = "statusErrorText";
				
				if (this.status == "success"){
					iconCss = "success-icon";
					statusCss = "statusSuccess";
					statusCssText = "statusSuccessText";					
				}else if (this.status == "error"){
					iconCss = "error-icon";
					statusCss = "statusError";
					statusCssText = "statusErrorText";					
				}else if (this.status == "warning"){					
					iconCss = "warning-icon";
					statusCss = "statusWarning";
					statusCssText = "statusWarningText";					
				}else if (this.status == "warning-noicon"){					
					iconCss = "";
					statusCss = "statusWarning";
					statusCssText = "statusWarningText";					
				}

				var panelHtml = '<table cellpadding="5" cellspacing="5" width="100%" style="border:1px solid; border-color:#dddddd;"><tr><td valign="middle" width="28"><div class="' + iconCss + '"></div></td><td width="10"></td><td align="left"><div class="' + statusCssText + '">'+this.statusText+'</div></td></tr></table>';

				// Apply to this component
				Ext.apply(this, {
							border: false
							,hideBorders: true
							,frame:false
							,bodyCssClass:statusCss
							,html:panelHtml
							//,items:[new Ext.Panel({style:"padding:5px",items:[new Ext.Panel({bodyCssClass:statusCss,html:panelHtml})]})]
				});

				// Apply to this component configuration
				Ext.apply(this.initialConfig, {items:this.items});

				// call parent initComponent
				IDXM.StatusBox.superclass.initComponent.call(this);
			}

		});
// End: Extend component

// Register component as xtype
Ext.reg('idxmStatusBox', IDXM.StatusBox);

