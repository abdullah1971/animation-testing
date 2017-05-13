// global variable
//=============================

var digits, i, maxVal = 0;

// get the array from user
//			&&
// convert it in an array
//===============================

var data = prompt("Enter the array to be sorted (max 5 element, space separated value):");

if(checkDigit(data)){

	digits = getDigits(data);
}







// create the dynamic column
//====================================

var colNum = digits.length;

/* divide in two parts and then add id no then merge */
var firstHalf,secondHalf,thirdHalf,fourthHalf;


firstHalf = "<div class='col' id=";
secondHalf = "><p class='para' id='colVal";
thirdHalf = "</p></div>";

/*firstHalf = "<div class='col' id=";
secondHalf = "><p class=";
thirdHalf = "colVal";

fourthHalf = "</p></div>";*/

var columnHtml,finalText = "";
var parent = document.getElementById('container');

for(i = 0; i < colNum; i++){

	/*columnHtml = firstHalf+ "\"colNum" + (i + 1) + "\"" + secondHalf + "\"" + thirdHalf+ "\">"  +
	digits[i]  + fourthHalf + "<br>";*/

	columnHtml = firstHalf + "\"colNum" + (i + 1) + "\"" + secondHalf + (i + 1) + "\'>" + digits[i] + thirdHalf + "<br>";

	finalText = finalText + columnHtml;

	if(digits[i] > maxVal)
		maxVal = digits[i];

	//alert(columnHtml);
}

/* write on the container */
	
parent.innerHTML = finalText;




// add css style to the 
// dynamically created column
//===================================

var temp, idName, element, tidName = "colNum", leftVal = 200;
var colColor = 000000;

/*var rand = Math.random();
alert(rand * 1000000);*/

for(i = 0; i < colNum; i++){

	idName = tidName + (i + 1);

	element = document.getElementById(idName);

	element.style.width = "50px";

	temp = digits[i] * 50;




	element.style.height = temp + "px";

	element.style.left = leftVal + 80 + "px";

	leftVal = leftVal + 80;

	temp = colColor + Math.ceil( Math.random() * 100000 ) + 111111 + i + 1;

	element.style.backgroundColor = "#" + temp;


	element.style.top = (maxVal * 50) - (digits[i] * 50) + 50 + "px";

}


function bubble(){

	bubbleSort(digits);
}







// for first column
//=========================

/*var fcol = document.getElementById("firstCol");

var fpos = 300;

var fid = setInterval(firstFrame,20);

function firstFrame(){

	if(fpos == 500){

		clearInterval(fid);

	}else{

		fpos++;

		fcol.style.left = fpos + 'px';
	}
}



// for second column
//=========================

var scol = document.getElementById("secondCol");

var spos = 500;

var sid = setInterval(secondFrame,20);

function secondFrame(){

	if(spos == 300){

		clearInterval(sid);

	}else{

		spos--;

		scol.style.left = spos + 'px';
	}
}*/