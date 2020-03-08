
// -----------------------------------------------------------------------------
// Coding Challenge 1
// -----------------------------------------------------------------------------

// var markMass = Number(prompt("What is Mark's mass?"));
// var markHeight = Number(prompt("What is Mark's height?"));
// var markBMI = markMass / (markHeight ** 2);
// console.log("Mark's BMI: " + markBMI);

// var johnMass = Number(prompt("What is John's mass?"));
// var johnHeight = Number(prompt("What is John's height?"));
// var johnBMI = johnMass / (johnHeight ** 2);
// console.log("John's BMI: " + johnBMI);

// var isMarkBMIGreaterThanJohn = markBMI > johnBMI;
// console.log("Is Mark's BMI greater than John's? " + isMarkBMIGreaterThanJohn);

// -----------------------------------------------------------------------------
// Coding Challenge 2
// -----------------------------------------------------------------------------

var john = ( 89 + 138 + 103 ) / 3;
console.log("John's ave is " + john);

var mike = ( 116 + 95 + 123 ) / 3;
console.log("Mike's ave is " + mike);

var johnOrMike;
if (john == mike)
{
    johnOrMike = "DRAW";
}
else
{
    johnOrMike = (john > mike) ? "John" : "Mike";
}

var mary = ( 85 + 134 + 105 ) / 3;
console.log("Mary's ave is " + mary);

if (johnOrMike == "DRAW")
{
    if (mary == john)
    {
        console.log("It's a draw " + mary);
    }
    else
    {
        var winnerAve = (mary > john ? mary : john);
        var winner = (mary > john ? "Mary" : "John/Mike");
        console.log(winner + " is the winner " + winnerAve);
    }
}
else if (johnOrMike == "John")
{
    if (mary == john)
    {
        console.log("Mary/John is the winner " + mary);
    }
    else
    {
        var winnerAve = (mary > john ? mary : john);
        var winner = (mary > john ? "Mary" : "John");
        console.log(winner + " is the winner " + winnerAve);
    }
}
else    // johnOrMike == "Mike"
{
    if (mary == mike)
    {
        console.log("Mary/Mike is the winner " + mary);
    }
    else
    {
        var winnerAve = (mary > mike ? mary : mike);
        var winner = (mary > mike ? "Mary" : "Mike");
        console.log(winner + " is the winner " + winnerAve);
    }
}
