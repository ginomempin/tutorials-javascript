
// -----------------------------------------------------------------------------
// Coding Challenge 8
// -----------------------------------------------------------------------------

/*

Suppose that you're working in a small town administration, and you're in charge
of two town elements:
    1. Parks
    2. Streets

It's a very small town, so right now there are only 3 parks and 4 streets. All
parks and streets have a name and a build year.

At an end-of-year meeting, your boss wants a final report with the following:
    1. Tree density of each park in the town
        * Formula: number of trees / park area
    2. Average age of each town's park
        * Formula: sum of all ages / number of parks
    3. The name of the park that has more than 1000 trees
    4. Total and average length of the town's streets
    5. Size classification of all streets: tiny/small/normal/big/huge
        * If the size is unknown, the default is normal

All the report data should be printed to the console.

HINT:
Use some of the ES6 features: classes, subclasses, template strings, default
parameters, maps, arrow functions, destructuring, etc.

*/

class TownElement {
    constructor (name, buildYear) {
        this.name = name;
        this.buildYear = buildYear;
    }

    calcAge () {
        let now = new Date().getFullYear();
        return now - this.buildYear;
    }
}

class Park extends TownElement {
    constructor (name, buildYear, numTrees, area) {
        super(name, buildYear);
        this.numTrees = numTrees;
        this.area = area;
    }

    calcTreeDensity() {
        return this.numTrees / this.area;
    }
}

class Street extends TownElement {
    constructor (name, buildYear, lengthInKM) {
        super(name, buildYear);
        this.lengthInKM = lengthInKM;
    }

    classify() {
        let classification = new Map();
        classification.set([ 0, 10], "tiny");
        classification.set([11, 20], "small");
        classification.set([21, 30], "normal");
        classification.set([31, 40], "big");
        classification.set([41, 100], "huge");

        for (let [range, label] of classification.entries()) {
            let [min, max] = range;
            if (this.lengthInKM > min && this.lengthInKM < max) {
                return label;
            }
        }
        return "normal";
    }
}

const allParks = [
    new Park("Yoyogi", 1975, 2500, 100),
    new Park("Ueno", 1950, 3250, 1000),
    new Park("Naruse", 2010, 200, 43)
];

const allStreets = [
    new Street("Himlayan Rd.", 1974, 21),
    new Street("Visayas Ave.", 1962, 51),
    new Street("Almond St.", 1985, 3),
    new Street("Villa Corina Ave.", 1976, 14)
];

function reportParkTreeDensity() {
    for (let park of allParks) {
        console.log(`${park.name} has a tree density of ${park.calcTreeDensity()} trees/sq.km.`);
    }
}

function reportParkAverageAge() {
    let sumOfAllAges = 0;
    for (let park of allParks) {
        sumOfAllAges += park.calcAge();
    }

    console.log(`The average age of ${allParks.length} parks is ${sumOfAllAges / allParks.length} years.`);
}

function printDivider() {
    console.log("-".repeat(10));
}

function reportParkMostTrees() {
    let mostTrees = 0;
    let parkWithMostTrees = undefined;
    for (let park of allParks) {
        if (park.numTrees > mostTrees) {
            parkWithMostTrees = park;
            mostTrees = park.numTrees;
        }
    }
    console.log(`The park with the most trees is ${parkWithMostTrees.name} with ${mostTrees} trees.`);
}

function reportStreetLengths() {
    let totalLengthInKM = 0;
    for (let street of allStreets) {
        totalLengthInKM += street.lengthInKM;
    }
    console.log(`The total length of all streets is ${totalLengthInKM}`);
    console.log(`The average length of all streets is ${totalLengthInKM / allStreets.length}`);
}

function reportStreetClassifications() {
    for (let street of allStreets) {
        console.log(`${street.name} is ${street.classify()}`);
    }
}

function endOfYearReport() {
    printDivider();
    reportParkTreeDensity();

    printDivider();
    reportParkAverageAge();

    printDivider();
    reportParkMostTrees();

    printDivider();
    reportStreetLengths();

    printDivider();
    reportStreetClassifications();
};

endOfYearReport();
