import java.util.ArrayList;

public class RepManager {
    private ArrayList<Rep> reps;

    public RepManager() {
        reps = new ArrayList<>();
    }

    // validate email
    public static boolean isValidEmail(String email) {
        int atPos = email.indexOf("@"); // position of the @

        if (atPos == -1) {
            return false;
        }

        if (email.indexOf(".", atPos) == -1) { // look for . starting at the @
            return false;
        }

        return true;
    }

    // check if email exists
    public boolean emailExists(String email) { // go through every Rep in reps, one at a time
        for (Rep rep : reps) {
            if (rep.getEmail().equals(email)) { // is this rep's email already in use?
                return true; // if match found, stop and say yes
            }
        }
        return false;
    }

    // add rep to array list
    public boolean addRep(String name, String email, String discountCode, String personalPrCode) {
        if (!isValidEmail(email)) { // if email is not valid, return false
            return false;
        }
        
        if (emailExists(email)) { // does email already exist?
            return false;
        }
        
        Rep newRep = new Rep(name, email, discountCode, personalPrCode);
        reps.add(newRep);

        return true;
    }

    public ArrayList<Rep> getReps() {
        return reps;
    }

    // delete rep
    public boolean deleteRep(int repId) {
        for (Rep rep : reps) {
            if (rep.getId() == repId) {
                reps.remove(rep);
                return true;
            }
        }
        return false;
    }
}
