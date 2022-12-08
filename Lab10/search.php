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
echo '<a href="delete.php">Usun z bazy</a>';


echo '</div>';


echo '<form action="search.php" method="get">';
echo 'Podaj kierunek:<input type="text" name="kierunek">';
echo '<input type="submit">';
echo '</form>';

if (isset($_GET['kierunek'])) {
    echo $_GET['kierunek'];
    $data = $db->selectKierunek($_GET['kierunek']);
    print("<pre>" . print_r($data, true) . "</pre>");
}


echo '</main>';

?>