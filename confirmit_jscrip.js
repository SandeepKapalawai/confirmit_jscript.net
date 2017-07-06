
/**
Usage: This function is used to force the number of responses in each row of a 3dgrid question. It can be called in validation field.
eg: forceNumberOfItemsIn3dGridRows('Q23G','<=',3);
*/
function forceNumberOfItemsIn3dGridRows(threeDgridID,operator,numberOfResponse){
	var qids = Get3DGridQuestionIds(threeDgridID).toString().split(','); 
	var dv = f(qids[0]).domainValues();
	for(var i=0;i<dv.length;i++){
		var count = 0;
		var thisc = dv[i];
		for(var j=0;j<qids.length;j++){
			var thisq = qids[j];
			if(f(thisq).any(thisc)){
				count++;
			}	
		}
		if(operator == '<=' && count > numberOfResponse){
			RaiseError();
			SetQuestionErrorMessage(CurrentLang(),'Please select maximum '+numberOfResponse+' in each row.');			
		}
	}	
}


/**
* @param string qid : Question id of single or multi select question
* @param array codes : Array of codes to test.
* @return bool : Returns true if only subset of tested codes is selected (no other code selected).
*/
function only(qid, codes){
	var selectedOnlyCodes = false;
	var selectedOtherCodes = false;
	var form = f(qid);
	var dv = form.domainValues();
	var otherCodes = arrDiff(dv,codes);
	for(var i=0;i<codes.length;i++){
		var thisc = codes[i];
		if(form.any(thisc)){
			selectedOnlyCodes = true;
		}
	}
	for(var i=0;i<otherCodes.length;i++){
		var thisc = otherCodes[i];
		if(form.any(thisc)){
			selectedOtherCodes = true;
		}
	}	
return 	selectedOnlyCodes && !selectedOtherCodes;
}


/*******************array utilities*******************/
/**
Remove arr2 elements from arr1.
* @param array arr1 : Array from which elements will be removed.
* @param array arr2 : Array of elements that needs to be removed from arr1.
* @return array : arr1 after removing arr2 elements .
*/
function arrDiff(arr1,arr2){
	for(var i=0;i<arr2.length;i++){
		var itemToRemove = arr2[i];	
		var j = 0;
		while (j < arr1.length){
			if (arr1[j] == itemToRemove) {			
				arr1.splice(j, 1);	
			} 
			else{
				j++; 
			}
		}	
	}
return arr1;	
}
