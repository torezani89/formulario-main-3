import {dadosLocalStorage} from "./service.js";
import {deletaCliente} from "./deletaCliente.js";
import {pegaPosicao, urlEdicao} from "./pegaPosicao.js";
// import {criaCliente} from "./criaCliente.js";

let tabela = document.getElementById('tbody');

let erro = document.getElementById('div-erro');

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< CRIA CELULAS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

function criaCelulas() {

	if (window.location.href.indexOf('index5') > -1) {
		
		tabela.innerHTML = "";
	
		dadosLocalStorage.forEach(element => {
			
			let celNome = document.createElement('td');
			celNome.innerHTML = element.nome;
			
			let celNascim = document.createElement('td');
			celNascim.innerHTML = element.nascimento;

			let celTel = document.createElement('td');
			celTel.classList.add('celTel');
			// celTel.style.textAlign = "center";
			if(element.hasOwnProperty("telefone2") && element.telefone2 != "") {
				celTel.innerHTML = element.telefone + "<br>" + element.telefone2;
				
			} else {
				celTel.innerHTML = element.telefone;
			}

			let celSaldo = document.createElement('td');
			celSaldo.innerHTML = "R$ " + element.saldo;
			
			let celButton = document.createElement('td');
			celButton.classList.add('celButton');
			celButton.appendChild(criaBotaoEdita());
			celButton.appendChild(criaBotaoDeleta());
			
			let criaLinha = document.createElement('tr');
			criaLinha.addEventListener('click', pegaPosicao);
			criaLinha.appendChild(celNome);
			criaLinha.appendChild(celNascim);
			criaLinha.appendChild(celTel);
			criaLinha.appendChild(celSaldo);
			criaLinha.appendChild(celButton);
			
			tabela.appendChild(criaLinha);
			
		} );
		
		escutaBotaoDeleta ();
	
		escutaBotaoEdita();
	
	}
	
	
}

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< BOTAO DELETA >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

function criaBotaoDeleta () {
	let botaoDeleta = document.createElement('button');
	botaoDeleta.classList.add('btDeleta');
	botaoDeleta.classList.add('opaco');
	botaoDeleta.title = "Deletar";	
	botaoDeleta.setAttribute('disabled', 'disabled');
	// botaoDeleta.innerHTML = 'X';
	botaoDeleta.setAttribute('onclick', 'deletaCliente(event)');
	return botaoDeleta;
}

function escutaBotaoDeleta () {
	let botoesDeleta = document.querySelectorAll('.btDeleta');
	for (let i = 0; i < botoesDeleta.length; i++) {
		botoesDeleta[i].addEventListener('click', deletaCliente);
	}
}

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< BOTAO EDITA >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

function criaBotaoEdita() {
	let botaoEdita = document.createElement('button');
	botaoEdita.classList.add('btEdita');
	botaoEdita.classList.add('opaco');
	botaoEdita.title = "Editar";
	botaoEdita.setAttribute('disabled', 'disabled');
	// botaoEdita.setAttribute('onclick', 'editaCliente(event.target)')
	return botaoEdita;
}

function escutaBotaoEdita () {
	let botoesEdita = document.querySelectorAll('.btEdita');
	for (let i = 0; i < botoesEdita.length; i++) {
		botoesEdita[i].addEventListener('click', urlEdicao);
	}
}

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< LOAD TABELA >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< EXPORT >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

export {criaCelulas}