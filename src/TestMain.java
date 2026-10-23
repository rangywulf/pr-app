import java.util.ArrayList;

public class TestMain {
    public static void main(String[] args) {
        // create new rep and points managers
        RepManager newRepManager = new RepManager();
        PointsManager newPointsManager = new PointsManager();

        // add and display reps
        System.out.println(newRepManager.addRep("Bella", "bella@test.com", "BELLA10", "BELLA30"));
        System.out.println(newRepManager.addRep("Jacob", "loca@test.com", "JACOB10", "JACOB30"));

        // Try bad reps
        System.out.println(newRepManager.addRep("Bella", "notanemail.com", "BELLA10", "BELL30"));
        System.out.println(newRepManager.addRep("Jacob", "bella@locacom", "JACOB10", "JACOB30"));

        // Get Bella's id
        int bellaId = newRepManager.getReps().get(0).getId();

        // Print the result of calling logPost
        System.out.println(newPointsManager.logPost(bellaId, "Facebook", "https://example.com"));
        
        // print the result of calling logpost with bad url
        System.out.println(newPointsManager.logPost(bellaId, "Facebook", "example.com"));

        // print the result of calling redeemPoints
        System.out.println(newPointsManager.redeemPoints(bellaId, 500, "Cash"));
        System.out.println(newPointsManager.redeemPoints(bellaId, 5, "Cash"));

        // Print the result of calling getPoints
        System.out.println(newPointsManager.getPoints(bellaId));

        // Call getHistory
        ArrayList<PointTransaction> history = newPointsManager.getHistory(bellaId);

        for (int i = 0; i < history.size(); i++) {
            System.out.println(history.get(i));
        }

        // Call deleteForRep
        newPointsManager.deleteForRep(bellaId);
        System.out.println(newRepManager.deleteRep(bellaId));

        // Print the result of calling getPostCount
        System.out.println(newPointsManager.getPostCount(bellaId));

       
    }
}