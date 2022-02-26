
    import {criaCelulas} from "./loadTabela.js";
    // import {preparaDeposito, preparaSaque, transferir, destinatariosDeposito, 
    //     clientesSaque} from "./transacoes.js";
    import {sortTable} from "./ordenaTabela.js";
    // import {criaCliente} from "./criaCliente.js"

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< CARREGAR TABELA >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

criaCelulas();
// clientesSaque();
// destinatariosDeposito();    


// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< BOTOES TRANSACOES FINANCEIRAS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// let botaoDepositar = document.querySelector('#depositar');
// let botaoSacar = document.querySelector('#sacar');
// let botaoTranf = document.querySelector('#transferir');

// botaoDepositar.addEventListener('click', preparaDeposito);

// botaoSacar.addEventListener('click', preparaSaque);

// botaoTranf.addEventListener('click', transferir); 

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< EVENTOS ORDENAR TABELA >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

let myTable = document.querySelector('#tbody');
let thNome = document.querySelector('#th-nome');
let thSaldo = document.querySelector('#th-saldo');

let ord = false;

thNome.addEventListener('dblclick', function () {
  
  thSaldo.className = "";
  thNome.className = "";

  if (!ord) {
    sortTable(myTable, 'asc', 0);
    thNome.classList.add("ascendente");
    ord = true;
  } else {
    sortTable(myTable, 'desc', 0);
    thNome.classList.add("descendente");
    ord = false;
  }

})

thSaldo.addEventListener('dblclick', function () {

  thNome.className = "";
  thSaldo.className = "";

  if (!ord) {
    sortTable(myTable, 'asc', 3);
    thSaldo.classList.add('ascendente');
    ord = true;
  } else {
    sortTable(myTable, 'desc', 3);
    thSaldo.classList.add('descendente');
    ord = false;
  }

})


// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< EVENTO BOTAO INCLUIR CLIENTE >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
