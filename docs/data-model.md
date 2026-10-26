# Data Model

*Phase 2 (TESD 1800) | Shiver by Kelpkin*

The Phase 2 app stores three kinds of records: PR representatives, posts, and point transactions. Each one is a class, and the records are held in ArrayLists inside the managers. Every record has its own unique ID, and records are linked to each other by matching those IDs.

The Phase 1 version of this document is in `docs/phase-1/data-model.md`.

## PR Representative (Rep)

Each PR representative has a unique ID assigned by the application. The representative's email address must also be unique and is validated when the representative is added.

```text
Rep
├── ID
├── Name
├── Email
├── Discount Code
└── Personal Code
```

- ID: Unique number assigned by the application. IDs are never reused.
- Name: Name of the PR rep. A name is required.
- Email: Unique email address for the PR rep. It must contain an `@` and a dot after the `@`.
- Discount Code: The rep's shop discount code, shared with their audience.
- Personal Code: The rep's personal PR code, for their own use.

A rep does not store a post count or a point balance. Both are calculated from the posts and transactions, as described under Calculated Values.

## Post

Each post represents promotional content submitted by a PR rep. The rep provides a link to the post rather than uploading the content to the application.

```text
Post
├── ID
├── Rep ID
├── Platform
└── URL
```

- ID: Unique number assigned by the application. IDs are never reused.
- Rep ID: The ID of the rep who made the post.
- Platform: One of YouTube, TikTok, Instagram, Facebook, or Substack.
- URL: Link to the promotional post. It must start with `https://`.

A post does not store the points it earned. The points are recorded as a point transaction that points back to the post.

## Point Transaction

A point transaction represents one change to a PR rep's point balance. There are two kinds of changes:

- Points earned from a logged post
- Points redeemed by the PR rep

```text
PointTransaction
├── ID
├── Rep ID
├── Post ID
├── Amount
├── Reason
└── Date
```

- ID: Unique number assigned by the application. IDs are never reused.
- Rep ID: The ID of the rep whose balance changed.
- Post ID: The ID of the post that earned the points, or -1 when the change did not come from a post, such as a redemption.
- Amount: The number of points. It is positive for points earned and negative for points redeemed.
- Reason: Text that describes the change, such as "Post logged" or "Redeem for Cash Payout".
- Date: The day the change happened. It is set when the transaction is created and is kept when the transaction is saved and loaded.

There is no separate transaction type field. The reason text and the sign of the amount show what kind of change it was.

## Calculated Values

Two values are calculated each time they are needed, not stored. This keeps them from drifting out of sync with the records behind them.

| Value | How it is calculated |
| --- | --- |
| Post count | The number of posts whose Rep ID matches the rep's ID |
| Point balance | The sum of the amounts of every transaction whose Rep ID matches the rep's ID |

## Relationships

### How records link

Records are linked by matching ID numbers, not by holding each other.

| From | Field | Matches | Meaning |
| --- | --- | --- | --- |
| Post | Rep ID | Rep ID | Which rep made the post |
| Point Transaction | Rep ID | Rep ID | Whose balance changed |
| Point Transaction | Post ID | Post ID | Which post earned the points (-1 if none) |

### Counts

| Relationship | Count |
| --- | --- |
| Rep to Post | 1 to many |
| Rep to Point Transaction | 1 to many |
| Post to Point Transaction | 1 to 0 or 1 (a post earns at most one transaction) |

```text
Rep 1 ──────── * Post
Rep 1 ──────── * Point Transaction
Post  1 ─────── 0..1 Point Transaction
```

### Example

```text
REPS                 POSTS                          TRANSACTIONS
id | name            id | repId | platform          id | repId | postId | amount | reason
1  | Brody           1  | 1     | Facebook          1  | 1     | 1      | +10    | Post logged
2  | Quint           2  | 1     | TikTok            2  | 1     | 2      | +10    | Post logged
                     3  | 2     | Instagram         3  | 1     | -1     | -5     | Redeem for Cash Payout

Brody's post count = 2 (posts with repId 1)
Brody's balance    = 10 + 10 - 5 = 15 (sum of his transactions)
```

## Deleting a Rep

Deleting a rep deletes the rep, all of their posts, and all of their point transactions. The owner confirms first, and there is no undo. No other rep's records change.

## IDs

Rep, Post, and Point Transaction each keep their own counter for the next ID. A new record takes the current value and the counter goes up by one. The three counters are saved in the data file and restored when the app starts, so an ID is never given out twice, even after a rep is deleted and the app is restarted.

## Data Rules

| Field | Rule |
| --- | --- |
| Rep name | Required. A name made only of spaces is not accepted |
| Rep email | Must contain an `@` and a dot after the `@`, and must not match another rep's email |
| Any text field | Must not contain the pipe character, because it separates the fields in the data file |
| Post platform | Must be one of the five supported platforms |
| Post URL | Must start with `https://` |
| Redemption amount | Must be a whole number greater than zero and no more than the rep's current balance, so a balance never goes negative |
| Redemption type | One of Cash Payout, Product, or Store Credit. It is stored in the transaction's reason |
| Points per post | A flat value, set by a constant (10) |

## How the Data Is Stored

While the app runs, the reps are held in a list in RepManager, and the posts and point transactions are held in lists in PointsManager. The data is also saved to a text file, `pr-app/src/shiver-data.txt`, after every change and when the window closes, and it is loaded when the app starts.

The file has one record per line, with the fields separated by the pipe character and a labeled section for each kind of record.

| Record type | Fields |
| --- | --- |
| NEXT | rep counter, post counter, transaction counter |
| REP | id, name, email, discount code, personal code |
| POST | id, rep id, platform, url |
| TX | id, rep id, post id, amount, reason, date |

## What Changed from Phase 1

| Area | Phase 1 | Phase 2 |
| --- | --- | --- |
| Rep identity | Row position in an array | A unique ID on every rep |
| Post count and point balance | Stored on each rep | Calculated from posts and transactions |
| Post | No ID | Own ID |
| Point transaction | No ID, no link to a post, no date | Own ID, a Post ID link, and a date |
| Storage | Fixed-size arrays, lost on exit | ArrayLists, saved to and loaded from a file |
| Capacity | 100 reps, 500 posts, 1000 transactions | No limit |