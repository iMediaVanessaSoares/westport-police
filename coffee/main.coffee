


fontsize = 12
lowerlim = 8

$(document).ready ->
  $(":input").focusout ->
    ghost = $(":input[name="+$(this).attr('name')+ "-g]")
    ghost.val $(this).val()
    ghost.css $(this).attr('font-size')
  $(":checkbox").click ->
    ghost = $(":checkbox[name="+$(this).attr('name')+"-g]")
    ghost.prop("checked", $(this).prop("checked"))
  $(".taform").keydown ->
    if(this.scrollHeight > this.outerHeight)
      fontsize--
      $(this).attr('font-size', fontsize+'pt')
