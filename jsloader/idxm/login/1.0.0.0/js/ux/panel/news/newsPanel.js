Ext.namespace("idxm.login.ux.panel.news.newsPanel");
idxm.login.ux.panel.news.newsPanel = function (config){	
	var panel = new Ext.Panel({
				border:false,
				bodyBorder:false,
				hideBorders:true,
				autoScroll:true,
				renderTo:config.renderTo,
				autoScroll:true,
				style:"background-color:#FFFFFF; background:#FFFFFF; padding:5px;"	,
				items:[{
						xtype:"panel"									
						,border:false
						,cls:"portal-title"
						,html:config.title
					},{
						xtype:"panel"
						,border:false
						,height:20
						,html:"&nbsp;"
					},{
						xtype:"panel"
						,border:false
						,html:config.contentHtml
					}]
			});
	return panel;
};

