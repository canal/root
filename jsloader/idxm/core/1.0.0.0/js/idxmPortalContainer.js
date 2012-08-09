Ext.namespace('Wizard.PortalContainer');
Wizard.PortalContainer = function()
{

	var initURL = null;
	var initActionName = null;
	var panelCt = null;
	
	
  	return {
  	
  			INIT_TOKEN: "init",
    	
			/* Init Fuction - Currently doing Nothing */
			init: function()
			{

			},  	
			
			/*Initiate Wizard Panel 
			* Following are required
			* 	config.id
			* 	config.renderTo
			* 	config.url
			* 	config.actionName
			*/
			initWizard: function(config)
			{
				initURL = config.url;
				initActionName = config.actionName;
				
				Ext.History.init();
				Ext.History.add(Wizard.PortalContainer.INIT_TOKEN);

				panelCt = new Ext.Panel({
				  	id: config.id,
				  	renderTo: config.renderTo,
				  	header:false,
			      		bodyBorder: false,
				  	border: false,
			      		hideBorders: true,
				  	footer:false,
				  	frame:false,
				  	autoLoad: {url: Wizard.PortalContainer.getActionURL(config.actionName)+"&doRemoveSession=1", scripts:true, loadMask:true}				  	
				});
				
				return;
				
			},

			/* Get Initial URL */
			getInitURL: function(){
				return initURL;
			},

			/* Get Initial Action Name */
			getInitActionName: function(){
				return initActionName;
			},

			/*Get Wizard Panel Object */
			getCtPanel: function()
			{
				return panelCt;
			},

			/*Get Action URL */
			getActionURL: function(actionName) {
				return initURL + "?action=" + actionName;
			},				    

			/* Load Wizard content page */
			load: function(actionName)
			{    			    							    	
				var panel = Wizard.PortalContainer.getCtPanel().load({url:Wizard.PortalContainer.getActionURL(actionName), scripts:true, loadMask:true});

				return;
			},		    

			/*
			* The navigate function will serve as the function apps should use to navigate pages.
			* This function will also interface with the Browser History.
			* Arguments: config
			*/
			navigate: function(config)
			{
				Ext.History.add(config.url);
				return;
    			}

 		}; // end public return

}(); // end namespace app

Ext.onReady(Wizard.PortalContainer.init);

//Controls History based on Wizard Portal Container
Ext.History.on('change', function(token)
{
	if(token != Wizard.PortalContainer.INIT_TOKEN){	    	
		try{
			Wizard.PortalContainer.load(token);
		}catch(e){alert(e);}
  	}else{
  		try{
			Wizard.PortalContainer.load(Wizard.PortalContainer.getInitActionName());
		}catch(e){alert(e);}
	}
});

