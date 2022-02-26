import {atualizaLocalStorage} from "./service.js"
import { formatNumber } from "./loadTabela.js"

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

    let valor = document.getElementById('valorSaque').value
    valor = valor.replace(/\./g, '')
    valor = valor.replace(',', '.')
    valor = parseFloat(valor)
    let cliente = document.querySelector('#cliente').value
    let divSaque = document.querySelector('.div-saque')

    console.log(valor)
    console.log(typeof(valor))
    verificaSaque(valor, cliente, divSaque)
    console.log(podeSacar)

    if (podeSacar == true) {
        sacaValor(valor, clienteIndex, divSaque)
        // console.log(clienteIndex);
    }


}

function sacaValor(valor, clienteIndex, divMsg) {

    let dadosLocalStorage = JSON.parse(localStorage.getItem('clientes') || '[]');
    let cliente = dadosLocalStorage[clienteIndex];
    cliente.saldo = parseFloat(cliente.saldo) - valor;
    divMsg.innerHTML = `<p class='p-sucesso'>${formatNumber(valor)} sacado com sucesso de ${cliente.nome}!<p>`;
    divMsg.style.display = 'inline-block';
    console.log(typeof(dadosLocalStorage[clienteIndex].saldo))
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

if (window.location.href.indexOf("sacar") > 1) {
    clientesSaque();   

    let botaoSacar = document.querySelector('#sacar');
    botaoSacar.addEventListener('click', preparaSaque);

    //Formatar valor input
    document.querySelector('#valorSaque').addEventListener('keyup', function () {
        var v = this.value.replace(/\D/g,'');
        v = (v/100).toFixed(2) + '';
        v = v.replace(".", ",");
        v = v.replace(/(\d)(\d{3})(\d{3}),/g, "$1.$2.$3,");
        v = v.replace(/(\d)(\d{3}),/g, "$1.$2,");
        this.value = v;
    })
}


// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< EXPORT >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

export {verificaSaque, podeSacar, clienteIndex, sacaValor}