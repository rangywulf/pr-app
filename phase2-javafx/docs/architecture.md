# Application Architecture

*Phase 2 (TESD 1800) | Shiver by Kelpkin*

## Overview

The Phase 2 version of the PR App is a JavaFX desktop application built from seven classes. Each class does one job: three data classes hold the records, two manager classes apply the rules, one class saves and loads the data, and one class builds the window and connects the buttons to everything else.

The Phase 1 version of this document, which describes the console prototype built from arrays and static methods, is in `docs/phase-1/architecture.md`.

## Technology

| Part | What is used |
| --- | --- |
| Language | Java |
| Window and controls | JavaFX |
| Saving and loading | The Java standard library (`PrintWriter`, `Scanner`, and `File`) |
| Storage | A plain text file, `shiver-data.txt` |

The app has no database and no outside libraries beyond JavaFX.

## Source Structure

```text
src/
├── Main.java
├── Rep.java
├── Post.java
├── PointTransaction.java
├── RepManager.java
├── PointsManager.java
└── FileHandler.java
```

The data file, `shiver-data.txt`, is created in `pr-app/src/` the first time the app saves.

## How the Classes Fit Together

```text
Main (window and buttons)
 ├── RepManager        holds the reps and applies the rep rules
 ├── PointsManager     holds posts and transactions and applies the points rules
 └── FileHandler       saves and loads the data file

Data classes: Rep, Post, PointTransaction
```

Main knows about the managers and FileHandler. The managers know about the data classes. Nothing points back up, which keeps Main thin. The rules about reps, posts, and points live in the managers and not in the window code, so a later phase can replace the window without rewriting the rules.

## Class Responsibilities

| Class | Responsibility |
| --- | --- |
| `Rep` | Holds one rep's id, name, email, discount code, and personal code. Hands out new ids from a counter, and can rebuild a saved rep with its saved id |
| `Post` | Holds one post's id, rep id, platform, and URL, with the same id counter and saved-id constructor |
| `PointTransaction` | Holds one point change: id, rep id, post id, amount, reason, and date, with the same id counter and a constructor that keeps a saved date |
| `RepManager` | Holds the list of reps. Adds a rep after checking the email format and uniqueness, deletes a rep, and answers whether an email already exists |
| `PointsManager` | Holds the lists of posts and transactions. Logs a post and awards its points, redeems points without letting a balance go negative, calculates post counts and point balances, returns a rep's history, looks up a post's URL, and deletes everything that belongs to a rep |
| `FileHandler` | Writes all reps, posts, and transactions to the data file, and reads the file back into the two managers |
| `Main` | Builds the window and its four tabs, checks what the owner types, calls the managers, refreshes the tables and dropdowns, and saves after each change |

## What Main Does

`Main` extends the JavaFX `Application` class. Its `start` method runs once, in this order:

1. Load the saved data into the two managers.
2. Create the tab pane and the four tabs: Team, Add Rep, Log Post, and Redeem.
3. Build each tab's form or table and connect its buttons to handlers.
4. Build the banner with the app name, the company name, and the tagline.
5. Show the window.
6. Fill the Team table and both rep dropdowns with the loaded reps.
7. Save the data when the window closes.
8. Color the strip behind the tabs, which only exists once the window is showing.

Two private helper methods support the handlers:

| Method | Responsibility |
| --- | --- |
| `getSelectedReps` | Returns the rows selected on the Team tab, or shows "Please select a rep first" and returns nothing when no row is selected |
| `saveData` | Calls `FileHandler.save` with the current reps, posts, and transactions and catches its exception, so each handler can save with one line |

### Button handlers

| Button | What the handler does |
| --- | --- |
| Add (Add Rep) | Checks for a blank name and the pipe character, checks the email format and whether it already exists, adds the rep, saves, and refreshes the table and dropdowns |
| Add (Log Post) | Checks that a rep and platform are chosen, checks for the pipe character, checks that the URL starts with `https://`, logs the post, saves, and refreshes the table |
| Redeem | Checks that a rep and type are chosen, turns the amount into a number, asks `PointsManager` to redeem it, saves, and refreshes the table and the points label |
| View History | Opens a second window with the first selected rep's transactions |
| Delete | Asks for confirmation, deletes each selected rep and their posts and transactions, saves, and refreshes the table and dropdowns |

## Where the Rules Live

| Rule | Where it is checked |
| --- | --- |
| Email has an `@` and a dot after it | `RepManager` |
| Email is not already used | `RepManager` |
| URL starts with `https://` | `PointsManager`, and also in the Log Post handler to show a clear message |
| Redemption is above zero and within the balance | `PointsManager` |
| Name is not blank | The Add Rep handler in `Main` |
| No pipe character in a text field | The Add Rep and Log Post handlers in `Main` |
| A rep, platform, or type is chosen | The handlers in `Main` |
| The points amount is a number | The Redeem handler in `Main` |

The blank-name and pipe checks are in `Main` today. A later phase can move them into the managers, so every front end shares them.

## Saving and Loading

The app keeps its data in memory while it runs and writes it to a text file so nothing is lost between runs.

| When | What happens |
| --- | --- |
| The app starts | `FileHandler.load` reads the file, if it exists, and rebuilds the reps, posts, and transactions in the managers. With no file, the app starts empty |
| A rep is added, a post is logged, points are redeemed, or reps are deleted | `saveData` writes the whole file |
| The window closes | `saveData` writes the file once more |

### How load works

1. If the data file does not exist, stop and start with no data.
2. Read the file one line at a time and split each line at the pipe characters.
3. Look at the first piece to see what kind of record the line holds: `REP`, `POST`, `TX`, or `NEXT`.
4. Rebuild the record with the constructor that takes a saved id, and put it in the right manager.
5. For a `NEXT` line, restore the three id counters.
6. Skip anything else. Heading lines that start with `#` and blank lines match no record type, so they are ignored.

The file layout is described in `docs/data-model.md` and in the design document.

## Capacity

Phase 1 stored its data in fixed-size arrays with set limits. Phase 2 uses ArrayLists, which grow on their own, so there are no capacity limits and no capacity checks.

## Application Flow

```text
Start the app
↓
Load the data file into the managers
↓
Build the window and show it
↓
The owner clicks a button
↓
The handler checks the input
↓
A manager applies the rule and updates its list
↓
saveData writes the file
↓
The tables, dropdowns, and labels refresh
↓
The window waits for the next click
```

The app keeps running until the window is closed.

## Room to Grow

| Future need | How the design allows for it |
| --- | --- |
| Database | `FileHandler` is the only class that touches the file, so a database can replace it without changing the managers |
| Web front end | The rules live in the managers, so a web interface can replace the JavaFX window |
| Sales tracking | PR activity and sales stay separate. Sales can be added as its own records and manager when Shopify is connected in a later phase |
| Settings | The points-per-post constant can become a saved setting without changing how posts are logged |
| Shared look | Colors and styles are set in code now, and a CSS file is planned for Phase 3 |

## What Changed from Phase 1

| Area | Phase 1 | Phase 2 |
| --- | --- | --- |
| Structure | One file with static methods | Seven classes, each with one job |
| Data | Parallel arrays and a 2D array | Objects in ArrayLists |
| Interface | Console menu loop | JavaFX window with tabs |
| Saving | None, data lost on exit | Text file, saved after every change |
| Capacity | Fixed limits checked in three methods | No limits |
| Where the rules live | Inside the menu methods | In the managers |