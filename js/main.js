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

	currentWorkingSectionIndex = mergeSortCurrentWorkingRangePreviousButton.length - 1;

	// beforeMergingPixelIndex = beforeMergingPixelPosition.length - 1;
}



function bfs(){

	algorithm = "bfs";


	takeInputFromUserForBfs();

	var selectInputBfs = parseInt(data,10);



	bfsInputSet[10] = [[1,2],
					   [1,3],
					   [3,5],
					   [2,5],
					   [3,4],
					   [5,4],
					   [6,4],
					   [7,10],
					   [3,6],
					   [6,8],
					   [5,7],
					   [9,10],
					   [8,9]
					   ];

	bfsInputSet[5] = [[1,2],
					  [1,3],
					  [3,4],
					  [2,5]
					  ];

	bfsInputSet[8] = [[1,2],
					  [1,3],
					  [1,4],
					  [3,4],
					  [4,5],
					  [5,6],
					  [5,7],
					  [3,7],
					  [7,8]
					  ];

	adjacentNode = [];
	nodePosition = [];

	drawBfsInputSet(selectInputBfs);

	runBfs(selectInputBfs);

	bfsAnimationIndex = 0;

	bfsAnimationPreviousIndex = bfsControlStrip.length - 1;
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




