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
  document.querySelectorAll('#ft_list .todo').forEach(function(el) {
    todos.push(el.textContent);
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
  var div = document.createElement('div');
  div.className = 'todo';
  div.textContent = text;
  div.onclick = function() {
    if (confirm('Remove this TO DO?')) {
      div.remove();
      saveTodos();
    }
  };
  var list = document.getElementById('ft_list');
  list.insertBefore(div, list.firstChild);
  if (save) saveTodos();
}
document.getElementById('new-btn').onclick = function() {
  var txt = prompt('Enter a new TO DO:');
  if (txt && txt.trim() !== '') {
    addTodo(txt.trim());
  }
};
loadTodos();
