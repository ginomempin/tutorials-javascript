
// -----------------------------------------------------------------------------
// Coding Challenge 7
// -----------------------------------------------------------------------------

/*
--- Let's build a fun quiz game in the console! ---

1.  Build a function constructor called Question to describe a question.
    A question should include:
        a) The question itself
        b) The answers from which the player can choose the correct one
            (choose an adequate data structure here, array, object, etc.)
        c) The correct answer (I would use a number for this)

2.  Create a couple of questions using the constructor

3.  Store them all inside an array

4.  Select one random question and log it on the console, together with the possible
    answers (each question should have a number) (Hint: write a method for the
    Question objects for this task).

5.  Use the 'prompt' function to ask the user for the correct answer. The user should
    input the number of the correct answer such as you displayed it on Task 4.

6.  Check if the answer is correct and print to the console whether the answer is
    correct or not (Hint: write another method for this).

7.  Suppose this code would be a plugin for other programmers to use in their code.
    So make sure that all your code is private and doesn't interfere with the other
    programmers code (Hint: we learned a special technique to do exactly that).

8.  After you display the result, display the next random question, so that the game never
    ends (Hint: write a function for this and call it right after displaying the result)

9.  Be careful: after Task 8, the game literally never ends. So include the option to
    quit the game if the user writes 'exit' instead of the answer. In this case,
    DON'T call the function from task 8.

10. Track the user's score to make the game more fun! So each time an answer is correct,
    add 1 point to the score (Hint: I'm going to use the power of closures for this,
    but you don't have to, just do this with the tools you feel more comfortable at this
    point).

11. Display the score in the console. Use yet another method for this.
*/

// Constructor Function
// This will be called to create new instances of a Question.
var Question = function(question, choices, answer) {
    this.question = question;
    this.choices = choices;
    this.answer = answer;
};
// Prototype for Question
// This will be inherited by all Question objects
Question.prototype.printQuestion = function() {
    console.log(this.question);
    for (var idx = 0; idx < this.choices.length; idx++) {
        console.log(`${idx}: ${this.choices[idx]}`);
    }
};
Question.prototype.compareWithAnswer = function(ans) {
    var isCorrect = (this.answer === parseInt(ans));
    console.log(isCorrect ? "You are correct!" : "You are wrong!");
    return isCorrect;
}

var q1 = new Question(
    "What is 1+1?",
    ["2", "5", "3", "0"],
    0
);
var q2 = new Question(
    "What is the capital of Poland?",
    ["Lisbon", "Warsaw", "Helsinki", "Taipei", "Amsterdam"],
    1
)
var q3 = new Question(
    "What is the currency in Japan?",
    ["Dollar", "Peso", "Yen"],
    2
)

var questions = [q1, q2, q3];
var currQ = null;
var currA = null;

// There is no need to use closures here, but this
// exercise's lecture introduced that, let's use it.
var updateScoreFunc = function () {
    // Instead of a global variable, the score
    // is wrapped inside the updateScoreFunc,
    // and is now maintained by the wherever
    // the returned function is assigned to.
    var score = 0;
    return function(isCorrect) {
        score += (isCorrect ? 1 : 0);
        console.log(`Your current score is: ${score}`);
    }
}
var updateScore = updateScoreFunc();

function promptQuestion() {
    var qN = Math.floor(Math.random() * questions.length);
    this.currQ = this.questions[qN];
    this.currQ.printQuestion();
    this.currA = prompt("What is the answer?")
    console.log(`You answered: ${this.currA}`);
}

function isCorrectAnswer() {
    return this.currQ.compareWithAnswer(this.currA);
}

function repeatUntilExit() {
    this.promptQuestion();
    this.updateScore(this.isCorrectAnswer());

    console.log("----------------")
}

while (this.currA !== "exit") {
    repeatUntilExit();
}
