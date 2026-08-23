# PR App Engine

## Documentation

# 1. Project Overview

The PR App Core Engine is a Java-based application designed to help small business owners manage their public relations (PR) teams.

In this application, PR representatives promote a shop's products through social media. Instead of receiving traditional monetary compensation, representatives are rewarded through points that can be redeemed for products or shop credit.

The current version is a Phase 1 prototype focused on the core logic needed to manage PR representatives, track promotional posts, award points, track point history, and process point redemptions.

This version is intentionally limited to the Java functionality covered in the current course. Features requiring external platforms, APIs, databases, or other technologies will be addressed in future phases.

# 2. Target Users

The primary users of the application are small business owners who manage PR teams.

The initial target market is small businesses in the planner sticker and stationery community, particularly businesses operated by one or two people.

The application is intended to reduce the amount of manual work required to track PR representatives and their contributions.

# 3. Functional Requirements

## 3.1 PR Representative Management

The application must allow the shop owner to:

* Add a new PR representative.
* Store the representative's name.
* Store the representative's email address.
* Store the representative's discount code.
* Store the representative's PR personal code.
* Store the representative's current point balance.
* Store the representative's post count.
* Identify each representative using a unique email address.
* Prevent duplicate email addresses from being added.
* Display an appropriate message when an email address is already associated with another representative.

## 3.2 Email Validation

The application must validate email addresses when a PR representative is added.

At minimum, the application must check for common formatting errors, including the absence of an `@` symbol or the absence of a dot after the `@` symbol.

Invalid email addresses must not be accepted as valid representative records.

## 3.3 PR Post Tracking

The application must allow the shop owner to record promotional posts made by PR representatives.

A post must be associated with the PR representative who created it.

The application must be capable of storing information needed to identify and track each recorded post, including the platform and the submitted link.

The prototype must support tracking promotional activity separately from sales activity.

## 3.4 Supported Social Media Platforms

The prototype must allow PR representatives to submit links to promotional content on any of the following platforms:

* YouTube
* TikTok
* Instagram
* Facebook
* Substack

All platforms in Phase 1 use manual link submission. The representative submits a link to their post and the application records it without connecting directly to any external platform.

Automated platform integration, including hashtag verification and shop-tag verification for Instagram and Facebook, is outside the scope of this prototype and is planned for Phase 5.

## 3.5 Point Management

The application must maintain a point balance for each PR representative.

The application must allow points to be awarded to a representative based on qualifying PR activity.

Points must be associated with the appropriate PR representative.

The application must allow the shop owner to view a representative's current point balance.

A flat points-per-post value will be set as a constant when the program is initialized and applied consistently across all qualifying posts.

## 3.6 Point History

The application must maintain a record of all point transactions for each PR representative.

Each point history entry must store:

* The index of the PR representative the transaction belongs to.
* The number of points changed (positive for points earned, negative for points redeemed).
* The reason for the point change.

Point history must be recorded automatically when:

* Points are awarded following a logged post.
* Points are deducted following a processed redemption.

Point history is stored in parallel arrays alongside rep and post data and persists for the duration of the program session.

## 3.7 Point Redemption

The application must allow the shop owner to process a PR representative's point redemption.

Before processing a redemption, the application must compare the requested redemption amount against the representative's current point balance.

The application must prevent a redemption from causing the representative's point balance to become negative.

If the requested redemption exceeds the available point balance, the application must reject the transaction and prompt the owner to enter a valid amount.

The application must allow the owner to specify whether the redemption is for cash, product, store credit. This information must be recorded in the point history entry for that transaction.

## 3.8 Sales Tracking

The application must treat PR activity and sales as separate types of activity.

The current prototype does not include sales tracking. Sales tracking is directly tied to Shopify's API and will be implemented in Phase 5 when Shopify integration is introduced.

The application architecture should allow sales tracking to be expanded in future versions without requiring significant restructuring of the core logic.

# 4. Input Validation Requirements

The application must validate user input before processing it whenever invalid input could cause an error or produce an invalid result.

Input validation must include:

* Menu selections.
* Numeric values.
* Point redemption amounts.
* Email addresses.
* Platform selections.
* Other required fields entered by the user.

When invalid input is entered, the application should display a clear message and prompt the user to enter the information again rather than continuing with invalid data.

At every input prompt, the user must have the option to return to the main menu without completing the current operation.

# 5. Data Storage Requirements

The current prototype will store application data in memory.

The application will use fixed-size arrays rather than dynamic lists.

The following data will be stored in arrays:

* PR representative information (2D array).
* Post information (parallel arrays).
* Point history information (parallel arrays).

The capacity for representatives, posts, and point history entries will be established when the program is initialized.

The application should provide a clear message when the available array capacity has been reached.

Because data is stored only in memory, all representative, post, and point history data will be lost when the program exits.

Persistent storage is intentionally outside the scope of this version and will be implemented in a future phase.

# 6. Capacity Requirements

The application must account for the capacity limits of the fixed-size arrays used to store representatives, posts, and point history entries.

The initial array capacities should be large enough to support normal demonstration and testing of the prototype.

When an array reaches capacity, the application must:

1. Detect that no additional space is available.
2. Prevent the application from attempting to store data outside the array.
3. Display a clear message to the user.

# 7. User Interaction Requirements

The prototype will provide a menu-driven interface for the shop owner.

The interface should allow the owner to access the application's core functionality, including:

* Managing PR representatives.
* Recording PR posts.
* Managing points.
* Processing point redemptions.
* Viewing the rep dashboard.

The application should provide clear prompts and feedback after every user action.

At every input prompt, the owner must have the option to return to the main menu by entering `0`.

# 8. Current Scope

The following functionality is within the scope of the Phase 1 prototype:

* PR representative management.
* Unique representative identification through email addresses.
* Basic email validation.
* PR post tracking.
* Manual social media post link submission for YouTube, TikTok, Instagram, Facebook, and Substack.
* Point tracking.
* Point awarding.
* Point history tracking.
* Point redemption with redemption type (cash or product).
* Input validation.
* Return to main menu option at every input prompt.
* Fixed-size array storage.
* Menu-driven interaction.
* Separation of PR activity from sales activity.

# 9. Out of Scope

The following functionality is specifically outside the scope of the current prototype:

* Automated Instagram post detection.
* Automated Facebook post detection.
* Automated hashtag verification.
* Automated shop-tag verification.
* Shopify integration.
* Automated sales tracking.
* Automatic discount code generation.
* Persistent database storage.
* Persistent file storage.
* Full web application functionality.
* Automated social media data retrieval.
* Production deployment.

These features are planned for future phases as additional technologies and programming concepts are introduced.

# 10. Known Constraints

## 10.1 Duplicate Email Addresses

Each PR representative must have a unique email address. The application must check for an existing matching email address before adding a new representative.

## 10.2 Invalid Email Addresses

The application must perform basic email format validation to catch common entry errors, including missing `@` symbols and missing dots after the `@` symbol.

## 10.3 Fixed Array Capacity

The prototype uses fixed-size arrays rather than dynamic collections. This creates a limit on the number of representatives, posts, and point history entries that can be stored during a program session.

## 10.4 Invalid Input Types

The application must validate user input before attempting to process values that require a specific data type. For example, entering text where a numeric menu selection is expected should not cause the program to terminate unexpectedly.

## 10.5 Negative Point Balances

The application must prevent a point redemption from reducing a representative's balance below zero.

## 10.6 Temporary Data Storage

All data exists only while the program is running. Closing the program will result in the loss of all stored representative, post, and point history information.

# 11. Future Development

The PR App Core Engine is intended to serve as the foundation for a larger application that will be developed throughout the Software Development program.

Potential future development includes:

* Persistent data storage.
* Database integration.
* Shopify integration.
* Automated sales tracking.
* Discount code generation.
* Automated Instagram post detection.
* Automated Facebook post detection.
* Automated hashtag verification.
* Automated shop-tag verification.
* Additional social media integrations.
* Web application functionality.

These features will be evaluated and implemented in later phases as appropriate.

# 12. Success Criteria

The Phase 1 prototype will be considered successful if it can:

1. Add and manage PR representatives.
2. Prevent duplicate representative email addresses.
3. Reject obviously invalid email addresses.
4. Record promotional posts and associate them with the correct representative.
5. Support manual link submission for YouTube, TikTok, Instagram, Facebook, and Substack.
6. Track points for individual representatives.
7. Award points based on qualifying activity.
8. Record a point history entry for every point transaction.
9. Process valid point redemptions with a specified redemption type.
10. Prevent point balances from becoming negative.
11. Handle invalid user input without unexpectedly terminating.
12. Detect when fixed-size storage has reached capacity.
13. Clearly communicate the application's current limitations.
14. Demonstrate the Java programming concepts required for the course.
