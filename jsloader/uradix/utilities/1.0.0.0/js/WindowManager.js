
function uRadixWindowManager()
{
  this.MPI_CALLBACK_NAME = "$$mpicallback$$";

  this.uRadixWindowRegistry = new Array();
  this.uRadixWindowRegistry['google'] = {title:'Google Search', width:400, height:200, modal:true, autoLoad:{url:"http://www.google.com", scripts:true, params:"param1=foo&param2=bar", text:"Loading Google..."}};


  /*
   * This function will open a new Window Popup
   * The config object accepts the following properties:
   * id (optional), key, callback
   *
   * {id: "..", key: "..", callback:fn},
   *
   */
  this.openWindow=function(config)
  {
    var win;
    var winKey = config.key;
    var winCfg = config.window;
    var winParams = config.extraParams;

    if(winKey !== undefined && winKey !== null)
    {
      win = new Ext.Window(this.uRadixWindowRegistry[winKey]);
    }
    else
    {
      win = new Ext.Window(winCfg);
    }

    win.show();
  };


  /*
   * This function will open a new Window Popup
   * The config object accepts the following properties:
   * id (optional), key, callback
   *
   * {id: "..", key: "..", callback:".."},
   *
   */
  this.launch=function(config)
  {
    var win;
    var winId = config.id;
    var winKey = config.key;

    if(winKey !== undefined && winKey !== null)
    {
      var regObj = this.uRadixWindowRegistry[winKey];

      if(winId !== undefined && winId !== null && winId !== "")
      {
        regObj.id = winId;
      }

      if(config.callback !== undefined && config.callback !== null)
      {
        if(regObj.autoLoad.params !== undefined && regObj.autoLoad.params !== null && regObj.autoLoad.params !== "")
        {
          regObj.autoLoad.params = regObj.autoLoad.params + "&";
        }

        // Adding callback function as parameter
        regObj.autoLoad.params = regObj.autoLoad.params + this.MPI_CALLBACK_NAME + "=" + config.callback;
      }

      win = new Ext.Window(regObj);
    }

    win.show();
  };


  /*
   * This function will register a new Window Popup
   * The config object accepts the following properties:
   * id, Ext.Window config object
   *
   * {key: "..", windowConfig: ".."},
   *
   */
  this.registerWindowPopup=function(config)
  {
    var winKey = config.key;
    var winCfg = config.windowConfig;

    if(winKey !== undefined && winKey !== null)
    {
      if(winCfg !== undefined && winCfg !== null)
      {
        this.uRadixWindowRegistry[winKey] = winCfg;
      }
    }
  };
};

uRadixWindowManager = new uRadixWindowManager();
