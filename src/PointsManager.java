import java.util.ArrayList;

public class PointsManager {
    private ArrayList<Post> posts;
    private ArrayList<PointTransaction> transactions;
    private static final int POINTS_PER_POST = 10;

    public PointsManager() {
        posts = new ArrayList<>();
        transactions = new ArrayList<>();
    }
    
    
    // get postCount
    public int getPostCount(int repId) {
        int count = 0;

        for (int i = 0; i < posts.size(); i++) {
            if (posts.get(i).getRepId() == repId) {
                count++;
            }
        }
        return count;
    }

    // get points
    public int getPoints(int repId) {
        int total = 0;
        
        for (int i = 0; i < transactions.size(); i++) {
            if (transactions.get(i).getRepId() == repId) {
                total += transactions.get(i).getAmount();
            }
        }
        return total;
    }

    // get history
    public ArrayList<PointTransaction> getHistory(int repId) {
        ArrayList<PointTransaction> repHistory = new ArrayList<>();

        for (int i = 0; i < transactions.size(); i++) {
            if (transactions.get(i).getRepId() == repId) {
                repHistory.add(transactions.get(i));
            }
        }
        return repHistory;
    }

    // get URL
    public String getPostUrl(int postId) {
        for (int i = 0; i < posts.size(); i++) {
            if (posts.get(i).getId() == postId) {
                return posts.get(i).getUrl();
            }
        }
        return "";
    }

    // log post
    public boolean logPost(int repId, String platform, String url) {
        if (!url.startsWith("https://")) { // if the url does not start with https://
            return false;
        }

        Post newPost = new Post(repId, platform, url);
        posts.add(newPost);

        PointTransaction newTransaction = new PointTransaction(repId, newPost.getId(), POINTS_PER_POST, 
        "Post logged");
        transactions.add(newTransaction);

        return true;
    }

    // redeem Points
    public boolean redeemPoints(int repId, int amount, String type) {
        if (amount <= 0) { // if amount is less than 0
            return false;
        }

        if (amount > getPoints(repId)) { // if amount is greater than rep's balance
            return false;
        }

        PointTransaction newTransaction = new PointTransaction(repId, -1, -amount, "Redeem for " + type);
        transactions.add(newTransaction);

        return true;
    }

    // delete ForRep
    public void deleteForRep(int repId) {
        for (int i = posts.size() - 1; i >= 0; i--) {
            if (posts.get(i).getRepId() == repId) {
                posts.remove(i);
            }
        }

        for (int i = transactions.size() - 1; i >= 0; i--) {
            if (transactions.get(i).getRepId() == repId) {
                transactions.remove(i);
            }
        }
    }
}
