public class Rep {
    private static int nextId = 1;
    private int id;
    private String name;
    private String email;
    private String discountCode;
    private String personalPrCode;

    public Rep(String name, String email, String discountCode, String personalPrCode) {
        this.id = nextId;
        nextId++;
        this.name = name;
        this.email = email;
        this.discountCode = discountCode;
        this.personalPrCode = personalPrCode;
    }

    // get id
    public int getId() {
        return id;
    }

    // get name
    public String getName() {
        return name;
    }

    // get email
    public String getEmail() {
        return email;
    }

    // get discountCode
    public String getDiscountCode() {
        return discountCode;
    }

    // get personalPrCode
    public String getPersonalPrCode() {
        return personalPrCode;
    }

    // set name
    public void setName(String name) {
        this.name = name;
    }

    // set email
    public void setEmail(String email) {
        this.email = email;
    }

    // set discount code
    public void setDiscountCode(String discountCode) {
        this.discountCode = discountCode;
    }

    // set personalPrCode
    public void setPersonalPrCode(String personalPrCode) {
        this.personalPrCode = personalPrCode;
    }

    @Override
    public String toString() {
        return name;
    }
}
