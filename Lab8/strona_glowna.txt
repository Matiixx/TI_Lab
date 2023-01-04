<?php
session_start();
function __autoload($class_name)
{
    include $class_name . '.php';
}
$user = new Register_new;
if (!$user->_is_logged()) {
    echo "<p><a href='rejestracja.html'>Rejestracja w serwisie</a></p>";
    echo "<p><a href='logowanie.html'>Logowanie do serwisu</a></p>";

} else {
    echo "<p><a href='dane_uzytkownika.php'>Dane uzytkownika</a></p>";
    echo "<p><a href='wszyscy_uzytkownicy.php'>Zarejestrowani uzytkownicy</a></p>";
    echo "<p><a href='nowywpis.html'>Blog użytkownika - nowy wpis</a></p>";
    echo "<p><a href='wpisy.php'>Blog uzytkownika - lista wpisow</a></p>";
    echo "<p><a href='wyloguj.php'>Wylogowanie z serwisu</a></p>";
}

?>