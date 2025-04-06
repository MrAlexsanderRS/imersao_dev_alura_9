function iniciarJogo() {
    let dialogBox = document.getElementById("dialogBox");
    let inputBox = document.getElementById("idadeInput");
    let button = document.querySelector(".button");
    let idade = inputBox.value;
  
    // Verifica se o campo de idade está vazio
    if (!idade) {
      dialogBox.innerText =
        "Um Padawan deve ter idade, para trilhar sua primeira jornada!";
      return;
    }
  
    // Primeiro caminho
    if (idade <= 17) {
      dialogBox.innerText =
        "Muito jovem você é, Padawan! Treinar mais com seu mestre, você deve.";
      inputBox.value = "";
      inputBox.placeholder = "Digite sua idade";
      button.innerText = "Jogar";
      button.onclick = iniciarJogo;
      return;
    }
  
    // Segundo caminho
    if (idade >= 18) {
      dialogBox.innerText =
        "A Força é forte em você! Preparado para o teste você está. Escolha sabiamente: 1 Pedra, 2 Papel ou 3 Tesoura!";
  
      inputBox.value = "";
      inputBox.placeholder = "...";
  
      // Muda a função do botão
      button.innerText = "Usar a Força";
      button.onclick = function () {
        let escolhaJogador = parseInt(inputBox.value);
        let escolhaComputador = Math.floor(Math.random() * 3) + 1;
  
        // Verifica se a escolha é válida
        if (escolhaJogador != 1 && escolhaJogador != 2 && escolhaJogador != 3) {
          dialogBox.innerText =
            "Concentre-se, Padawan! 1, 2 ou 3 você deve escolher.";
          // Permite tentar novamente
          inputBox.value = "";
          inputBox.placeholder = "...";
          button.innerText = "Usar a Força";
          return;
        }
  
        // Mapeia os números para palavras (Pedra, Papel, Tesoura)
        let opcoes = { 1: "Pedra", 2: "Papel", 3: "Tesoura" };
  
        // Empate
        if (escolhaJogador == escolhaComputador) {
          dialogBox.innerText =
            "Um empate, temor! Subestimar o Lado Sombrio, você não deve.\nMinha escolha: " +
            opcoes[escolhaComputador];
        } else {
          // Jogador escolhe Pedra (1)
          if (escolhaJogador == 1) {
            if (escolhaComputador == 2) {
              dialogBox.innerText = "Você é fraco, Padawan! Escolhi Papel.";
            }
            if (escolhaComputador == 3) {
              dialogBox.innerText =
                "Parabéns Padawan, você venceu! Escolhi Tesoura.";
            }
          }
  
          // Jogador escolhe Papel (2)
          if (escolhaJogador == 2) {
            if (escolhaComputador == 1) {
              dialogBox.innerText =
                "Parabéns Padawan, você venceu! Escolhi Pedra.";
            }
            if (escolhaComputador == 3) {
              dialogBox.innerText = "Você é fraco, Padawan! Escolhi Tesoura.";
            }
          }
  
          // Jogador escolhe Tesoura (3)
          if (escolhaJogador == 3) {
            if (escolhaComputador == 1) {
              dialogBox.innerText = "Você é fraco, Padawan! Escolhi Pedra.";
            }
            if (escolhaComputador == 2) {
              dialogBox.innerText =
                "Parabéns Padawan, você venceu! Escolhi Papel.";
            }
          }
        }
  
        // novamente...
        dialogBox.innerText +=
          "\nDeseja jogar novamente? Digite sua escolha (1, 2 ou 3)!";
        inputBox.value = "";
        inputBox.placeholder = "...";
        button.innerText = "Confirmar Escolha";
      };
    }
  }
  