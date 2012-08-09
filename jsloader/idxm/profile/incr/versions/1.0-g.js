JSLoader.setEnv("IDXM_PROFILE_PATH",JSLoader.makePath("idxm","profile","1.0.0.0"));

JSLoader.loadJavaScript(JSLoader.getEnv("IDXM_PROFILE_PATH")+"js/IDXM.UserProfile.AllUsers.Read.js");
JSLoader.loadJavaScript(JSLoader.getEnv("IDXM_PROFILE_PATH")+"js/IDXM.UserProfile.Utilities.Contacts.js");
JSLoader.loadJavaScript(JSLoader.getEnv("IDXM_PROFILE_PATH")+"js/IDXM.UserProfile.EmailContacts.Panel.js");
JSLoader.loadJavaScript(JSLoader.getEnv("IDXM_PROFILE_PATH")+"js/IDXM.UserProfile.ExternalPerson.Action.UpdateDemographics.js");
JSLoader.loadJavaScript(JSLoader.getEnv("IDXM_PROFILE_PATH")+"js/IDXM.UserProfile.ExternalPerson.Panel.js");
JSLoader.loadJavaScript(JSLoader.getEnv("IDXM_PROFILE_PATH")+"js/IDXM.UserProfile.FaxContacts.Panel.js");
JSLoader.loadJavaScript(JSLoader.getEnv("IDXM_PROFILE_PATH")+"js/IDXM.UserProfile.InternalPerson.Action.UpdateDemographics.js");
JSLoader.loadJavaScript(JSLoader.getEnv("IDXM_PROFILE_PATH")+"js/IDXM.UserProfile.InternalPerson.Panel.js");
JSLoader.loadJavaScript(JSLoader.getEnv("IDXM_PROFILE_PATH")+"js/IDXM.UserProfile.InternalSystem.Action.UpdateDemographics.js");
JSLoader.loadJavaScript(JSLoader.getEnv("IDXM_PROFILE_PATH")+"js/IDXM.UserProfile.InternalSystem.Panel.js");
JSLoader.loadJavaScript(JSLoader.getEnv("IDXM_PROFILE_PATH")+"js/IDXM.UserProfile.PhoneContacts.Panel.js");
JSLoader.loadJavaScript(JSLoader.getEnv("IDXM_PROFILE_PATH")+"js/demographics/client/exception/EditController.js");
JSLoader.loadJavaScript(JSLoader.getEnv("IDXM_PROFILE_PATH")+"js/demographics/provider/exception/EditController.js");

//PopUps
JSLoader.loadJavaScript(JSLoader.getEnv("IDXM_PROFILE_PATH")+"js/popups/IDXM.UserProfile.Action.PopUp.ResendAccountActivationEmail.js");
JSLoader.loadJavaScript(JSLoader.getEnv("IDXM_PROFILE_PATH")+"js/popups/IDXM.UserProfile.Action.PopUp.ResetPassword.js");
JSLoader.loadJavaScript(JSLoader.getEnv("IDXM_PROFILE_PATH")+"js/popups/IDXM.UserProfile.Action.PopUp.UpdateStatus.js");
JSLoader.loadJavaScript(JSLoader.getEnv("IDXM_PROFILE_PATH")+"js/popups/IDXM.UserProfile.Action.PopUp.UpdateSubClass.js");
JSLoader.loadJavaScript(JSLoader.getEnv("IDXM_PROFILE_PATH")+"js/popups/IDXM.UserProfile.Action.PopUp.UpdateUserId.js");
JSLoader.loadJavaScript(JSLoader.getEnv("IDXM_PROFILE_PATH")+"js/popups/IDXM.UserProfile.View.PopUp.AccessHistory.js");
JSLoader.loadJavaScript(JSLoader.getEnv("IDXM_PROFILE_PATH")+"js/popups/IDXM.UserProfile.View.PopUp.GroupsAndRolesChanging.js");
JSLoader.loadJavaScript(JSLoader.getEnv("IDXM_PROFILE_PATH")+"js/popups/IDXM.UserProfile.PopUp.AdviceNotificationOption.js");
JSLoader.loadJavaScript(JSLoader.getEnv("IDXM_PROFILE_PATH")+"js/popups/InvalidReportsTo.js");

//UX (User Extensions)
JSLoader.loadJavaScript(JSLoader.getEnv("IDXM_PROFILE_PATH")+"js/ux/ProfileBar.js");

//idxm-profile css
JSLoader.loadStyleSheet(JSLoader.getEnv("IDXM_PROFILE_PATH")+"css/idxm-profile.css");
