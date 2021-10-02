import {dadosLocalStorage, atualizaLocalStorage, pegaCliente} from "./service.js";
import {nome, nascimento, telefone} from "./criaCliente.js";

const edita = document.getElementById('edita');

let telefone2 = document.querySelector('#inputTelefone2');

let posicao = JSON.parse(localStorage.getItem('posicao'));
let clienteClicado = pegaCliente(posicao);

function detalhaCliente () {
		nome.value = clienteClicado.nome;
		nascimento.value = clienteClicado.nascimento;
		telefone.value = clienteClicado.telefone;
		telefone2.value = clienteClicado.hasOwnProperty('telefone2') ? clienteClicado.telefone2 : "";
}

function salvaEdicao (event) {
	event.preventDefault();
	
	if (nome.value != clienteClicado.nome || nascimento.value != clienteClicado.nascimento ||
		telefone.value != clienteClicado.telefone || telefone2.value != "" ||
		telefone2.value != clienteClicado.telefone2) {

		clienteClicado.nome = nome.value;
		clienteClicado.nascimento = nascimento.value;
		clienteClicado.telefone = telefone.value;
		clienteClicado.telefone2 = telefone2.value;
		console.log(dadosLocalStorage);
		atualizaLocalStorage(dadosLocalStorage);
		window.location.href = '../index5.html';
	}
}

detalhaCliente();

edita.addEventListener('click', salvaEdicao);
