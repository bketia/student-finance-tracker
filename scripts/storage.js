const STORAGE_KEY = "finance-tracker-data";

export function saveTransactions(data) {
    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(data)
    );
}

export function loadTransactions() {
    const data = localStorage.getItem(STORAGE_KEY);

    return data ? JSON.parse(data) : [];
}