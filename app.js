let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

//let titulo = document.querySelector('h1');
//titulo.innerHTML = 'Jogo do número secreto';

//let paragrafo = document.querySelector('p');
//paragrafo.innerHTML = 'Escolha um número entre 1 e 10: ';

// Chamar o titulo e o paragrafo por meio de uma função com parametros(tag e texto)
function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

// Função sem parametros para exibir as h1 e p iniciais
exibirMensagemInicial();

// Função sem parametros
function verificarChute(){
    let chute = document.querySelector('input').value;
    
    if(chute == numeroSecreto){
        exibirTextoNaTela('h1', 'Parabéns!!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p',mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled'); // Ativando o botão de Novo Jogo quando o usuário acertar o número secreto
    } else{
        if(chute > numeroSecreto){
            exibirTextoNaTela('p','O número secreto é menor...');
        } else {
            exibirTextoNaTela('p', 'O número secreto é maior...');
        }
        tentativas++;
    }
}

// Função para reiniciar o jogo utilizando o botão "Novo Jogo"
function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true); // Deixar o botão "Novo jogo" desabilitado até o usuário acertar o número secreto
}

// Função sem parametro e com retorno, para gerar um número aleatório 
function gerarNumeroAleatorio(){
    let numeroEscolhido = parseInt(Math.random() *numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;
    if(quantidadeDeElementosNaLista == numeroLimite){
        listaDeNumerosSorteados = [];
    }
    // O método ".includes()" verifica se algum elemento existe / está presente
    if(listaDeNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    } else{
        // método ".push()" adiciona um item ao final da lista
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

// Função sem parametro para limpar o campo em caso de erro do numero secreto
function limparCampo(){
    chute = document.querySelector('input');
    chute.value = ' ';
}

function exibirMensagemInicial(){
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10: ');
}