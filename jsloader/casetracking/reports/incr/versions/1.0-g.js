JSLoader.setEnv("CASETRACKING_REPORTS_PATH",JSLoader.makePath("casetracking","reports","1.0.0.0"));

JSLoader.loadJavaScript(JSLoader.getEnv("CASETRACKING_REPORTS_PATH")+"js/ux/form/ReportsForm.js");
JSLoader.loadJavaScript(JSLoader.getEnv("CASETRACKING_REPORTS_PATH")+"js/ux/panel/aging/AgingReport.js");
JSLoader.loadJavaScript(JSLoader.getEnv("CASETRACKING_REPORTS_PATH")+"js/ux/panel/status/InquiryTypeReport.js");
JSLoader.loadJavaScript(JSLoader.getEnv("CASETRACKING_REPORTS_PATH")+"js/ux/panel/status/CategoryTypes.js");
JSLoader.loadJavaScript(JSLoader.getEnv("CASETRACKING_REPORTS_PATH")+"js/ux/panel/status/SubmitterReport.js");