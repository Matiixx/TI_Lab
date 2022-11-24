<?php

function __autoload($class_name)
{
  include $class_name . '.php';
}
$user = new Register_new;

if (!$user->_is_logged()) {
  echo "<p>Uzytkownik niezalogowany</p>";
  echo "<p><a href='strona_glowna.php'>Powrot do programu glownego</a></p>";
} else {
  $user->_read_user();

  $note = new NoteInterface;
  $table = $note->_read_messages();

  echo "<h2>Informacje uzytkownika " . $user->_get_email() . "</h2>";

  foreach ($table as $key => $record) {
    $timeStamp = explode("&", $key)[1];
    echo "<b>" . date('D Y-m-d H:i', $timeStamp) . "</b>";
    echo "<p>" . $record['note_text'] . "</p>";
  }

  echo "<p><a href='strona_glowna.php'>Powrot do programu glownego</a></p>";
}

?>