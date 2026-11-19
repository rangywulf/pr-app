# Data Model

*Phase 3 (TESD 1100) | Shiver by Kelpkin*

The Phase 3 site stores four kinds of records: PR representatives, posts, point transactions, and social accounts. Each kind is a JavaScript array of objects in `data.js`. Every record has its own `id`, and records are linked to each other by matching those ids, the same way they were in Phase 2.

The data is sample data that lives in memory. Changes last until the page is reloaded. Pages never touch the arrays directly; they go through the functions in `data-access.js` (see `architecture.md`).

The Phase 2 version of this document is in the `phase2-javafx` folder.

## PR Representative (reps)

```text
Rep
├── id
├── name
├── email
├── status
├── discountCode
└── prCode
```

| Field | Example | Meaning |
| --- | --- | --- |
| `id` | `3` | Unique number for the rep |
| `name` | `"Dante Hicks"` | The rep's name |
| `email` | `"notevensupposedtobehere@example.com"` | The rep's email |
| `status` | `"active"` | One of `"active"`, `"paused"`, or `"invited"` |
| `discountCode` | `"DANTE30"` | The rep's personal code, for their own purchases |
| `prCode` | `"DANTE10"` | The code the rep shares with followers, used at checkout |

A rep does not store a post count or a point balance. Both are calculated, as described under Calculated Values.

### Rep statuses

| Status | Meaning |
| --- | --- |
| `"active"` | A working rep |
| `"paused"` | A rep taking a break. They still count in Top reps and can still be credited with posts |
| `"invited"` | Added by the owner but hasn't joined yet. Can't be credited with posts |

### Codes

New reps get their codes automatically from their first name in capitals: `NAME10` for the PR code and `NAME30` for the discount code, with no dashes. For example, a new rep named Brodie Bruce gets `BRODIE10` and `BRODIE30`.

## Post (posts)

```text
Post
├── id
├── repId
├── platform
├── url
├── status
├── date
├── source
├── points
└── reviewedDate
```

| Field | Example | Meaning |
| --- | --- | --- |
| `id` | `4` | Unique number for the post |
| `repId` | `3` | The id of the rep who made the post |
| `platform` | `"Instagram"` | One of the five platform words |
| `url` | `"https://instagram.example.com/not-even-supposed"` | Link to the post. Must start with `https://` |
| `status` | `"approved"` | One of `"pending"`, `"approved"`, or `"rejected"` |
| `date` | `"2026-11-05"` | The day the rep posted |
| `source` | `"auto"` | How the post arrived: `"auto"`, `"link"`, or `"owner"` |
| `points` | `10` | How many points the post is worth |
| `reviewedDate` | `"2026-11-05"` | The day the post was approved or rejected, or `null` while pending |

Each post stores its own `points`, so the number shown on the card always matches what the rep gets. Sample posts are worth 10, and the owner can set the points on posts they add.

### Post statuses

| Status | Meaning | Points given? |
| --- | --- | --- |
| `"pending"` | Waiting for the owner to review | No |
| `"approved"` | Accepted by the owner | Yes, once |
| `"rejected"` | Turned down by the owner | No |

A post can only change from pending to approved or rejected. Once reviewed, it can't be reviewed again.

### Post sources

| Source | Platforms | Label on screen |
| --- | --- | --- |
| `"auto"` | Instagram, Facebook | Auto-detected |
| `"link"` | TikTok, YouTube, Substack | Link submitted |
| `"owner"` | Any | Added by shop owner |

The source is stored on each post instead of worked out from the platform, because owner posts can be on any platform.

## Point Transaction (transactions)

A point transaction is one change to a rep's balance: points earned from an approved post, or points redeemed.

```text
Transaction
├── id
├── repId
├── postId
├── amount
├── reason
└── date
```

| Field | Example | Meaning |
| --- | --- | --- |
| `id` | `9` | Unique number for the transaction |
| `repId` | `3` | The id of the rep whose balance changed |
| `postId` | `-1` | The id of the post that earned the points, or `-1` for a redemption |
| `amount` | `-25` | Positive for points earned, negative for points redeemed |
| `reason` | `"Redeem for gift card"` | What the change was for |
| `date` | `"2026-11-12"` | The day the change happened |

| Reason | When it's used |
| --- | --- |
| `"Post logged"` | The owner approved a rep's post |
| `"Post logged by owner"` | The owner added a post by hand |
| `"Redeem for ..."` | A redemption, such as `"Redeem for gift card"` or `"Redeem for merch"` |

Redemptions appear in the sample data only. Processing new redemptions comes in a later phase.

## Social Account (socialAccounts)

A social account is one rep's handle on one platform. A rep can have several, one per platform. Social accounts are their own array, not a field on the rep, because each rep has a different handle on each platform.

```text
SocialAccount
├── id
├── repId
├── platform
├── handle
└── url
```

| Field | Example | Meaning |
| --- | --- | --- |
| `id` | `5` | Unique number for the account |
| `repId` | `3` | The id of the rep who owns it |
| `platform` | `"Instagram"` | One of the five platform words |
| `handle` | `"@noteven"` | The rep's name on that platform |
| `url` | `"https://instagram.example.com/@noteven"` | Link to the account |

The sample links use `example.com` because the handles might belong to real people.

## Fixed Words

Status, platform, and source values always use the same exact words, since they will become database columns later.

| Field | Allowed values |
| --- | --- |
| Rep `status` | `"active"`, `"paused"`, `"invited"` |
| Post `status` | `"pending"`, `"approved"`, `"rejected"` |
| `platform` (posts and social accounts) | `"Instagram"`, `"Facebook"`, `"TikTok"`, `"YouTube"`, `"Substack"` |
| Post `source` | `"auto"`, `"link"`, `"owner"` |

## Dates

All dates are stored as text in the `YYYY-MM-DD` format, such as `"2026-11-14"`. This sorts correctly and matches how databases store dates. A missing date is `null`, like an empty database cell.

Dates are turned into readable text only when shown on screen:

| Function | Turns `"2026-11-12"` into |
| --- | --- |
| `formatDate` | `"Nov 12, 2026"` |
| `formatDaysAgo` | `"6 days ago"` (or `"today"`, `"1 day ago"`) |

## Calculated Values

These values are calculated each time they are needed, not stored, so they can never fall out of sync with the records behind them.

| Value | How it is calculated | Where it shows |
| --- | --- | --- |
| Balance | The sum of every transaction for the rep (`calculateBalance`) | Reps table, side panel |
| Total earned | The sum of only the positive transactions (`calculateEarned`) | Top reps on Overview |
| Redeemed | Total earned minus balance | Side panel |
| Approved posts | The number of the rep's posts with status `"approved"` | Top reps, side panel |

## Relationships

### How records link

| From | Field | Matches | Meaning |
| --- | --- | --- | --- |
| Post | `repId` | Rep `id` | Which rep made the post |
| Transaction | `repId` | Rep `id` | Whose balance changed |
| Transaction | `postId` | Post `id` | Which post earned the points (`-1` if none) |
| Social account | `repId` | Rep `id` | Which rep owns the account |

### Counts

| Relationship | Count |
| --- | --- |
| Rep to Post | 1 to many |
| Rep to Transaction | 1 to many |
| Rep to Social account | 1 to many (at most one per platform) |
| Post to Transaction | 1 to 0 or 1 (only approved posts have one) |

```text
Rep  1 ──────── * Post
Rep  1 ──────── * Transaction
Rep  1 ──────── * Social account
Post 1 ──────── 0..1 Transaction
```

### Example

Dante Hicks (rep 3) in the sample data:

```text
POSTS (repId 3)                           TRANSACTIONS (repId 3)
id | platform  | status                   id | postId | amount | reason
4  | Instagram | approved                 4  | 4      | +10    | Post logged
5  | YouTube   | approved                 5  | 5      | +10    | Post logged
6  | TikTok    | approved                 6  | 6      | +10    | Post logged
12 | Facebook  | pending                  9  | -1     | -25    | Redeem for gift card

Approved posts = 3 (post 12 is still pending, so it has no transaction)
Total earned   = 10 + 10 + 10 = 30
Balance        = 10 + 10 + 10 - 25 = 5
Redeemed       = 30 - 5 = 25
```

## What Changes the Data

| Action | What changes |
| --- | --- |
| Approve a post | The post becomes `"approved"` with today's `reviewedDate`, and a `"Post logged"` transaction is added for its points |
| Reject a post | The post becomes `"rejected"` with today's `reviewedDate`. No transaction |
| Approve all | Every pending post is approved, one at a time |
| Add a post | A new post is added as `"approved"` with source `"owner"` and today's `reviewedDate`, plus a `"Post logged by owner"` transaction |
| Add a rep | A new rep is added as `"invited"`, with codes made from their first name |

## IDs

A new record's id is the array's length plus one. This works because nothing can be deleted in Phase 3. Once deleting is added, the database will hand out ids instead, so an id is never reused.

## Sample Data

| Array | Records | Notes |
| --- | --- | --- |
| `reps` | 6 | 4 active, 1 paused, 1 invited |
| `posts` | 13 | 8 approved, 4 pending, 1 rejected |
| `transactions` | 10 | 8 earned from posts, 2 redemptions |
| `socialAccounts` | 12 | Every post's rep has an account on that post's platform |

Sample approved posts use the same date for `reviewedDate` as their transaction, so the Posts table and each rep's history tell the same story. The sample rejected post was reviewed the day after it was posted.

The sample reps are characters from Kevin Smith films, so the data looks realistic without using real people.

## Moving to a Database

The data is shaped to map straight onto database tables in Phase 4:

| Array | Future table |
| --- | --- |
| `reps` | reps |
| `posts` | posts |
| `transactions` | transactions |
| `socialAccounts` | social_accounts |

Still to add:

| Record | Field | Why |
| --- | --- | --- |
| reps | `sales` | Fills in the Sales columns that show $0 for now |
| shop | name and initials | Right now the shop name is typed into each page |
| all | `shopId` | Keeps each shop's data separate once many shops use the app |

## What Changed from Phase 2

| Area | Phase 2 | Phase 3 |
| --- | --- | --- |
| Storage | Objects in ArrayLists, saved to a text file | Objects in JavaScript arrays, in memory only |
| Rep | id, name, email, discount code, personal code | Adds `status`. Personal code renamed `prCode` |
| Post | id, rep id, platform, URL | Adds `status`, `date`, `source`, `points`, and `reviewedDate` |
| Transaction | id, rep id, post id, amount, reason, date | Same fields |
| Social accounts | None | New array, one account per platform per rep |
| Points per post | A constant (10) | Stored on each post |
| When points are given | When a post is logged | When a post is approved |
| Codes | Typed in by the owner | Made from the rep's first name |
| Deleting reps | Deletes the rep and their records | Not available |
| IDs | Saved counters, never reused | Array length plus one |