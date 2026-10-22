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
