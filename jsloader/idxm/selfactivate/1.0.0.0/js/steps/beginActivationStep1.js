Ext.namespace("IDXM.EndUser.Activate.Step1");
IDXM.EndUser.Activate.Step1 = function (config){
	
	g_hideStatusBox();
	Ext.get(document.body.id).unmask();

	function formSubmitHandler() {
		
		var formObj = Ext.getCmp(config.formId).getForm();
		
		if(formObj.isValid()){
		
			var url = Wizard.PortalContainer.getActionURL(config.submitToAction);
			
			Ext.getCmp("validateButton").disable();
			
			Ext.get(document.body.id).mask("<b> Loading...</b> ", "x-mask-loading");
			
			formObj.submit({
				url: url,
				success: function(form,action) 
					{							
						Wizard.PortalContainer.navigate({url:config.redirectToAction});
					},
				failure: function(form,action)
					{	
						Ext.get(document.body.id).unmask();
						Ext.getCmp("validateButton").enable();
					}
			});	
		}
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
	
	var accountNotificationEmailIndicator=(config.accountActivationJson.accountNotificationEmailIndicator && config.accountActivationJson.accountNotificationEmailIndicator == "on")? true: false;
	var descriptionText = "<div align='center'><span class='idxm-activate-text-bold'>Provide your email address to begin the process.<BR></span><span style='line-height:5px;'>&nbsp;<br></span><span class='idxm-activate-text'>Use the address that you received in the invitation.<BR><BR></span></div>";
	var fieldLabelText = "Your Email";
	
	if(config.accountActivationJson.userClassCode == IDXM_USER_CLASS_CLIENT && accountNotificationEmailIndicator){
		descriptionText = "<div align='center'><span class='idxm-activate-text-bold'>Provide your User ID to begin the process.<BR></span><span style='line-height:5px;'>&nbsp;<br></span><span class='idxm-activate-text'>The User ID is specified in the email that was sent to you at " + config.accountActivationJson.emailContactDetails.value + ".<BR><BR></span></div>";
		fieldLabelText = "Your User ID";	
	}
	
	var emailField = {
						xtype:"textfield"
						,width:200
						,fieldLabel:fieldLabelText
						,name:"email"
						,allowBlank:false
						,msgTarget:"sideDetails"
						,vtype:"email"
						,validationEvent:"blur"
						,listeners:{
							render:function(){
								this.focus(true,true);
							},blur:function(){
								if(!Ext.isEmpty(this.getValue())){
									var email = this.getValue();									
									this.setValue(email.trim())
								}
							}
						}																
					};	
					
	if(config.accountActivationJson.userClassCode == IDXM_USER_CLASS_CLIENT && accountNotificationEmailIndicator){
		emailField['vtype']='';
	}					
		
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
									,height:8
									,border:0
									,style: "boder:none;"
									,bodyBorder:0
									,bodyStyle:"border:none"
									,hideBorders: true
								},{
									xtype: "panel"
									,border:false
									,bodyBorder:false
									,hideBorders:true
									,items:[{
											border:false
											,bodyBorder:false
											,hideBorders:true
											,items:[{
														xtype: "panel"
														,border:0
														,style: "boder:none;"
														,bodyBorder:0
														,bodyStyle:"border:none"
														,hideBorders: true
														,html:descriptionText
													},{
														xtype:"uRadix.form.FormPanel"
														,id:config.formId
														,labelAlign:"top"
														,autoScroll:true
														,width:400
														,style:"width: 225px; margin: 0 auto;"
														,bodyStyle:"width: 225px; margin: 0 auto;"
														,items:[emailField,{
																xtype:"panel"
																,width:200
																,border:false
																,bodyBorder:false
																,hideBorders:true
																,style:"width: 200px;"
																,bodyStyle:"width: 200px;"
																,height:30
																,items:[{
																			xtype:"button"
																			,style:"position: absolute; right: 0; width: 50%;"
																			,bodyStyle:"position: absolute; right: 0; width: 50%;"
																			,ctCls :"support-portal-btn"
																			,id:"validateButton"
																			,text:"BEGIN ACTIVATION"
																			,handler:formSubmitHandler																			
																		}]
															}]
														,listeners: {uradix_enterkey: formSubmitHandler}
													}]
										}]
								}]
						}]
					});							
};