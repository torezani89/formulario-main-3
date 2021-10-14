import {atualizaLocalStorage} from "./service.js";


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

    let valor = document.getElementById('valorDeposito').value
    valor = valor.replace(/\./g, '')
    valor = valor.replace(',', '.')
    valor = parseFloat(valor)
    let selected = document.querySelectorAll('#destinatario option:checked')
    let destinatarios = Array.from(selected).map(el => el.value);
    let divDep = document.querySelector('.div-deposito');
    let operacao = "depositado";

    divDep.innerHTML = "";

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
        destinatario.saldo = parseFloat(destinatario.saldo) + parseFloat(valor)        
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

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< MENSAGENS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

function mensagemSucesso (valor, divMsg, operacao, arrayDestinatarios) {
    divMsg.innerHTML = `<p class='p-sucesso'>${"R$" + valor.toFixed(2) + " " + operacao} com sucesso
                            para ${arrayDestinatarios} </p>`;
    divMsg.style.display = 'inline-block';
}

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< EVENTOS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

if (window.location.href.indexOf('depositar') > 1) {

    destinatariosDeposito();

    let botaoDepositar = document.querySelector('#depositar');
    botaoDepositar.addEventListener('click', preparaDeposito);
}

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< FORMATA INPUT >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

function formataValor(i) {
	var v = i.value.replace(/\D/g,'');
	v = (v/100).toFixed(2) + '';
	v = v.replace(".", ",");
	v = v.replace(/(\d)(\d{3})(\d{3}),/g, "$1.$2.$3,");
	v = v.replace(/(\d)(\d{3}),/g, "$1.$2,");
	i.value = v;
}

// document.querySelector('#valorDeposito').addEventListener('keyup', function () {
//     var v = this.value.replace(/\D/g,'');
//     v = (v/100).toFixed(2) + '';
//     v = v.replace(".", ",");
//     v = v.replace(/(\d)(\d{3})(\d{3}),/g, "$1.$2.$3,");
//     v = v.replace(/(\d)(\d{3}),/g, "$1.$2,");
//     this.value = v;
// })

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< EXPORT >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

export {verificaDeposito, achouDestinatario, destinatariosIndex, depositaValor}