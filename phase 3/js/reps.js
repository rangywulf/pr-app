// Reps page display code

// Shows the total number of reps next to the page title
function fillRepCount() {
    const allReps = getReps();
    const repCount = document.getElementById("rep-count");
    repCount.textContent = `${allReps.length} reps`;
}

// Builds one table row per rep
function fillRepsTable(repList) {
    const tableBody = document.getElementById("reps-table-body");
    tableBody.innerHTML = "";
    if (repList.length === 0) {
        tableBody.innerHTML = `<tr class="empty-row"><td colspan="6">No reps found</td></tr>`;
        return;
    }
    for (let i = 0; i < repList.length; i++) {
        const rep = repList[i];
        const row = document.createElement("tr");
        row.innerHTML = `<td>${rep.name}</td>
                        <td class="code code-muted">${rep.discountCode}</td>
                        <td class="code">${rep.prCode}</td>
                        <td>${calculateBalance(rep.id)}</td>
                        <td>$0</td>
                        <td><span class="badge badge-${rep.status}">${rep.status}</span></td>`;
        row.dataset.repId = rep.id;
        row.addEventListener("click", function () {
            openRepPanel(rep);
        });
        tableBody.appendChild(row);
    }
}

// Side panel: name, status badge, email, and codes
function fillPanelHeader(rep) {
    const nameHeading = document.getElementById("panel-rep-name");
    nameHeading.textContent = rep.name;
    const emailLink = document.getElementById("panel-rep-email");
    emailLink.href = `mailto:${rep.email}`;
    emailLink.textContent = rep.email;
    const statusBadge = document.getElementById("panel-rep-status");
    statusBadge.className = `badge badge-${rep.status}`;
    statusBadge.textContent = rep.status;
    const discountCode = document.getElementById("panel-discount-code");
    discountCode.textContent = rep.discountCode;
    const prCode = document.getElementById("panel-pr-code");
    prCode.textContent = rep.prCode;
}

// Side panel: one line per social account
function fillPanelAccounts(rep) {
    const accountsList = document.getElementById("panel-accounts");
    const accounts = getAccounts(rep.id);
    accountsList.innerHTML = "";
    if (accounts.length === 0) {
        accountsList.innerHTML = `<li class="empty-state">No social accounts yet</li>`;
        return;
    }
    for (const account of accounts) {
        const item = document.createElement("li");
        item.innerHTML = `<a href="${account.url}" aria-label="${account.platform}" title="${account.handle}"><i class="bi bi-${account.platform.toLowerCase()}"></i></a>`;
        accountsList.appendChild(item);
    }
}

// Side panel: balance, approved posts, and points redeemed
function fillPanelStats(rep) {
    const balanceStat = document.getElementById("panel-balance");
    balanceStat.textContent = calculateBalance(rep.id);
    const postsStat = document.getElementById("panel-posts");
    postsStat.textContent = getPostsForRep(rep.id).filter(post => post.status === "approved").length;
    const redeemedStat = document.getElementById("panel-redeemed");
    redeemedStat.textContent = calculateEarned(rep.id) - calculateBalance(rep.id);
}

// Side panel: point history, earned and redeemed
function fillPanelHistory(rep) {
    const historyList = document.getElementById("panel-history");
    historyList.innerHTML = "";
    const history = getHistory(rep.id);
    if (history.length === 0) {
        historyList.innerHTML = `<li class="empty-state">No history yet</li>`
        return;
    }
    for (const t of history) {
        const shortDate = new Date(`${t.date}T00:00:00`).toLocaleDateString(undefined, {month: "short", day: "numeric", year: "numeric"});
        const item = document.createElement("li");
        if (t.amount > 0) {
            item.className = "history-earned";
            const post = getPosts().find(p => p.id === t.postId);
            item.innerHTML = `<span class="history-date">${shortDate}</span> <a href="${post.url}">${post.platform} post</a> <span class="history-amount">+${t.amount}</span>`;
        } else {
            item.className = "history-redeemed";
            item.innerHTML = `<span class="history-date">${shortDate}</span> <span>${t.reason}</span> <span class="history-amount">${t.amount}</span>`;
        }
        historyList.appendChild(item);
    }
}

// Fill the whole side panel for one rep
function fillRepHistory(rep) {
    fillPanelHeader(rep);
    fillPanelAccounts(rep);
    fillPanelStats(rep);
    fillPanelHistory(rep);
}

// Fill the side panel and show it
function openRepPanel(rep) {
    fillRepHistory(rep);
    const panel = document.getElementById("rep-panel");
    panel.classList.add("open");
}


// filter by status
function filterRepsByStatus(status) {
    const allReps = getReps();
    if (status === "all") {
        return allReps;
    }

    return allReps.filter(rep => rep.status === status);
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
            updateTable();
        });
    }
}

function updateTable() {
    const activeTab = document.querySelector(".tab.active");
    const status = activeTab.dataset.status;
    let repList = filterRepsByStatus(status);
    const searchText = document.getElementById("rep-search").value.toLowerCase();
    repList = repList.filter(rep => rep.name.toLowerCase().includes(searchText));
    const sortChoice = document.getElementById("rep-sort").value;
    if (sortChoice === "points") {
        repList.sort((a, b) => calculateBalance(b.id) - calculateBalance(a.id));
    } else if (sortChoice === "name") {
        repList.sort((a, b) => a.name.localeCompare(b.name));
    }
    fillRepsTable(repList);
}

function setUpSearch() {
    const searchBox = document.getElementById("rep-search");
    searchBox.addEventListener("input", function () {
        updateTable();
    });
}

function setUpSort() {
    const sortBox = document.getElementById("rep-sort");
    sortBox.addEventListener("change", function () {
        updateTable();
    });
}

// Make the close button hide the side panel             
function setUpPanelClose() {                                
    const closeButton = document.getElementById("panel-close");   
    closeButton.addEventListener("click", function () {     
        const panel = document.getElementById("rep-panel");  
        panel.classList.remove("open");                      
    });                                                      
}        

// Add rep modal: open and cancel
function setUpAddRepModal() {
    const modal = document.getElementById("add-rep-modal");
    const addButton = document.getElementById("add-rep");
    const cancelButton = document.getElementById("cancel-add-rep");
    addButton.addEventListener("click", function () {
        modal.showModal();
    });
    cancelButton.addEventListener("click", function () {
        modal.close();
    });
    const form = document.getElementById("add-rep-form");
    modal.addEventListener("close", function () {
        form.reset();
    }); 
}

// Add rep save button
function setUpAddRepForm() {
    const form = document.getElementById("add-rep-form");
    const modal = document.getElementById("add-rep-modal");
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        const name = document.getElementById("new-rep-name").value.trim();
        const email = document.getElementById("new-rep-email").value.trim();
        addInvitedRep(name, email);
        form.reset();
        modal.close();
        fillRepCount();
        updateTable();
        showToast("Rep added");
    });
}

fillRepCount();
setUpTabs();
setUpSearch();
setUpSort();
setUpPanelClose();
setUpAddRepModal();
setUpAddRepForm();
updateTable();
