lowerlim = 8.5
maxchar = 5360
affpgcount = 1

pxtopt = (pixel) ->
  return Math.round(pixel/((.35146/25.4)*96))

$(document).ready ->
  $(":input").focusout ->
    ghost = $(":input[name="+$(this).attr('name')+ "-g]")
    ghost.val $(this).val()
    ghost.css('font-size', $(this).css('font-size'))
  $(":checkbox").click ->
    ghost = $(":checkbox[name="+$(this).attr('name')+"-g]")
    ghost.prop("checked", $(this).prop("checked"))
  $(":input").keydown ->
    if(this.scrollHeight > $(this).outerHeight() || this.scrollWidth > $(this).outerWidth())
      fontsize = parseInt($(this).css("font-size"), 10)
      fontsize = pxtopt(fontsize)
      if(fontsize > lowerlim)
        $(this).css('font-size', (fontsize-1) + "pt")
      else
        while(this.scrollHeight > $(this).outerHeight() || this.scrollWidth > $(this).outerWidth())
          $(this).val $(this).val().substring(0, $(this).val().length-1)
  $("[id^=aff-f-]").focusout ->
    if($(this).val().length > maxchar)
      ss = $(this).val().substring(5361)
      $(this).val $(this).val().substring(0,5360)
      newpage = $(this).parent("[id^=aff-]").clone()
      newpage.child()
      $("#aff-1").after($("#aff-1").clone())
      affpgcount++

