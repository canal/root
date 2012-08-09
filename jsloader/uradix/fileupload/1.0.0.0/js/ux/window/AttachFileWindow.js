Ext.namespace("uradix.fileupload.windows.AttachFileWindow");
uradix.fileupload.windows.AttachFileWindow = Ext.extend(Object,
{
	UPLOADFORM:null
	,FILEFIELDID: null
	,UPLOADFORMHANDLER:null
	,DEFAULTSRESULTPANEL:null
	,ATTACHFILEGRIDPANEL:null
	,ATTACHFILESTORE:null
	,ATTACHFILECOLUMMODEL:null
	,UPLOADCALLBACK:null
	,UPLOADWINDOW:null
	,UPLOADWINDOWCALLBACK:null
	,CONN: new Ext.data.Connection()
	,CASEURL:undefined
	,ADDEDBY:undefined
	,ONADDCALLBACK:null
	,ONCLOSECALLBACK:null
	,CASENUMBER:null
	,SHOWWINDOW:function(_params){
		this.CASENUMBER=_params.caseNumber;
		this.UPLOADWINDOW.setTitle('Upload File(s) For Service Case #: '+_params.caseNumber);		
		this.UPLOADWINDOW.show();
		var gridStore = this.ATTACHFILEGRIDPANEL.getStore();
		gridStore.filter('caseNumber',_params.caseNumber);
		var storeCount = gridStore.getCount();
		if(storeCount){
			this.DEFAULTSRESULTPANEL.hide();
			this.ATTACHFILEGRIDPANEL.show();
		}else{
			this.DEFAULTSRESULTPANEL.show();
		}
		this.UPLOADFORM.getForm().reset();	
	}
	,constructor:function(config){				
		
		//ACCESS TO THIS OBJECT
		var thisObj = this;
		
		thisObj.FILEFIELDID = ((config.filefieldid) && (config.filefieldid != undefined))? config.filefieldid : "uradix-fileupload-fileuploadfield";
		thisObj.UPLOADFORMHANDLER = config.uploadformhandler;
		thisObj.CASEURL = ((config.caseurl) && (config.caseurl != undefined))? config.caseurl : undefined;
		thisObj.ADDEDBY = ((config.addedByName) && (config.addedByName != undefined))? config.addedByName : undefined;
		thisObj.ONADDCALLBACK = ((config.onAddCallBackFunction) && (config.onAddCallBackFunction != undefined))? config.onAddCallBackFunction : undefined ;
		thisObj.ONCLOSECALLBACK = ((config.onCloseCallBackFunction) && (config.onCloseCallBackFunction != undefined))? config.onCloseCallBackFunction : undefined ;
			
		//CREATE FORM		
		this.UPLOADFORM = 
			new uRadix.form.FormPanel({
				frame: true,
				labelWidth:50,
				fileUpload: true,					
				defaults: {
						anchor: "95%",
						allowBlank: false
					},
				items: [{
							xtype: 'hidden',
							id: config.userid,
							name: config.userid,
							value: config.useridvalue
						},{
							xtype: 'hidden',
							id: config.appid,
							name: config.appid,
							value: config.appidvalue
						},{
							xtype: 'hidden',
							id: config.tokenlistid,
							name: config.tokenlistid,
							value: config.tokenlistidvalue
						},{
							xtype: 'hidden',
							id: config.credentialuserid,
							name: config.credentialuserid,
							value: config.credentialuseridvalue
						},{
							xtype: 'hidden',
							id:config.filetypeid,
							name:config.filetypeid,
							value:config.filetypeidvalue
						},{
							xtype: 'hidden',
							id: config.credentialsamltokenid,
							name: config.credentialsamltokenid,
							value: config.credentialsamltokenidvalue
						},{
							xtype: 'fileuploadfield',
							emptyText: 'Select a file',
							width:200,
							fieldLabel: "File",
							id: thisObj.FILEFIELDID,
							name: thisObj.FILEFIELDID,
							msgTarget: "under",
							buttonText: '',
							buttonCfg: {
								iconCls: 'upload-icon'
							}
						 }]
				,buttons: [{
						    text: 'Upload',
						    handler: thisObj.UPLOADFORMHANDLER
						}]					
			});
		var UPLOADFORM = this.UPLOADFORM;	
		
		//DEFAULT RESULTS PANEL		
		this.DEFAULTSRESULTPANEL =  
			new Ext.Panel({
					border:false
					,html:'<center><BR><BR><BR>Please Attach Files</center>'
			});	
		
		//ATTACH FILE GRID PANEL
		this.ATTACHFILEGRIDPANEL = new uradix.fileupload.ux.panel.AttachFileGridPanel({});	
		
		//ATTACH FILE STORE
		this.ATTACHFILESTORE = 
			new Ext.data.Store({
				reader: new Ext.data.JsonReader({
							root: 'searchList'
							,fields: ['caseNumber','fileUUID','addedOnDate', 'fileName', 'addedByUser', 'fileSize']
				})
			});
		
	    //ATTACH FILE COLUMN MODEL
	    this.ATTACHFILECOLUMMODEL =  
	    	new Ext.grid.ColumnModel({
		        columns:[	  {header: 'Added On', sortable: true, dataIndex:"addedOnDate"}
			                  ,{header: 'Name', sortable: true, dataIndex:"fileName"}
			                  ,{header: 'Added By', sortable: true, dataIndex:"addedByUser"}
			                  ,{header: 'Size', sortable: true, dataIndex:"fileSize",renderer : function(val){return Ext.util.Format.fileSize(val);}}
		                ]
		        ,defaults: {
			                    sortable: true
			                    ,menuDisabled: true
		                    }
		    });  
	    
		//CREATE WINDOW
		this.UPLOADWINDOW = 
			new Ext.Window({					
					width:400,
					height:280,
					modal:true,
					autoScroll:true,
					resizable:false,
					layout:'border',
					closable:false,
					title:'Upload File(s)',
					//plain:true,
					items:[{
							region: 'north'		
							,height:100
							,split:true
		                    			,border: false
							,bodyBorder: false	
							,layout:'fit'
		                    			,items:[thisObj.UPLOADFORM]								
						},{
							region: 'center'
							,border: false
							,bodyBorder: false
							,layout:'fit'							
							,items:[thisObj.DEFAULTSRESULTPANEL,thisObj.ATTACHFILEGRIDPANEL]
						}],
					buttons  : [
					               {
					                   text    : 'OK',
					                   handler : function() {	
					                	   
					                	   if(thisObj.ONCLOSECALLBACK){
					                		   eval(thisObj.ONCLOSECALLBACK+"()");
					                	   }
					                	   
					                       thisObj.UPLOADWINDOW.hide();
					                   }
					               }
					           ]
				});	 
		var UPLOADWINDOW = this.UPLOADWINDOW;
		
		//RECONFIGURE ATTACH FILE GRID PANEL WITH NEW STORE AND COLUMN MODEL(MUST BE CALLED AFTER IT IS RENDERED)
		//this.ATTACHFILEGRIDPANEL.reconfigure(this.ATTACHFILESTORE,this.ATTACHFILECOLUMMODEL);
		//this.ATTACHFILEGRIDPANEL.hide();
		
		//UPLOADCALLBACK
		this.UPLOADCALLBACK = function(response){						
			
			//RECONFIGURE ATTACH FILE GRID PANEL WITH NEW STORE AND COLUMN MODEL(MUST BE CALLED AFTER IT IS RENDERED)
			thisObj.ATTACHFILEGRIDPANEL.reconfigure(thisObj.ATTACHFILESTORE,thisObj.ATTACHFILECOLUMMODEL);		
			
			
			if(response.session){
			    if(response.status.success){        

				//HIDE DEFAULT RESULTS PANEL
				thisObj.DEFAULTSRESULTPANEL.hide(); 

				//GET GRID STORE
				var gridStore = thisObj.ATTACHFILEGRIDPANEL.getStore();

				//CREATE AND FORMAT DATE
				var newDate = new Date();
				newDate = newDate.format('m/d/Y');	      

				//CREATE A NEW RECORD
				var fileRecord = new Ext.data.Record.create([{name: 'caseNumber'},,{name: 'addedOnDate'},{name : 'fileName'},{name : 'addedByUser'},{name : 'fileSize'},{name:'fileUUID'}]);
				var fileDataRecord = new fileRecord({'caseNumber':thisObj.CASENUMBER,'addedOnDate':newDate,'fileName':response.data.fileName,'addedByUser':thisObj.ADDEDBY,'fileSize':response.data.contentLength,'fileUUID':response.data.fileUUID});

				if(thisObj.ONADDCALLBACK){
					eval(thisObj.ONADDCALLBACK+"(fileDataRecord)");
				}

				//Add Record to Store
				gridStore.add(fileDataRecord);				

				//Show Grid Panel
				thisObj.ATTACHFILEGRIDPANEL.show();
				
				//Filter Store based on Case Number (Only records with current case# will be showed in the grid)
              			//gridStore.filter('caseNumber',thisObj.CASENUMBER);
              			
              			//Scroll View to the Top
				try{
					var selectionModel = thisObj.ATTACHFILEGRIDPANEL.getSelectionModel();
					selectionModel.selectLastRow();  				
					thisObj.ATTACHFILEGRIDPANEL.getView().getRow(gridStore.getCount()-1).scrollIntoView();
				}catch(e){}
				
				//Relate File GUID to CaseNumber
				thisObj.CONN.request({
						url: thisObj.CASEURL
						,method: 'POST'
						,params: {'caseNumber':thisObj.CASENUMBER,'fileUUID':response.data.fileUUID,'fileName':response.data.fileName,'fileSize':response.data.contentLength,'fileTypeId':response.data.fileTypeId}
						,success: function(form,action){	

						},failure: function() {
							alert('Failed to relate File ' + response.data.fileName + 'to this Case');
						}
				});
				
				thisObj.UPLOADFORM.getForm().reset();

			    }else{
				var fileField = Ext.getCmp(thisObj.FILEFIELDID);
				fileField.markInvalid(response.messages.inputFields[0].title,response.messages.inputFields[0].description);
			    }
			}else{
				alert("Session is False");
			}
        } 
		
	}//end constructor	                				                               

});

Ext.reg('uradix.fileupload.windows.AttachFileWindow',uradix.fileupload.windows.AttachFileWindow);

