<?php
    $name = $_POST['name'];
    $email = $_POST['email'];
    $instagram = $_POST['instagram'];
?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Application received</title>
        <link href="style.css" rel="stylesheet"/>
    </head>
    <body>
        <header>
            <h1>Hippie Goth Stickers</h1>
            <p>Share the stickers you love and earn rewards for every post.</p>
        </header>
        <main>
            <h2>
                <?php
                    echo "Thanks, ".htmlspecialchars($name)."!";
                ?>
            </h2>
            <p>We'll email you at
                <?php
                    echo htmlspecialchars($email);
                ?>
                once your application is reviewed.
            </p>
            <?php
                if ($instagram != "") {
                    echo "<p>We'll check out your Instagram, ".htmlspecialchars($instagram).".</p>";
                }
                else {
                    echo "<p>No Instagram yet? You can add your accounts after you're approved.</p>";
                }
            ?>
        </main>
    </body>
</html>