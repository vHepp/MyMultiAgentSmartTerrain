class Solver {
	constructor(guards) {
		//console.log("Building a solver")
		this.guards = guards;
		//console.table(this.guards)
		this.fillOppCosts();
	}

	fillOppCosts() {
		this.costs = [];

		for (let g = 0; g < this.guards.length; g++) {
			let percents = this.guards[g].percents

			this.costs[g] = [];
			for (let i = 0; i < percents.length; i++) {
				let sacrifice = 0;
				for (let k = 1; k < percents.length; k++) {
					sacrifice += percents[(i + k) % percents.length]
					//sacrifice = Math.max(sacrifice, percents[(i + k) % percents.length])
				}
				let gain = percents[i];

				//l`et oppCost = `${sacrifice} / ${gain}`
				let oppCost = Math.round(((sacrifice / gain) + Number.EPSILON) * 100) / 100
				this.costs[g][i] = oppCost;
			}
		}

	}

	optimize() {

		console.log("OPTIMIZE")
		console.log(this.costs.length)
		console.log(this.costs[0].length)


		this.min = 0;
		this.minArr = [];
		if (this.costs && this.costs[0]) {
			this.min = this.costs[0][0];
			for (let i = 0; i < this.costs[0].length; i++) {
				this.minArr.push(0);
			}
		}
		else { return }

		/* console.log(`min = ${this.min}`);
		console.log("minArr:")
		console.table(this.minArr) */

		//for 3x3 options
		for (let i = 0; i < this.costs[0].length; i++) {
			for (let j = 0; j < this.costs[1].length; j++) {
				for (let k = 0; k < this.costs[2].length; k++) {
					if (i !== j && i !== k && j !== k) {
						let cost = this.costs[0][i] + this.costs[1][j] + this.costs[2][k];

						if (cost < this.min) {
							this.min = cost;
							this.minArr[0] = i;
							this.minArr[1] = j;
							this.minArr[2] = k;
						}
					}
				}
			}
		}

	}

	displayGuards() {
		console.table(this.guards)
	}

	displayCosts() {
		console.table(this.costs);
	}

	displayChoices() {
		let result = {
			totalCost: this.min,
			choices: this.minArr
		}
		console.table(result);
	}
}
// enddefine


const guards = [{
	guard: "0",
	percents: [10, 50, 95]
},
{
	guard: "1",
	percents: [10, 50, 40]
},
{
	guard: "2",
	percents: [10, 85, 95]
},
];

const s = new Solver(guards);

s.optimize();
s.displayGuards()
s.displayCosts()
s.displayChoices()
/* 
let combos = 0;

for (let i = 0; i < 3; i++) {
	for (let j = 0; j < 3; j++) {
		for (let k = 0; k < 3; k++) {
			if (i !== j && i !== k && j !== k) {
				combos++;
			}
		}
	}
}
console.log(`unique selections 3x3 combos: ${combos}`)

combos = 0;
for (let i = 0; i < 3; i++) {
	for (let j = 0; j < 3; j++) {
		for (let k = 0; k < 3; k++) {
			//console.table({ i, j, k })
			if (i !== j && i !== k && j !== k) {
				combos++;
			}
		}
	}
}

console.log(`unique v2 selections 3x3 combos: ${combos}`)
*/