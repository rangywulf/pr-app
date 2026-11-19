// Builds the HTML for one post card
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
                <span class="post-points">+${post.points} pts</span>
                <div class="post-actions">
                    <button type="button" class="button-link approve-button">Approve</button>
                    <button type="button" class="button-link button-secondary reject-button">Reject</button>
                </div>
            </div>
        </article>
    `;
}

// Fills the card grid with one card per post
function fillPostCards(postList) {
    const grid = document.getElementById("posts-list");
    grid.innerHTML = "";
    for (const post of postList) {
        grid.innerHTML += buildPostCard(post);
    }
}

// Fills the posts table with one row per post
function fillPostsTable(postList) {
    const tableBody = document.getElementById("posts-table-body");
    tableBody.innerHTML = "";
    for (const post of postList) {
        const row = document.createElement("tr");
        let reviewed = "—";
        if (post.reviewedDate) {
            reviewed = formatDate(post.reviewedDate);
        }
        row.innerHTML = `<td>${getRepById(post.repId).name}</td>
                        <td>${post.platform}</td>
                        <td>${formatDate(post.date)}</td>
                        <td>${reviewed}</td>
                        <td>${getSourceLabel(post.source)}</td>
                        <td>+${post.points}</td>
                        <td class="status-col"><span class="badge badge-${post.status}">${post.status}</span></td>`;
        tableBody.appendChild(row);
    }
}

// Fills the orange Pending count and the review bar sentence
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

// Returns all posts, or only the ones with this status
function filterPostsByStatus(status) {
    if (status === "all") {
        return getPosts();
    }
    return getPostsByStatus(status);
}

// Shows the cards for Pending, or the table for the other tabs
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

// Makes the filter tabs clickable
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

// One click listener for all the Approve and Reject buttons on the cards
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
            showToast("Post approved");
        }
        else if (event.target.classList.contains("reject-button")) {
            rejectPost(postId);
            showToast("Post rejected");
        } else {
            return;
        }
        card.classList.add("fading-out");
        setTimeout(function () {
            updateCards();
            fillPendingCount();
        }, 300);
    });
}

// Add post popup: opens, closes, and clears the form when it closes
function setUpAddPostModal() {
    const modal = document.getElementById("add-post-modal");
    const addButton = document.getElementById("add-post");
    const cancelButton = document.getElementById("cancel-add-post");
    addButton.addEventListener("click", function () {
        modal.showModal();
    });
    cancelButton.addEventListener("click", function () {
        modal.close();
    });
    const form = document.getElementById("add-post-form");
    modal.addEventListener("close", function () {
        form.reset();
    });
}

// Fills the Rep dropdown in the Add post popup (no invited reps)
function fillRepOptions() {
    const repSelect = document.getElementById("new-post-rep");
    for (const rep of getReps()) {
        if (rep.status !== "invited") {
            repSelect.innerHTML += `<option value="${rep.id}">${rep.name}</option>`;
        }
    }
}

// Saves a new post from the Add post popup
function setUpAddPostForm() {
    const form = document.getElementById("add-post-form");
    const modal = document.getElementById("add-post-modal");
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        const repId = Number(document.getElementById("new-post-rep").value);
        const platform = document.getElementById("new-post-platform").value;
        const url = document.getElementById("new-post-link").value;
        const date = document.getElementById("new-post-date").value;
        const points = Number(document.getElementById("new-post-points").value);
        addOwnerPost(repId, platform, url, date, points);
        modal.close();
        updateCards();
        showToast("Post added");
    });
}

// Picks "post" or "posts" to match the number of posts
function getPostWord(count) {
    if (count === 1) {
        return "post";
    }
    return "posts";
}

// Approve all button with a confirm box
function setUpApproveAll() {
    const approveAllButton = document.getElementById("approve-all");
    const confirmModal = document.getElementById("confirm-modal");
    const confirmTitle = document.getElementById("confirm-title");
    const cancelButton = document.getElementById("confirm-cancel");
    const approveButton = document.getElementById("confirm-approve");
    approveAllButton.addEventListener("click", function () {
        const count = getPostsByStatus("pending").length;
        if (count === 0) {
            return;
        }
        confirmTitle.textContent = `Approve ${count} ${getPostWord(count)}?`;
        confirmModal.showModal();
    });

    cancelButton.addEventListener("click", function () {
        confirmModal.close();
    });

    approveButton.addEventListener("click", function () {
        const pendingPosts = getPostsByStatus("pending");
        for (const post of pendingPosts) {
            approvePost(post.id);
        }
        confirmModal.close();
        updateCards();
        fillPendingCount();
        showToast(`${pendingPosts.length} ${getPostWord(pendingPosts.length)} approved`);
    });
}

setUpTabs();
setUpCardButtons();
setUpAddPostModal();
fillRepOptions();
setUpAddPostForm();
setUpApproveAll();
updateCards();
fillPendingCount();