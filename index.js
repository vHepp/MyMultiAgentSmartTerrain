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
					sacrifice += percents[(i + k) % percents.length];
				}
				let gain = percents[i];

				//Math.round(((sacrifice / gain) + Number.EPSILON) * 100) / 100
				//let oppCost = `${sacrifice / gain}`
				let oppCost = Math.round(((sacrifice / gain) + Number.EPSILON) * 1000) / 1000
				this.costs[g][i] = oppCost;
			}
		}

	}

	displayGuards() {
		console.table(this.guards)
	}

	displayCosts() {
		console.table(this.costs);
	}
}
// enddefine


const guards = [{
	guard: "0",
	percents: [35, 50]
},
{
	guard: "1",
	percents: [30, 55]
},
{
	guard: "2",
	percents: [50, 55]
},
];

const s = new Solver(guards);

s.displayGuards()
s.displayCosts()