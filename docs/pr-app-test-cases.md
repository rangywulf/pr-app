# PR App — Test Cases

## Add a PR Rep

| Test ID | Steps | Input | Expected Output | Actual Result | Pass/Fail |
|---|---|---|---|---|---|
| AR-01 | Select menu option 1, enter valid data for all fields | Name: `Belle`, Email: `belle@test.com`, Discount: `BELLE10`, PR Code: `BELLEPR` | "PR Rep added successfully." Rep count increases by 1. | | |
| AR-02 | Leave name blank, then enter valid name | Name: (empty, then) `Beast` | "Name cannot be empty." repeats until valid name given | | |
| AR-03 | Enter an email with no `@` | Email: `notanemail.com` | "Invalid email" — reprompts | | |
| AR-04 | Enter an email that already exists on another rep | Email: `belle@test.com` (duplicate) | "Email already exists" — reprompts | | |
| AR-05 | Type `0` at the name prompt | `0` | Cancels, returns to main menu, no rep added | | |

## Log a Post

| Test ID | Steps | Input | Expected Output | Actual Result | Pass/Fail |
|---|---|---|---|---|---|
| LP-01 | Log a post with valid rep, platform, and URL | Rep: `1`, Platform: `1` (Facebook), URL: `https://example.com` | "Log created, returning to main menu." Rep's post count and points increase. | | |
| LP-02 | Type `0` at rep selection | `0` | "Returning to main menu." — cancels cleanly, no post logged | | |
| LP-03 | Type `0` at platform selection | Rep: `1`, Platform: `0` | "Returning to main menu." — cancels cleanly, no post logged | | |
| LP-04 | Enter an invalid rep number, then a valid one | Rep: `99`, then `1` | "Invalid Choice" — reprompts until valid | | |
| LP-05 | Enter a URL without `https://` | URL: `example.com` | "Invalid url" — reprompts | | |
| LP-06 | Attempt to log a post with zero reps in the system | (no reps added yet) | "No PR Reps found. Please add a PR rep before continuing." — returns to main menu | | |

## Redeem Points

| Test ID | Steps | Input | Expected Output | Actual Result | Pass/Fail |
|---|---|---|---|---|---|
| RP-01 | Redeem a valid point amount for an existing rep | Rep: `1`, Points: `5`, Type: `1` (Cash) | Points deducted from rep's total; "Total points left to redeem: X" | | |
| RP-02 | Type `0` at rep selection | `0` | "Returning to main menu." — cancels cleanly | | |
| RP-03 | Attempt to redeem more points than the rep has | Points: (greater than balance) | "Invalid amount. Enter a number greater than 0 and no more than your available points." | | |
| RP-04 | Redeem points, then choose to redeem again for another rep in the same session | Redeem once, then select another rep | Loop continues; second redemption processes correctly | | |
| RP-05 | Attempt to redeem with zero reps in the system | (no reps added yet) | "No PR Reps found. Please add a PR rep before continuing." | | |

## View Dashboard

| Test ID | Steps | Input | Expected Output | Actual Result | Pass/Fail |
|---|---|---|---|---|---|
| VD-01 | View dashboard with at least one rep and one logged post | Select menu option 3 | Table displays rep ID, name, email, discount code, PR code, post count, and point total correctly aligned | | |
| VD-02 | View dashboard with zero reps | Select menu option 3 (no reps added) | "No PR Reps found. Nothing to display yet." | | |
| VD-03 | Press any key to return | (any key) | Returns to main menu | | |

## Main Menu

| Test ID | Steps | Input | Expected Output | Actual Result | Pass/Fail |
|---|---|---|---|---|---|
| MM-01 | Enter a non-numeric character at the main menu | `abc` | "Invalid input. Please enter a number." — reprompts | | |
| MM-02 | Enter a number outside 1-5 | `9` | "Invalid choice. Please select 1, 2, 3, 4, or 5." | | |
| MM-03 | Select option 5 | `5` | "Exiting program. Goodbye!" — program terminates | | |