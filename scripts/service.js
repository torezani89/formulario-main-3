// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< VARIÁVEIS GLOBAIS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

"use strict";

// let form = document.getElementById('form'); sem uso

let dadosLocalStorage = JSON.parse(localStorage.getItem('clientes') || '[]');


// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< LOAD TABELA >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>



// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< VALIDA DADOS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< MSG ERRO >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< DELETA CLIENTE >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< EDITA CLIENTE >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< LOCALSTORAGE >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>s

function setLocalStorage(x) {
	dadosLocalStorage = JSON.parse(localStorage.getItem('clientes') || '[]');
	dadosLocalStorage.push(x);
	ordenaDados(dadosLocalStorage);
	localStorage.setItem('clientes', JSON.stringify(dadosLocalStorage));
}

function ordenaDados(param) {
	param.sort(function (a,b) {
		let x = a.nome.toLowerCase();
		let y = b.nome.toLowerCase();
		if (x < y) {return -1;};
		if (x > y) {return 1;};
		return 0;
	});
}

function removeItem(index) {
	dadosLocalStorage = JSON.parse(localStorage.getItem('clientes') || '[]');
	console.log(dadosLocalStorage);
	dadosLocalStorage.splice(index,1);
	localStorage.setItem('clientes', JSON.stringify(dadosLocalStorage));
	console.log(dadosLocalStorage);
}

function pegaCliente(posicao) {
	dadosLocalStorage = JSON.parse(localStorage.getItem('clientes') || '[]');
	return dadosLocalStorage[posicao];
}

function atualizaLocalStorage(param) {
	ordenaDados(param);
	localStorage.setItem('clientes', JSON.stringify(param));
}

function salvaPosicao(posicao) {
	localStorage.setItem('posicao', JSON.stringify(posicao));
}

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< CHAMA EVENTOS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< EXPORT >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

export {dadosLocalStorage, setLocalStorage, removeItem, pegaCliente, atualizaLocalStorage, salvaPosicao}