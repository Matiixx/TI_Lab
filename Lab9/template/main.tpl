<!DOCTYPE HTML>
<html>

<head>
   <meta http-equiv="content-type" content="text/html; charset=iso-8859-2">
   <title>Simple MVC</title>
   <?php echo $css ; ?>  
   <script type="text/JavaScript" src="js/baza.js" defer></script> 
</head>

<body>
   <header>
      <?php echo $title; ?>
   </header>
   <nav>
      <?php echo $menu; ?>
   </nav>
   <section>
      <header>
         <?php echo $header; ?>
      </header>
      <article>
         <?php echo $content; ?>
      </article>
   </section>
</body>

</html>