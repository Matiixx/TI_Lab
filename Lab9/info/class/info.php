<?php
class info extends controller
{
  protected $layout;
  protected $model;

  function __construct()
  {
    parent::__construct();

    $this->layout = new view('main');
    $this->layout->css = $this->css;
    $this->layout->menu = $this->menu;
    $this->layout->title = 'Strona główna';

  }

  function index()
  {
    $this->layout->header = 'Strona glowna';
    $this->layout->content = '';
    return $this->layout;
  }

  function help()
  {
    $this->model = new model1();
    $this->layout->header = 'header_Simple MVC';
    $this->view = new view('table');
    $this->view->data = $this->model->getTable();
    $this->layout->content = $this->view;
    return $this->layout;
  }

}

?>