# PR App Core Engine

## Requirements

### 1. Project Overview

The PR App Core Engine is a Java-based application designed to help small business owners manage their public relations (PR) teams.

In this application, PR representatives promote a shop's products through social media. Instead of receiving traditional monetary compensation, representatives are rewarded through points that can be redeemed for products or shop credit.

The current version is a Phase 1 prototype focused on the core logic needed to manage PR representatives, track promotional posts, award points, and process point redemptions.

This version is intentionally limited to the Java functionality covered in the current course. Features requiring external platforms, APIs, databases, or other technologies will be addressed in future phases.

---

## 2. Target Users

The primary users of the application are small business owners who manage PR teams.

The initial target market is small businesses in the planner sticker and stationery community, particularly businesses operated by one or two people.

The application is intended to reduce the amount of manual work required to track PR representatives and their contributions.

---

## 3. Functional Requirements

### 3.1 PR Representative Management

The application must allow the shop owner to:

* Add a new PR representative.
* Store the representative's name.
* Store the representative's email address.
* Store the representative's current point balance.
* Identify each representative using a unique email address.
* Prevent duplicate email addresses from being added.
* Display an appropriate message when an email address is already associated with another representative.

### 3.2 Email Validation

The application must validate email addresses when a PR representative is added.

At minimum, the application must check for common formatting errors, including the absence of an `@` symbol.

Invalid email addresses must not be accepted as valid representative records.

### 3.3 PR Post Tracking

The application must allow the shop owner to record promotional posts made by PR representatives.

A post must be associated with the PR representative who created it.

The application must be capable of storing information needed to identify and track each recorded post.

The prototype must support tracking promotional activity separately from sales activity.

### 3.4 Supported Social Media Content

The prototype must allow PR representatives to be associated with promotional content without requiring direct integration with social media platforms.

The application should be designed around the concept of PR representatives submitting or recording links to promotional content.

Potential content platforms include:

* TikTok
* Facebook
* YouTube
* Substack

Direct platform integration is outside the scope of this prototype.

### 3.5 Point Management

The application must maintain a point balance for each PR representative.

The application must allow points to be awarded to a representative based on qualifying PR activity.

Points must be associated with the appropriate PR representative.

The application must allow the shop owner to view a representative's current point balance.

### 3.6 Point Redemption

The application must allow the shop owner to process a PR representative's point redemption.

Before processing a redemption, the application must compare the requested redemption amount against the representative's current point balance.

The application must prevent a redemption from causing the representative's point balance to become negative.

If the requested redemption exceeds the available point balance, the application must reject the transaction and prompt the owner to enter a valid amount.

### 3.7 Sales Tracking

The application must treat PR activity and sales as separate types of activity.

The current prototype does not need to automatically retrieve sales information from a shop platform.

The application architecture should allow sales tracking to be expanded in future versions.

---

## 4. Input Validation Requirements

The application must validate user input before processing it whenever invalid input could cause an error or produce an invalid result.

Input validation must include:

* Menu selections.
* Numeric values.
* Point redemption amounts.
* Email addresses.
* Other required fields entered by the user.

When invalid input is entered, the application should display a clear message and prompt the user to enter the information again rather than continuing with invalid data.

---

## 5. Data Storage Requirements

The current prototype will store application data in memory.

The application will use fixed-size arrays rather than dynamic lists.

The capacity for representatives and posts will be established when the program is initialized.

The application should provide a clear message when the available array capacity has been reached.

Because data is stored only in memory, all representative and post data will be lost when the program exits.

Persistent storage is intentionally outside the scope of this version and will be implemented in a future phase.

---

## 6. Capacity Requirements

The application must account for the capacity limits of the fixed-size arrays used to store representatives and posts.

The initial array capacities should be large enough to support normal demonstration and testing of the prototype.

When an array reaches capacity, the application must:

1. Detect that no additional space is available.
2. Prevent the application from attempting to store data outside the array.
3. Display a clear message to the user.

---

## 7. User Interaction Requirements

The prototype will provide a menu-driven interface for the shop owner.

The interface should allow the owner to access the application's core functionality, including:

* Managing PR representatives.
* Recording PR posts.
* Managing points.
* Processing point redemptions.
* Viewing relevant PR information.

The application should provide clear prompts and feedback after user actions.

---

## 8. Current Scope

The following functionality is within the scope of the Phase 1 prototype:

* PR representative management.
* Unique representative identification through email addresses.
* Basic email validation.
* PR post tracking.
* Social media post link tracking.
* Point tracking.
* Point awarding.
* Point redemption.
* Input validation.
* Fixed-size array storage.
* Menu-driven interaction.
* Separation of PR activity from sales activity.

---

## 9. Out of Scope

The following functionality is specifically outside the scope of the current prototype:

* Direct Instagram integration.
* Direct Facebook integration.
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

---

## 10. Known Constraints

### 10.1 Duplicate Email Addresses

Each PR representative must have a unique email address.

The application must check for an existing matching email address before adding a new representative.

### 10.2 Invalid Email Addresses

The application must perform basic email format validation to catch common entry errors.

### 10.3 Fixed Array Capacity

The prototype uses fixed-size arrays rather than dynamic collections.

This creates a limit on the number of representatives and posts that can be stored during a program session.

### 10.4 Invalid Input Types

The application must validate user input before attempting to process values that require a specific data type.

For example, entering text where a numeric menu selection is expected should not cause the program to terminate unexpectedly.

### 10.5 Negative Point Balances

The application must prevent a point redemption from reducing a representative's balance below zero.

### 10.6 Temporary Data Storage

All data exists only while the program is running.

Closing the program will result in the loss of all stored representative and post information.

---

## 11. Future Development

The PR App Core Engine is intended to serve as the foundation for a larger application that will be developed throughout the Software Development program.

Potential future development includes:

* Persistent data storage.
* Database integration.
* Shopify integration.
* Automated sales tracking.
* Discount code generation.
* Instagram integration.
* Facebook integration.
* Automated hashtag verification.
* Automated shop-tag verification.
* Additional social media integrations.
* Web application functionality.

These features will be evaluated and implemented in later phases as appropriate.

---

## 12. Success Criteria

The Phase 1 prototype will be considered successful if it can:

1. Add and manage PR representatives.
2. Prevent duplicate representative email addresses.
3. Reject obviously invalid email addresses.
4. Record promotional posts and associate them with the correct representative.
5. Track points for individual representatives.
6. Award points based on qualifying activity.
7. Process valid point redemptions.
8. Prevent point balances from becoming negative.
9. Handle invalid user input without unexpectedly terminating.
10. Detect when fixed-size storage has reached capacity.
11. Clearly communicate the application's current limitations.
12. Demonstrate the Java programming concepts required for the course.

