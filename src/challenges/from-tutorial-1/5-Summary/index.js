
// -----------------------------------------------------------------------------
// Coding Challenge 5
// -----------------------------------------------------------------------------

/*
Remember the tip calculator challenge?
Let's create a more advanced version using everything we learned!

This time, John and his family went to 5 different restaurants. The bills were
$124, $48, $268, $180 and $42. John likes to tip 20% of the bill when the bill
is less than $50, 15% when the bill is between $50 and $200, and 10% if the bill
is more than $200.

Implement a tip calculator using objects and loops:
    1. Create an object with an array for the bill values
    2. Add a method to calculate the tip
    3. This method should include a loop to iterate over all the paid bills and
        do the tip calculations
    4. As an output, create 1) a new array containing all tips, and 2) an array
        containing final paid amounts (bill + tip). HINT: Start with two empty
        arrays [] as properties and then fill them up in the loop.

EXTRA AFTER FINISHING:
Mark's family also went on a holiday, going to 4 different restaurants. The bills
were $77, $375, $110, and $45. Mark likes to tip 20% of the bill when the bill is
less than $100, 10% when the bill is between $100 and $300, and 25% if the bill is
more than $300 (different than John).

    5. Implement the same functionality as before, this time using Mark's tipping rules
    6. Create a function (not a method) to calculate the average of a given array of tips.
        HINT: Loop over the array, and in each iteration store the current sum in a
        variable (starting from 0). After you have the sum of the array, divide it by
        the number of elements in it (that's how you calculate the average)
    7. Calculate the average tip for each family
    8. Log to the console which family paid the highest tips on average

GOOD LUCK 😀
*/

var john = {
    fullName: "John",
    bills: [124, 48, 268, 180, 42],
    tips: [],
    totals: [],
    calcOneTip: function(amount) {
        if (amount < 50) {
            return (20 / 100) * amount;
        } else if (amount >= 50 && amount <= 200) {
            return (15 / 100) * amount;
        } else {
            return (10 / 100) * amount;
        }
    },
    calcAllTips: function() {
        for (var i = 0; i < this.bills.length; i++) {
            this.tips.push(this.calcOneTip(this.bills[i]));
        }
    },
    calcTotals: function() {
        for (var i = 0; i < this.bills.length; i++) {
            this.totals.push(this.bills[i] + this.tips[i]);
        }
    }
}
john.calcAllTips();
john.calcTotals();
console.dir(john);

var mark = {
    fullName: "Mark",
    bills: [77, 375, 110, 45],
    tips: [],
    totals: [],
    calcOneTip: function(amount) {
        if (amount < 100) {
            return (20 / 100) * amount;
        } else if (amount >= 100 && amount <= 300) {
            return (10 / 100) * amount;
        } else {
            return (25 / 100) * amount;
        }
    },
    calcAllTips: function() {
        for (var i = 0; i < this.bills.length; i++) {
            this.tips.push(this.calcOneTip(this.bills[i]));
        }
    },
    calcTotals: function() {
        for (var i = 0; i < this.bills.length; i++) {
            this.totals.push(this.bills[i] + this.tips[i]);
        }
    }
}
mark.calcAllTips();
mark.calcTotals();
console.dir(mark);

function calcAverage(tips) {
    var sum = 0;
    for (var i = 0; i < tips.length; i++) {
        sum += tips[i];
    }
    return sum / tips.length;
}

john.average = calcAverage(john.tips);
console.log(`${john.fullName}'s average tips = ${john.average}`);

mark.average = calcAverage(mark.tips);
console.log(`${mark.fullName}'s average tips = ${mark.average}`);

if (john.average > mark.average) {
    console.log(`${john.fullName} paid the highest tips on average`)
} else if (mark.average > john.average) {
    console.log(`${mark.fullName} paid the highest tips on average`)
} else {
    console.log(`${john.fullName} and ${mark.fullName} paid the same tips on average`)
}
