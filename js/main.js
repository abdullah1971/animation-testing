// global variable
//=============================

var digits, i, maxVal = 0, data;



var algorithm ;


/*----------  bubble sort function entry point  ----------*/


function bubble(){

	algorithm = "bubbleSort";

	takeInputFromUser();

	createColumnFromUserInput();

	bubbleSort(digits);


}

/*----------  merge sort function entry point  ----------*/


function merge(){

	algorithm = "mergeSort";

	takeInputFromUser();

	createColumnFromUserInput();

	var i, len, temporaryDigitsForFinalArray = [], temporaryDigitsForInitialArray = [];
	len = digits.length;

	for(i = 0; i < len; i++){

		temporaryDigitsForFinalArray.push(digits[i]);
		temporaryDigitsForInitialArray.push(digits[i]);

	}

	mergeSortFinalArray = temporaryDigitsForFinalArray;

	mergeSortInitialArray = temporaryDigitsForInitialArray;



	createPositionArray(digits);

	createPositionPixel(digits);

	controlStripForMergeSort.push("start");
	console.log('first index ' + controlStripForMergeSort);

	// console.log('before merge sort ' + mergeSortInitialArray);

	mergeSort(mergeSortFinalArray, 0 , len - 1);

	controlStripForMergeSort.push("end");

	// console.log('after merge sort ' + mergeSortInitialArray);
	// console.log('after merge sort ' + mergeSortFinalArray);

	mergeIndex = 0;

	mergePreviousIndex = beforeMergingState.length - 1;
}




function start(){

	animationStart(algorithm);
}

function pause(){

	animationPause(algorithm);
}

// function restart(){

// 	animationRestart(algorithm);
// }
	

function previous(){

	animationPrevious(algorithm);
}

function next(){

	animationNext(algorithm);
}




