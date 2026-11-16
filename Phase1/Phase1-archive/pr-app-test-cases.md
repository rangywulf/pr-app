# PR App — Test Cases

## Add a PR Rep

| Test ID | Steps | Input | Expected Output | Actual Result | Pass/Fail |
|---|---|---|---|---|---|
| AR-01 | Select menu option 1, enter valid data for all fields | Name: `Belle`, Email: `belle@test.com`, Discount: `BELLE10`, PR Code: `BELLEPR` | "PR Rep added successfully." Rep count increases by 1. | Rep added successfully as expected. | Pass |
| AR-02 | Leave name blank, then enter valid name | Name: (empty, then) `Beast` | "Name cannot be empty." repeats until valid name given | "Name cannot be empty." shown, reprompted, valid name accepted. | Pass |
| AR-03 | Enter an email with no `@` | Email: `notanemail.com` | "Invalid email" — reprompts | "Invalid email" shown, reprompted correctly. | Pass |
| AR-04 | Enter an email that already exists on another rep | Email: `belle@test.com` (duplicate) | "Email already exists" — reprompts | "Email already exists" shown, reprompted correctly. | Pass |
| AR-05 | Type `0` at the name prompt | `0` | Cancels, returns to main menu, no rep added | Not tested as specified this run — see AR-05b for the variant actually tested (`0` at email prompt instead). | Not Tested |
| AR-05b | Type `0` at the email prompt (variant of AR-05 actually run) | Email: `0` | Cancels, returns to main menu, no rep added | Cancelled cleanly, returned to main menu, no rep added. | Pass |

## Log a Post

| Test ID | Steps | Input | Expected Output | Actual Result | Pass/Fail |
|---|---|---|---|---|---|
| LP-01 | Log a post with valid rep, platform, and URL | Rep: `1`, Platform: `1` (Facebook), URL: `https://example.com` | "Log created, returning to main menu." Rep's post count and points increase. | Post logged successfully, "Log created, returning to main menu" shown. | Pass |
| LP-02 | Type `0` at rep selection | `0` | "Returning to main menu." — cancels cleanly, no post logged | Cancelled cleanly as expected. | Pass |
| LP-03 | Type `0` at platform selection | Rep: `1`, Platform: `0` | "Returning to main menu." — cancels cleanly, no post logged | "Returning to main menu" shown | Pass |
| LP-04 | Enter an invalid rep number, then a valid one | Rep: `99`, then `1` | "Invalid Choice" — reprompts until valid | "Invalid Choice" shown, reprompted, valid rep accepted. | Pass |
| LP-04b | Enter non-numeric characters at rep selection (retest after `nextInt()` fix) | Rep: `l`, `p`, `h`, then `0` | "Invalid input. Please enter a number." — reprompts on each non-numeric entry, `0` still cancels correctly | Reprompted with "Invalid input. Please enter a number." on each letter, no crash. `0` returned to main menu correctly afterward. | Pass |
| LP-05 | Enter a URL without `https://` | URL: `example.com` | "Invalid url" — reprompts | "Invalid url" shown, reprompted correctly. | Pass |
| LP-05b | While already inside the invalid-URL retry loop, type `0` (bug found during LP-05 testing) | URL: `0` (entered after an initial invalid URL) | Expected `0` to cancel and return to main menu, consistent with every other cancel point in the app | **Fixed and retested.** Removed the redundant standalone `0`-check loop and moved the `0`-check inside the URL-validation loop itself, so it's evaluated on every attempt, not just the first. Retested: `0` now cancels correctly whether typed first or after invalid attempts. | Pass |
| LP-06 | Attempt to log a post with zero reps in the system | (no reps added yet) | "No PR Reps found. Please add a PR rep before continuing." — returns to main menu | "No PR reps found. Please add a PR rep before continuing." shown, returned to main menu, no post logged | Passed |

## Redeem Points

| Test ID | Steps | Input | Expected Output | Actual Result | Pass/Fail |
|---|---|---|---|---|---|
| RP-01 | Redeem a valid point amount for an existing rep | Rep: `1`, Points: `5`, Type: `1` (Cash) | Points deducted from rep's total; "Total points left to redeem: X" | Redeemed 10 points, balance correctly dropped from 20 to 10. | Pass |
| RP-02 | Type `0` at rep selection | `0` | "Returning to main menu." — cancels cleanly | Cancelled cleanly as expected. | Pass |
| RP-03 | Attempt to redeem more points than the rep has | Points: (greater than balance) | "Invalid amount. Enter a number greater than 0 and no more than your available points." | Attempted to redeem 20 against a balance of 10, correct message shown, reprompted, valid amount (5) accepted. | Pass |
| RP-04 | Redeem points, then choose to redeem again for another rep in the same session | Redeem once, then select another rep | Loop continues; second redemption processes correctly | Looped and showed the next rep. Selected next rep and redeemed points. No errors | Pass |
| RP-05 | Attempt to redeem with zero reps in the system | (no reps added yet) | "No PR Reps found. Please add a PR rep before continuing." | "No PR Reps found. Please add a PR rep before continuing." shown, returned to main menu | Passed |

## View Dashboard

| Test ID | Steps | Input | Expected Output | Actual Result | Pass/Fail |
|---|---|---|---|---|---|
| VD-01 | View dashboard with at least one rep and one logged post | Select menu option 3 | Table displays rep ID, name, email, discount code, PR code, post count, and point total correctly aligned | Table displayed correctly: rep ID, name, email, discount code, PR code, 2 posts, 5 points, all aligned. | Pass |
| VD-02 | View dashboard with zero reps | Select menu option 3 (no reps added) | "No PR Reps found. Nothing to display yet." | "No PR Reps found. Nothing to display yet" shown, reprompted | Pass |
| VD-03 | Press any key to return | (any key) | Returns to main menu | **Fixed and retested.** Added a `readInt()` helper method (using the same `hasNextInt()` guard pattern as the main menu) and applied it to this prompt, plus `repSelection()`, `platformSelection()`, and `redeemPoints()`. Retested with letters (`j`, `l`, `o`): each reprompted with "Invalid input. Please enter a number." instead of crashing, and `0` still returned to main menu correctly. | Pass |

## Main Menu

| Test ID | Steps | Input | Expected Output | Actual Result | Pass/Fail |
|---|---|---|---|---|---|
| MM-01 | Enter a non-numeric character at the main menu | `abc` | "Invalid input. Please enter a number." — reprompts | "Invalid input. Please enter a number." shown, reprompted at main menu | Passed |
| MM-02 | Enter a number outside 1-5 | `9` | "Invalid choice. Please select 1, 2, 3, 4, or 5." | "Invalid choice. Please select 1, 2, 3, 4, or 5." shown, reprompted at main menu | Passed |
| MM-03 | Select option 5 | `5` | "Exiting program. Goodbye!" — program terminates | "Exiting program. Goodbye!" shown, program terminated | Passed |

## Capacity Limits

**Test Setup Note:** Each test below is run with its constant temporarily reduced to a small number (e.g. 2 or 3) so the limit can be hit without manually entering hundreds of records. The constant is reverted to its real value after the test.

| Test ID | Steps | Input | Expected Output | Actual Result | Pass/Fail |
|---|---|---|---|---|---|
| CAP-01 | Reduce `MAX_CAPACITY` to 2. Add reps until the limit is hit. | Add 3 reps (2 succeed, 3rd is blocked) | On the 3rd attempt: "Max number of PR reps reached." printed immediately, no name/email prompts shown at all. Rep count stays at 2. | MAX_CAPACITY reduced to 2. 3rd add attempt blocked immediately with "Max number of PR reps reached.", no name/email prompts shown, rep count stayed at 2. | Pass |
| CAP-02 | Reduce `POST_CAP` to 2. Log posts until the limit is hit. | Log 3 posts (2 succeed, 3rd is blocked) | On the 3rd attempt: "Max number of posts reached." printed immediately, no rep/platform/URL prompts shown at all. Post count stays at 2. | 02	POST_CAP reduced to 2. Found and fixed a real bug during this test (see below). After the fix: 3rd log attempt blocked immediately with "Max number of posts reached.", no rep/platform/URL prompts shown, post count stayed at 2. | Pass |
| CAP-02b | Bug found while running CAP-02: inspected `logPost()`'s call site in `main()` | N/A (found via code inspection, not a normal run) | `logPost()` should enforce the real `POST_CAP` (500), not `HISTORY_CAP` (1000) | `main()`'s call to `logPost()` passed `HISTORY_CAP` as the 3rd argument and `POST_CAP` as the 4th, but `logPost()`'s signature expects the opposite order. Since Java matches arguments by position, not by parameter name, `logPost()`'s internal `POST_CAP` was silently bound to the real `HISTORY_CAP` value and vice versa. **Fixed** by correcting the argument order in the call. Confirmed via clean reruns of CAP-02, CAP-03, and CAP-03b. | Pass |
| CAP-03 | Reduce `HISTORY_CAP` to 2. Log posts and/or redeem points until the limit is hit. | Trigger 3 history-writing events (2 succeed, 3rd is blocked) | On the 3rd attempt: "Max number of history logs reached." printed. `pointHistoryCount` stays at 2. See note below. | HISTORY_CAP reduced to 2. 3rd history-writing event (a redemption, then rerun via a 3rd post) blocked with "Max number of history logs reached.", pointHistoryCount stayed at 2, rep's point balance unchanged by the blocked event. | Pass |
| CAP-03b | With `HISTORY_CAP` reduced and already at the cap, log one more post | Log a post while `pointHistoryCount == HISTORY_CAP` | Post is added to `postRepIndex`/`postPlatform`/`postLink`, rep's post count field increases, but no new history entry is written and `pointHistoryCount` stays unchanged | With HISTORY_CAP at cap, logged a 3rd post: post was still recorded (post count went to 3) but no new history entry was written, point total stayed frozen at 20 rather than increasing to 30 — confirms the known limitation documented earlier. | Pass |


**Known Limitation:** When `HISTORY_CAP` is reached during `logPost()`, the post itself is still recorded (post count and post arrays update normally), but the corresponding point-history entry is silently skipped since `pointHistory()` returns `false` and `logPost()` only gates `pointHistoryCount` on that result, not `postCount`. This means a post can exist with no history record behind it once the cap is hit. Documented here as a known edge case rather than fixed, since `HISTORY_CAP` (1000) is unlikely to be reached in realistic use for this course project.