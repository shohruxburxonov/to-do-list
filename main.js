let addMessage = document.querySelector('.message'),
    addButton = document.querySelector('.add'),
    todo = document.querySelector('.todo');

let toDoList = [];
if (localStorage.getItem('todo')) {
    toDoList = JSON.parse(localStorage.getItem('todo'))
    displayMessages();
}
addButton.addEventListener('click', function() {
    if (!addMessage.value) return;
    let newTodo = {
        todo: addMessage.value,
        checked: false,
        important: false
    };
    toDoList.push(newTodo);
    displayMessages()
    localStorage.setItem('todo', JSON.stringify(toDoList));
    addMessage.value = '';
})

function displayMessages() {
    let displayMessage = '';
    if (toDoList.length === 0) todo.innerHTML = '';
    toDoList.forEach(function(item, i) {
        displayMessage += `
<li>
<input type = 'checkbox' id = 'item_${i}' ${item.checked ? 'chacked' : ''}>
<label for ='item_${i}' class = "${item.important ? 'important': ''}" >${item.todo}</label>
</li> 
`;
        todo.innerHTML = displayMessage;
    })
}
todo.addEventListener('change', function(event) {
    let valueLabel = todo.querySelector('[for=' + event.target.getAttribute('id') + ']').innerHTML;

    toDoList.forEach(function(item) {
        if (item.todo === valueLabel) {
            item.checked = !item.checked;
            localStorage.setItem('todo', JSON.stringify(toDoList));

        }
    });
});

todo.addEventListener('contextmenu', function(event) {
    event.preventDefault();
    toDoList.forEach(function(item, i) {
        if (item.todo === event.target.innerHTML) {
            if (event.ctrlKey || event.metaKey) {
                toDoList.splice(i, 1);

            } else {

                item.important = !item.important;
            }
            displayMessages()
            localStorage.setItem('todo', JSON.stringify(toDoList));

        }
    })
})