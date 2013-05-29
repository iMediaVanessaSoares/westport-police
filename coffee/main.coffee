


fontsize = 12
lowerlim = 8

$(document).ready->
  $('.taform').focusout->
    ghost = $("textarea[name="+$(this).attr('name')+"-g]")
    ghost.val $(this).val
    ghost.css font-size
