JSLoader.setEnv("CASETRACKING_CORE_PATH",JSLoader.makePath("casetracking","core","1.0.0.0"));
JSLoader.loadJavaScript(JSLoader.getEnv("CASETRACKING_CORE_PATH")+"casetracking-core-all-min.js");
JSLoader.loadStyleSheet(JSLoader.getEnv("CASETRACKING_CORE_PATH")+"css/casetracking-core-min.css");