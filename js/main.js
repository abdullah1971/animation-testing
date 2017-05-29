// global variable
//=============================

var digits, i, maxVal = 0, data;

// get the array from user
//			&&
// convert it in an array
//===============================

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

			temp = 100 + digits[i] * 3;
		}




		element.style.height = temp + "px";

		element.style.left = leftVal + 50 + "px";

		leftVal = leftVal + 50;

		temp = colColor + Math.ceil( Math.random() * 100000 ) + 111111 + i + 1;

		element.style.backgroundColor = "#" + temp;


		/* set the top value */
		if(maxVal > 10){

			temp = 100 + maxVal * 3 + 50;

			if(digits[i] > 10){

				topDiff = 100 + digits[i] * 3;

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

	mergeSort(digits);
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




