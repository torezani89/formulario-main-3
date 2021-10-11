import {salvaPosicao} from "./service.js";

function pegaPosicao(param) {

	// Desabilita cliente anterior.
	let tbody = document.querySelector("#tbody");
	let clientes = tbody.querySelectorAll("tr");
	let posicaoAnterior = JSON.parse(localStorage.getItem('posicao'));
	console.log(posicaoAnterior);
	console.log(clientes[posicaoAnterior]);
	clientes[posicaoAnterior].querySelector('.btEdita').disabled = true;
	clientes[posicaoAnterior].querySelector('.btDeleta').disabled = true;
	// clientes[posicaoAnterior].querySelector('.btEdita').classList.add('opaco');
	// clientes[posicaoAnterior].querySelector('.btDeleta').classList.add('opaco');
	clientes[posicaoAnterior].classList.remove('selecionado');

	// Habilita cliente clicado.
	let clienteClicado = param.target.closest('tr');
	clienteClicado.querySelector('.btEdita').disabled = false;
	clienteClicado.querySelector('.btDeleta').disabled = false;
	// clienteClicado.querySelector('.btEdita').classList.remove('opaco');
	// clienteClicado.querySelector('.btDeleta').classList.remove('opaco');
	clienteClicado.classList.add('selecionado');

	// Pega posicao do cliente clicado
	let posicao = Array.prototype.indexOf.call(clienteClicado.parentNode.children, clienteClicado);
	salvaPosicao(posicao);

}

function urlEdicao () {
	window.location.href = './edita.html';
	
}

export {urlEdicao, pegaPosicao}