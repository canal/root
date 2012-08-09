JSLoader.setEnv("IDXM_SELFACTIVATE_PATH",JSLoader.makePath("idxm","selfactivate","1.0.0.0"));

//PopUps
JSLoader.loadJavaScript(JSLoader.getEnv("IDXM_SELFACTIVATE_PATH")+"js/popups/CallSupport.js");

//Steps
JSLoader.loadJavaScript(JSLoader.getEnv("IDXM_SELFACTIVATE_PATH")+"js/steps/beginActivationStep1.js");
JSLoader.loadJavaScript(JSLoader.getEnv("IDXM_SELFACTIVATE_PATH")+"js/steps/confirmIdentityStep2.js");
JSLoader.loadJavaScript(JSLoader.getEnv("IDXM_SELFACTIVATE_PATH")+"js/steps/provideDetailsStep3.js");
JSLoader.loadJavaScript(JSLoader.getEnv("IDXM_SELFACTIVATE_PATH")+"js/steps/createPasswordStep4.js");
JSLoader.loadJavaScript(JSLoader.getEnv("IDXM_SELFACTIVATE_PATH")+"js/steps/confirmationStep5.js");
JSLoader.loadJavaScript(JSLoader.getEnv("IDXM_SELFACTIVATE_PATH")+"js/steps/resetPasswordFormPanel.js");
JSLoader.loadJavaScript(JSLoader.getEnv("IDXM_SELFACTIVATE_PATH")+"js/accountActivation.js");

JSLoader.loadStyleSheet(JSLoader.getEnv("IDXM_SELFACTIVATE_PATH")+"css/accountActivation.css");
