<?php

class NoteInterface
{
  private $dbh;
  private $dbfile = "notes.db";
  protected $data = array();

  function __construct()
  {
    session_start();
  }

  /*  
   *   Metoda  _read()
   *       Odczyt danych przesłanych z formularza
   */
  function _read()
  {
    $this->data['note_text'] = $_POST['note_text'];
    return "Zawartosc wpisu: " . $this->data['note_text'];
  }
  /*  
   *   Metoda  _save_messages()
   *    Zapis przesłanej informacji na serwer w pliku notes.db 
   *    bazy Berkeley DB:
   *    klucz (e-mail&znacznik czasowy) => wartość(informacja) 
   */
  function _save_messages()
  {
    if (isset($_SESSION['user'])) {
      $email = $_SESSION['user'];
      $this->dbh = dba_open($this->dbfile, "c");
      $key = $email . "&" . $_SERVER['REQUEST_TIME'];
      if (!dba_exists($key, $this->dbh)) {
        $serialized_data = serialize($this->data);
        dba_insert($key, $serialized_data, $this->dbh);
        $text = 'Wpis zostal zapisany';
      } else {
        $text = 'Błąd przy dodawaniu wpisu!';
      }
      dba_close($this->dbh);
      return $text;
    }
  }
  /*  
   *   Metoda  _read_messages()
   *    Odczyt wszystkich informacji dla danego użytkownika 
   *    z  bazy Berkeley DB:
   *    - klucz (e-mail&znacznik czasowy) => wartość(informacja) 
   */
  function _read_messages()
  {
    if (isset($_SESSION['user'])) {
      $email = $_SESSION['user'];
      $table = array();
      $this->dbh = dba_open($this->dbfile, "r");
      $key = dba_firstkey($this->dbh);
      while ($key) {
        if (explode("&", $key)[0] == $email) {
          $serialized_data = dba_fetch($key, $this->dbh);
          $this->data = unserialize($serialized_data);
          $table[$key]['note_text'] = $this->data['note_text'];
        }
        $key = dba_nextkey($this->dbh);
      }
      dba_close($this->dbh);
      return $table;
    }
  }
}
?>