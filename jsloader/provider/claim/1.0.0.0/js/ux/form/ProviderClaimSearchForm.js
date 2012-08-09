Ext.namespace("provider.claim.search.form.ProviderClaimSearchFormPanel");
provider.claim.search.form.ProviderClaimSearchFormPanel = Ext
		.extend(
				uRadix.form.FormPanel,
				{
					thisObj : undefined,
					NAMESPACE : undefined,
					SEARCH_SUBMIT_URL : undefined,
					FIELD_TIN_ID : "ProviderTin",
					FIELD_PATIENT_LAST_NAME_ID : "PatientLastName",
					FIELD_DOS_ID : "ClaimFromDate",
					FIELD_TOTAL_CHARGES_ID : "TotalCharges",
					BUTTON_SEARCH_ID : "searchButton",
					TIN_LIST : undefined,
					TIN_PANEL : undefined,
					actionUrls : undefined,
					thisParentObject : undefined,

					constructor : function(config) {
						var thisObj = this;
						this.NAMESPACE = config.baseObjConfig.nameSpace;
						this.SEARCH_SUBMIT_URL = config.baseObjConfig.actionList.ProviderClaimSearch;
						this.actionUrls = config.baseObjConfig.actionUrls;
						this.thisParentObject = config.thisParentObject;
						this.TIN_LIST = [ {
							id : "",
							name : "- Select TIN -"
						} ];
						this.TIN_PANEL = new Ext.Panel({
							border : false,
							html : "&nbsp;"
						});
						var hideTinPanel = false;
						if (config.baseObjConfig.tinData
								&& config.baseObjConfig.tinData.ReadTinsForUserResponse
								&& config.baseObjConfig.tinData.ReadTinsForUserResponse.TINList) {
							if (config.baseObjConfig.tinData.ReadTinsForUserResponse.TINList.length == 1) {
								this.TIN_PANEL = {
									xtype : 'hidden',
									id : this.FIELD_TIN_ID,
									name : this.FIELD_TIN_ID,
									fieldLabel : "TIN",
									value : config.baseObjConfig.tinData.ReadTinsForUserResponse.TINList[0]
								}

								hideTinPanel = true;
							} else if (config.baseObjConfig.tinData.ReadTinsForUserResponse.TINList.length > 10) {								
								this.TIN_PANEL = {
									xtype : 'textfield',
									id : this.FIELD_TIN_ID,
									name : this.FIELD_TIN_ID,
									fieldLabel : "TIN",
									hideLabel : false,
									allowBlank : false,
									msgTarget : "under",
									maxLength : 10,
                                    vtype:"tin"  
                    				,autoCreate : {
                    						tag : "input",
                    						size : "10",
                    						minLength: "9",
                    						maxLength : "10"
                    					}                                                            	
 
								}
							} else if (config.baseObjConfig.tinData.ReadTinsForUserResponse.TINList.length <= 10) {
								for (i = 0; i < config.baseObjConfig.tinData.ReadTinsForUserResponse.TINList.length; i++) {
									this.TIN_LIST
											.push({
												id : config.baseObjConfig.tinData.ReadTinsForUserResponse.TINList[i],
												name : config.baseObjConfig.tinData.ReadTinsForUserResponse.TINList[i]
											});
								}								
								this.TIN_PANEL = {
									xtype : "resizable-combo",
									mode : "local",
									fieldLabel : "TIN",
									allowBlank : false,
									name : this.FIELD_TIN_ID,
									id : this.FIELD_TIN_ID,
									msgTarget : "under",
									store : new Ext.data.JsonStore({
										fields : [ 'id', 'name' ],
										root : "rows",
										idProperty : "id",
										data : {
											"rows" : this.TIN_LIST
										}
									}),
									valueField : "id",
									emptyText : "- Select TIN -",
									displayField : 'name',
									triggerAction : 'all',
									editable : true,
									forceSelection : false,
									selectOnFocus : true,
									listeners : {
										render : function() {
											this.el.dom.name = this.name;
										}
									},
									typeAhead : true,
									typeAheadDelay : 0,
									vtype : "tin"
								}
							}

						}
						var caseSearchRequiredFieldsArray = [
								this.FIELD_TIN_ID,
								this.FIELD_PATIENT_LAST_NAME_ID,
								this.FIELD_DOS_ID, this.FIELD_TOTAL_CHARGES_ID ];
						this.BUTTON_SEARCH_ID = (config.baseObjConfig.buttonIds
								&& config.baseObjConfig.buttonIds.searchButton && (config.baseObjConfig.buttonIds.searchButton !== undefined)) ? config.baseObjConfig.buttonIds.searchButton
								: this.BUTTON_SEARCH_ID;
						var defaults = {
							columnWidth : config.baseObjConfig.columnWidth,
							border : false,
							labelAlign : "top",
							items : [
									{
										xtype : "panel",
										border : false,
										cls : "portal-title",
										html : "Search for a Claim",
										style : "padding-top: 10px;"
									},
									{
										xtype : "panel",
										border : false,
										style : "padding-top: 10px;"
									},
									{
										xtype : "panel",
										layout : "column",
										baseCls : "provider-search-filter-fields-body-with-border",
										labelAlign : "top",
										html : "<span class='required-fields'>ALL FIELDS REQUIRED</span>",
										style : "padding-top: 10px;",
										columnWidth : config.baseObjConfig.columnWidth,
										border : true,
										bodyBorder : true,
										items : [
												{
													xtype : "panel",
													border : false,
													layout : "form",
													baseCls : "provider-search-filter-fields-body-no-border",
													columnWidth : .15,
													items : [ {
														xtype : 'textfield',
														id : this.FIELD_PATIENT_LAST_NAME_ID,
														name : this.FIELD_PATIENT_LAST_NAME_ID,
														fieldLabel : "Patient Last Name",
														hideLabel : false,
														allowBlank : false,
														msgTarget : "under",
														maxLength : 60,
														vtype : "namePart"
													} ]
												},
												{
													xtype : "panel",
													border : true,
													layout : "form",
													baseCls : "provider-search-filter-fields-body-no-border",
													columnWidth : .12,
													items : [ {
														xtype : 'datefield',
														id : this.FIELD_DOS_ID,
														name : this.FIELD_DOS_ID,
														fieldLabel : "DOS",
														hideLabel : false,
														allowBlank : false,
														msgTarget : "under",
														maxValue : new Date(),
														format : 'm/d/Y'
													} ]
												},
												{
													xtype : "panel",
													border : false,
													layout : "form",
													baseCls : "provider-search-filter-fields-body-no-border",
													columnWidth : .15,
													items : [ {
														xtype : 'textfield',
														id : this.FIELD_TOTAL_CHARGES_ID,
														name : this.FIELD_TOTAL_CHARGES_ID,
														fieldLabel : "Total Charges",
														hideLabel : false,
														allowBlank : false,
														msgTarget : "under",
														maxLength : 40
														,vtype:"dollar"						
														,autoCreate:{tag: "input",size:"14",maxLength:"14"}
													} ]
												},
												{
													xtype : "panel",
													border : false,
													hidden : hideTinPanel,
													layout : "form",
													baseCls : "provider-search-filter-fields-body-no-border",
													columnWidth : .15,
													items : [ this.TIN_PANEL ]
												},
												{
													xtype : "panel",
													border : false,
													layout : "form",
													baseCls : "provider-search-filter-fields-body-no-border",
													columnWidth : .08,
													items : [ 
													         {
													        	height: 15,
													        	baseCls : "provider-search-filter-fields-body"
													         },
													          {
														xtype : "button",
														id : this.BUTTON_SEARCH_ID,
														style : "float:left;",
														text : "<div>SEARCH</div>",
														handler : this.filterSearchSubmit
													} ]
												} ]
									} ]// End of form items

							// Begining of listener
							,
							listeners : {
								"uradix_enterkey" : this.filterSearchSubmit
							}
						// End of listener
						};// End of Defaults
						Ext.apply(this, defaults);
						provider.claim.search.form.ProviderClaimSearchFormPanel.superclass.constructor
								.call(this, defaults);
					},

					filterSearchSubmit : function() {
						var _instance = undefined;

						if (this.getXType() == "provider.claim.search.form.ProviderClaimSearchFormPanel") {
							_instance = this;
						} else {
							_instance = this
									.findParentByType("provider.claim.search.form.ProviderClaimSearchFormPanel");
						}

						if (_instance.getForm().isValid()) {
							g_hideStatusBox();
							Ext.getCmp(_instance.BUTTON_SEARCH_ID).disable();
							var _form = _instance.getForm();

							// Assemble field values for cookie store
							var _fieldData = new Array();
							_instance.findBy(function(c, ct) {
								if (c.isFormField) {
									if (!Ext.isEmpty(c.getValue())
											&& !c.disabled) {
										if (c.getXType() == "datefield") {
											_fieldData.push({
												"id" : c.id,
												"value" : c.getRawValue()
											});
										} else {
											c.setValue(c.getValue().trim());
											_fieldData.push({
												"id" : c.id,
												"value" : c.getValue()
											});
										}
									}
								}
							}, this);

							// Set Cookie
							if (!Ext.isEmpty(_fieldData)) {
								uRadixCookieManager.createCookie(
										_instance.MPI_SEARCH_COOKIE_NAME,
										Ext.util.JSON.encode(_fieldData), 1);
							}

							var _layoutPanel = _instance
									.findParentByType("provider.claim.search.layout.ProviderClaimSearchLayout");
							var _resultsPanel = _layoutPanel
									.findByType("provider.claim.search.container.ProviderClaimSearchResultsContainer")[0];
							var _filterPanel = _instance;
							var _url = _instance.SEARCH_SUBMIT_URL;

							_filterPanel.el.mask("Searching...",
									"x-mask-loading");

							 _form
									.submit({
										url : _url,
										isMessageIgnore : true,
										success : function(form, action) {
											var _resp = Ext
													.decode(action.response.responseText);
											var _totalNumberOfRecords = _resp.totalMatchingRecords;
											if (_totalNumberOfRecords && _totalNumberOfRecords > 0) {
												if (_totalNumberOfRecords == 1) {
													_instance.thisParentObject.claimSearchResults = _resp.claimSearchResponse.ClaimSearchResponse.ClaimSearchResponseDetail.MatchingClaims.Claim;
													_instance.thisParentObject.showResults
															.call(
																	_instance.thisParentObject,
																	'OneClaimSearchResultView');
												} else {
													_instance.thisParentObject.showResults
															.call(
																	_instance.thisParentObject,
																	'MultipleClaimSearchResultsView');
												}
											} else {
												// Toggle to No Results Panel
												_instance.thisParentObject.showResults
														.call(
																_instance.thisParentObject,
																'ZeroClaimSearchResultsView');
											}

											_filterPanel.el.unmask();
											Ext.getCmp(
													_instance.BUTTON_SEARCH_ID)
													.enable();
										},
										failure : function(form, action) {
											g_showStatusBox();
											_filterPanel.el.unmask();
											Ext.getCmp(
													_instance.BUTTON_SEARCH_ID)
													.enable();
											
											_instance.thisParentObject.showResults
											.call(
													_instance.thisParentObject,
													'GeneralErrorClaimSearchResultsWindow');
										}
									});
						}
					}

				});
Ext.reg('provider.claim.search.form.ProviderClaimSearchFormPanel',
		provider.claim.search.form.ProviderClaimSearchFormPanel);