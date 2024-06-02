function barras(containerId){
    const container = document.getElementById(containerId);
    container.innerHTML = 
    `
        <form id="entradasForm">
            <label for="alturaUm">Informe as Alturas:</label>
            <input type="text" id="alturaUm" name="alturaUm" placeholder="Insira a altura da Barra 1">
            <input type="text" id="alturaDois" name="alturaDois" placeholder="Insira a altura da Barra 2">
            <input type="text" id="alturaTres" name="alturaTres" placeholder="Insira a altura da Barra 3">
            <input type="text" id="alturaQuatro" name="alturaQuatro" placeholder="Insira a altura da Barra 4">
        </form>
        <br>
        <form id="entradasFormL">
            <label for="largura">Informe a Largura das barras:</label>
            <input type="text" id="largura" name="largura" placeholder="Insira a largura das Barras">
        </form>
        <button type="button" id="realizaButton">Realizar</button>
    `;

    document.getElementById('realizaButton').addEventListener('click', function() {
        const alturas = [
            document.getElementById('alturaUm').value,
            document.getElementById('alturaDois').value,
            document.getElementById('alturaTres').value,
            document.getElementById('alturaQuatro').value
        ];

        const largura = document.getElementById('largura').value;
        const barrasContainer = document.getElementById('barrasContainer');
        barrasContainer.innerHTML = '';

        alturas.forEach(altura => {
            const barra = document.createElement('div');
            barra.className = 'barra';
            barra.style.height = `${altura}px`;
            barra.style.width = `${largura}px`;
            barrasContainer.appendChild(barra);
        });
    });
}

barras('calc');
