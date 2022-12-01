<?php
class model2
{
  static $dsn = 'sqlite:sql/baza.db';
  protected static $db;
  private $sth;

  function __construct()
  {
    self::$db = new PDO(self::$dsn); //interfejs języka PHP przeznaczony do komunikacji z bazami danych
    self::$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  }

  public function listAll()
  {
    $this->sth = self::$db->prepare('SELECT * FROM osoba');
    $this->sth->execute();
    $result = $this->sth->fetchAll();
    return $result;
  }

  public function saveRec($obj)
  {
    $this->sth = self::$db->prepare('INSERT INTO osoba VALUES ( :fname, :lname, :city)');
    $this->sth->bindValue(':fname', $obj->fname, PDO::PARAM_STR);
    $this->sth->bindValue(':lname', $obj->lname, PDO::PARAM_STR);
    $this->sth->bindValue(':city', $obj->city, PDO::PARAM_STR);
    $resp = ($this->sth->execute() ? 'true' : 'false');
    return $resp;
  }

  public function searchUser($obj)
  {
    $this->sth = self::$db->prepare('SELECT * FROM osoba WHERE nazwisko LIKE :lname ');
    $this->sth->bindValue(':lname', "%" . $obj->lname . "%", PDO::PARAM_STR);
    $this->sth->execute();
    $result = $this->sth->fetchAll();
    return $result;
  }
}
?>