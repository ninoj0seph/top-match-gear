var jsbin = {
  "root": "http://jsbin.com",
  "shareRoot": "http://jsbin.com",
  "runner": "http://null.jsbin.com/runner",
  "static": "http://static.jsbin.com",
  "version": "3.36.11",
};
jsbin.user = {"name":"mnoster","bincount":25,"settings":{"panels":["html","javascript","live"],"editor":{},"font":14,"addons":{"closebrackets":true,"highlight":false,"vim":false,"emacs":false,"trailingspace":false,"fold":false,"sublime":false,"tern":false,"activeline":true,"matchbrackets":false},"includejs":true,"gui":{"toppanel":false}}};

if (jsbin.user && jsbin.user.name) {
  $('.loggedout').hide();
  var menu = $('.loggedin').show();
  var html = $('#profile-template').text();
  var $html = $(html.replace(/({.*?})/g, function (all, match) {
    var key = match.slice(1, -1).trim(); // ditch the wrappers
    return jsbin.user[key] || '';
  }));
  if (jsbin.user.pro) {
    document.documentElement.className += ' pro';
    $html.find('.gopro').remove();
  } else {
    $html.find('.pro').remove();
  }
  var $menu = menu.append($html);
} else {
  $('.loggedout').show();
}
