// Generated by CoffeeScript 1.6.1
var Upperlim, affpgcount, extendaff, keydownhandler, lowerlim, maxchar, maxpgrenum, pxtopt, remaffpage;

lowerlim = 9;

Upperlim = 12;

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

keydownhandler = function(event) {
  var rmpg;
  if ((event.which = 8)) {
    if (($(':focus').length = 0)) {
      rmpg = $(':focus').parent().parent().parent().parent();
      remaffpage(rmpg);
    }
  }
};

remaffpage = function(page) {
  return page.remove();
};

extendaff = function(extra, priorpage) {
  var leftovers, newpage, npchild, temp;
  newpage = priorpage.clone(true);
  affpgcount++;
  newpage.attr("name", "aff-1");
  newpage.children().children().children().children().children().children("[name='pn']").val(affpgcount);
  temp = newpage.children().children().children().children().children().children().children("[name='paffi']");
  temp.attr('name', temp.attr('name'));
  temp = newpage.children().children().children().children().children().children().children("[name='affsig']");
  temp.attr('name', temp.attr('name'));
  temp = newpage.children().children().children().children().children().children("[name='date']");
  temp.attr('name', temp.attr('name'));
  temp = newpage.children().children().children().children().children().children("[name='affsig2']");
  temp.attr('name', temp.attr('name'));
  temp = newpage.children().children().children().children().children("[name='tcourt']");
  temp.attr('name', temp.attr('name'));
  npchild = newpage.children().children().children("[name='aff-f-1']");
  npchild.attr('name', "aff-f-1");
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
    if ($(this).attr('name') !== "aff-f-1") {
      ghost = $(":input[name=" + $(this).attr('name') + "]");
      ghost.val($(this).val());
      ghost.css('font-size', $(this).css('font-size'));
    }
  });
  $(":checkbox").click(function() {
    var ghost;
    ghost = $(":checkbox[name=" + $(this).attr('name') + "-g]");
    ghost.prop("checked", $(this).prop("checked"));
  });
  $(":checkbox[name^=cr]").click(function() {
    var c2, nametemp, temp;
    nametemp = $(this).attr('name');
    if (nametemp.indexOf("-c") >= 0) {
      $(this).prop("checked", true);
      nametemp = $(this).attr('name');
      nametemp = nametemp.substring(0, 3);
      $("[name=" + nametemp + "]").prop('checked', false);
    } else {
      temp = $(this).attr('name');
      c2 = $("[name=" + temp + "-c]");
      c2.prop("checked", false);
      $(this).prop("checked", true);
    }
  });
  $(":input").keydown(function() {
    var fontsize;
    if (this.scrollHeight > $(this).outerHeight() || this.scrollWidth > $(this).outerWidth()) {
      fontsize = parseInt($(this).css("font-size"), 10);
      fontsize = pxtopt(fontsize);
      if (fontsize > lowerlim) {
        $(this).css('font-size', (fontsize - 1) + "pt");
      }
    } else if (this.scrollHeight < $(this).outerHeight() || this.scrollWidth < $(this).outerWidth()) {
      fontsize = parseInt($(this).css("font-size"), 10);
      fontsize = pxtopt(fontsize);
      if (fontsize < Upperlim) {
        $(this).css('font-size', (fontsize + 1) + "pt");
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
  $("[name='aff-f-1']").keydown(function() {
    keydownhandler(event);
  });
});
