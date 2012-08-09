JSLoader.setEnv("CASETRACKING_SEARCH_PATH",JSLoader.makePath("casetracking","search","1.0.0.0"));
JSLoader.loadJavaScript(JSLoader.getEnv("CASETRACKING_SEARCH_PATH")+"casetracking-search-all-min.js");
JSLoader.loadStyleSheet(JSLoader.getEnv("CASETRACKING_SEARCH_PATH")+"css/casetracking-search-min.css");
