// import { criaCelulas } from "./loadTabela.js";
import {dadosLocalStorage} from "./service.js";

let tabela = document.getElementById('tbody');


function carregaTabela(arrayDados) {

	// if (window.location.href.indexOf('index5') > -1) {
		
		tabela.innerHTML = "";
	
		arrayDados.forEach(element => {
			
			let celNome = document.createElement('td');
			celNome.innerHTML = element.nome;
			
			let celNascim = document.createElement('td');
			let data = new Date(element.nascimento);
			celNascim.innerHTML = (data.getDate() + 1) + "/" + (data.getMonth() + 1) + "/" + data.getFullYear();
			// celNascim.innerHTML = element.nascimento;

			let celTel = document.createElement('td');
			celTel.classList.add('celTel');
			// celTel.style.textAlign = "center";
			if(element.hasOwnProperty("telefone2") && element.telefone2 != "") {
				celTel.innerHTML = element.telefone + "<br>" + element.telefone2;
				
			} else {
				celTel.innerHTML = element.telefone;
			}

			let celSaldo = document.createElement('td');
			celSaldo.innerHTML = element.saldo;
			
			let criaLinha = document.createElement('tr');
			criaLinha.appendChild(celNome);
			criaLinha.appendChild(celNascim);
			criaLinha.appendChild(celTel);
			criaLinha.appendChild(celSaldo);
			
			tabela.appendChild(criaLinha);
			
		} );

	
	// }
	
}

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< FILTRA NOME >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

let campoFiltraNome = document.querySelector("#filtra");

campoFiltraNome.addEventListener('input', function () {

	let tbody = document.querySelector("#tbody");
	let clientes = tbody.querySelectorAll("tr");
	console.log(clientes)
	let expressao = new RegExp(this.value, "i");

	if (this.value.length > 0) {
		clientes.forEach(element => {
			if (expressao.test(element.children[0].textContent)) {
				element.classList.remove("invisivel");
				// element.classList.add('selecionado');
			}
			else {
				element.classList.add("invisivel");
				// element.classList.remove('selecionado');
			}

		});
	} else {
		clientes.forEach(element => {
			element.classList.remove("invisivel");
			// element.classList.remove('selecionado');
		});

	}

})


// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< FILTRA VALOR >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

let campoFiltraSaldo = document.querySelector('#saldo');

campoFiltraSaldo.addEventListener('input', function () {
	
	let tbody = document.querySelector("#tbody");
	let clientes = tbody.querySelectorAll("tr");

	if (this.value.length > 0) {

		clientes.forEach(element => {
			if (parseFloat(element.children[3].textContent) >= parseFloat(this.value).toFixed(2)) {
				element.classList.remove('invisivel2');
			}
			
			else {
				element.classList.add('invisivel2');
			}
		});
	}
	
	else {
		clientes.forEach(element => {
			element.classList.remove('invisivel2');
		})

	}

	

	// let newClientes = clientes.filter(filtraSaldo);
	// console.log(newClientes);

})


// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< EVENTOS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

carregaTabela(dadosLocalStorage);
