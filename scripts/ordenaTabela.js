function txt2number (txt) {
    var num = txt
    num = num.replace(/[R$&nbsp;]/g, '')
    num = num.replace(/\./g, '')
    num = num.replace(',', '.')
    num = parseFloat(num)
    return num
}

function sortTable(table, dir, n) {

    var rows;
    var i;
    var x;
    var y;
    var shouldSwitch;
    // var switchcount = 0;
    var switching = true;

    /*Faça um loop que continuará até nenhuma troca ser feita:*/
    while (switching == true) {

        //comece dizendo: nenhuma troca é feita:
        switching = false;

        rows = table.rows;

        /*Faça um loop por todas as linhas do t-body:*/
        for (i = 0; i < (rows.length - 1); i++) {
            //comece dizendo que não deve haver alternância/troca:
            shouldSwitch = false;
            /*Obtenha os dois elementos que você deseja comparar, um da linha atual e o outro da próxima:*/
            if (n == 3) { //Se n for a coluna saldo (comparação de numbers)
                let txtX = rows[i].getElementsByTagName("TD")[n].innerHTML
                let txtY = rows[i + 1].getElementsByTagName("TD")[n].innerHTML
                x = txt2number(txtX)
                y = txt2number(txtY)
            } else {
                x = rows[i].getElementsByTagName("TD")[n].innerHTML.toLowerCase();
                y = rows[i + 1].getElementsByTagName("TD")[n].innerHTML.toLowerCase();
            }

            /*verifique se as duas linhas devem mudar de lugar, com base na direção, asc ou desc:*/
            if (dir == "asc" && x > y) {
                shouldSwitch = true;
                break; //Pare o loop.
            } else if (dir == "desc" && x < y) {            
                shouldSwitch = true;
                break; //Pare o loop
            }
        }

        if (shouldSwitch == true) {
            /*Se um interruptor(break) foi marcado, faça a alteração:*/
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            //Cada vez que uma troca for concluída, aumente essa contagem em 1:
            // switchcount++;
        }
        // else {
        //     /*Se nenhuma mudança deve ser feita (shouldSwitch == false) e a direção for "asc",
        //     defina a direção para "desc" e execute o loop while novamente.*/
        //     if (switchcount == 0 && dir == "asc") {
        //     dir = "desc";
        //     switching = true;
        //     }
        // }
    }
  }
        
        /*
        SUGESTÃO ALTERNATIVA ARTHUR - FORMA MAIS MODERNA:

        var db = JSON.parse(localStorage.getItem('db'))

        function saveDB (db) {
            localStorage.setItem('db', JSON.stringify(db))
        }

        var linhas = [
            { nome: '', saldo: 100 },
            { nome: '', saldo: 100 },
            { nome: '', saldo: 100 },
            { nome: '', saldo: 100 },
        ]
        function ordenaTabela (linhas) {
            linhas.sort((a, b) => {
                return a.saldo > b.saldo 
            })
            render()
        }
        function render () {
            var table = document.getElementById('idTabela')
            table.innerHTML = '<tr><td>Loading...</td></tr>'

            var content = ''
            for (linha of linhas) {
                content += `
                    <tr>
                        <td>${linha.nome}</td>
                        <td>${linha.saldo}</td>
                    </tr>
                `
            }

            table.innerHTML = content
        }

        parseFloat('50.010,00')
        linhas[2].saldo = 50010.00
        `<td>${formatMoney(linha.saldo)}</td>` -> <td>50.010,00</td>

        */

export {sortTable}