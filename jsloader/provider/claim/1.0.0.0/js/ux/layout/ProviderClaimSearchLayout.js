Ext.namespace("provider.claim.search.layout.ProviderClaimSearchLayout");
provider.claim.search.layout.ProviderClaimSearchLayout = Ext
		.extend(
				Ext.Panel,
				{
					ID : "ProviderClaimSearchLayout",
					NAMESPACE : undefined,

					constructor : function(config) {
						this.NAMESPACE = config.baseObjConfig.nameSpace;
						var defaults = {
							id : config.id,
							renderTo : config.renderTo,
							width : config.baseObjConfig.width,
							bodyBorder : false,
							border : false,
							layout : "form",
							items : [
									{
										xtype : "provider.claim.search.form.ProviderClaimSearchFormPanel",
										id : "ProviderClaimSearchFormPanel",
										baseObjConfig : config.baseObjConfig,
										thisParentObject: config.thisParentObject
									},
									{
										xtype : "provider.claim.search.container.ProviderClaimSearchResultsContainer",
										id : "ProviderClaimSearchResultsContainer",
										baseObjConfig : config.baseObjConfig,
										style : "padding-top:10px;",
										thisParentObject: config.thisParentObject
									} ]
						};

						Ext.apply(this, defaults);
						provider.claim.search.layout.ProviderClaimSearchLayout.superclass.constructor
								.call(this, defaults);
					}
				});
Ext.reg('provider.claim.search.layout.ProviderClaimSearchLayout',
		provider.claim.search.layout.ProviderClaimSearchLayout);