Ext.namespace("casetracking.claim.ux.panel.search.common.ClaimColumnModel");
casetracking.claim.ux.panel.search.common.ClaimColumnModel = Ext.extend(Ext.grid.ColumnModel,
{
  NAMESPACE:undefined,
  RENDERTO:undefined,
  CHECKBOXMODEL:undefined,
  ISCREATE:undefined,

  //Beginning of Constructor
  constructor: function(config)
  {  
	  if(config.isCreate) {
		  this.ISCREATE = false;
	  } else {
		  this.ISCREATE = true;
	  }
  	function isDisabled(_record){  		
  		return !_record.data.validClaimData;
  	};
  	
    this.CHECKBOXMODEL = (config.CHECKBOXMODEL)?config.CHECKBOXMODEL:new Ext.grid.CheckboxSelectionModel({id:Ext.id(),singleSelect:false,width:37,renderer: function(v, p, record){
        //will show checkbox only for "good" records
        if (isDisabled(record)){
            return '<div>&#160;</div>';
        }else{
            return '<div class="x-grid3-row-checker">&#160;</div>';
        }
    },
    clearSelections : Ext.grid.CheckboxSelectionModel.prototype.clearSelections.createSequence(function(fast){
    	var hdCheckbox = this.grid.getEl().select('.x-grid3-hd-checker-on');
    	if(hdCheckbox) hdCheckbox.removeClass('x-grid3-hd-checker-on');
    }),    
    selectAll: function(){
        //will prevent to select all rows
        var rowIndex=0;
        while(typeof(this.grid.getStore().getAt(rowIndex))!='undefined') {
            var record = this.grid.getStore().getAt(rowIndex);
            if (isDisabled(record)){
                this.grid.getSelectionModel().deselectRow(rowIndex, true);
            }
            else {
                this.grid.getSelectionModel().selectRow(rowIndex, true);
            }
            rowIndex++;
        }
    }});
    Ext.grid.RowSelectionModel.override(
    		{
    		    handleMouseDown : function(g, rowIndex, e){
    		            if(e.button !== 0 || this.isLocked()){
    		                return;
    		            }
    		            var view = this.grid.getView();
    		            if(e.shiftKey && !this.singleSelect && this.last !== false){
    		                var last = this.last;
    		                this.selectRange(last, rowIndex, e.ctrlKey);
    		                this.last = last; // reset the last
    		                view.focusRow(rowIndex);
    		            }else{
    		                var isSelected = this.isSelected(rowIndex);
    		                if(isSelected){
    		                    this.deselectRow(rowIndex);
    		                }else if(!isSelected || this.getCount() > 1){
    		                    this.selectRow(rowIndex, e.ctrlKey || e.shiftKey);
    		                    view.focusRow(rowIndex);
    		                }
    		            }
    		        },    			
    		    selectRow : function(index, keepExisting, preventViewNotify){
    		        if(this.isLocked() || (index < 0 || index >= this.grid.store.getCount()) || (keepExisting && this.isSelected(index))){
    		            return;
    		        }
    		        var r = this.grid.store.getAt(index);
    		        if(r && this.fireEvent('beforerowselect', this, index, keepExisting, r) !== false){
    		            if(this.singleSelect){
    		                this.clearSelections();
    		            }
    		            this.selections.add(r);
    		            this.last = this.lastActive = index;
    		            if(!preventViewNotify){
    		                this.grid.getView().onRowSelect(index);
    		            }
    		            this.fireEvent('rowselect', this, index, r);
    		            this.fireEvent('selectionchange', this);
    		        }
    		        if(this.getSelections().length == this.grid.store.getCount()) {
    		        	var headerCell = this.grid.getView().getHeaderCell(0);
    		        	//console.log(headerCell);
//    		        	this.fireEvent('onHdMouseDown', this.grid.getEl().select('.x-grid3-hd-checker'));
//    		        	var hdCheckbox = this.grid.getEl().select('.x-grid3-hd-checker');
//    		        	if(hdCheckbox) {
//    		        		console.log(hdCheckbox);
//    		        		//hdCheckbox.checked = "checked";    		        	
//    		        	}
    		        }
    		    }
    		    /**
    		     * Deselects a row.  Before deselecting a row, checks if the selection model
    		     * {@link Ext.grid.AbstractSelectionModel#isLocked is locked}.
    		     * If this check is satisfied the row will be deselected and followed up by
    		     * firing the {@link #rowdeselect} and {@link #selectionchange} events.
    		     * @param {Number} row The index of the row to deselect
    		     * @param {Boolean} preventViewNotify (optional) Specify <tt>true</tt> to
    		     * prevent notifying the view (disables updating the selected appearance)
    		     */
    		    ,deselectRow : function(index, preventViewNotify){    		    
    		        if(this.isLocked()){
    		            return;
    		        }
    		        if(this.last == index){
    		            this.last = false;
    		        }
    		        if(this.lastActive == index){
    		            this.lastActive = false;
    		        }
    		        var r = this.grid.store.getAt(index);
    		        if(r){
    		            this.selections.remove(r);
    		            if(!preventViewNotify){
    		                this.grid.getView().onRowDeselect(index);
    		            }
    		            this.fireEvent('rowdeselect', this, index, r);
    		            this.fireEvent('selectionchange', this);
    		        	var hdCheckbox = this.grid.getEl().select('.x-grid3-hd-checker-on');
    		        	if(hdCheckbox) {
    		        		hdCheckbox.removeClass('x-grid3-hd-checker-on');    		        	
    		        	}
    		        }
    		    }    		    
    		});
    
    var defaults = {
		                columns:[this.CHECKBOXMODEL
                                , {	header: 'DOS/<BR>Admit'
                                     ,sortable: true
                                     ,dataIndex:"fromDateOfService"
                                     ,width:110
                                     ,renderer: function(val) {                                     	
                                        return casetracking.core.date.convert(val);
                                    }
                               },{
                                    id:'claimNumber'
                                    ,header: '<BR>Claim #'
                                    ,sortable: true
                                    ,dataIndex:"claimIdentifierList"
                                    ,width:100
                                    ,renderer:function(val){
                                    	var claimNumber = '';
                                        for(var i=0;i<val.length;i++){
                                        	var claim = val[i];
                                        	var claimNumberSource = claim.claimNumberSource;
                                        	if(claimNumberSource == "MPI") {
                                        		claimNumber = claim.claimNumber;
                                        	} 
                                        }                                    	
                                        return Ext.util.Format.htmlEncode(claimNumber);
                                    }
                               },{	header: '<BR>Alt Claim #'
                                   , sortable: true
                                   , hidden: this.ISCREATE
                                   , dataIndex:"claimIdentifierList"
                                   ,width:100
                                   ,renderer: function(val) {
	                                   	var claimNumber = '';
	                                    for(var i=0;i<val.length;i++){
	                                    	var claim = val[i];
	                                    	var claimNumberSource = claim.claimNumberSource;
	                                    	if(claimNumberSource == "CLIENT") {
	                                    		claimNumber = claim.claimNumber;
	                                    	} 
	                                    }                                    	
	                                    return Ext.util.Format.htmlEncode(claimNumber);                               	   
                                   }                            
                                },{	header: 'Member<br>SSN / ID'
                                    , sortable: true
                                    , dataIndex:"memberSSNID"
                                    ,renderer: function(val) {
                                        return Ext.util.Format.htmlEncode(val);
                                    }
                                },{
                                    header: '<BR>Patient Name'
                                    ,sortable:true
                                    ,dataIndex:"patientName"
                                    ,renderer:function(val){
                                        return val;
                                    }
                                },{
                                    header: '<BR>Provider Name'
                                    ,sortable:true
                                    ,dataIndex:"providerName"
                                    ,renderer:function(val){
					try{
						return Ext.util.Format.htmlEncode(val);
					}catch(e){
						return val;
					}
                                    }
                                },{
                                    header: 'Provider<br>TIN'
                                    ,sortable:true
                                    ,dataIndex:"providerTIN"
                                    ,renderer:function(val){
                                    	if(val && val.length == 9){
                                    		val = val.substr(0,2) + "-" + val.substr(2,9);
                                    	}
                                        return val;
                                    }
                                },{
                                    header: 'Total<br>Charges'
                                    ,sortable:true
                                    ,dataIndex:"pricingList"
                                    ,renderer:function(val){
                                    	if(val){
                                        	return Ext.util.Format.usMoney(val[0].totalAmount);
                                        }else{
                                        	return val;
                                        }
                                    }
                                },{
                                    header: 'Discount<br>Amount'
                                    ,sortable:false
                                    ,dataIndex:"pricingList"
                                    ,renderer:function(val){
                                        if(val && val[0].discountAmount){
                                        	return Ext.util.Format.usMoney(val[0].discountAmount);
                                        }else{
					                        return null;
                                        }
                                    }
                                },{
                                    header: 'Date<br>Processed'
                                    ,sortable:false
                                    ,dataIndex:"pricingList"
                                    ,width:110
                                    ,renderer:function(val){
                                    	if(!Ext.isEmpty(val[0].processingDate)){
                                        	return casetracking.core.date.convert(val[0].processingDate);
                                        }else{
                                        	return null;
                                        }
                                    }
                                }]
      	                        ,defaults: {sortable: true,menuDisabled: true}
    };     

    Ext.apply(this, defaults);
    casetracking.claim.ux.panel.search.common.ClaimColumnModel.superclass.constructor.call(this, defaults);
    
  } //End of Constructor
});
Ext.reg('casetracking.claim.ux.panel.search.common.ClaimColumnModel', casetracking.claim.ux.panel.search.common.ClaimColumnModel);    