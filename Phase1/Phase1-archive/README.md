# PR Representative Tracking App

## Overview

The PR Representative Tracking App is a Java application designed to help shop owners manage and track the social media activity of their public relations (PR) representatives.

The application provides a centralized way to record promotional posts made by PR representatives and uses the collected information to determine compensation according to the shop's established criteria.

## Why I Built This

Manually tracking PR rep posts and points is a real bottleneck for small shop owners running a PR program, something I saw firsthand through my own experience running a planner sticker shop. This project started as an assignment for my Software Development program, but the problem it solves is one I actually understand from direct experience, not just a theoretical exercise.

It's also intended as the foundation for a larger application I'll keep building on throughout the program, so later phases (persistent storage, Shopify integration, and so on) aren't just hypothetical "nice to haves," they're features that map to real needs small shop owners have.

## Project Goals

The goal of this project is to develop a practical application that addresses a real-world business need while demonstrating software development concepts and practices.

The application focuses on:

- Tracking PR representatives
- Recording social media promotional activity
- Collecting relevant information about promotional posts
- Tracking the activity used to determine compensation
- Calculating compensation based on established criteria

## Implemented Features

The Phase 1 prototype currently supports:

- Adding and managing PR representatives, with duplicate and format checks on email addresses
- Recording social media promotional posts and associating them with the PR rep who submitted them
- Manual link submission for YouTube, TikTok, Instagram, Facebook, and Substack
- Awarding points for qualifying promotional activity
- Recording a full point history for every point-earning and point-redemption transaction
- Processing point redemptions for cash, product, or store credit
- Viewing a dashboard of all PR reps and their current data
- Fixed-size array storage with enforced capacity limits on reps, posts, and point history entries

## Planned Features

Future phases will build on the Phase 1 prototype to add:

- Persistent data storage (database and/or file-based)
- Shopify integration and automated sales tracking
- Automatic discount code generation
- Automated Instagram and Facebook post detection, including hashtag and shop-tag verification
- Additional social media platform integrations
- Full web application functionality

## Technology Choices

This project is written in Java, and its structure is shaped by where I am in my Software Development coursework as much as by the problem itself.

- **Java** — the language taught in the current course.
- **Parallel arrays and a single 2D array, no classes** — classes haven't been introduced in the course yet, so all data (PR reps, posts, point history) is stored in fixed-size arrays and manipulated through static methods in a single `Main.java` file, rather than through objects. This is a course constraint, not a design preference: the [architecture](docs/architecture.md) and [data model](docs/data-model.md) docs describe the array structure in detail, and a future phase will likely revisit this once classes are covered.
- **No external dependencies** — everything runs on the standard Java library (`Scanner` for input, no third-party packages), again in keeping with course scope.

## Problems Encountered & What I Learned

Building this surfaced a few real bugs and design decisions, not just syntax practice:

- **Pass-by-value bug in `redeemPoints()`.** I originally had `redeemPoints()` return a `boolean`, but a single call can log multiple redemptions, and `main()` needed the real, updated `pointHistoryCount` back afterward. Since Java passes `int` by value, changes made to the count *inside* the method weren't reflected in `main()`'s copy. The fix was changing the return type to `int` and reassigning `pointHistoryCount = redeemPoints(...)` in `main()`. This was a good forcing function for actually understanding pass-by-value instead of just knowing the term.
- **A broken early attempt at loop control.** While building the redemption loop, I first tried a `redeeming = false; break;` pattern to exit early, but it didn't skip the rest of the loop body the way I expected. I reverted to a plain `return`, which exits the method immediately regardless of loop nesting. Working through why the `break` approach failed helped clarify the difference between exiting a loop and exiting a method.
- **Duplicated logic between `logPost()` and `redeemPoints()`.** Both methods needed a rep-selection step and, in `logPost()`'s case, a platform-selection step. Once the duplication was clear, I extracted `repSelection()` and `platformSelection()` as shared helper methods, which also fixed a duplicate "Returning to main menu" message bug in the process.
- **A misleading compiler error.** A correct `.repeat(94)` line threw a `String cannot be converted to char[]` error that had nothing to do with the actual code. It turned out to be a stale VS Code Java language server cache, not a real bug, a reminder to double-check the environment before assuming the code is wrong.
- **Argument-order bug in `logPost()`'s call site.** While testing capacity limits, I reduced `POST_CAP` to a small number expecting `logPost()` to block after a few posts. It didn't, no matter what I set the constant to. After ruling out stale compiles, I traced the actual call in `main()` against `logPost()`'s signature and found `HISTORY_CAP` and `POST_CAP` swapped at the call site. I'd assumed Java matched arguments to parameters by name, since the names lined up so cleanly the mismatch was easy to miss. It actually matches by position, the 3rd argument fills the 3rd parameter slot regardless of what either one is called, so `logPost()`'s internal `POST_CAP` had been silently bound to the real `HISTORY_CAP` value the whole time, and vice versa. The fix was correcting the argument order in the call. This one hid in plain sight because the names *looked* right, it only surfaced once I deliberately tried to trip a cap that should've been unreachable in normal use.

## What I'd Do Differently

Some sections of this project, particularly the loop control and return-value bugs, took a lot longer to work through than I expected going in, and there was a stretch where progress felt slower than the amount of effort I was putting in. Next time, I'd break work into smaller sessions rather than pushing through long stretches on one gnarly method, and treat getting stuck as a normal part of the process rather than a sign I should have already known the answer.

## Project Structure

```text
project/
├── src/
│   └── Main.java
├── docs/
│   ├── requirements.md
│   ├── architecture.md
│   ├── data-model.md
│   └── pr-app-test-cases.md
├── .gitignore
└── README.md
```