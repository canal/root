JSLoader.setEnv("CASETRACKING_CREATE_PATH",JSLoader.makePath("casetracking","create","1.0.0.0"));

// Panels

// Contacts
JSLoader.loadJavaScript(JSLoader.getEnv("CASETRACKING_CREATE_PATH")+"js/ux/panel/contact/Contact.js");
JSLoader.loadJavaScript(JSLoader.getEnv("CASETRACKING_CREATE_PATH")+"js/ux/panel/contact/ClientInfo.js");
JSLoader.loadJavaScript(JSLoader.getEnv("CASETRACKING_CREATE_PATH")+"js/ux/panel/contact/ContactInfo.js");
JSLoader.loadJavaScript(JSLoader.getEnv("CASETRACKING_CREATE_PATH")+"js/ux/panel/contact/ProviderContact.js");

// Basic
JSLoader.loadJavaScript(JSLoader.getEnv("CASETRACKING_CREATE_PATH")+"js/ux/panel/basic/BasicInfo.js");
JSLoader.loadJavaScript(JSLoader.getEnv("CASETRACKING_CREATE_PATH")+"js/ux/panel/basic/InquiryTypes.js");
JSLoader.loadJavaScript(JSLoader.getEnv("CASETRACKING_CREATE_PATH")+"js/ux/panel/basic/ProviderInquiry.js");

// Claims
JSLoader.loadJavaScript(JSLoader.getEnv("CASETRACKING_CREATE_PATH")+"js/ux/panel/claim/SelectClaim.js");
JSLoader.loadJavaScript(JSLoader.getEnv("CASETRACKING_CREATE_PATH")+"js/ux/panel/claim/ClaimInfo.js");
JSLoader.loadJavaScript(JSLoader.getEnv("CASETRACKING_CREATE_PATH")+"js/ux/panel/claim/MultipleClaim.js");
JSLoader.loadJavaScript(JSLoader.getEnv("CASETRACKING_CREATE_PATH")+"js/ux/panel/claim/SingleClaim.js");

// Confirmation
JSLoader.loadJavaScript(JSLoader.getEnv("CASETRACKING_CREATE_PATH")+"js/ux/panel/confirmation/Confirmation.js");

// EOB
JSLoader.loadJavaScript(JSLoader.getEnv("CASETRACKING_CREATE_PATH")+"js/ux/panel/eob/Choose.js");
JSLoader.loadJavaScript(JSLoader.getEnv("CASETRACKING_CREATE_PATH")+"js/ux/panel/eob/EOBInfo.js");
JSLoader.loadJavaScript(JSLoader.getEnv("CASETRACKING_CREATE_PATH")+"js/ux/panel/eob/FaxInfo.js");
JSLoader.loadJavaScript(JSLoader.getEnv("CASETRACKING_CREATE_PATH")+"js/ux/panel/eob/InputInfo.js");

// Provider
JSLoader.loadJavaScript(JSLoader.getEnv("CASETRACKING_CREATE_PATH")+"js/ux/panel/provider/FacilityInfo.js");
JSLoader.loadJavaScript(JSLoader.getEnv("CASETRACKING_CREATE_PATH")+"js/ux/panel/provider/PractitionerInfo.js");
JSLoader.loadJavaScript(JSLoader.getEnv("CASETRACKING_CREATE_PATH")+"js/ux/panel/provider/ProviderInfo.js");

//Form
JSLoader.loadJavaScript(JSLoader.getEnv("CASETRACKING_CREATE_PATH")+"js/ux/form/CaseForm.js");
JSLoader.loadJavaScript(JSLoader.getEnv("CASETRACKING_CREATE_PATH")+"js/ux/form/CaseFormInternalClient.js");
JSLoader.loadJavaScript(JSLoader.getEnv("CASETRACKING_CREATE_PATH")+"js/ux/form/CaseFormInternalProvider.js");
JSLoader.loadJavaScript(JSLoader.getEnv("CASETRACKING_CREATE_PATH")+"js/ux/form/CaseFormInternal.js");

//Windows
JSLoader.loadJavaScript(JSLoader.getEnv("CASETRACKING_CREATE_PATH")+"js/ux/windows/NoClaimsAdded.js");
JSLoader.loadJavaScript(JSLoader.getEnv("CASETRACKING_CREATE_PATH")+"js/ux/windows/MaxClaimsAllowed.js");