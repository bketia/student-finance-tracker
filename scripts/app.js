import { patterns, duplicateWords } from "./validators.js";

const form = document.getElementById("transaction-form");

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

    alert("Transaction is valid ✅");
});