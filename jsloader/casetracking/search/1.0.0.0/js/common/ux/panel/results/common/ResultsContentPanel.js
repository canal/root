/**
 * Class:   casetracking.search.common.ux.panel.results.common.ResultsContentPanel
 *
 * Author: Roberto Brenes - MultiPlan 2011
 *
 * Params: @required: id, baseObjConfig, content, hidden
 *         @optional: N/A
 *
 */
Ext.namespace("casetracking.search.common.ux.panel.results.common.ResultsContentPanel");
casetracking.search.common.ux.panel.results.common.ResultsContentPanel = Ext.extend(Ext.Panel,
{
  ID:undefined,
  RESULTS_MARKUP_TPL: new Ext.XTemplate('<div><b class="idxm-search-spiffy"><b class="idxm-search-spiffy1"><b></b></b><b class="idxm-search-spiffy2"><b></b></b><b class="idxm-search-spiffy3"></b><b class="idxm-search-spiffy4"></b><b class="idxm-search-spiffy5"></b></b>',
        '<div class="idxm-search-spiffyfg"><center><br><font class="idxm-search-results-content">{content}</font></br><br></center></div>',
        '<b class="idxm-search-spiffy"><b class="idxm-search-spiffy5"></b><b class="idxm-search-spiffy4"></b><b class="idxm-search-spiffy3"></b><b class="idxm-search-spiffy2"><b></b></b><b class="idxm-search-spiffy1"><b></b></b></b></div>'
  ),

  constructor: function(config)
  {
    this.ID = config.id;

    var defaults = {
      id:config.id      
     ,style:"padding-top:15px;"
     ,html: this.RESULTS_MARKUP_TPL.applyTemplate({"content":config.content})
     ,hidden: config.hidden
    };

    Ext.apply(this, defaults);
    casetracking.search.common.ux.panel.results.common.ResultsContentPanel.superclass.constructor.call(this, defaults);
  }
});
Ext.reg('casetracking.search.common.ux.panel.results.common.ResultsContentPanel', casetracking.search.common.ux.panel.results.common.ResultsContentPanel);
