// The Overview chart, kept so the tabs can update it
let postsChart = null;

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

// Approved posts for one platform, or all of them
function filterPostsByPlatform(platform) {
    const approvedPosts = getPostsByStatus("approved");
    if (platform === "all") {
        return approvedPosts;
    }
    return approvedPosts.filter(post => post.platform === platform);
}

// Draws the Posts over time line chart
function drawPostsChart() {
    const canvas = document.getElementById("posts-chart");
    const lineColor = getComputedStyle(document.documentElement).getPropertyValue("--color-chart-1").trim();
    const counts = countPostsByDay(getPostsByStatus("approved"));
    Chart.defaults.font.family = getComputedStyle(document.documentElement).getPropertyValue("--font-body").trim();
    Chart.defaults.color = getComputedStyle(document.documentElement).getPropertyValue("--color-text-muted").trim();
    postsChart = new Chart(canvas, {
        type: "line",
        data: {
            labels: getDayLabels(),
            datasets: [{
                label: "Approved posts",
                data: counts,
                borderColor: lineColor,
                backgroundColor: lineColor
            }]
        },
        options: {
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: { precision: 0 }
                }
            }
        }
    });
}

// Redraws the chart for one platform
function updatePostsChart(platform) {
    postsChart.data.datasets[0].data = countPostsByDay(filterPostsByPlatform(platform));
    postsChart.update();
}

// Makes the chart tabs clickable
function setUpChartTabs() {
    const tabs = document.querySelectorAll("#chart-tabs .tab");
    for (let i = 0; i < tabs.length; i++) {
        tabs[i].addEventListener("click", function () {
            for (let j = 0; j < tabs.length; j++) {
                tabs[j].classList.remove("active");
            }
            tabs[i].classList.add("active");
            updatePostsChart(tabs[i].dataset.platform);
        });
    }
}

fillMetricCards();
fillReviewList();
fillTopReps();
drawPostsChart();
setUpChartTabs();