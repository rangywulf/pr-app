# Shiver Demo and Run-Through Guide

*Phase 2 (TESD 1800) | Shiver by Kelpkin*

This guide walks through the Shiver app's core features in one sitting. It follows the same scenarios as `pr-app-phase2-test-cases.md`, in an order that builds up the app's data naturally: add reps, log posts, redeem points, look at the results, delete a rep, and then close and reopen the app to see the saved data come back. The test data uses characters from Jaws.

The Phase 1 version of this guide, which walks through the console menu, is in `docs/phase-1/demo-walkthrough.md`.

## How to Run

1. Make sure JavaFX is set up for the project. It is the only library the app needs.
2. Compile and run `Main.java` from your IDE or the terminal.
3. Run the app from the folder that contains `pr-app`, because the data file is saved at `pr-app/src/shiver-data.txt`.

**For a clean start,** close the app, delete `pr-app/src/shiver-data.txt` if it exists, and run the app again. Without a data file, the app opens empty. The expected results in this guide assume a clean start.

## 1. The Window

On launch, you should see:

- A dark teal banner with "Shiver" and "by Kelpkin" on the same row, and the tagline "Your PR team, swimming in sync." below.
- Four tabs: Team, Add Rep, Log Post, and Redeem. The Team tab is open and shown in aqua.
- An empty table with the message "No content in table".

Click each tab in turn. The open tab turns aqua and the other three stay plain.

## 2. Add a PR Rep (Add Rep tab)

Open the **Add Rep** tab. Try each of the following, in order:

| Step | Input | Expected Result |
| --- | --- | --- |
| Leave Name blank | Email: `quint@test.com` | An error pop-up: "Name cannot be empty." Nothing is added |
| Enter an email with no `@` | Name: `Quint`, Email: `notanemail.com` | An error pop-up: "Invalid email" |
| Enter an email with no dot after the `@` | Email: `quint@testcom` | An error pop-up: "Invalid email" |
| Type a pipe character | Name: `Qu\|int` | An error pop-up about an invalid character |
| Enter a valid rep | `Brody`, `brody@test.com`, `BRODY10`, `BRODYPR` | "PR Rep added successfully." appears in dark teal, and the fields clear |
| Reuse that email | Name: `Quint`, Email: `brody@test.com` | An error pop-up: "Email already exists" |

**Add two more reps** the same way:

| Name | Email | Discount Code | Personal Code |
| --- | --- | --- | --- |
| Quint | quint@test.com | QUINT10 | QUINTPR |
| Hooper | hooper@test.com | HOOPER10 | HOOPERPR |

Open the **Team** tab. All three reps are in the table, each with 0 posts and 0 points.

## 3. Log a Post (Log Post tab)

Open the **Log Post** tab. The name dropdown lists the three reps.

| Step | Input | Expected Result |
| --- | --- | --- |
| Click Add with nothing chosen | None | An error pop-up: "Please select a rep and a platform" |
| Use a link that is not secure | Rep: Brody, Platform: Facebook, URL: `example.com` | An error pop-up: "Invalid URL. Must start with https://" |
| Log a valid post | Rep: Brody, Platform: Facebook, URL: `https://example.com/amity-beach` | "Post logged successfully" appears, and the URL field clears |
| Log a second post | Rep: Brody, Platform: TikTok, URL: `https://example.com/orca-hunt` | "Post logged successfully" |
| Log a post for another rep | Rep: Quint, Platform: YouTube, URL: `https://example.com/quint-boat` | "Post logged successfully" |

Each logged post earns 10 points. On the **Team** tab, Brody now shows 2 posts and 20 points, and Quint shows 1 post and 10 points.

## 4. Redeem Points (Redeem tab)

Open the **Redeem** tab. Pick **Brody** from the name dropdown. "Current points" shows 20.

| Step | Input | Expected Result |
| --- | --- | --- |
| Enter more than the balance | Points: `100`, Type: Cash Payout | An error pop-up: "Invalid amount", and the balance stays at 20 |
| Enter zero or a negative number | Points: `0` or `-5` | An error pop-up: "Invalid amount" |
| Enter text | Points: `abc` | An error pop-up: "Invalid amount" |
| Leave the type unchosen | Points: `5` | An error pop-up: "Please select a rep and a type" |
| Redeem a valid amount | Points: `5`, Type: Cash Payout | "Points redeemed successfully.", and "Current points" drops to 15 |

Redeem once more for a different type, such as 5 points for Product. The balance drops to 10.

## 5. The Team Tab and View History

Open the **Team** tab. Brody shows 2 posts and 10 points.

| Step | Do this | Expected Result |
| --- | --- | --- |
| Click View History with no row selected | None | A warning pop-up: "Please select a rep first" |
| Select Brody and click **View History** | Click the Brody row | A window titled "Brody Point History" opens. It lists his two posts at +10 with their links, and his two redemptions at -5, labeled "Redeem for Cash Payout" and "Redeem for Product". Each row has a date |

Close the history window. The history for each rep shows only that rep's transactions.

## 6. Delete a Rep (Team tab)

| Step | Do this | Expected Result |
| --- | --- | --- |
| Click Delete with no row selected | None | A warning pop-up: "Please select a rep first" |
| Select Hooper, click **Delete**, and click Cancel | Click the Hooper row | A confirmation warns that the rep's posts and point history will be deleted too. After Cancel, Hooper is still in the table |
| Click **Delete** again and confirm | Click the Hooper row | Hooper is removed. Brody and Quint are unchanged |

You can also select several reps at once by holding Ctrl and clicking. The confirmation then shows how many reps will be deleted.

Open the **Log Post** and **Redeem** tabs. Hooper no longer appears in either dropdown.

## 7. Saving and Loading

The app saves after every change, so everything you have done so far is already in the data file.

| Step | Do this | Expected Result |
| --- | --- | --- |
| Look at the file | Open `pr-app/src/shiver-data.txt` in your editor | A labeled file with the sections NEXT IDS, REPS, POSTS, and TRANSACTIONS, and one record per line |
| Close and reopen | Close the window and run the app again | Brody and Quint are back in the Team table with the same posts and points |
| Check the history | Select Brody and click View History | Both posts and both redemptions are there, each with its original date and not the date of the restart |
| Add a new rep | Add `Vaughn` (`vaughn@test.com`, `VAUGHN10`, `VAUGHNPR`) | Vaughn is added with a new ID that no earlier rep used |

You can also stop the app with your editor's stop button after making a change. Reopen it, and the change is still there.

## 8. Exit

Close the window. There is no menu to return to. The data was already saved with the last change, and it is saved once more when the window closes.

---

## Notes on Known Limitations

- **The pipe character:** the pipe separates the fields in the data file, so it cannot be used in any text field.
- **Dropdowns:** once a rep, platform, or type is chosen, it cannot be cleared without restarting the app.
- **File location:** the data file path is relative to the folder the app is launched from, so run the app from the folder that contains `pr-app`.
- **One computer:** all data is stored in one local file. It is not shared or backed up.

For the full test log behind this walkthrough, see `docs/pr-app-phase2-test-cases.md`. All 53 cases pass, and one bug, a blank name being accepted, was found and fixed during testing.