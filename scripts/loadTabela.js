import {dadosLocalStorage} from "./service.js";
import {deletaCliente} from "./deletaCliente.js";
import {pegaPosicao, urlEdicao} from "./pegaPosicao.js";
// import {criaCliente} from "./criaCliente.js";

let tabela = document.getElementById('tbody');

let erro = document.getElementById('div-erro');

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< CRIA CELULAS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

function formatNumber(params) {
	const formatter = new Intl.NumberFormat('pt-BR', {
		style: 'currency',
		currency: 'BRL',
		minimumFractionDigits: 2,
	});
	
	return formatter.format(params);
}

function criaCelulas() {

	if (window.location.href.indexOf('index5') > -1) {
		
		tabela.innerHTML = "";
	
		dadosLocalStorage.forEach(element => {
			
			let celNome = document.createElement('td');
			celNome.innerHTML = element.nome;
			
			let celNascim = document.createElement('td');
			let data = new Date(element.nascimento);
			// celNascim.innerHTML = data.toLocaleDateString(); O dia fica com 1 a menos.
			celNascim.innerHTML = data.toLocaleDateString('pt-BR', {timeZone: 'UTC'});

			let celTel = document.createElement('td');
			celTel.classList.add('celTel');
			// celTel.style.textAlign = "center";
			if(element.hasOwnProperty("telefone2") && element.telefone2 != "") {
				celTel.innerHTML = element.telefone + "<br>" + element.telefone2;
				
			} else {
				celTel.innerHTML = element.telefone;
			}

			let celSaldo = document.createElement('td');
			celSaldo.innerHTML = formatNumber(element.saldo);
			
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
	// botaoDeleta.classList.add('opaco');
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
	// botaoEdita.classList.add('opaco');
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