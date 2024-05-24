function jokenpo() {
    let pontuacao = 0;

    while (true) {
        let jogadaUsuario = parseInt(prompt("Escolha sua jogada:\n1 - Papel\n2 - Pedra\n3 - Tesoura"));

        if (isNaN(jogadaUsuario) || jogadaUsuario < 1 || jogadaUsuario > 3) {
            alert("Opção inválida! Você perdeu a rodada.");
            break;
        }

        let jogadaComputador = Math.floor(Math.random() * 3) + 1;

        let opcoes = ["Papel", "Pedra", "Tesoura"];
        alert(`Você escolheu: ${opcoes[jogadaUsuario - 1]}\nComputador escolheu: ${opcoes[jogadaComputador - 1]}`);

        if (jogadaUsuario === jogadaComputador) {
            alert("Empate! Ninguém ganha ponto.");
        } else if (
            (jogadaUsuario === 1 && jogadaComputador === 2) ||
            (jogadaUsuario === 2 && jogadaComputador === 3) ||
            (jogadaUsuario === 3 && jogadaComputador === 1)
        ) {
            pontuacao++;
            alert(`Você ganhou!`);
        } else {
            alert(`Você perdeu! A sua pontuação foi: ${pontuacao}`);
            break;
        }
    }
}
jokenpo();
