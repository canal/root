JSLoader.setEnv("IDXM_SELF_PROFILE_PATH",JSLoader.makePath("idxm","selfprofile","1.0.0.0"));
JSLoader.loadJavaScript(JSLoader.getEnv("IDXM_SELF_PROFILE_PATH")+"idxm-selfprofile-all-min.js");
JSLoader.loadStyleSheet(JSLoader.getEnv("IDXM_SELF_PROFILE_PATH")+"css/idxm-selfprofile-all-min.css");