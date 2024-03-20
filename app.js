let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag,texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibirMensagemInicial(){
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Digite um número entre 1 e 10');
}

exibirMensagemInicial();

function verificarChute(){
    let chute = document.querySelector('input').value;
    if(chute==numeroSecreto)
    {
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativas = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativas}`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    }
    else if(chute>numeroSecreto)
    {
        exibirTextoNaTela('p', 'O numero secreto é menor');
    }
    else
    {
        exibirTextoNaTela('p', 'O numero secreto e maior');
    }
    tentativas++;
    limparChute();
}

function gerarNumeroAleatorio(){
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeElementosNaLista = listaDeNumerosSorteados.length;//recebe a quantidade de elementos da lista

    if(quantidadeElementosNaLista == numeroLimite){
        listaDeNumerosSorteados=[];
    }

    if (listaDeNumerosSorteados.includes(numeroEscolhido)){//verifica se o elemento(numeroEscolhido) está na lista
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);//coloca item na lista
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

function limparChute(){
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparChute();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);//habilita o disabled, deixa ele como true
}