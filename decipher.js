let inorout;
let sh1Arr;
let sh2Arr;

let animValue = 0; //animation of
let c = 20; //cols
let r = 20; //rows
let size = 10;
let canva;
let raisedError = 0;

let address = window.location.href;

function setup() {

}

function draw(){
	background(255);
	stroke(0);

	if(typeof sh1Arr !== 'undefined' && typeof(sh2Arr !== 'undefined')){
		if(typeof inorout !== 'undefined'){
			//drawing input/output
			for(let i = 0; i < c/2; i++){
				for(let j = 0; j < r/2; j++){
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
		}

		//drawing shares
		for(let i = 0; i < c; i++){
			for(let j = 0; j < r; j++){
				//share1
				let x = i * (size/2);
				let y = j * (size/2);
				x += size*c/2 + size;

				if(sh1Arr[i][j] == 1){
					fill(0);
				}
				else{
					noFill();
				}
				rect(x,y,(size/2)-1,(size/2)-1);
			}
		}


		for(let i = 0; i < c; i++){
			for(let j = 0; j < r; j++){
				//share2
				let x = i * (size/2);
				let y = j * (size/2);
				x += size*c + 2*size - animValue;

				if(sh2Arr[i][j] == 1){
					fill(0);
				}
				else{
					noFill();
				}
				rect(x,y,(size/2)-1,(size/2)-1);
			}
		}
	}

}

function decipher(){
	animValue = 0;

	let sh1 = document.getElementById("share1");
	let sh2 = document.getElementById("share2");

	if(sh1.value.length <= 0){
		raisedError = 1;
		document.getElementById("errors").innerHTML = "Nie podano pierwszego udziału!";
	}
	else if(sh2.value.length <= 0){
		raisedError = 2;
		document.getElementById("errors").innerHTML = "Nie podano drugiego udziału!";
	}
	else if(sh1.value.length != sh2.value.length){
		raisedError = 3;
		document.getElementById("errors").innerHTML = "Podane udziały mają różną długość!";
	}
	else{
		raisedError = 0;
		document.getElementById("errors").innerHTML = "";
	}

	//checking shares
	if(raisedError == 0){
		let sh1Rows = sh1.value.split(",");
		let sh2Rows = sh2.value.split(",");

		c = sh1Rows.length;
		r = sh1.value.search(",");

		sh1Arr = [...Array(c).keys()].map(i => Array(r));
		sh2Arr = [...Array(c).keys()].map(i => Array(r));

		let sh1Helper;
		let sh2Helper;

		for(let i = 0; i < c; i++){
			sh1Helper = sh1Rows[i].split("");
			sh2Helper = sh2Rows[i].split("");

			for(let j = 0; j < r; j++){
				if(sh1Helper[j] == 1) sh1Arr[i][j] = 1;
				else sh1Arr[i][j] = 0;

				if(sh2Helper[j] == 1) sh2Arr[i][j] = 1;
				else sh2Arr[i][j] = 0;
			}
		}

		//setup

		//creating background canva
		canva = createCanvas(3*c/2*size+2*size,r/2*size);
		canva.parent('sketch-holder');

		//creating table
		if(c%2 || r%2){
			raisedError=4;
			document.getElementById("errors").innerHTML = "Ktoryś z wymiarów jest nieparzysty.";
		}

		inorout = [...Array(ceil(c/2)).keys()].map(i => Array(ceil(r/2)));
		cleanInorout();
	}

	//locking "Overlay shares" button
	if(!raisedError) document.getElementById("overlay-btn").disabled = false;
	else document.getElementById("overlay-btn").disabled = true;

}

function overlay(){
	animValue = c/2*size+size;
	pushtoInorout();
}

function cleanInorout(){
	//writing "empty" values to input/output
	for(let i = 0; i < c/2; i++){
		for(let j = 0; j < r/2; j++){
			inorout[i][j] = 0;
		}
	}
}

function pushtoInorout(){
	//writing values to input/output
	for(let i = 0; i < c/2; i++){
		for(let j = 0; j < r/2; j++){
			let blacked = 0;

			if(sh1Arr[i*2][j*2] || sh2Arr[i*2][j*2]) blacked++;
			if(sh1Arr[i*2+1][j*2] || sh2Arr[i*2+1][j*2]) blacked++;
			if(sh1Arr[i*2][j*2+1] || sh2Arr[i*2][j*2+1]) blacked++;
			if(sh1Arr[i*2+1][j*2+1] || sh2Arr[i*2+1][j*2+1]) blacked++;

			if (blacked == 4) inorout[i][j] = 1;
			else inorout[i][j] = 0;
		}
	}
}
