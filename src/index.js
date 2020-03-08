
// -----------------------------------------------------------------------------
// Coding Challenge 1
// -----------------------------------------------------------------------------

var markMass = Number(prompt("What is Mark's mass?"));
var markHeight = Number(prompt("What is Mark's height?"));
var markBMI = markMass / (markHeight ** 2);
console.log("Mark's BMI: " + markBMI);

var johnMass = Number(prompt("What is John's mass?"));
var johnHeight = Number(prompt("What is John's height?"));
var johnBMI = johnMass / (johnHeight ** 2);
console.log("John's BMI: " + johnBMI);

var isMarkBMIGreaterThanJohn = markBMI > johnBMI;
console.log("Is Mark's BMI greater than John's? " + isMarkBMIGreaterThanJohn);
