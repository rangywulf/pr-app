/* Overview page with data */
function fillMetricCards() {
    /* Active reps card */
    const reps = getReps();
    const activeReps = reps.filter(rep => rep.status === "active");
    const activeCard = document.getElementById("metric-active-reps");
    activeCard.textContent = activeReps.length;

    /* Posts to review card */
    const posts = getPosts();
    const pendingPosts = posts.filter(post => post.status === "pending");
    const reviewCard = document.getElementById("metric-review");
    reviewCard.textContent = pendingPosts.length;

    /* Posts card */
    const approvedPosts = posts.filter(post => post.status === "approved");
    const postsCard = document.getElementById("metric-posts");
    postsCard.textContent = approvedPosts.length;
}
    
/* Needs review list */
function fillReviewList() {
    const pendingPosts = getPosts().filter(post => post.status === "pending");
    const list = document.getElementById("review-list");
    for (const post of pendingPosts) {
        const rep = getRepById(post.repId);
        const item = document.createElement("li");
        item.textContent = `Post from ${rep.name}`;
        list.appendChild(item);
    }
}

/* Display top 5 reps */
function fillTopReps() {
    const tbody = document.getElementById("top-reps-body");
    const sortedReps = getReps().slice().sort((a,b) => calculateEarned(b.id) - calculateEarned(a.id));
    const topReps = sortedReps.slice(0,5);

    // Make one table row for each of the top 5 reps
    for (const rep of topReps) {
        const approvedCount = getPosts().filter(post => post.repId === rep.id && post.status === "approved").length;
        const row = document.createElement("tr");
        row.innerHTML = `<td>${rep.name}</td><td>${approvedCount}</td><td>${calculateEarned(rep.id)}</td><td>$0</td>`;
        tbody.appendChild(row);
    }
}

fillMetricCards();
fillReviewList();
fillTopReps();