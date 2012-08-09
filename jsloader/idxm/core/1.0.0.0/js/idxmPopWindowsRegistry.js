Ext.namespace("IDXM.PopUpRegistry");
IDXM.PopUpRegistry = function(wizardPopupRegistry_renderURL,wizardPopupRegistry_portletNameSpace){

	var wizardPopupRegistry_cancelURL = wizardPopupRegistry_renderURL+"?action=cancelView";
	var wizardPopupRegistry_groupPickerURL = wizardPopupRegistry_renderURL+"?action=groupsPotentialView";
	var wizardPopupRegistry_rolePickerURL = wizardPopupRegistry_renderURL+"?action=rolesPotentialView";
	var wizardPopupRegistry_ccodePickerURL = wizardPopupRegistry_renderURL+"?action=ccodeLanding";
	var wizardPopupRegistry_generalErrorsURL = wizardPopupRegistry_renderURL+"?action=generalErrorView";
	var wizardPopupRegistry_notInActiveDirectoryURL = wizardPopupRegistry_renderURL+"?action=notInActiveDirectoryView";

	try{
		 // Not In Active Directory
		 uRadixWindowManager.registerWindowPopup({
									key:"notInActiveDirectory"+wizardPopupRegistry_portletNameSpace,
									windowConfig:{width:600, height:220, modal:true, autoScroll:true, closable:false, resizable:false,
											autoLoad:{	url:wizardPopupRegistry_notInActiveDirectoryURL, 
													scripts:true, 
													params:{"$$mpicallback$$" : "notInActiveDirectoryCallBack"+wizardPopupRegistry_portletNameSpace},
													method:"POST", 
													text:"Loading Not in Active Directory Popup..."
												}
										  }
		 });
	}catch(e){}

	try{
		 // Cancel Wizard
		 uRadixWindowManager.registerWindowPopup({
									key:"cancelUser"+wizardPopupRegistry_portletNameSpace,
									windowConfig:{width:400, height:222, modal:true, autoScroll:true, closable:false, resizable:false,
											autoLoad:{	url:wizardPopupRegistry_cancelURL, 
													scripts:true, 
													params:{"$$mpicallback$$" : "cancelUser"+wizardPopupRegistry_portletNameSpace},
													method:"POST", 
													text:"Loading Cancel User Popup..."
												}
										  }
		 });
	}catch(e){}

	 try{
		 // Group Picker
		 uRadixWindowManager.registerWindowPopup({
									key:"groupPicker"+wizardPopupRegistry_portletNameSpace,
									windowConfig:{width:600, height:457, modal:true, autoScroll:true, closable:false, resizable:false,
											autoLoad:{	url:wizardPopupRegistry_groupPickerURL, 
													scripts:true, 
													params:{"$$mpicallback$$" : "groupPickerCallBack"+wizardPopupRegistry_portletNameSpace},
													method:"POST", 
													text:"Loading Group Picker Popup..."
												}
										  }
		 });
	}catch(e){}	 

	try{
		// Roles Picker
		uRadixWindowManager.registerWindowPopup({
								key:"rolePicker"+wizardPopupRegistry_portletNameSpace,
								windowConfig:{width:600, height:457, modal:true, autoScroll:true, closable:false, resizable:false,
										autoLoad:{	url:wizardPopupRegistry_rolePickerURL, 
												scripts:true, 
												params:{"$$mpicallback$$" : "rolePickerPickerCallBack"+wizardPopupRegistry_portletNameSpace},
												method:"POST", 
												text:"Loading Role Picker Popup..."
											}
									  }
		});
	}catch(e){}
	
	try{
		// CCode Picker		
		uRadixWindowManager.registerWindowPopup({
								key:"ccodePicker"+wizardPopupRegistry_portletNameSpace, closable:false, resizable:false,
								windowConfig:{width:700, height:505, modal:true, autoScroll:true, closable:false,
										autoLoad:{	url:wizardPopupRegistry_ccodePickerURL,
												scripts:true,
												params:{"$$mpicallback$$" : "ccodePickerPickerCallBack"+wizardPopupRegistry_portletNameSpace},
												method:"POST",
												text:"Loading CCode Picker Popup..."
											}
									  }
		});
	}catch(e){}	

	 try{
		 // Group Picker
		 uRadixWindowManager.registerWindowPopup({
									key:"generalErrors"+wizardPopupRegistry_portletNameSpace,
									windowConfig:{	width:600, height:300, modal:true, autoScroll:true, closable:false, resizable:false,
											autoLoad:{	url:wizardPopupRegistry_generalErrorsURL, 
													scripts:true, 
													params:{"$$mpicallback$$" : "generalErrorsCallBack"+wizardPopupRegistry_portletNameSpace},
													method:"POST", 
													text:"Loading General Errors Popup..."
												}
										  }
		 });
	}catch(e){}
};

