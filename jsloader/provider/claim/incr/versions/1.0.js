JSLoader.setEnv("PROVIDER_CLAIM_PATH",JSLoader.makePath("provider","claim","1.0.0.0"));
JSLoader.loadJavaScript(JSLoader.getEnv("PROVIDER_CLAIM_PATH")+"provider-claim-all-min.js");
JSLoader.loadStyleSheet(JSLoader.getEnv("PROVIDER_CLAIM_PATH")+"css/provider-claim-min.css");