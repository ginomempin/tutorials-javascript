// Module Pattern
//
// Use IIFE's to create scoped and private vars and
// funcs, and then return an object that will serve
// as the public API for the module.
//
// var X = (function() {
//     var privateVar = 1;
//     var privateFunc = function(args) {
//         return 1;
//     }
//     return {
//         publicVar: privateVar,
//         publicFunc: function(args) {
//             return privateFunc(args)
//     }
// })();
// console.log(X.publicVar);
// console.log(X.publicFunc());
//
// The public object still has access to the inner
// or private vars and funcs, even after the IIFE
// function has already returned. This is because
// of closures. Also, because of wrapping it in a
// closure, only the closure's returned objects has
// access to the private vars and funcs.


var BudgetController = (function() {

    var Expense = function(id, desc, value) {
        this.id = id;
        this.desc = desc;
        this.value = value;
        this.ratio = 0;
    };
    Expense.prototype.calcRatio = function(total) {
        this.ratio = Math.round(100 * (this.value / total));
    };
    Expense.prototype.getRatio = function() {
        return this.ratio;
    };

    var Income = function(id, desc, value) {
        this.id = id;
        this.desc = desc;
        this.value = value;
    };

    var budget = {
        items: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0.0,
            inc: 0.0
        },
        net: 0.0,
        ratio: 0.0
    };

    var createItemId = function(type) {
        var items = budget.items[type];

        if (items.length == 0) {
            return 1;
        } else {
            return items[items.length - 1].id + 1;
        }
    };

    var calculateTotal = function(type) {
        var sum = 0;

        budget.items[type].forEach(function(item) {
            sum += item.value;
        });
        budget.totals[type] = sum;
    };

    var calculateExpensePercentages = function(total) {
        budget.items.exp.forEach(function(item) {
            item.calcRatio(total);
        });
    };

    return {
        addNewItem: function(type, desc, value) {
            var newItem, newItemId;

            newItemId = createItemId(type);
            if (type === "exp") {
                newItem = new Expense(newItemId, desc, value);
            } else if (type === "inc") {
                newItem = new Income(newItemId, desc, value);
            }
            budget.items[type].push(newItem);

            return newItem;
        },

        deleteItem: function(type, id) {
            var itemIndex = budget.items[type].findIndex(function(item) {
                return item.id === id;
            });

            if (itemIndex === -1) {
                // Item of type,id was not found.
                return;
            }

            budget.items[type].splice(itemIndex, 1);
        },

        updateBudget: function() {
            // Calculate total expenses
            calculateTotal("exp");

            // Calculate total incomes
            calculateTotal("inc");

            // Calculate incomes - expenses
            budget.net = budget.totals.inc - budget.totals.exp;

            // Calculate percentage of each expense
            if (budget.totals.inc > 0) {
                calculateExpensePercentages(budget.totals.inc);
            } else if (budget.totals.exp > 0) {
                calculateExpensePercentages(budget.totals.exp);
            }

            // Calculate percentage of total expense
            if (budget.totals.exp == 0) {
                budget.ratio = 0;
            } else if (budget.totals.inc == 0) {
                budget.ratio = 100.0;
            } else {
                budget.ratio = Math.round(100 * (budget.totals.exp / budget.totals.inc));
            }
        },

        getSummary: function() {
            return {
                net: budget.net,
                totalExpenses: budget.totals.exp,
                totalIncomes: budget.totals.inc,
                ratio: budget.ratio
            }
        },

        getExpensePercentages: function() {
            return budget.items.exp.map(function(item) {
                return item.getRatio();
            });
        },

        printData: function() {
            console.dir(budget);
        }
    };

})();


var UIController = (function() {

    const DOMStrings = {
        NetBudget: ".budget__value",
        TotalExpenses: ".budget__expenses--value",
        TotalIncomes: ".budget__income--value",
        ExpensePct: ".budget__expenses--percentage",

        AddBtn: ".add__btn",
        AddItemType: ".add__type",
        AddItemDesc: ".add__description",
        AddItemValue: ".add__value",

        ListContainer: ".container",
        ExpensesContainer: ".expenses__list",
        IncomeContainer: ".income__list",

        ExpensePercentage: ".item__percentage",

        DateLabel: ".budget__title--date"
    };

    const MonthNames = {
        0: "January",
        1: "February",
        2: "March",
        3: "April",
        4: "May",
        5: "June",
        6: "July",
        7: "August",
        8: "September",
        9: "October",
        10: "November",
        11: "December"
    };

    var formatNumber = function(type, num) {
        var numFloat = Math.abs(num).toLocaleString();
        if (numFloat.indexOf(".") == -1) {
            numFloat += ".00";
        } else {
            var numParts = numFloat.split(".");
            var numInt = numParts[0];
            var numDec = numParts[1];
            if (numDec.length < 2) {
                numDec += "0";
            } else {
                numDec = numDec.substr(0, 2);
            }
            numFloat = `${numInt}.${numDec}`;
        }

        var numSign = type === "exp" ? "-" : "";
        var fmtValue = `${numSign}${numFloat}`;

        return fmtValue;
    };
    var formatExpense = function(num) {
        return formatNumber("exp", num);
    };
    var formatIncome = function(num) {
        return formatNumber("inc", num);
    };
    var formatPct = function(num) {
        return `${Number(num)}%`;
    };

    var displayDate = function() {
        var now = new Date();

        var year = now.getFullYear();
        var month = MonthNames[now.getMonth()];

        document.querySelector(DOMStrings.DateLabel).textContent = `${month} ${year}`;
    };

    var onChangeAddType = function() {
        document.querySelectorAll("input")
                .forEach(function(field) {
                    field.classList.toggle("red-focus");
                });
        document.querySelector(DOMStrings.AddBtn).classList.toggle("red");
    };

    return {
        init: function() {
            displayDate();
            document.querySelector(DOMStrings.AddItemType)
                    .addEventListener("change", onChangeAddType);
        },

        assignCallbackToAddItem: function(callback) {
            document.querySelector(DOMStrings.AddBtn)
                    .addEventListener("click", callback);
            document.addEventListener("keypress", function(event) {
                if (event.keyCode === 13) {
                    callback();
                }
            });
        },

        assignCallbackToDeleteItem: function(callback) {
            document.querySelector(DOMStrings.ListContainer)
                    .addEventListener("click", callback);
        },

        getInputItem: function() {
            var type = document.querySelector(DOMStrings.AddItemType).value;
            var desc = document.querySelector(DOMStrings.AddItemDesc).value;
            var value = document.querySelector(DOMStrings.AddItemValue).value;

            return {
                type,
                desc,
                value: parseFloat(value)
            };
        },

        addListItem: function(type, item) {
            const htmlForExpense = '<div class="item clearfix" id="exp-%id%"> <div class="item__description">%desc%</div> <div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__percentage">21%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div></div></div>';
            const htmlForIncome = '<div class="item clearfix" id="inc-%id%"> <div class="item__description">%desc%</div> <div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div></div></div>';

            var html;
            var parent;
            var displayValue;

            if (type === "exp") {
                html = htmlForExpense;
                parent = DOMStrings.ExpensesContainer;
                displayValue = formatExpense(item.value);
            } else if (type === "inc") {
                html = htmlForIncome;
                parent = DOMStrings.IncomeContainer;
                displayValue = formatIncome(item.value);
            }

            html = html.replace("%id%", item.id);
            html = html.replace("%desc%", item.desc);
            html = html.replace("%value%", displayValue);

            document.querySelector(parent)
                    .insertAdjacentHTML("beforeend", html);
        },

        deleteListItem: function(selectorId) {
            var item = document.getElementById(selectorId);
            var itemParent = item.parentNode;
            itemParent.removeChild(item);
        },

        clearFields: function() {
            document.querySelectorAll("input")
                    .forEach(function(field, index) {
                        field.value = "";
                        if (index == 0) {
                            field.focus();
                        }
                    });
        },

        displayBudget: function(budget) {
            var fmtNetBudget = formatNumber(budget.net < 0 ? "exp" : "inc", budget.net);
            document.querySelector(DOMStrings.NetBudget).textContent = fmtNetBudget;
            document.querySelector(DOMStrings.TotalIncomes).textContent = formatIncome(budget.totalIncomes);
            document.querySelector(DOMStrings.TotalExpenses).textContent = formatExpense(budget.totalExpenses);
            document.querySelector(DOMStrings.ExpensePct).textContent = formatPct(budget.ratio);
        },

        displayExpensePercentages: function(pcts) {
            var pctDivs = document.querySelectorAll(DOMStrings.ExpensePercentage);
            pctDivs.forEach(function(el, index) {
                el.textContent = `${pcts[index]}%`;
            });
        },
    };

})();


var AppControlller = (function(budgetCtlr, uiCtlr) {
    var init = function() {
        uiCtlr.init();
        uiCtlr.assignCallbackToAddItem(onAddItem);
        uiCtlr.assignCallbackToDeleteItem(onDeleteItem);
        uiCtlr.displayBudget(budgetCtlr.getSummary());
    };

    var updateSummary = function() {
        // Calculate the total budget
        budgetCtlr.updateBudget();

        // Get the calculation results
        var budget = budgetCtlr.getSummary();
        var expensePercentages = budgetCtlr.getExpensePercentages();

        // Update the UI
        uiCtlr.displayBudget(budget);
        uiCtlr.displayExpensePercentages(expensePercentages);
    };

    var onAddItem = function() {
        // Get the new item from the UI
        var uiItem = uiCtlr.getInputItem();
        if (uiItem.desc === "" || isNaN(uiItem.value) || uiItem.value <= 0) {
            return;
        }

        // Add the new item to the model
        var dataItem = budgetCtlr.addNewItem(uiItem.type, uiItem.desc, uiItem.value);

        // Add the new item to the UI
        uiCtlr.addListItem(uiItem.type, dataItem);
        uiCtlr.clearFields();

        // Update the summary at the top
        updateSummary();
    };

    var onDeleteItem = function(event) {
        // Get the parent div for the entire item
        //
        // ITEM:
        // <div class="item clearfix" id="exp-0">
        //     <div class="item__description">Apartment rent</div>
        //     <div class="right clearfix">
        //         <div class="item__value">- 900.00</div>
        //         <div class="item__percentage">21%</div>
        //         <div class="item__delete">
        //             <button class="item__delete--btn">
        //                 <i class="ion-ios-close-outline"></i>
        //             </button>
        //         </div>
        //     </div>
        // </div>
        //
        // The event will be fired by the <i> element.
        // We need to go up 4 times.
        var itemDiv = event.target.parentNode.parentNode.parentNode.parentNode;

        // Get the item ID
        // Ignore if the event was triggered for anywhere else on the page
        var itemDivId = itemDiv.id;
        if (itemDivId == undefined || itemDivId == "") {
            return;
        }
        var itemDivIdParts = itemDivId.split("-");
        var itemType = itemDivIdParts[0];
        var itemId = parseInt(itemDivIdParts[1]);

        // Delete the item from the model
        budgetCtlr.deleteItem(itemType, itemId);

        // Delete the item from the UI
        uiCtlr.deleteListItem(itemDivId);

        // Update the summary at the top
        updateSummary();
    };

    return {
        init
    }

})(BudgetController, UIController);


AppControlller.init();
