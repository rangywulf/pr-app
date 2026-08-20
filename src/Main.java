
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

        // Display information added
        System.out.println("PR Rep added successfully.");
        return true;
    }

    /** Log posts made by the PR rep */
    
}

