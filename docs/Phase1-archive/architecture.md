# Application Architecture
## Overview

The Phase 1 PR App Core Engine uses a simple, single-file Java structure appropriate for the concepts covered in the current course.

The application does not use classes to represent its data entities. Classes have not yet been introduced in the course, so all data is stored in parallel arrays and a single 2D array, and all logic lives in static methods within `Main`. The main program controls user interaction and application flow through a menu loop that calls these methods.

## Source Structure

```
src/
└── Main.java
```

All data structures, constants, and methods are contained in this single file.

### Core Data Structures

The application stores its three primary data entities as parallel arrays rather than as objects:

- **PR Representatives** — `repData`, a single 2D array.
- **Posts** — three parallel 1D arrays.
- **Point History** — three parallel 1D arrays.

## Data Structure Details

### PR Representatives — `repData`

A 2D array, `String[100][7]`. Each row represents one PR representative; each column holds one field.

| Index | Field |
|---|---|
| `[0]` | Rep ID |
| `[1]` | Name |
| `[2]` | Email |
| `[3]` | Discount code |
| `[4]` | Personal PR code |
| `[5]` | Post count |
| `[6]` | Point total |

A rep's post count and point total are stored directly in this array rather than calculated from the post or point history arrays.

### Posts

Three parallel 1D arrays, each sized `500`, indexed together so that index `i` across all three describes one post:

- `postRepIndex[500]` — the index into `repData` of the rep who made the post.
- `postPlatform[500]` — the platform the post was made on.
- `postLink[500]` — the submitted URL.

There is no dedicated post ID field and no "points awarded" field stored per post. Points earned for a post are calculated at the time the post is logged and recorded as a point history entry rather than stored on the post itself.

### Point History

Three parallel 1D arrays, each sized `1000`, indexed together so that index `i` across all three describes one point history entry:

- `pointHistoryRepIndex[1000]` — the index into `repData` of the rep the entry belongs to.
- `pointHistoryAmount[1000]` — the point change (positive for points earned, negative for points redeemed).
- `pointHistoryReason[1000]` — the reason for the change (e.g. "Post logged", "Redeem for Cash").

There is no separate transaction ID field; rep index, amount, and reason are all that is stored per entry.

## Method Responsibilities

Because there are no classes, application logic is organized as static methods in `Main`, each responsible for one piece of the workflow:

| Method | Responsibility |
|---|---|
| `main()` | Runs the menu loop, routes the user's choice to the appropriate method, and updates the relevant count variables (`repCount`, `postCount`, `pointHistoryCount`) based on the result. |
| `addRep()` | Validates user input and adds a new rep row to `repData`. Enforces `MAX_CAPACITY` before prompting for input. |
| `repSelection()` | Shared helper. Lists existing reps and returns the chosen rep's index into `repData`, or `-1` if the user cancels. |
| `platformSelection()` | Shared helper. Lists supported platforms and returns the chosen platform name, or `null` if the user cancels. |
| `logPost()` | Records a post using `repSelection()` and `platformSelection()`, validates the URL, enforces `POST_CAP` before prompting for input, updates the rep's post count, and calls `pointHistory()` to log the points earned. |
| `calculatePostPoints()` | Calculates the points earned for a logged post. Currently a flat passthrough of the `POINTS_PER_POST` constant; reserved as the home for more complex point logic later. |
| `pointHistory()` | Logs a point history entry and updates the rep's running point total in `repData`. Enforces `HISTORY_CAP` before logging. |
| `redeemPoints()` | Validates and processes one or more point redemptions in a loop, prevents the balance from going negative, and logs each redemption via `pointHistory()`. |
| `viewDashboard()` | Read-only method. Displays a formatted table of all reps and their current data. Does not modify any array. |

## Capacity Constants

Each array group is guarded by a dedicated capacity constant, checked at the top of its associated method before any user input is requested:

- `MAX_CAPACITY = 100` — guards `repData`, checked in `addRep()`.
- `POST_CAP = 500` — guards the post arrays, checked in `logPost()`.
- `HISTORY_CAP = 1000` — guards the point history arrays, checked in `pointHistory()`.

## Data Storage

The prototype uses fixed-size arrays to store PR representatives, posts, and point history entries while the program is running.

No external database or persistent file storage is used in Phase 1.

All stored data is lost when the program exits.

## Application Flow

The general application flow is:

```
Start Program
↓
Display Main Menu
↓
Receive User Input
↓
Perform Selected Operation
↓
Update Data
↓
Display Result
↓
Return to Main Menu
```

The application continues running until the user chooses to exit.