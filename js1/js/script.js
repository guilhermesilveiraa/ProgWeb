function criarTabelaTabuada(){
    document.write("<div style = 'display:flex;flex-wrap:wrap;'>")
    
    for(let i = 1; i <= 10; i++){
        document.write("<table border = '2' style= 'margin: 5px;'>")  
        document.write("<tr>")
        document.write("<th colspan = '2' style = 'padding : 10px;'>" + 'Tabuada do ' + i +  "</th>" )
        document.write("</tr>")    
        for(let j = 1; j <= 10; j++){
            
            document.write("<tr>")    
            document.write("<td style = 'text-align:center;'>" + i + " X " + j + "</td>")
            document.write("<td style = 'text-align:center;'>" + i * j + "</td>")
            document.write("</tr>")    

        }
        document.write("</table>")
    }
    document.write("</div>")

}

criarTabelaTabuada()