
function Population(num) {
  // Array to hold the current population
  this.population;

  this.population = [];
  for (var i = 0; i < num; i++) {
    this.population[i] = new DNA(numPoints);
  }
}

Population.prototype.show = function() {
  for (var i = 0; i < this.population.length; i++) {
    this.population[i].show();
    // this.population[i].showFitness();

  }
}

Population.prototype.calcFitness = function() {
  for (var i = 0; i < this.population.length; i++) {
    this.population[i].calcFitness(target);
  }
}

Population.prototype.calcProb = function() {
  sum = 0;
  for (var i = 0; i < this.population.length; i++) {
    sum += this.population[i].fitness;
  }
  for (var i = 0; i < this.population.length; i++) {
    this.population[i].prob = (this.population[i].fitness / sum);
  }
}

Population.prototype.pickOne = function() {
  var i = -1;
  var r = random(1);

  do {
    i++;
    r = r - this.population[i].prob;
  } while (r > 0);

  this.population[i].picked++;
  return i;
}

Population.prototype.generate = function() {
  var childPopulation = [];
  for (var i = 0; i < this.population.length; i++) {
    var a = this.pickOne();
    var b = this.pickOne();
    var partnerA = this.population[a];
    var partnerB = this.population[b];
    //partnerA.mutate(0.00001);
    //partnerB.mutate(0.00001);
    //var child = partnerA.crossover(partnerB);
    var child = partnerA.crossover(partnerB);
    // child.mutate(0.001);
    childPopulation[i] = child;
  }
  // just add one child frome population 0 and 1
  this.population = [];
  this.population = childPopulation;
}

// unfertig
Population.prototype.evaluate = function () {
  var worldrecord = 0.0;
  var bestIndex = 0;
}
