let listaNumerosSorteados = [];
let numeroLimite = 100;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNatela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.1});
}
function exibirMensagemInicial() {
    exibirTextoNatela('h1','jogo do número secreto');
    exibirTextoNatela('p','Escolha um número entre 1 e 100: ');
}
exibirMensagemInicial();


function verificarChute(){
    let chute = document.querySelector('input').value;
    if (chute == numeroSecreto) {
        exibirTextoNatela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagensTentativas = `Parabéns! Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNatela('p', mensagensTentativas);

        document.getElementById('reiniciar').removeAttribute('disabled');

    }else{

        if (chute > numeroSecreto) {
            exibirTextoNatela('p', 'O número secreto é menor.');
            limparCampo();
            
        }else {
            exibirTextoNatela('p', 'O número secreto é maior.');
            limparCampo();
        }
    }tentativas ++;
}
function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}
function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == numeroLimite) {
        listaNumerosSorteados = []
    }

    if (listaNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    }else {
        listaNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }

}
function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}