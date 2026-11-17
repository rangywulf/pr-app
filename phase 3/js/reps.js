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
    for (let i = 0; i < repList.length; i++) {
        const rep = repList[i];
        const row = document.createElement("tr");
        row.innerHTML = `<td>${rep.name}</td>
                        <td class="code code-muted">${rep.discountCode}</td>
                        <td class="code">${rep.prCode}</td>
                        <td>${calculateBalance(rep.id)}</td>
                        <td>$0</td>
                        <td><span class="badge badge-${rep.status}">${rep.status}</span></td>`;
        tableBody.appendChild(row);
    }
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

fillRepCount();
fillRepsTable(getReps());
setUpTabs();
setUpSearch();
setUpSort();
updateTable();