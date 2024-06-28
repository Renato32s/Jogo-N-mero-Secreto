let listaDeNumeroSorteados = [];
let limite = 10;
let numeroSecreto = gerarNumeroSecreto();
let tentativas = 1;

let titulo = document.querySelector('h1');
titulo.innerHTML = 'Jogo Do número Secreto';

let paragrafo = document.querySelector('p');
paragrafo.innerHTML = 'escolha um número entre 1 e 10';

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}
function textoNaTela() {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', `Escolha um número entre 1 e ${limite}`);
}

textoNaTela();

function verificarChute() {
    let chute = document.querySelector('input').value;
    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', 'O número secreto é menor');
        } else {
            exibirTextoNaTela('p', 'O número secreto é maior');
        }
        tentativas++;
        limparCampo();
    }
}

function gerarNumeroSecreto() {
    let numeroEscolhido = parseInt(Math.random() * limite + 1);
    let quantidadeDeElementosNaLista = listaDeNumeroSorteados.length;

    if (quantidadeDeElementosNaLista == limite)
        listaDeNumeroSorteados = [];

    if (listaDeNumeroSorteados.includes(numeroEscolhido)) {
        return gerarNumeroSecreto();
    } else {
        listaDeNumeroSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroSecreto();
    limparCampo();
    textoNaTela();
    tentativas = 1;
    document.getElementById('reiniciar').setAttribute('disabled', true);
}