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

// Turns "2026-11-14" into "Nov 14, 2026"
function formatDate(dateString) {
    const date = new Date(dateString + "T00:00:00");
    return date.toLocaleDateString(undefined, {month: "short", day: "numeric", year: "numeric"});
}

// Turns a post's source code into the label shown on the card
function getSourceLabel(source) {
    if (source === "auto") {
        return "Auto-detected";
    } 
    else if (source === "link") {
        return "Link submitted";
    }
    else if (source === "owner") {
        return "Added by shop owner";
    }
    return "";
}

// Approves a pending post and gives the rep 10 points
function approvePost(postId) {
    const post = getPosts().find(post => post.id === postId);
    if (post === undefined || post.status !== "pending") {
        return;
    }
    updatePostStatus(postId, "approved");
    addTransaction(post.repId, postId, 10, "Post logged");
}

// Rejects a post (no points)
function rejectPost(postId) {
    updatePostStatus(postId, "rejected");
}