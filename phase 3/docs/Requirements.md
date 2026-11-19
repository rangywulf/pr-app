# PR App Requirements

*Phase 3 (TESD 1100) | Shiver by Kelpkin*

## Documentation

The Phase 2 version of this document, which describes the JavaFX desktop app, is in the `phase2-javafx` folder.

# 1. Project Overview

Shiver is an application, made by Kelpkin, that helps small business owners manage their public relations (PR) teams.

In this application, PR representatives promote a shop's products through social media. Instead of receiving traditional monetary compensation, representatives are rewarded through points that can be redeemed for cash, products, or store credit.

The Phase 3 version is a client-side website: the owner dashboard a shop owner would see when they open the app. It has three pages, Overview, Reps, and Posts. It keeps the core rules from Phase 2, such as calculating points from history, and adds a review step for posts, rep statuses, social accounts, a summary page with a chart, and a phone layout.

This version is intentionally limited to what is covered in the current course: HTML, CSS, and JavaScript that run in the browser. It uses sample data stored in memory. Features requiring a server, a database, login, or outside platforms will be addressed in future phases.

# 2. Target Users

The primary users of the application are small business owners who manage PR teams. Phase 3 is built for them only.

The initial target market is small businesses in the planner sticker and stationery community, particularly businesses operated by one or two people.

PR representatives are secondary users. They will get their own view, the PR Portal, in a later phase once login is added.

# 3. Functional Requirements

## 3.1 Navigation

The site must:

* Have three pages: Overview (`index.html`), Reps (`reps.html`), and Posts (`posts.html`).
* Link the pages through a sidebar that is the same on every page.
* Highlight the current page in the sidebar.
* Show a top bar on every page with the Shiver logo and the shop's name and initials.
* Hide the sidebar behind a ☰ menu button on phones.

## 3.2 Overview Page

The Overview page must show:

* A greeting that changes with the time of day ("Good morning", "Good afternoon", or "Good evening") and includes the shop name.
* Four metric cards: Active reps, Approved posts, Sales from codes, and Posts to review.
* A line chart of approved posts per day for the last 30 days, with tabs to show all platforms or one platform at a time.
* A Needs review list of pending posts, oldest first, with how many days ago each was posted. Each row and a "Review all posts" link must go to the Posts page.
* A Top reps table with the top 5 reps by total points ever earned, showing their approved posts, points, and sales.

## 3.3 PR Representative Management

The Reps page must allow the shop owner to:

* View all representatives in a table showing each one's name, email, discount code, PR code, current point balance, sales, and status.
* Filter representatives by status with tabs: All, Active, Paused, and Invited.
* Search representatives by name, ignoring capital letters.
* Sort representatives by name (A to Z) or by most points.
* See the number of representatives in the page subtitle.
* Click a representative to open a side panel with their details.
* Add a new representative by name and email.

When a representative is added, the application must:

* Give them a unique ID.
* Set their status to invited.
* Create their PR code (first name in capitals plus `10`) and discount code (first name in capitals plus `30`).
* Update the table and the representative count right away.

## 3.4 Representative Side Panel

The side panel must show:

* The representative's name and email, with the email as a link that opens a new email.
* Their status badge, discount code, and PR code, each labeled.
* Their social media accounts as icons that link to each account, with the handle shown when hovering.
* Their current balance, approved post count, and total points redeemed.
* Their point history, with the date, description, and amount of each change. Earned points must link to the post that earned them.

The panel must float over the table, dim the rest of the page, and close with a ✕ button.

## 3.5 Post Review

The Posts page must allow the shop owner to:

* Filter posts with tabs: Pending, Approved, Rejected, and All.
* See the number of pending posts on the Pending tab.
* See pending posts as cards, each showing the rep, platform, date posted, source, points, and Approve and Reject buttons.
* Approve or reject a single post.
* Approve every pending post at once, after confirming.
* See approved, rejected, and all posts in a table with the rep, platform, date posted, date reviewed, source, and points. The All tab must also show each post's status.

When a post is approved, the application must:

* Change its status to approved and record the date it was reviewed.
* Give the representative the post's points, recorded as a point transaction.

When a post is rejected, the application must change its status to rejected and record the date it was reviewed. No points are given.

A post can only be approved or rejected while it is pending, so the same post can never give points twice.

## 3.6 Adding Posts

The shop owner must be able to add a post by hand, for example when a rep sends a link or the owner finds a post that auto-detect missed. The owner chooses the rep, platform, post link, date posted, and points.

A post added by the owner must be approved right away, since the owner is the reviewer, and the rep must be given the points.

Only active and paused representatives can be chosen. Invited representatives haven't joined yet.

## 3.7 Supported Social Media Platforms

The site must support posts and social accounts on these platforms:

* YouTube
* TikTok
* Instagram
* Facebook
* Substack

Each post records where it came from:

| Source | Platforms | Label |
| --- | --- | --- |
| Auto-detected | Instagram, Facebook | Auto-detected |
| Link submitted | TikTok, YouTube, Substack | Link submitted |
| Added by the owner | Any | Added by shop owner |

Phase 3 does not connect to any platform. The sources show how posts will arrive once the platforms are connected in a later phase.

## 3.8 Point Management

The application must calculate each representative's point balance from their point history, not store it.

The application must also calculate:

* Total points ever earned, which ignores redemptions and is used for Top reps.
* Total points redeemed, which is total earned minus the current balance.

Each post has its own point value. Sample posts are worth 10 points, and the owner can set the points on posts they add.

## 3.9 Sales Tracking

The application must treat PR activity and sales as separate types of activity.

Phase 3 does not include sales data. The Sales from codes card and the Sales columns show `$0` as a placeholder. Sales tracking is tied to Shopify and will be added in a later phase.

## 3.10 Feedback

The application must:

* Show a short message (a toast) for 3 seconds after each action, such as "Post approved" or "Rep added".
* Show a short message instead of a blank space when a list or table is empty, such as "No reps found" or "No history yet".
* Use the application's own styled popups for adding reps, adding posts, and confirming Approve all.
* Clear a popup's form every time it closes.

# 4. Input Validation Requirements

Forms use the browser's built-in checks, which run before the form is saved. When a check fails, the browser shows a message next to the field and nothing is saved.

| Form | Input | Rule |
| --- | --- | --- |
| Add rep | Name | Required |
| Add rep | Email | Required, must be a valid email format |
| Add post | Rep | Required, chosen from a list |
| Add post | Platform | Required, chosen from a list |
| Add post | Post link | Required, must start with `https://` |
| Add post | Date posted | Required, chosen from a date picker |
| Add post | Points | Required, a whole number of at least 1 |

Reps and platforms are chosen from lists, so they cannot be mistyped.

# 5. Data Storage Requirements

All data is sample data stored in memory, in JavaScript arrays in `data.js`:

* Representatives.
* Posts.
* Point transactions.
* Social accounts.

Pages must never read or change the arrays directly. They must go through the functions in `data-access.js`, so that a database can replace the arrays later by changing only those functions.

Changes made on the site last until the page is reloaded. No file or database is used in Phase 3. Database storage is planned for Phase 4. The data is described in full in `data-model.md`.

# 6. Design Requirements

The site must:

* Look like a professional dashboard, following the style of Shopify's admin (Polaris).
* Use the Kelpkin and Shiver colors and fonts, stored as CSS variables in `brand.css`.
* Keep every text color at a contrast of at least 4.5 against its background.
* Use one main button per page.
* Use sentence case for every label, heading, button, and message.

# 7. Course Requirements (TESD 1100)

| Requirement | Where it's met |
| --- | --- |
| A layout with 3 to 8 columns | Overview metric cards (4), Reps table (6), Posts table (7), Posts card grid (3) |
| At least 2 images or other media | Shiver logo, social media icons, post thumbnails, Overview chart |
| Navigation between 3 pages | Sidebar links to Overview, Reps, and Posts |
| JavaScript that changes the page | Tabs, search, sort, side panel, popups, approve and reject, toasts, chart, ☰ menu, greeting |
| Works on phones | Phone layout below 768px wide |

# 8. Phone Requirements

Below 768px wide, the site must:

* Hide the sidebar behind a ☰ menu button.
* Stack the page into one column.
* Show 2 metric cards per row instead of 4.
* Keep tables readable, with each cell on one line and the table scrolling sideways inside its card.
* Fit popups and the side panel to the screen.

# 9. Current Scope

The following functionality is within the scope of Phase 3:

* Three linked pages with a shared top bar and sidebar.
* An Overview page with a greeting, metric cards, a chart, a review list, and top reps.
* A Reps page with filtering, searching, sorting, and a side panel.
* Adding representatives, with codes made automatically.
* A Posts page with a review step: approve, reject, and approve all.
* Adding posts by hand.
* Points calculated from history.
* Rep statuses, social accounts, and post sources.
* Built-in form validation.
* Toasts, empty states, and styled popups.
* A phone layout.
* Sample data stored in memory.
* Separation of PR activity from sales activity.

# 10. Out of Scope

The following functionality is specifically outside the scope of Phase 3:

* Saving data between page loads.
* Database storage.
* Login and the rep-facing PR Portal.
* Processing point redemptions (sample redemptions appear in history only).
* Deleting representatives, or changing a representative's status.
* Editing representatives or posts.
* Adding social accounts.
* Real sales data.
* Shopify integration.
* Automated Instagram and Facebook post detection.
* Real links to posts on social media.
* Production deployment.

These features are planned for future phases as additional technologies and programming concepts are introduced.

# 11. Known Constraints

## 11.1 Data Resets on Reload

All data lives in memory, so every change is lost when the page is reloaded.

## 11.2 Duplicate Representatives

Adding a representative does not check for duplicates. Two representatives with the same first name get the same codes, and the same email can be added twice. Codes must be unique before they can be used at checkout.

## 11.3 Names in Codes

First names with apostrophes or accents go into the codes as typed.

## 11.4 Dates Count from Today

The chart and "Posted N days ago" count back from today's date, so the sample posts slowly move off the chart as real days pass.

## 11.5 Future Dates

The Add post date field allows dates in the future.

## 11.6 Toasts

Two toasts shown within 3 seconds share the screen badly, and the first one's timer hides the second early.

## 11.7 Shop Details

The shop name and initials are typed into each page instead of coming from the data.

## 11.8 Internet Connection

The fonts, icons, and chart library load from the internet, so the site needs a connection.

# 12. Future Development

Potential future development includes:

* A database, so changes are saved (Phase 4).
* Running Shiver inside the Shopify admin (Phase 5).
* Sales tracking from each rep's PR code.
* A Reports page with sales and post charts (Phase 6).
* The PR Portal, with login for representatives.
* Invite emails for new representatives.
* Adding social accounts when adding or editing a representative.
* Buttons to pause, reactivate, or mark a representative inactive.
* A Settings page, including auto-approve for detected Instagram and Facebook posts.
* Links from each post to the real post.
* Duplicate checks for names, emails, and codes.
* A dark mode.
* A footer on every page.

These features will be evaluated and implemented in later phases as appropriate.

# 13. Success Criteria

Phase 3 will be considered successful if it can:

1. Link three pages through a shared sidebar and top bar.
2. Show a summary of the PR team on the Overview page, including a working chart.
3. Filter, search, and sort the representatives table.
4. Show each representative's details and history in a side panel.
5. Add a representative as invited, with their codes made automatically.
6. Approve and reject posts one at a time, and approve all pending posts after confirming.
7. Give points only once per post.
8. Add a post by hand and give the representative its points.
9. Calculate balances, total earned, and total redeemed from history.
10. Reject invalid form input using the browser's built-in checks.
11. Show a message for every action and every empty list.
12. Work on desktop and on phones.
13. Meet the TESD 1100 requirements for columns, media, navigation, and JavaScript.
14. Keep data, rules, and display code in separate files, ready for a database.
15. Clearly communicate the site's current limitations.

# 14. What Changed from Phase 2

| Area | Phase 2 | Phase 3 |
| --- | --- | --- |
| Platform | JavaFX desktop app | Website that runs in any browser |
| Interface | One window with four tabs | Three pages linked by a sidebar, plus a phone layout |
| Storage | Saved to a text file after every change | Sample data in memory, reset on reload |
| Logging posts | Every post earns points right away | Posts are pending until the owner approves or rejects them |
| Points per post | Fixed at 10 | 10 by default, set by the owner on posts they add |
| Rep status | None | Active, paused, or invited |
| Codes | Typed in by the owner | Made from the rep's first name |
| Social accounts | None | One per platform per rep |
| History | View History window | Side panel with codes, accounts, stats, and history |
| Summary | None | Overview page with metric cards and a chart |
| Redemptions | Redeem tab | Shown in history only. Processing comes in a later phase |
| Deleting reps | One or more, with confirmation | Not available in this phase |
| Validation | Hand-written checks with pop-up messages | The browser's built-in form checks |
| Testing | A 53-case written test plan | A full click-through on desktop and phone, Console checks, and contrast checks |