// import {atualizaLocalStorage, dadosLocalStorage} from "./service.js";
import {verificaSaque, podeSacar, clienteIndex, sacaValor} from "./sacar.js";
import {verificaDeposito, achouDestinatario, destinatariosIndex, depositaValor} from "./depositar.js";

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< TRANSFERIR >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

function transferir(event) {
    event.preventDefault();

    let valor = document.querySelector('#valorTransf').value
    valor = valor.replace(/\./g, '')
    valor = valor.replace(',', '.')
    valor = parseFloat(valor)
    let cliente = document.querySelector('#sacado').value
    let divTransf = document.querySelector('.div-transf')
    let beneficiario = [document.querySelector('#beneficiario').value]
    let operacao = "transferido"

    verificaSaque(valor, cliente, divTransf)
    verificaDeposito(beneficiario, valor, divTransf)

    if (podeSacar == true && achouDestinatario == true) {
        sacaValor(valor, clienteIndex, divTransf, operacao);
        depositaValor(valor, destinatariosIndex, divTransf, operacao);
    }

}

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< FORMATA INPUT >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

document.querySelector('#valorTransf').addEventListener('keyup', function () {
    var v = this.value.replace(/\D/g,'');
    v = (v/100).toFixed(2) + '';
    v = v.replace(".", ",");
    v = v.replace(/(\d)(\d{3})(\d{3}),/g, "$1.$2.$3,");
    v = v.replace(/(\d)(\d{3}),/g, "$1.$2,");
    this.value = v;
})

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< MENSAGENS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

let botaoTransf = document.querySelector('#transferir');

botaoTransf.addEventListener('click', transferir);


