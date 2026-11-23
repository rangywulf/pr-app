// Builds the HTML for one redemption request card
function buildRedemptionCard(redemption) {
    const rep = getRepById(redemption.repId);
    const balance = calculateBalance(redemption.repId);
    return `<article class="post-card" data-id="${redemption.id}">
                <div class="post-body">
                    <p class="post-rep">${rep.name}</p>
                    <p class="post-meta">${getRewardLabel(redemption)} &middot; ${formatDate(redemption.date)}</p>
                    <p class="post-source">Balance: ${balance} pts</p>
                </div>
                <div class="post-footer">
                    <span class="post-points">${redemption.points} pts</span>
                    <div class="post-actions">
                        <button type="button" class="button-link approve-button">Approve</button>
                        <button type="button" class="button-link button-secondary reject-button">Reject</button>
                    </div>
                </div>
            </article>`;
}

// Fills the card grid with one card per redemption request
function fillRedemptionCards(redemptionList) {
    const grid = document.getElementById("redemption-cards");
    grid.innerHTML = "";
    for (const redemption of redemptionList) {
        grid.innerHTML += buildRedemptionCard(redemption);
    }
}

// Fills the redemptions table with one row per redemption
function fillRedemptionTable(redemptionList) {
    const tableBody = document.getElementById("redemption-table-body");
    tableBody.innerHTML = "";
    for (const redemption of redemptionList) {
        const row = document.createElement("tr");
        let requested = "--";
        if (redemption.date) {
            requested = formatDate(redemption.date);
        }
        let reviewed = "--";
        if (redemption.reviewedDate) {
            reviewed = formatDate(redemption.reviewedDate);
        }
        let source = "Request";
        if (redemption.source === "manual") {
            source = "Manual";
        }
        let reverseButton = "";
        if (redemption.status === "approved") {
            reverseButton = `<button type="button" class="button-link button-secondary reverse-button" data-id="${redemption.id}">Refund</button>`;
        }
        
        // Only approved redemptions took points, so only they get a minus sign
        let pointsText = `${redemption.points}`;
        if (redemption.status === "approved") {
            pointsText = `-${redemption.points}`;
        }

        row.innerHTML = `<td>${getRepById(redemption.repId).name}</td>
                        <td>${getRewardLabel(redemption)}</td>
                        <td>${pointsText}</td>
                        <td>${requested}</td>
                        <td>${reviewed}</td>
                        <td>${source}</td>
                        <td class="status-col"><span class="badge badge${redemption.status}">${redemption.status}</span></td>
                        <td>${reverseButton}</td>`;
        
        tableBody.appendChild(row);
    }
}

// Fills the Pending count and the review bar sentence
function fillPendingCount() {
    const pendingTotal = getRedemptionsByStatus("pending").length;
    const count = document.getElementById("pending-count");
    count.textContent = pendingTotal;
    const reviewText = document.getElementById("review-text");
    if (pendingTotal === 1) {
        reviewText.textContent = "1 request waiting for your review";
    } else {
        reviewText.textContent = `${pendingTotal} requests waiting for your review`;
    }
}

// Returns all redemptions, or only the ones with this status
function filterRedemptionsByStatus(status) {
    if (status === "all") {
        return getRedemptionRequests();
    }
    return getRedemptionsByStatus(status);
}

// Shows the cards for Pending, or the table for the other tabs
function updateView() {
    // Find which tab is selected and what status it stands for
    const activeTab = document.querySelector(".tab.active");
    const status = activeTab.dataset.status;
    const pendingView = document.getElementById("pending-view");
    const tablePanel = document.getElementById("redemption-table-panel");

    // Pending shows cards, every other tab shows the table
    if (status === "pending") {
        fillRedemptionCards(filterRedemptionsByStatus(status));
        pendingView.classList.remove("hidden");
        tablePanel.classList.add("hidden");
    } else {
        fillRedemptionTable(filterRedemptionsByStatus(status));
        pendingView.classList.add("hidden");
        tablePanel.classList.remove("hidden");
    }

    // The Status column only shows on the All tab
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
            updateView();
        });
    }
}

// Redeem points popup: opens, closes, and clears the form when it closes
function setUpRedeemModal() {
    const modal = document.getElementById("redeem-modal");
    const openButton = document.getElementById("redeem-points");
    const cancelButton = document.getElementById("cancel-redeem");

    // Redeem points button opens the popup
    openButton.addEventListener("click", function () {
        modal.showModal();
    });

    // Cancel button closes it
    cancelButton.addEventListener("click", function () {
        modal.close();
    });

    // Clear the form every time the popup closes
    const form = document.getElementById("redeem-form");
    modal.addEventListener("close", function () {
        form.reset();
    });
}

// Fills the Rep dropdown in the Redeem points popup (no invited reps)
function fillRepOptions() {
    const repSelect = document.getElementById("redeem-rep");
    for (const rep of getReps()) {
        if (rep.status !== "invited") {
            repSelect.innerHTML += `<option value="${rep.id}">${rep.name}</option>`;
        }
    }
}

// Fills the Reward dropdown with every reward, plus a Custom choice at the end
function fillRewardOptions() {
    const rewardSelect = document.getElementById("redeem-reward");
    for (const reward of getRewards()) {
        rewardSelect.innerHTML += `<option value="${reward.id}">${reward.name} (${reward.pointCost} pts)</option>`;
    }
    rewardSelect.innerHTML += `<option value="custom">Custom</option>`;
}

// The job to run when the owner clicks the confirm popup's button
let confirmAction = null;

// Opens the confirm popup with its words, and saves the job to run if the owner confirms
function openConfirm(title, text, buttonText, action) {
    document.getElementById("confirm-title").textContent = title;
    document.getElementById("confirm-text").textContent = text;
    document.getElementById("confirm-ok").textContent = buttonText;
    confirmAction = action;
    document.getElementById("confirm-modal").showModal();
}

// Redraws everything after a change
function refreshPage() {
    updateView();
    fillPendingCount();
}

// Confirm popup: Cancel closes it, the other button runs the saved job
function setUpConfirmModal() {
    const modal = document.getElementById("confirm-modal");
    document.getElementById("confirm-cancel").addEventListener("click", function () {
        modal.close();
    });
    document.getElementById("confirm-ok").addEventListener("click", function () {
        confirmAction();
        modal.close();
        refreshPage();
    });
}

// One click listener for all the Approve and Reject buttons on the cards
function setUpCardButtons() {
    const grid = document.getElementById("redemption-cards");
    grid.addEventListener("click", function (event) {
        const card = event.target.closest(".post-card");
        if (card === null) {
            return;
        }
        const redemptionId = Number(card.dataset.id);
        const redemption = getRedemptionRequests().find(redemption => redemption.id === redemptionId);
        const repName = getRepById(redemption.repId).name;
        const reward = getRewardLabel(redemption);

        if (event.target.classList.contains("approve-button")) {
            openConfirm(`Approve ${reward} for ${repName}?`, `${redemption.points} pts will come out of their balance`, "Approve", function () {
                if (approveRedemption(redemptionId)) {
                    showToast("Redemption approved");
                } else {
                    showToast(`${repName} doesn't have enough points`);
                }
            });
        }
        else if (event.target.classList.contains("reject-button")) {
            openConfirm(`Reject ${reward} for ${repName}?`, "No points will be taken", "Reject", function () {
                rejectRedemption(redemptionId);
                showToast("Redemption rejected");
            });
        }
    });
}

// One click listener for all the Refund buttons in the table
function setUpRefundButtons() {
    const tableBody = document.getElementById("redemption-table-body");
    tableBody.addEventListener("click", function (event) {
        if (!event.target.classList.contains("reverse-button")) {
            return;
        }
        const redemptionId = Number(event.target.dataset.id);
        const redemption = getRedemptionRequests().find(redemption => redemption.id === redemptionId);
        const repName = getRepById(redemption.repId).name;
        openConfirm(`Refund ${redemption.points} pts to ${repName}?`, "The points go back to their balance", "Refund", function () {
            reverseRedemption(redemptionId);
            showToast("Points refunded");
        });
    });
}

// Shows the Points and Reward description fields only when Custom is picked
function setUpCustomFields() {
    const rewardSelect = document.getElementById("redeem-reward");
    const customFields = document.getElementById("custom-fields");
    const customPoints = document.getElementById("custom-points");
    const customNote = document.getElementById("custom-note");

    rewardSelect.addEventListener("change", function () {
        const isCustom = rewardSelect.value === "custom";
        customFields.hidden = !isCustom;
        customPoints.required = isCustom;
        customNote.required = isCustom;
    });

    // Hide them again every time the popup closes
    document.getElementById("redeem-modal").addEventListener("close", function () {
        customFields.hidden = true;
        customPoints.required = false;
        customNote.required = false;
    });
}

// Shows how many points the picked rep can spend
function setUpAvailablePoints() {
    const repSelect = document.getElementById("redeem-rep");
    const availableText = document.getElementById("redeem-available");

    repSelect.addEventListener("change", function () {
        document.getElementById("redeem-error").textContent = "";
        if (repSelect.value === "") {
            availableText.textContent = "";
            return;
        }
        const available = calculateAvailable(Number(repSelect.value));
        availableText.textContent = `${available} pts available`;
    });

    // Clear the available points and any error every time the popup closes
    document.getElementById("redeem-modal").addEventListener("close", function () {
        availableText.textContent = "";
        document.getElementById("redeem-error").textContent = "";
    });
}

// Saves a manual redemption from the Redeem points popup
function setUpRedeemForm() {
    const form = document.getElementById("redeem-form");
    const modal = document.getElementById("redeem-modal");

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        const repId = Number(document.getElementById("redeem-rep").value);
        const rewardValue = document.getElementById("redeem-reward").value;

        // Custom uses the typed points and description; a catalog reward uses its own cost
        let rewardId = null;
        let points = 0;
        let note = null;
        if (rewardValue === "custom") {
            points = Number(document.getElementById("custom-points").value);
            note = document.getElementById("custom-note").value;
        } else {
            rewardId = Number(rewardValue);
            points = getRewardById(rewardId).pointCost;
        }

        // Stop if the rep can't afford it, and leave the popup open
        if (!redeemManually(repId, rewardId, points, note)) {
            document.getElementById("redeem-error").textContent = "Not enough points available";
            return;
        }

        modal.close();
        refreshPage();
        showToast("Points redeemed");
    });
}

fillPendingCount();
updateView();
setUpTabs();
setUpRedeemModal();
fillRepOptions();
fillRewardOptions();
setUpConfirmModal();
setUpCardButtons();
setUpRefundButtons();
setUpCustomFields();
setUpAvailablePoints();
setUpRedeemForm();