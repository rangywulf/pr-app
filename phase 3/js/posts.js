// Builds the HTML of one post card
function buildPostCard(post) {
    const rep = getRepById(post.repId);
    const date = formatDate(post.date);
    const source = getSourceLabel(post.source);
    const icon = post.platform.toLowerCase();
    return `
        <article class="post-card" data-id="${post.id}">
            <div class="post-thumb">
                <i class="bi bi-${icon}"></i>
            </div>
            <div class="post-body">
                <p class="post-rep">${rep.name}</p>
                <p class="post-meta">${post.platform} &middot; ${date}</p>
                <p class="post-source">${source}</p>
            </div>
            <div class="post-footer">
                <span class="post-points">+10 pts</span>
                <div class="post-actions">
                    <button type="button" class="button-link approve-button">Approve</button>
                    <button type="button" class="button-link button-secondary reject-button">Reject</button>
                </div>
            </div>
        </article>
    `;
}

// Fills the grid with one card per post
function fillPostCards(postList) {
    const grid = document.getElementById("posts-list");
    grid.innerHTML = "";
    for (const post of postList) {
        grid.innerHTML += buildPostCard(post);
    }
}

// Builds one table row per post
function fillPostsTable(postList) {
    const tableBody = document.getElementById("posts-table-body");
    tableBody.innerHTML = "";
    for (const post of postList) {
        const row = document.createElement("tr");
        row.innerHTML = `<td>${getRepById(post.repId).name}</td>
                        <td>${post.platform}</td>
                        <td>${formatDate(post.date)}</td>
                        <td>${getSourceLabel(post.source)}</td>
                        <td>+10</td>
                        <td class="status-col"><span class="badge badge-${post.status}">${post.status}</span></td>`;
        tableBody.appendChild(row);
    }
}

// Shows how many posts are waiting for review
function fillPendingCount() {
    const pendingTotal = getPostsByStatus("pending").length;
    const count = document.getElementById("pending-count");
    count.textContent = pendingTotal;
    const reviewText = document.getElementById("review-text");
    if (pendingTotal === 1) {
        reviewText.textContent = "1 post waiting for your review";
    } else {
        reviewText.textContent = `${pendingTotal} posts waiting for your review`;
    }
}

// Return all posts, or only the ones with this status
function filterPostsByStatus(status) {
    if (status === "all") {
        return getPosts();
    }
    return getPostsByStatus(status);
}

// Shows the cards for Pending, or a table for the other tabs
function updateCards() {
    const activeTab = document.querySelector(".tab.active");
    const status = activeTab.dataset.status;
    const pendingView = document.getElementById("pending-view");
    const tablePanel = document.getElementById("posts-table-panel");
    if (status === "pending") {
        fillPostCards(filterPostsByStatus(status));
        pendingView.classList.remove("hidden");
        tablePanel.classList.add("hidden");
    } else {
        fillPostsTable(filterPostsByStatus(status));
        pendingView.classList.add("hidden");
        tablePanel.classList.remove("hidden");
    }
    const statusCells = document.querySelectorAll(".status-col");
    for (const cell of statusCells) {
        if (status === "all") {
            cell.classList.remove("hidden");
        } else {
            cell.classList.add("hidden");
        }
    }
}

// Make tabs clickable
function setUpTabs() {
    const tabs = document.querySelectorAll(".tab");
    for (let i = 0; i < tabs.length; i++) {
        tabs[i].addEventListener("click", function () {
            for (let j = 0; j < tabs.length; j++) {
                tabs[j].classList.remove("active");
            }
            tabs[i].classList.add("active");
            updateCards();
        });
    }
}

// One click listener for all the Approve and Reject buttons
function setUpCardButtons() {
    const grid = document.getElementById("posts-list");
    grid.addEventListener("click", function (event) {
        const card = event.target.closest(".post-card");
        if (card === null) {
            return;
        }
        const postId = Number(card.dataset.id);
        if (event.target.classList.contains("approve-button")) {
            approvePost(postId);
        }
        else if (event.target.classList.contains("reject-button")) {
            rejectPost(postId);
        } else {
            return;
        }
        updateCards();
        fillPendingCount();
    });
}

setUpTabs();
setUpCardButtons();
updateCards();
fillPendingCount();
