# PR App Phase 2 Design Document

*Phase 2 (TESD 1800) | Shiver by Kelpkin | Class design, decisions, GUI, and build order, updated to match the finished build*

## 1. Overview

Phase 2 rebuilds the Phase 1 console prototype as a JavaFX desktop application that uses classes, ArrayLists, and file saving. This document records the class design, the decisions behind it, the GUI, and the build order. It was written before the build and has been updated at the end of Phase 2 so that it describes the app as built. Where the build differs from the original plan, the difference is listed at the end of Section 2.

The app is named Shiver, and Kelpkin is the company that makes it. The long-term goal is a Shopify app sold to other shop owners (see Section 9). Phase 2 is a prototype on that path, so the design keeps the screens thin and puts the rules in their own classes. When the GUI is replaced in a later phase, the rules should barely change. The build passed all 53 of its written test cases (see Section 11).

## 2. What Changes from Phase 1

| Area | Phase 1 | Phase 2 |
| --- | --- | --- |
| Data storage | Fixed-size arrays and a 2D String array | Rep, Post, and PointTransaction objects in ArrayLists |
| Capacity limits | MAX\_CAPACITY, POST\_CAP, HISTORY\_CAP | None. ArrayLists grow on their own |
| Rep identity | Row position in repData, email checked for duplicates | Unique auto-assigned id on every Rep. Email stays unique |
| Post count | Stored in repData | Calculated by counting a rep's posts |
| Point total | Stored in repData | Calculated by summing a rep's point transactions |
| Posts | No ID | Own unique id |
| Point history | No ID, no link to a post, no date | Own id, a postId link, and a date |
| Interface | Console menu | JavaFX window with tabs |
| Persistence | All data lost on exit | Saved to a readable text file after every change and loaded when the app starts |
| Code structure | Static methods in one Main file | Classes that each do one job |

### Changes made during the build

| Area | Original plan | As built | Why |
| --- | --- | --- | --- |
| Points manager name | PostPointsManager | PointsManager | Shorter, and it handles points as well as posts |
| PointTransaction | id, repId, postId, amount, reason | Also a date | The owner wanted to see when each point change happened |
| Post URL lookup | Not planned | PointsManager.getPostUrl(postId) | View History shows the post link for each transaction |
| Delete | Delete one rep | Delete one or more reps at a time | Selecting several rows is quicker for the owner |
| Constructors | One constructor per data class | A second constructor on each, which takes a saved id | A loaded record has to keep the id it was saved with |
| ID counters | Counters restart at 1 each run | Counters are saved in the data file and restored on load | Keeps the rule "ids are never reused" true across restarts |
| FileHandler | Rough draft of save and load | save(reps, posts, transactions) and load(repManager, pointsManager) | Written once file input and output was covered |
| When data is saved | On exit, or not decided | After every change, and again when the window closes | Data survives a crash or a stop from the editor |
| Data file layout | Not decided | Labeled sections with one pipe-separated record per line | Easy to read and to search by hand |
| Input checks | Email, URL, and amount rules | Also a blank-name check and a block on the pipe character | The pipe separates the fields in the data file, and a rep needs a name |
| Look and feel | Plain first, styled later | Styled with Kelpkin base colors and the Shiver aqua accent | Branding decision made during the build |

## 3. Class Overview

There are seven classes, one file each.

| Class | Job | File |
| --- | --- | --- |
| Rep | Holds one rep's information | Rep.java |
| Post | Holds one post's information | Post.java |
| PointTransaction | Holds one point change | PointTransaction.java |
| RepManager | Holds the reps and applies the rep rules | RepManager.java |
| PointsManager | Holds posts and transactions and applies the points rules | PointsManager.java |
| FileHandler | Saves and loads data | FileHandler.java |
| Main | Builds the GUI and launches the app | Main.java |

```text
Main (GUI and launcher)
 ├── RepManager       holds reps
 ├── PointsManager    holds posts and point transactions
 └── FileHandler      saves and loads

Data classes: Rep, Post, PointTransaction
```

Main knows about the managers, and the managers know about the data classes. Nothing points back up, which keeps Main thin. FileHandler is handed the managers' data when it saves and fills the managers when it loads.

## 4. Class Details

### Rep

```text
+--------------------------------------------------------------+
|                             Rep                              |
+--------------------------------------------------------------+
| - nextId: int {static}                                       |
| - id: int                                                    |
| - name: String                                               |
| - email: String                                              |
| - discountCode: String                                       |
| - personalCode: String                                       |
+--------------------------------------------------------------+
| + Rep(name, email, discountCode, personalCode)               |
| + Rep(id, name, email, discountCode, personalCode)           |
| + getId(): int                                               |
| + getName(): String                                          |
| + getEmail(): String                                         |
| + getDiscountCode(): String                                  |
| + getPersonalCode(): String                                  |
| + setName(name: String): void                                |
| + setEmail(email: String): void                              |
| + setDiscountCode(discountCode: String): void                |
| + setPersonalCode(personalCode: String): void                |
| + getNextId(): int {static}                                  |
| + setNextId(newNextId: int): void {static}                   |
| + toString(): String                                         |
+--------------------------------------------------------------+
```

The first constructor creates a new rep and assigns the next id. The second constructor rebuilds a saved rep and keeps the id it was saved with.

### Post

```text
+--------------------------------------------------------------+
|                            Post                              |
+--------------------------------------------------------------+
| - nextId: int {static}                                       |
| - id: int                                                    |
| - repId: int                                                 |
| - platform: String                                           |
| - url: String                                                |
+--------------------------------------------------------------+
| + Post(repId, platform, url)                                 |
| + Post(id, repId, platform, url)                             |
| + getId(): int                                               |
| + getRepId(): int                                            |
| + getPlatform(): String                                      |
| + getUrl(): String                                           |
| + getNextId(): int {static}                                  |
| + setNextId(newNextId: int): void {static}                   |
| + toString(): String                                         |
+--------------------------------------------------------------+
```

### PointTransaction

```text
+--------------------------------------------------------------+
|                      PointTransaction                        |
+--------------------------------------------------------------+
| - nextId: int {static}                                       |
| - id: int                                                    |
| - repId: int                                                 |
| - postId: int          (-1 means no post)                    |
| - amount: int                                                |
| - reason: String                                             |
| - date: LocalDate                                            |
+--------------------------------------------------------------+
| + PointTransaction(repId, postId, amount, reason)            |
| + PointTransaction(id, repId, postId, amount, reason, date)  |
| + getId(): int                                               |
| + getRepId(): int                                            |
| + getPostId(): int                                           |
| + getAmount(): int                                           |
| + getReason(): String                                        |
| + getDate(): LocalDate                                       |
| + getNextId(): int {static}                                  |
| + setNextId(newNextId: int): void {static}                   |
| + toString(): String                                         |
+--------------------------------------------------------------+
```

Amount is positive for points earned and negative for points redeemed. Reason holds text such as "Post logged" or "Redeem for Cash Payout". The first constructor sets the date to today. The second constructor keeps the saved date, so a loaded transaction shows the day it happened and not the day the app was reopened.

### RepManager

```text
+--------------------------------------------------------------+
|                         RepManager                           |
+--------------------------------------------------------------+
| - reps: ArrayList<Rep>                                       |
+--------------------------------------------------------------+
| + RepManager()                                               |
| + addRep(name, email, discountCode, personalCode): boolean   |
| + deleteRep(repId: int): boolean                             |
| + getReps(): ArrayList<Rep>                                  |
| + emailExists(email: String): boolean                        |
| + isValidEmail(email: String): boolean {static}              |
+--------------------------------------------------------------+
```

### PointsManager

```text
+--------------------------------------------------------------+
|                        PointsManager                         |
+--------------------------------------------------------------+
| - posts: ArrayList<Post>                                     |
| - transactions: ArrayList<PointTransaction>                  |
| - POINTS_PER_POST: int {constant}                            |
+--------------------------------------------------------------+
| + PointsManager()                                            |
| + logPost(repId, platform, url): boolean                     |
| + redeemPoints(repId, amount, type): boolean                 |
| + getPostCount(repId: int): int                              |
| + getPoints(repId: int): int                                 |
| + getHistory(repId: int): ArrayList<PointTransaction>        |
| + getPostUrl(postId: int): String                            |
| + deleteForRep(repId: int): void                             |
| + getPosts(): ArrayList<Post>                                |
| + getTransactions(): ArrayList<PointTransaction>             |
| + addLoadedPost(post: Post): void                            |
| + addLoadedTransaction(transaction: PointTransaction): void  |
+--------------------------------------------------------------+
```

The last four methods exist for FileHandler. The two getters let it read every post and transaction when saving. The two add methods put a rebuilt post or transaction back into the lists when loading, without creating a new record or awarding points the way logPost does.

### FileHandler

```text
+--------------------------------------------------------------+
|                         FileHandler                          |
+--------------------------------------------------------------+
| - FILE_NAME: String {constant}                               |
+--------------------------------------------------------------+
| + save(reps, posts, transactions): void                      |
| + load(repManager, pointsManager): void                      |
+--------------------------------------------------------------+
```

FILE_NAME is `pr-app/src/shiver-data.txt`. Both methods can throw a FileNotFoundException, and Main catches it. FileHandler holds no data of its own.

### Main

```text
+--------------------------------------------------------------+
|                            Main                              |
|                    (extends Application)                     |
+--------------------------------------------------------------+
| - repManager: RepManager                                     |
| - pointsManager: PointsManager                               |
| - fileHandler: FileHandler                                   |
+--------------------------------------------------------------+
| + start(primaryStage: Stage): void                           |
| + main(args: String[]): void {static}                        |
| - getSelectedReps(table): ArrayList<Rep>                     |
| - saveData(): void                                           |
+--------------------------------------------------------------+
```

getSelectedReps returns the rows selected on the Team tab, or shows "Please select a rep first" and returns nothing when no row is selected. saveData calls FileHandler.save and catches its exception, so each button handler can save with one line.

### How IDs are assigned

Rep, Post, and PointTransaction each keep a static nextId counter. When a new object is created with the first constructor, it takes the current counter value as its id and the counter goes up by one. IDs are never reused, so deleting a rep does not cause a later rep to inherit an old id.

IDs also survive a restart. FileHandler writes the three counters to the first record of the data file, and load restores them. Each counter has a setNextId method that only ever raises the counter and never lowers it, so loading the counters in any order cannot cause a repeat. The second constructor on each class also raises the counter when it rebuilds a saved record, so a file without the counters line still loads correctly.

### File saving and loading

The app saves to one text file, `pr-app/src/shiver-data.txt`, relative to the folder the app is launched from. The file is created on the first save. It is meant to be easy to read by hand, so it is split into labeled sections.

```text
# NEXT IDS: rep|post|transaction
NEXT|2|2|3

# REPS: id|name|email|discount code|personal code
REP|1|Brody|brody@test.com|BRODY10|BRODYPR

# POSTS: id|rep id|platform|url
POST|1|1|Facebook|https://example.com/amity-beach

# TRANSACTIONS: id|rep id|post id|amount|reason|date
TX|1|1|1|10|Post logged|2026-10-26
TX|2|1|-1|-5|Redeem for Cash Payout|2026-10-26
```

| Rule | Detail |
| --- | --- |
| One record per line | The first word is the record type: NEXT, REP, POST, or TX |
| Fields | Separated by the pipe character |
| Headings and blank lines | Lines starting with # and blank lines are skipped on load, because they match no record type |
| Dates | Saved as year-month-day and read back into a LocalDate |
| When the app saves | After a rep is added, a post is logged, points are redeemed, and reps are deleted, and again when the window closes |
| When the app loads | When it starts. If there is no file, the app starts empty |
| The pipe character | Blocked in every text field, because it would break the record |

## 5. Relationships

### Who holds what

| Holder | Holds a list of |
| --- | --- |
| RepManager | Rep |
| PointsManager | Post and PointTransaction |
| Main | One RepManager, one PointsManager, one FileHandler |

FileHandler holds no data of its own. It reads from and fills the two managers.

### How records link

Records are linked by matching ID numbers, not by holding each other.

| From | Field | Matches | Meaning |
| --- | --- | --- | --- |
| Post | repId | Rep.id | Which rep made the post |
| PointTransaction | repId | Rep.id | Whose balance changed |
| PointTransaction | postId | Post.id | Which post earned the points (-1 if none) |

| Relationship | Count |
| --- | --- |
| Rep to Post | 1 to many |
| Rep to PointTransaction | 1 to many |
| Post to PointTransaction | 1 to 0 or 1 (a post earns at most one transaction) |

### Example

```text
REPS                 POSTS                          TRANSACTIONS
id | name            id | repId | platform          id | repId | postId | amount | reason
1  | Brody           1  | 1     | Facebook          1  | 1     | 1      | +10    | Post logged
2  | Quint           2  | 1     | TikTok            2  | 1     | 2      | +10    | Post logged
                     3  | 2     | Instagram         3  | 1     | -1     | -5     | Redeem for Cash Payout

Brody's post count = 2 (posts with repId 1)
Brody's balance    = 10 + 10 - 5 = 15 (sum of his transactions)
```

## 6. Key Design Decisions

| Decision | Choice | Reason |
| --- | --- | --- |
| Rep identification | Unique auto-assigned id on every Rep | Stable for later phases. Emails can change, ids never do |
| Post count | Calculated by counting posts | Cannot drift out of sync with the posts themselves |
| Point balance | Calculated by summing transactions | Works like a ledger with one source of truth, and history comes built in |
| Post id | Post gets its own id | Future database primary key, row selection in the GUI, tells duplicate URLs apart |
| PointTransaction id, postId, and date | All added, postId is -1 when no post | Lets the history show which post earned a transaction and when it happened |
| Manager structure | Three classes: RepManager, PointsManager, FileHandler | Each class has one job, no box is crowded, and FileHandler is the piece a database replaces later |
| Deleting a rep | Deletes the rep, their posts, and their transactions, after a confirmation. One or several reps can be selected | Simple and clean for now |
| GUI layout | One window with tabs | Fewer clicks than a menu with separate screens |
| History drill-down | Select a row, then click View History | Simple to build. A history panel can be added later |
| File format | Readable text file, written with PrintWriter and read with Scanner | Easy to open and check by hand, and close to how a database table looks. A binary object file was shorter to write but cannot be read |
| When to save | After every change, plus when the window closes | Nothing is lost if the app crashes or is stopped from the editor |
| Saved ID counters | A NEXT record at the top of the file | Ids are never reused, even after the highest-id rep is deleted and the app restarts |
| Pipe character | Blocked in the text fields | It separates the fields in the data file, and one typed into a name would break the next load |
| Branding | The app is Shiver and the company is Kelpkin, shown as "by Kelpkin" next to the app name | Matches how the app will be listed in the Shopify store |
| Colors | Kelpkin base colors with the Shiver aqua as the app accent | Shares a base with future Kelpkin apps while keeping Shiver's own look |

### Alternatives considered

| Topic | Option not chosen | Why not |
| --- | --- | --- |
| Post count and points | Stored totals like Phase 1 | Two things to keep in sync |
| Managers | One PRManager | Grew to 13 methods and three unrelated jobs |
| Managers | Splitting further by every job | More classes and connections than the project needs |
| Deleting a rep | Block the delete if the rep has activity | Owner could not remove old reps |
| Deleting a rep | Mark the rep inactive and keep records | Needs an extra field. Better record keeping, saved for a later phase |
| File format | Binary object file | Shorter code, but the file cannot be read or searched by hand |
| When to save | Only when the window closes | Data is lost if the app crashes or is stopped from the editor |
| Pipe character | Let load skip bad lines | Hides the problem instead of preventing it. Blocking the character at the source is simpler |
| ID counters | Leave them to restart from the highest saved id | An id could be reused after a restart, which broke the rule that ids are never reused |
| Colors | Use the Kelpkin palette for every part of Shiver | Shiver would lose its brighter aqua accent |

### Differences from the submitted proposal

The proposal named Rep and Post and a manager object. This design goes beyond it in two ways: a third data class (PointTransaction) to support the calculated point balance, and three manager classes instead of one.

## 7. GUI

One JavaFX window with a banner and four tabs: Team, Add Rep, Log Post, and Redeem.

### Look and feel

The banner shows "Shiver" with "by Kelpkin" beside it on the same row, and the tagline "Your PR team, swimming in sync." below. The banner and the strip behind the tab buttons share one dark teal, so they read as one block. The open tab turns aqua. Each tab has a cream background with a white card in the center, and every button is aqua with dark teal text. A text field that is selected shows an aqua ring.

| Part | Color |
| --- | --- |
| Banner and tab strip | Dark teal #124049 |
| Page background on every tab | Cream #eee6d7 |
| Title and "by Kelpkin" text | Off-white #f5f1ea |
| Open tab, buttons, focus ring, and tagline | Shiver aqua #4FB3BF |
| Text on aqua, and success messages | Dark teal #124049 |

The colors are set in code for now. A CSS file that holds them in one place is planned for Phase 3.

### Team tab (replaces the Phase 1 dashboard)

```text
+--------------------------------------------------------------+
| [ Team ] [ Add Rep ] [ Log Post ] [ Redeem ]                 |
+--------------------------------------------------------------+
|  Name    | Email           | Discount | Personal Code | Posts | Points |
|  Brody   | brody@test.com  | BRODY10  | BRODYPR       |   2   | 15     |  <- selected
|  Quint   | quint@test.com  | QUINT10  | QUINTPR       |   1   | 10     |
|                                                              |
|                      [ View History ]   [ Delete ]           |
+--------------------------------------------------------------+
```

- One or more rows can be selected at the same time.
- View History opens a second window titled with the rep's name, such as "Brody Point History". It lists the selected rep's transactions with their date, amount, reason, and the post URL where there is one. When several rows are selected, it opens for the first.
- Delete asks how many reps will be deleted and warns that their posts and point history are deleted too. There is no undo. A rep is only removed after the owner confirms.
- With no row selected, both buttons show "Please select a rep first".

### Add Rep tab

```text
  Name:                       [________________]
  Email:                      [________________]
  Discount Code:              [________________]
  Personal Discount Code:     [________________]
                                        [ Add ]
```

### Log Post tab

```text
  Name:       Dropdown selection (the owner picks a name, not an id)
  Platform:   Dropdown (YouTube, TikTok, Instagram, Facebook, Substack)
  URL of Post:[________________]
                                        [ Add ]
```

### Redeem tab

```text
  Name:                         Dropdown selection
  Current points:               15  (updates when a rep is picked and when the tab opens)
  How many points to redeem:    [_______]
  Type:                         Dropdown (Cash Payout, Product, Store Credit)
                                        [ Redeem ]
```

### Messages

Pop-up messages replace the Phase 1 printed messages. Success messages appear next to the button, in dark teal.

| Situation | Message |
| --- | --- |
| Blank name | Name cannot be empty. |
| Invalid email | Invalid email |
| Duplicate email | Email already exists |
| A pipe character typed in a text field | An invalid character message |
| Invalid URL | Invalid URL. Must start with https:// |
| No rep or platform chosen on Log Post | Please select a rep and a platform |
| No rep or type chosen on Redeem | Please select a rep and a type |
| Redeeming more than the balance, zero or less, or a non-number | Invalid amount |
| Nothing selected on the Team tab | Please select a rep first |
| Rep added | PR Rep added successfully. |
| Post logged | Post logged successfully |
| Points redeemed | Points redeemed successfully. |

## 8. Rules Carried Over from Phase 1

- A rep must have a name.
- Email must contain an @ symbol and a dot after the @, and must be unique across reps.
- Supported platforms: YouTube, TikTok, Instagram, Facebook, and Substack, all by manual link submission.
- A post URL must start with https://.
- Every logged post earns a flat number of points, set by the POINTS\_PER\_POST constant (10 in Phase 1 and Phase 2).
- A redemption must be greater than zero and cannot exceed the rep's current balance, so a balance never goes negative.
- Every redemption records its type (Cash Payout, Product, or Store Credit) in the transaction reason.
- Every point change is recorded as a transaction.
- PR activity stays separate from sales. Sales tracking is not part of this phase.

## 9. Future Notes (Not in the Phase 2 Build)

| Item | Detail |
| --- | --- |
| Settings tab | Lets the owner set the points value per post. POINTS\_PER\_POST would become a changeable value that is saved to the file. Past transactions keep the points they were given |
| History panel | Upgrade from the View History window to a panel that shows each transaction's source post |
| PR Applications | A planned feature for a later phase. It is not part of the Phase 2 build |
| CSS file | Move the colors and styles out of the Java code and into one CSS file in Phase 3, so the look can change without touching the code |
| Brand colors across apps | Decide whether future Kelpkin apps share one palette or each get their own accent color |
| Multiple shops | A product sold to many shops needs a shopId on every record so one shop cannot see another's data. Planned for when the database and Shopify connection arrive |
| Database | FileHandler is the piece replaced by a database |
| Web front end | The JavaFX GUI is a prototype. A later phase replaces it with a web interface, which is why the rules live in the managers and not in Main |
| Inactive reps | Possible replacement for delete, keeping records while hiding the rep |
| Input checks in the managers | The blank-name and pipe checks currently live in Main's button handlers. A later phase can move them into RepManager and PointsManager so every front end shares them |
| Clearing dropdowns | Add a way to clear a chosen rep, platform, or type without restarting the app |

## 10. Build Order

Build from the bottom of the class diagram upward, testing as each layer is finished.

| Step | Build | Reason | Status |
| --- | --- | --- | --- |
| 1 | Rep, Post, PointTransaction | Depend on nothing else | Done |
| 2 | RepManager | Needs only Rep | Done |
| 3 | PointsManager | Needs Post and PointTransaction | Done |
| 4 | Test steps 1 to 3 with a small throwaway main | Finds rule bugs before any GUI exists | Done |
| 5 | Main with the Team and Add Rep tabs | First screens that can be seen and clicked | Done |
| 6 | Log Post and Redeem tabs | Same pattern as Add Rep | Done |
| 7 | FileHandler | Saving comes last, once everything else works | Done |

Work added after the original plan:

| Addition | Reason |
| --- | --- |
| Styling and Kelpkin branding | The plain version worked, so it was styled afterward as planned |
| Second constructors and saved ID counters | Needed so a loaded record keeps its id |
| Autosave after every change | Protects data from a crash or a stop from the editor |
| Blank-name and pipe checks | Found by testing and by thinking through what a saved line could break |
| Readable, labeled data file | Easier to check by hand |
| Written test plan, run in full | Replaced unit testing, which this course does not cover |

## 11. Testing Plan

The Phase 1 test cases (add rep, log post, redeem points, view dashboard) carry over with the same expected results, and only the way each one is triggered changes, from typing to clicking. The main menu and capacity limit tests were dropped, because there is no console menu and ArrayLists have no fixed capacity.

The full list of cases and their results is in `pr-app-phase2-test-cases.md`. All test data uses characters from Jaws.

| Area | Cases | What it covers |
| --- | --- | --- |
| Add a PR Rep | 9 | Valid adds, blank name, bad emails, duplicate email, pipe character |
| Log a Post | 8 | Valid posts, missing choices, bad URL, pipe character, all five platforms |
| Redeem Points | 10 | Valid redemptions, bad amounts, missing type, exact balance, points label updates |
| Team Tab and View History | 4 | Table values, history window, nothing selected |
| Calculated Values | 3 | Post counts and balances match the underlying records |
| Delete a Rep | 5 | Cancel, one rep, several reps, dropdowns refresh |
| IDs | 4 | Ids are unique and are not reused, even after a restart |
| File Saving and Loading | 6 | First run, file contents, reload, stop from the editor |
| User Interface | 4 | Banner, tab colors, focus ring, success messages |

**Result:** 53 of 53 cases pass. One case, the blank name check, failed on the first run, was logged as BUG-01, fixed, and passed on the retest.

## 12. Known Limitations

- The Log Post and Redeem dropdowns cannot be cleared once a rep, platform, or type is chosen.
- The pipe character cannot be used in any text field.
- The data file path is relative to the folder the app is launched from, so the app must be run from the folder that contains `pr-app`.
- The data file is plain text, so a file edited by hand that breaks the format may stop the app from loading it.
- The blank-name and pipe checks are in the button handlers in Main, not in the managers.
- All data is stored in one local file. It is not shared between computers and has no backup.