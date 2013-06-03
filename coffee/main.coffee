lowerlim = 8.5

pxtopt = (pixel) ->
  return pixel/((.35146/25.4)*96)

$(document).ready ->
  $(":input").focusout ->
    ghost = $(":input[name="+$(this).attr('name')+ "-g]")
    ghost.val $(this).val()
    ghost.css('font-size', $(this).css('font-size'))
  $(":checkbox").click ->
    ghost = $(":checkbox[name="+$(this).attr('name')+"-g]")
    ghost.prop("checked", $(this).prop("checked"))
  $(":input").keydown ->
    fontsize = parseInt($(this).css("font-size"), 10)
    fontsize = pxtopt(fontsize)
    if(fontsize > lowerlim)
      $(this).css('font-size', (fontsize-1) + "pt")
