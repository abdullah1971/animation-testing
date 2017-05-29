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


/**
 *
 * global variable list
 *
 */
var positionArray = [];
var positionPixel = [];
var bubbleCount, bubbleContinue, bubbleIndex, bubblePrevious, bubbleNext;



/*----------  swap function  ----------*/
Array.prototype.swap = function (x,y) {
  var b = this[x];
  this[x] = this[y];
  this[y] = b;
  return this;
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



function mergeSort(digits){


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
}
