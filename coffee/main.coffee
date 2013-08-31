lowerlim = 9
Upperlim = 12
maxchar = 4600
affpgcount = 1
currpg = 1
affalltext = ""
editmode = false

pxtopt = (pixel) ->
  return Math.round(pixel/((.35146/25.4)*96))

maxpgrenum = () ->
  $("[name='mpage']").each ->
    $(this).val affpgcount
  return

pnrenum = () ->
  currpg = 1
  $("[name='pn']").each(pnnum)
  return

pnnum =() ->
  $(this).val(currpg)
  currpg = currpg + 1
  return

newaffpage = (priorpage,ext) ->
  newpage = priorpage.clone(true)
  affpgcount++
  npchild = newpage.find("[name='aff-f-1']")
  priorpage.after newpage
  npchild.val("")
  if(ext.length>maxchar)
    npchild.val(ext.substring(0,maxchar))
    newaffpage(newpage,ext.substring(maxchar))
  else
    npchild.focus()
    maxpgrenum
    pnrenum
  return

getnextline = (text) ->
  #regexp to find chain of letters ending in linefeed or period
  #return line
  exp = new RegExp("([^\.\n]*)(\.|\n){1}")
  result = exp.exec(text)
  if(result[0] == null)
    console.log("YOU DUMBASS!")
    return ""
  return result[0]

placenextline = (page, text) ->
  #recursion, because why not?
  nline = getnextline(text)
  affta = page.find("[name='aff-f-1']")
  #save old val
  oldval = affta.val()
  newtext = text.substring(nline.length)
  affta.val(affta.val()+nline)
  #now check scroll height
  console.log(page.prop('scrollHeight'))
  console.log(page.outerHeight())
  if(affta.prop('scrollHeight') > affta.outerHeight())
    console.log("what?!")
    console.log("end recurse")
    affta.val(oldval)
    restext = text
  else
    if(newtext.length == 0)
      console.log("here")
      restext = newtext
    else
      console.log("catch")
      restext = placenextline(page, newtext)
  return restext

#grabs text from all affidavit field
affgrabtext = (page) ->
  #grab aff form
  affta = page.find("[name='aff-f-1']")
  affalltext += affta.val()
  if(page.find("[name='pn']").val() > 1)
   page.remove()
  return

#Enter affidavit edit mode
affeditmode = () ->
  #reset affalltext
  affalltext = ""
  affpgcount = 1
  $("[name='aff-1']").each ->
    affgrabtext($(this))
  maxpgrenum()
  $("[name='aff-f-1']").val(affalltext)
  $("[name='aff-f-1']").focus()
  $(document).scrollTop($("[name='aff-f-1']").position().top)
  return

extendaff = (extra, priorpage) ->
  newpage = priorpage.clone(true)
  affpgcount++
  newpage.attr("name", "aff-1")
  #Will write recursive search loop later
  newpage.find("[name='pn']").val(affpgcount)
  temp = newpage.find("[name='paffi']")
  temp.attr('name', temp.attr('name'))
  temp = newpage.find("[name='affsig']")
  temp.attr('name', temp.attr('name'))
  temp = newpage.find("[name='date']")
  temp.attr('name', temp.attr('name'))
  temp = newpage.find("[name='affsig2']")
  temp.attr('name', temp.attr('name'))
  temp = newpage.find("[name='tcourt']")
  temp.attr('name', temp.attr('name'))
  npchild = newpage.find("[name='aff-f-1']")
  npchild.attr('name', ("aff-f-1"))
  priorpage.after newpage
  leftovers = placenextline(newpage, extra)
  npchild.val extra.substring(0,maxchar)
  #Update max pages on every affidavit page
  #priorpage.after newpage
  maxpgrenum()
  if(leftovers.length > 0)
    extendaff(leftovers, newpage)
  return

$(document).ready ->
  $(":input").focusout ->
    if($(this).attr('name')!="aff-f-1")
      ghost = $(":input[name="+$(this).attr('name')+"]")
      ghost.val $(this).val()
      ghost.css('font-size', $(this).css('font-size'))
    return
  $(":checkbox").click ->
    ghost = $(":checkbox[name="+$(this).attr('name')+"-g]")
    ghost.prop("checked", $(this).prop("checked"))
    return
  $(":checkbox[name^=cr]").click ->
    nametemp = $(this).attr('name')
    if(nametemp.indexOf("-c") >= 0)
      $(this).prop("checked",true)
      nametemp = $(this).attr('name')
      nametemp = nametemp.substring(0,3)
      $("[name="+nametemp+"]").prop('checked', false)
      return
    else
      #no this is disgusting, clean this mess up
      temp = $(this).attr('name')
      c2 = $("[name="+temp+"-c]")
      c2.prop("checked", false)
      $(this).prop("checked", true)
      return
  $(":input").keydown ->
    if(this.scrollHeight > $(this).outerHeight() || this.scrollWidth > $(this).outerWidth())
      fontsize = parseInt($(this).css("font-size"), 10)
      fontsize = pxtopt(fontsize)
      if(fontsize > lowerlim)
        $(this).css('font-size', (fontsize-1) + "pt")
      return
    else if(this.scrollHeight < $(this).outerHeight() || this.scrollWidth < $(this).outerWidth())
      fontsize = parseInt($(this).css("font-size"), 10)
      fontsize = pxtopt(fontsize)
      if(fontsize < Upperlim)
        $(this).css('font-size', (fontsize+1) + "pt")
      return
  $("[name='aff-f-1']").focusout ->
    editmode = false
    fs = pxtopt(parseInt($(this).css('font-size')))
    while(this.scrollHeight > $(this).outerHeight() && fs > lowerlim)
      $(this).css('font-size', fs+'pt')
      fs--
    if($(this).val().length > maxchar)
      ss = $(this).val().substring(maxchar)
      $(this).val $(this).val().substring(0,maxchar)
      startingpage = $("[name='aff-1']")
      #recursive call to handle the rest
      if(ss.length > 0)
        extendaff(ss, startingpage)
    return
  $("[name='aff-f-1']").focusin ->
    if(editmode == false)
      editmode = true
      affeditmode()
    return
  $(document).keydown ->
    if(event.which == 8 && !$(event.target).is("input, textarea"))
      e.preventDefault
  return
