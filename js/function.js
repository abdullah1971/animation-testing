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

// function swap need to think because referance don't work here
//======================
function swap(fval,sval){
	var temp;

	temp = fval;
	fval = sval;
	sval = temp;


}


// testing animation
//============================

/*var gfpos, gsleft, gspos, gfleft;
var gfelement, gselement, gfid, gsid;

function firstFrame(){

	if(gfpos == gsleft){

		clearInterval(gfid);
		

	}else{

		gfpos++;
		

		gfelement.style.left = gfpos + "px";
		
	}
}


function secondFrame(){

	if(gspos == gfleft){

		clearInterval(gsid);

	}else{

		gspos--;

		gselement.style.left = gspos + "px";
	}
}

*/


// function for bubble sort
//=================================

function bubbleSort(digits){

	var len = digits.length;

	var track = [];

	var i , j, fcol , scol , ftrac , strac , fval , sval;
	var fColVal , sColVal , temp , felement , slement;
	var fleft , sleft , fstyle , sstyle , ftem , stem;
	var fpos , spos , fid , sid, test = 0;

	for(i = 1; i <= len; i++){

		track.push(i);
	}

	for(i = 1; i <= len - 1; i++){

		for(j = 1; j <= len - 1; j++){

			ftrac = track[j - 1];
			strac = track[j];


			fcol = "colNum" + ftrac;
			scol = "colNum" + strac;


			fval = "colVal" + ftrac;
			sval = "colVal" + strac;
			

			fColVal = document.getElementById(fval).innerHTML;
			fColVal = parseInt(fColVal);
			
			sColVal = document.getElementById(sval).innerHTML;
			sColVal = parseInt(sColVal);

			if(fColVal > sColVal){

				/* change the paragraph value */
				temp = fColVal;
				fColVal = sColVal;
				sColVal = temp;

				/* change the track value */
				temp = track[j -1];
				track[j -1] = track[j];
				track[j] = temp;

				/* change the left value of column*/
				felement = document.getElementById(fcol);
				selement = document.getElementById(scol);

				fstyle = window.getComputedStyle(felement);
				sstyle = window.getComputedStyle(selement);

				fleft = fstyle.getPropertyValue('left');
				sleft = sstyle.getPropertyValue('left');

				
				fpos = parseInt(fleft,10);
				spos = parseInt(sleft,10);

				fleft = fpos + "px";
				sleft = spos + "px";

				
				//alert(fcol);

				fcol = "#" + fcol;
				scol = "#" + scol;

				$(fcol).animate({
				  left: sleft
				}, {
				  duration: 2000,
				  // queue: false,
				  // complete    : function() {  
				  //         alert('This is alert')
				  //     }
				});

				/*$(scol).animate({
				  left: fleft
				}, {
				  duration: 50,
				  queue: false
				});*/

				// alert('this is testing');

				selement.style.left = fleft;

				/*$(scol).animate({
					left: fleft
				},

				{
					 duration: 2000,
					 queue: false 
				});

				$(fcol).animate({
					left: sleft},
					{ duration: 2000, queue: false });

				
				/*while(fpos != sleft){

					fpos++;
					spos--;

					$(fcol).animate({
					    left: "fpos",
					 }, 20 );

					$(scol).animate({
					    left: "spos",
					 }, 20 );

					/*felement.style.left = fpos + "px";
					selement.style.left = spos + "px";*/
				/*}*/



				


			}
		}
	}
}