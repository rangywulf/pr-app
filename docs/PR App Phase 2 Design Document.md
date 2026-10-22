# PR App Phase 2 Design Document

*Phase 2 (TESD 1800) | Class design, decisions, GUI plan, and build order*

## 1. Overview

Phase 2 rebuilds the Phase 1 console prototype as a JavaFX desktop application that uses classes, ArrayLists, and file saving. This document records the class design, the decisions behind it, the GUI plan, and the build order. It is a design document only. Nothing described here has been built yet.

The long-term goal is a Shopify app sold to other shop owners (see Section 9). Phase 2 is a prototype on that path, so the design keeps the screens thin and puts every rule in its own class. When the GUI is replaced in a later phase, the rules should barely change.

## 2. What Changes from Phase 1

| Area | Phase 1 | Phase 2 |
| --- | --- | --- |
| Data storage | Fixed-size arrays and a 2D String array | Rep, Post, and PointTransaction objects in ArrayLists |
| Capacity limits | MAX\_CAPACITY, POST\_CAP, HISTORY\_CAP | None. ArrayLists grow on their own |
| Rep identity | Row position in repData, email checked for duplicates | Unique auto-assigned id on every Rep. Email stays unique |
| Post count | Stored in repData | Calculated by counting a rep's posts |
| Point total | Stored in repData | Calculated by summing a rep's point transactions |
| Posts | No ID | Own unique id |
| Point history | No ID, no link to a post | Own id and a postId link |
| Interface | Console menu | JavaFX window with tabs |
| Persistence | All data lost on exit | Saved to and loaded from a file |
| Code structure | Static methods in one Main file | Classes that each do one job |

## 3. Class Overview

There are seven classes, one file each.

| Class | Job | File |
| --- | --- | --- |
| Rep | Holds one rep's information | Rep.java |
| Post | Holds one post's information | Post.java |
| PointTransaction | Holds one point change | PointTransaction.java |
| RepManager | Holds the reps and applies the rep rules | RepManager.java |
| PostPointsManager | Holds posts and transactions and applies the points rules | PostPointsManager.java |
| FileHandler | Saves and loads data | FileHandler.java |
| Main | Builds the GUI and launches the app | Main.java |

```text
Main (GUI and launcher)
 ├── RepManager          holds reps
 ├── PostPointsManager   holds posts and point transactions
 └── FileHandler         saves and loads

Data classes: Rep, Post, PointTransaction
```

Main knows about the managers, and the managers know about the data classes. Nothing points back up, which keeps Main thin.

## 4. Class Details

### Rep

```text
+--------------------------------------------------+
|                       Rep                        |
+--------------------------------------------------+
| - nextId: int {static}                           |
| - id: int                                        |
| - name: String                                   |
| - email: String                                  |
| - discountCode: String                           |
| - personalPrCode: String                         |
+--------------------------------------------------+
| + Rep(name, email, discountCode, personalPrCode) |
| + getId(): int                                   |
| + getName(): String                              |
| + getEmail(): String                             |
| + getDiscountCode(): String                      |
| + getPersonalPrCode(): String                    |
| + setName(name: String): void                    |
| + setPersonalPrCode(code: String): void          |
| + toString(): String                             |
+--------------------------------------------------+
```

### Post

```text
+--------------------------------------------------+
|                       Post                       |
+--------------------------------------------------+
| - nextId: int {static}                           |
| - id: int                                        |
| - repId: int                                     |
| - platform: String                               |
| - url: String                                    |
+--------------------------------------------------+
| + Post(repId: int, platform: String, url: String)|
| + getId(): int                                   |
| + getRepId(): int                                |
| + getPlatform(): String                          |
| + getUrl(): String                               |
| + toString(): String                             |
+--------------------------------------------------+
```

### PointTransaction

```text
+--------------------------------------------------+
|                 PointTransaction                 |
+--------------------------------------------------+
| - nextId: int {static}                           |
| - id: int                                        |
| - repId: int                                     |
| - postId: int          (-1 means no post)        |
| - amount: int                                    |
| - reason: String                                 |
+--------------------------------------------------+
| + PointTransaction(repId, postId, amount, reason)|
| + getId(): int                                   |
| + getRepId(): int                                |
| + getPostId(): int                               |
| + getAmount(): int                               |
| + getReason(): String                            |
| + toString(): String                             |
+--------------------------------------------------+
```

Amount is positive for points earned and negative for points redeemed. Reason holds text such as "Post logged" or "Redeem for Cash".

### RepManager

```text
+------------------------------------------------------+
|                     RepManager                       |
+------------------------------------------------------+
| - reps: ArrayList<Rep>                               |
+------------------------------------------------------+
| + RepManager()                                       |
| + addRep(name, email, discountCode,                  |
|          personalPrCode): boolean                    |
| + deleteRep(repId: int): boolean                     |
| + getReps(): ArrayList<Rep>                          |
| + emailExists(email: String): boolean                |
| + isValidEmail(email: String): boolean {static}      |
+------------------------------------------------------+
```

### PostPointsManager

```text
+------------------------------------------------------+
|                  PostPointsManager                   |
+------------------------------------------------------+
| - posts: ArrayList<Post>                             |
| - transactions: ArrayList<PointTransaction>          |
| - POINTS_PER_POST: int {constant}                    |
+------------------------------------------------------+
| + PostPointsManager()                                |
| + logPost(repId, platform, url): boolean             |
| + redeemPoints(repId, amount, type): boolean         |
| + getPostCount(repId: int): int                      |
| + getPoints(repId: int): int                         |
| + getHistory(repId: int): ArrayList<PointTransaction>|
| + deleteForRep(repId: int): void                     |
+------------------------------------------------------+
```

### FileHandler

```text
+------------------------------------------------------+
|                     FileHandler                      |
+------------------------------------------------------+
| (no fields)                                          |
+------------------------------------------------------+
| + save(reps, posts, transactions): void              |
| + load(): void                                       |
+------------------------------------------------------+
```

The save and load signatures are a rough draft. They will be tightened once file input and output is covered in the course.

### Main

```text
+------------------------------------------------------+
|                   Main                               |
|            (extends Application)                     |
+------------------------------------------------------+
| - repManager: RepManager                             |
| - postPointsManager: PostPointsManager               |
| - fileHandler: FileHandler                           |
+------------------------------------------------------+
| + start(primaryStage: Stage): void                   |
| + main(args: String[]): void {static}                |
+------------------------------------------------------+
```

### How IDs are assigned

Rep, Post, and PointTransaction each keep a static nextId counter. When a new object is created, it takes the current counter value as its id and the counter goes up by one. IDs are never reused, so deleting a rep does not cause a later rep to inherit an old id.

## 5. Relationships

### Who holds what

| Holder | Holds a list of |
| --- | --- |
| RepManager | Rep |
| PostPointsManager | Post and PointTransaction |
| Main | One RepManager, one PostPointsManager, one FileHandler |

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
1  | Belle           1  | 1     | Facebook          1  | 1     | 1      | +10    | Post logged
2  | Jacob           2  | 1     | TikTok            2  | 1     | 2      | +10    | Post logged
                     3  | 2     | Instagram         3  | 1     | -1     | -5     | Redeem for Cash

Belle's post count = 2 (posts with repId 1)
Belle's balance    = 10 + 10 - 5 = 15 (sum of her transactions)
```

## 6. Key Design Decisions

| Decision | Choice | Reason |
| --- | --- | --- |
| Rep identification | Unique auto-assigned id on every Rep | Stable for later phases. Emails can change, ids never do |
| Post count | Calculated by counting posts | Cannot drift out of sync with the posts themselves |
| Point balance | Calculated by summing transactions | Works like a ledger with one source of truth, and history comes built in |
| Post id | Post gets its own id | Future database primary key, row selection in the GUI, tells duplicate URLs apart |
| PointTransaction id and postId | Both added, postId is -1 when no post | Lets a later phase show which post earned a transaction |
| Manager structure | Three classes: RepManager, PostPointsManager, FileHandler | Each class has one job, no box is crowded, and FileHandler is the piece a database replaces later |
| Deleting a rep | Deletes the rep, their posts, and their transactions, after a confirmation | Simple and clean for now |
| GUI layout | One window with tabs | Fewer clicks than a menu with separate screens |
| Dashboard drill-down | Select a row, then click View History | Simple to build. A history panel can be added later |

### Alternatives considered

| Topic | Option not chosen | Why not |
| --- | --- | --- |
| Post count and points | Stored totals like Phase 1 | Two things to keep in sync |
| Managers | One PRManager | Grew to 13 methods and three unrelated jobs |
| Managers | Splitting further by every job | More classes and connections than the project needs |
| Deleting a rep | Block the delete if the rep has activity | Owner could not remove old reps |
| Deleting a rep | Mark the rep inactive and keep records | Needs an extra field. Better record keeping, saved for a later phase |

### Differences from the submitted proposal

The proposal named Rep and Post and a manager object. This design goes beyond it in two ways: a third data class (PointTransaction) to support the calculated point balance, and three manager classes instead of one.

## 7. GUI Plan

One JavaFX window with four tabs: Team, Add Rep, Log Post, and Redeem. The plain version is built first and styled afterward.

### Team tab (replaces the Phase 1 dashboard)

```text
+--------------------------------------------------------------+
| [ Team ] [ Add Rep ] [ Log Post ] [ Redeem ]                 |
+--------------------------------------------------------------+
|  Name    | Email           | Discount | PR Code | Posts | Pts  |
|  Belle   | belle@test.com  | BELLE10  | BELLEPR |   2   | 15   |  <- selected
|  Jacob   | jacob@test.com  | JACOB10  | JACOBPR |   1   | 10   |
|                                                              |
|                      [ View History ]   [ Delete ]           |
+--------------------------------------------------------------+
```

- View History opens a pop-up listing the selected rep's transactions (amount and reason).
- Delete asks "Are you sure?" and warns that the rep's posts and point history are deleted too. There is no undo.
- With no row selected, both buttons show "Please select a rep first".

### Add Rep tab

```text
  Name:            [________________]
  Email:           [________________]
  Discount Code:   [________________]
  Personal Code:   [________________]
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
  Name:              Dropdown selection
  Current points:    15  (updates when a rep is picked)
  Points to redeem:  [_______]
  Type:              Dropdown (Cash, Product, Store Credit)
                                        [ Redeem ]
```

The Redeem screen has been sketched in text only and is not yet drawn in the diagram tool.

### Messages

Pop-up messages replace the Phase 1 printed messages.

| Situation | Message |
| --- | --- |
| Invalid email | Invalid email |
| Duplicate email | Email already exists |
| Invalid URL | Invalid url |
| Redeeming more than the balance, or zero or less | Invalid amount |
| Nothing selected on the Team tab | Please select a rep first |

## 8. Rules Carried Over from Phase 1

- Email must contain an @ symbol and a dot after the @, and must be unique across reps.
- Supported platforms: YouTube, TikTok, Instagram, Facebook, and Substack, all by manual link submission.
- A post URL must start with https://.
- Every logged post earns a flat number of points, set by the POINTS\_PER\_POST constant (10 in Phase 1).
- A redemption must be greater than zero and cannot exceed the rep's current balance, so a balance never goes negative.
- Every redemption records its type (cash, product, or store credit) in the transaction reason.
- Every point change is recorded as a transaction.
- PR activity stays separate from sales. Sales tracking is not part of this phase.

## 9. Future Notes (Not in the Phase 2 Build)

| Item | Detail |
| --- | --- |
| Settings tab | Lets the owner set the points value per post. POINTS\_PER\_POST would become a changeable value that is saved to the file. Past transactions keep the points they were given |
| History panel | Upgrade from the View History pop-up to a panel that shows each transaction's source post |
| Multiple shops | A product sold to many shops needs a shopId on every record so one shop cannot see another's data. Planned for when the database and Shopify connection arrive |
| Database | FileHandler is the piece replaced by a database |
| Web front end | The JavaFX GUI is a prototype. A later phase replaces it with a web interface, which is why the rules live in the managers and not in Main |
| Inactive reps | Possible replacement for delete, keeping records while hiding the rep |

## 10. Build Order

Build from the bottom of the class diagram upward, testing as each layer is finished.

| Step | Build | Reason |
| --- | --- | --- |
| 1 | Rep, Post, PointTransaction | Depend on nothing else |
| 2 | RepManager | Needs only Rep |
| 3 | PostPointsManager | Needs Post and PointTransaction |
| 4 | Test steps 1 to 3 with a small throwaway main | Finds rule bugs before any GUI exists |
| 5 | Main with the Team and Add Rep tabs | First screens that can be seen and clicked |
| 6 | Log Post and Redeem tabs | Same pattern as Add Rep |
| 7 | FileHandler | Saving comes last, once everything else works |

## 11. Testing Plan

The Phase 1 test cases (add rep, log post, redeem points, view dashboard, main menu) carry over with the same expected results. Only the way each one is triggered changes, from typing to clicking. The capacity limit tests are dropped because ArrayLists have no fixed capacity.

New cases to add:

| Area | Case |
| --- | --- |
| IDs | Ids are unique and are not reused after a rep is deleted |
| Post count | Count matches the number of posts with the rep's id |
| Points | Balance equals the sum of the rep's transactions |
| Delete | Deleting a rep removes their posts and transactions and nothing else |
| History | View History shows only the selected rep's transactions |
| Selection | Buttons with no row selected show the message |
| Files | Data saved, the app restarted, and the same data loaded |

