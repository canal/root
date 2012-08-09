Ext.namespace("IDXM.ProfilePopUpRegistry");
IDXM.ProfilePopUpRegistry = function(popUpRegistry_renderURL,popUpRegistry_nameSpace){

	var popUpRegistry_updateUserIdURL = popUpRegistry_renderURL+"?action=userIdView";
	var popUpRegistry_updateStatusURL = popUpRegistry_renderURL+"?action=statusView";
	var popUpRegistry_subClassUpdateURL = popUpRegistry_renderURL+"?action=userSubClassView";
	var popUpRegistry_resendAccountActivationEmailURL = popUpRegistry_renderURL+"?action=resendAccountActivationEmailView";
	var popUpRegistry_accessHistoryURL = popUpRegistry_renderURL+"?action=viewAccessHistoryView";
	var popUpRegistry_resetPasswordURL = popUpRegistry_renderURL+"?action=resetPasswordView";
	var popUpRegistry_groupsAndRolesChangeWarningURL = popUpRegistry_renderURL+"?action=groupsAndRolesWarning";

	var popUpRegistry_groupPickerURL = popUpRegistry_renderURL+"?action=groupsView";
	var popUpRegistry_rolePickerURL = popUpRegistry_renderURL+"?action=rolesView";
	var popUpRegistry_ccodePickerURL = popUpRegistry_renderURL+"?action=ccodeLandingView";

	try{
		 // Update User Id
		 uRadixWindowManager.registerWindowPopup({
									key:"updateUserId"+popUpRegistry_nameSpace,
									windowConfig:{width:600, height:495, modal:true, autoScroll:true, closable:false,resizable:false,
											autoLoad:{	url:popUpRegistry_updateUserIdURL, 
													scripts:true, 
													params:{"$$mpicallback$$" : "updateUserIdCallBack"+popUpRegistry_nameSpace},
													method:"POST", 
													text:"Loading Update User Id Popup..."
												}
										  }
		 });
	}catch(e){}

	try{
		 // Update Status
		 uRadixWindowManager.registerWindowPopup({
									key:"updateStatus"+popUpRegistry_nameSpace,
									windowConfig:{width:500, height:475, modal:true, autoScroll:true, closable:false,resizable:false,
											autoLoad:{	url:popUpRegistry_updateStatusURL, 
													scripts:true, 
													params:{"$$mpicallback$$" : "updateStatusCallBack"+popUpRegistry_nameSpace},
													method:"POST", 
													text:"Loading Update Status Popup..."
												}
										  }
		 });
	}catch(e){}
	
	try{
		 // Update Sub-Class
		 uRadixWindowManager.registerWindowPopup({
									key:"updateSubClass"+popUpRegistry_nameSpace,
									windowConfig:{width:500, height:475, modal:true, autoScroll:true, closable:false,resizable:false,
											autoLoad:{	url:popUpRegistry_subClassUpdateURL, 
													scripts:true, 
													params:{"$$mpicallback$$" : "updateSubClassCallBack"+popUpRegistry_nameSpace},
													method:"POST", 
													text:"Loading Update SubClass Popup..."
												}
										  }
		 });
	}catch(e){}	

	 try{
		 // Resend Account Activation
		 uRadixWindowManager.registerWindowPopup({
									key:"resendAccountActivation"+popUpRegistry_nameSpace,
									windowConfig:{width:500, height:475, modal:true, autoScroll:true, closable:false,resizable:false,
											autoLoad:{	url:popUpRegistry_resendAccountActivationEmailURL,
													scripts:true, 
													params:{"$$mpicallback$$" : "resendAccountActivationEmailCallBack"+popUpRegistry_nameSpace},
													method:"POST", 
													text:"Loading Resend Account Activation Email Popup..."
												}
										  }
		 });
	}catch(e){}	 

	try{
		// Access History
		uRadixWindowManager.registerWindowPopup({
								key:"accessHistory"+popUpRegistry_nameSpace,
								windowConfig:{width:335, height:475, modal:true, autoScroll:true, closable:true,resizable:false,
										autoLoad:{	url:popUpRegistry_accessHistoryURL, 
												scripts:true, 
												params:{"$$mpicallback$$" : "accessHistoryCallBack"+popUpRegistry_nameSpace},
												method:"POST", 
												text:"Loading Access History Popup..."
											}
									  }
		});
	}catch(e){}
	
	try{
		// Reset Password
		uRadixWindowManager.registerWindowPopup({
								key:"resetPassword"+popUpRegistry_nameSpace,
								windowConfig:{width:500, height:475, modal:true, autoScroll:true, closable:false,resizable:false,
										autoLoad:{	url:popUpRegistry_resetPasswordURL,
												scripts:true,
												params:{"$$mpicallback$$" : "resetPasswordCallBack"+popUpRegistry_nameSpace},
												method:"POST",
												text:"Loading Reset Password Popup..."
											}
									  }
		});
	}catch(e){}
	
	try{
		// Groups And Roles Changing Warning
		uRadixWindowManager.registerWindowPopup({
								key:"groupsAndRolesChangeWarning"+popUpRegistry_nameSpace,
								windowConfig:{width:400, height:400, modal:true, autoScroll:true, closable:false,resizable:false,
										autoLoad:{	url:popUpRegistry_groupsAndRolesChangeWarningURL,
												scripts:true,
												params:{"$$mpicallback$$" : "groupsAndRolesChangeWarningCallBack"+popUpRegistry_nameSpace},
												method:"POST",
												text:"Loading Groups And Roles Changing Warning Popup..."
											}
									  }
		});
	}catch(e){}		

	 try{
		 // Group Picker
		 uRadixWindowManager.registerWindowPopup({
									key:"groupPicker"+popUpRegistry_nameSpace,
									windowConfig:{width:600, height:457, modal:true, autoScroll:true, closable:false,resizable:false,
											autoLoad:{	url:popUpRegistry_groupPickerURL, 
													scripts:true, 
													params:{"$$mpicallback$$" : "groupPickerCallBack"+popUpRegistry_nameSpace},
													method:"POST", 
													text:"Loading Group Picker Popup..."
												}
										  }
		 });
	}catch(e){}	 

	try{
		// Roles Picker
		uRadixWindowManager.registerWindowPopup({
								key:"rolePicker"+popUpRegistry_nameSpace,
								windowConfig:{width:600, height:457, modal:true, autoScroll:true, closable:false,resizable:false,
										autoLoad:{	url:popUpRegistry_rolePickerURL, 
												scripts:true, 
												params:{"$$mpicallback$$" : "rolePickerPickerCallBack"+popUpRegistry_nameSpace},
												method:"POST", 
												text:"Loading Role Picker Popup..."
											}
									  }
		});
	}catch(e){}
	
	try{
		// CCode Picker		
		uRadixWindowManager.registerWindowPopup({
								key:"ccodePicker"+popUpRegistry_nameSpace,
								windowConfig:{width:700, height:475, modal:true, autoScroll:true, closable:false,resizable:false,
										autoLoad:{	url:popUpRegistry_ccodePickerURL,
												scripts:true,
												params:{"$$mpicallback$$" : "ccodePickerCallBack"+popUpRegistry_nameSpace},
												method:"POST",
												text:"Loading CCode Picker Popup..."
											}
									  }
		});
	}catch(e){}	


}