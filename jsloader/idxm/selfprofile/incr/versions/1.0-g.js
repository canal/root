JSLoader.setEnv("IDXM_SELF_PROFILE_PATH",JSLoader.makePath("idxm","selfprofile","1.0.0.0"));

//Popups
JSLoader.loadJavaScript(JSLoader.getEnv("IDXM_SELF_PROFILE_PATH")+"js/popups/AdviceNotificationOption.js");
JSLoader.loadJavaScript(JSLoader.getEnv("IDXM_SELF_PROFILE_PATH")+"js/popups/PasswordExpireAlert.js");
JSLoader.loadJavaScript(JSLoader.getEnv("IDXM_SELF_PROFILE_PATH")+"js/popups/AdviceNotificationWarning.js");

//View Profiles
JSLoader.loadJavaScript(JSLoader.getEnv("IDXM_SELF_PROFILE_PATH")+"js/view/profile/ExternalPerson.js");
JSLoader.loadJavaScript(JSLoader.getEnv("IDXM_SELF_PROFILE_PATH")+"js/view/profile/InternalPerson.js");
JSLoader.loadJavaScript(JSLoader.getEnv("IDXM_SELF_PROFILE_PATH")+"js/view/profile/ExternalPersonSummary.js");

//Update Demographics
JSLoader.loadJavaScript(JSLoader.getEnv("IDXM_SELF_PROFILE_PATH")+"js/update/demographics/ExternalPerson.js");
JSLoader.loadJavaScript(JSLoader.getEnv("IDXM_SELF_PROFILE_PATH")+"js/update/demographics/InternalPerson.js");
JSLoader.loadJavaScript(JSLoader.getEnv("IDXM_SELF_PROFILE_PATH")+"js/update/demographics/ExternalExceptionClient.js");
JSLoader.loadJavaScript(JSLoader.getEnv("IDXM_SELF_PROFILE_PATH")+"js/update/demographics/ExternalPersonProvider.js");

//Update ResetPassword
JSLoader.loadJavaScript(JSLoader.getEnv("IDXM_SELF_PROFILE_PATH")+"js/update/resetpassword/ResetPassword.js");

//Application Links
JSLoader.loadJavaScript(JSLoader.getEnv("IDXM_SELF_PROFILE_PATH")+"js/links/ApplicationLinks.js");

//Repricing Preferences
JSLoader.loadJavaScript(JSLoader.getEnv("IDXM_SELF_PROFILE_PATH")+"js/preferences/RepricingPreferences.js");

//UX Contact Panels
JSLoader.loadJavaScript(JSLoader.getEnv("IDXM_SELF_PROFILE_PATH")+"js/ux/panel/contacts/EmailPanel.js");
JSLoader.loadJavaScript(JSLoader.getEnv("IDXM_SELF_PROFILE_PATH")+"js/ux/panel/contacts/EmailMultipleRowPanel.js");
JSLoader.loadJavaScript(JSLoader.getEnv("IDXM_SELF_PROFILE_PATH")+"js/ux/panel/contacts/EmailRowPanel.js");
JSLoader.loadJavaScript(JSLoader.getEnv("IDXM_SELF_PROFILE_PATH")+"js/ux/panel/contacts/FaxPanel.js");
JSLoader.loadJavaScript(JSLoader.getEnv("IDXM_SELF_PROFILE_PATH")+"js/ux/panel/contacts/FaxMultipleRowPanel.js");
JSLoader.loadJavaScript(JSLoader.getEnv("IDXM_SELF_PROFILE_PATH")+"js/ux/panel/contacts/FaxRowPanel.js");
JSLoader.loadJavaScript(JSLoader.getEnv("IDXM_SELF_PROFILE_PATH")+"js/ux/panel/contacts/PhonePanel.js");
JSLoader.loadJavaScript(JSLoader.getEnv("IDXM_SELF_PROFILE_PATH")+"js/ux/panel/contacts/PhoneMultipleRowPanel.js");
JSLoader.loadJavaScript(JSLoader.getEnv("IDXM_SELF_PROFILE_PATH")+"js/ux/panel/contacts/PhoneRowPanel.js");

//UX Person Panels
JSLoader.loadJavaScript(JSLoader.getEnv("IDXM_SELF_PROFILE_PATH")+"js/ux/panel/ExternalPerson.js");
JSLoader.loadJavaScript(JSLoader.getEnv("IDXM_SELF_PROFILE_PATH")+"js/ux/panel/InternalPerson.js");

//Validation - Contacts
JSLoader.loadJavaScript(JSLoader.getEnv("IDXM_SELF_PROFILE_PATH")+"js/validation/RowContacts.js");
JSLoader.loadJavaScript(JSLoader.getEnv("IDXM_SELF_PROFILE_PATH")+"js/validation/EmailContacts.js");
JSLoader.loadJavaScript(JSLoader.getEnv("IDXM_SELF_PROFILE_PATH")+"js/validation/PhoneContacts.js");
JSLoader.loadJavaScript(JSLoader.getEnv("IDXM_SELF_PROFILE_PATH")+"js/validation/FaxContacts.js");

//Profile Utility functions
JSLoader.loadJavaScript(JSLoader.getEnv("IDXM_SELF_PROFILE_PATH")+"js/ProfileUtilities.js");

//idxm-profile css
JSLoader.loadStyleSheet(JSLoader.getEnv("IDXM_SELF_PROFILE_PATH")+"css/idxm-selfprofile.css");