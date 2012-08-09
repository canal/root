
/**
 * Class: IDXM.ux.LikeUsersGrid
 * Description: This re-usable component will serve as the grid for displaying Like Users.
 * Author: Imran Ahmad - Multiplan 2009
 */
Ext.namespace("IDXM.ux.LikeUsersGrid");
IDXM.ux.LikeUsersGrid = Ext.extend(Ext.grid.GridPanel,
{
  constructor: function(config)
  {
	//var sm = new Ext.grid.CheckboxSelectionModel({header:"choose", singleSelect:true});
	
    var sm = new Ext.grid.CheckboxSelectionModel({header:"",singleSelect:true, width:25});

    var defaults = {
			cls:"idxm-grid",
			frame:false,
			height: 350,
			colModel: new Ext.grid.ColumnModel({
				columns:[
				  sm,
				  {id:'name', header: 'Name', sortable: true, dataIndex:"name"},
				  {header: 'Location', sortable: true, dataIndex:"location"},
				  {header: 'Department', sortable: true, dataIndex:"department"},
				  {header: 'Status', sortable: true, dataIndex:"status"}
				],
				defaults: {
				  sortable: true,
				  menuDisabled: true
				}
			}),
			sm:sm,
			stripeRows:true,
			viewConfig: {
				// custom row height
				rowHeight: 25,
				scrollOffset: 0,
				autoFill:true,
				forceFit:true
			}
    };

    Ext.apply(this, config, defaults);
    IDXM.ux.LikeUsersGrid.superclass.constructor.call(this, config);
  }
});
Ext.reg('idxmLikeUsersGrid', IDXM.ux.LikeUsersGrid);

