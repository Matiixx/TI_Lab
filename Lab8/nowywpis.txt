<?php
session_start();
function __autoload($class_name)
{
  include $class_name . '.php';
}
$user = new Register_new;
if (!$user->_is_logged()) {
  echo "<p>Uzytkownik niezalogowany</p>";
  echo "<p><a href='strona_glowna.php'>Powrot do programu glownego</a></p>";
} else {
  $note = new NoteInterface;
  echo $note->_read();
  echo "<br>";
  echo $note->_save_messages();
  echo "<p><a href='strona_glowna.php'>Powrot do programu glownego</a></p>";
}

?>