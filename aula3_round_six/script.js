let tempoRestante = 300; // 5 minutos em segundos
let rodada = 0;
let jogadorPodeAvancar = true;
let timer;
const totalRodadas = 10;
let caminhoCorreto = [];

function criarTabuleiro() {
    const container = document.querySelector(".tabuleiro");
    container.innerHTML = "";
    caminhoCorreto = [];

    for (let i = 0; i < totalRodadas; i++) {
        let linha = document.createElement("div");
        linha.classList.add("linha");

        let pisoEsquerda = document.createElement("button");
        pisoEsquerda.classList.add("piso");
        pisoEsquerda.dataset.lado = "esquerda";
        pisoEsquerda.dataset.index = i;
        pisoEsquerda.addEventListener("click", () => escolherPiso(i, "esquerda"));

        let pisoDireita = document.createElement("button");
        pisoDireita.classList.add("piso");
        pisoDireita.dataset.lado = "direita";
        pisoDireita.dataset.index = i;
        pisoDireita.addEventListener("click", () => escolherPiso(i, "direita"));

        linha.appendChild(pisoEsquerda);
        linha.appendChild(pisoDireita);
        container.appendChild(linha);

        // Define o caminho correto aleatoriamente
        caminhoCorreto.push(Math.random() < 0.5 ? "esquerda" : "direita");
    }
}

function iniciarJogo() {
    // Esconder a tela inicial
    document.querySelector(".initial-screen").style.display = "none";
    
    // Mostrar a tela do jogo
    document.querySelector(".game-screen").style.display = "flex";
    
    // Iniciar o jogo
    rodada = 0;
    jogadorPodeAvancar = true;
    tempoRestante = 300;
    document.querySelector(".cronometro").innerText = formatarTempo(tempoRestante);
    criarTabuleiro();
    iniciarCronometro();
}

function iniciarCronometro() {
    clearInterval(timer);
    timer = setInterval(() => {
        tempoRestante--;
        document.querySelector(".cronometro").innerText = formatarTempo(tempoRestante);

        if (tempoRestante <= 0) {
            encerrarJogo("O tempo acabou! Você perdeu.");
        }
    }, 1000);
}

function escolherPiso(indice, ladoJogador) {
    if (!jogadorPodeAvancar || indice !== rodada) return;

    let pisos = document.querySelectorAll(".linha")[indice].children;
    let ladoCorreto = caminhoCorreto[indice];

    if (ladoJogador === ladoCorreto) {
        // Escolha correta porra
        // O piso escolhido pelo jogador fica verde
        pisos[ladoJogador === "esquerda" ? 0 : 1].style.backgroundColor = "green";
        
        // O outro piso (o que a máquina escolheu) desaparece
        let pisoErrado = pisos[ladoJogador === "esquerda" ? 1 : 0];
        pisoErrado.classList.add("desaparecer");
        setTimeout(() => {
            pisoErrado.style.display = "none"; // Remove completamente após a transição
        }, 500); // Tempo deve coincidir com a transição de opacidade (0.5s)

        rodada++;
        
        if (rodada >= totalRodadas) {
            encerrarJogo("Parabéns! Você sobreviveu!");
        }
    } else {
        // Escolha errada
        // O piso escolhido pelo jogador fica vermelho
        pisos[ladoJogador === "esquerda" ? 0 : 1].style.backgroundColor = "red";
        
        // O piso correto (o que a máquina escolheu) também fica vermelho
        pisos[ladoCorreto === "esquerda" ? 0 : 1].style.backgroundColor = "red";
        
        encerrarJogo("Você morreu!");
    }
}

function encerrarJogo(mensagem) {
    clearInterval(timer);
    jogadorPodeAvancar = false;

    // Exibir a mensagem na tela
    const mensagemDiv = document.querySelector(".mensagem-jogo");
    mensagemDiv.innerText = mensagem;
    mensagemDiv.style.display = "block";

    // Após 2 segundos, recomeçar o jogo
    setTimeout(() => {
        // Esconder a tela do jogo e a mensagem
        document.querySelector(".game-screen").style.display = "none";
        mensagemDiv.style.display = "none";

        // Mostrar a tela inicial
        document.querySelector(".initial-screen").style.display = "flex";
    }, 2000);
}

function formatarTempo(segundos) {
    const min = Math.floor(segundos / 60);
    const seg = segundos % 60;
    return `${min}:${seg < 10 ? "0" + seg : seg}`;
}