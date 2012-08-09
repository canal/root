JSLoader.setEnv("IDXM_PROFILE_PATH",JSLoader.makePath("idxm","profile","1.0.0.0"));
JSLoader.loadJavaScript(JSLoader.getEnv("IDXM_PROFILE_PATH")+"idxm-profile-all-min.js");
JSLoader.loadStyleSheet(JSLoader.getEnv("IDXM_PROFILE_PATH")+"css/idxm-profile-all-min.css");