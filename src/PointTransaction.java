import java.time.LocalDate;

public class PointTransaction {
    private static int nextId = 1;
    private int id;
    private int repId;
    private int postId;
    private int amount;
    private String reason;
    private LocalDate date;

    public PointTransaction(int repId, int postId, int amount, String reason) {
        this.id = nextId;
        nextId++;
        this.repId = repId;
        this.postId = postId;
        this.amount = amount;
        this.reason = reason;
        this.date = LocalDate.now();
    }

    // get Id
    public int getId() {
        return id;
    }

    // get repId
    public int getRepId() {
        return repId;
    }

    // get postId
    public int getPostId() {
        return postId;
    }

    // get amount
    public int getAmount() {
        return amount;
    }

    // get reason
    public String getReason() {
        return reason;
    }

    // get Date
    public LocalDate getDate() {
        return date;
    }

    @Override 
    public String toString() {
        return "Amount: " + amount + ", " + "Reason: " + reason;
    }
}
