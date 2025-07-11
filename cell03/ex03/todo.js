function setCookie(name, value, days) { /* Define a função para definir um cookie */
  var expires = '';
  if (days) { /* Define o tempo de expiração do cookie */
    var date = new Date();
    date.setTime(date.getTime() + (days*24*60*60*1000));
    expires = '; expires=' + date.toUTCString();
  }
  document.cookie = name + '=' + encodeURIComponent(value) + expires + '; path=/';
}
function getCookie(name) { /* Define a função para obter o valor do cookie */
  var nameEQ = name + '=';
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) == 0) return decodeURIComponent(c.substring(nameEQ.length,c.length));
  }
  return null;
}
function saveTodos() { /* Salva a lista  TO DOs no cookie */
  var todos = [];
  document.querySelectorAll('#ft_list .todo').forEach(function(el) {
    todos.push(el.textContent);
  });
  setCookie('todos', JSON.stringify(todos), 365);
}
function loadTodos() { /* Carrega a lista de TO DOs do cookie */
  var data = getCookie('todos');
  if (data) {
    try {
      var todos = JSON.parse(data);
      todos.reverse().forEach(function(txt) { /* Adiciona cada TO DO à lista */
        addTodo(txt, false);
      });
    } catch(e) {}
  }
}
function addTodo(text, save=true) { /* Adiciona um novo TO DO à lista */
  var div = document.createElement('div');
  div.className = 'todo';
  div.textContent = text;
  div.onclick = function() {
    if (confirm('Remove this TO DO?')) { /* Pergunta ao usuário se deseja remover o TO DO */
      div.remove();
      saveTodos();
    }
  };
  var list = document.getElementById('ft_list'); /* Obtém a lista de TO DOs */
  list.insertBefore(div, list.firstChild);
  if (save) saveTodos();
}
document.getElementById('new-btn').onclick = function() { /* Define o evento de clique do botão para adicionar um novo TO DO */
  var txt = prompt('Enter a new TO DO:');
  if (txt && txt.trim() !== '') {
    addTodo(txt.trim());
  }
};
loadTodos();
