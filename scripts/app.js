import { patterns, duplicateWords } from "./validators.js";
import { transactions } from "./state.js";
import { compileRegex } from "./search.js";
import {
    renderTransactions,
    renderDashboard,
    setSearchRegex
} from "./ui.js";
import { saveTransactions, loadTransactions } from "./storage.js";
const form = document.getElementById("transaction-form");
const budgetInput =
    document.getElementById("budget-cap");

budgetInput.addEventListener("input", () => {
    renderDashboard();
});

const savedTransactions = loadTransactions();
transactions.push(...savedTransactions);
renderTransactions();
renderDashboard();

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const description = document.getElementById("description").value.trim();
    const amount = document.getElementById("amount").value;
    const category = document.getElementById("category").value;
    const date = document.getElementById("date").value;

    let errors = [];

    if (!patterns.description.test(description)) {
        errors.push("Invalid description");
    }

    if (!patterns.amount.test(amount)) {
        errors.push("Invalid amount");
    }

    if (!patterns.category.test(category)) {
        errors.push("Invalid category");
    }

    if (!patterns.date.test(date)) {
        errors.push("Invalid date");
    }

    if (duplicateWords.test(description)) {
        errors.push("Duplicate words detected in description");
    }

    if (errors.length > 0) {
        alert(errors.join("\n"));
        return;
    }

    const transaction = {
    id: Date.now(),
    description,
    amount: parseFloat(amount),
    category,
    date,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
};

transactions.push(transaction);
saveTransactions(transactions);
renderTransactions();
renderDashboard();
form.reset();
});
const searchInput =
    document.getElementById("search");

const caseToggle =
    document.getElementById("case-insensitive");

function updateSearch() {

    const regex = compileRegex(
        searchInput.value,
        caseToggle.checked
    );

    setSearchRegex(regex);

    renderTransactions();
}

searchInput.addEventListener(
    "input",
    updateSearch
);

caseToggle.addEventListener(
    "change",
    updateSearch
);
const exportButton =
    document.getElementById("export-json");

exportButton.addEventListener("click", () => {

    const data =
        JSON.stringify(transactions, null, 2);

    const blob = new Blob(
        [data],
        { type: "application/json" }
    );

    const url =
        URL.createObjectURL(blob);

    const link =
        document.createElement("a");

    link.href = url;
    link.download = "transactions.json";

    link.click();

    URL.revokeObjectURL(url);
});