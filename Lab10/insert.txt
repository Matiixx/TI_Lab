<?php
require 'vendor/autoload.php';
include 'rest/mongo.php';
$db = new db();



echo '<link rel="stylesheet" href="style.css" type="text/css">';

echo '<main>';
echo "<header>CRUD w MongoDB</header>";

echo '<div>';

echo '<a href="select.php">Dane w bazie</a>';
echo '<a href="insert.php">Dodaj do bazy</a>';
echo '<a href="search.php">Szukaj w bazie</a>';
echo '<a href="">Dane w bazie</a>';

echo '</div>';


echo '<form action="insert.php" method="post">';
echo 'Podaj imie:<input type="text" name="imie">';
echo 'Podaj nazwisko:<input type="text" name="nazwisko">';
echo 'Podaj kierunek:<input type="text" name="kierunek">';
echo 'Podaj rok:<input type="text" name="rok">';
echo '<input type="submit">';
echo '</form>';

if (isset($_POST['imie']) && isset($_POST['nazwisko']) && isset($_POST['kierunek']) && isset($_POST['rok'])) {
    $record = array('ident' => 1, 'fname' => $_POST['imie'], 'lname' => $_POST['nazwisko'], 'faculty' => $_POST['kierunek'], 'year' => $_POST['rok']);
    $flag = $db->insert($record);
    echo "Dodano";
    print("<pre>" . print_r($record, true) . "</pre>");
}

echo '</main>';

?>