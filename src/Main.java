import javafx.application.Application;
import javafx.scene.Scene;
import javafx.scene.layout.GridPane;
import javafx.scene.layout.HBox;
import javafx.scene.layout.VBox;
import javafx.scene.control.*;
import javafx.scene.control.cell.PropertyValueFactory;
import javafx.stage.Stage;
import javafx.geometry.Insets;
import javafx.beans.property.SimpleIntegerProperty;

public class Main extends Application {
    private RepManager repManager = new RepManager();
    private PointsManager pointsManager = new PointsManager();

    @Override // override start method in application class
    public void start(Stage primaryStage) {
        // Create a new TabPane
        TabPane tabPane = new TabPane();
        Tab teamTab = new Tab("Team");
        Tab addRepTab = new Tab("Add Rep");

        // Keep tabs from closing
        teamTab.setClosable(false);
        addRepTab.setClosable(false);

        // add tabs to tabPane
        tabPane.getTabs().addAll(teamTab, addRepTab);

        /** Add Rep Tab */
        // Create a new GridPane
        GridPane form = new GridPane();
        form.setPadding(new Insets(20));
        form.setHgap(10);
        form.setVgap(10);

        // Create a new Labels and text fields
        Label nameLabel = new Label("Name: ");
        TextField tfName = new TextField();
        Label emailLabel = new Label("Email: ");
        TextField tfEmail = new TextField();
        Label discountLabel = new Label("Discount Code: ");
        TextField tfDiscount = new TextField();
        Label personalDiscountLabel = new Label("Personal Discount Code: ");
        TextField tfPersonal = new TextField();

        // add label and textfield to form
        form.add(nameLabel, 0, 0);
        form.add(tfName, 1, 0);
        form.add(emailLabel, 0, 1);
        form.add(tfEmail, 1, 1);
        form.add(discountLabel, 0, 2);
        form.add(tfDiscount, 1, 2);
        form.add(personalDiscountLabel, 0, 3);
        form.add(tfPersonal, 1, 3);

        // Create button and add it to form
        Button btAdd = new Button("Add");
        form.add(btAdd, 1, 4);
        
        // Status label
        Label statusLabel = new Label("");
        form.add(statusLabel, 1, 5);

        /** Team Tab */
        // Create table
        TableView<Rep> table = new TableView<>();

        // Name Column
        TableColumn<Rep, String> colName = new TableColumn<>("Name");
        colName.setCellValueFactory(new PropertyValueFactory<>("name"));
        table.getColumns().add(colName);

        // Email column
        TableColumn<Rep, String> colEmail = new TableColumn<>("Email");
        colEmail.setCellValueFactory(new PropertyValueFactory<>("email"));
        table.getColumns().add(colEmail);

        // Discount Code Column
        TableColumn<Rep, String> colDiscount = new TableColumn<>("Discount Code");
        colDiscount.setCellValueFactory(new PropertyValueFactory<>("discountCode"));
        table.getColumns().add(colDiscount);

        // Personal code Column
        TableColumn<Rep, String> colPersonal = new TableColumn<>("Personal Code");
        colPersonal.setCellValueFactory(new PropertyValueFactory<>("personalCode"));
        table.getColumns().add(colPersonal);

        // Posts Column
        TableColumn<Rep, Integer> colPosts = new TableColumn<>("Posts");
        colPosts.setCellValueFactory(cellData -> new SimpleIntegerProperty(pointsManager.getPostCount(cellData.getValue().getId())).asObject());
        table.getColumns().add(colPosts);

        // Points Column
        TableColumn<Rep, Integer> colPoints = new TableColumn<>("Points");
        colPoints.setCellValueFactory(cellData -> new SimpleIntegerProperty(pointsManager.getPoints(cellData.getValue().getId())).asObject());
        table.getColumns().add(colPoints);
        
        // Add View History and Delete buttons
        Button btHistory = new Button("View History");
        Button btDelete = new Button("Delete");
        HBox buttonRow = new HBox(10, btHistory, btDelete);
        buttonRow.setPadding(new Insets(10));
        VBox teamLayout = new VBox(table, buttonRow);
        teamTab.setContent(teamLayout);

        // setOnAction for btAdd
        btAdd.setOnAction(e -> {
            statusLabel.setText("");
            String name = tfName.getText();
            String email = tfEmail.getText();
            String discount = tfDiscount.getText();
            String personalCode = tfPersonal.getText();

            // invalid email check
            if (!RepManager.isValidEmail(email)) {
                Alert alert = new Alert(Alert.AlertType.ERROR, "Invalid email");
                alert.showAndWait();
                return;
            }

            // check for duplicate email
            if (repManager.emailExists(email)) {
                Alert alert = new Alert(Alert.AlertType.ERROR, "Email already exists");
                alert.showAndWait();
                return;
            }
            // add to file
            repManager.addRep(name, email, discount, personalCode);
            table.getItems().setAll(repManager.getReps());
            
            // Status label
            statusLabel.setText("PR Rep added successfully.");
            statusLabel.setStyle("-fx-text-fill: green;");

            // clear fields after successfully added
            tfName.clear();
            tfEmail.clear();
            tfDiscount.clear();
            tfPersonal.clear();
            
        });

        // put form into addRepTab
        addRepTab.setContent(form);

        // Create scene and set stage
        Scene scene = new Scene(tabPane, 800, 500);
        primaryStage.setTitle("PR App"); // set title for stage
        primaryStage.setScene(scene); // place scene on stage
        primaryStage.show(); // display stage
    }

    public static void main(String[] args) {
        launch(args);
    }
}
