$(function() {
  function setCookie(name, value, days) { /* Define a função para definir um cookie */
    var expires = '';
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days*24*60*60*1000)); /* Define o tempo de expiração do cookie */
      expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + encodeURIComponent(value) + expires + '; path=/';
  }
  function getCookie(name) { /* Define a função para obter o valor do cookie */
    var nameEQ = name + '=';
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length); /* Remove espaços em branco iniciais */
      if (c.indexOf(nameEQ) == 0) return decodeURIComponent(c.substring(nameEQ.length,c.length)); /* Retorna o valor do cookie */
    }
    return null;
  }
  function saveTodos() { /* Salva a lista TO DOs em cookie */
    var todos = [];
    $('#ft_list .todo').each(function() {
      todos.push($(this).text());
    });
    setCookie('todos', JSON.stringify(todos), 365);
  }
  function loadTodos() { /* Faz load da lista de TO DOs guardada em cookie se existir*/
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
  function addTodo(text, save=true) { /* Adiciona um novo TO DO à lista */
    var $div = $('<div class="todo"></div>').text(text);
    $div.on('click', function() {
      if (confirm('Remove this TO DO?')) { /* Pergunta ao usuário se deseja remover o TO DO */
        $div.remove(); /* Remove o TO DO da lista */
        saveTodos();
      }
    });
    $('#ft_list').prepend($div);
    if (save) saveTodos(); 
  }
  $('#new-btn').on('click', function() { /* Define o evento de clique do botão para adicionar um novo TO DO */
    var txt = prompt('Enter a new TO DO:');
    if (txt && txt.trim() !== '') {
      addTodo(txt.trim());
    }
  });
  loadTodos();
});
