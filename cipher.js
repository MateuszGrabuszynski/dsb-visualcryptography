let inorout;
let share1;
let share2;

let animValue = 0; //animation of
let c = 20; //cols
let r = 20; //rows
let size = 10;
let canva;

let address = window.location.href;

function setup() {
	if(address.search("c=") != -1){
		c = 0;
		let begin = address.search("c=")+2;
		let end = address.search("&");
		let factor = 1;

		for(let i = end-1; i >= begin; i--){
			c += address[i]*factor;
			factor *= 10;
		}
	}
	document.getElementById("colsText").value = c;


	if(address.search("&r=") != -1){
		r = 0;
		let begin = address.search("r=")+2;
		let end = address.length;
		let factor = 1;

		for(let i = end-1; i >= begin; i--){
			r += address[i]*factor;
			factor *= 10;
		}
	}
	document.getElementById("rowsText").value = r;

	//create background cavna
	canva = createCanvas(3*c*size+2*size,r*size);
	canva.parent('sketch-holder');

	//tables creation
  inorout = [...Array(c).keys()].map(i => Array(r));

	share1 = [...Array(2*c).keys()].map(i => Array(2*r));
	share2 = [...Array(2*c).keys()].map(i => Array(2*r));

	cleanInorout();
	cleanShares();
}

function draw(){
	background(255);
	stroke(0);

	//drawing input/output
	for(let i = 0; i < c; i++){
		for(let j = 0; j < r; j++){
			//inorout
			let x = i * size;
			let y = j * size;

			if(inorout[i][j] == 1){
				fill(0);
			}
			else{
				fill(255);
			}
			rect(x,y,size-1,size-1);
		}
	}

	//drawing shares
	for(let i = 0; i < c*2; i++){
		for(let j = 0; j < r*2; j++){
			//share1
			let x = i * (size/2);
			let y = j * (size/2);
			x += size*c + size;

			if(share1[i][j] == 1){
				fill(0);
			}
			else{
				noFill();
			}
			rect(x,y,(size/2)-1,(size/2)-1);
		}
	}


	for(let i = 0; i < c*2; i++){
		for(let j = 0; j < r*2; j++){
			//share2
			let x = i * (size/2);
			let y = j * (size/2);
			x += 2*size*c + 2*size - animValue;

			if(share2[i][j] == 1){
				fill(0);
			}
			else{
				noFill();
			}
			rect(x,y,(size/2)-1,(size/2)-1);
		}
	}
}

function mouseClicked(){
	let xMatrixPos = floor(mouseX/size);
	let yMatrixPos = floor(mouseY/size);

	//marking pixels
	if( xMatrixPos < c ){
		if( yMatrixPos < r ){
			if(inorout[xMatrixPos][yMatrixPos] == 0){
				inorout[xMatrixPos][yMatrixPos] = 1;
			}
			else{
				inorout[xMatrixPos][yMatrixPos] = 0

			};
		}
	}
}

function cipher(){
	cleanShares();

	// [x*2][y*2] //uleft
	// [x*2+1][y*2] //uright
	// [x*2][y*2+1] //bleft
	// [x*2+1][y*2+1] //bright

	//checking values of input/output and ciphering onto shares
	for(let i = 0; i < c; i++){
		for(let j = 0; j < r; j++){

			//black pixel
			if(inorout[i][j] == 1){
				switch(floor(random(6))){
					//lines
					//11
					//22
					case 0:
						share1[i*2][j*2] = share1[i*2+1][j*2] = 1;
						share2[i*2][j*2+1] = share2[i*2+1][j*2+1] = 1;
						break;

					//22
					//11
					case 1:
						share1[i*2][j*2+1] = share1[i*2+1][j*2+1] = 1;
						share2[i*2][j*2] = share2[i*2+1][j*2] = 1;
						break;

					//12
					//12
					case 2:
						share1[i*2][j*2] = share1[i*2][j*2+1] = 1;
						share2[i*2+1][j*2] = share2[i*2+1][j*2+1] = 1;
						break;

					//21
					//21
					case 3:
						share1[i*2+1][j*2] = share1[i*2+1][j*2+1] = 1;
						share2[i*2][j*2] = share2[i*2][j*2+1] = 1;
						break;

					//crosses
					//12
					//21
					case 4:
						share1[i*2][j*2] = share1[i*2+1][j*2+1] = 1;
						share2[i*2+1][j*2] = share2[i*2][j*2+1] = 1;
						break;

					//21
					//12
					case 5:
						share1[i*2+1][j*2] = share1[i*2][j*2+1] = 1;
						share2[i*2][j*2] = share2[i*2+1][j*2+1] = 1;
						break;
				}
			}


			//white pixel
			else{
				switch(floor(random(10))){
					//every 2 px
					//lines
					//OO
					//xx
					case 0:
						share1[i*2][j*2] = share1[i*2+1][j*2] = share2[i*2][j*2] = share2[i*2+1][j*2] = 1;
						break;

					//xx
					//OO
					case 1:
						share1[i*2][j*2+1] = share1[i*2+1][j*2+1] = share2[i*2][j*2+1] = share2[i*2+1][j*2+1] = 1;
						break;

					//Ox
					//Ox
					case 2:
						share1[i*2][j*2] = share1[i*2][j*2+1] = share2[i*2][j*2] = share2[i*2][j*2+1] = 1;
						break;

					//xO
					//xO
					case 3:
						share1[i*2+1][j*2] = share1[i*2+1][j*2+1] = share2[i*2+1][j*2] = share2[i*2+1][j*2+1] = 1;
						break;

					//crosses
					//Ox
					//xO
					case 4:
						share1[i*2][j*2] = share1[i*2+1][j*2+1] = share2[i*2][j*2] = share2[i*2+1][j*2+1] = 1;
						break;

					//xO
					//Ox
					case 5:
						share1[i*2+1][j*2] = share1[i*2][j*2+1] = share2[i*2+1][j*2] = share2[i*2][j*2+1] = 1;
						break;

					//every 1 px
					//lines
					//12 21
					//xx xx
					case 6:
						if(floor(random(2))){
							share1[i*2][j*2] = share2[i*2+1][j*2] = 1;
						}
						else{
							share2[i*2][j*2] = share1[i*2+1][j*2] = 1;
						}
						break;

					//xx xx
					//12 21
					case 7:
						if(floor(random(2))){
							share1[i*2][j*2+1] = share2[i*2+1][j*2+1] = 1;
						}
						else{
							share2[i*2][j*2+1] = share1[i*2+1][j*2+1] = 1;
						}
						break;

					//1x 2x
					//2x 1x
					case 8:
						if(floor(random(2))){
							share1[i*2][j*2] = share2[i*2][j*2+1] = 1;
						}
						else{
							share2[i*2][j*2] = share1[i*2][j*2+1] = 1;
						}
						break;

					//x1 x2
					//x2 x1
					case 9:
						if(floor(random(2))){
							share1[i*2+1][j*2] = share2[i*2+1][j*2+1] = 1;
						}
						else{
							share2[i*2+1][j*2] = share1[i*2+1][j*2+1] = 1;
						}
						break;
				}
			}

		}
	}

	animValue = 0;
}

function overlay(){
	animValue = c*size+size;
}

function cleanShares(){
	//writing 'empty' values onto shares
	for(let i = 0; i < c*2; i++){
		for(let j = 0; j < r*2; j++){
			share1[i][j] = 0;
			share2[i][j] = 0;
		}
	}
}

function cleanInorout(){
	//writing 'empty' values onto input/output
	for(let i = 0; i < c; i++){
		for(let j = 0; j < r; j++){
			inorout[i][j] = 0;
		}
	}
}

function setColsRows(){
	var cols = document.getElementById("colsText");
	var rows = document.getElementById("rowsText");

	let cIndex = address.search("c=")

	if(cIndex != -1){
		window.location.href = address.slice(0, cIndex-1) + "?c=" + cols.value + "&r=" + rows.value;
	}
	else{
		window.location.href = address + "?c=" + cols.value + "&r=" + rows.value;
	}
}
