import java.io.File;
import java.io.FileNotFoundException;
import java.io.PrintWriter;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Scanner;

public class FileHandler {
    private static final String FILE_NAME = "pr-app/src/shiver-data.txt"; // Name the file

    /** Save to file */
    public void save(ArrayList<Rep> reps, ArrayList<Post> posts, ArrayList<PointTransaction> transactions) throws FileNotFoundException {
        PrintWriter output = new PrintWriter(FILE_NAME); // write to the data file

        // save each rep's information as a pipe-separated record
        for (Rep rep : reps) {
            output.println("REP|" + rep.getId() + "|" + rep.getName() + "|" + rep.getEmail() + "|" + rep.getDiscountCode() + "|" + rep.getPersonalCode());
        }

        // save each post's information
        for (Post post : posts) {
            output.println("POST|" + post.getId() + "|" + post.getRepId() + "|" + post.getPlatform() + "|" + post.getUrl());
        }

        // save each point transaction's information
        for (PointTransaction transaction : transactions) {
            output.println("TX|" + transaction.getId() + "|" + transaction.getRepId() + "|" + transaction.getPostId() + "|" + transaction.getAmount()
                + "|" + transaction.getReason() + "|" + transaction.getDate());
        }

        // close the writer when all records have been written
        output.close();
    }

    /** Load File */
    public void load(RepManager repManager, PointsManager pointsManager) throws FileNotFoundException {
        File file = new File(FILE_NAME); // create a File object representing the data file

        // Stop loading if the data file does not exist yet
        if (!file.exists()) {
            return;
        }

        // Create a scanner to read the file
        Scanner input = new Scanner(file);

        while (input.hasNextLine()) { // read the file one line at a time
            String line = input.nextLine(); // get the next line from the file
            String[] parts = line.split("\\|"); // split the line into fields wherever a pipe character appears

            // Determine whic type of record this line contains
            switch (parts[0]) {
                case "REP": { 
                    int id = Integer.parseInt(parts[1]); // read the rep's id
                    Rep rep = new Rep(id, parts[2], parts[3], parts[4], parts[5]); // re-create the rep using the saved information
                    repManager.getReps().add(rep); // add the rep to the rep manager's list
                    break;
                }
                case "POST": {
                    int id = Integer.parseInt(parts[1]); // Read the post's Id 
                    int repId = Integer.parseInt(parts[2]); // read the rep's Id
                    Post post = new Post(id, repId, parts[3], parts[4]); // Re-create the post using the saved information
                    pointsManager.addLoadedPost(post); // add post to the points manager
                    break;
                }
                case "TX": {
                    // read the transactions saved values
                    int id = Integer.parseInt(parts[1]);
                    int repId = Integer.parseInt(parts[2]);
                    int postId = Integer.parseInt(parts[3]);
                    int amount = Integer.parseInt(parts[4]);
                    String reason = parts[5];
                    LocalDate date = LocalDate.parse(parts[6]);

                    // re-create the transaction using the saved information
                    PointTransaction transaction = new PointTransaction(id, repId, postId, amount, reason, date);
                    pointsManager.addLoadedTransaction(transaction); // add the transaction to the points manager
                    break;
                }
            }
        }

        // close the scanner when all records have been read
        input.close(); 
    }
}
