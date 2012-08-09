JSLoader.setEnv("IDXM_TIMER_PATH",JSLoader.makePath("idxm","timer","1.0.0.0"));
JSLoader.loadJavaScript(JSLoader.getEnv("IDXM_TIMER_PATH")+"js/TimerController.js");
JSLoader.loadJavaScript(JSLoader.getEnv("IDXM_TIMER_PATH")+"js/ux/window/TimeoutWindow.js");
JSLoader.loadJavaScript(JSLoader.getEnv("IDXM_TIMER_PATH")+"js/Overrides.js");
JSLoader.loadJavaScript(JSLoader.getEnv("IDXM_TIMER_PATH")+"js/PortletRefresherController.js");