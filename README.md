# Student Finance Tracker

## Project Overview
A responsive vanilla JavaScript web application that helps students track income and expenses, manage budgets, and analyze spending habits using regex validation, sorting, filtering, and persistent storage.

---

## Features

- Add, edit, and delete transactions
- Budget tracking with real-time updates
- Dashboard with:
  - Total transactions
  - Total spending
  - Top category
  - Budget remaining
- Regex-powered search with live filtering
- Highlight search matches
- Sorting (date, description, amount)
- JSON export and import
- Persistent storage using localStorage
- Responsive mobile-first design
- Accessible interface with ARIA live regions

---

## Regex Used

### Validation Rules
- Description: `/^\S(?:.*\S)?$/`
- Amount: `/^(0|[1-9]\d*)(\.\d{1,2})?$/`
- Date: `/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/`
- Category: `/^[A-Za-z]+(?:[ -][A-Za-z]+)*$/`

### Advanced Regex
- Duplicate words:
  `/\b(\w+)\s+\1\b/i`

- Search example:
  `(coffee|tea)`

---

## Keyboard and UX Features

- Form validation with instant feedback
- Live search updates while typing
- Delete confirmation prompt
- Focusable form inputs
- Accessible ARIA live updates for budget status

---

## How to Run

1. Download or clone the repository
2. Open `index.html` in a browser
3. Start adding transactions

---

## Data Handling

- Data stored in localStorage
- Export downloads a JSON file of transactions
- Import restores transactions with validation

---

## Seed Data

Includes `seed.json` with 10 sample transactions for testing and demonstration.

---

## Author

Created as a student project demonstrating:
- DOM manipulation
- Regex validation
- Modular JavaScript structure
- Data persistence
- UI and UX design principles

---

## Live Demo

https://github.com/bketia/student-finance-tracker