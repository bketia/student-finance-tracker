import { patterns, duplicateWords } from "./validators.js";
import { transactions } from "./state.js";
import { compileRegex } from "./search.js";

import {
    renderTransactions,
    renderDashboard,
    setSearchRegex
} from "./ui.js";
import { saveTransactions, loadTransactions } from "./storage.js";
let editIndex = null;
export function setEditIndex(index) {
    editIndex = index;
}
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

if (editIndex !== null && transactions[editIndex]) {

    transactions[editIndex] = {
        ...transaction,
        id: transactions[editIndex].id
    };

    editIndex = null;

} else {
    transactions.push(transaction);
}
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
const importInput =
    document.getElementById("import-json");

importInput.addEventListener("change", (event) => {

    const file = event.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {

        try {

            const importedData =
                JSON.parse(e.target.result);

            if (!Array.isArray(importedData)) {
                throw new Error(
                    "File must contain an array."
                );
            }

            transactions.length = 0;

            importedData.forEach(item => {

                if (
                    item.id &&
                    item.description &&
                    item.amount !== undefined &&
                    item.category &&
                    item.date
                ) {
                    transactions.push(item);
                }
            });

            saveTransactions(transactions);

            renderTransactions();
            renderDashboard();

            alert(
                "Transactions imported successfully! ✅"
            );

        } catch (error) {

            alert(
                "Invalid JSON file ❌"
            );

            console.error(error);
        }
    };

    reader.readAsText(file);
});