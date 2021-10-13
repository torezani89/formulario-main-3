// import {atualizaLocalStorage, dadosLocalStorage} from "./service.js";
import {verificaSaque, podeSacar, clienteIndex, sacaValor} from "./sacar.js";
import {verificaDeposito, achouDestinatario, destinatariosIndex, depositaValor} from "./depositar.js";

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
    }

}

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< MENSAGENS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

let botaoTranf = document.querySelector('#transferir');

botaoTranf.addEventListener('click', transferir);


