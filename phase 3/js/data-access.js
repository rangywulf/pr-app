// Reads and saves the app's data (the only file that touches the data arrays)

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

// Returns every transaction for this rep
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

// Returns all redemption requests
function getRedemptionRequests() {
    return redemptionRequests;
}

// Returns every redemption request with this status ("pending", "approved", "rejected")
function getRedemptionsByStatus(status) {
    return getRedemptionRequests().filter(request => request.status === status);
}

// Returns one reward by ID, or null if not found
function getRewardById(id) {
    const reward = rewards.find(reward => reward.id === id);
    if (reward === undefined) {
        return null;
    }
    return reward;
}

// Returns all rewards
function getRewards() {
    return rewards;
}

// Changes one post's status and saves today as its reviewed date
function updatePostStatus(postId, newStatus) {
    const post = posts.find(post => post.id === postId);
    if (post === undefined) {
        return;
    }
    post.status = newStatus;
    post.reviewedDate = new Date().toLocaleDateString("en-CA");
}

// Changes one redemption's status and saves today as its reviewed date (except reversals, which keep the original date)
function updateRedemptionStatus(redemptionId, newStatus) {
    const redemption = redemptionRequests.find(redemption => redemption.id === redemptionId);
    if (redemption === undefined) {
        return;
    }
    redemption.status = newStatus;
    if (newStatus !== "reversed") {
        redemption.reviewedDate = new Date().toLocaleDateString("en-CA");
    } 
}

// Adds a new point transaction (earned or redeemed)
function addTransaction(repId, postId, amount, reason) {
    const newId = transactions.length + 1;
    const today = new Date().toLocaleDateString("en-CA");
    transactions.push({ id: newId, repId: repId, postId: postId, amount: amount, reason: reason, date: today });
}

// Adds a new redemption and returns its id (get's today's reviewed date unless it's pending)
function addRedemption(repId, rewardId, points, source, note, status, date) {
    const newId = redemptionRequests.length + 1;
    let reviewedDate = null;
    if (status !== "pending") {
        reviewedDate = new Date().toLocaleDateString("en-CA");
    }
    redemptionRequests.push({id: newId, repId: repId, rewardId: rewardId, points: points, source: source, note: note, status: status, date: date, reviewedDate: reviewedDate});
    return newId;
}

// Adds a new post and returns its id (gets today's reviewed date unless it's pending)
function addPost(repId, platform, url, status, date, source, points) {
    const newId = posts.length + 1;
    let reviewedDate = null;
    if (status !== "pending") {
        reviewedDate = new Date().toLocaleDateString("en-CA");
    }
    posts.push({ id: newId, repId: repId, platform: platform, url: url, status: status, date: date, source: source, points: points, reviewedDate: reviewedDate });
    return newId;
}

// Adds a new rep and returns its id
function addRep(name, email, status, discountCode, prCode) {
    const newId = reps.length + 1;
    reps.push({ id: newId, name: name, email: email, status: status, discountCode: discountCode, prCode: prCode });
    return newId;
}

// Adds a new invited rep with codes made from their first name, and returns the new id
function addInvitedRep(name, email) {
    const firstName = name.split(" ")[0].toUpperCase();
    const prCode = `${firstName}10`;
    const discountCode = `${firstName}30`;
    return addRep(name, email, "invited", discountCode, prCode);
}