import Style from './index.css';

class List {
    listType = '';
    items = [];

    constructor(listType) {
        this.listType = listType;
    }

    addItem = (content) => {
        const newItem = {
            id: new Date().getTime(),
            content,
            listType: this.listType
        }

        this.items.push(newItem);
        this.renderItem(newItem);
    }

    removeItem = (id) => {
        const willDeleteItemIndex = this.items.findIndex(item => item.id === Number(id));
        if (willDeleteItemIndex === -1) {
            console.error('삭제하려고 하는 대상을 못찾았습니다.');
            return ;
        }

        // ref: https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
        this.items.splice(willDeleteItemIndex, 1);

        this.clearItems();
        this.renderItems();
    }

    renderItem = ({id, content}) => {
        const newItemElement = document.createElement('div');
        newItemElement.innerHTML = content;
        newItemElement.id = id;
        newItemElement.className = 'list-item';
        newItemElement.listType = this.listType;
    
        const deleteButton = document.createElement('span');
        deleteButton.innerHTML = 'DELETE';
        deleteButton.className = 'delete-button';
    
        newItemElement.appendChild(deleteButton);
    
        const list = document.getElementById(this.listType);
        list.appendChild(newItemElement);
    }

    renderItems = () => {
        this.items.forEach(item => {
            this.renderItem(item);
        })
    }

    clearItems = () => {
        const list = document.getElementById(this.listType);
        while(list.firstChild) {
            list.removeChild(list.firstChild);
        }
    }

    modifyItem = () => {}
}

document.getElementsByClassName('list-container')[0].addEventListener('click', (e) => {
    const target = e.target;

    switch(target.className) {
        case 'delete-button': 
            const itemNode = target.parentNode;
            const listNode = itemNode.parentNode;
            
            const list = getListFromType(listNode.id);
            list.removeItem(itemNode.id);
            return;
    }
});

document.getElementById('addNewItemButton').addEventListener('click', (e) => {
    const newItemTypeSelect = document.getElementById('newItemTypeSelect');
    const newItemInput = document.getElementById('newItemInput');

    const list = getListFromType(newItemTypeSelect.value);
    list.addItem(newItemInput.value);
    initNewItemInput();
});

const todoList = new List('todoList');
const doingList = new List('doingList');
const doneList = new List('doneList');

const initNewItemInput = () => {
    const newItemTypeSelect = document.getElementById('newItemTypeSelect');
    const newItemInput = document.getElementById('newItemInput');

    newItemInput.value = '';
    newItemTypeSelect.value = 'todoList';
}

const getListFromType = (listType) => {
    switch (listType) {
        case 'todoList':
            return todoList;
        case 'doingList':
            return doingList;
        case 'doneList':
            return doneList;    
    }
}

