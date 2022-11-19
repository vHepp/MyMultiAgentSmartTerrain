console.log("Hello, World!")

let n = 40, m = 40

const map = [n];

for (let i = 0; i < n; i++) {
	map[i] = []
	for (let j = 0; j < m; j++) {
		map[i][j] = 0;
	}
}
//console.table(map)

/*
for (let i = 0; i < n; i++){
	for (let j = 0; j < m; j++){
		map[i][j] = 0;	
	}
}
*/


let location_1 = {
	row: 24,
	column: 24,
	prob: 30
}

let decay = 5;



/* for (let i = 0; i < n; i++) {
	for (let j = 0; j < m; j++) {
		map[i][j] = 100;
	}
} */

console.table(location_1)

for (let i = 0; i < n; i++) {
	for (let j = 0; j < m; j++) {
		let diff = location_1.prob - (decay * (Math.abs(i - location_1.row) + Math.abs(j - location_1.column)))
		if (diff >= 0) {
			map[i][j] = diff;
		}
		else {
			map[i][j] = 0;
		}

		//console.log(`${location_1.prob} - (${decay} * (Math.abs(${i} - ${location_1.row}) + Math.abs(${j} - ${location_1.column}))`)
		/* map[i][j] = `(${i},${j})`; */
	}
}



console.table(map)