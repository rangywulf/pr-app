# Shiver Phase 3: Owner Dashboard Website

*Shiver by Kelpkin | Your PR team, swimming in sync.*

## Overview

Shiver Phase 3 is a client-side website that shows what Shiver looks like for a shop owner. It has three pages: Overview, Reps, and Posts. From these pages, an owner can see how their PR team is doing, look up each rep's codes, points, and history, add reps and posts, and approve or reject the posts reps submit.

This phase was built for TESD 1100 with HTML, CSS, and JavaScript. It runs entirely in the browser using sample data, so any changes last until the page is reloaded. It is styled to look and feel like a Shopify app, since a later phase will run Shiver inside the Shopify admin.

## Why I Built This

Phase 2 proved that the core rules work: adding reps, logging posts, and calculating points from history. Phase 3 answers the next question: what should the shop owner actually see when they open the app?

I focused on the owner first because the owner is the one who installs the app and runs the PR program. Reps will get their own view, the PR Portal, in a later phase once login is added. I also built the code so that the database, Shopify, and the PR Portal can slot in later without a rewrite.

## Project Goals

The goal of this phase is to turn Shiver's core rules into a website a shop owner could actually use, while demonstrating client-side web development concepts and practices.

This phase focuses on:

- Giving the shop owner a quick read on how their PR team is doing
- Making post review fast, with approve and reject on each post
- Showing each rep's codes, social accounts, points, and history in one place
- A professional, Shopify-style design that works on desktop and phone
- Code organized so the database, Shopify, and the PR Portal can be added later

## Implemented Features (Phase 3)

Shiver Phase 3 currently supports:

- Three pages (Overview, Reps, and Posts) connected by a sidebar, with a ☰ menu on phones
- **Overview:** a time-of-day greeting, four metric cards, a line chart of approved posts over the last 30 days with platform tabs (built with Chart.js), a Needs review list sorted oldest first, and a Top reps table
- **Reps:** a table with filter tabs (All, Active, Paused, Invited), search by name, and sorting by name or points
- A rep side panel with their email, codes, social media links, stats, and dated point history
- Adding a rep, who starts as invited and gets a PR code and discount code made from their first name
- **Posts:** pending posts shown as cards with Approve and Reject buttons, and approved, rejected, and all posts shown as a table with Posted and Reviewed dates
- Approve all, with a styled confirmation box
- Adding a post by hand, for posts the owner finds or a rep sends in
- Form checks using the browser's built-in validation (required fields, email format, links that must start with `https://`)
- Short pop-up messages (toasts) after each action, and a friendly message in place of any empty list or table
- A mobile layout that switches at 768px wide
- Kelpkin and Shiver branding, with colors checked for readability

## Planned Features

Future phases will build on Phase 3 to add:

- A database, so changes are saved instead of lasting only until the page reloads (Phase 4)
- Running Shiver inside the Shopify admin (Phase 5)
- Sales tracking from each rep's PR code, filling in the Sales columns that show $0 for now
- A Reports page with charts comparing sales and points (Phase 6)
- The PR Portal, where reps log in to see their points, codes, and posts
- Invite emails for new reps, and adding social accounts when adding a rep
- Buttons to pause a rep, set them back to active, or mark them inactive
- A Settings page, including an option to auto-approve detected Instagram and Facebook posts
- Links from each post to the real post on social media
- A dark mode

## How to Run

1. Open the `phase3` folder.
2. Open `index.html` in a web browser (Chrome, Edge, Firefox, or Safari). From there, use the sidebar to move between pages.
3. Stay connected to the internet. The fonts, icons, and chart library load from online sources.

No install or setup is needed. All data is sample data, and any changes reset when the page is reloaded.

## Technology Choices

- **HTML, CSS, and JavaScript:** these are the languages taught in TESD 1100, and they run in any browser with nothing to install.
- **A Shopify-style design:** the layout, tabs, and badges follow the look of Shopify's own admin (called Polaris), since Shiver will run inside Shopify in a later phase.
- **Three CSS files:** `brand.css` holds the colors and fonts as variables, `layout.css` holds the page frame (top bar, sidebar, and the phone layout), and `components.css` holds everything else, grouped by page. Because every color lives in one place, the Shopify version or a dark mode only needs new values, not new rules.
- **JavaScript split by job:**

| File | Job |
| --- | --- |
| `data.js` | Sample data only |
| `data-access.js` | Reading and saving data |
| `logic.js` | Rules and math |
| `ui.js` | Shared pieces used by more than one page (toasts, the ☰ menu) |
| `overview.js`, `reps.js`, `posts.js` | Code for one page only |

- **Pages never touch the data directly:** they ask for it through small "get" functions like `getReps()` and `getPosts()`. When the database is added, only the inside of these functions changes.
- **Logic kept apart from display:** for example, `calculateBalance()` does the math, and the side panel only shows the result. The same math can be reused in the PR Portal and later replaced by a database query.
- **Data shaped like a future database:** every object has an `id`, posts and transactions point to their rep with `repId`, and status, platform, and source values use fixed words. Dates use the `YYYY-MM-DD` format and `null` for "no date yet," which matches how databases store them.
- **Calculated values:** like Phase 2, a rep's points are calculated from their history instead of stored, so the numbers can never fall out of sync.
- **Chart.js for the chart:** a library draws the chart, but the counting and filtering are my own code. The counting step is written so it can become a database query later.
- **Built-in browser features:** popups use the `<dialog>` element, and forms use the browser's own validation, so neither needed extra code.
- **Bootstrap Icons:** one icon set for the whole site, chosen because it has logos for all five platforms, including Substack.

## Testing

Unit testing is not covered in this course, so I tested by hand in three ways:

- **A full click-through on desktop and phone.** I used every page, tab, filter, search, sort, button, and popup, on a desktop browser and in Chrome's phone view (the device toolbar). Every page passed on both.
- **Checks in the browser Console.** I called functions directly to test rules on their own. For example, running `approvePost(id)` and then `rejectPost(id)` on the same post confirmed that a post can only be reviewed once, and `addInvitedRep("Brodie Bruce", "brodie@example.com")` confirmed that a new rep is saved as invited with the codes `BRODIE10` and `BRODIE30`.
- **Color contrast checks.** I checked text and background pairs with the WebAIM contrast formula, aiming for a score of at least 4.5. Several colors were darkened or swapped because of it.

## Problems Encountered & What I Learned

- **A tab that "did nothing."** After saving a post by hand, the Approved tab stopped working. The Console showed a crash on `.name` while building the table. Tracing it back, the saved post had `repId: undefined`, because I had written `Number(element).value` instead of `Number(element.value)`. The visible problem was two steps away from the real cause, and the Console error is what led me back to it.
- **A double click that gave 20 points.** Clicking Approve twice quickly could approve the same post twice and give the rep double points. I added a check so `approvePost` and `rejectPost` only work on pending posts, which also stops an approved post from being rejected while keeping its points.
- **Points that didn't match.** `approvePost` always gave 10 points, even after posts got their own `points` field. I changed it to give `post.points`, so the number on the card always matches what the rep gets.
- **A missing reviewed date.** When I added the Reviewed column, posts added by the owner were saved without a reviewed date, even though they are approved right away. I updated `addPost` to set today's date for any post that isn't pending.
- **A form that reloaded the page.** Submitting a form makes the browser reload the page by default. Because the data lives in memory, the reload wiped the new rep, so it looked like nothing happened. Calling `event.preventDefault()` in the submit listener fixed it.
- **A popup that looked off-center on phones.** The popup itself was fine. The search and sort row was wider than the screen, which stretched the whole page, and the popup centered itself on the stretched page. I learned that one element that's too wide can throw off everything else.
- **One crash stops everything after it.** The error `Cannot read properties of null (reading 'addEventListener')` means `getElementById` found nothing, usually because an id in the HTML doesn't match the JavaScript. Since the setup calls run in order at the bottom of each file, one crash meant nothing after it ran, so whole sections of the page stayed blank.
- **CSS can't color a chart.** Chart.js draws on a `<canvas>`, which is painted pixels, so CSS rules don't reach it. I used `getComputedStyle` to read the brand color variables in JavaScript, so `brand.css` stays the one home for colors.
- **A shadow that got covered.** The top bar's shadow disappeared because the sidebar and page come after it in the HTML and were painted on top. Adding `position: relative` and `z-index` to the top bar brought the shadow back to the front.
- **Old files in the browser.** Sometimes a fix seemed not to work because the browser was still using an old copy of a CSS or JS file. A hard refresh (`Ctrl` + `Shift` + `R`) loads the newest version.

## What I'd Do Differently

Phone layout was added near the end, once I confirmed the demo needed it. It went smoothly because the frame was already built with a grid, but next time I would check each page on a phone as I build it instead of saving it for last.

I also copied some code between pages to get it working, like the tab setup in `reps.js` and `posts.js` and the popup open and close code. That was the right call before a demo, but the better habit is to move shared code into `ui.js` as soon as a second page needs it, the way I did with `showToast`. That cleanup is planned for right after the demo.

What worked best was deciding the rules before writing code: terms, colors, comment style, and which file each kind of code belongs in. Having those written down meant I spent less time second-guessing and more time building.

## Documentation

| Document | What it covers |
| --- | --- |
| [Phase 3 Design Document](docs/phase3-design-document.md) | The as-built design, with pages, layout, colors, fonts, and the phone layout |
| [Requirements](docs/requirements.md) | What the site must do, including the TESD 1100 requirements |
| [Architecture](docs/architecture.md) | How the pages, CSS files, and JavaScript files fit together |
| [Data Model](docs/data-model.md) | The sample data arrays, their fields, and the fixed words they use |
| [Demo Walkthrough](docs/demo-walkthrough.md) | A guided run through every page |

## Project Structure

```text
phase3-site/
├── index.html          (Overview)
├── reps.html
├── posts.html
├── css/
│   ├── brand.css       (colors and fonts)
│   ├── layout.css      (top bar, sidebar, page, and phone layout)
│   └── components.css  (cards, tables, tabs, popups, grouped by page)
├── js/
│   ├── data.js         (sample data)
│   ├── data-access.js  (reading and saving data)
│   ├── logic.js        (rules and math)
│   ├── ui.js           (shared toasts and ☰ menu)
│   ├── overview.js
│   ├── reps.js
│   └── posts.js
├── images/
│   ├── Shiver_Main_Logo.png
│   └── Shiver_Main_Logo_White.png
├── docs/
└── README.md
```