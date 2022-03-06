window.onload = () => {
    const addNewItemButton = document.getElementById('addNewItemButton');
    addNewItemButton.addEventListener('click', onClickAddNewItemButton);
}

const onClickAddNewItemButton = (e) => {
    const newItemInput = document.getElementById('newItemInput');
    addNewItem('todoList', newItemInput.value);
    newItemInput.value = '';
}

const addNewItem = (listType, content) => {
    const newItemElement = document.createElement('div');
    newItemElement.innerHTML = content;

    const list = document.getElementById(listType);
    list.appendChild(newItemElement);
}
