JSLoader.setEnv("CASETRACKING_CORE_PATH",JSLoader.makePath("casetracking","core","1.0.0.0"));

JSLoader.loadJavaScript(JSLoader.getEnv("CASETRACKING_CORE_PATH")+"js/core.js");
JSLoader.loadJavaScript(JSLoader.getEnv("CASETRACKING_CORE_PATH")+"js/windows/AppealExplanation.js");
JSLoader.loadJavaScript(JSLoader.getEnv("CASETRACKING_CORE_PATH")+"js/windows/InquiryExplanation.js");
JSLoader.loadJavaScript(JSLoader.getEnv("CASETRACKING_CORE_PATH")+"js/windows/CategoryExplanation.js");
JSLoader.loadJavaScript(JSLoader.getEnv("CASETRACKING_CORE_PATH")+"js/windows/PriorityExplanation.js");
JSLoader.loadJavaScript(JSLoader.getEnv("CASETRACKING_CORE_PATH")+"js/windows/WorkersCompExplanation.js");
JSLoader.loadJavaScript(JSLoader.getEnv("CASETRACKING_CORE_PATH")+"js/windows/EOBExplanation.js");
JSLoader.loadJavaScript(JSLoader.getEnv("CASETRACKING_CORE_PATH")+"js/windows/EmailCommunication.js");
JSLoader.loadJavaScript(JSLoader.getEnv("CASETRACKING_CORE_PATH")+"js/windows/SearchInformation.js");
JSLoader.loadJavaScript(JSLoader.getEnv("CASETRACKING_CORE_PATH")+"js/fax/FaxCoverSheet.js");
JSLoader.loadJavaScript(JSLoader.getEnv("CASETRACKING_CORE_PATH")+"js/windows/ClaimSearchInformation.js");

JSLoader.loadStyleSheet(JSLoader.getEnv("CASETRACKING_CORE_PATH")+"css/casetracking-core.css");