
import java.util.Scanner;
public class Main {
    /** Main Method */
    public static void main(String[] args) {
        /* Program Setup */
        // Create the rep 2D array
        String[][] repData = new String[100][7];

        // Create the post data parallel arrays
        int[] postRepIndex = new int[500];
        String[] postPlatform = new String[500];
        String[] postLink = new String[500];

        // Create the point history parallel arrays
        int[] pointHistoryRepIndex = new int[1000];
        int[] pointHistoryAmount = new int[1000];
        String[] pointHistoryReason = new String[1000];

        // Create variables for rep count, post count, and point history count
        int repCount = 0;
        int postCount = 0;
        int pointHistoryCount = 0;

        // Create the temporary points-per-post constant
        final int POINTS_PER_POST = 10;

        // Create Max capacity for arrays
        final int MAX_CAPACITY = 100; // addRep cap
        final int POST_CAP = 500; // postRep
        final int HISTORY_CAP = 1000; // pointHistory

        /* Display */
        // Create scanner
        Scanner input = new Scanner(System.in);
        boolean running = true;

        while (running) {
            // Print the menu options
            System.out.println("\n=== MAIN MENU ===");
            System.out.println("1. Add a PR Rep");
            System.out.println("2. Log a Post");
            System.out.println("3. View PR Dashboard");
            System.out.println("4. Redeem Points");
            System.out.println("5. Exit");

            // Read the user selection
            if (input.hasNextInt()) {
                int choice = input.nextInt();
                input.nextLine();

                // Process the choice
                switch (choice) {
                    case 1:
                        System.out.println("Opening 'Add a PR Rep'...");
                        boolean repAdded = addRep(repData, repCount, MAX_CAPACITY, input);
                        if (repAdded) {
                            repCount++;
                        }
                        break;
                    case 2:
                        System.out.println("Opening 'Log a Post'...");
                        boolean logCreated = logPost(repData, repCount, HISTORY_CAP, POST_CAP, postRepIndex, postPlatform, postLink, 
                            postCount, input, POINTS_PER_POST, pointHistoryRepIndex, pointHistoryAmount, 
                            pointHistoryReason, pointHistoryCount);
                        if (logCreated) {
                            postCount++;
                            pointHistoryCount++;
                        }
                        break;
                    case 3:
                        System.out.println("Opening PR Dashboard...");
                        viewDashboard(repData, repCount, input);
                        break;
                    case 4:
                        System.out.println("Opening Points Redemption...");
                        pointHistoryCount = redeemPoints(repData, HISTORY_CAP, repCount, pointHistoryRepIndex, pointHistoryAmount, 
                            pointHistoryReason, pointHistoryCount, input);
                        break;
                    case 5:
                        System.out.println("Exiting program. Goodbye!");
                        running = false;
                        break;
                    default:
                        System.out.println("Invalid choice. Please select 1, 2, 3, 4, or 5.");
                }
            } 
            
            else {
                    System.out.println("Invalid input. Please enter a number.");
                    input.next(); // Clear the invalid input from buffer
            }
        }
        input.close();
    }

    /** addRep Method */
    public static boolean addRep(String[][] repData, int repCount, int MAX_CAPACITY, Scanner input) {
        // Declare variables
        int repID = repCount + 1;
        String name;
        String email;
        String discountCode;
        String personalCode;

        // Check if array is full
        if (repCount == MAX_CAPACITY) {
            System.out.println("Max number of PR reps reached.");
            return false;
        }
    
        // Prompt user for rep name
        System.out.print("Name: ");
        name = input.nextLine();
        while (name.equals("")) {
            System.out.println("Name cannot be empty.");
            System.out.print("Name: ");
            name = input.nextLine();
        }

        if (name.equals("0")) { // if user enters 0
            return false; // Return to main menu
        }

        // Prompt user for email
        System.out.print("Email: ");
        email = input.nextLine();

        while (email.equals("")) { // If email is empty
            System.out.println("Email cannot be empty."); // Display error
            System.out.print("Email: ");
            email = input.nextLine(); // Prompt again
        }

        while (!email.contains("@") || !email.contains(".")) {
            System.out.println("Invalid email");
            System.out.print("Email: ");
            email = input.nextLine();
        }

        boolean emailExists = true;
        while (emailExists) {
            emailExists = false;

            for (int i = 0; i < repCount; i++){
                if (email.equals(repData[i][2])) {
                    System.out.println("Email already exists");
                    System.out.print("Email: ");
                    email = input.nextLine();
                    emailExists = true;
                }        
            }
        }

        if (email.equals("0")) { // if user enters 0
            return false; // Return to main menu
        }

        // Prompt user for discount code
        System.out.print("Discount code: ");
        discountCode = input.nextLine();

        if (discountCode.equals("0")) { // if user enters 0
            return false; // Return to main menu
        }

        // Prompt user for personal discount code
        System.out.print("Personal Discount Code: ");
        personalCode = input.nextLine();

        if (personalCode.equals("0")) { // if user enters 0
            return false; // Return to main menu
        }

        // assign where data goes in the array
        repData[repCount][0] = String.valueOf(repID);
        repData[repCount][1] = name;
        repData[repCount][2] = email;
        repData[repCount][3] = discountCode;
        repData[repCount][4] = personalCode;
        repData[repCount][5] = "0";
        repData[repCount][6] = "0";

        // Display information added
        System.out.println("PR Rep added successfully.");
        return true;
    }

    /** Create loop for PR Rep selection */
    public static int repSelection(String[][] repData, int repCount, Scanner input) {
        // Declare variables
        int choice;
        int repIndex = -1; // the position i in the array where the rep's row lives

        // determine if reps have been entered
        if (repCount == 0) {
            System.out.println("No PR Reps found. Please add a PR rep before continuing.");
            return -1; // return to main
        }

        // Display all rep names and their repID number
        for (int i = 0; i < repCount; i++) {
            System.out.println(repData[i][0] + ". " + repData[i][1]);
        }
        System.out.println("0. Return to main menu");

        // Prompt user to select a rep by number
        System.out.print("Please select a PR Rep: ");
        choice = input.nextInt();
        input.nextLine();
        while (choice == 0) { // user types 0
            System.out.println("Returning to main menu.");
            return -1; // return to main menu
        }

        // Loop until the user picks a valid, existing rep ID
        boolean validChoice = false;
        while (!validChoice) {
            // check the typed choice against every existing rep's ID
            for (int i = 0; i < repCount; i++) {
                if (String.valueOf(choice).equals(repData[i][0])) {
                    validChoice = true; // found a match, this repID exists
                    repIndex = i;
                }
            }

            // If no rep matched after checking the whole list, ask again
            if (validChoice == false) {
                System.out.println("Invalid Choice");
                System.out.print("Please select a PR rep: ");
                choice = input.nextInt();
                input.nextLine(); // Clear leftover newline from nextInt()
            }
        }

        return repIndex;

    }

    /** Platform Selection */
    public static String platformSelection(Scanner input) {
        // Declare variables
        int choice;
        String platform = "";

        // Prompt user for platform
        System.out.println("1. Facebook");
        System.out.println("2. Instagram");
        System.out.println("3. Substack");
        System.out.println("4. YouTube");
        System.out.println("5. TikTok");
        System.out.println("0. Return to main menu");
        System.out.print("Please select a platform: ");
        choice = input.nextInt();
        input.nextLine();

        while (choice == 0) { // User enters 0
            System.out.println("Returning to main menu.");
            return null; // Returns to main menu
        }

        while (!(choice >= 1 && choice <=5)) { // user enters an invalid number or character
            System.out.println("Invalid choice");
            System.out.print("Please select a platform: ");
            choice = input.nextInt(); // users correct input
            input.nextLine(); // Clear leftover newline from nextInt()
        }

        // Convert number choices for platform to strings
        switch (choice) {
            case 1:
                platform = "Facebook";
                break;
            case 2:
                platform = "Instagram";
                break;
            case 3:
                platform = "Substack";
                break;
            case 4:
                platform = "YouTube";
                break;
            case 5:
                platform = "TikTok";
                break;
        }
        return platform;
    }

    /** Log posts made by the PR rep */
    public static boolean logPost(String[][] repData, int repCount, int POST_CAP, int HISTORY_CAP, int[] postRepIndex, 
    String[] postPlatform, String[] postLink, int postCount, Scanner input, int pointsPerPost, 
    int[] pointHistoryRepIndex, int[] pointHistoryAmount, String[] pointHistoryReason, int pointHistoryCount) {
        // Declare variables
        String url;

        // Check if array is full
        if (postCount == POST_CAP) {
            System.out.println("Max number of posts reached.");
            return false;
        }

        // Select PR Rep
        int repIndex = repSelection(repData, repCount, input);

        if (repIndex == -1) { // User enters 0
            return false; // Returns to main menu
        }

        // Prompt user for platform
        String platform = platformSelection(input);
        if (platform == null) { // User enters 0
                return false; // Returns to main menu
            }

        // Prompt user for URL
        System.out.print("Please enter the URL for the post: ");
        url = input.nextLine();

        while (url.equals("0")) {
            System.out.println("Returning to main menu.");
            return false;
        }
        
        while (!url.contains("https://")) { // Validate URL
            System.out.println("Invalid url");
            System.out.print("Please enter the URL for the post: ");
            url = input.nextLine();
        }

        System.out.println("Log created, returning to main menu");

        // assign where data goes in the array
        postRepIndex[postCount] = repIndex;
        postPlatform[postCount] = platform;
        postLink[postCount] = url;

        int pointsEarned = calculatePostPoints(pointsPerPost); // Calculate how many points this post earns
        int currentPostCount = Integer.parseInt(repData[repIndex][5]); // Read the rep's current post count and convert to number
        currentPostCount = currentPostCount + 1; // add 1 for this new post
        repData[repIndex][5] = String.valueOf(currentPostCount); // Convert back to text and store the updated post count

        // Log this point change and update the rep's running point total
        pointHistory(repData, HISTORY_CAP, pointHistoryRepIndex, pointHistoryAmount, pointHistoryReason, pointHistoryCount, 
            repIndex, pointsEarned, "Post logged");

        return true;
    }

    /** Calculate points from posts (currently a passthrough, future home for bonus logic) */
    public static int calculatePostPoints(int pointsAwarded) {    
        return pointsAwarded;
    }

    
    /** Calculate points and log the history */
    public static void pointHistory(String[][] repData, int HISTORY_CAP, int[] pointHistoryRepIndex, int[] pointHistoryAmount, 
        String[] pointHistoryReason, int pointHistoryCount, int repIndex, int amount, String reason) {
        // Check if array is full
        if (pointHistoryCount == HISTORY_CAP) {
            System.out.println("Max number of history logs reached.");
            return;
        }

        // add amount to rep's running point total
        int currentTotal = Integer.parseInt(repData[repIndex][6]); // Reads the points, and converts from String to int
        currentTotal = currentTotal + amount; // calculates rep's running total
        repData[repIndex][6] = String.valueOf(currentTotal); // converts int back to String
        // Store repIndex in pointHistoryRepIndex[pointHistoryCount]
        pointHistoryRepIndex[pointHistoryCount] = repIndex;
        // Store amount in pointHistoryAmount[pointHistoryCount]
        pointHistoryAmount[pointHistoryCount] = amount;
        // Store reason in pointHistoryReason[pointHistoryCount]
        pointHistoryReason[pointHistoryCount] = reason;           
    }

    /** Redeem Points */
    public static int redeemPoints(String[][] repData, int HISTORY_CAP, int repCount, int[] pointHistoryRepIndex, int[] pointHistoryAmount, 
        String[] pointHistoryReason, int pointHistoryCount, Scanner input) {
        // Declare variables
        int pointsRedeemed = 0;
        int redemptionType;
        String redemption = "";
        boolean redeeming = true;
        
        while (redeeming) {
            
            // Select PR rep
            System.out.println("\n=== REDEEM POINTS ===");
            int repIndex = repSelection(repData, repCount, input);
            if (repIndex == -1) { // User enters 0
                return pointHistoryCount; // Returns to main menu
            }

            // Display the current point balance
            System.out.println(repData[repIndex][1] + ": " + repData[repIndex][6]);

            // Prompt user
            System.out.print("How many points to redeem? Press 0 to return to main menu. ");

            pointsRedeemed = input.nextInt();
            input.nextLine();

            while (pointsRedeemed == 0) { // User enters 0
                System.out.println("Returning to main menu.");
                return pointHistoryCount; // Returns to main menu
            }

            int currentTotal = Integer.parseInt(repData[repIndex][6]); // Converts string to int
            while (!(pointsRedeemed > 0 && pointsRedeemed <= currentTotal)) { // while points entered is greater than 0 and less than the currentTotal
                System.out.println("Invalid amount. Enter a number greater than 0 and no more than your available points.");
                pointsRedeemed = input.nextInt(); // Users new input
                input.nextLine(); // Clear leftover newline from nextInt
            }

            // Prompt for redemption type
            System.out.println("Choose from the following for how the redemption points are being used:");
            System.out.println("1. Cash");
            System.out.println("2. Product");
            System.out.println("3. Store Credit");
            System.out.println("0. Return to main menu");

            redemptionType = input.nextInt();
            input.nextLine();

            while (redemptionType == 0) { // User enters 0
                System.out.println("Returning to main menu.");
                return pointHistoryCount; // Returns to main menu
            }

            while (!(redemptionType >= 1 && redemptionType <= 3)) { // user enters an invalid number or character
                System.out.println("Invalid choice");
                System.out.print("Please select a redemption type: ");
                redemptionType = input.nextInt(); // users correct input
                input.nextLine(); // Clear leftover newline from nextInt()
            }

            switch (redemptionType) {
                case 1:
                    redemption = "Cash";
                    break;
                case 2:
                    redemption = "Product";
                    break;
                case 3:
                    redemption = "Store Credit";
                    break;
            }

            // log points redeemed to pointHistory
            pointHistory(repData, HISTORY_CAP, pointHistoryRepIndex, pointHistoryAmount, pointHistoryReason, pointHistoryCount, 
                repIndex, -pointsRedeemed, "Redeem for " + redemption);
            pointHistoryCount++;
        
            // Display current balance
            System.out.println("Total points left to redeem: " + repData[repIndex][6]);
        }

        return pointHistoryCount;
    }

    /** Dashboard display off all the reps, their posts and points */
    public static void viewDashboard(String[][] repData, int repCount, Scanner input) {
        // Loop through reps to determine if they have been entered
        if (repCount == 0) {
            System.out.println("No PR Reps found. Nothing to display yet.");
            return; // return to main
        }

        // Display Header
        System.out.printf("%-8s%-15s%-40s%-15s%-15s%-8s%-8s%n", "Rep ID", "Name", "Email", "Discount Code", "PR Code", "# Posts", "Total Points");
        System.out.println("-".repeat(94));

        // Loop through repData from 0 to repCount
        for (int i = 0; i < repCount; i++) {
            System.out.printf("%-8s%-15s%-40s%-15s%-15s%-8s%-8s%n", repData[i][0], repData[i][1], repData[i][2], repData[i][3], repData[i][4], repData[i][5], repData[i][6]);
        }

        // Display message how to return to main
        System.out.print("Press 0 to return to main menu.");
        input.nextInt();
        input.nextLine();
    }
    
}

