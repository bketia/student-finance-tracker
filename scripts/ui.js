import { transactions } from "./state.js";
import { saveTransactions } from "./storage.js";

export function renderTransactions() {
    const tbody = document.getElementById("transactions-body");

    tbody.innerHTML = "";

    transactions.forEach((transaction, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${transaction.description}</td>
            <td>${transaction.amount}</td>
            <td>${transaction.category}</td>
            <td>${transaction.date}</td>
            <td>
                <button class="delete-btn" data-index="${index}">
                    Delete
                </button>
            </td>
        `;

        tbody.appendChild(row);
    });

    const deleteButtons = document.querySelectorAll(".delete-btn");

    deleteButtons.forEach(button => {
        button.addEventListener("click", () => {

            const confirmed = confirm(
                "Are you sure you want to delete this transaction?"
            );

            if (!confirmed) return;

            const index = button.dataset.index;

            transactions.splice(index, 1);

            saveTransactions(transactions);

            renderTransactions();
            renderDashboard();
        });
    });
}

export function renderDashboard() {

    // Total Transactions
    document.getElementById("total-transactions").textContent =
        transactions.length;

    // Total Spending
    const totalSpending = transactions.reduce(
        (sum, transaction) => sum + Number(transaction.amount),
        0
    );

    document.getElementById("total-spending").textContent =
        `$${totalSpending.toFixed(2)}`;

    // Top Category
    const categories = {};

    transactions.forEach(transaction => {
        categories[transaction.category] =
            (categories[transaction.category] || 0) + 1;
    });

    let topCategory = "None";
    let highestCount = 0;

    for (const category in categories) {
        if (categories[category] > highestCount) {
            highestCount = categories[category];
            topCategory = category;
        }
    }

    document.getElementById("top-category").textContent =
        topCategory;

    // Budget Cap
    const budgetCap =
        Number(document.getElementById("budget-cap").value) || 0;

    const budgetRemaining =
        budgetCap - totalSpending;

    document.getElementById("budget-remaining").textContent =
        `$${budgetRemaining.toFixed(2)}`;

    const budgetStatus =
        document.getElementById("budget-status");

    if (budgetCap > 0) {

        if (budgetRemaining >= 0) {

            budgetStatus.setAttribute(
                "aria-live",
                "polite"
            );

            budgetStatus.textContent =
                `You have $${budgetRemaining.toFixed(2)} remaining.`;

        } else {

            budgetStatus.setAttribute(
                "aria-live",
                "assertive"
            );

            budgetStatus.textContent =
                `Budget exceeded by $${Math.abs(
                    budgetRemaining
                ).toFixed(2)}!`;
        }

    } else {

        budgetStatus.textContent = "";
    }
}