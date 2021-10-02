import {atualizaLocalStorage, dadosLocalStorage} from "./service.js";

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< DEPOSITAR >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

let achouDestinatario;
let destinatariosIndex;
function verificaDeposito(destinatarios, valor, divDep) {

    if (isNaN(valor)) {
        let conteudo = `<p class='p-erro'>O valor digitado não é válido </p>`;
        divDep.innerHTML = conteudo;
        divDep.style.display = 'inline-block';
        return;
    }
    
    achouDestinatario = false;
    destinatariosIndex = [];

    let dadosLocalStorage = JSON.parse(localStorage.getItem('clientes') || '[]');
    
    for (let i = 0; i < destinatarios.length; i++) {

        dadosLocalStorage.forEach(element => {
            if (element.nome == destinatarios[i]) {
                achouDestinatario = true;
                destinatariosIndex.push(dadosLocalStorage.indexOf(element));
                return;
            }
        });
        
    }

    // Usada no caso de transferência em que só há 1 beneficiário (input text)
    if (achouDestinatario == false) {
        let conteudo = `<p class='p-erro'>${destinatarios.value || "O destinatário"} não foi localizado </p>`;
        divDep.innerHTML = conteudo;
        divDep.style.display = 'inline-block';
    }

    console.log(destinatariosIndex);

}

function preparaDeposito(event) {

    event.preventDefault();

    let valor = parseFloat(document.getElementById('valorDeposito').value);
    let selected = document.querySelectorAll('#destinatario option:checked')
    let destinatarios = Array.from(selected).map(el => el.value);
    let divDep = document.querySelector('.div-deposito');
    let operacao = "depositado";

    verificaDeposito(destinatarios, valor, divDep);
    
    if (achouDestinatario == true) {
        depositaValor(valor, destinatariosIndex, divDep, operacao);
    }

}

function depositaValor(valor, destinatariosIndex, divDep, operacao) {

    let dadosLocalStorage = JSON.parse(localStorage.getItem('clientes') || '[]');
    let arrayDestinatarios = [];

    for (let i = 0; i < destinatariosIndex.length; i++) {

        let indice = destinatariosIndex[i];
        let destinatario = dadosLocalStorage[indice];
        // console.log(dadosLocalStorage[indice].saldo);
        destinatario.saldo = (parseFloat(destinatario.saldo) + valor).toFixed(2);
        arrayDestinatarios.push(destinatario.nome);

    }

    mensagemSucesso(valor, divDep, operacao, arrayDestinatarios);
    console.log(dadosLocalStorage);
    atualizaLocalStorage(dadosLocalStorage);

}

function destinatariosDeposito() {
    let dadosLocalStorage = JSON.parse(localStorage.getItem('clientes') || '[]');
    let destinatario = document.querySelector('#destinatario');
    dadosLocalStorage.forEach(element => {
        let opt = document.createElement('option');
        opt.value = element.nome;
        opt.innerHTML = element.nome;
        destinatario.appendChild(opt);

    })
}

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< SACAR >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

let podeSacar; 
let clienteIndex;
function verificaSaque (valor, cliente, divMsg) {

    let dadosLocalStorage = JSON.parse(localStorage.getItem('clientes') || '[]');
    let clienteExiste = false;
    // podeSacar = false;
    
    if (isNaN(valor)) {
        let conteudo = `<p class='p-erro'>O valor digitado não é válido</p>`;
        divMsg.innerHTML = conteudo;
        divMsg.style.display = 'inline-block';
        return;
    }

    dadosLocalStorage.forEach(element => {
        if (element.nome == cliente) {

            clienteExiste = true;

            if (element.saldo >= valor) {
                clienteIndex = dadosLocalStorage.indexOf(element);
                return podeSacar = true;
            } else {
                let conteudo = `<p class='p-erro'>${element.nome} não possui saldo suficiente</p>`;
                divMsg.innerHTML = conteudo;
                divMsg.style.display = 'inline-block';
                return podeSacar = false;
            }
        }
    })

    if (clienteExiste == false) {
        let conteudo = `<p class='p-erro'>${cliente || "O cliente"} não foi localizado</p>`;
        divMsg.innerHTML = conteudo;
        divMsg.style.display = 'inline-block';
        return podeSacar = false;
    }
    
}  

function preparaSaque(event) {
    event.preventDefault();

    let valor = parseFloat(document.getElementById('valorSaque').value);
    let cliente = document.querySelector('#cliente').value;
    let divSaque = document.querySelector('.div-saque');

    verificaSaque(valor, cliente, divSaque);
    console.log(podeSacar);

    if (podeSacar == true) {
        sacaValor(valor, clienteIndex, divSaque);
        // console.log(clienteIndex);
    }


}

function sacaValor(valor, clienteIndex, divMsg) {

    let dadosLocalStorage = JSON.parse(localStorage.getItem('clientes') || '[]');
    let cliente = dadosLocalStorage[clienteIndex];
    cliente.saldo = (parseFloat(cliente.saldo) - valor).toFixed(2);
    console.log(cliente);
    divMsg.innerHTML = `<p class='p-sucesso'>R$${valor.toFixed(2)} sacado com sucesso de ${cliente.nome}!<p>`;
    divMsg.style.display = 'inline-block';
    atualizaLocalStorage(dadosLocalStorage);
    console.log(dadosLocalStorage);
}

function clientesSaque() {
    let dadosLocalStorage = JSON.parse(localStorage.getItem('clientes') || '[]');
    let clientes = document.querySelector('#cliente-options');
    dadosLocalStorage.forEach(element => {
        let opt = document.createElement('option');
        opt.value = element.nome;
        // opt.innerHTML = element.nome;
        clientes.appendChild(opt);

    })
}

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< TRANSFERIR >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

function transferir(event) {
    event.preventDefault();

    let valor = parseFloat(document.querySelector('#valorTransf').value);
    let cliente = document.querySelector('#sacado').value;
    let divTransf = document.querySelector('.div-transf');
    let beneficiario = [document.querySelector('#beneficiario').value];
    let operacao = "transferido"

    verificaSaque(valor, cliente, divTransf);
    verificaDeposito(beneficiario, valor, divTransf);

    if (podeSacar == true && achouDestinatario == true) {
        sacaValor(valor, clienteIndex, divTransf, operacao);
        depositaValor(valor, destinatariosIndex, divTransf, operacao);
        console.log(dadosLocalStorage);
    }

}

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< MENSAGENS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

function mensagemSucesso (valor, divMsg, operacao, arrayDestinatarios) {
    divMsg.innerHTML = `<p class='p-sucesso'>${"R$" + valor.toFixed(2) + " " + operacao} com sucesso
    para ${arrayDestinatarios} </p>`;
    divMsg.style.display = 'inline-block';
}

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< EXPORT >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

export {preparaSaque, preparaDeposito, transferir, destinatariosDeposito, clientesSaque}

