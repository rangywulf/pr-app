# Application Architecture
## Overview

The Phase 1 PR App Core Engine will use a simple, single-file Java structure appropriate for the concepts covered in the current course.

The application will use classes to represent the primary entities identified in the data model and will use the main program to control user interaction and application flow.

## Source Structure

```
src/
└── Main.java
```

### Core Classes

The application will contain classes representing the three primary data entities:

- `PRRepresentative`
- `Post`
- `PointTransaction`

The `Main` class will contain the program entry point and control the primary application flow.

## Class Responsibilities

### Main

The `Main` class will:

- Start the application.
- Display the main menu.
- Accept user input.
- Direct the application to perform the requested operation.
- Display results and messages to the user.

### PRRepresentative

The `PRRepresentative` class will represent an individual PR representative and store:

- ID
- Name
- Email
- Point balance

### Post

The `Post` class will represent a promotional social media post and store:

- ID
- PR representative ID
- Platform
- URL
- Points awarded

### PointTransaction

The `PointTransaction` class will represent a change to a PR representative's point balance and store:

- ID
- PR representative ID
- Post ID
- Transaction type
- Point amount

## Data Storage

The prototype will use fixed-size arrays to store PR representatives, posts, and point transactions while the program is running.

No external database or persistent file storage will be used in Phase 1.

All stored data will be lost when the program exits.

## Application Flow

The general application flow will be:

```jsx
Start Program
↓
Display Main Menu
↓
Receive User Input
↓
Perform Selected Operation
↓
Update Data
↓
Display Result
↓
Return to Main Menu
```

The application will continue running until the user chooses to exit.
