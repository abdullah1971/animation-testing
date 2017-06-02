/**
 *
 * global variable list
 *
 */
var positionArray = [];
var positionPixel = [];
var bubbleCount, bubbleContinue, bubbleIndex, bubblePrevious, bubbleNext;

var mergeSortInitialArray = [], mergeSortFinalArray = [];
var controlStripForMergeSort = [], mergeIndex;
var marked = [];
var mergePreviousIndex, beforeMergingState = [];
var beforeMergingPixelPosition = [], beforeMergingPixelIndex;
var mergeSortCurrentWorkingRangePreviousButton = [], currentWorkingSectionIndex;
var redColor = "#ff0000", greenColor = "#00ff00", leftColor = redColor, rightColor = greenColor;

var bfsInputSet = [];
var adjacentNode = [], nodePosition = [];
var shortestPath = [];
var level = [];
var parent = [];
var bfsControlStrip = [], bfsAnimationIndex = 0, bfsAnimationPreviousIndex = bfsControlStrip.length;

// console.log('color code ' + parseInt(redColor.substr(1), 16));
// console.log('hex code ' + number.tostring(16));







// check input if it is only digit or not
//=============================================

function checkDigit(data){

	var len = data.length;

	var i;

	for(i = 0; i < len; i++){

		if(isNaN(data[i]))
			return 0;
	}

	if(i == len)
		return 1;

}


// convert string to number array
//=============================================

function getDigits(data){

	var digits;

	digits = data.split(" ");

	return digits;

}

function takeInputFromUser(){

	data = prompt("Enter the array to be sorted (space separated value & no 0 value's) 1 <= x <=99 is better choise");
}



function takeInputFromUserForBfs(){

	data = prompt("Choose Node number one of these: 5, 8, 10 ");
}



function createColumnFromUserInput(){

	if(checkDigit(data)){

		digits = getDigits(data);

		createDynamicColumn();

		addCssToDynamicallyCreatedColumn();
	}
	else{
		alert('input is not valid');
	}
}





// create the dynamic column
//====================================

function createDynamicColumn(){

	var colNum = digits.length;

	/* divide in two parts and then add id no then merge */
	var firstHalf,secondHalf,thirdHalf,fourthHalf;


	firstHalf = "<div class='col' id=";
	secondHalf = "><p class='para' id='colVal";
	thirdHalf = "</p></div>";

	var columnHtml,finalText = "";
	var parent = document.getElementById('container');

	for(i = 0; i < colNum; i++){

		digits[i] = parseInt(digits[i]);

		columnHtml = firstHalf + "\"colNum" + (i + 1) + "\"" + secondHalf + (i + 1) + "\'>" + digits[i] + thirdHalf + "<br>";

		finalText = finalText + columnHtml;

		if(digits[i] > maxVal)
			maxVal = digits[i];
	}

	/* write on the container */
		
	parent.innerHTML = finalText;

}


// add css style to the 
// dynamically created column
//===================================

function addCssToDynamicallyCreatedColumn(){

	var temp, idName, element, tidName = "colNum", leftVal = 200, topDiff;
	var colColor = 000000;
	var colNum = digits.length;

	/*var rand = Math.random();
	alert(rand * 1000000);*/

	for(i = 0; i < colNum; i++){

		idName = tidName + (i + 1);

		element = document.getElementById(idName);

		element.style.width = "30px";

		
		

		// an.style.marginTop = som.offsetHeight - 50

		/* if digits are less than or equal 10 then multiply by 50 */
		/* else multiply with a step factor after adding base factor */
		if(digits[i] <= 10){

			temp = digits[i] * 10;

		}else{

			if(digits[i] > 100){

				alert('Input is too long');
				break;
			}

			temp = 100 + digits[i] * 2;
		}




		element.style.height = temp + "px";

		element.style.left = leftVal + 50 + "px";

		leftVal = leftVal + 50;

		temp = colColor + Math.ceil( Math.random() * 100000 ) + 111111 + i + 1;

		element.style.backgroundColor = "#" + temp;


		/* set the top value */
		if(maxVal > 10){

			temp = 100 + maxVal * 2 + 50;

			if(digits[i] > 10){

				topDiff = 100 + digits[i] * 2;

			}else{

				topDiff = digits[i] * 10;
				//alert(topDiff);
			}
			

		}else{

			temp = maxVal * 10 + 50;
			topDiff = digits[i] * 10;
		}

		//alert(maxVal + " " + temp + " " + topDiff);
		element.style.top = temp - topDiff + "px";





		var columnId = "#colVal" + (i + 1);
		var divId = "#colNum" + (i +1);

		var temporaryf = $(columnId).css('marginTop');

		$(columnId).css('marginTop', $(divId).height() - 40);

		var temporaryd = $(divId).height();

		var temporarys = $(columnId).css('marginTop');


		if(digits[i] == 1){

			element.style.height = "17px";
			element.style.top =  temp - 17 + "px";
			$(columnId).css('marginTop', -6);
		}

		if(digits[i] == 2){

			element.style.height = "24px";
			element.style.top =  temp - 24 + "px";
			$(columnId).css('marginTop', -4);
		}

		if(digits[i] == 3){

			$(columnId).css('marginTop', 0);
		}

	}


}



/*----------  swap function  ----------*/
Array.prototype.swap = function (x,y) {
  var b = this[x];
  this[x] = this[y];
  this[y] = b;
  return this;
}


/*----------  get integer value from pixel value  ----------*/
function getIntegerValueFromPixelValue(value){

	return parseInt(value, 10);
}


/*----------  fill an array with default value  ----------*/
function fillArrayWithDefaultValue(arrayName, fromFill, upToFill, defaultValue){

	var i;

	// arrayName = [];

	for(i = fromFill; i <= upToFill; i++){

		arrayName[i] = defaultValue;
	}

	return arrayName;
}


/*----------  find a values index from the initial array for merge sort  ----------*/
function findInitialArrayIndex(initialArray, fromFind, upToFind, value){

	var i, index = -1;

	for(i = fromFind; i <= upToFind; i++){

		if(marked[i] == 0 && initialArray[i] == value){

			index = i;
			marked[i] = 1;

			break;
		}
			
	}

	return index;
}



/*----------  bubbleSortAnimationChangePosition function body  ----------*/
function bubbleSortAnimationChangePosition(first, second, pixelIndex){

	var firstColumnId = "colNum" + first;
	var secondColumnId = "colNum" + second;

	var firstColumnPosition = positionPixel[pixelIndex] + 'px';
	var secondColumnPosition = positionPixel[pixelIndex + 1] + 'px';

	// console.log("firstColumnPosition " + firstColumnPosition);
	// console.log("secondColumnPosition " + secondColumnPosition);



	firstElement = document.getElementById(firstColumnId);
	secondElement = document.getElementById(secondColumnId);

	console.log("firstElement.style.left " + firstElement.style.left);
	console.log("secondElement.style.left " + secondElement.style.left);


	$('#'+firstColumnId).animate({'left' : secondColumnPosition}, {duration:2000});
	$('#'+secondColumnId).animate({'left' : firstColumnPosition}, {duration:2000});

}



/*----------  bubbleSortSingleAnimation function body  ----------*/
function bubbleSortSingleAnimation(positionIndex, pixelIndex){

	var ColumnId = "#colNum" + positionIndex;

	var ColumnPosition = positionPixel[pixelIndex];

	$(ColumnId).animate({left: ColumnPosition}, 2000);
}









/*----------  createPositionArray function  ----------*/

function createPositionArray(digits){

	var tempDigits = digits;
	var trackPosition = [];
	var temporaryPush = [];
	var len = digits.length;
	var i, j, k;

	for(i = 0; i < len; i++){

		trackPosition.push(i + 1);
	}


	/* assign trackPosition value to temporaryPush array */
	
	for(k = 0; k < len; k++){

		temporaryPush.push(trackPosition[k]);
	}
	// alert(temporaryPush);
	positionArray.push(temporaryPush);

	for(i = 0; i < len - 1; i++){

		for(j = 0; j < len - i - 1; j++){

			if(tempDigits[j] > tempDigits[j + 1]){

				tempDigits.swap(j, j + 1);
				trackPosition.swap(j, j + 1);
				// alert('swaped');

			}

			/* assign trackPosition value to temporaryPush array */
			temporaryPush = [];
			for(k = 0; k < len; k++){

				temporaryPush.push(trackPosition[k]);
			}

			// alert("before push" + positionArray);
			positionArray.push(temporaryPush);
			// alert("after push" + positionArray);
			// console.log(positionArray);
		}
	}

	// alert(positionArray);
}


function createPositionPixel(digits){

	var len = digits.length;
	var i,j;

	positionPixel[0] = 250;

	for(i = 1; i < len; i++){

		positionPixel[i] = positionPixel[i-1] + 50;
	}

}




function bubbleSort(digits){

	createPositionArray(digits);

	createPositionPixel(digits);

	bubbleIndex = 0;
	bubbleContinue = true;
	bubblePrevious = false;
	bubbleNext = true;

}



/*----------  state before starting merging  ----------*/
function beforeMerging(mergeSortFinalArray, left, mid, right){

	var i, j;
	var n1 = mid - left + 1;
	var n2 = right - mid;

	var tempBeforeMerging = [];

	/* first initialize the marked array to find value's index */
	marked = fillArrayWithDefaultValue(marked, left, mid, 0);

	for(i = 0; i < n1; i++){

		tempBeforeMerging.push(findInitialArrayIndex(mergeSortInitialArray, left, mid, mergeSortFinalArray[left + i]));
		
	}


	/* first initialize the marked array to find value's index */
	marked = fillArrayWithDefaultValue(marked, mid + 1, right, 0);

	for(i = 0; i < n2; i++){

		
		tempBeforeMerging.push(findInitialArrayIndex(mergeSortInitialArray, mid + 1, right, mergeSortFinalArray[mid + 1 + i]));
	}

	// for(i = left; i < right; i++){

	// 	tempBeforeMerging.push(mergeSortFinalArray[i]);
	// }

	return tempBeforeMerging;
}



/*----------  get left value by id name  ----------*/
function getLeftValueUsingId(idName, index){

	id = idName + index;

	return $(id).css('left');
}








/*----------  merging function for merge sort  ----------*/

function mergingTwoPortionOfMergeSort(mergeSortFinalArray, left, mid, right){



	var i, j, k;
	var n1 = mid - left + 1;
	var n2 = right - mid;

	var leftside = [], rightSide = [];
	var leftsideIndex = [], rightSideIndex = [], bothSideIndex = [];
	var  leftSidePixelPosition = [], rightSidePixelPosition = [];

	/* copy two selected portion in two temporary array */
	
	/* first initialize the marked array to find value's index */
	marked = fillArrayWithDefaultValue(marked, left, mid, 0);


	for(i = 0; i < n1; i++){

		leftside[i] = mergeSortFinalArray[left + i];
		leftsideIndex[i] = findInitialArrayIndex(mergeSortInitialArray, left, mid, mergeSortFinalArray[left + i]);
		// leftSidePixelPosition[i] = positionPixel[ leftsideIndex[i] ] ;
		leftSidePixelPosition[i] = getLeftValueUsingId("#colNum", leftsideIndex[i] + 1) ;
	}


	/* first initialize the marked array to find value's index */
	marked = fillArrayWithDefaultValue(marked, mid + 1, right, 0);


	for(i = 0; i < n2; i++){

		rightSide[i] = mergeSortFinalArray[mid + 1 + i];
		rightSideIndex[i] = findInitialArrayIndex(mergeSortInitialArray, mid + 1, right, mergeSortFinalArray[mid + 1 + i]);
		// rightSidePixelPosition[i] = positionPixel[ rightSideIndex[i] ];
		rightSidePixelPosition[i] = getLeftValueUsingId("#colNum", rightSideIndex[i] + 1);

	}


	i = 0;
	j = 0;
	k = left;

	/* merge two temporary array to final array */
	

	while(i < n1 && j < n2){

		if(leftside[i] <= rightSide[j]){

			// mergeSortInitialArray[k] = leftside[i];
			mergeSortFinalArray[k] = leftside[i];

			i++;
		}
		else{

			// mergeSortInitialArray[k] = rightSide[j];
			mergeSortFinalArray[k] = rightSide[j];

			j++;
		}

		k++;
	}


	/* copy the elements of left side array if has been left */
	while(i < n1){

		// mergeSortInitialArray[k] = leftside[i];
		mergeSortFinalArray[k] = leftside[i];

		i++;
		k++;
	}

	/* copy the elements of right side array if has been left */
	while(j < n2){

		// mergeSortInitialArray[k] = rightSide[j];
		mergeSortFinalArray[k] = rightSide[j];

		j++;
		k++;
	}


	/* get the index of the merged portion's value */


	/* first initialize the marked array to find value's index */
	marked = fillArrayWithDefaultValue(marked, left, right, 0);

	for(i = left; i <= right; i++){

		bothSideIndex[i] = findInitialArrayIndex(mergeSortInitialArray, left, right, mergeSortFinalArray[i]);
	}

	controlStripForMergeSort.push(leftsideIndex);
	console.log('inside merging leftSide Index ' + leftsideIndex);

	controlStripForMergeSort.push(rightSideIndex);
	console.log('inside merging rightSide Index ' + rightSideIndex);

	controlStripForMergeSort.push(bothSideIndex);
	console.log('inside merging bothSide Index ' + bothSideIndex);

	beforeMergingState.push(bothSideIndex);
	console.log('beforeMergingState ' + bothSideIndex);


	beforeMergingPixelPosition.push(leftSidePixelPosition);
	console.log('hai, hurrah left side ' + leftSidePixelPosition);

	beforeMergingPixelPosition.push(rightSidePixelPosition);
	console.log('hai, hurrah right side ' + rightSidePixelPosition);

}


/*----------  main function of merge sort( breaking and calling merging )  ----------*/
// var k = 0;
function mergeSort(mergeSortFinalArray, left, right){


	if(left < right){

		var mid = left + Math.floor((right - left) / 2);


		var status = ["break", "left", left, mid];

		controlStripForMergeSort.push(status);
		console.log('left break ' + controlStripForMergeSort);
		mergeSort(mergeSortFinalArray, left, mid);




		status = ["break", "right", mid + 1, right];

		controlStripForMergeSort.push(status);
		console.log('right break ' + controlStripForMergeSort);
		mergeSort(mergeSortFinalArray, mid + 1, right);



		controlStripForMergeSort.push("merging start");
		console.log('before merging ' + controlStripForMergeSort);
		// beforeMergingState.push(beforeMerging(mergeSortFinalArray, left, mid, right));
		console.log('<br>before merging state ' + beforeMergingState);

		mergeSortCurrentWorkingRangePreviousButton.push(createArrayOfIndexOfARange(left, right));

		mergingTwoPortionOfMergeSort(mergeSortFinalArray, left, mid, right);

		controlStripForMergeSort.push("merging end");
		console.log('after merging ' + controlStripForMergeSort);
	}

}


/*----------  create an array of index of a range  ----------*/
function createArrayOfIndexOfARange(start, end){

	var temp = [];

	var i;

	for(i = start; i <= end; i++){

		temp.push(i);
	}

	return temp;
}



/*----------  colorAll column  of the initial array   ----------*/
function colorAll(color){

	var i,len;

	len = mergeSortFinalArray.length;

	for(i = 1; i <= len; i++){

		$('#colNum' + i).css('backgroundColor',color);
	}
}


/*----------  colorAllArrayElements function body  ----------*/
function colorAllArrayElements(arrayName, color){

	var i, len, index;

	len = arrayName.length;

	for(i = 0; i < len; i++){

		index = arrayName[i] + 1;

		$('#colNum' + index).css('backgroundColor',color);
	}
}


/*----------  color a range of column with a specified range  ----------*/
function colorRangeOfColumns(startRange, endRange, color){

	var i;

	for(i = startRange; i <= endRange; i++){

		$('#colNum' + i).css('backgroundColor',color);
		console.log("hay hui ");
		console.log('#colNum' + i);
		console.log(" hurray");
	}
}


/*----------  changePositionToDownLeft function  ----------*/
function changePositionToDownLeft(controlStripeState){

	var i, j, len, index;
	var idName, bottom, left, top;

	len = controlStripeState.length;

	for(i = 0; i < len; i++){

		index = controlStripeState[i];

		idName = "#colNum" + (index + 1);

		top = $(idName).css('top');

		top = parseInt(top, 10);

		top = top + 200;

		top = top + "px";

		// $(idName).css('top', top);




		left = $(idName).css('left');

		left = parseInt(left, 10);

		left = left - 50;

		left = left + "px";

		$(idName).css('left', left);


		$(idName).animate({
		    'top': top,
		    'left': left
		  }, 2000);

		// console.log($(idName).css('top'));
		// console.log($(idName).css('left', bottom - 50));
	}
}










/*----------  changePositionToOriginalLavel function body  ----------*/
function changePositionToOriginalLavel(controlStripeState){

	var i, j, len, index;
	var idName, bottom, left, top;

	len = controlStripeState.length;

	for(i = 0; i < len; i++){

		index = controlStripeState[i];

		idName = "#colNum" + (index + 1);

		top = $(idName).css('top');

		top = parseInt(top, 10);

		top = top - 200;

		top = top + "px";

		// $(idName).css('top', top);




		// left = $(idName).css('left');

		// left = parseInt(left, 10);

		// left = left - 50;

		// left = left + "px";

		// $(idName).css('left', left);

		left = positionPixel[i];

		left = left + "px";


		$(idName).animate({
		    'top': top,
		    'left': left
		  }, 2000);

		console.log($(idName).css('top'));
		// console.log($(idName).css('left', bottom - 50));
	}
}






/*----------  changePositionToOriginalLavelForPrevious function body  ----------*/
function changePositionToOriginalLavelForPrevious(controlStripeState){

	var i, j, len, index;
	var idName, bottom, left, top;

	len = controlStripeState.length;

	for(i = 0; i < len; i++){

		index = controlStripeState[i];

		idName = "#colNum" + (index + 1);

		top = $(idName).css('top');

		top = parseInt(top, 10);

		top = top - 200;

		top = top + "px";

		// $(idName).css('top', top);




		// left = $(idName).css('left');

		// left = parseInt(left, 10);

		// left = left - 50;

		// left = left + "px";

		// $(idName).css('left', left);

		left = positionPixel[index];

		left = left + "px";


		$(idName).animate({
		    'top': top,
		    'left': left
		  }, 2000);

		console.log($(idName).css('top'));
		// console.log($(idName).css('left', bottom - 50));
	}
}








/*----------  bringDownRightSideElementsMergeSort function body  ----------*/

function bringDownRightSideElementsMergeSort(controlStripeState, startingPoint){

	var i, j, len, index;
	var idName, bottom, left, top;

	len = controlStripeState.length;

	for(i = 0; i < len; i++){

		index = controlStripeState[i];

		idName = "#colNum" + (index + 1);

		top = $(idName).css('top');

		top = parseInt(top, 10);

		top = top + 200;

		top = top + "px";

		// $(idName).css('top', top);




		left = positionPixel[startingPoint++];

		// left = left + 50;

		left = left + "px";

		// $(idName).css('left', left);


		$(idName).animate({
		    'top': top,
		    'left': left
		  }, 2000);

		// console.log($(idName).css('top'));
		// console.log($(idName).css('left', bottom - 50));
	}
}








/*----------  bringDownLeftSideElementsMergeSort function body  ----------*/

function bringDownLeftSideElementsMergeSort(controlStripeState, startingPoint){

	var i, j, len, index;
	var idName, bottom, left, top;

	len = controlStripeState.length;

	for(i = 0; i < len; i++){

		index = controlStripeState[i];

		idName = "#colNum" + (index + 1);

		top = $(idName).css('top');

		top = parseInt(top, 10);

		top = top + 200;

		top = top + "px";

		// $(idName).css('top', top);




		left = positionPixel[startingPoint++];

		// left = left - 50;

		left = left + "px";

		// $(idName).css('left', left);


		$(idName).animate({
		    'top': top,
		    'left': left
		  }, 2000);

		// console.log($(idName).css('top'));
		// console.log($(idName).css('left', bottom - 50));
	}
}





/*----------  setTopPropertyOfLeftAndRightSideProperly function bdy  ----------*/
function setTopPropertyOfLeftAndRightSideProperly(controlStripeState){

	var i, j, len, index;
	var idName, bottom, left, top;

	len = controlStripeState.length;

	for(i = 0; i < len; i++){

		index = controlStripeState[i];

		idName = "#colNum" + (index + 1);

		top = $(idName).css('top');

		top = parseInt(top, 10);

		top = top - 200;

		top = top + "px";

		// $(idName).css('top', top);




		// left = positionPixel[startingPoint++];

		// left = left - 50;

		// left = left + "px";

		// $(idName).css('left', left);

		// left = $(idName).css('left');

		// left = parseInt(left, 10);

		// if(side == "left"){


		// }


		$(idName).animate({
		    'top': top
		    // 'left': left
		  }, 2000);

		// console.log($(idName).css('top'));
		// console.log($(idName).css('left', bottom - 50));
	}
}







/*----------  changePositionToDownRight function body  ----------*/
function changePositionToDownRight(controlStripeState){

	var i, j, len, index;
	var idName, bottom, left, top;

	len = controlStripeState.length;

	for(i = 0; i < len; i++){

		index = controlStripeState[i];

		idName = "#colNum" + (index + 1);

		top = $(idName).css('top');

		top = parseInt(top, 10);

		top = top + 200;

		top = top + "px";

		// $(idName).css('top', top);




		left = $(idName).css('left');

		left = parseInt(left, 10);

		left = left + 50;

		left = left + "px";

		$(idName).css('left', left);


		$(idName).animate({
		    'top': top,
		    'left': left
		  }, 2000);

		// console.log($(idName).css('bottom'));
		// console.log($(idName).css('left', bottom - 50));
	}
}



/*----------  beforeMergingPixelPositionArrayAccess function body  ----------*/
function beforeMergingTakeToPreviousPosition(arrayToBeChanged, whereToBePlaced){

	var i, j, flen, slen;

	var idName, top , left, index;

	flen = arrayToBeChanged.length;

	slen = whereToBePlaced.length;

	for(i = 0; i < flen; i++){

		index = arrayToBeChanged[i];

		idName = "#colNum" + (index + 1);



		top = $(idName).css('top');

		top = parseInt(top, 10);

		top = top + 200;

		top = top + "px"; 



		left = whereToBePlaced[i];

		// if(side == "right")
		// 	left = left + 50;
		// else if(side == "left")
		// 	left = left - 50;

		left = left;

		$(idName).animate({
		    'top': top,
		    'left': left
		  }, 2000);
	}

}









/*===================================
=            BFS section            =
===================================*/

/*----------  createAdjacentListBfs  ----------*/
function createAdjacentListBfs(graphArray, source, sink){

	var i, j, len, tempIndex, tempValue;
	var bfsAdjacentNodeList = [];

	for(i = 0; i <= sink; i++){

		bfsAdjacentNodeList[i] = new Array();
	}

	len = graphArray.length;

	for(i = 0; i < len; i++){

		tempIndex = graphArray[i][0];

		tempValue = graphArray[i][1];

		bfsAdjacentNodeList[tempIndex].push(tempValue);
	}

	return bfsAdjacentNodeList;
}

/*----------  createNodePositionBfs function body  ----------*/


function createNodePositionBfs(adjacentNode, source, sink){

	var i, j, len, top, left, index;

	var bfsNodePosition = [];

	for(i = source; i <= sink; i++){

		if(i == source){

			bfsNodePosition[i] = [50,500];
		}

		len = adjacentNode[i].length;

		if(typeof bfsNodePosition[i] == 'undefined'){

			top = bfsNodePosition[source][0];
			left = bfsNodePosition[source][1] + 100;


			bfsNodePosition[i] = [top, left];

			continue;

		}

		top = bfsNodePosition[i][0] + 100;
		left = bfsNodePosition[i][1] - 100;

		for(j = 0; j < len; j++){

			index = adjacentNode[i][j];

			if (typeof bfsNodePosition[index] == 'undefined'){

				left = left + 100;

				bfsNodePosition[index] = [top, left];
			}
		}

		if(i == sink){

			bfsNodePosition[i][1] = 500
		}
	}

	return bfsNodePosition;
}


/*----------  createCircleText function body  ----------*/


function createCircleText(nodePosition, source, sink){

	var i, j, len, first, second , third, fourth, fifth, final, temp;

	first = '<div class="col" id="circle-div-'
	second = '"><p id="circle-';
	third = '">';
	fourth = '</p></div>';
	// fifth = '</div>';

	final = '';

	for(i = source; i <= sink; i++){

		temp = first + i + second + i + third + i + fourth;

		final = final + temp;
	}

	// final = '<canvas class="col" id="myCanvas" width="200" height="100" style="border:1px solid #000000;">' +
	// 		final + '</canvas>';

	return final;
}


/*----------  addCssToCircleDiv function body  ----------*/


function addCssToCircleDiv(nodePosition, source,sink){

	var i, j, circleId, divId;

	for(i = source; i <= sink; i++){

		divId = "#circle-div-" + i;

		$(divId).css({

			'top': nodePosition[i][0],
			'left': nodePosition[i][1],
			'height': '50px',
			'width': '50px',
			'border-radius': '50%',
			'background-color': 'black',
			'text-align': 'center'
		});

		circleId = "#circle-" + i;

		$(circleId).css({

			'font-weight': '700',
			'text-align': 'center',
			'color': 'white',
			'font-size': '25px',
			'margin': '0',
			'padding-top': '10px'
		});
	}
}



/*----------  createArrowFromCircleToCircle function body  ----------*/


function createArrowFromCircleToCircle(adjacentNode, nodePosition, source, sink){

	var i, j, len, adjacentLength;
	var top, left, parentTop, parentLeft;
	var index, height, width, svgLeft, svgTop, svgHeight, svgWidth;

	var firstx1, firsty1, firstx2, firsty2;
	var secondx1, secondx2, secondy1, secondy2;
	var thirdx1, thirdx2, thirdy1, thirdy2;

	var finalText = '' , tempText;

	// len = adjacentNode.length;

	for(i = source; i <= sink; i++){

		// adjacentLength = adjacentNode[i]
		len = adjacentNode[i].length;

		parentTop = nodePosition[i][0];
		parentLeft = nodePosition[i][1];

		for(j = 0; j < len; j++){

			index = adjacentNode[i][j];

			top = nodePosition[index][0];
			left = nodePosition[index][1];

			if(parentLeft == left){

				svgTop = parentTop + 50 - 1;
				svgLeft = parentLeft;

				svgHeight = 52;
				svgWidth = 52;

				firstx1 = 25;
				firsty1 = 0;
				firstx2 = 25;
				firsty2 = 52;

				secondx1 = firstx1 - 7;
				secondy1 = 40;
				secondx2 = 25;
				secondy2 = 52;

				thirdx1 = firstx1 + 7;
				thirdy1 = 40;
				thirdx2 = 25;
				thirdy2 = 52;

			}
			else if(parentTop + 100 == top){

				svgTop = parentTop + 50;

				if(parentLeft > left)
					svgLeft = left;
				else if(parentLeft < left)
					svgLeft = parentLeft;





				svgHeight = 52;

				if(parentLeft > left)
					svgWidth = parentLeft - left + 50;
				else if(parentLeft < left)
					svgWidth = left - parentLeft + 50;
				




				firstx1 = 25;

				if(parentLeft > left)
					firsty1 = 52;
				else if(parentLeft < left)
					firsty1 = 0;
				

				firstx2 = svgWidth - firstx1;

				if(parentLeft > left)
					firsty2 = 0;
				else if(parentLeft < left)
					firsty2 = 52;
				





				/*  second & third x1, y1 nia jhamela hoite pare
				 	parle thik korbo naile nai
				*/

				if(parentLeft > left)
					secondx1 = 37;
				else if(parentLeft < left)
					secondx1 = firstx2 - 5;
				
				if(parentLeft > left)
					secondy1 = 37;
				else if(parentLeft < left)
					secondy1 = 40;
				

				if(parentLeft > left)
					secondx2 = firstx1;
				else if(parentLeft < left)
					secondx2 = firstx2;
				
				secondy2 = 52;
				





				if(parentLeft > left)
					thirdx1 = 42;
				else if(parentLeft < left)
					thirdx1 = firstx2 - 15;
				
				thirdy1 = 50;

				if(parentLeft > left)
					thirdx2 = firstx1;
				else if(parentLeft < left)
					thirdx2 = firstx2;
				

				thirdy2 = 52;
				
			}
			else if(parentTop == top){

				svgTop = parentTop;

				if(parentLeft > left)
					svgLeft = left + 50;
				else if(parentLeft < left)
					svgLeft = parentLeft + 50;


				svgHeight = 52;

				if(parentLeft > left)
					svgWidth = parentLeft - left - 50;
				else if(parentLeft < left)
					svgWidth = left - parentLeft - 50;
				

				firstx1 = 0;
				firsty1 = 25;
				firstx2 = svgWidth;
				firsty2 = 25;



				if(parentLeft > left)
					secondx1 = 10;
				else if(parentLeft < left)
					secondx1 = 40;

				secondy1 = 15;

				if(parentLeft > left)
					secondx2 = 0;
				else if(parentLeft < left)
					secondx2 = 52;

				secondy2 = 25;



				thirdx1 = secondx1;
				thirdy1 = 35;
				thirdx2 = secondx2;
				thirdy2 = 25;

				// console.log('svg Top' + svgTop);
				// console.log('svg left' + svgLeft);
				// console.log('svg height' + svgHeight);
				// console.log('svg width' + svgWidth);

				console.log('parentLeft' + parentLeft);
				console.log('left' + left);
			}



			tempText = '<svg width="' + svgWidth + '" height="' + svgHeight + '" style="position: absolute; top: ' + svgTop + 'px; left: ' + svgLeft + 'px;">' +
		  			   '<line x1="' + firstx1 + '" y1="' + firsty1 + '" x2="' + firstx2 + '" y2="' + firsty2 + '" stroke="black"></line>' +
		  			   '<line x1="' + secondx1 + '" y1="' + secondy1 + '" x2="' + secondx2 + '" y2="' + secondy2 + '" stroke="black"></line>' + 
		  			   '<line x1="' + thirdx1 + '" y1="' + thirdy1 + '" x2="' + thirdx2 + '" y2="' + thirdy2 + '" stroke="black"></line>' + 
					   '</svg>';

			finalText = finalText + tempText;
		}
	}

	return finalText;
}


/*----------  drawBfsInputSet function body  ----------*/


function drawBfsInputSet(index){

	var inputData = bfsInputSet[index];

	var source = 1, sink = index;

	/* create adjacent list */
	adjacentNode =  createAdjacentListBfs(inputData, source, sink);

	console.log('adjacent Node ' + adjacentNode);

	nodePosition = createNodePositionBfs(adjacentNode, source, sink);

	var circleText = createCircleText(nodePosition, source, sink);

	$('#container').html(circleText);

	addCssToCircleDiv(nodePosition, source,sink);

	var arrowText = createArrowFromCircleToCircle(adjacentNode, nodePosition, source, sink);

	$('#container').append(arrowText);

	// console.log('arrow text ' + arrowText);

}


/*----------  runBfs function body  ----------*/
function runBfs(index){

	var i, j, u, v, len;

	var source = 1; sink = index;

	var queue = [];
	level = [];
	parent = [];
	shortestPath = [];

	queue.push(source);

	// bfsControlStrip.push("enqueue");
	// bfsControlStrip.push(source);

	level[source] = 0;
	parent[source] = 0;

	while(queue.length != 0){

		u = queue.shift();

		bfsControlStrip.push("dequeue");
		bfsControlStrip.push(u);
		bfsControlStrip.push("start adding adjacent node");

		len = adjacentNode[u].length;

		for(i = 0; i < len; i++){

			v = adjacentNode[u][i];

			bfsControlStrip.push(v);

			if(typeof level[v] == 'undefined'){

				level[v] = level[u] + 1;

				parent[v] = u;

				queue.push(v);
			}
		}

		bfsControlStrip.push("end adding adjacent node");
		bfsControlStrip.push("remove focus");
		bfsControlStrip.push(u);

	}

	console.log('control Strip ' + bfsControlStrip);
	v = sink;

	while(v != source){

		// console.log(v);

		shortestPath.push(v);

		v = parent[v];
	}

	shortestPath.push(source);

	console.log(shortestPath);

	// alert('shortest distance ' + level[sink]);
}

/*=====  End of BFS section  ======*/














/*----------  animation Next function body  ----------*/
function animationNext(algorithm){

	if(algorithm == "bubbleSort"){

		if(bubbleIndex == positionArray.length - 1){

			alert("You are in last step.");
			return;
		}

		var len = positionArray[0].length;
		var i,j;

		var firstArr = positionArray[bubbleIndex];
		var secondArr = positionArray[bubbleIndex + 1];
		// alert(positionArray);

		// alert(i + " " + firstArr + " " + secondArr);

		for(j = 0; j < len; j++){

			if(firstArr[j] != secondArr[j]){

				// setTimeout("bubbleSortAnimationChangePosition(firstArr[j], secondArr[j], j)",2000);
				bubbleSortAnimationChangePosition(firstArr[j], secondArr[j], j);

				// alert('do something');

				// bubbleSortSingleAnimation(firstArr[j], j);

				// bubbleSortSingleAnimation(secondArr[j], j+1);

				break;
			}
		}

		bubbleIndex++;
	}
	else if(algorithm == "mergeSort"){

		var controlStripeState = controlStripForMergeSort[mergeIndex];

		if(controlStripeState == "start"){
			/* color all the column first with black */

			colorAll("#000");
		}
		else if(controlStripeState == "end"){

			/* this is the end of the control strip */
			alert('Sort has been completed');
			
		}
		else if(controlStripeState == "merging start" || controlStripeState == "merging end"){

			mergeIndex++;
			animationNext(algorithm);

			return;
		}
		else if(controlStripeState instanceof Array){

			var len = controlStripeState.length;

			if(controlStripeState[0] == "break"){

				if(controlStripeState[1] == "left"){

					/* this is for left side breaking */

					var intNumer = parseInt(leftColor.substr(1),16);
					if(intNumer + 20000 > 16777215)
						intNumer = 10010100
					intNumer = intNumer + 20000;
					intNumer = intNumer.toString(16);
					leftColor = "#" + intNumer;

					// leftColor = leftColor;


					colorRangeOfColumns(controlStripeState[2] + 1,controlStripeState[3] + 1, leftColor);
					console.log(controlStripeState);
					
				}
				else if(controlStripeState[1] == "right"){

					/* this is for right side breaking */

					var intNumer = parseInt(rightColor.substr(1),16);
					if(intNumer + 20000 > 16777215)
						intNumer = 10010100;

					if(intNumer < 85280){

						intNumer = 1366480;
					}

					intNumer = intNumer + 20000;
					intNumer = intNumer.toString(16);
					rightColor = "#" + intNumer;

					// rightColor = rightColor;


					colorRangeOfColumns(controlStripeState[2] + 1,controlStripeState[3] + 1, rightColor);
					console.log(controlStripeState);
				}
			}
			else{

				if(controlStripForMergeSort[mergeIndex - 1] == "merging start"){

					/* this is for left side */
					var intNumer = parseInt(leftColor.substr(1),16);
					if(intNumer + 20000 > 16777215)
						intNumer = 10010100
					intNumer = intNumer + 20000;
					intNumer = intNumer.toString(16);
					leftColor = "#" + intNumer;

					// leftColor = leftColor;


					colorAllArrayElements(controlStripeState, leftColor);

					changePositionToDownLeft(controlStripeState);
				}
				else if(controlStripForMergeSort[mergeIndex - 2] == "merging start"){

					/* this is for right side */

					var intNumer = parseInt(rightColor.substr(1),16);
					if(intNumer + 20000 > 16777215)
						intNumer = 10010100;

					if(intNumer < 85280){

						intNumer = 1366480;
					}

					intNumer = intNumer + 20000;
					intNumer = intNumer.toString(16);
					rightColor = "#" + intNumer;

					// rightColor = rightColor;

					colorAllArrayElements(controlStripeState, rightColor);

					changePositionToDownRight(controlStripeState);
					
				}
				else if(controlStripForMergeSort[mergeIndex - 3] == "merging start"){

					/* this is for both side */
					colorAllArrayElements(controlStripeState, "#87ecf1");

					changePositionToOriginalLavel(controlStripeState);
					// #87ecf1
				}
			}
		}

		if(mergeIndex < controlStripForMergeSort.length - 1)
			mergeIndex++;
	}
	else if(algorithm == "bfs"){

		if(bfsAnimationIndex == bfsControlStrip.length){

			alert('you are in last position');
		}

		var controlStripeState = bfsControlStrip[bfsAnimationIndex];

		var len = bfsControlStrip.length;

		if(controlStripeState == "enqueue"){

			if(bfsAnimationIndex < len)
				bfsAnimationIndex++;

			var id = "#circle-div-" + bfsControlStrip[bfsAnimationIndex];

			$(id).css('backgroundColor', 'red');
			
		}
		else if(controlStripeState == "dequeue"){

			if(bfsAnimationIndex < len)
				bfsAnimationIndex++;

			var id = "#circle-div-" + bfsControlStrip[bfsAnimationIndex];

			$(id).css('backgroundColor', 'red');
		}
		else if(controlStripeState == "start adding adjacent node"){

			if(bfsAnimationIndex < len)
				bfsAnimationIndex++;

			controlStripeState = bfsControlStrip[bfsAnimationIndex];

			while(controlStripeState != "end adding adjacent node"){

				var id = "#circle-div-" + controlStripeState;

				$(id).css('backgroundColor', 'green');

				if(bfsAnimationIndex < len)
					bfsAnimationIndex++;

				controlStripeState = bfsControlStrip[bfsAnimationIndex];
			}
		}
		else if(controlStripeState == "remove focus"){

			if(bfsAnimationIndex < len)
				bfsAnimationIndex++;

			controlStripeState = bfsControlStrip[bfsAnimationIndex];

			var id = "#circle-div-" + controlStripeState;

			$(id).css('backgroundColor', 'black');

			var tempLen = adjacentNode[controlStripeState].length;
			var i;

			for(i = 0; i < tempLen; i++){

				
				id = "#circle-div-" + adjacentNode[controlStripeState][i];
				$(id).css('backgroundColor', 'black');
			}
		}



		if(bfsAnimationIndex < len)
			bfsAnimationIndex++;
	}
}







/*----------  animation start function body  ----------*/
function animationStart(algorithm){

	if(algorithm == "bubbleSort"){

		var firstArr = [], secondArr = [];
		var positionRows = positionArray.length;
		var len = positionArray[0].length;
		var i,j;


		for(i = bubbleIndex; i < positionRows - 1; i++){

			// animationNext(algorithm);

			if(bubbleContinue == true)
				animationNext(algorithm);

		}

	}
}

/*----------  animation pause function body  ----------*/
function animationPause(algorithm){

	if(algorithm == "bubbleSort"){


	}
}

/*----------  animation restart function body  ----------*/
// function animationRestart(algorithm){

// 	if(algorithm == "bubbleSort"){


// 	}
// }

/*----------  animation Previous function body  ----------*/
function animationPrevious(algorithm){

	if(algorithm == "bubbleSort"){

		if(bubbleIndex == 0){

			alert("You are in first position.");
			return;
		}

		var len = positionArray[0].length;
		var i,j;

		var firstArr = positionArray[bubbleIndex];
		var secondArr = positionArray[bubbleIndex - 1];


		for(j = 0; j < len; j++){

			if(firstArr[j] != secondArr[j]){

				// setTimeout("bubbleSortAnimationChangePosition(firstArr[j], secondArr[j], j)",2000);
				bubbleSortAnimationChangePosition(firstArr[j], secondArr[j], j);

				// alert('do something');

				// bubbleSortSingleAnimation(firstArr[j], j);

				// bubbleSortSingleAnimation(secondArr[j], j+1);

				break;
			}
		}

		if (bubbleIndex != 0) {

			bubbleIndex--;
		}
		
	}
	else if(algorithm == "mergeSort"){

		var controlStripeState = controlStripForMergeSort[mergeIndex];



		if(controlStripeState == "end"){

			/* color all the column blue */
			colorAll("#0000ff");

			if(mergeIndex > 0){

				mergeIndex--;
			}
		}
		else if(controlStripeState == "merging end"){

			/* call the animationPrevious function  */

			if(mergeIndex > 0){

				mergeIndex--;
			}


			animationPrevious(algorithm);

			return;
		}
		else if(controlStripeState instanceof Array && controlStripeState[0] != "break"){

			/* first check if it is for left side or right side */
			
			/* it is for right side */
			if(controlStripForMergeSort[mergeIndex + 2] == "merging end"){

				/* bring down right side elements */

				var intNumer = parseInt(rightColor.substr(1),16);
				if(intNumer + 20000 > 16777215)
					intNumer = 10010100;

				if(intNumer < 85280){

					intNumer = 1366480;
				}

				intNumer = intNumer + 20000;
				intNumer = intNumer.toString(16);
				rightColor = "#" + intNumer;

				// rightColor = rightColor;

				colorAllArrayElements(controlStripeState, rightColor);


				
				var workingRange = mergeSortCurrentWorkingRangePreviousButton[ currentWorkingSectionIndex ];

				var startingPoint = workingRange[ workingRange.length - controlStripeState.length ];

				bringDownRightSideElementsMergeSort(controlStripeState, startingPoint);
			}
			/* this is for left side */
			else if(controlStripForMergeSort[mergeIndex + 3] == "merging end"){

				/* bring down left side elements */


				var intNumer = parseInt(leftColor.substr(1),16);
				if(intNumer + 20000 > 16777215)
					intNumer = 10010100
				intNumer = intNumer + 20000;
				intNumer = intNumer.toString(16);
				leftColor = "#" + intNumer;

				colorAllArrayElements(controlStripeState, leftColor);



				var workingRange = mergeSortCurrentWorkingRangePreviousButton[ currentWorkingSectionIndex ];

				var startingPoint = workingRange[ workingRange.length - controlStripeState.length - controlStripeState.length ];

				bringDownLeftSideElementsMergeSort(controlStripeState, startingPoint);

				currentWorkingSectionIndex--;
			}
		}
		else if( controlStripeState == "merging start"){

			/* set top property of left & right side elements properly */
			setTopPropertyOfLeftAndRightSideProperly(controlStripForMergeSort[ mergeIndex + 3]);
			
		}
		else if(controlStripeState instanceof Array && controlStripeState[0] == "break"){

			/* call animationPrevious function */
			if(mergeIndex > 0){

				mergeIndex--;
			}

			animationPrevious(algorithm);

			return;
		}
		else if(controlStripeState == "start"){

			alert('you are in first step');
		}



		if(mergeIndex > 0){

			mergeIndex--;
		}


















		// if(controlStripeState == "start"){
		// 	/* color all the column first with black */

		// 	colorAll("#000");

		// }
		// else if(controlStripeState == "end"){

		// 	/* this is the end of the control strip */
			
			
		// }
		// else if(controlStripeState == "merging start"){

		// 	console.log('in previous button ' + beforeMergingState[mergePreviousIndex]);
		// 	changePositionToOriginalLavelForPrevious(beforeMergingState[mergePreviousIndex]);

		// 	if(mergePreviousIndex > 0)
		// 		mergePreviousIndex--;
		// }
		// else if(controlStripeState == "merging end"){

		// 	mergeIndex--;
		// 	animationPrevious(algorithm);

		// 	return;
		// }
		// else if(controlStripeState instanceof Array){

		// 	var len = controlStripeState.length;

		// 	if(controlStripeState[0] == "break"){

		// 		if(controlStripeState[1] == "left"){

		// 			/* this is for left side breaking */

		// 			var intNumer = parseInt(leftColor.substr(1),16);
		// 			intNumer = intNumer + 500;
		// 			intNumer = intNumer.toString(16);
		// 			leftColor = "#" + intNumer;


		// 			colorRangeOfColumns(controlStripeState[2] + 1,controlStripeState[3] + 1, redColor);
		// 			console.log(controlStripeState);
					
		// 		}
		// 		else if(controlStripeState[1] == "right"){

		// 			 this is for right side breaking 

		// 			var intNumer = parseInt(rightColor.substr(1),16);
		// 			intNumer = intNumer + 500;
		// 			intNumer = intNumer.toString(16);
		// 			rightColor = "#" + intNumer;


		// 			colorRangeOfColumns(controlStripeState[2] + 1,controlStripeState[3] + 1, greenColor);
		// 			console.log(controlStripeState);
		// 		}
		// 	}
		// 	else{

		// 		if(controlStripForMergeSort[mergeIndex - 1] == "merging start"){

		// 			/* this is for left side */
		// 			beforeMergingTakeToPreviousPosition(controlStripeState, beforeMergingPixelPosition[ beforeMergingPixelIndex ]);
		// 			beforeMergingPixelIndex--;
		// 		}
		// 		else if(controlStripForMergeSort[mergeIndex - 2] == "merging start"){

		// 			/* this is for right side */
		// 			beforeMergingTakeToPreviousPosition(controlStripeState, beforeMergingPixelPosition[ beforeMergingPixelIndex ]);
		// 			beforeMergingPixelIndex--;
					
		// 		}
		// 		else if(controlStripForMergeSort[mergeIndex - 3] == "merging start"){

		// 			/* this is for both side */
		// 			colorAll(controlStripeState, "87ecf1");

		// 			// changePositionToDownLavel(controlStripeState);
		// 			// #87ecf1
		// 		}
		// 	}
		// }

		// if(mergeIndex > 0)
		// 	mergeIndex--;
		// else
		// 	alert('You are in the first step');

	}
	else if(algorithm == "bfs"){

		if(bfsAnimationPreviousIndex == -1)
		{

			var id = "#circle-div-" + 1;

			$(id).css('backgroundColor', 'black');

			alert('you are in first position');
		}

		if(bfsAnimationPreviousIndex == 0){

			var len = bfsControlStrip.length;

			if(bfsAnimationPreviousIndex < len)
				bfsAnimationPreviousIndex++;

			controlStripeState = bfsControlStrip[bfsAnimationPreviousIndex];

			var id = "#circle-div-" + controlStripeState;

			$(id).css('backgroundColor', 'black');

			var tempLen = adjacentNode[controlStripeState].length;
			var i;

			for(i = 0; i < tempLen; i++){

				
				id = "#circle-div-" + adjacentNode[controlStripeState][i];
				$(id).css('backgroundColor', 'black');
			}

			bfsAnimationPreviousIndex = bfsAnimationPreviousIndex - 2;

			
		}

		var controlStripeState = bfsControlStrip[bfsAnimationPreviousIndex];

		var len = bfsControlStrip.length;

		if(controlStripeState == "enqueue"){

			if(bfsAnimationPreviousIndex < len)
				bfsAnimationPreviousIndex++;

			var id = "#circle-div-" + bfsControlStrip[bfsAnimationPreviousIndex];

			$(id).css('backgroundColor', 'red');
			
		}
		else if(controlStripeState == "dequeue"){

			var count = 0;

			if(bfsAnimationPreviousIndex < len)
				bfsAnimationPreviousIndex++;

			count++;

			var id = "#circle-div-" + bfsControlStrip[bfsAnimationPreviousIndex];

			$(id).css('backgroundColor', 'red');

			if(bfsAnimationPreviousIndex - 3 >= 0 )
				bfsAnimationPreviousIndex = bfsAnimationPreviousIndex - count - 1;
			else
				bfsAnimationPreviousIndex = bfsAnimationPreviousIndex - count;

			// while(controlStripeState != "remove focus"){

			// 	bfsAnimationPreviousIndex--;

			// 	controlStripeState = bfsControlStrip[bfsAnimationPreviousIndex];
			// }
		}
		else if(controlStripeState == "start adding adjacent node"){

			var count = 0;

			if(bfsAnimationPreviousIndex < len)
				bfsAnimationPreviousIndex++;

			count++;

			controlStripeState = bfsControlStrip[bfsAnimationPreviousIndex];

			while(controlStripeState != "end adding adjacent node"){

				var id = "#circle-div-" + controlStripeState;

				$(id).css('backgroundColor', 'green');

				if(bfsAnimationPreviousIndex < len)
					bfsAnimationPreviousIndex++;

				count++;

				controlStripeState = bfsControlStrip[bfsAnimationPreviousIndex];
			}

			bfsAnimationPreviousIndex = bfsAnimationPreviousIndex - count - 1;

			while(controlStripeState != "dequeue"){

				bfsAnimationPreviousIndex--;

				controlStripeState = bfsControlStrip[bfsAnimationPreviousIndex];
			}

			bfsAnimationPreviousIndex++;
		}
		else if(controlStripeState == "remove focus"){

			if(bfsAnimationPreviousIndex + 3 < len){

				bfsAnimationPreviousIndex = bfsAnimationPreviousIndex + 3;
			}
			else{

				// if(bfsAnimationPreviousIndex > 0)
					// bfsAnimationPreviousIndex--;

				while(controlStripeState != "start adding adjacent node"){

					bfsAnimationPreviousIndex--;

					controlStripeState = bfsControlStrip[bfsAnimationPreviousIndex];
				}

				return;
			}

			controlStripeState = bfsControlStrip[bfsAnimationPreviousIndex];

			var id = "#circle-div-" + controlStripeState;

			$(id).css('backgroundColor', 'black');

			var tempLen = adjacentNode[controlStripeState].length;
			var i;

			for(i = 0; i < tempLen; i++){

				
				id = "#circle-div-" + adjacentNode[controlStripeState][i];
				$(id).css('backgroundColor', 'black');
			}

			bfsAnimationPreviousIndex = bfsAnimationPreviousIndex - 3;

			// while(controlStripeState != "start adding adjacent node"){

			// 	bfsAnimationPreviousIndex--;

			// 	controlStripeState = bfsControlStrip[bfsAnimationPreviousIndex];
			// }

		}



		if(bfsAnimationPreviousIndex > 0)
			bfsAnimationPreviousIndex--;
	}
}
