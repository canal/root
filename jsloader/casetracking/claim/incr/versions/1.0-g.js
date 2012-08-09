JSLoader.setEnv("CASETRACKING_CLAIM_PATH",JSLoader.makePath("casetracking","claim","1.0.0.0"));

JSLoader.loadJavaScript(JSLoader.getEnv("CASETRACKING_CLAIM_PATH")+"js/ux/panel/lookup/ClaimLookup.js");
JSLoader.loadJavaScript(JSLoader.getEnv("CASETRACKING_CLAIM_PATH")+"js/ux/panel/lookup/PatientLookup.js");
JSLoader.loadJavaScript(JSLoader.getEnv("CASETRACKING_CLAIM_PATH")+"js/ux/panel/manual/AddClaimManually.js");
JSLoader.loadJavaScript(JSLoader.getEnv("CASETRACKING_CLAIM_PATH")+"js/ux/panel/search/results/OneClaimResult.js");
JSLoader.loadJavaScript(JSLoader.getEnv("CASETRACKING_CLAIM_PATH")+"js/ux/panel/search/results/NoResults.js");
JSLoader.loadJavaScript(JSLoader.getEnv("CASETRACKING_CLAIM_PATH")+"js/ux/panel/search/results/ClaimsAdded.js");

JSLoader.loadJavaScript(JSLoader.getEnv("CASETRACKING_CLAIM_PATH")+"js/ux/panel/search/common/ClaimColumnModel.js");
JSLoader.loadJavaScript(JSLoader.getEnv("CASETRACKING_CLAIM_PATH")+"js/ux/panel/search/common/ClaimsGridPanel.js");
JSLoader.loadJavaScript(JSLoader.getEnv("CASETRACKING_CLAIM_PATH")+"js/ux/panel/search/common/ClaimStore.js");
JSLoader.loadJavaScript(JSLoader.getEnv("CASETRACKING_CLAIM_PATH")+"js/ux/panel/search/results/MultipleClaimsResults.js");

JSLoader.loadJavaScript(JSLoader.getEnv("CASETRACKING_CLAIM_PATH")+"js/ux/window/AddClaims.js");
JSLoader.loadJavaScript(JSLoader.getEnv("CASETRACKING_CLAIM_PATH")+"js/ux/window/AddClaimsManually.js");
JSLoader.loadStyleSheet(JSLoader.getEnv("CASETRACKING_CLAIM_PATH")+"css/casetracking-claim.css");