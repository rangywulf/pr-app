# Data Model

## PR Representative

Each PR representative will have a unique ID assigned by the application. The representative's email address must also be unique and will be validated when the representative is added.

```text
PR Representative
├── ID
├── Name
├── Email
└── Point Balance
```
- ID: Unique identifier assigned by the application
- Name: Name of the PR rep
- Email: Unique email address for the PR rep
- Point Balance: Current number of points available to the PR rep.
## Post
Each post represents promotional content submitted by a PR rep. In the Phase 1 prototype, the PR rep provides a link to the post rather than uploading the content directly to the application.

```text
Post
├── ID
├── PR Representative ID
├── Platform
├── URL
└── Points Awarded
```
- ID: Unique identifier assigned to the post.
- PR Rep ID: Identifies the PR rep who submitted the post.
- Platform: Social media platform where the post published
- URL: Link to the promotional post
- Points awarded: Number of points awarded for the post.
## Point Transaction
A Point transaction represents a change to a PR rep's point balance. There are currently two kinds of changes:
- Points earned from a qualifying post
- Points redeemed by the PR rep

```text
Point Transaction
├── ID
├── PR Representative ID
├── Post ID
├── Type
└── Amount
```
- ID: Unique identifier for the transaction
- PR Rep ID: Identifies which PR's balance was affected
- Type: Identifies whether the transaction is an earning or redemption
- Post ID: Identifies the post associated with an earned-point transaction. This field is not used for redemption transactions.
- Amount: Number of points involved in the transaction.
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
### Post and Point Transaction
A post can result in a point transaction when points are awarded for qualifying activity. A point transaction that represents earned points can be associated with the post that generated those points.
```text
Post 1 ──────── 0..1 Point Transaction
```
A post may have zero or one associated point transaction because a post may not have been awarded points. A point transaction for earned points can reference the Post ID that generated it.

```text
Point Transaction
├── ID
├── PR Representative ID
├── Post ID
├── Type
└── Amount
```
