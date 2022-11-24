<?php
function __autoload($class_name)
{
  include $class_name . '.php';
}
$user = new Register_new;
echo $user->_logout();
echo "<p><a href='strona_glowna.php'>Powrot do programu glownego</a></p>";
?>