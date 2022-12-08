<?php

require 'vendor/autoload.php';

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
        $this->conn = new MongoDB\Client("mongodb://{$this->user}:{$this->pass}@{$this->host}/{$this->base}");
        $this->collection = $this->conn->{$this->base}->{$this->coll};
    }

    function select()
    {
        $cursor = $this->collection->find([], ['projection' => ['_id' => 0]]);

        $table = iterator_to_array($cursor);
        return $table;
    }

    function selectKierunek($kierunek)
    {
        $cursor = $this->collection->find(['faculty' => $kierunek], ['projection' => ['_id' => 0]]);

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
        if ($flag) {
            $rec = new MongoDB\BSON\ObjectId($ident);
            $filter = array('_id' => $rec);
        } else {
            $filter = array('ident' => (int) $ident);
        }
        $update = array('$set' => $user);
        $updresult = $this->collection->updateOne($filter, $update);
        $ret = $updresult->getModifiedCount();
        return $ret;
    }

    function delete($ident, $flag)
    {
        if ($flag) {
            $rec = new MongoDB\BSON\ObjectId($ident);
            $filter = array('_id' => $rec);
        } else {
            $filter = array('ident' => (int) $ident); //gdy przejmujemy $ident z query_string mamy tekst, a w bazie danych integery
        }
        $delresult = $this->collection->deleteOne($filter);
        $ret = $delresult->getDeletedCount();
        return $ret;
    }

    function deleteNazwisko($nazwisko)
    {
        $filter = array('lname' => $nazwisko);
        $delresult = $this->collection->deleteOne($filter);
        $ret = $delresult->getDeletedCount();
        return $ret;
    }
}
?>