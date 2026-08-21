
import java.util.Scanner;
public class Main {
    /** Main Method */
    public static void main(String[] args) {
        /* Program Setup */
        // Create the rep 2D array
        String[][] repData = new String[100][7];

        // Create the post data parallel arrays
        int[] postRepIndex = new int[100];
        String[] postPlatform = new String[100];
        String[] postLink = new String[100];

        // Create the point history parallel arrays
        int[] pointHistoryRepIndex = new int[100];
        int[] pointHistoryAmount = new int[100];
        String[] pointHistoryReason = new String[100];

        // Create variables for rep count, post count, and point history count
        int repCount = 0;
        int postCount = 0;
        int pointHistoryCount = 0;

        // Create the temporary points-per-post contant
        final int POINTS_PER_POST = 10;

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
                        boolean repAdded = addRep(repData, repCount, input);
                        if (repAdded) {
                            repCount++;
                        }
                        break;
                    case 2:
                        System.out.println("Opening 'Log a Post'...");
                        boolean logCreated = logPost(repData, repCount, postRepIndex, postPlatform, postLink, 
                            postCount, input, POINTS_PER_POST, pointHistoryRepIndex, pointHistoryAmount, 
                            pointHistoryReason, pointHistoryCount);
                        if (logCreated) {
                            postCount++;
                            pointHistoryCount++;
                        }
                        break;
                    case 3:
                        System.out.println("Opening PR Dashboard...");
                        break;
                    case 4:
                        System.out.println("Opening Points Redemption...");
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
    public static boolean addRep(String[][] repData, int repCount, Scanner input) {
        // Declare variables
        int repID = repCount + 1;
        String name;
        String email;
        String discountCode;
        String personalCode;
    
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

    /** Log posts made by the PR rep */
    public static boolean logPost(String[][] repData, int repCount, int[] postRepIndex, 
    String[] postPlatform, String[] postLink, int postCount, Scanner input, int pointsPerPost, 
    int[] pointHistoryRepIndex, int[] pointHistoryAmount, String[] pointHistoryReason, int pointHistoryCount) {
        // Declare variables
        int choice;
        int repIndex = -1;
        String url;
        String platform = "";

        // Loop through reps to determine if they have been entered
        if (repCount == 0) {
            System.out.println("No PR Reps found. Please add a PR rep before logging posts.");
            return false; // return to main
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
            return false; // return to main menu
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
            return false; // Returns to main menu
        }

        while (!(choice >= 1 && choice <=5)) { // user enters an invalid number or character
            System.out.println("Invalid choice");
            System.out.print("Please select a platform: ");
            choice = input.nextInt(); // users correct input
            input.nextLine(); // Clear leftover newline from nextInt()
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

        // assign where data goes in the array
        postRepIndex[postCount] = repIndex;
        postPlatform[postCount] = platform;
        postLink[postCount] = url;

        int pointsEarned = calculatePostPoints(pointsPerPost); // Calculate how many points this post earns
        int currentPostCount = Integer.parseInt(repData[repIndex][5]); // Read the rep's current post count and convert to number
        currentPostCount = currentPostCount + 1; // add 1 for this new post
        repData[repIndex][5] = String.valueOf(currentPostCount); // Convert back to text and store the updated post count

        // Log this point change and update the rep's running point total
        pointHistory(repData, pointHistoryRepIndex, pointHistoryAmount, pointHistoryReason, pointHistoryCount, 
            repIndex, pointsEarned, "Post logged");

        return true;
    }

    // Calculate points from posts
    public static int calculatePostPoints(int pointsAwarded) {

        return pointsAwarded;
    }

    
    /** Calculate points and log the history */
    public static void pointHistory(String[][] repData, int[] pointHistoryRepIndex, int[] pointHistoryAmount, 
        String[] pointHistoryReason, int pointHistoryCount, int repIndex, int amount, String reason) {
            // add amount to rep's running point total
            // Store repIndex in pointHistoryRepIndex[pointHistoryCount]
            // Store amount in pointHistoryAmount[pointHistoryCount]
            // Store reason in pointHistoryReason[pointHistoryCount]
            // pointHistoryCount itself gets incremented back in main, same pattern as repcount/postCount
    }
}

