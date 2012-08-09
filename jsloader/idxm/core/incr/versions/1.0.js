JSLoader.setEnv("IDXM_CORE_PATH",JSLoader.makePath("idxm","core","1.0.0.0"));
JSLoader.loadJavaScript(JSLoader.getEnv("IDXM_CORE_PATH")+"idxm-core-all-min.js");
JSLoader.loadStyleSheet(JSLoader.getEnv("IDXM_CORE_PATH")+"css/idxm-core-all-min.css");
