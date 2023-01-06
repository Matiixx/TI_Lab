<?php

//require 'vendor/autoload.php' ;

class db
{
  private $user = "0cichostepski";
  private $pass = "pass0cichostepski";
  private $host = "172.20.44.25";
  private $base = "0cichostepski";
  private $coll = "student";
  private $conn;
  private $dbase;
  private $collection;




  function __construct()
  {
    //$this->conn = new Mongo("mongodb://{$this->user}:{$this->pass}@{$this->host}/{$this->base}");
    $this->conn = new MongoDB\Client("mongodb://{$this->user}:{$this->pass}@{$this->host}/{$this->base}");
    //$this->dbase = $this->conn->selectDB($this->base);
    //$this->collection = $this->dbase->selectCollection($this->coll);
    $this->collection = $this->conn->{$this->base}->{$this->coll};
  }

  function select()
  {
    //$cursor = $this->collection->find(); //rezultat to tablica z całymi obiektami wraz z polem _id
    $cursor = $this->collection->find([], []); //wynik obejmuje wszystkie atrybuty oprócz _id
    //$cursor = $this->collection->find(['ident'=> 1],['projection' => ['_id' => 0]]);//filtrowanie wyników prez atrybut ident o wartosci 1 wynik obejmuje wszystkie atrybuty oprócz _id

    $table = iterator_to_array($cursor);
    return $table;
  }

  function search($lname)
  {
    $cursor = $this->collection->find(['lname' => $lname], []);
    $table = iterator_to_array($cursor);
    return $table;
  }

  function insert($user)
  {
    $ret = $this->collection->insertOne($user);
    return $ret;
  }

  function update($ident, $user, $flag)
  {
    try {
      if ($flag) {
        $rec = new MongoDB\BSON\ObjectId($ident);
        $filter = array('_id' => $rec);
      } else {
        $filter = array('ident' => (int)$ident); //gdy przejmujemy $ident z query_string mamy tekst, a w bazie danych integery
      }
      $update = array('$set' => $user);
      $updresult = $this->collection->updateOne($filter, $update);
      $ret = $updresult->getModifiedCount();
      return $ret;
    } catch (\Throwable $th) {
      return 0;
    }
  }

  function delete($ident, $flag)
  {
    try {
      $filter = array('_id' => new MongoDB\BSON\ObjectId($ident));
      $delresult = $this->collection->deleteOne($filter);
      $ret = $delresult->getDeletedCount();
      return $ret;
    } catch (\Throwable $th) {
      return 0;
    }
  }
}
