// Generated by CoffeeScript 1.6.1
var affpgcount, extendaff, lowerlim, maxchar, maxpgrenum, pxtopt;

lowerlim = 9;

maxchar = 4600;

affpgcount = 1;

pxtopt = function(pixel) {
  return Math.round(pixel / ((.35146 / 25.4) * 96));
};

maxpgrenum = function() {
  $("[name='mpage']").each(function() {
    return $(this).val(affpgcount);
  });
};

extendaff = function(extra, priorpage) {
  var leftovers, newpage, npchild, string, temp;
  newpage = priorpage.clone();
  affpgcount++;
  newpage.attr("name", "aff-" + affpgcount);
  newpage.children().children().children().children().children().children("[name='pn']").val(affpgcount);
  temp = newpage.children().children().children().children().children().children().children("[name='paffi']");
  temp.attr('name', temp.attr('name') + "-g");
  temp = newpage.children().children().children().children().children().children().children("[name='affsig']");
  temp.attr('name', temp.attr('name') + "-g");
  temp = newpage.children().children().children().children().children().children("[name='date']");
  temp.attr('name', temp.attr('name') + "-g");
  temp = newpage.children().children().children().children().children().children("[name='affsig2']");
  temp.attr('name', temp.attr('name') + "-g");
  temp = newpage.children().children().children().children().children("[name='tcourt']");
  temp.attr('name', temp.attr('name') + "-g");
  string = "aff-f-" + (affpgcount - 1);
  npchild = newpage.children().children().children("[name='" + string + "']");
  npchild.attr('name', "aff-f-" + affpgcount);
  leftovers = extra.substring(maxchar);
  npchild.val(extra.substring(0, maxchar));
  priorpage.after(newpage);
  maxpgrenum();
  if (leftovers.length > 0) {
    extendaff(leftovers, newpage);
  }
};

$(document).ready(function() {
  $(":input").focusout(function() {
    var ghost;
    ghost = $(":input[name=" + $(this).attr('name') + "-g]");
    ghost.val($(this).val());
    ghost.css('font-size', $(this).css('font-size'));
  });
  $(":checkbox").click(function() {
    var ghost;
    ghost = $(":checkbox[name=" + $(this).attr('name') + "-g]");
    ghost.prop("checked", $(this).prop("checked"));
  });
  $(":input").keydown(function() {
    var fontsize;
    if (this.scrollHeight > $(this).outerHeight() || this.scrollWidth > $(this).outerWidth()) {
      fontsize = parseInt($(this).css("font-size"), 10);
      fontsize = pxtopt(fontsize);
      if (fontsize > lowerlim) {
        $(this).css('font-size', (fontsize - 1) + "pt");
      }
    }
  });
  $("[name='aff-f-1']").focusout(function() {
    var fs, ss, startingpage;
    fs = pxtopt(parseInt($(this).css('font-size')));
    while (this.scrollHeight > $(this).outerHeight() && fs > lowerlim) {
      $(this).css('font-size', fs + 'pt');
      fs--;
    }
    if ($(this).val().length > maxchar) {
      ss = $(this).val().substring(maxchar);
      $(this).val($(this).val().substring(0, maxchar));
      startingpage = $("[name='aff-1']");
      if (ss.length > 0) {
        extendaff(ss, startingpage);
      }
    }
  });
});
