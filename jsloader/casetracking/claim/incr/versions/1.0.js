JSLoader.setEnv("CASETRACKING_CLAIM_PATH",JSLoader.makePath("casetracking","claim","1.0.0.0"));
JSLoader.loadJavaScript(JSLoader.getEnv("CASETRACKING_CLAIM_PATH")+"casetracking-claim-all-min.js");
JSLoader.loadStyleSheet(JSLoader.getEnv("CASETRACKING_CLAIM_PATH")+"css/casetracking-claim-min.css");
