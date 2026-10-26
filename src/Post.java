public class Post {
    private static int nextId = 1;
    private int id;
    private int repId;
    private String platform;
    private String url;

    public Post(int repId, String platform, String url) {
        this.id = nextId;
        nextId++;
        this.repId = repId;
        this.platform = platform;
        this.url = url;
    }

    public Post(int id, int repId, String platform, String url) {
        this.id = id;
        this.repId = repId;
        this.platform = platform;
        this.url = url;
        if (id >= nextId) {
            nextId = id + 1;
        }
    }

    // get nextId
    public static int getNextId() {
        return nextId;
    }

    // make nextId persistent
    public static void setNextId(int newNextId) {
        if (newNextId > nextId) {
            nextId = newNextId;
        }
    }

    // get Id
    public int getId() {
        return id;
    }

    // get repId
    public int getRepId() {
        return repId;
    }

    // get platform
    public String getPlatform() {
        return platform;
    }

    // get url
    public String getUrl() {
        return url;
    }

    @Override 
    public String toString() {
        return id + " : " + platform + " - " + url;
    }
}
