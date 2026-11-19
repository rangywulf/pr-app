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
                <span class="post-points">+${post.points} pts</span>
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
                        <td>+${post.points}</td>
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

// Add post modal
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

// Fill in rep dropdown menu for post modal
function fillRepOptions() {
    const repSelect = document.getElementById("new-post-rep");
    for (const rep of getReps()) {
        if (rep.status !== "invited") {
            repSelect.innerHTML += `<option value="${rep.id}">${rep.name}</option>`;
        }
    }
}

// Add post save button
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
        form.reset();
        modal.close();
        updateCards();
        showToast("Post added");
    });
}

// Approval all with confirm message
function setUpApproveAll() {
    const approveAllButton = document.getElementById("approve-all");
    approveAllButton.addEventListener("click", function () {
        const pendingPosts = getPostsByStatus("pending");
        if (pendingPosts.length === 0) {
            return;
        }
        
        let label = "posts";
        if (pendingPosts.length === 1) {
            label = "post";
        }
        
        const confirmed = confirm(`Approve ${pendingPosts.length} ${label}?`);
        if (confirmed === false) {
            return;
        }

        for (const post of pendingPosts) {
            approvePost(post.id);
        }

        updateCards();
        fillPendingCount();
        showToast(`${pendingPosts.length} ${label} approved`);
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
