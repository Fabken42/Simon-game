// recorde e pontuacao-partida
const jogarBtnEl = document.querySelector('.jogar-btn')
const teclaEls = document.querySelectorAll('.tecla')
const telaBloqueioEl = document.querySelector('.tela-bloqueio')
const pontuacaoEl = document.querySelector('.pontuacao')
const recordeEl = document.querySelector('.recorde')

function tocaSom(idAudio) {
    var audio = new Audio(`./audio/${idAudio}.mp3`);
    audio.play();
}

function adicionaTeclaAleatoria() {
    sequenciaCorreta.push(teclas[Math.floor(Math.random() * 4)].nome)
}

function mudaCorTecla(tecla) {
    const teclaEl = document.querySelector(`.${tecla}`)
    teclaEl.classList.add('ativo')

    setTimeout(function () {
        teclaEl.classList.remove('ativo')
    }, 400);
}

function mostraSequencia() {
    telaBloqueioEl.classList.remove('inativa')
    let pos = 0;
    const intervaloId = setInterval(() => {
        mudaCorTecla(sequenciaCorreta[pos])
        tocaSom(sequenciaCorreta[pos++]);
        if (pos === sequenciaCorreta.length) {
            clearInterval(intervaloId);
            setTimeout(() => {
                telaBloqueioEl.classList.add('inativa')
            }, 700)
        }
    }, 700);
}

function playerJoga(teclaPressionada) {
    console.log(teclaPressionada);
    if (teclaPressionada !== sequenciaCorreta[indexJogada]) {
        fimDeJogo()
    } else {
        indexJogada++;
        if (indexJogada == sequenciaCorreta.length)
            fimDeRodada()
    }
}

function fimDeRodada() {
    indexJogada = 0;
    atualizaPontuacao()
    adicionaTeclaAleatoria()
    mostraSequencia()
}

function fimDeJogo() {
    telaBloqueioEl.classList.remove('inativa')
    jogarBtnEl.classList.remove('desativado')
    setTimeout(() => {
        tocaSom('fim-de-jogo')
    }, 500)

    if (getLocalStorageRecorde() < pontuacao) {
        setLocalStorageRecorde(pontuacao)
    }
}

function setLocalStorageRecorde(pontuacao) {
    localStorage.setItem('recorde',pontuacao)
}

function getLocalStorageRecorde() {
    var num = parseInt(localStorage.getItem('recorde'))
    if(isNaN(num)) num = 0
    return num
}

function atualizaPontuacao() {
    pontuacao = sequenciaCorreta.length
    pontuacaoEl.innerHTML = `${pontuacao}`
}

function limpaVariaveis() {
    sequenciaCorreta = []
    indexJogada = 0
    pontuacao = 0
    pontuacaoEl.innerHTML = `${pontuacao}`
}

const teclas = [
    { nome: 'tecla-cima-esq', cor: 'rgba(0, 128, 0, 0.5)', corAtiva: 'green' },
    { nome: 'tecla-cima-dir', cor: 'rgba(255, 0, 0, 0.5)', corAtiva: 'red' },
    { nome: 'tecla-baixo-esq', cor: 'rgba(255, 255, 0, 0.5)', corAtiva: 'yellow' },
    { nome: 'tecla-baixo-dir', cor: 'rgba(0, 0, 255, 0.5)', corAtiva: 'blue' }
]
var sequenciaCorreta = [] //armazenará por exemplo: ['tecla-baixo-dir','tecla-baixo-esq','tecla-cima-dir']
var indexJogada = 0;
var pontuacao = 0;

teclaEls.forEach((tecla) => {
    tecla.addEventListener('click', () => {
        playerJoga(tecla.classList[1])
        tocaSom(tecla.classList[1]);
    })
})

jogarBtnEl.addEventListener('click', () => {
    jogarBtnEl.classList.add('desativado')
    recordeEl.innerHTML = `${getLocalStorageRecorde()}`
    limpaVariaveis()
    adicionaTeclaAleatoria()
    mostraSequencia()
})