
// -----------------------------------------------------------------------------
// Coding Challenge 2
// -----------------------------------------------------------------------------

/*
John and Mike both play basketball in different teams. In the latest 3 games,
John's team scored 89, 120 and 103 points, while Mike's team scored 116, 94
and 123 points.

1.  Calculate the average score for each team
2.  Decide which teams wins in average (highest average score), and print the
    winner to the console. Also include the average score in the output.
3.  Then change the scores to show different winners. Don't forget to take into
    account there might be a draw (the same average score)

4.  EXTRA: Mary also plays basketball, and her team scored 97, 134 and 105 points.
    Like before, log the average winner to the console. HINT: you will need the
    && operator to take the decision. If you can't solve this one, just watch the
    solution, it's no problem :)
5.  Like before, change the scores to generate different winners, keeping in mind
    there might be draws.

GOOD LUCK 😀
*/

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
