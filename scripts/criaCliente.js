import {setLocalStorage} from "./service.js";
// import {criaCelulas} from "./loadTabela.js";

let nome = document.getElementById('inputNome');

let nascimento = document.getElementById('inputNascimento');

let telefone = document.getElementById('inputTelefone');

let erro = document.getElementById('div-erro');

class Cliente {
	constructor(a, b, c) {
		this.nome = a;
		this.nascimento = b;
		this.telefone = c;
        this.saldo = 0;
	}

}

function criaCliente(event) {
	event.preventDefault();

    erro.innerHTML = "";
	
	nome = document.getElementById('inputNome');
	nascimento = document.getElementById('inputNascimento');
	telefone = document.getElementById('inputTelefone');

	validaDados();

    if (nomeEhValido && nascimentoEhValido && telefoneEhValido) {
        let newCliente = new Cliente(nome.value, nascimento.value, telefone.value);
        setLocalStorage(newCliente);
        // console.log(newCliente);
        window.location.href = "./index5.html"
    }
	
}

let nomeEhValido;
let nascimentoEhValido;
let telefoneEhValido;

function validaDados() {

    nomeEhValido = false;
    nascimentoEhValido = false;
    telefoneEhValido = false;

    if(nome.value != "") {
        nomeEhValido = true;
    } else {
        msgErro ("Preencha o nome!");
    }

    if (nascimento.value != "") {
        nascimentoEhValido = true;
    } else {
        msgErro('Preencha o nascimento!');
    }

    if (telefone.value != "") {
        telefoneEhValido = true;
    } else {
        msgErro('Preencha o telefone!');
    }
}

function msgErro(param) {
    erro.innerHTML += param + "<br>";
}


//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< ADICIONA EVENTO >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

if (window.location.href.indexOf("incluir") > 1) {

    let submit = document.getElementById('submit');
    submit.addEventListener('click', criaCliente);   
}

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< EXPORT >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

export {nome, nascimento, telefone, criaCliente}
 