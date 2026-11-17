// Calculations for the dashboard

// Adds up all of a rep's point transactions (earned and redeemed) to get their current balance
function calculateBalance(repId) {
    const history = getHistory(repId);
    let total = 0;
    for (let i = 0; i < history.length; i++) {
        total += history[i].amount;
    }

    return total;
}

// Add up rep's total earned points (ignoring redemptions)
function calculateEarned(repId) {
    let total = 0;
    const transactions = getHistory(repId);
    for (const t of transactions) {
        if (t.amount > 0) {
            total = total + t.amount;
        }
    }

    return total;
}