JSLoader.setEnv("IDXM_SELFACTIVATE_PATH",JSLoader.makePath("idxm","selfactivate","1.0.0.0"));
JSLoader.loadStyleSheet(JSLoader.getEnv("IDXM_SELFACTIVATE_PATH")+"css/accountActivation.css");
JSLoader.loadJavaScript(JSLoader.getEnv("IDXM_SELFACTIVATE_PATH")+"/idxm-activation-all-min.js");