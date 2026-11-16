# PR App Requirements

*Phase 2 (TESD 1800) | Shiver by Kelpkin*

## Documentation

The Phase 1 version of this document, which describes the console prototype, is in `docs/phase-1/requirements.md`.

# 1. Project Overview

Shiver is a Java desktop application, made by Kelpkin, that helps small business owners manage their public relations (PR) teams.

In this application, PR representatives promote a shop's products through social media. Instead of receiving traditional monetary compensation, representatives are rewarded through points that can be redeemed for cash, products, or store credit.

The Phase 2 version rebuilds the Phase 1 console prototype as a JavaFX window. It keeps the core logic from Phase 1, which manages PR representatives, tracks promotional posts, awards points, tracks point history, and processes point redemptions. It adds classes, ArrayLists, a graphical interface, and saving data to a file.

This version is intentionally limited to the Java functionality covered in the current course: classes, collections, JavaFX, and file input and output. Features requiring external platforms, APIs, databases, or other technologies will be addressed in future phases.

# 2. Target Users

The primary users of the application are small business owners who manage PR teams.

The initial target market is small businesses in the planner sticker and stationery community, particularly businesses operated by one or two people.

The application is intended to reduce the amount of manual work required to track PR representatives and their contributions.

# 3. Functional Requirements

## 3.1 PR Representative Management

The application must allow the shop owner to:

* Add a new PR representative.
* Store the representative's name, and require that a name be entered.
* Store the representative's email address.
* Store the representative's discount code.
* Store the representative's personal PR code.
* Give each representative a unique ID number assigned by the application, which is never reused.
* Identify each representative by a unique email address as well.
* Prevent duplicate email addresses from being added.
* Display an appropriate message when an email address is already associated with another representative.
* View all representatives in a table that shows each one's name, email, discount code, personal code, post count, and point balance.
* Delete one or more representatives after confirming. Deleting a representative also deletes all of their posts and point transactions.

A representative's post count and point balance are calculated from the posts and transactions that belong to them. They are not stored on the representative.

## 3.2 Email Validation

The application must validate email addresses when a PR representative is added.

At minimum, the application must check for common formatting errors, including the absence of an `@` symbol or the absence of a dot after the `@` symbol.

Invalid email addresses must not be accepted as valid representative records.

## 3.3 PR Post Tracking

The application must allow the shop owner to record promotional posts made by PR representatives.

A post must be associated with the PR representative who created it, using the representative's ID.

Each post must have its own unique ID and must store the platform and the submitted link.

The prototype must support tracking promotional activity separately from sales activity.

## 3.4 Supported Social Media Platforms

The prototype must allow PR representatives to submit links to promotional content on any of the following platforms:

* YouTube
* TikTok
* Instagram
* Facebook
* Substack

All platforms in Phase 2 use manual link submission. The representative submits a link to their post and the application records it without connecting directly to any external platform. A link must start with `https://`.

Automated platform integration, including hashtag verification and shop-tag verification for Instagram and Facebook, is outside the scope of this prototype and is planned for Phase 5.

## 3.5 Point Management

The application must maintain a point balance for each PR representative, calculated as the sum of that representative's point transactions.

The application must award points to a representative each time a post is logged.

Points must be associated with the appropriate PR representative.

The application must allow the shop owner to view a representative's current point balance, in the Team table and on the Redeem tab. The balance shown on the Redeem tab must be refreshed when a representative is picked and when the tab is opened.

A flat points-per-post value will be set as a constant and applied consistently across all posts.

## 3.6 Point History

The application must maintain a record of all point transactions for each PR representative.

Each point history entry must store:

* A unique ID for the transaction.
* The ID of the PR representative the transaction belongs to.
* The ID of the post that earned the points, or -1 when the change did not come from a post.
* The number of points changed (positive for points earned, negative for points redeemed).
* The reason for the point change.
* The date of the change.

Point history must be recorded automatically when:

* Points are awarded following a logged post.
* Points are deducted following a processed redemption.

The shop owner must be able to select a representative and view that representative's history in a separate window. The history must show each transaction's date, amount, and reason, and the post link for transactions that came from a post.

## 3.7 Point Redemption

The application must allow the shop owner to process a PR representative's point redemption.

Before processing a redemption, the application must compare the requested redemption amount against the representative's current point balance.

The application must prevent a redemption from causing the representative's point balance to become negative.

If the requested redemption is not a whole number, is zero or less, or exceeds the available point balance, the application must reject the transaction and show an "Invalid amount" message.

The application must allow the owner to choose whether the redemption is for cash payout, product, or store credit. This choice must be recorded in the reason of the point transaction.

## 3.8 Sales Tracking

The application must treat PR activity and sales as separate types of activity.

The current prototype does not include sales tracking. Sales tracking is directly tied to Shopify's API and will be implemented in Phase 5 when Shopify integration is introduced.

The application architecture should allow sales tracking to be expanded in future versions without requiring significant restructuring of the core logic.

## 3.9 Saving and Loading Data

The application must keep its data between runs.

* The application must save all representatives, posts, and point transactions to a file after every change, which means after a representative is added, a post is logged, points are redeemed, or representatives are deleted.
* The application must also save when the window is closed.
* The application must load the saved data when it starts.
* If no data file exists, the application must start with no data and create the file the first time it saves.
* The saved file must also keep the next ID for representatives, posts, and transactions, so that an ID is never used twice, even after a representative is deleted and the application is restarted.
* A transaction's date must be kept when the data is saved and loaded.
* The file must be in a readable text form, with a labeled section for each kind of record.

# 4. Input Validation Requirements

The application must validate user input before processing it whenever invalid input could cause an error or produce an invalid result.

| Input | Rule | Message |
| --- | --- | --- |
| Rep name | Must not be blank or only spaces | Name cannot be empty. |
| Rep email | Must have an `@` and a dot after it | Invalid email |
| Rep email | Must not already belong to another rep | Email already exists |
| Any text field | Must not contain the pipe character, because it separates the fields in the data file | An invalid character message |
| Rep and platform on Log Post | Both must be chosen | Please select a rep and a platform |
| Post URL | Must start with `https://` | Invalid URL. Must start with https:// |
| Rep and type on Redeem | Both must be chosen | Please select a rep and a type |
| Redemption amount | Must be a whole number, above zero, and no more than the balance | Invalid amount |
| Team tab buttons | A row must be selected | Please select a rep first |

When invalid input is entered, the application must show a clear pop-up message and leave all data unchanged. Reps, platforms, and redemption types are chosen from dropdowns, so they cannot be mistyped.

# 5. Data Storage Requirements

While the app runs, the data is stored in memory in ArrayLists:

* PR representatives in a list of Rep objects.
* Posts in a list of Post objects.
* Point transactions in a list of PointTransaction objects.

The data is also saved to a text file, `shiver-data.txt`, as described in Section 3.9.

No database is used in Phase 2. Database storage is intentionally outside the scope of this version and will be implemented in a future phase.

# 6. Capacity Requirements

The application has no fixed capacity. ArrayLists grow as records are added, so the Phase 1 limits of 100 representatives, 500 posts, and 1000 point history entries, and the checks that enforced them, no longer exist.

# 7. User Interaction Requirements

The application must provide a window with four tabs:

* Team, which shows the representatives table with View History and Delete buttons.
* Add Rep, which holds the form for adding a representative.
* Log Post, which holds the form for recording a post.
* Redeem, which holds the form for processing a redemption.

The window must show the app name, Shiver, with the company name, Kelpkin, and the tagline "Your PR team, swimming in sync." in a banner at the top.

The application should give clear feedback after every user action, with a pop-up for each error and a short message next to the button for each success.

The open tab must be easy to tell apart from the other tabs, and a selected text field must be easy to see.

The window can be closed at any time. There is no menu to return to.

# 8. Current Scope

The following functionality is within the scope of the Phase 2 prototype:

* PR representative management, including deleting representatives.
* Unique representative identification through an ID and through email addresses.
* Basic email validation.
* PR post tracking.
* Manual social media post link submission for YouTube, TikTok, Instagram, Facebook, and Substack.
* Point tracking, with the balance calculated from transactions.
* Point awarding.
* Point history tracking, with a date and a link to the post.
* Point redemption with a redemption type (cash payout, product, or store credit).
* Input validation.
* ArrayList storage with no capacity limits.
* Saving to and loading from a text file.
* A JavaFX window with four tabs and a branded banner.
* Separation of PR activity from sales activity.
* A written test plan that was run in full.

# 9. Out of Scope

The following functionality is specifically outside the scope of the current prototype:

* Automated Instagram post detection.
* Automated Facebook post detection.
* Automated hashtag verification.
* Automated shop-tag verification.
* Shopify integration.
* Automated sales tracking.
* Automatic discount code generation.
* Database storage.
* Full web application functionality.
* Automated social media data retrieval.
* Production deployment.

These features are planned for future phases as additional technologies and programming concepts are introduced.

# 10. Known Constraints

## 10.1 Duplicate Email Addresses

Each PR representative must have a unique email address. The application must check for an existing matching email address before adding a new representative.

## 10.2 Invalid Email Addresses

The application must perform basic email format validation to catch common entry errors, including missing `@` symbols and missing dots after the `@` symbol.

## 10.3 Blank Names

A representative cannot be added without a name.

## 10.4 The Pipe Character

The pipe character cannot be used in any text field, because it separates the fields in the data file.

## 10.5 Invalid Input Types

The application must validate user input before attempting to process values that require a specific data type. For example, entering text where a number of points is expected must show a message and must not close the program.

## 10.6 Negative Point Balances

The application must prevent a point redemption from reducing a representative's balance below zero.

## 10.7 Where the Data File Lives

The data file is saved in a path that is relative to the folder the application is launched from, so the application must be run from the folder that contains `pr-app`.

## 10.8 Editing the Data File

The data file is plain text and can be edited by hand. A file that is edited so that it breaks the record format may stop the application from loading it.

## 10.9 Clearing a Choice

The rep, platform, and type dropdowns cannot be cleared once a choice has been made without restarting the application.

## 10.10 One Computer

All data is stored in one local file. It is not shared between computers and is not backed up.

# 11. Future Development

The Shiver app is intended to serve as the foundation for a larger application that will be developed throughout the Software Development program.

Potential future development includes:

* A settings tab for the points value per post.
* A history panel that shows each transaction's source post.
* PR applications.
* A CSS file for the application's colors and styles, planned for Phase 3.
* Moving the blank-name and pipe checks into the managers.
* A way to clear a chosen dropdown value.
* Inactive representatives as a replacement for delete.
* Database integration.
* Shopify integration.
* Automated sales tracking.
* Discount code generation.
* Automated Instagram post detection.
* Automated Facebook post detection.
* Automated hashtag verification.
* Automated shop-tag verification.
* Additional social media integrations.
* Web application functionality.

These features will be evaluated and implemented in later phases as appropriate.

# 12. Success Criteria

The Phase 2 prototype will be considered successful if it can:

1. Add and manage PR representatives, including deleting them.
2. Prevent duplicate representative email addresses.
3. Reject obviously invalid email addresses and blank names.
4. Record promotional posts and associate them with the correct representative.
5. Support manual link submission for YouTube, TikTok, Instagram, Facebook, and Substack.
6. Calculate each representative's post count and point balance from their records.
7. Award points for each logged post.
8. Record a point history entry, with a date, for every point transaction.
9. Process valid point redemptions with a specified redemption type.
10. Prevent point balances from becoming negative.
11. Handle invalid user input without closing unexpectedly.
12. Never give out the same ID twice, including after a restart.
13. Save its data after every change and load it again when it starts.
14. Clearly communicate the application's current limitations.
15. Demonstrate the Java programming concepts required for the course.
16. Pass its written test plan. The Phase 2 test plan has 53 cases, and all 53 pass.

# 13. What Changed from Phase 1

| Area | Phase 1 | Phase 2 |
| --- | --- | --- |
| Interface | Console menu with "enter 0 to return" at every prompt | JavaFX window with four tabs |
| Storage | Fixed-size arrays, data lost on exit | ArrayLists, saved to a file |
| Capacity | 100 reps, 500 posts, 1000 history entries | No limits |
| Rep identity | Row position and email | A unique ID and email |
| Post count and balance | Stored on each rep | Calculated from posts and transactions |
| Point history | Rep index, amount, reason | Own ID, rep ID, post ID, amount, reason, and date |
| Deleting reps | Not available | One or more reps, with confirmation |
| Input checks | Email, URL, amount, and menu choices | Also a required name and a block on the pipe character |
| Redemption types | Cash, product, or store credit | Cash Payout, Product, or Store Credit |
| Testing | Console test cases | A 53-case written test plan, run in full |