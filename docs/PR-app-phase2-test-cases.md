# PR App Phase 2 Test Cases

*Phase 2 (TESD 1800) | Shiver by Kelpkin | JavaFX desktop app*

## How to Use This File

The Phase 1 test cases carry over with the same expected results, and only the way each one is triggered changes, from typing at a console to clicking in the window. New Phase 2 cases cover IDs, calculated values, deleting reps, View History, and file saving.

The Expected Output column is filled in. The Actual Result and Pass/Fail columns stay blank until each case is run.

**Test setup, before the first case:**

1. Stop the app.
2. Delete `pr-app/src/shiver-data.txt` if it exists.
3. Run the app, so every ID starts at 1.

Cases are meant to be run in the order they appear, because each section starts from the state the previous section left behind. Any section that needs a fresh start says so.

## Test Cast

All test data uses characters from Jaws. Every email ends in `@test.com`.

| Rep | Email | Discount Code | Personal Code |
|---|---|---|---|
| Brody | brody@test.com | BRODY10 | BRODYPR |
| Quint | quint@test.com | QUINT10 | QUINTPR |
| Hooper | hooper@test.com | HOOPER10 | HOOPERPR |
| Vaughn | vaughn@test.com | VAUGHN10 | VAUGHNPR |
| Ellen | ellen@test.com | ELLEN10 | ELLENPR |

## Add a PR Rep

**Starting state:** no reps. After this section, Brody (ID 1), Quint (ID 2), and Hooper (ID 3) exist.

| Test ID | Steps | Input | Expected Output | Actual Result | Pass/Fail |
|---|---|---|---|---|---|
| AR-01 | Open the Add Rep tab, fill in every field, click Add | Brody with the cast info | "PR Rep added successfully." appears, the fields clear, and Brody shows on the Team tab | "PR Rep added succesfully" | Pass |
| AR-02 | Leave Name blank, fill in the other fields, click Add | Name: (empty), Email: quint@test.com | A pop-up says the name is required and no rep is added | "PR Red added successfully" | FAIL |
| AR-03 | Enter an email with no `@` | Name: Quint, Email: `notanemail.com` | "Invalid email" pop-up and no rep is added | "Error: Invalid email" | Pass |
| AR-04 | Enter an email with an `@` but no dot after it | Name: Quint, Email: `quint@testcom` | "Invalid email" pop-up and no rep is added | "Error: Invalid Email" | Pass |
| AR-05 | Enter an email that already belongs to another rep | Name: Quint, Email: brody@test.com | "Email already exists" pop-up and no rep is added | "Error: Email already exists" | Pass |
| AR-06 | Type a pipe character in the name | Name: `Qu\|int` | An error pop-up about the pipe character appears and no rep is added | "Error: is an invalid character" | Pass |
| AR-07 | Type a pipe character in the personal code | Personal Code: `QUINT\|PR` | An error pop-up about the pipe character appears and no rep is added | "Error: is an invalid character" | Pass |
| AR-08 | Add Quint with the cast info | Quint with the cast info | "PR Rep added successfully." and Quint shows on the Team tab | "PR Rep added successfully" | Pass |
| AR-09 | Add Hooper with the cast info | Hooper with the cast info | "PR Rep added successfully." and Hooper shows on the Team tab | "PR Reo added successfully" | Pass |

**Known gap:** the Add Rep handler does not currently check for a blank name, so AR-02 is expected to fail on the first run. If it does, it is logged in the Bug Log below.

## Log a Post

**Starting state:** Brody, Quint, and Hooper exist with no posts. After this section, Brody has 2 posts and 20 points, Quint has 1 post and 10 points, and Hooper has 5 posts and 50 points.

| Test ID | Steps | Input | Expected Output | Actual Result | Pass/Fail |
|---|---|---|---|---|---|
| LP-01 | Log a post with a valid rep, platform, and URL | Rep: Brody, Platform: Facebook, URL: `https://example.com/amity-beach` | "Post logged successfully" appears and the URL field clears | "Post logged successfully | Pass |
| LP-02 | Log a second post for the same rep | Rep: Brody, Platform: TikTok, URL: `https://example.com/orca-hunt` | "Post logged successfully" appears | "Post logged successfully" | Pass |
| LP-03 | Log a post for another rep | Rep: Quint, Platform: YouTube, URL: `https://example.com/quint-boat` | "Post logged successfully" appears | "Post logged successfully" | Pass |
| LP-04 | Click Add with no rep selected | Rep: (none), Platform: Facebook | "Please select a rep and a platform" pop-up and no post is logged | Had to restart app to get no rep selected "Please select a repand a platform" | Pass |
| LP-05 | Click Add with no platform selected | Rep: Brody, Platform: (none) | "Please select a rep and a platform" pop-up and no post is logged | had to restart app to get no platform selected. "Please select a rep and a platform" | Pass |
| LP-06 | Enter a URL that does not start with `https://` | Rep: Brody, Platform: Facebook, URL: `example.com` | "Invalid URL. Must start with https://" pop-up and no post is logged | "Error: Invalid URL. Must start with https://" | Pass |
| LP-07 | Type a pipe character in the URL | URL: `https://example.com/a\|b` | An error pop-up about the pipe character appears and no post is logged | "Error: is an invalid character" | Pass |
| LP-08 | Log one post on each of the five platforms for one rep | Rep: Hooper, one post each on YouTube, TikTok, Instagram, Facebook, and Substack, with a valid `https://` URL each | Every platform can be selected and every post logs successfully | "Post logged successfully" | Pass |

## Redeem Points

**Starting state:** Brody has 20 points, Quint has 10 points, and Hooper has 50 points. After this section, Brody has 0 points, Quint has 20 points, and Hooper has 50 points.

| Test ID | Steps | Input | Expected Output | Actual Result | Pass/Fail |
|---|---|---|---|---|---|
| RP-01 | Redeem a valid amount | Rep: Brody, Points: 5, Type: Cash Payout | "Points redeemed successfully." appears, the current points label drops from 20 to 15, and the amount field clears | "Points redeemed successfully" and points dropped to 15 | Pass |
| RP-02 | Redeem more points than the balance | Rep: Brody, Points: 100, Type: Cash Payout | "Invalid amount" pop-up and the balance stays at 15 | "Error: Invalid amount" points stayed at 15 | Pass |
| RP-03 | Redeem zero points | Rep: Brody, Points: 0 | "Invalid amount" pop-up and the balance stays at 15 | "Error: Invalid amount" points stayed at 15 | Pass |
| RP-04 | Redeem a negative amount | Rep: Brody, Points: -5 | "Invalid amount" pop-up and the balance stays at 15 | "Error: invalid amount" points stayed at 15 | Pass |
| RP-05 | Enter text instead of a number | Rep: Brody, Points: `abc` | "Invalid amount" pop-up and the balance stays at 15 | "Error: invalid amount" points stayed at 15 | Pass |
| RP-06 | Click Redeem with no type selected | Rep: Brody, Points: 5, Type: (none) | "Please select a rep and a type" pop-up and the balance stays at 15 | Had to restart app to get a blank redeem box. "Error: please select a rep and type" | Pass |
| RP-07 | Redeem for a different type | Rep: Brody, Points: 5, Type: Product | The balance drops from 15 to 10 | "Points redeemed successfully" points dropped to 10 | Pass |
| RP-08 | Redeem the exact balance | Rep: Brody, Points: 10, Type: Store Credit | The balance drops from 10 to 0 and never goes negative | "Points redeemed successfully" points now at 0 | Pass |
| RP-09 | Pick different reps and watch the current points label | Select Hooper, then Quint | The label shows 50 for Hooper, then 10 for Quint | Quint shows 10 and Hooper shows 50 | Pass |
| RP-10 | Select Quint on Redeem, go to Log Post and log a post for Quint, then return to the Redeem tab | Quint, Platform: Instagram, URL: `https://example.com/quint-barrels` | The current points label refreshes from 10 to 20 when the Redeem tab opens | it refreshed from 10 to 20 | Pass |

## Team Tab and View History

**Starting state:** Brody has 2 posts and 0 points, Quint has 2 posts and 20 points, and Hooper has 5 posts and 50 points.

| Test ID | Steps | Input | Expected Output | Actual Result | Pass/Fail |
|---|---|---|---|---|---|
| TM-01 | Open the Team tab | None | The table shows Name, Email, Discount Code, Personal Code, Posts, and Points for all three reps, and the Posts and Points values match the starting state | everything matches | pass |
| TM-02 | Click View History with no row selected | None | "Please select a rep first" pop-up | "Warning: Please select a rep first" | Pass |
| TM-03 | Select Brody and click View History | Row: Brody | A window titled "Brody Point History" opens and lists only Brody's transactions: two posts at +10 with their URLs, and three redemptions at -5, -5, and -10 labeled Cash Payout, Product, and Store Credit | Everything is listed as described | Pass |
| TM-04 | Select Hooper and click View History | Row: Hooper | The window lists only Hooper's five posts, each at +10 with its URL, and none of Brody's or Quint's transactions | only Hooper's posts are listed | Pass |

## Calculated Values

**Starting state:** the same as the Team Tab section. Post counts and point balances are calculated, not stored, so they must always match the underlying records.

| Test ID | Steps | Input | Expected Output | Actual Result | Pass/Fail |
|---|---|---|---|---|---|
| CV-01 | Compare Hooper's Posts column to the posts in the data file | Hooper's POST lines in `shiver-data.txt` | The Posts column shows 5, the same as the number of POST lines for Hooper's ID | Shows all 5 in both | Pass |
| CV-02 | Add up the amounts in Brody's View History | Brody's five history rows | The amounts add up to 0, the same as the Points column for Brody | adds up correctly | Pass |
| CV-03 | Add up the amounts in Quint's View History | Quint's history rows | The amounts add up to 20, the same as the Points column for Quint | adds up correctly | Pass |

## Delete a Rep

**Starting state:** Brody, Quint, and Hooper exist with the posts and points from the earlier sections.

| Test ID | Steps | Input | Expected Output | Actual Result | Pass/Fail |
|---|---|---|---|---|---|
| DL-01 | Click Delete with no row selected | None | "Please select a rep first" pop-up | "Warning: Please select a rep first | Pass |
| DL-02 | Select Hooper, click Delete, and cancel the confirmation | Row: Hooper | A confirmation asks about deleting 1 rep and warns that posts and history are deleted too. After Cancel, Hooper is still in the table | Hooper is still there | Pass |
| DL-03 | Select Hooper, click Delete, and confirm | Row: Hooper | Hooper is removed from the table, Hooper's posts and transactions are removed from the data file, and Brody's and Quint's posts and points are unchanged | Hooper is now gone and nothing else changed | Pass |
| DL-04 | Open the Log Post and Redeem tabs after deleting Hooper | None | Hooper no longer appears in either rep dropdown | Hooper doesn't appear anywhere | Pass |
| DL-05 | Select Brody and Quint together using Ctrl and click, then click Delete and confirm | Rows: Brody and Quint | The confirmation says 2 reps, both reps are removed, and the table is empty | Both reps are deleted | Pass |

## IDs

**Starting state:** stop the app, delete `shiver-data.txt`, and run the app so the data starts fresh. Open the data file after each step to read the IDs.

| Test ID | Steps | Input | Expected Output | Actual Result | Pass/Fail |
|---|---|---|---|---|---|
| ID-01 | Add Brody, Quint, and Hooper, then open the data file | Three reps with the cast info | The REP lines have IDs 1, 2, and 3, and the NEXT line starts with 4 | Next shows 4 | Pass |
| ID-02 | Delete Hooper, then add Vaughn | Vaughn with the cast info | Vaughn gets ID 4, not 3, in the same session | Vaughn got 4 | Pass |
| ID-03 | Delete Vaughn, who has the highest ID, close the app with the X, run it again, and add Ellen | Ellen with the cast info | Ellen gets ID 5, not 4, because the saved counter survives the restart | Ellen got ID 5 | Pass |
| ID-04 | Log a post for Brody, delete Quint, close the app, run it again, and log another post for Brody | Brody, Platform: Facebook, with a valid URL each time | The second post has a higher ID than the first, and no post or transaction ID is repeated | Everything matches as assumed | Pass |

## File Saving and Loading

**Starting state:** stop the app, delete `shiver-data.txt`, and run the app so the data starts fresh.

| Test ID | Steps | Input | Expected Output | Actual Result | Pass/Fail |
|---|---|---|---|---|---|
| FL-01 | Run the app with no data file | None | The app opens with an empty Team table and no error appears | No error appears | Pass |
| FL-02 | Add Brody, then check the folder | Brody with the cast info | `shiver-data.txt` is created at `pr-app/src/` without closing the app | Brody added | pass |
| FL-03 | Open the data file in VS Code | None | The file has the headings NEXT IDS, REPS, POSTS, and TRANSACTIONS, with a blank line between sections and the NEXT line first | Everything appears normally | Pass |
| FL-04 | Log a post for Brody, redeem 5 points, close the app with the X, and run it again | Brody, Platform: Facebook, Points: 5, Type: Cash Payout | Brody shows 1 post and 5 points on the Team tab, and View History shows both transactions with their original dates, not the date of the restart | Everything shows appropriately | Pass |
| FL-05 | Add Quint, stop the app with the VS Code stop button, and run it again | Quint with the cast info | Quint is still on the Team tab, because every change is saved when it happens | After restart, Quint is listed | Pass |
| FL-06 | Redeem points, stop the app with the stop button, and run it again | Brody, Points: 5 | The reduced balance is still shown, because redemptions are saved when they happen | Worked just fine | Pass |

## User Interface

| Test ID | Steps | Input | Expected Output | Actual Result | Pass/Fail |
|---|---|---|---|---|---|
| UI-01 | Look at the top of the window | None | The banner shows "Shiver" with "by Kelpkin" on the same row, and the tagline "Your PR team, swimming in sync." below it | Banner looks great | Pass |
| UI-02 | Click each of the four tabs in turn | None | The open tab is aqua and the other three are plain | Open tab is aqua | Pass |
| UI-03 | Click into a text field on the Add Rep tab | None | An aqua ring shows around the field, so the selected field is easy to see | Ring shows around the field | Pass |
| UI-04 | Complete a successful add, post, and redeem | None | Each success message appears in dark teal text | Each message appears in dark teal | pass |

## Cases From Phase 1 That Were Dropped

| Phase 1 Area | Why It Was Dropped |
|---|---|
| Main Menu (MM-01 to MM-03) | There is no console menu in the window version, and the tabs replace it |
| Capacity Limits (CAP-01 to CAP-03b) | ArrayLists have no fixed capacity, so the limits no longer exist |
| Type 0 to return to the main menu (AR-05, LP-02, LP-03, RP-02) | There is no menu to return to, and the window can simply be left |

## Bug Log

| Bug ID | Found In | Description | Fix | Status |
|---|---|---|---|---|
| BUG-01 | AR-02 | The Add Rep handler allows a rep to be added with a blank name instead of displaying a validation error and rejecting the entry. | Add blank-name validation to the Add Rep handler before saving the rep. | Open |

## Results Summary

| Section | Cases | Passed | Failed | Not Run |
|---|---:|---:|---:|---:|
| Add a PR Rep | 9 | 8 | 1 | 0 |
| Log a Post | 8 | 8 | 0 | 0 |
| Redeem Points | 10 | 10 | 0 | 0 |
| Team Tab and View History | 4 | 4 | 0 | 0 |
| Calculated Values | 3 | 3 | 0 | 0 |
| Delete a Rep | 5 | 5 | 0 | 0 |
| IDs | 4 | 4 | 0 | 0 |
| File Saving and Loading | 6 | 6 | 0 | 0 |
| User Interface | 4 | 4 | 0 | 0 |
| **Total** | **53** | **52** | **1** | **0** |