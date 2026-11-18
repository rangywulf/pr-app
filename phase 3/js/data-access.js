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

// Returns the rep's handle on one platform, or an empty string if none
function getHandle(repId, platform) {
    const account = socialAccounts.find(account => account.repId === repId && account.platform === platform);
    if (account === undefined) {
        return "";
    }
    return account.handle;
}

// Returns every post with this status ("pending", "approved", or "rejected")
function getPostsByStatus(status) {
    return posts.filter(post => post.status === status);
}

// Changes one post's status ("approved" or "rejected")
function updatePostStatus(postId, newStatus) {
    const post = posts.find(post => post.id === postId);
    if (post === undefined) {
        return;
    }
    post.status = newStatus;
}

// Adds a new point transaction (earned or redeemed)
function addTransaction(repId, postId, amount, reason) {
    const newId = transactions.length + 1;
    const today = new Date().toLocaleDateString("en-CA");
    transactions.push({id: newId, repId: repId, postId: postId, amount: amount, reason: reason, date: today});
}

// Adds a new post and returns its id
function addPost(repId, platform, url, status, date, source, points) {
    const newId = posts.length + 1;
    posts.push({id: newId, repId: repId, platform: platform, url: url, status: status, date: date, source: source, points: points});
    return newId;
}

// Adds a new rep and returns its id
function addRep(name, email, status, discountCode, prCode) {
    const newId = reps.length + 1;
    reps.push({id: newId, name: name, email: email, status: status, discountCode: discountCode, prCode: prCode});
    return newId;
}

// Adds a new invited rep with auto-made codes, returns the new id
function addInvitedRep(name, email) {
    const firstName = name.split(" ")[0].toUpperCase();
    const prCode = `${firstName}10`;
    const discountCode = `${firstName}30`;
    return addRep(name, email, "invited", discountCode, prCode);
}