lowerlim = 8

$(document).ready ->
  $(":input").focusout ->
    ghost = $(":input[name="+$(this).attr('name')+ "-g]")
    ghost.val $(this).val()
    ghost.css('font-size', $(this).css('font-size'))
  $(":checkbox").click ->
    ghost = $(":checkbox[name="+$(this).attr('name')+"-g]")
    ghost.prop("checked", $(this).prop("checked"))
  $(":input").keydown ->
    fontsize = parseFloat($(this).css("font-size"))
    fontsize--
    $(this).css('font-size', fontsize+'pt')
