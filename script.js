'use strict';
console.log('oi mundo cão!');


const getBanco = () => JSON.parse(localStorage.getItem ('todoList')) ?? [];
const setBanco = (banco) => localStorage.setItem ('todoList', JSON.stringify(banco));
const banco = getBanco();


const criarItem = (tarefa, status, indice) => { 
    const item = document.createElement('label');
    item.classList.add('todo_item');
    item.innerHTML =`
        <input type="checkbox" ${status} data-indice=${indice}>
        <div>${tarefa}</div>
        <input type="button" value="x" data-indice=${indice}></input>
    `

    document.getElementById('todoList').appendChild(item); 
}

const limparTarefas = () => {
    const todoList = document.getElementById('todoList');
    while (todoList.firstChild) {
        todoList.removeChild(todoList.lastChild);
    }
}


const renderScreen = () => {
    limparTarefas();
    banco.forEach ((item, indice) => criarItem (item.tarefa, item.status, indice));
}


const addItem = (evento) => {
    const tecla = evento.key;
    const text = evento.target.value;
    if(tecla === 'Enter'){
        banco.push ({'tarefa': text, 'status': ''});
        setBanco(banco);
        renderScreen();
        //limpar caixa de texto
        evento.target.value = '';
    }
}

const removerItem = (indice) => {
    //recortar ou modificar uma array
    banco.splice (indice, 1);
    setBanco(banco);
    renderScreen();
}

const atualizarItem = (indice) => {
    banco[indice].status = banco[indice].status === '' ? 'checked' : '';
    //se o status estiver em branco então marcar como checked, : do cobntrario deixar nulo
}

const clickItem = (evento) => {
    const elemento = evento.target;
    if (elemento.type === 'button'){
        //dataset é a propriedade do elemento para pegar o valor
        const indice = elemento.dataset.indice;
        removerItem(indice);
    }else if (elemento.type === 'checkbox'){
        const indice = elemento.dataset.indice;
        atualizarItem(indice);
        setBanco(banco);

    }
    
}

document.getElementById('newItem').addEventListener('keypress', addItem);
document.getElementById('todoList').addEventListener('click', clickItem);

renderScreen();