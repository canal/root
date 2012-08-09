JSLoader.setEnv("IDXM_SEARCH_PATH",JSLoader.makePath("idxm","search","1.0.0.0"));

JSLoader.loadJavaScript(JSLoader.getEnv("IDXM_SEARCH_PATH")+"js/container/SearchContainer.js");
JSLoader.loadJavaScript(JSLoader.getEnv("IDXM_SEARCH_PATH")+"js/ux/panel/FilterControllerPanel.js");
JSLoader.loadJavaScript(JSLoader.getEnv("IDXM_SEARCH_PATH")+"js/ux/panel/filter/common/FilterUserClassPanel.js");
JSLoader.loadJavaScript(JSLoader.getEnv("IDXM_SEARCH_PATH")+"js/ux/panel/filter/internal/PersonRequiredFieldsPanel.js");
JSLoader.loadJavaScript(JSLoader.getEnv("IDXM_SEARCH_PATH")+"js/ux/panel/filter/internal/PersonFieldsPanel.js");
JSLoader.loadJavaScript(JSLoader.getEnv("IDXM_SEARCH_PATH")+"js/ux/panel/filter/internal/SystemRequiredFieldsPanel.js");
JSLoader.loadJavaScript(JSLoader.getEnv("IDXM_SEARCH_PATH")+"js/ux/panel/filter/internal/SystemFieldsPanel.js");
JSLoader.loadJavaScript(JSLoader.getEnv("IDXM_SEARCH_PATH")+"js/ux/panel/filter/vendor/VendorRequiredFieldsPanel.js");
JSLoader.loadJavaScript(JSLoader.getEnv("IDXM_SEARCH_PATH")+"js/ux/panel/filter/vendor/VendorFieldsPanel.js");
JSLoader.loadJavaScript(JSLoader.getEnv("IDXM_SEARCH_PATH")+"js/ux/panel/filter/vendor/VendorNameFieldPanel.js");
JSLoader.loadJavaScript(JSLoader.getEnv("IDXM_SEARCH_PATH")+"js/ux/panel/filter/client/ClientRequiredFieldsPanel.js");
JSLoader.loadJavaScript(JSLoader.getEnv("IDXM_SEARCH_PATH")+"js/ux/panel/filter/provider/ProviderRequiredFieldsPanel.js");
JSLoader.loadJavaScript(JSLoader.getEnv("IDXM_SEARCH_PATH")+"js/ux/panel/filter/common/StatusComboBox.js");

JSLoader.loadJavaScript(JSLoader.getEnv("IDXM_SEARCH_PATH")+"js/ux/panel/ResultsControllerPanel.js");
JSLoader.loadJavaScript(JSLoader.getEnv("IDXM_SEARCH_PATH")+"js/ux/panel/results/common/ResultsContentPanel.js");
JSLoader.loadJavaScript(JSLoader.getEnv("IDXM_SEARCH_PATH")+"js/ux/panel/results/common/ResultsGridPanel.js");

JSLoader.loadJavaScript(JSLoader.getEnv("IDXM_SEARCH_PATH")+"js/ux/panel/LayoutPanel.js");
JSLoader.loadJavaScript(JSLoader.getEnv("IDXM_SEARCH_PATH")+"js/validation/SearchValidator.js");

JSLoader.loadStyleSheet(JSLoader.getEnv("IDXM_SEARCH_PATH")+"css/idxm-search.css");