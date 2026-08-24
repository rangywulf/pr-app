# PR Rep Tracking App — Demo / Run-Through Guide

This guide walks through the PR Representative Tracking App's core functionality in a single sitting. It follows the same scenarios documented in `pr-app-test-cases.md`, in a suggested order that builds up program state naturally (add reps first, then log posts, then redeem points, then view results).

**How to run:** Compile and run `Main.java` from the terminal or your IDE's run button. All input happens via the console.

Expected output is shown for each step so you can confirm behavior without needing to read the source.

---

## 1. Main Menu

On launch, you should see:

```
=== MAIN MENU ===
1. Add a PR Rep
2. Log a Post
3. View PR Dashboard
4. Redeem Points
5. Exit
```

**Try an invalid entry first:**
| Input | Expected Result |
|---|---|
| `abc` | "Invalid input. Please enter a number." — reprompts |
| `9` | "Invalid choice. Please select 1, 2, 3, 4, or 5." — reprompts |

## 2. Add a PR Rep (Option 1)

Select **1**, then try each of the following in order:

| Step | Input | Expected Result |
|---|---|---|
| Leave name blank | *(press Enter)* | "Name cannot be empty." — reprompts |
| Enter a name | `Belle` | Proceeds to email prompt |
| Enter an invalid email | `notanemail.com` | "Invalid email" — reprompts |
| Enter a valid email | `belle@test.com` | Proceeds to discount code |
| Enter discount code | `BELLE10` | Proceeds to personal code |
| Enter personal code | `BELLEPR` | "PR Rep added successfully." |

**Add a second rep** the same way (e.g. `Jacob` / `jacob@test.com` / `JACOB10` / `JACOBPR`) — you'll need two reps for later steps.

**Optional edge case:** Try adding a rep with an email that already exists (e.g. `belle@test.com` again) — expect "Email already exists", reprompting.

**Cancel test:** At any prompt in this flow, typing `0` cancels and returns to the main menu without adding a rep.

## 3. Log a Post (Option 2)

Select **2**. You'll be shown the list of reps you added.

| Step | Input | Expected Result |
|---|---|---|
| Select a rep | `1` | Proceeds to platform selection |
| Select a platform | `1` (Facebook) | Proceeds to URL prompt |
| Enter an invalid URL | `example.com` | "Invalid url" — reprompts |
| Enter a valid URL | `https://example.com` | "Log created, returning to main menu" |

**Cancel test:** Typing `0` at the rep list, the platform list, or the URL prompt returns to the main menu without logging a post.

**Zero-reps case:** If you run this option before adding any reps, expect: "No PR Reps found. Please add a PR rep before continuing."

## 4. View Dashboard (Option 3)

Select **3**. You should see a table of all reps added so far, with columns for Rep ID, Name, Email, Discount Code, PR Code, Post Count, and Total Points, all aligned.

Press any key at the "Press 0 to return to main menu" prompt to return.

**Zero-reps case:** If run with no reps added, expect: "No PR Reps found. Nothing to display yet."

## 5. Redeem Points (Option 4)

A rep needs points before this is meaningful — logging a post earns 10 points, so log 1–2 posts for a rep first if you haven't already.

Select **4**.

| Step | Input | Expected Result |
|---|---|---|
| Select a rep | `1` | Shows current point balance |
| Enter more points than available | *(a number greater than balance)* | "Invalid amount. Enter a number greater than 0 and no more than your available points." — reprompts |
| Enter a valid amount | `5` | Proceeds to redemption type |
| Select redemption type | `1` (Cash) | Balance updates, "Total points left to redeem: X" |

After a successful redemption, the program automatically loops back to rep selection, letting you redeem again for the same or a different rep in one session. Type `0` at that point to return to the main menu.

**Zero-reps case:** If run with no reps added, expect: "No PR Reps found. Please add a PR rep before continuing."

## 6. Exit (Option 5)

Select **5**. Expect: "Exiting program. Goodbye!" and the program terminates.

---

## Notes on Known Limitations

- **Fixed-size storage:** reps, posts, and point-history records are stored in fixed-size arrays (capacities of 100 reps / 500 posts / 1000 history entries). This is a deliberate scope constraint for this course phase — no database yet.
- **History-cap edge case:** if the point-history array ever reaches its cap while logging a post, the post itself is still recorded, but no corresponding history entry is written for it. Documented in `pr-app-test-cases.md` (CAP-03b) as a known, accepted limitation rather than a bug to fix at this stage, since the cap (1000) is unrealistic to reach in normal use.

For the full test log behind this walkthrough, including every input/output pair and two bugs found and fixed during testing, see `docs/pr-app-test-cases.md`.