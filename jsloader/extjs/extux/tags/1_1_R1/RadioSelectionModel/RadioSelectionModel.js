
/**
 * Ext.ux.grid.RadioSelectionModel
 *
 * @author    Ing. Jozef Sakalos
 * @copyright (c) 2008, by Ing. Jozef Sakalos
 * @date      19. March 2008
 * @version   $Id: Ext.ux.grid.RadioSelectionModel.js 83 2008-03-21 12:54:35Z jozo $
 *
 * @license Ext.ux.grid.RadioSelectionModel is licensed under the terms of
 * the Open Source LGPL 3.0 license.  Commercial use is permitted to the extent
 * that the code/component(s) do NOT become part of another Open Source or Commercially
 * licensed development library or toolkit without explicit permission.
 * 
 * License details: http://www.gnu.org/licenses/lgpl.html
 */

/*global Ext */

Ext.ns('Ext.ux.grid');

/**
 * @class   Ext.ux.grid.RadioSelectionModel
 * @extends Ext.grid.RowSelectionModel
 * @constructor
 * @param {Object} config The configuration options
 */
Ext.ux.grid.RadioSelectionModel = function(config) {

    // call parent
    Ext.ux.grid.RadioSelectionModel.superclass.constructor.call(this, config);

    // force renderer to run in this scope
    this.renderer = function(v, p, record){
        var checked = record === this.selections.get(0);
        var retval = 
            '<div class="x-grid3-row-radio"><input type="radio" name="' + this.id + '"'
            + (checked ? 'checked="checked"' : '')
            + '></div>';
        return retval;
    }.createDelegate(this);

}; // end of constructor

Ext.extend(Ext.ux.grid.RadioSelectionModel, Ext.grid.RowSelectionModel, {
     header:'<div> </div>'
    ,width:20
    ,sortable:false

    // private
    ,fixed:true
    ,dataIndex:''
    ,id:'radio'
    ,singleSelect:true

    ,selectRow:function(index) {
        // call parent
        Ext.ux.grid.RadioSelectionModel.superclass.selectRow.apply(this, arguments);

        // check radio
        var row = Ext.fly(this.grid.view.getRow(index));
        if(row) {
            row.child('input[type=radio]').dom.checked = true;
        }
    } // eo function selectRow

}); // eo extend

