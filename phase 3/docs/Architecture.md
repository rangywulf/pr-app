# Application Architecture

*Phase 3 (TESD 1100) | Shiver by Kelpkin*

## Overview

The Phase 3 version of the PR App is a client-side website: three HTML pages, three CSS files, and seven JavaScript files. Everything runs in the browser, with no server and no database. Each file does one job, the same idea as the classes in Phase 2: one file holds the data, one reads and saves it, one holds the rules, one holds shared on-screen pieces, and each page has its own file for what it shows.

The Phase 2 version of this document, which describes the JavaFX desktop app, is in the `phase2-javafx` folder.

## Technology

| Part | What is used |
| --- | --- |
| Page structure | HTML |
| Look and layout | CSS, with colors and fonts stored as variables |
| Behavior | JavaScript, written by hand with no framework |
| Chart | Chart.js, loaded from the internet |
| Icons | Bootstrap Icons, loaded from the internet |
| Fonts | Fredoka and Inter, loaded from Google Fonts |
| Storage | JavaScript arrays in memory |

There is no server, no database, and nothing to install.

## Source Structure

```text
phase3-site/
├── index.html          Overview page
├── reps.html           Reps page
├── posts.html          Posts page
├── css/
│   ├── brand.css       Colors, fonts, sizes, and spacing as variables
│   ├── layout.css      Top bar, sidebar, page area, and phone layout
│   └── components.css  Cards, tables, tabs, badges, popups, and toasts
├── js/
│   ├── data.js         Sample data
│   ├── data-access.js  Reading and saving data
│   ├── logic.js        Rules and math
│   ├── ui.js           Shared on-screen pieces
│   ├── overview.js     Overview page code
│   ├── reps.js         Reps page code
│   └── posts.js        Posts page code
└── images/
    ├── Shiver_Main_Logo.png
    └── Shiver_Main_Logo_White.png
```

## How the Files Fit Together

The JavaScript is split into layers. Each layer only calls the layer below it.

```text
overview.js / reps.js / posts.js     what each page shows and what its buttons do
        ↓
ui.js                                shared on-screen pieces (toasts, ☰ menu)
        ↓
logic.js                             rules and math
        ↓
data-access.js                       the only file that touches the data arrays
        ↓
data.js                              the sample data
```

The page files never touch the arrays in `data.js` directly. They ask for data through functions like `getReps()` and `getPostsByStatus("pending")`. In Phase 4, a database replaces `data.js`, and only the inside of the functions in `data-access.js` has to change.

This is the same idea as Phase 2, where `Main` called the managers and only `FileHandler` touched the data file.

| Phase 2 | Phase 3 |
| --- | --- |
| Data classes (`Rep`, `Post`, `PointTransaction`) | Objects in the arrays in `data.js` |
| `FileHandler` (the only class that touched the file) | `data-access.js` (the only file that touches the arrays) |
| Managers (where the rules lived) | `logic.js` |
| `Main` (window and buttons) | `overview.js`, `reps.js`, `posts.js` |

## Load Order

Every page loads its CSS and JavaScript in the `<head>`.

```text
CSS:         brand.css → layout.css → components.css
JavaScript:  data.js → data-access.js → logic.js → ui.js → the page's own file
```

- **CSS order matters** because later rules win when two rules match. `brand.css` comes first so its variables exist before the other files use them.
- **JavaScript order matters** because each file uses functions from the files before it. Every script has `defer`, which means it waits until the page is built and then runs in order, top to bottom.
- **Overview** also loads Chart.js first, so the chart library is ready before `overview.js` draws the chart.

## File Responsibilities

### CSS

| File | Responsibility |
| --- | --- |
| `brand.css` | Holds every color, font, text size, and spacing size as a variable in `:root`. The only place a color is typed |
| `layout.css` | The page frame: the top bar, sidebar, and page area, laid out with CSS grid. Also holds the phone layout for the frame and the ☰ menu button |
| `components.css` | Everything inside the page, grouped by page: ALL PAGES, OVERVIEW, REPS, POSTS, PHONES, and HELPERS. HELPERS is last so `.hidden` always wins |

### JavaScript

| File | Responsibility |
| --- | --- |
| `data.js` | The sample reps, posts, transactions, and social accounts. No functions |
| `data-access.js` | Reads data (`getReps`, `getPosts`, `getHistory`, and more) and saves new data (`addRep`, `addPost`, `addTransaction`, `updatePostStatus`) |
| `logic.js` | Rules and math: balances, approving and rejecting posts, owner posts, date formatting, and chart counting |
| `ui.js` | Shared on-screen pieces used by more than one page: `showToast` and the ☰ menu |
| `overview.js` | Fills the greeting, metric cards, chart, Needs review list, and Top reps table |
| `reps.js` | Fills the reps table and side panel, and handles tabs, search, sort, and Add rep |
| `posts.js` | Fills the post cards and posts table, and handles tabs, approve, reject, Approve all, and Add post |

## Functions by File

### data-access.js

| Function | Responsibility |
| --- | --- |
| `getReps()` | Returns all reps |
| `getPosts()` | Returns all posts |
| `getTransactions()` | Returns all point transactions |
| `getRepById(id)` | Returns one rep, or `null` if not found |
| `getPostsForRep(repId)` | Returns every post for one rep |
| `getHistory(repId)` | Returns every transaction for one rep |
| `getAccounts(repId)` | Returns every social account for one rep |
| `getHandle(repId, platform)` | Returns a rep's handle on one platform, or `""` |
| `getPostsByStatus(status)` | Returns every post with that status |
| `updatePostStatus(postId, newStatus)` | Changes a post's status and sets its reviewed date to today |
| `addTransaction(repId, postId, amount, reason)` | Adds a transaction dated today |
| `addPost(repId, platform, url, status, date, source, points)` | Adds a post and returns its id |
| `addRep(name, email, status, discountCode, prCode)` | Adds a rep and returns its id |
| `addInvitedRep(name, email)` | Makes the codes from the first name and adds the rep as invited |

`addInvitedRep` holds rules, not storage, so it is planned to move to `logic.js` after the demo.

### logic.js

| Function | Responsibility |
| --- | --- |
| `calculateBalance(repId)` | Adds up all of a rep's transactions to get their current balance |
| `calculateEarned(repId)` | Adds up only the points a rep has earned, ignoring redemptions |
| `formatDate(dateString)` | Turns `"2026-11-14"` into `"Nov 14, 2026"` |
| `formatDaysAgo(dateString)` | Turns a date into `"today"`, `"1 day ago"`, or `"6 days ago"` |
| `getSourceLabel(source)` | Turns `"auto"`, `"link"`, or `"owner"` into the label shown on screen |
| `approvePost(postId)` | Approves a pending post and gives the rep its points |
| `rejectPost(postId)` | Rejects a pending post, with no points |
| `addOwnerPost(repId, platform, url, date, points)` | Adds an approved post from the owner and gives the rep its points |
| `countPostsByDay(postList)` | Counts posts for each of the last 30 days, oldest first |
| `getDayLabels()` | Makes the date labels for the last 30 days, oldest first |

### ui.js

| Function | Responsibility |
| --- | --- |
| `showToast(message)` | Shows a message in the corner for 3 seconds |
| `setUpMenuButton()` | Makes the ☰ button open and close the sidebar on phones |

### overview.js

| Function | Responsibility |
| --- | --- |
| `fillGreeting()` | Shows "Good morning", "Good afternoon", or "Good evening" with the shop name |
| `fillMetricCards()` | Fills the Active reps, Approved posts, and Posts to review cards |
| `fillReviewList()` | Fills the Needs review list with pending posts |
| `fillTopReps()` | Fills the Top reps table with the 5 reps who earned the most |
| `filterPostsByPlatform(platform)` | Returns approved posts for one platform, or all of them |
| `drawPostsChart()` | Draws the chart with the brand color and font |
| `updatePostsChart(platform)` | Redraws the chart for one platform |
| `setUpChartTabs()` | Makes the chart tabs clickable |

### reps.js

| Function | Responsibility |
| --- | --- |
| `fillRepCount()` | Shows the number of reps next to the title |
| `fillRepsTable(repList)` | Builds one table row per rep, or "No reps found" |
| `filterRepsByStatus(status)` | Returns all reps, or only those with one status |
| `updateTable()` | Reads the active tab, search text, and sort choice, then rebuilds the table |
| `setUpTabs()`, `setUpSearch()`, `setUpSort()` | Connect the tabs, search box, and sort dropdown to `updateTable()` |
| `fillPanelHeader(rep)` | Side panel name, email, status, and codes |
| `fillPanelAccounts(rep)` | Side panel social media icons |
| `fillPanelStats(rep)` | Side panel balance, posts, and redeemed |
| `fillPanelHistory(rep)` | Side panel point history |
| `fillRepHistory(rep)` | Calls all four side panel functions |
| `openRepPanel(rep)` | Fills the side panel and opens it |
| `setUpPanelClose()` | Makes the ✕ button close the side panel |
| `setUpAddRepModal()` | Opens and closes the Add rep popup, and clears it when it closes |
| `setUpAddRepForm()` | Saves the new rep, updates the table, and shows a toast |

### posts.js

| Function | Responsibility |
| --- | --- |
| `buildPostCard(post)` | Returns the HTML for one post card |
| `fillPostCards(postList)` | Builds one card per pending post |
| `fillPostsTable(postList)` | Builds one table row per post |
| `fillPendingCount()` | Fills the orange count on the Pending tab and the review bar sentence |
| `filterPostsByStatus(status)` | Returns all posts, or only those with one status |
| `updateCards()` | Shows the cards on Pending and the table on the other tabs, with the Status column only on All |
| `setUpTabs()` | Connects the tabs to `updateCards()` |
| `setUpCardButtons()` | One click listener for every Approve and Reject button |
| `getPostWord(count)` | Picks "post" or "posts" to match the number |
| `setUpApproveAll()` | Opens the confirm popup and approves every pending post |
| `fillRepOptions()` | Fills the Rep dropdown in Add post, leaving out invited reps |
| `setUpAddPostModal()` | Opens and closes the Add post popup, and clears it when it closes |
| `setUpAddPostForm()` | Saves the new post, updates the page, and shows a toast |

## What Happens When a Page Loads

Each page file ends with a list of calls that run once, in order. For example, the bottom of `posts.js`:

```javascript
setUpTabs();
setUpCardButtons();
setUpAddPostModal();
fillRepOptions();
setUpAddPostForm();
setUpApproveAll();
updateCards();
fillPendingCount();
```

The "set up" calls connect buttons and boxes to what they should do. The "fill" and "update" calls build what's on the screen. Because these run in order, a crash in one call stops every call after it.

## Where the Rules Live

| Rule | Where it is checked |
| --- | --- |
| A post can only be approved or rejected while pending | `approvePost` and `rejectPost` in `logic.js` |
| Approving gives the post's own points | `approvePost` in `logic.js` |
| Owner posts are approved right away | `addOwnerPost` in `logic.js` |
| Balance is calculated from history | `calculateBalance` in `logic.js` |
| New reps are invited, with codes from their first name | `addInvitedRep` in `data-access.js` (moving to `logic.js`) |
| A reviewed post gets today's date | `updatePostStatus` and `addPost` in `data-access.js` |
| Invited reps can't be credited with posts | `fillRepOptions` in `posts.js` |
| Required fields, email format, link starts with `https://`, points at least 1 | The browser, using `required`, `type`, `pattern`, and `min` in the HTML forms |

## Data in Memory

All data lives in the arrays in `data.js` while the page is open. Adding a rep, adding a post, or reviewing a post changes those arrays, and the page redraws from them. Reloading the page loads `data.js` again, so every change is lost.

Each page loads its own copy of the data, so a change on one page doesn't carry over to another page. The data is described in full in `data-model.md`.

## Application Flow

This is what happens when the owner approves a post:

```text
The owner clicks Approve on a post card
↓
setUpCardButtons finds which card was clicked and reads its post id
↓
approvePost (logic.js) checks that the post is still pending
↓
updatePostStatus (data-access.js) sets it to approved with today's date
↓
addTransaction (data-access.js) gives the rep the post's points
↓
showToast (ui.js) shows "Post approved"
↓
The card fades out
↓
updateCards and fillPendingCount redraw the cards and the pending count
```

Every action follows the same pattern: the page file reacts to the click, `logic.js` applies the rule, `data-access.js` changes the data, and the page file redraws.

## Room to Grow

| Future need | How the design allows for it |
| --- | --- |
| Database (Phase 4) | Only `data-access.js` touches the data, so only its functions change. `countPostsByDay` can become a database query that does the counting |
| Shopify (Phase 5) | The frame is split into `<header>`, `<nav>`, and `<main>`. Shopify supplies its own top bar and menu, so the header is removed and `<main>` stays |
| Shopify styling | Every color is a variable in `brand.css`, so the Shopify version changes values, not rules |
| PR Portal | The rules in `logic.js` can be reused by the rep-facing pages |
| Reports (Phase 6) | Chart.js and its brand settings are already in place for more charts |
| Dark mode | A second set of values for the same color variables |
| Shared code | Tab and popup code that is copied between pages can move into `ui.js` |

## What Changed from Phase 2

| Area | Phase 2 | Phase 3 |
| --- | --- | --- |
| Platform | JavaFX desktop app | Website in the browser |
| Structure | Seven Java classes | Three pages, three CSS files, seven JavaScript files |
| Data | Objects in ArrayLists | Objects in JavaScript arrays |
| Saving | Text file, saved after every change | None. Data resets on reload |
| Where the rules live | The managers | `logic.js` |
| Where the data is touched | `FileHandler` | `data-access.js` |
| Styling | Colors set in Java code | CSS files with variables |
| Input checks | Hand-written in `Main` | The browser's built-in form checks |
| Outside libraries | JavaFX only | Chart.js, Bootstrap Icons, and Google Fonts |