function sortTable(table, dir, n) {

    var rows;
    var i;
    var x;
    var y;
    var shouldSwitch;
    var switchcount = 0;
    var switching = true;

    /*Faça um loop que continuará até nenhuma troca ser feita:*/
    while (switching == true) {

        //comece dizendo: nenhuma troca é feita:
        switching = false;

        rows = table.rows;
        
        /*Faça um loop por todas as linhas da tabela (exceto o primeiro, que contém cabeçalhos da tabela):*/
        for (i = 0; i < (rows.length - 1); i++) {
            //comece dizendo que não deve haver alternância/troca:
            shouldSwitch = false;
            /*Obtenha os dois elementos que você deseja comparar, um da linha atual e o outro da próxima:*/
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            /*verifique se as duas linhas devem mudar de lugar, com base na direção, asc ou desc:*/
            if (dir == "asc") {
            if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                shouldSwitch = true;
                break; //Pare o loop.
            }
            } else if (dir == "desc") {
            if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                shouldSwitch = true;
                break; //Pare o loop
            }
            }
        }

        if (shouldSwitch == true) {
            /*Se um interruptor(break) foi marcado, faça a alteração:*/
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            //Cada vez que uma troca for concluída, aumente essa contagem em 1:
            switchcount++;
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

  export {sortTable}