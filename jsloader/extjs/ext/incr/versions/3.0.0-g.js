var _ext_adapter=JSLoader.getEnv("EXTJS_ADAPTER");
if(! _ext_adapter) JSLoader.setEnv("EXTJS_ADAPTER",_ext_adapter="default");
JSLoader.setEnv("EXTJS_PATH",JSLoader.makePath("extjs","ext","3.0.0"));

JSLoader.loadStyleSheet(JSLoader.getEnv("EXTJS_PATH")+"resources/css/ext-all.css");

if(_ext_adapter=="default")
{
 JSLoader.loadJavaScript(JSLoader.getEnv("EXTJS_PATH")+"adapter/ext/ext-base-debug.js");
}
else if(_ext_adapter=="yui")
{
 JSLoader.loadJavaScript(JSLoader.getEnv("EXTJS_PATH")+"adapter/yui/ext-yui-adapter-debug.js");
}
else if(_ext_adapter=="prototype")
{
 JSLoader.loadJavaScript(JSLoader.getEnv("EXTJS_PATH")+"adapter/prototype/ext-prototype-adapter-debug.js");
}
else if(_ext_adapter=="jquery")
{
 JSLoader.loadJavaScript(JSLoader.getEnv("EXTJS_PATH")+"adapter/jquery/ext-jquery-adapter-debug.js");
}

JSLoader.loadJavaScript(JSLoader.getEnv("EXTJS_PATH")+"ext-all-debug.js");
JSLoader.loadJavaScript(JSLoader.getEnv("EXTJS_PATH")+"multiplan/multiplan-ext.js");

