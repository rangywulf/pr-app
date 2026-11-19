# Shiver Demo and Run-Through Guide

*Phase 3 (TESD 1100) | Shiver by Kelpkin*

This guide walks through every page of the Shiver owner dashboard in one sitting: Overview, Reps, and Posts, then the phone layout. It uses the sample data in `data.js`, so the expected results below assume a fresh page load. The sample reps are characters from Kevin Smith films.

The Phase 2 version of this guide, which walks through the JavaFX app, is in the `phase2-javafx` folder.

## How to Run

1. Open the `phase3-site` folder.
2. Open `index.html` in a web browser (Chrome, Edge, Firefox, or Safari).
3. Stay connected to the internet. The fonts, icons, and chart library load from online sources.

**Changes reset on reload.** All data lives in memory, and each page loads the sample data fresh. Approving a post on the Posts page and then opening Overview shows the original numbers again. To start over on any page, reload it.

## 1. The Page Frame

On any page, you should see:

- A deep teal top bar with the white Shiver logo on the left, and an "HG" circle with "Hippie Goth Stickers" on the right.
- A cream sidebar with Overview, Reps, and Posts. The current page is highlighted in mint.
- A sand page area with white cards.

Click each sidebar link in turn. Each page opens, and the highlight moves to that page.

## 2. Overview (index.html)

| Part | Expected Result |
| --- | --- |
| Greeting | "Good morning", "Good afternoon", or "Good evening, Hippie Goth Stickers", depending on the time of day |
| Active reps card | 4 |
| Approved posts card | 8 |
| Sales from codes card | $0 (a placeholder until sales data is added) |
| Posts to review card | 4 |
| Needs review list | Silent Bob, Veronica Loughran, Jay, and Dante Hicks, oldest first, each with "Posted N days ago". Hovering a date shows the exact date |
| Top reps table | Dante Hicks (3 posts, 30 points), Jay (2, 20), then Silent Bob, Randal Graves, and Veronica Loughran (1, 10 each). Sales show $0 |

**The chart.** "Approved posts over time" shows a line for each of the last 30 days, with the sample posts between Nov 1 and Nov 10.

| Step | Do this | Expected Result |
| --- | --- | --- |
| Hover the line | Move over a point | A tooltip shows the date and the number of approved posts |
| Pick a platform | Click **Instagram** | The line animates to show only Instagram posts (3 in total), and the Instagram tab turns mint |
| Pick a platform with no approved posts | Click **Substack** | The line is flat at 0 |
| Go back | Click **All** | The full line returns |

**Links.** Click a row in Needs review, "Review all posts", or the **Review posts** button. Each one opens the Posts page.

## 3. Reps (reps.html)

The subtitle shows "6 reps", and the table is sorted by name: Caitlin Bree, Dante Hicks, Jay, Randal Graves, Silent Bob, and Veronica Loughran.

### Tabs, search, and sort

| Step | Do this | Expected Result |
| --- | --- | --- |
| Filter by status | Click **Active** | Jay, Silent Bob, Dante Hicks, and Veronica Loughran |
| | Click **Paused** | Randal Graves, with a sand badge |
| | Click **Invited** | Caitlin Bree, with a white badge and teal border |
| Go back | Click **All** | All 6 reps |
| Search | Type `da` | Dante Hicks and Randal Graves (both names contain "da") |
| Search with capitals | Type `DANTE` | Dante Hicks. Search ignores capital letters |
| Search for no one | Type `zzz` | "No reps found" |
| Clear the search | Delete the text | All 6 reps return |
| Sort | Choose **Sort: Most points** | Silent Bob, Randal Graves, and Veronica Loughran (10 each), then Jay and Dante Hicks (5 each), then Caitlin Bree (0) |

Tabs, search, and sort work together. For example, the Active tab with `da` typed in shows only Dante Hicks.

### Side panel

| Step | Do this | Expected Result |
| --- | --- | --- |
| Open a rep | Click **Jay** | A panel slides over the right side and the rest of the page dims. It shows Jay's email, an Active badge, discount code JAY30, and PR code JAY10 |
| Social media | Hover the icons | YouTube and TikTok icons. Hovering shows each handle |
| Stats | Look at the middle card | Balance 5, Posts 2, Redeemed 15 |
| History | Look at the bottom card | Nov 1, 2026 YouTube post +10 and Nov 3, 2026 TikTok post +10 in green, and Nov 14, 2026 Redeem for merch -15 in deep teal |
| Close | Click **✕** | The panel closes |
| A rep with no history | Click **Caitlin Bree** | An Invited badge, one Instagram icon, Balance 0, Posts 0, Redeemed 0, and "No history yet" |

### Add rep

| Step | Input | Expected Result |
| --- | --- | --- |
| Open the popup | Click **Add rep** | The Add rep popup opens in the center, and the page dims |
| Leave a field blank | Name: blank, Email: blank, click **Save rep** | The browser asks you to fill in the field. Nothing is saved |
| Enter a bad email | Name: `Brodie Bruce`, Email: `brodie` | The browser asks for a valid email. Nothing is saved |
| Cancel | Click **Cancel** (or press Esc) | The popup closes. Open it again and the fields are blank |
| Add a valid rep | Name: `Brodie Bruce`, Email: `brodie@example.com` | The popup closes, "Rep added" shows in the corner, and the subtitle changes to "7 reps" |
| Check the new rep | Click **Invited**, then click **Brodie Bruce** | Brodie has an Invited badge, discount code BRODIE30, PR code BRODIE10, "No social accounts yet", and "No history yet" |

## 4. Posts (posts.html)

The Pending tab is open, with an orange **4** on it. The review bar says "4 posts waiting for your review", and there are 4 cards: Silent Bob (Facebook, Nov 12), Veronica Loughran (Substack, Nov 13), Jay (TikTok, Nov 14), and Dante Hicks (Facebook, Nov 15). Each shows its source and "+10 pts".

### Approve and reject

| Step | Do this | Expected Result |
| --- | --- | --- |
| Approve one | Click **Approve** on Jay's card | "Post approved" shows, the card fades out, the count drops to 3, and the bar says "3 posts waiting for your review" |
| Reject one | Click **Reject** on Dante Hicks's card | "Post rejected" shows, the card fades out, and the count drops to 2 |
| Check Approved | Click **Approved** | A table of 9 approved posts. Jay's TikTok post shows today's date under Reviewed. No Status column |
| Check Rejected | Click **Rejected** | Randal Graves's YouTube post and Dante Hicks's Facebook post, with today's date under Reviewed for Dante's |
| Check All | Click **All** | All 13 posts, with a Status column and colored badges. The 2 posts still pending show "—" under Reviewed |

### Approve all

| Step | Do this | Expected Result |
| --- | --- | --- |
| Open the confirmation | Click **Pending**, then **Approve all** | A popup asks "Approve 2 posts?" |
| Cancel | Click **Cancel** | The popup closes, and both posts are still pending |
| Approve | Click **Approve all**, then **Approve** | "2 posts approved" shows, the count drops to 0, and the bar says "0 posts waiting for your review" |

### Add post

| Step | Input | Expected Result |
| --- | --- | --- |
| Open the popup | Click **Add post** | The Add post popup opens, with Points set to 10 |
| Check the rep list | Open the Rep dropdown | Every rep except Caitlin Bree, who is invited |
| Leave fields blank | Click **Save post** | The browser asks you to fill in the first empty field |
| Enter a bad link | Post link: `instagram.com/lasagna` | The browser says the link must start with `https://` |
| Add a valid post | Rep: Veronica Loughran, Platform: Instagram, Post link: `https://instagram.example.com/lasagna`, Date: any day, Points: `25` | The popup closes and "Post added" shows |
| Find the new post | Click **Approved** | Veronica's Instagram post is in the table, approved, with "Added by shop owner", +25, and today's date under Reviewed |

## 5. Phone Layout

Open Chrome's phone view: press `F12`, then `Ctrl` + `Shift` + `M`, and choose a phone from the device list at the top.

| Step | Do this | Expected Result |
| --- | --- | --- |
| Top bar | Look at the top | A ☰ button, the logo, and the "HG" circle. The shop name is hidden |
| Menu | Tap **☰** | The sidebar opens below the top bar. Tap ☰ again to close it |
| Overview | Open Overview | Metric cards are 2 per row, and the chart sits above Needs review |
| Reps | Open Reps | The search box fills the width, with the sort dropdown below it. The table scrolls sideways inside its card |
| Side panel | Tap a rep | The panel fills the screen width |
| Posts | Open Posts | Cards stack in one column, and the tabs wrap onto a second line if needed |
| Popups | Tap **Add post** | The popup fills most of the screen width |

---

## Notes on Known Limitations

- **Changes reset on reload:** all data lives in memory, and each page loads the sample data fresh.
- **Sales:** every sales number shows $0 until sales data is added.
- **Duplicate reps:** Add rep doesn't check for duplicates. A second rep named Jay would also get `JAY10`.
- **Dates move with today:** the chart and "Posted N days ago" count back from today, so the sample posts slowly fall off the chart as real days pass.
- **New posts on the Pending tab:** a post added from the Pending tab is approved right away, so it shows on the Approved tab, not on Pending.
- **Internet needed:** the fonts, icons, and chart library load from online sources.

For how the site was tested, see the Testing section of the README. Every page passed a full click-through on desktop and phone on Nov 19, 2026.