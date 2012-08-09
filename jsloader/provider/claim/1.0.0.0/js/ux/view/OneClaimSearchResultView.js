Ext.namespace("provider.claim.search.view.OneClaimSearchResultView");
provider.claim.search.view.OneClaimSearchResultView = Ext
		.extend(
				Ext.Panel,
				{

					ID : "OneClaimSearchResultView",

					initComponent : function(config) {
						var thisObj = this;

						function pricingInfoTemplate(claim) {

							// This is the actual Template
							var t = new Ext.XTemplate(
									'<table width="100%" border="0" cellspacing="10" cellpadding="0">',
									'<tr>',
									'<td align="left" style="white-space:nowrap;">',
									'<div class="calculator-icon" style="visibility: visible;"></div>',									
									'</td>',									
									'<td align="left" stle="padding-top: 10px;">',
									'<table>',
									'<tr>',
									'<td align="right" style="white-space:nowrap;"><span class="portal-text-large">Total Charges:</span></td>',
									'<td align="left" style="white-space:nowrap;"><span class="portal-text-large-bold">&nbsp;${totalCharges}</span></td>',
									'</tr>',
									'<tr><td>&nbsp;</td></tr>',
									'<tr>',
									'<td align="right"v><span class="portal-text-large">Allowable:</span></td>',
									'<td align="left" style="white-space:nowrap;"><span class="portal-text-large-bold">&nbsp;${allowedCharges}</span></td>',
									'</tr>', '</table>', '</td>', '</tr>',
									'<tr><td colspan="2"><div class="portal-title">&nbsp</div></td></tr>',									
									'<tr>',
									'<td align="left" style="white-space:nowrap;" colspan="2">',
									'<table width="100%" border="0" cellspacing="0" cellpadding="0">',
									'<tr>',
									'<td align="left" style="white-space:nowrap; padding-bottom: 10px;">',
									'{networkInfo}',
									'</td>',
									'</tr>',
									'<tr>',
									'<td align="left" style="white-space:nowrap; padding-left: 10px;padding-bottom: 2px;">',
									'{providerName}',
									'</td>',
									'<tr>',
									'<td align="left" style="white-space:nowrap; padding-left: 10px;padding-bottom: 2px;">',
									'{addressLine}',
									'</td>',
									'<tr>',
									'<td align="left" style="white-space:nowrap; padding-left: 10px;">',
									'{cityStateZip}',
									'</td>',
									'<tr>',
									'<td align="left" style="white-space:nowrap; padding-left: 10px;padding-top: 5px;padding-bottom: 5px;">',
									'TIN: {tin}', '</td>', '</tr>', '</table>',
									'</td></tr>',
									
									'</table>');

							var totalCharges = '', allowedCharges = '';
							if (claim.PricingList && claim.PricingList.Pricing
									&& claim.PricingList.Pricing.PricingResults) {
								totalCharges = claim.PricingList.Pricing.PricingResults.TotalCharges;
								allowedCharges = claim.PricingList.Pricing.PricingResults.TotalAllowedCharges;
							}
							
							// extract provider information
							var networkInfo = '';
							if (claim.PricingList
									&& claim.PricingList.Pricing
									&& claim.PricingList.Pricing.PricingMetaData
									&& claim.PricingList.Pricing.PricingMetaData.PricingNetworkCode) {
								if (claim.PricingList.Pricing.PricingMetaData.PricingNetworkCode
										.indexOf("Ext")) {
									networkInfo = 'This claim is <b>Out of Network.</b>';
								} else {
									networkInfo = 'Priced using the <b>The MultiPlan Network</b> and the following provider:';
								}
							}
							var providerName = '', addressLine = '', cityStateZip = '', tin = '';
							if (claim.ClaimData.Professional
									&& claim.ClaimData.Professional.ClaimProviders
									&& claim.ClaimData.Professional.ClaimProviders.BillingProvider) {
								if (claim.ClaimData.Professional.ClaimProviders.BillingProvider.LastName) {
									providerName = 'Dr. '
											+ claim.ClaimData.Professional.ClaimProviders.BillingProvider.LastName;
								} else {
									providerName = claim.ClaimData.Professional.ClaimProviders.BillingProvider.Name;
								}
								addressLine += claim.ClaimData.Professional.ClaimProviders.BillingProvider.Address.AddressLine1
								if (claim.ClaimData.Professional.ClaimProviders.BillingProvider.Address.AddressLine2
										&& claim.ClaimData.Professional.ClaimProviders.BillingProvider.Address.AddressLine2 != 'NONE') {
									addressLine += ", "
											+ claim.ClaimData.Professional.ClaimProviders.BillingProvider.Address.AddressLine2;
								}
								cityStateZip = claim.ClaimData.Professional.ClaimProviders.BillingProvider.Address.City
										+ ", "
										+ claim.ClaimData.Professional.ClaimProviders.BillingProvider.Address.State
										+ " "
										+ claim.ClaimData.Professional.ClaimProviders.BillingProvider.Address.ZipCode;
								tin = claim.ClaimData.Professional.ClaimProviders.BillingProvider.Tin;
							}
							
							// Pass data to template
							var templateString = t.apply({
								totalCharges : totalCharges,
								allowedCharges : allowedCharges,
								networkInfo : networkInfo,
								providerName : providerName,
								addressLine : addressLine,
								cityStateZip : cityStateZip,
								tin : tin
							});
							return templateString;

						} // end of pricing information template function

						function claimInfoTemplate(claim) {

							// This is the actual Template
							var t = new Ext.XTemplate(
									'<div style="background-color:#f7f6f6;">',
									'<table width="100%" border="0" cellspacing="15" cellpadding="0">',
									'<tr>',
									'<td style="white-space:nowrap;" align="left">',
									'<span class="portal-text-small-bold"><b>MultiPlan Claim #: {claimNumber}<b></span>',
									'</td>',
									'</tr>',
									'<tr>',
									'<td style="white-space:nowrap;" align="left">',
									'Payer: {payor}<br>',
									'<div class="provider-title-line">&nbsp</div>',
									'</td>',
									'</tr>',
									'</table>',
									'<table width="100%" border="0" cellspacing="15" cellpadding="0">',
									'<tr>',
									'<td align="left" style="white-space:nowrap;">',
									'DOS:',
									'</td>',
									'<td align="left" style="white-space:nowrap;">&nbsp;{dos}</td>',
									'</tr>', 
									'<tr>',
									'<td align="left" style="white-space:nowrap;">',
									'Patient:',
									'</td>',
									'<td align="left" style="white-space:nowrap;">&nbsp;{patientName}</td>',
									'</tr>',
									'<tr>',
									'<td align="left" style="white-space:nowrap;">',
									'Insured:',
									'</td>',
									'<td align="left" style="white-space:nowrap;">&nbsp;{primaryInsured}</td>',
									'</tr>',
									'<tr>',
									'<td align="left" style="white-space:nowrap;">',
									'Insured ID:',
									'</td>',
									'<td align="left" style="white-space:nowrap;">&nbsp;{insuredId}</td>',
									'</tr>',
									'</table>', '</div>');
							

							var payor = '', claimNumber = '123456789098766', patientName = '', primaryInsured = '', insuredId = '', dos = '';
							if (claim.ClaimMetaDataList
									&& claim.ClaimMetaDataList.ClaimMetadata
									&& claim.ClaimMetaDataList.ClaimMetadata.ClientIdentifierList
									&& claim.ClaimMetaDataList.ClaimMetadata.ClientIdentifierList.ClientIdentifier
									&& claim.ClaimMetaDataList.ClaimMetadata.ClientIdentifierList.ClientIdentifier.ClientName) {
								payor = claim.ClaimMetaDataList.ClaimMetadata.ClientIdentifierList.ClientIdentifier.ClientName;
								claimType = claim.ClaimMetaDataList.ClaimMetadata.ClaimType;
							}
							if (claim.ClaimData && claim.ClaimData.Professional) {
								if (claim.ClaimData.Professional.Patient) {
									patientName = claim.ClaimData.Professional.Patient.LastName
											+ ', '
											+ claim.ClaimData.Professional.Patient.FirstName;
								}
								if (claim.ClaimData.Professional.PrimaryInsured) {
									primaryInsured = claim.ClaimData.Professional.PrimaryInsured.LastName
											+ ', '
											+ claim.ClaimData.Professional.PrimaryInsured.FirstName;

									insuredId = claim.ClaimData.Professional.PrimaryInsured.InsuredID;
									var splitDate = claim.ClaimData.Professional.ServiceFromDate
											.split("-");
									dos += splitDate[1] + "/"
											+ splitDate[2].substr(0, 2) + "/"
											+ splitDate[0];

								}
							}
							
							// Pass data to template
							var templateString = t.apply({
								payor : payor,
								claimNumber : claimNumber,
								patientName : patientName,
								primaryInsured : primaryInsured,
								insuredId : insuredId,
								dos : dos
							});
							return templateString;

						} // end of claim information template function

						var lineItemsGridId = Ext.id();
						var claimPricedGridId = Ext.id();
						var fullAllowableGridId = Ext.id();
						// Apply to this component
//						Ext
//								.apply(
//										this,
//										{
//											id : "OneClaimSearchResultView",
//											layout : "form",
//											bodyBorder : false,
//											border : false,
//											ctCls : "portal-plain-panel",
//											hideBorders : true,
//											labelAlign : "top",
//											items : [
//													{
//														xtype : "panel",
//														border : false,
//														style : "padding-top:10px;padding-bottom:10px;",
//														layout : "column",
//														items : [
//																{
//																	border : false,
//																	columnWidth : .5,
//																	bodyBorder : false,
//																	hideBorders : true,
//																	items : [
//																			{
//																				xtype : "panel",
//																				border : false,
//																				bodyCssClass : "provider-title-body",
//																				cls : "provider-title",
//																				html : "Pricing Information"
//																			},
//																			{
//																				xtype : "panel",
//																				border : false,
//																				cls : "portal-titles",
//																				style : "padding-top:5px;",
//																				html : pricingInfoTemplate(thisObj.claim),
//																				autoHeight : true,
//																				autoScroll : true
//																			}
//																			]
//																},
//																{
//																	width : 10,
//																	border : false,
//																	html : "&nbsp;"
//																},
//																{
//																	xtype : "panel",
//																	columnWidth : .5,
//																	style : "padding-top: 2px;padding-bottom: 2px;",
//																	width : 540,
//																	height : 236,
//																	html : claimInfoTemplate(thisObj.claim),
//																	autoHeight : true,
//																	autoScroll : true
//																} ]
//													},
//													{
//														border : false,
//														bodyBorder : false,
//														hideBorders : true,
//														items : [ {
//															xtype : "panel",
//															border : false,
//															bodyCssClass : "provider-title-body",
//															cls : "provider-title",
//															html : "Additional Information"
//														} ]
//													},
//													{
//														xtype : "panel",
//														border : true,
//														bodyCssClass : "provider-title-body",
//														style : "padding-top:10px;",
//														cls : "provider-items-title",
//														bodyCssClass : "provider-items-body",
//														layout : "column",
//														items : [
//																{
//																	xtype : "panel",
//																	border : false,
//																	bodyBorder : false,
//																	columnWidth : .02,
//																	cls : "provider-items-title",
//																	bodyCssClass : "provider-items-body",
//																	html : "<table width='100%' cellpadding='0' cellspacing='0'><tr><td align='left'><div id='lineItemsGridIconId' class='form-arrow-icon' style='visibility: visible;' onmouseover='this.style.cursor=\"pointer\";' onclick='toggleGrid(\""
//																			+ lineItemsGridId
//																			+ "\", this.id);'></div></td></tr></table>"
//																},
//																{
//																	xtype : "panel",
//																	border : false,
//																	bodyBorder : false,
//																	columnWidth : .98,
//																	cls : "provider-items-title",
//																	bodyCssClass : "provider-items-body",
//																	html : "<div align='left'>View Line Items</div>"
//																} ]
//													},
//													{
//														xtype : "panel",
//														border : true,
//														style : "padding-top:10px;",
//														cls : "provider-items-title",
//														bodyCssClass : "provider-items-body",
//														layout : "column",
//														items : [
//																{
//																	xtype : "panel",
//																	border : false,
//																	bodyBorder : false,
//																	columnWidth : .02,
//																	cls : "provider-items-title",
//																	bodyCssClass : "provider-items-body",
//																	html : "<table width='100%' cellpadding='0' cellspacing='0'><tr><td align='left'><div id='claimPricedGridIconId' class='form-arrow-icon' style='visibility: visible;' onmouseover='this.style.cursor=\"pointer\";' onclick='toggleGrid(\""
//																			+ claimPricedGridId
//																			+ "\", this.id);'></div></td></tr></table>"
//																},
//																{
//																	xtype : "panel",
//																	border : false,
//																	bodyBorder : false,
//																	columnWidth : .98,
//																	cls : "provider-items-title",
//																	bodyCssClass : "provider-items-body",
//																	html : "<div align='left'>Why did the claim  price this way?</div>"
//																} ]
//													},
//													{
//														xtype : "panel",
//														border : true,
//														style : "padding-top:10px;",
//														cls : "provider-items-title",
//														bodyCssClass : "provider-items-body",
//														layout : "column",
//														items : [
//																{
//																	xtype : "panel",
//																	border : false,
//																	bodyBorder : false,
//																	columnWidth : .02,
//																	cls : "provider-items-title",
//																	bodyCssClass : "provider-items-body",
//																	html : "<table width='100%' cellpadding='0' cellspacing='0'><tr><td align='left'><div id='fullAllowedGridIconId' class='form-arrow-icon' style='visibility: visible;' onmouseover='this.style.cursor=\"pointer\";' onclick='toggleGrid(\""
//																			+ fullAllowableGridId
//																			+ "\", this.id);'></div></td></tr></table>"
//																},
//																{
//																	xtype : "panel",
//																	border : false,
//																	bodyBorder : false,
//																	columnWidth : .98,
//																	cls : "provider-items-title",
//																	bodyCssClass : "provider-items-body",
//																	html : "<div align='left'>Why did I not get the full allowable amount?</div>"
//																} ]
//													} ]
//										});

						 Ext
								.apply(
										this,
										{
											id : "OneClaimSearchResultView",
											layout : "form",
											bodyBorder : false,
											border : false,
											ctCls : "portal-plain-panel",
											hideBorders : true,
											labelAlign : "top",
											items : [ {
												xtype : "panel",
												border : false,
												style : "padding-top:10px;padding-bottom:10px;",
												layout : "column",
												html : Ext
														.encode(thisObj.claim)
											} ]
										});
						// call parent initComponent
						provider.claim.search.view.OneClaimSearchResultView.superclass.initComponent
								.call(this);
					}
				});
// Register component as xtype
Ext.reg('provider.claim.search.view.OneClaimSearchResultView',
		provider.claim.search.view.OneClaimSearchResultView);