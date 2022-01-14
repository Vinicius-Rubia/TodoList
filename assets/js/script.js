'use strict';

const getDB = () => JSON.parse(localStorage.getItem('todoList')) ?? [];
const setDB = (DB) => localStorage.setItem('todoList', JSON.stringify(DB));

const criarItem = (tarefa, status, indice) => {
    const item = document.createElement('label');
    item.classList.add('todo__item');
    item.innerHTML = `
        <input type="checkbox" ${status} data-indice=${indice}>
        <div>${tarefa}</div>
        <input type="button" value="X" data-indice=${indice}>
    `
    document.getElementById('todoList').appendChild(item);
}

const limparTarefas = () => {
    const todoList = document.getElementById('todoList');
    while(todoList.firstChild) {
        todoList.removeChild(todoList.lastChild);
    }
}

const atualizarTela = () => {
    limparTarefas();
    const DB = getDB();
    DB.forEach((item, indice) => criarItem(item.tarefa, item.status, indice));
}

const inserirItem = (evento) => {
    const tecla = evento.key;
    const texto = evento.target.value;
    if(tecla === 'Enter') {
        const DB = getDB();
        DB.push({'tarefa': texto, 'status': ''})
        setDB(DB);
        atualizarTela();
        evento.target.value = '';
    }
}

const removerItem = (indice) => {
    const DB = getDB();
    DB.splice(indice, 1);
    setDB(DB);
    atualizarTela();
}

const atualizarItem = (indice) => {
    const DB = getDB();
    DB[indice].status = DB[indice].status === '' ? 'checked' : '';
    setDB(DB);
    atualizarTela();
}

const clickItem = (evento) => {
    const elemento = evento.target;
    if(elemento.type === 'button') {
        const indice = elemento.dataset.indice;
        removerItem(indice);
    }else if(elemento.type === 'checkbox') {
        const indice = elemento.dataset.indice;
        atualizarItem(indice);
    }
}

document.getElementById('newItem').addEventListener('keypress', inserirItem);
document.getElementById('todoList').addEventListener('click', clickItem);

atualizarTela();
