// PARTE 1: Lista de perguntas nerds variadas
const perguntas = [
    {
      pergunta: "Qual o nome do protagonista de 'Cyberpunk 2077'?",
      resposta: [
        { opcao: "Johnny Silverhand", correto: false },
        { opcao: "V", correto: true },
        { opcao: "Adam Smasher", correto: false }
      ],
      explicacao: "O personagem principal se chama V, mas você pode personalizar seu gênero e aparência."
    },
    {
      pergunta: "Em 'Stranger Things', como se chama o mundo paralelo?",
      resposta: [
        { opcao: "Upside Down", correto: true },
        { opcao: "Nether", correto: false },
        { opcao: "Shadow Realm", correto: false }
      ],
      explicacao: "O Upside Down é uma versão sombria e alternativa da cidade de Hawkins."
    },
    {
      pergunta: "Qual desses NÃO é um dos Cavaleiros do Zodíaco originais?",
      resposta: [
        { opcao: "Ikki de Fênix", correto: false },
        { opcao: "Shiryu de Dragão", correto: false },
        { opcao: "Naruto de Raposa", correto: true }
      ],
      explicacao: "Naruto é personagem de outra série, os Cavaleiros originais são Seiya, Shiryu, Hyoga, Shun e Ikki."
    },
    {
      pergunta: "Na série 'The Big Bang Theory', qual era a profissão de Sheldon?",
      resposta: [
        { opcao: "Físico Teórico", correto: true },
        { opcao: "Engenheiro de Software", correto: false },
        { opcao: "Astrofísico", correto: false }
      ],
      explicacao: "Sheldon Cooper era um físico teórico especializado em teoria das cordas."
    },
    {
      pergunta: "Qual o nome do vilão principal em 'Homem-Aranha: No Way Home'?",
      resposta: [
        { opcao: "Duende Verde", correto: false },
        { opcao: "Doutor Octopus", correto: false },
        { opcao: "Doutor Estranho", correto: true }
      ],
      explicacao: "Embora vários vilões apareçam, o conflito principal é com o Doutor Estranho devido ao feitiço que deu errado."
    },
    {
      pergunta: "Em 'The Witcher', qual o nome do cavalo de Geralt?",
      resposta: [
        { opcao: "Shadowfax", correto: false },
        { opcao: "Roach", correto: true },
        { opcao: "Epona", correto: false }
      ],
      explicacao: "Geralt chama todos os seus cavalos de 'Roach' (Barata em inglês)."
    },
    {
      pergunta: "Qual destes jogos foi considerado o primeiro MMORPG?",
      resposta: [
        { opcao: "World of Warcraft", correto: false },
        { opcao: "Ultima Online", correto: true },
        { opcao: "RuneScape", correto: false }
      ],
      explicacao: "Ultima Online (1997) é considerado o primeiro MMORPG comercial bem-sucedido."
    },
    {
      pergunta: "Qual o nome da espada lendária em 'Berserk'?",
      resposta: [
        { opcao: "Dragon Slayer", correto: true },
        { opcao: "Buster Sword", correto: false },
        { opcao: "Master Sword", correto: false }
      ],
      explicacao: "A Dragon Slayer é uma espada enorme usada por Guts, tão grande que é considerada mais uma massa de ferro do que uma espada."
    },
    {
      pergunta: "Na franquia 'Resident Evil', qual vírus deu origem aos zumbis?",
      resposta: [
        { opcao: "Vírus T", correto: true },
        { opcao: "Vírus G", correto: false },
        { opcao: "Vírus Uroboros", correto: false }
      ],
      explicacao: "O Vírus T (Tyrant) foi desenvolvido pela Umbrella Corporation e é responsável pelo surto em Raccoon City."
    },
    {
      pergunta: "Qual o nome do anime que popularizou o termo 'isekai'?",
      resposta: [
        { opcao: "Sword Art Online", correto: false },
        { opcao: "Re:Zero", correto: false },
        { opcao: "Mushoku Tensei", correto: true }
      ],
      explicacao: "Mushoku Tensei: Jobless Reincarnation é considerado o pai dos isekais modernos, estabelecendo muitos dos tropes do gênero."
    }
  ];
  
  // PARTE 2: Elementos do DOM
  const perguntaElemento = document.querySelector(".pergunta");
  const respostasElemento = document.querySelector(".respostas");
  const progressoElemento = document.querySelector(".progresso");
  const textoFinal = document.querySelector(".fim span");
  const conteudo = document.getElementById("quizContent");
  const conteudoFinal = document.getElementById("endScreen");
  const btnReiniciar = document.querySelector(".btn");
  
  // PARTE 3: Variáveis de estado
  let indiceAtual = 0;
  let acertos = 0;
  let tempoPorPergunta = [];
  let tempoInicioQuiz;
  let dificuldade = "medio"; // pode ser 'facil', 'medio' ou 'dificil'
  
  // PARTE 4: Efeitos sonoros (com fallback)
  const efeitosSonoros = {
    acerto: new Audio('https://assets.mixkit.co/sfx/preview/mixkit-correct-answer-tone-2870.mp3'),
    erro: new Audio('https://assets.mixkit.co/sfx/preview/mixkit-wrong-answer-fail-notification-946.mp3'),
    vitoria: new Audio('https://assets.mixkit.co/sfx/preview/mixkit-winning-chimes-2015.mp3')
  };
  
  // Verifica se os áudios carregaram
  Object.values(efeitosSonoros).forEach(som => {
    som.preload = 'auto';
    som.volume = 0.3;
  });
  
  // PARTE 5: Função para carregar perguntas
  function carregarPergunta() {
    // Inicia o timer para a pergunta atual
    const tempoInicioPergunta = new Date();
    
    // Atualiza o progresso
    progressoElemento.textContent = `${indiceAtual + 1}/${perguntas.length}`;
    
    // Pega a pergunta atual
    const perguntaAtual = perguntas[indiceAtual];
    
    // Exibe a pergunta com efeito de digitação (opcional)
    perguntaElemento.textContent = perguntaAtual.pergunta;
    
    // Limpa respostas anteriores
    respostasElemento.innerHTML = "";
    
    // Embaralha as respostas (opcional)
    const respostasEmbaralhadas = [...perguntaAtual.resposta].sort(() => Math.random() - 0.5);
    
    // Cria os botões de resposta
    respostasEmbaralhadas.forEach(resposta => {
      const botao = document.createElement("button");
      botao.className = "botao-resposta";
      botao.textContent = resposta.opcao;
      
      botao.addEventListener('click', () => selecionarResposta(resposta, perguntaAtual, tempoInicioPergunta));
      
      respostasElemento.appendChild(botao);
    });
  }
  
  // PARTE 6: Função para tratar seleção de resposta
  function selecionarResposta(resposta, perguntaAtual, tempoInicioPergunta) {
    // Calcula o tempo gasto na pergunta
    const tempoGasto = Math.floor((new Date() - tempoInicioPergunta) / 1000);
    tempoPorPergunta.push({
      pergunta: perguntaAtual.pergunta,
      tempo: tempoGasto,
      acertou: resposta.correto
    });
    
    // Desabilita todos os botões
    const todosBotoes = document.querySelectorAll(".botao-resposta");
    todosBotoes.forEach(btn => {
      btn.disabled = true;
      // Marca a resposta correta
      if (btn.textContent === perguntaAtual.resposta.find(r => r.correto).opcao) {
        btn.classList.add("correta");
      }
    });
    
    // Efeitos visuais e sonoros
    if (resposta.correto) {
      acertos++;
      efeitosSonoros.acerto.play().catch(e => console.log("Erro ao reproduzir som: ", e));
      event.target.classList.add("correta");
    } else {
      efeitosSonoros.erro.play().catch(e => console.log("Erro ao reproduzir som: ", e));
      event.target.classList.add("incorreta");
    }
    
    // Avança para próxima pergunta ou finaliza
    setTimeout(() => {
      indiceAtual++;
      if (indiceAtual < perguntas.length) {
        carregarPergunta();
      } else {
        finalizarJogo();
      }
    }, 1500);
  }
  
  // PARTE 7: Finalização do jogo
  function finalizarJogo() {
    // Calcula estatísticas
    const tempoTotal = tempoPorPergunta.reduce((acc, curr) => acc + curr.tempo, 0);
    const tempoMedio = (tempoTotal / perguntas.length).toFixed(1);
    const percentualAcertos = Math.round((acertos / perguntas.length) * 100);
    
    // Determina a mensagem com base no desempenho
    let mensagem;
    if (percentualAcertos === 100) {
      mensagem = `🏆 Perfeito! ${acertos}/${perguntas.length} acertos! Você é um verdadeiro Nerd! 🎮`;
      efeitosSonoros.vitoria.play().catch(e => console.log("Erro ao reproduzir som: ", e));
    } else if (percentualAcertos >= 70) {
      mensagem = `👏 Muito bom! ${acertos}/${perguntas.length} acertos! A Força está com você! ⚔️`;
    } else if (percentualAcertos >= 40) {
      mensagem = `👍 ${acertos}/${perguntas.length} acertos! Hora de rever algumas séries e jogos! 🎬`;
    } else {
      mensagem = `😅 ${acertos}/${perguntas.length} acertos... Todo mestre já foi iniciante! Continue estudando! 📚`;
    }
    
    // Adiciona estatísticas
    mensagem += `<br><br><small>Tempo médio por pergunta: ${tempoMedio}s</small>`;
    
    // Adiciona explicações
    mensagem += `<div class="explicacoes"><h3>Explicações:</h3>`;
    perguntas.forEach((pergunta, index) => {
      const resposta = tempoPorPergunta[index];
      mensagem += `
        <p>
          <strong>Pergunta ${index + 1}:</strong> ${pergunta.explicacao}<br>
          <em>Tempo: ${resposta.tempo}s - ${resposta.acertou ? '✅ Acertou' : '❌ Errou'}</em>
        </p>
      `;
    });
    mensagem += `</div>`;
    
    // Exibe na tela
    textoFinal.innerHTML = mensagem;
    conteudo.style.display = "none";
    conteudoFinal.style.display = "flex";
    
    // Rola para o topo
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  
  // PARTE 8: Inicialização
  function iniciarQuiz() {
    // Reinicia variáveis
    indiceAtual = 0;
    acertos = 0;
    tempoPorPergunta = [];
    tempoInicioQuiz = new Date();
    
    // Mostra quiz e esconde tela final
    conteudo.style.display = "block";
    conteudoFinal.style.display = "none";
    
    // Carrega primeira pergunta
    carregarPergunta();
  }
  
  // Event listeners
  btnReiniciar.addEventListener('click', iniciarQuiz);
  
  // Inicia o quiz quando a página carrega
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(iniciarQuiz, 500); // Pequeno delay para garantir que tudo carregou
  });
  
  // PARTE 9: Features extras (opcionais)
  // Tecla Espaço para reiniciar
  document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && conteudoFinal.style.display === 'flex') {
      iniciarQuiz();
    }
  });
  
  // Modo escuro/claro (opcional)
  const toggleDarkMode = () => {
    document.body.classList.toggle('light-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('light-mode') ? 'off' : 'on');
  };
  
  // Verifica preferência do usuário
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    document.body.classList.add('light-mode');
  }