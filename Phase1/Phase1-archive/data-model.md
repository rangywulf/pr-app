# Data Model

## PR Representative

Each PR representative has a unique ID assigned by the application. The representative's email address must also be unique and is validated when the representative is added.

```text
PR Representative
├── ID
├── Name
├── Email
├── Discount Code
├── Personal PR Code
├── Post Count
└── Point Balance
```
- ID: Unique identifier assigned by the application.
- Name: Name of the PR rep.
- Email: Unique email address for the PR rep.
- Discount Code: The rep's shop discount code, shared with their audience.
- Personal PR Code: The rep's personal PR/referral code.
- Post Count: Running total of posts logged for this rep.
- Point Balance: Current number of points available to the PR rep.

## Post

Each post represents promotional content submitted by a PR rep. In the Phase 1 prototype, the PR rep provides a link to the post rather than uploading the content directly to the application.

A post does not have its own unique ID. It is identified only by its position among the other posts, and does not store the number of points it earned; points earned are recorded separately as a point transaction.

```text
Post
├── PR Representative ID
├── Platform
└── URL
```
- PR Representative ID: Identifies the PR rep who submitted the post.
- Platform: Social media platform where the post was published.
- URL: Link to the promotional post.

## Point Transaction

A point transaction represents a change to a PR rep's point balance. There are currently two kinds of changes:
- Points earned from a qualifying post
- Points redeemed by the PR rep

A point transaction does not have its own unique ID, and it does not store a reference to the specific post that generated it. Instead of a separate transaction type field, the reason for the change is recorded as descriptive text (for example, "Post logged" or "Redeem for Cash").

```text
Point Transaction
├── PR Representative ID
├── Amount
└── Reason
```
- PR Representative ID: Identifies which PR rep's balance was affected.
- Amount: Number of points involved in the transaction (positive for points earned, negative for points redeemed).
- Reason: Describes why the change occurred.

## Relationships

### PR Representative and Post

A PR representative can submit multiple posts, while each post belongs to one PR representative.

```text
PR Representative 1 ──────── * Post
```
This is a one-to-many relationship. The Post stores the PR Representative ID to identify the representative who submitted it.

### PR Representative and Point Transaction

A PR representative can have multiple point transactions, while each point transaction belongs to one PR representative.
```text
PR Representative 1 ──────── * Point Transaction
```
This is a one-to-many relationship. The Point Transaction stores the PR Representative ID to identify which representative's point balance was affected.