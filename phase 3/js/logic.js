// Rules and math for the dashboard (no display code)

// Adds up all of a rep's point transactions (earned and redeemed) to get their current balance
function calculateBalance(repId) {
    const history = getHistory(repId);
    let total = 0;
    for (let i = 0; i < history.length; i++) {
        total += history[i].amount;
    }

    return total;
}

// Adds up a rep's total earned points (ignores redemptions)
function calculateEarned(repId) {
    let total = 0;
    const history = getHistory(repId);
    for (const t of history) {
        if (t.amount > 0) {
            total = total + t.amount;
        }
    }

    return total;
}

// Turns "2026-11-14" into "Nov 14, 2026"
function formatDate(dateString) {
    const date = new Date(dateString + "T00:00:00");
    return date.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

// Turns "2026-11-12" into "6 days ago" (or "today", "1 day ago")
function formatDaysAgo(dateString) {
    const postDate = new Date(dateString + "T00:00:00");
    const daysAgo = Math.floor((new Date() - postDate) / 86400000);
    if (daysAgo === 0) {
        return "today";
    }
    if (daysAgo === 1) {
        return "1 day ago";
    }
    return `${daysAgo} days ago`;
}

// Turns a post's source word into the label shown on the card
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

// Approves a pending post and gives the rep its points
function approvePost(postId) {
    const post = getPosts().find(post => post.id === postId);
    if (post === undefined || post.status !== "pending") {
        return;
    }
    updatePostStatus(postId, "approved");
    addTransaction(post.repId, postId, post.points, "Post logged");
}

// Rejects a pending post (no points)
function rejectPost(postId) {
    const post = getPosts().find(post => post.id === postId);
    if (post === undefined || post.status !== "pending") {
        return;
    }
    updatePostStatus(postId, "rejected");
}

// Adds a post from the shop owner: approved right away, with points
function addOwnerPost(repId, platform, url, date, points) {
    const newId = addPost(repId, platform, url, "approved", date, "owner", points);
    addTransaction(repId, newId, points, "Post logged by owner");
}

// Counts posts per day for the last 30 days, oldest first
function countPostsByDay(postList) {
    const counts = new Array(30).fill(0);
    const today = new Date();
    for (const post of postList) {
        const postDate = new Date(post.date + "T00:00:00");
        const daysAgo = Math.floor((today - postDate) / 86400000);
        if (daysAgo >= 0 && daysAgo < 30) {
            counts[29 - daysAgo]++;
        }
    }
    return counts;
}

// Date labels for each of the last 30 days, oldest first
function getDayLabels() {
    const labels = [];
    for (let i = 29; i >= 0; i--) {
        const day = new Date();
        day.setDate(day.getDate() - i);
        labels.push(day.toLocaleDateString(undefined, { month: "short", day: "numeric" }));
    }
    return labels;
}