<form name="form" id="search-form">            
  <table>
    <tr><td><label for="lname">Nazwisko:</label></td>
    <td><input value="<?php if(isset($formData)) echo $formData['lname']; ?>" type="text" id="lname" name="lname" /></td></tr>
    <tr><td><span id="data"><input type="button" value="Szukaj" onclick="fn_search()" /></span></td></tr>
  </table>
</form> 
<div id="response"></div>