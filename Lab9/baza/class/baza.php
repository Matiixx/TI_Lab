<?php

class baza extends controller
{
  protected $layout;
  protected $model;

  function __construct()
  {
    parent::__construct();
    $this->layout = new view('main');
    $this->model = new model2;
    $this->layout->css = $this->css;
    $this->layout->menu = $this->menu;
    $this->layout->title = 'Baza danych SQL';
  }

  function listAll()
  {

    $this->layout->header = 'Lista wszystkich rekordow';
    $this->view = new view('listAll');
    $this->view->data = $this->model->listAll();
    $this->layout->content = $this->view;
    return $this->layout;

  }

  function index()
  {
    return $this->listAll();
  }


  function insertRec()
  {

    $this->layout->header = 'Wprowadzanie danych do bazy';
    $this->view = new view('form');
    $this->layout->content = $this->view;
    return $this->layout;

  }

  function saveRec()
  {

    $data = $_POST['data'];
    $obj = json_decode($data);
    if (isset($obj->fname) and isset($obj->lname) and isset($obj->city)) {
      $response = $this->model->saveRec($obj);
    }
    return ($response ? "Dodano rekord" : "Blad ");

  }

  function searchUserForm()
  {

    $this->layout->header = 'Szukanie uzytkownika';
    $this->view = new view('searchform');
    $this->layout->content = $this->view;
    return $this->layout;

  }

  function find()
  {
    $data = $_POST['data'];
    $obj = json_decode($data);
    if (isset($obj->lname)) {
      $response = $this->model->searchUser($obj);
      if ($response) {
        $ret = '<table border="1">';
        foreach ($response as $row) {
          $ret .= '<tr><td>' . $row['imie'] . '</td><td>' . $row['nazwisko'] . '</td><td>' . $row['miejscowosc'] . '</td></tr>';
        }
        $ret .= '</table>';
        return $ret;
      } else {
        return 'Nie znaleziono zadnego rekordu';
      }
    }
  }

}

?>