import { removeItem } from "./service.js";
import {criaCelulas} from "./loadTabela.js";


function deletaCliente(param) {
	let linhaClicada = param.target.closest('tr');
	console.log(linhaClicada.parentNode.children);
	// let arrayLinhas = linhaClicada.parentNode.children;
	// let index = arrayLinhas.indexOf(linhaClicada); não funciona. não é uma função.
	// Tem que usar o indexOf através do método call(), pois arrayLinhas não é um objeto do tipo array, mas apenas semelhante.
	let index = Array.prototype.indexOf.call(linhaClicada.parentNode.children, linhaClicada);
	console.log(index);
	let confirma = confirm("Confirma a exclusão do cliente?");
	if (confirma == true) {
		linhaClicada.remove();
		removeItem(index);
		criaCelulas();
	} else {
		return;
	}
	
}

export {deletaCliente}