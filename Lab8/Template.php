<?php
class Template
{
  private $page;
  private $f_page;
  function read($source)
  {
    $this->page = implode('', file($source));
    // echo $this->page;
    return;
  }
  function merge($data)
  {
    // print_r($data);
    $this->f_page = preg_replace('/{([^}]+)}/e', '$data["\\1"]', $this->page);
    // print $this->f_page;
    return;
  }
  function write()
  {
    return $this->page;
  }
}
?>