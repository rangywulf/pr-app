import java.io.FileNotFoundException;
import java.util.Optional;

import javafx.application.Application;
import javafx.scene.Scene;
import javafx.scene.Node;
import javafx.scene.layout.GridPane;
import javafx.scene.layout.HBox;
import javafx.scene.layout.Priority;
import javafx.scene.layout.Region;
import javafx.scene.layout.VBox;
import javafx.scene.control.*;
import javafx.scene.control.cell.PropertyValueFactory;
import javafx.stage.Stage;
import javafx.geometry.Insets;
import javafx.geometry.Pos;
import javafx.geometry.VPos;
import javafx.geometry.HPos;
import javafx.beans.property.SimpleIntegerProperty;
import javafx.beans.property.SimpleStringProperty;

import java.util.ArrayList;
import java.time.LocalDate;

public class Main extends Application {
    private RepManager repManager = new RepManager();
    private PointsManager pointsManager = new PointsManager();
    private FileHandler fileHandler = new FileHandler();

    @Override // override start method in application class
    public void start(Stage primaryStage) {
        try {
            fileHandler.load(repManager, pointsManager);
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }

        // Create a new TabPane
        TabPane tabPane = new TabPane();
        Tab teamTab = new Tab("Team");
        Tab addRepTab = new Tab("Add Rep");
        Tab logPostTab = new Tab("Log Post");
        Tab redeemTab = new Tab("Redeem");

        // Keep tabs from closing
        teamTab.setClosable(false);
        addRepTab.setClosable(false);
        logPostTab.setClosable(false);
        redeemTab.setClosable(false);

        // add tabs to tabPane
        tabPane.getTabs().addAll(teamTab, addRepTab, logPostTab, redeemTab);
        
        // Tab styling
        tabPane.setStyle("-fx-tab-min-height: 40; -fx-tab-min-width: 100; -fx-focus-color: #4FB3BF; -fx-faint-focus-color: #4FB3BF33;");
        teamTab.setStyle("-fx-font-size: 14; -fx-font-weight: bold; -fx-background-color: #4FB3BF; -fx-text-base-color: #124049;");
        addRepTab.setStyle("-fx-font-size: 14; -fx-font-weight: bold;");
        logPostTab.setStyle("-fx-font-size: 14; -fx-font-weight: bold;");
        redeemTab.setStyle("-fx-font-size: 14; -fx-font-weight: bold;");

        // Change color of tab when selected
        teamTab.setOnSelectionChanged(e -> {
            if (teamTab.isSelected()) {
                teamTab.setStyle("-fx-font-size: 14; -fx-font-weight: bold; -fx-background-color: #4FB3BF; -fx-text-base-color: #124049;");
            } else {
                teamTab.setStyle("-fx-font-size: 14; -fx-font-weight: bold;");
            }
        });

        addRepTab.setOnSelectionChanged(e -> {
            if (addRepTab.isSelected()) {
                addRepTab.setStyle("-fx-font-size: 14; -fx-font-weight: bold; -fx-background-color: #4FB3BF; -fx-text-base-color: #124049;");
            } else {
                addRepTab.setStyle("-fx-font-size: 14; -fx-font-weight: bold;");
            }
        });

        logPostTab.setOnSelectionChanged(e -> {
            if (logPostTab.isSelected()) {
                logPostTab.setStyle("-fx-font-size: 14; -fx-font-weight: bold; -fx-background-color: #4FB3BF; -fx-text-base-color: #124049;");
            } else {
                logPostTab.setStyle("-fx-font-size: 14; -fx-font-weight: bold;");
            }
        });

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
        tfName.setPrefWidth(250);
        tfEmail.setPrefWidth(250);
        tfDiscount.setPrefWidth(250);
        tfPersonal.setPrefWidth(250);

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
        form.add(statusLabel, 1, 4); 
        statusLabel.managedProperty().bind(statusLabel.textProperty().isNotEmpty());

        // Sizing and styling
        GridPane.setHalignment(btAdd, HPos.RIGHT);
        GridPane.setHalignment(statusLabel, HPos.LEFT);
        GridPane.setValignment(btAdd, VPos.CENTER);
        GridPane.setValignment(statusLabel, VPos.CENTER);
        form.setAlignment(Pos.CENTER);
        form.setMaxSize(Region.USE_PREF_SIZE, Region.USE_PREF_SIZE);
        form.setStyle("-fx-border-color: #cccccc; -fx-border-radius: 8; -fx-background-color: white; -fx-background-radius: 8;");
        btAdd.setStyle("-fx-background-color: #4FB3BF; -fx-text-fill: #124049; -fx-font-weight: bold; -fx-background-radius: 6;");

        /** Log Post Tab */
        // Create Grid
        GridPane logPostForm = new GridPane();
        logPostForm.setPadding(new Insets(20));
        logPostForm.setHgap(10);
        logPostForm.setVgap(10);

        // Create labels
        Label repLabel = new Label("Name: ");
        ComboBox<Rep> cbRep = new ComboBox<>();
        Label platformLabel = new Label("Platform: ");
        ComboBox<String> cbPlatform = new ComboBox<>();
        cbPlatform.getItems().addAll("YouTube", "TikTok", "Instagram", "Facebook", "Substack");
        Label urlLabel = new Label("URL of Post: ");
        TextField tfUrl = new TextField();

        // Create button
        Button btLogPost = new Button("Add");

        // add label and textfield to form
        logPostForm.add(repLabel, 0, 0);
        logPostForm.add(cbRep, 1, 0);
        logPostForm.add(platformLabel, 0, 1);
        logPostForm.add(cbPlatform, 1, 1);
        logPostForm.add(urlLabel, 0, 2);
        logPostForm.add(tfUrl, 1, 2);
        logPostForm.add(btLogPost, 1, 3);
        cbRep.setPrefWidth(250);
        cbPlatform.setPrefWidth(250);
        tfUrl.setPrefWidth(250);

        // Create label status
        Label logStatusLabel = new Label("");
        logPostForm.add(logStatusLabel, 1, 3);
        logStatusLabel.managedProperty().bind(logStatusLabel.textProperty().isNotEmpty());

        // Styling and sizing
        GridPane.setHalignment(btLogPost, HPos.RIGHT);
        GridPane.setHalignment(logStatusLabel, HPos.LEFT);
        GridPane.setValignment(btLogPost, VPos.CENTER);
        GridPane.setValignment(logStatusLabel, VPos.CENTER);
        logPostForm.setAlignment(Pos.CENTER);
        logPostForm.setMaxSize(Region.USE_PREF_SIZE, Region.USE_PREF_SIZE);
        logPostForm.setStyle("-fx-border-color: #cccccc; -fx-border-radius: 8; -fx-background-color: white; -fx-background-radius: 8;");
        btLogPost.setStyle("-fx-background-color: #4FB3BF; -fx-text-fill: #124049; -fx-font-weight: bold; -fx-background-radius: 6;");

        // place form in logpost tab
        Label logPostTitle = new Label("Log PR Posts");
        logPostTitle.setStyle("-fx-font-size: 20; -fx-font-weight: bold");
        VBox logPostLayout = new VBox(15, logPostTitle, logPostForm);
        logPostLayout.setAlignment(Pos.CENTER);
        logPostLayout.setStyle("-fx-background-color: #eee6d7");
        logPostLayout.setPadding(new Insets(20, 20, 100, 20));
        logPostTab.setContent(logPostLayout);

        /** Redeem Tab */
        // Create Grid 
        GridPane redeemForm = new GridPane();
        redeemForm.setPadding(new Insets(20));
        redeemForm.setHgap(10);
        redeemForm.setVgap(10);

        // Create labels
        Label redeemRepLabel = new Label("Name: ");
        ComboBox<Rep> cbRedeemRep = new ComboBox<>();
        Label currentPointsLabel = new Label("Current points: ");
        Label pointsValueLabel = new Label("0");
        Label redeemAmountLabel = new Label("How many points to redeem: ");
        TextField tfRedeemAmount = new TextField();
        Label typeLabel = new Label("Type: ");
        ComboBox<String> cbType = new ComboBox<>();
        cbType.getItems().addAll("Cash Payout", "Product", "Store Credit");
        Label redeemStatusLabel = new Label("");

        // Create button
        Button btRedeem = new Button("Redeem");

        // add label and textfield to form
        redeemForm.add(redeemRepLabel, 0, 0);
        redeemForm.add(cbRedeemRep, 1, 0);
        redeemForm.add(currentPointsLabel, 0, 1);
        redeemForm.add(pointsValueLabel, 1, 1);
        redeemForm.add(redeemAmountLabel, 0, 2);
        redeemForm.add(tfRedeemAmount, 1, 2);
        redeemForm.add(typeLabel, 0, 3);
        redeemForm.add(cbType, 1, 3);
        redeemForm.add(btRedeem, 1, 4);
        redeemForm.add(redeemStatusLabel, 1, 4);
        cbRedeemRep.setPrefWidth(250);
        tfRedeemAmount.setPrefWidth(250);
        cbType.setPrefWidth(250);
        redeemStatusLabel.managedProperty().bind(redeemStatusLabel.textProperty().isNotEmpty());

        // Styling and sizing
        GridPane.setHalignment(btRedeem, HPos.RIGHT);
        GridPane.setHalignment(redeemStatusLabel, HPos.LEFT);
        GridPane.setValignment(btRedeem, VPos.CENTER);
        GridPane.setValignment(redeemStatusLabel, VPos.CENTER);
        redeemForm.setAlignment(Pos.CENTER);
        redeemForm.setMaxSize(Region.USE_PREF_SIZE, Region.USE_PREF_SIZE);
        redeemForm.setStyle("-fx-border-color: #cccccc; -fx-border-radius: 8; -fx-background-color: white; -fx-background-radius: 8;");
        btRedeem.setStyle("-fx-background-color: #4FB3BF; -fx-text-fill: #124049; -fx-font-weight: bold; -fx-background-radius: 6;");
    
        // place form in redeem tab
        Label redeemTitle = new Label("Redeem Points");
        redeemTitle.setStyle("-fx-font-size: 20; -fx-font-weight: bold;");
        VBox redeemLayout = new VBox(15, redeemTitle, redeemForm);
        redeemLayout.setAlignment(Pos.CENTER);
        redeemLayout.setStyle("-fx-background-color: #eee6d7");
        redeemLayout.setPadding(new Insets(20, 20, 100, 20));
        redeemTab.setContent(redeemLayout);

        // Update Current points
        cbRedeemRep.setOnAction(e -> {
            Rep selectedRep = cbRedeemRep.getValue();
            if (selectedRep == null) {
                pointsValueLabel.setText("0");
                return;
            }
            pointsValueLabel.setText(String.valueOf(pointsManager.getPoints(selectedRep.getId())));
        });

        // Refresh points 
        redeemTab.setOnSelectionChanged(e -> {
            Rep selectedRep = cbRedeemRep.getValue();
            if (selectedRep != null) {
                pointsValueLabel.setText(String.valueOf(pointsManager.getPoints(selectedRep.getId())));
            }

            // change tab color
            if (redeemTab.isSelected()) {
                redeemTab.setStyle("-fx-font-size: 14; -fx-font-weight: bold; -fx-background-color: #4FB3BF; -fx-text-base-color: #124049;");
            } else {
                redeemTab.setStyle("-fx-font-size: 14; -fx-font-weight: bold;");
            }
        });

        /** Team Tab */
        // Create table
        TableView<Rep> table = new TableView<>();
        table.getSelectionModel().setSelectionMode(SelectionMode.MULTIPLE);
        table.setColumnResizePolicy(TableView.CONSTRAINED_RESIZE_POLICY_ALL_COLUMNS);
        table.setStyle("-fx-focus-color: transparent; -fx-faint-focus-color: transparent;");

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
        buttonRow.setPadding(new Insets(10, 0, 0, 0));
        VBox teamLayout = new VBox(table, buttonRow);
        VBox.setVgrow(table, Priority.ALWAYS);
        teamLayout.setPadding(new Insets(20));
        teamLayout.setStyle("-fx-background-color: #eee6d7");
        buttonRow.setAlignment(Pos.CENTER_RIGHT);
        btHistory.setStyle("-fx-background-color: #4Fb3BF; -fx-text-fill: #124049; -fx-font-weight: bold; -fx-background-radius: 6;");
        btDelete.setStyle("-fx-background-color: #4FB3BF; -fx-text-fill: #124049; -fx-font-weight: bold; -fx-background-radius: 6;");
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

            // Table refresh
            cbRep.getItems().setAll(repManager.getReps());
            cbRedeemRep.getItems().setAll(repManager.getReps());
            
            // Status label
            statusLabel.setText("PR Rep added successfully.");
            statusLabel.setStyle("-fx-text-fill: #124049; -fx-font-weight: bold;");

            // clear fields after successfully added
            tfName.clear();
            tfEmail.clear();
            tfDiscount.clear();
            tfPersonal.clear();            
        });

        // View History button
        btHistory.setOnAction(e -> {
            ArrayList<Rep> selectedReps = getSelectedReps(table);
            if (selectedReps == null) {
                return;
            }
            Rep selectedRep = selectedReps.get(0);

            // Create table for Points History
            ArrayList<PointTransaction> history = pointsManager.getHistory(selectedRep.getId());
            TableView<PointTransaction> historyTable = new TableView<>();
            TableColumn<PointTransaction, LocalDate> colDate = new TableColumn<>("Date");
            colDate.setCellValueFactory(new PropertyValueFactory<>("date"));
            historyTable.getColumns().add(colDate);
            TableColumn<PointTransaction, Integer> colAmount = new TableColumn<>("Amount");
            colAmount.setCellValueFactory(new PropertyValueFactory<>("amount"));
            historyTable.getColumns().add(colAmount);
            TableColumn<PointTransaction, String> colReason = new TableColumn<>("Reason");
            colReason.setCellValueFactory(new PropertyValueFactory<>("reason"));
            historyTable.getColumns().add(colReason);
            TableColumn<PointTransaction, String> colUrl = new TableColumn<>("URL");
            colUrl.setCellValueFactory(cellData -> new SimpleStringProperty(pointsManager.getPostUrl(cellData.getValue().getPostId())));

            // Styling
            historyTable.getColumns().add(colUrl);
            historyTable.setColumnResizePolicy(TableView.CONSTRAINED_RESIZE_POLICY_ALL_COLUMNS);
            Label historyTitle = new Label(selectedRep.getName() + " Point History");
            historyTitle.setStyle("-fx-font-size: 20; -fx-font-weight: bold;");
            VBox historyLayout = new VBox(15, historyTitle, historyTable);
            VBox.setVgrow(historyTable, Priority.ALWAYS);
            historyLayout.setPadding(new Insets(20));
            historyLayout.setStyle("-fx-border-color: #999999; -fx-border-width: 1; -fx-focus-color: transparent; -fx-faint-focus-color: transparent;");
            btHistory.setStyle("-fx-background-color: #4FB3BF; -fx-text-fill: #124049; -fx-font-weight: bold; -fx-background-radius: 6;");

            historyTable.getItems().setAll(history);
            historyTable.setMouseTransparent(true);
            historyTable.setFocusTraversable(false);

            // Create new stage for Points History
            Stage historyStage = new Stage();
            Scene historyScene = new Scene(historyLayout, 700, 300);
            historyStage.setTitle(selectedRep.getName()+ " Point History"); // set title for stage
            historyStage.setScene(historyScene); // Place scene on stage
            historyStage.show(); // display stage

        });

        // Delete Button
        btDelete.setOnAction(e -> {
            ArrayList<Rep> selectedReps = getSelectedReps(table);
            if (selectedReps == null) {
                return;
            }

            Alert confirm = new Alert(Alert.AlertType.CONFIRMATION, "Delete " + selectedReps.size() + 
                " rep(s)? Their posts and point history will be deleted too. This cannot be undone.");
            Optional<ButtonType> result = confirm.showAndWait();

            if (result.isPresent() && result.get() == ButtonType.OK) {
                for (Rep rep : selectedReps) {
                    pointsManager.deleteForRep(rep.getId());
                    repManager.deleteRep(rep.getId());
                }
                table.getItems().setAll(repManager.getReps());

                // refresh table
                cbRep.getItems().setAll(repManager.getReps());
                cbRedeemRep.getItems().setAll(repManager.getReps());
            }

            
        });

        // Add button for log post
            btLogPost.setOnAction(e -> {
                logStatusLabel.setText("");
                Rep selectedRep = cbRep.getValue();
                String platform = cbPlatform.getValue();
                String url = tfUrl.getText();

                if (selectedRep == null || platform == null) {
                    Alert alert = new Alert(Alert.AlertType.ERROR, "Please select a rep and a platform");
                    alert.showAndWait();
                    return;
                }

                if (!url.startsWith("https://")) {
                    Alert alert = new Alert(Alert.AlertType.ERROR, "Invalid URL. Must start with https://");
                    alert.showAndWait();
                    return;
                }

                // Log the post
                pointsManager.logPost(selectedRep.getId(), platform, url);
                table.getItems().setAll(repManager.getReps());

                // Display completed
                logStatusLabel.setText("Post logged successfully");
                logStatusLabel.setStyle("-fx-text-fill: #124049; -fx-font-weight: bold;");

                // Clear textfields
                tfUrl.clear();

            });

        // Redeem Button
        btRedeem.setOnAction(e -> {
            redeemStatusLabel.setText("");
            Rep selectedRep = cbRedeemRep.getValue();
            String type = cbType.getValue();
            if (selectedRep == null || type == null) {
                Alert alert = new Alert(Alert.AlertType.ERROR, "Please select a rep and a type");
                alert.showAndWait();
                return;
            }

            // Create amount
            int amount;

            // turns points text into a number
            try {
                amount = Integer.parseInt(tfRedeemAmount.getText());
            } catch (NumberFormatException ex) {
                Alert alert = new Alert(Alert.AlertType.ERROR, "Invalid amount");
                alert.showAndWait();
                return;
            }

            // redeem and reject a bad amount
            if (!pointsManager.redeemPoints(selectedRep.getId(), amount, type)) {
                Alert alert = new Alert(Alert.AlertType.ERROR, "Invalid amount");
                alert.showAndWait();
                return;
            }

            // Successful redemption
            table.getItems().setAll(repManager.getReps());
            pointsValueLabel.setText(String.valueOf(pointsManager.getPoints(selectedRep.getId())));
            redeemStatusLabel.setText("Points redeemed successfully.");
            redeemStatusLabel.setStyle("-fx-text-fill: #124049; -fx-font-weight: bold;");
            tfRedeemAmount.clear();
        });

        // put form into addRepTab
        Label addRepTitle = new Label("Add PR Rep");
        addRepTitle.setStyle("-fx-font-size: 20; -fx-font-weight: bold;");
        VBox addRepLayout = new VBox(15, addRepTitle, form);
        addRepLayout.setPadding(new Insets(20, 20, 100, 20));
        addRepLayout.setAlignment(Pos.CENTER);
        addRepLayout.setStyle("-fx-background-color: #eee6d7");
        addRepTab.setContent(addRepLayout);

        // Title, company, and tagline above tabs and styling
        Label appTitle = new Label("Shiver");
        appTitle.setStyle("-fx-font-size: 24; -fx-font-weight: bold; -fx-text-fill: #f5f1ea; -fx-background-color: #124049;");
        appTitle.setMaxWidth(Double.MAX_VALUE);
        appTitle.setPadding(new Insets(10, 0, 0, 20));
        Label appTagline = new Label("Your PR team, swimming in sync.");
        Label appCompany = new Label("by Kelpkin");
        appTagline.setStyle("-fx-font-size: 13; -fx-text-fill: #4FB3BF;");
        appTagline.setPadding(new Insets(0, 0, 10, 20));
        appCompany.setStyle("-fx-font-size: 11; -fx-text-fill: #f5f1ea;");
        appCompany.setPadding(new Insets(0, 0 ,0 , 6));
        HBox titleRow = new HBox(appTitle, appCompany);
        titleRow.setAlignment(Pos.BASELINE_LEFT);
        VBox banner = new VBox(titleRow, appTagline);
        banner.setStyle("-fx-background-color: #124049;");
        VBox root = new VBox(banner, tabPane);
        VBox.setVgrow(tabPane, Priority.ALWAYS);

        // Create scene and set stage
        Scene scene = new Scene(root, 800, 500);
        primaryStage.setTitle("Shiver"); // set title for stage
        primaryStage.setScene(scene); // place scene on stage
        primaryStage.show(); // display stage

        // Display the loaded from the file
        table.getItems().setAll(repManager.getReps());
        cbRep.getItems().setAll(repManager.getReps());
        cbRedeemRep.getItems().setAll(repManager.getReps());

        // Save reps, posts, and point transactions to shiver-data.text when app is closed
        primaryStage.setOnCloseRequest( e -> {
            try {
                fileHandler.save(repManager.getReps(), pointsManager.getPosts(), pointsManager.getTransactions());
            } catch (FileNotFoundException ex) {
                ex.printStackTrace();
            }
        });

        // change background color behind tabs
        Node tabHeader = tabPane.lookup(".tab-header-background"); 
        if (tabHeader != null) {
        tabHeader.setStyle("-fx-background-color: #124049;");
        }
    }

    // Select Rep
    private ArrayList<Rep> getSelectedReps(TableView<Rep> table) {
        ArrayList<Rep> selectedReps = new ArrayList<>(table.getSelectionModel().getSelectedItems());

        if (selectedReps.isEmpty()) {
            Alert alert = new Alert(Alert.AlertType.WARNING, "Please select a rep first");
            alert.showAndWait();
            return null;
        }

        return selectedReps;
    }
    public static void main(String[] args) {
        launch(args);
    }
}
