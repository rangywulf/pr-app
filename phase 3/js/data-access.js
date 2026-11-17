// Get functions, the only code that reads the raw data arrays

// Returns all reps
function getReps() {
    return reps;
}

// Returns all posts
function getPosts() {
    return posts;
}

// Returns all point transactions
function getTransactions() {
    return transactions;
}

// Returns one rep by id, or null if not found
function getRepById(id) {
    for (let i = 0; i < reps.length; i++) {
        if (reps[i].id === id) {
            return reps[i];
        }
    }
    return null;
}

// Returns every post that belongs to this rep
function getPostsForRep(repId) {
    const repPosts = [];
    for (let i = 0; i < posts.length; i++) {
        if (posts[i].repId === repId) {
            repPosts.push(posts[i]);
        }
    }
    return repPosts;
}

// returns every transaction for this rep
function getHistory(repId) {
    const repHistory = [];
    for (let i = 0; i < transactions.length; i++) {
        if (transactions[i].repId === repId) {
            repHistory.push(transactions[i]);
        }
    }
    return repHistory;
}

// Returns every social account for this rep
function getAccounts(repId) {
    return socialAccounts.filter(account => account.repId === repId);
}