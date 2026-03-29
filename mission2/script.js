/**
 * Global State
 */
let state = {
    salary: 0,
    expenses: []
};

let myChart = null;

/**
 * App Initialization
 */
window.onload = () => {
    const savedSalary = localStorage.getItem("salary");
    const savedExpenses = localStorage.getItem("expenses");

    if (savedSalary) state.salary = parseFloat(savedSalary);
    if (savedExpenses) state.expenses = JSON.parse(savedExpenses);

    state.expenses.forEach(renderExpenseItem);
    updateUI();
};

/**
 * Core Logic Functions
 */
function setSalary() {
    const input = document.getElementById("salaryInput");
    const value = parseFloat(input.value);

    if (isNaN(value) || value < 0) {
        return alert("Please enter a valid salary amount.");
    }

    state.salary = value;
    localStorage.setItem("salary", value);
    input.value = "";
    updateUI();
}

function addExpense() {
    const nameEl = document.getElementById("expenseName");
    const amountEl = document.getElementById("expenseAmount");
    
    const name = nameEl.value.trim();
    const amount = parseFloat(amountEl.value);

    if (!name || isNaN(amount) || amount <= 0) {
        return alert("Please enter a valid name and amount.");
    }

    const newExpense = {
        id: Date.now().toString(),
        name,
        amount
    };

    state.expenses.push(newExpense);
    localStorage.setItem("expenses", JSON.stringify(state.expenses));

    renderExpenseItem(newExpense);
    updateUI();

    // Reset fields
    nameEl.value = "";
    amountEl.value = "";
}

function deleteExpense(id) {
    state.expenses = state.expenses.filter(item => item.id !== id);
    localStorage.setItem("expenses", JSON.stringify(state.expenses));
    
    // Remove element from DOM
    const el = document.getElementById(id);
    if (el) el.remove();

    updateUI();
}

function resetData() {
    if (confirm("Are you sure? This will wipe your history and salary.")) {
        localStorage.clear();
        state.salary = 0;
        state.expenses = [];
        document.getElementById("expenseList").innerHTML = "";
        updateUI();
    }
}

/**
 * UI Rendering Functions
 */
function renderExpenseItem(expense) {
    const list = document.getElementById("expenseList");
    const li = document.createElement("li");
    li.id = expense.id;
    li.innerHTML = `
        <span>${expense.name}</span>
        <div>
            <strong style="margin-right: 15px;">₹${expense.amount.toFixed(2)}</strong>
            <button onclick="deleteExpense('${expense.id}')" style="background:none; border:none; cursor:pointer;">🗑️</button>
        </div>
    `;
    list.prepend(li); // Show newest at the top
}

function updateUI() {
    const totalExpenses = state.expenses.reduce((acc, curr) => acc + curr.amount, 0);
    const balance = state.salary - totalExpenses;

    // Update Text
    document.getElementById("totalSalary").innerText = `₹${state.salary.toFixed(2)}`;
    document.getElementById("totalExpenses").innerText = `₹${totalExpenses.toFixed(2)}`;
    
    const balanceEl = document.getElementById("balance");
    balanceEl.innerText = `₹${balance.toFixed(2)}`;
    
    // Toggle color based on balance
    balanceEl.className = balance < 0 ? "text-danger" : "text-success";

    drawChart(balance, totalExpenses);
}

function drawChart(balance, expenses) {
    const ctx = document.getElementById("myChart").getContext("2d");
    
    if (myChart) myChart.destroy();

    // Pie charts don't like negative numbers for slices
    const chartBalance = balance < 0 ? 0 : balance;

    myChart = new Chart(ctx, {
        type: 'doughnut', // Doughnut looks slightly more modern than Pie
        data: {
            labels: ['Balance', 'Spent'],
            datasets: [{
                data: [chartBalance, expenses],
                backgroundColor: ['#2ec4b6', '#e71d36'],
                hoverOffset: 4,
                borderWidth: 0
            }]
        },
        options: {
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'bottom' }
            }
        }
    });
}