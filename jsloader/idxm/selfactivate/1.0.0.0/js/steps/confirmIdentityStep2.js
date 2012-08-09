Ext.namespace("IDXM.EndUser.Activate.Step2");
IDXM.EndUser.Activate.Step2 = function (config){
	
	g_hideStatusBox();
	Ext.get(document.body.id).unmask();
	
	function formSubmitHandler() {
		
		var formObj = Ext.getCmp(config.formId).getForm();
		
		if(formObj.isValid()){
		
			var url = Wizard.PortalContainer.getActionURL(config.submitToAction);
			
			Ext.getCmp("proceedButton").disable();
			Ext.get(document.body.id).mask("<b> Loading...</b> ", "x-mask-loading");
			
			formObj.submit({
				url: url,
				isMessageIgnore:true,
				success: function(form,action)
					{	
						if(config.accountActivationJson && config.accountActivationJson.userClassCode == "PROVIDER"){
							Wizard.PortalContainer.navigate({url:config.redirectToProviderAction});
						}else{
							Wizard.PortalContainer.navigate({url:config.redirectToAction});
						}
					},
				failure: function(form,action)
					{	
						Ext.get(document.body.id).unmask();
						Ext.getCmp("proceedButton").enable();
					}
			});	
		}
	}	
	
	var template = 
		new Ext.Template(	
			'<table width="100%">'
				,'<tr>'
					,'<td class="idxm-confirm-identity-IsThisYou">'
						,'<span >&nbsp;&nbsp;Is this you?</span>'
					,'</td>'
				,'</tr>'
				,'<tr>'
					,'<td>'
						,'<table width="100%" height="100">'
							,'<tr>'
								,'<td width="105"></td>'
								,'<td>'
									,'<span class="idxm-confirm-identity-IsThisYou-fieldLabel">Name:</span><BR>'
									,'<span class="idxm-confirm-identity-IsThisYou-fieldValue">{name}</span><BR><BR>'
									,'<span class="idxm-confirm-identity-IsThisYou-fieldLabel">Company:</span><BR>'
									,'<span class="idxm-confirm-identity-IsThisYou-fieldValue">{organization}</span>'
								,'</td>'
							,'</tr>'
						,'</table>'
					,'</td>'
				,'</tr>'
			,'</table>'		
		);	
	
	var templateProvider = 
		new Ext.Template(	
			'<table width="100%">'
				,'<tr>'
					,'<td>'
						,'<table width="100%" height="100">'
							,'<tr>'
								,'<td width="105"></td>'
								,'<td>'
									,'<span class="idxm-confirm-identity-IsThisYou-fieldLabel">Are you <b>{name}</b>?</span><BR>'
								,'</td>'
							,'</tr>'
						,'</table>'
					,'</td>'
				,'</tr>'
			,'</table>'		
		);		
	
	var confirmIdentityTemplate;
	if(config.accountActivationJson && config.accountActivationJson.userClassCode == "PROVIDER"){
		confirmIdentityTemplate = templateProvider.apply({
			name : config.accountActivationJson.userFullName
		});			
	}else{
		confirmIdentityTemplate = template.apply({
			name : config.accountActivationJson.userFullName
			,organization : config.accountActivationJson.company
		});	
	}

	Ext.form.Field.prototype.msgTarget = 'sideDetails';
	
	var beginActionHeaderPanel = 
		new Ext.Panel({
			renderTo:config.renderToHeader
			,border:false
			,bodyBorder:false
			,hideBorders:true
			,html:(config.accountActivationJson && config.accountActivationJson.userClassCode == "PROVIDER")? stepHeaderTemplateProvider.apply(config.stepHeaderTemplateProvider) : stepHeaderTemplate.apply(config.stepHeaderTemplate)
		});	

	var beginActivationBodyPanel = 
		new Ext.Panel({
					renderTo:config.renderToBody
					,border:false
					,bodyBorder:false
					,hideBorders:true
					,bodyStyle:"padding:5px;"
					,items:[{
							xtype:"panel"
							,border: false
							,bodyBorder:false
							,hideBorders:true
							,items:[{
									xtype: "panel"
									,border: false
									,cls:"portal-title"
									,html: "Confirm Identity"
								},{
									xtype: "panel"
									,height:8
									,border:0
									,style: "boder:none;"
									,bodyBorder:0
									,bodyStyle:"border:none"
									,hideBorders: true
								},{
									xtype: "panel"
									,border:0
									,style: "boder:none;"
									,bodyBorder:0
									,bodyStyle:"border:none"
									,hideBorders: true
									,html:confirmIdentityTemplate
								},{
									xtype: "panel"
									,border:false
									,bodyBorder:false
									,hideBorders:true
									,items:[{
											border:false
											,bodyBorder:false
											,hideBorders:true
											,style:"padding-left:100px;"
											,items:[{
													xtype:"uRadix.form.FormPanel"
													,id:config.formId
													,labelAlign:"top"
													,autoScroll:true
													,buttonAlign:"right"
													,buttons:[{
																text:"THIS IS NOT ME"
																,ctCls:"support-portal-btn-cancel"
																,handler:function(){
																	idxm.selfactivate.popups.CallSupport({});
																}
															},{
																id:"proceedButton"
																,name:"proceedButton"
																,text:"YES, THIS IS ME"
																,ctCls :"support-portal-btn"
																,handler:formSubmitHandler
																,listeners:{
																	render:function(){
																		this.focus(true,true);
																	}
																}
															}]
													,listeners: {uradix_enterkey: formSubmitHandler}
												}]
										}]
								}]
						}]
				});
};