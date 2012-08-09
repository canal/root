/*
 * ExtJS 3.x compatible uRadix release
 */
JSLoader.setEnv("URADIX_EXTENSIONS_PATH",JSLoader.makePath("uradix","extensions","1.0.0.0"));
JSLoader.loadJavaScript(JSLoader.getEnv("URADIX_EXTENSIONS_PATH")+"uradix-extensions-min.js");
JSLoader.loadStyleSheet(JSLoader.getEnv("URADIX_EXTENSIONS_PATH")+"css/uradix_extensions.css");
