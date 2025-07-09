$(function() {
  function setCookie(name, value, days) {
    var expires = '';
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days*24*60*60*1000));
      expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + encodeURIComponent(value) + expires + '; path=/';
  }
  function getCookie(name) {
    var nameEQ = name + '=';
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return decodeURIComponent(c.substring(nameEQ.length,c.length));
    }
    return null;
  }
  function saveTodos() {
    var todos = [];
    $('#ft_list .todo').each(function() {
      todos.push($(this).text());
    });
    setCookie('todos', JSON.stringify(todos), 365);
  }
  function loadTodos() {
    var data = getCookie('todos');
    if (data) {
      try {
        var todos = JSON.parse(data);
        todos.reverse().forEach(function(txt) {
          addTodo(txt, false);
        });
      } catch(e) {}
    }
  }
  function addTodo(text, save=true) {
    var $div = $('<div class="todo"></div>').text(text);
    $div.on('click', function() {
      if (confirm('Remove this TO DO?')) {
        $div.remove();
        saveTodos();
      }
    });
    $('#ft_list').prepend($div);
    if (save) saveTodos();
  }
  $('#new-btn').on('click', function() {
    var txt = prompt('Enter a new TO DO:');
    if (txt && txt.trim() !== '') {
      addTodo(txt.trim());
    }
  });
  loadTodos();
});
