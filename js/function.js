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

	data = prompt("Enter the array to be sorted (space separated value & no 0 value's");
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
}
