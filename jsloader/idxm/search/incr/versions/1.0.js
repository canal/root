JSLoader.setEnv("IDXM_SEARCH_PATH",JSLoader.makePath("idxm","search","1.0.0.0"));
JSLoader.loadJavaScript(JSLoader.getEnv("IDXM_SEARCH_PATH")+"idxm-search-all-min.js");
JSLoader.loadStyleSheet(JSLoader.getEnv("IDXM_SEARCH_PATH")+"css/idxm-search-all-min.css");