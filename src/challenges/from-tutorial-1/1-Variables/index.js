
// -----------------------------------------------------------------------------
// Coding Challenge 1
// -----------------------------------------------------------------------------

/*
Mark and John are trying to compare their BMI (Body Mass Index),
which is calculated using the formula:
    BMI = mass / height^2
        = mass / (height * height)
    (mass in kg and height in meter).

1.  Store Mark's and John's mass and height in variables
2.  Calculate both their BMIs
3.  Create a boolean variable containing information about whether
    Mark has a higher BMI than John.
4.  Print a string to the console containing the variable from step 3.
    (Something like "Is Mark's BMI higher than John's? true").

GOOD LUCK 😀
*/

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
