function goToStep1(action){
	if(action.trim().length){
		Wizard.PortalContainer.navigate({url:action});
	}
};

function goToStep2(action){
	if(action.trim().length){
		Wizard.PortalContainer.navigate({url:action});
	}
};

function goToStep3(action){
	if(action.trim().length){
		Wizard.PortalContainer.navigate({url:action});
	}
};

function goToStep4(action){
	if(action.trim().length){
		Wizard.PortalContainer.navigate({url:action});
	}
};


var stepHeaderTemplate = 
	new Ext.Template(	
			'<table width="700" border="0">'
			,'<tr>'
				,'<td width="125" onClick="goToStep1(\'{step1Action}\');">'
					,'<table height="70" width="125" border="1" class="idm-{step1}active-step-table">'
						,'<tr>'
							,'<td align="center">'
								,'<span class="idxm-{step1}active-step-text">Step 1</span><BR>'
								,'<span class="idxm-{step1}active-step-subtitle">Begin Activation</span>'
							,'</td>'
						,'</tr>'
					,'</table>'
				,'</td>'
				,'<td align="center"><span class="idxm-step-divider">></span></td>'
				,'<td width="125" onClick="goToStep2(\'{step2Action}\');">'
					,'<table height="70" width="125" border="1" class="idm-{step2}active-step-table">'
						,'<tr>'
							,'<td align="center">'
								,'<span class="idxm-{step2}active-step-text">Step 2</span><BR>'
								,'<span class="idxm-{step2}active-step-subtitle">Confirm Identity</span>'
							,'</td>'
						,'</tr>'
					,'</table>'		
				,'</td>'
				,'<td align="center"><span class="idxm-step-divider">></span></td>'
				,'<td width="125" onClick="goToStep3(\'{step3Action}\');">'
					,'<table height="70" width="125" border="1" class="idm-{step3}active-step-table">'
						,'<tr>'
							,'<td align="center">'
								,'<span class="idxm-{step3}active-step-text">Step 3</span><BR>'
								,'<span class="idxm-{step3}active-step-subtitle">Provide Details</span>'
							,'</td>'
						,'</tr>'
					,'</table>'		
				,'</td>'
				,'<td align="center"><span class="idxm-step-divider">></span></td>'
				,'<td width="125" onClick="goToStep4(\'{step4Action}\');">'
					,'<table height="70" width="125" border="1" class="idm-{step4}active-step-table">'
						,'<tr>'
							,'<td align="center">'
								,'<span class="idxm-{step4}active-step-text">Step 4</span><BR>'
								,'<span class="idxm-{step4}active-step-subtitle">Create Password</span>'
							,'</td>'
						,'</tr>'
					,'</table>'		
				,'</td>'
			,'</tr>'
		,'</table>');	
		
		
var stepHeaderTemplateProvider = 
	new Ext.Template(	
			'<table width="600" border="0">'
			,'<tr>'
				,'<td width="125" onClick="goToStep1(\'{step1Action}\');">'
					,'<table height="70" width="125" border="1" class="idm-{step1}active-step-table">'
						,'<tr>'
							,'<td align="center">'
								,'<span class="idxm-{step1}active-step-text">Step 1</span><BR>'
								,'<span class="idxm-{step1}active-step-subtitle">Begin Activation</span>'
							,'</td>'
						,'</tr>'
					,'</table>'
				,'</td>'
				,'<td align="center"><span class="idxm-step-divider">></span></td>'
				,'<td width="125" onClick="goToStep2(\'{step2Action}\');">'
					,'<table height="70" width="125" border="1" class="idm-{step2}active-step-table">'
						,'<tr>'
							,'<td align="center">'
								,'<span class="idxm-{step2}active-step-text">Step 2</span><BR>'
								,'<span class="idxm-{step2}active-step-subtitle">Confirm Identity</span>'
							,'</td>'
						,'</tr>'
					,'</table>'		
				,'</td>'
				,'<td align="center"><span class="idxm-step-divider">></span></td>'
				,'<td width="125" onClick="goToStep3(\'{step3Action}\');">'
					,'<table height="70" width="125" border="1" class="idm-{step3}active-step-table">'
						,'<tr>'
							,'<td align="center">'
								,'<span class="idxm-{step3}active-step-text">Step 3</span><BR>'
								,'<span class="idxm-{step3}active-step-subtitle">Create Password</span>'
							,'</td>'
						,'</tr>'
					,'</table>'		
				,'</td>'
			,'</tr>'
		,'</table>');	