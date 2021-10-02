
    import {criaCelulas} from "./loadTabela.js";
    import {preparaDeposito, preparaSaque, transferir, destinatariosDeposito, 
        clientesSaque} from "./transacoes.js";

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< CARREGAR TABELA >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

criaCelulas();
clientesSaque();
destinatariosDeposito();    


// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< BOTOES TRANSACOES FINANCEIRAS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

let botaoDepositar = document.querySelector('#depositar');
let botaoSacar = document.querySelector('#sacar');
let botaoTranf = document.querySelector('#transferir');

botaoDepositar.addEventListener('click', preparaDeposito);

botaoSacar.addEventListener('click', preparaSaque);

botaoTranf.addEventListener('click', transferir);   
