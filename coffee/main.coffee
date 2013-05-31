


fontsize = 12
lowerlim = 8

$(document).ready ->
  $(":input").focusout ->
    ghost = $(":input[name="+$(this).attr('name')+ "-g]")
    ghost.val $(this).val()
    ghost.css $(this).attr('font-size')
  $(".taform").keydown ->
    if(this.scrollHeight > this.outerHeight)
      fontsize--
      $(this).attr('font-size', fontsize+'pt')
