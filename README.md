# Shiver: PR Representative Tracking App

*Shiver by Kelpkin | Your PR team, swimming in sync.*

## Overview

Shiver is a Java desktop app that helps shop owners manage and track the social media activity of their public relations (PR) representatives.

The app gives a shop owner one place to add their PR reps, record each promotional post a rep makes, award points for those posts, and process point redemptions. It was built in two phases for my Software Development program: Phase 1 was a console prototype, and Phase 2 (this version) is a JavaFX window with saved data.

## Why I Built This

Manually tracking PR rep posts and points is a real bottleneck for small shop owners running a PR program, something I saw firsthand through my own experience running a planner sticker shop. This project started as an assignment for my Software Development program, but the problem it solves is one I actually understand from direct experience, not just a theoretical exercise.

It is also the foundation for a larger application I will keep building on throughout the program, so the later phases (Shopify integration and so on) are features that map to real needs small shop owners have.

## Project Goals

The goal of this project is to develop a practical application that addresses a real-world business need while demonstrating software development concepts and practices.

The application focuses on:

- Tracking PR representatives
- Recording social media promotional activity
- Tracking the activity used to determine compensation
- Calculating each rep's points from their history

## Implemented Features (Phase 2)

Shiver currently supports:

- A JavaFX window with four tabs: Team, Add Rep, Log Post, and Redeem
- Adding PR reps with a unique ID, a blank name check, and email format and duplicate checks
- Logging posts for YouTube, TikTok, Instagram, Facebook, and Substack, with links that must start with `https://`
- Earning 10 points for each logged post
- Redeeming points for cash, product, or store credit, with a check that a rep cannot redeem more than their balance
- A team table showing every rep's post count and point balance, which are calculated from the rep's history instead of stored
- A View History window that shows each rep's dated point transactions, including the link for the post that earned the points
- Deleting one or several reps at once, with a confirmation, which also deletes their posts and point history
- Saving to a text file after every change, and loading it again when the app starts
- Saved ID counters, so an ID is never reused, even after a rep is deleted and the app is restarted
- Kelpkin and Shiver branding, with a dark teal banner, aqua accents, and a cream background

## Planned Features

Future phases will build on Phase 2 to add:

- A CSS file for styling (Phase 3)
- A Settings tab where the shop owner sets the points value for a post
- PR Applications (a planned feature for a later phase)
- Shopify integration and automated sales tracking
- Automatic discount code generation
- Automated Instagram and Facebook post detection, including hashtag and shop-tag verification
- Additional social media platform integrations
- Full web application functionality

## How to Run

1. Install a JDK and set up JavaFX for the project.
2. Open the project in your IDE and run `Main.java`.
3. Run the app from the folder that contains `pr-app`, because the data file is saved at `pr-app/src/shiver-data.txt`.

The data file is created automatically the first time you add something. To start clean, close the app and delete `shiver-data.txt`.

## Technology Choices

- **Java and JavaFX:** Java is the language taught in my courses, and JavaFX is the GUI library covered in the TESD 1800 chapters.
- **Classes and objects:** Phase 2 replaces the Phase 1 arrays with three data classes (`Rep`, `Post`, `PointTransaction`) and three manager classes. This is possible now because classes are covered in this course.
- **A three-manager split:** `RepManager` handles reps, `PointsManager` handles posts and point transactions, and `FileHandler` handles saving and loading. The window code in `Main` stays thin, and the rules live in the managers.
- **Calculated values:** a rep's post count and point balance are calculated from their posts and transactions instead of being stored as fields, so the numbers can never fall out of sync.
- **A readable text file:** data is saved with `PrintWriter` and loaded with `Scanner`. It is a pipe-separated text file with labeled sections, so I can open it and read it. Because the pipe separates the fields, the app blocks the `|` character in any text field.
- **No third-party libraries:** JavaFX is the only dependency.

## Testing

Unit testing is not covered in these chapters, so I used a written test plan instead. It has 53 cases that use characters from Jaws as the test reps. All 53 pass. One bug was found along the way (Add Rep accepted a blank name), and it is fixed and retested. The full log is in [docs/pr-app-phase2-test-cases.md](docs/pr-app-phase2-test-cases.md).

## Problems Encountered & What I Learned

### Phase 2

- **Two handlers on one tab.** I gave the Redeem tab two `setOnSelectionChanged` calls, one for the tab color and one to refresh the points. A tab only keeps one handler, so the second silently replaced the first, and the tab color stopped changing. I merged both jobs into one handler.
- **A hidden focus ring.** Setting `-fx-focus-color: transparent` to remove the default blue highlight also made the selected text field blend into the background. I learned to restyle the focus ring (aqua) instead of hiding it.
- **Styling something that does not exist yet.** The strip behind the tabs can only be found with `tabPane.lookup(...)` after `show()` has been called, and the result needs a null check.
- **A second constructor that sets the date.** To load saved data back in, each class needed a second constructor that accepts a saved ID. My first version of the `PointTransaction` one did not take a date parameter, so the date was never set. Adding the parameter fixed it.
- **A pipe breaks the file.** Autosave would write a line with an extra `|` in it, and `load` would fail on the next launch. I chose to block the character in the form fields.
- **IDs after a restart.** Rebuilding the next ID from the highest saved one would reuse an ID if the newest rep had been deleted. I fixed it by saving the three ID counters in the file.
- **Data loss on a crash.** Saving only on window close would lose data if the app was stopped from the IDE. I changed it to save after every change.

### Phase 1

- **Pass-by-value bug in `redeemPoints()`.** I originally had `redeemPoints()` return a `boolean`, but a single call can log multiple redemptions, and `main()` needed the real, updated `pointHistoryCount` back afterward. Since Java passes `int` by value, changes made to the count inside the method were not reflected in `main()`. The fix was changing the return type to `int` and reassigning `pointHistoryCount = redeemPoints(...)` in `main()`.
- **A broken early attempt at loop control.** I first tried a `redeeming = false; break;` pattern to exit early, but it did not skip the rest of the loop body the way I expected. I switched to a plain `return`, which exits the method immediately. This clarified the difference between exiting a loop and exiting a method.
- **Duplicated logic between `logPost()` and `redeemPoints()`.** Both needed a rep-selection step, and `logPost()` also needed a platform-selection step. I extracted `repSelection()` and `platformSelection()` as shared helper methods.
- **A misleading compiler error.** A correct `.repeat(94)` line threw a `String cannot be converted to char[]` error. It was a stale VS Code Java language server cache, not a real bug.
- **Argument-order bug in `logPost()`.** `HISTORY_CAP` and `POST_CAP` were swapped at the call site. Java matches arguments to parameters by position, not by name, so the names looking right hid the mistake.

## What I'd Do Differently

Some parts of this project took a lot longer to work through than I expected, and there were stretches where progress felt slower than the effort I was putting in. Next time, I would break work into smaller sessions instead of pushing through long stretches on one gnarly method, and I would treat getting stuck as a normal part of the process.

The Phase 2 build went best when I worked in small steps and ran the app after each one. I also wrote the test plan against the design instead of waiting until the end, and that is how the blank-name bug got caught.

## Documentation

| Document | What it covers |
| --- | --- |
| [Phase 2 Design Document](docs/PR_App_Phase_2_Design_Document.md) | The as-built design, with classes, tabs, file format, and branding |
| [Requirements](docs/requirements.md) | What the app must do |
| [Architecture](docs/architecture.md) | How the classes fit together |
| [Data Model](docs/data-model.md) | The classes, their fields, and the data file |
| [Demo Walkthrough](docs/demo-walkthrough.md) | A guided run through every tab |
| [Phase 2 Test Cases](docs/pr-app-phase2-test-cases.md) | The 53 test cases and their results |
| [Phase 1 docs](docs/phase-1/) | The original console prototype docs |

## Project Structure

```text
project/
├── pr-app/
│   └── src/
│       ├── Main.java
│       ├── Rep.java
│       ├── Post.java
│       ├── PointTransaction.java
│       ├── RepManager.java
│       ├── PointsManager.java
│       ├── FileHandler.java
│       └── shiver-data.txt        (created when the app first saves)
├── docs/
│   ├── PR_App_Phase_2_Design_Document.md
│   ├── requirements.md
│   ├── architecture.md
│   ├── data-model.md
│   ├── demo-walkthrough.md
│   ├── pr-app-phase2-test-cases.md
│   └── phase-1/
│       ├── requirements.md
│       ├── architecture.md
│       ├── data-model.md
│       ├── demo-walkthrough.md
│       └── pr-app-test-cases.md
├── .gitignore
└── README.md
```