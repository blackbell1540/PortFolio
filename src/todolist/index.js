window.onload = () => {
    const addNewItemButton = document.getElementById('addNewItemButton');
    addNewItemButton.addEventListener('click', onClickAddNewItemButton);
}

const onClickAddNewItemButton = (e) => {
    const newItemTypeSelect = document.getElementById('newItemTypeSelect');
    const newItemInput = document.getElementById('newItemInput');
    addNewItem(newItemTypeSelect.value, newItemInput.value);
    initNewItemInput();
}

const initNewItemInput = () => {
    const newItemTypeSelect = document.getElementById('newItemTypeSelect');
    const newItemInput = document.getElementById('newItemInput');

    newItemInput.value = '';
    newItemTypeSelect.value = 'todoList';
}

const addNewItem = (listType, content) => {
    const newItemElement = document.createElement('div');
    newItemElement.innerHTML = content;

    const list = document.getElementById(listType);
    list.appendChild(newItemElement);
}
