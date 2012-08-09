Ext
		.namespace("provider.claim.search.container.ProviderClaimSearchResultsContainer");
provider.claim.search.container.ProviderClaimSearchResultsContainer = Ext
		.extend(
				Ext.Panel,
				{

					ID : "ProviderClaimSearchResultsContainer",

					constructor : function(config) {	

						// Apply to this component
						Ext
								.apply(
										this,
										{
											id : config.id,
											style : config.style,
											layout : "card",
											bodyBorder : false,
											border : false,
											ctCls : "portal-plain-panel",
											hideBorders : true,
											labelAlign : "top",
											activeItem : 0,
											items : [
													{
														xtype : "provider.claim.search.view.DefaultEmptyView",
														id : "DefaultEmptyView"
													},
													{
														xtype : "provider.claim.search.view.ZeroClaimSearchResultsView",
														id : "ZeroClaimSearchResultsView",
														thisParentObject : config.thisParentObject
													},
													{
														xtype : "provider.claim.search.view.MultipleClaimSearchResultsView",
														id : "MultipleClaimSearchResultsView",
														baseObjConfig : config.baseObjConfig
													},
													{
														xtype : "provider.claim.search.view.AdditionalInformationView",
														id : "AdditionalInformationView",
														baseObjConfig : config.baseObjConfig
													},
													{
														xtype : "provider.claim.search.view.CreateCaseView",
														id : "CreateCaseView"
													},
													{
														xtype : "provider.claim.search.view.GeneralErrorClaimSearchResultsWindow",
														id : "GeneralErrorClaimSearchResultsWindow"
													} ]
										});
						// call parent constructor
						provider.claim.search.container.ProviderClaimSearchResultsContainer.superclass.constructor
								.call(this);
					}
				});
// Register component as xtype
Ext.reg('provider.claim.search.container.ProviderClaimSearchResultsContainer',
		provider.claim.search.container.ProviderClaimSearchResultsContainer);