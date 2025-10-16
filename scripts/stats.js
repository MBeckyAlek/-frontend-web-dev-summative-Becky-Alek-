import { load, save } from './storage.js';

// The main data array for the application.
// It's initialized by loading data from localStorage.
let transactions = load();

// Adds a new transaction to the data array and saves it.
export const addTransaction = (newTransaction) => {
    // Generate a unique ID and timestamps before adding
    newTransaction.id = `txn_${Date.now()}`;
    newTransaction.createdAt = new Date().toISOString();
    newTransaction.updatedAt = new Date().toISOString();

    transactions.push(newTransaction);
    save(transactions);
};

// Deletes a transaction by its unique ID.
export const deleteTransaction = (id) => {
    transactions = transactions.filter(t => t.id !== id);
    save(transactions);
};

// Updates an existing transaction.
export const updateTransaction = (updatedTransaction) => {
    transactions = transactions.map(t =>
        t.id === updatedTransaction.id ? { ...t, ...updatedTransaction, updatedAt: new Date().toISOString() } : t
    );
    save(transactions);
};

// Returns a copy of the current transactions data.
// This is important to prevent other modules from directly modifying the data.
export const getTransactions = () => [...transactions];

// Updates the entire transactions array (e.g., from an import).
export const setTransactions = (newTransactions) => {
    transactions = newTransactions;
    save(transactions);
};