// Banco de dados de Pokémons com ataques especiais
const pokemonDatabase = [
    {
        id: 1,
        name: "PIKACHU",
        type: "Elétrico",
        hp: 100,
        maxHp: 100,
        attack: 55,
        defense: 40,
        speed: 90,
        moves: [
            { name: "CHOQUE DO TROVÃO", power: 80, accuracy: 75, type: "special" },
            { name: "CAUDA DE FERRO", power: 50, accuracy: 95, type: "physical" },
            { name: "VELOCIDADE EXTREMA", power: 0, accuracy: 100, type: "buff", stat: "speed", amount: 20 },
            { name: "CURAR", power: 0, accuracy: 100, type: "heal", amount: 30 }
        ],
        criticalRate: 15
    },
    {
        id: 2,
        name: "CHARIZARD",
        type: "Fogo",
        hp: 100,
        maxHp: 100,
        attack: 84,
        defense: 78,
        speed: 85,
        moves: [
            { name: "LANÇA-CHAMAS", power: 90, accuracy: 70, type: "special" },
            { name: "GARRAS AFIADAS", power: 60, accuracy: 90, type: "physical" },
            { name: "DEFESA DE FOGO", power: 0, accuracy: 100, type: "buff", stat: "defense", amount: 15 },
            { name: "ASAS DE AÇO", power: 0, accuracy: 100, type: "buff", stat: "defense", amount: 20 }
        ],
        criticalRate: 10
    },
    {
        id: 3,
        name: "BLASTOISE",
        type: "Água",
        hp: 100,
        maxHp: 100,
        attack: 83,
        defense: 100,
        speed: 78,
        moves: [
            { name: "JATO DE ÁGUA", power: 85, accuracy: 80, type: "special" },
            { name: "CASCO PROTETOR", power: 0, accuracy: 100, type: "buff", stat: "defense", amount: 25 },
            { name: "JATO TURBINADO", power: 110, accuracy: 60, type: "special" },
            { name: "CURAR ÁGUA", power: 0, accuracy: 100, type: "heal", amount: 40 }
        ],
        criticalRate: 5
    },
    {
        id: 4,
        name: "VENUSAUR",
        type: "Planta",
        hp: 100,
        maxHp: 100,
        attack: 82,
        defense: 83,
        speed: 80,
        moves: [
            { name: "RAIO SOLAR", power: 85, accuracy: 75, type: "special" },
            { name: "CHICOTE DE VINHA", power: 55, accuracy: 95, type: "physical" },
            { name: "FOTOSSÍNTESE", power: 0, accuracy: 100, type: "heal", amount: 50 },
            { name: "DEFESA NATURAL", power: 0, accuracy: 100, type: "buff", stat: "defense", amount: 20 }
        ],
        criticalRate: 10
    },
    {
        id: 5,
        name: "GYARADOS",
        type: "Água",
        hp: 100,
        maxHp: 100,
        attack: 95,
        defense: 79,
        speed: 81,
        moves: [
            { name: "HIDROBOMBA", power: 95, accuracy: 65, type: "special" },
            { name: "HIPER RAIO", power: 120, accuracy: 50, type: "special" },
            { name: "FÚRIA DO DRAGÃO", power: 0, accuracy: 100, type: "buff", stat: "attack", amount: 30 },
            { name: "ESCAMA PROTETORA", power: 0, accuracy: 100, type: "buff", stat: "defense", amount: 15 }
        ],
        criticalRate: 15
    },
  //importante sessão, lembrar dela
    {
        id: 6,
        name: "ALAKAZAM",
        type: "Psíquico",
        hp: 100,
        maxHp: 100,
        attack: 50,
        defense: 45,
        speed: 95,
        moves: [
            { name: "PSÍQUICO", power: 90, accuracy: 85, type: "special" },
            { name: "BOLA DE ENERGIA", power: 70, accuracy: 90, type: "special" },
            { name: "BARREIRA PSÍQUICA", power: 0, accuracy: 100, type: "buff", stat: "defense", amount: 30 },
            { name: "RECUPERAÇÃO", power: 0, accuracy: 100, type: "heal", amount: 25 }
        ],
        criticalRate: 20
    }
];

// Variáveis do jogo
let selectedPokemons = [];
let enemyPokemons = [];
let currentPlayerPokemon = null;
let currentEnemyPokemon = null;
let battleLog = [];
let playerTurn = true;

// Elementos DOM
const startScreen = document.getElementById('startScreen');
const selectionScreen = document.getElementById('selectionScreen');
const battleScreen = document.getElementById('battleScreen');
const startButton = document.getElementById('startButton');
const battleButton = document.getElementById('battleButton');
const newBattleButton = document.getElementById('newBattleButton');
const pokemonGrid = document.getElementById('pokemonGrid');
const selectedTeam = document.getElementById('selectedTeam');
const playerPokemon = document.getElementById('playerPokemon');
const enemyPokemon = document.getElementById('enemyPokemon');
const battleLogElement = document.getElementById('battleLog');
const battleActions = document.getElementById('battleActions');
const playerTeamStatus = document.getElementById('playerTeamStatus');
const enemyTeamStatus = document.getElementById('enemyTeamStatus');

// Inicialização do jogo
function initGame() {
    startButton.addEventListener('click', showSelectionScreen);
    battleButton.addEventListener('click', startBattle);
    newBattleButton.addEventListener('click', resetBattle);
    
    renderPokemonSelection();
}

// Mostra a tela de seleção
function showSelectionScreen() {
    startScreen.style.display = 'none';
    selectionScreen.style.display = 'block';
}

// Renderiza a seleção de Pokémons
function renderPokemonSelection() {
    pokemonGrid.innerHTML = '';
    
    pokemonDatabase.forEach(pokemon => {
        const pokemonCard = document.createElement('div');
        pokemonCard.className = 'pokemon-card';
        pokemonCard.innerHTML = `
            <div class="pokemon-name">${pokemon.name}</div>
            <div class="pokemon-type ${pokemon.type}">${pokemon.type}</div>
            <div class="pokemon-stats">
                ATQ: ${pokemon.attack} | DEF: ${pokemon.defense}<br>
                VEL: ${pokemon.speed} | HP: ${pokemon.hp}
            </div>
        `;
        
        pokemonCard.addEventListener('click', () => selectPokemon(pokemon));
        pokemonGrid.appendChild(pokemonCard);
    });
}

// Seleciona um Pokémon
function selectPokemon(pokemon) {
    if (selectedPokemons.length >= 3 && !selectedPokemons.some(p => p.id === pokemon.id)) {
        addToBattleLog("Você já selecionou 3 Pokémons!");
        return;
    }
    
    const index = selectedPokemons.findIndex(p => p.id === pokemon.id);
    
    if (index === -1) {
        selectedPokemons.push({...pokemon});
    } else {
        selectedPokemons.splice(index, 1);
    }
    
    updateSelectedTeam();
    battleButton.disabled = selectedPokemons.length !== 3;
}

// Atualiza o time selecionado
function updateSelectedTeam() {
    const slots = selectedTeam.querySelector('.empty-slots');
    slots.innerHTML = '';
    
    for (let i = 0; i < 3; i++) {
        const slot = document.createElement('div');
        slot.className = 'slot';
        
        if (selectedPokemons[i]) {
            const pokemonBadge = document.createElement('div');
            pokemonBadge.className = 'selected-pokemon';
            pokemonBadge.innerHTML = `
                <div class="pokemon-name">${selectedPokemons[i].name}</div>
                <div class="pokemon-type ${selectedPokemons[i].type}">${selectedPokemons[i].type}</div>
            `;
            slot.appendChild(pokemonBadge);
        }
        
        slots.appendChild(slot);
    }
}

// Inicia a batalha
function startBattle() {
    selectionScreen.style.display = 'none';
    battleScreen.style.display = 'block';
    
    // Seleciona Pokémons aleatórios para o inimigo
    enemyPokemons = [...pokemonDatabase]
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
        .map(p => ({...p}));
    
    // Reseta o HP dos Pokémons do jogador
    selectedPokemons = selectedPokemons.map(p => {
        const original = pokemonDatabase.find(pokemon => pokemon.id === p.id);
        return {...original};
    });
    
    renderBattleTeams();
    selectBattlePokemons();
    renderTeamStatus();
    addToBattleLog("A batalha começou!");
}

// Renderiza os times na batalha
function renderBattleTeams() {
    // Renderiza o Pokémon atual do jogador
    if (currentPlayerPokemon) {
        renderPokemonElement(playerPokemon, currentPlayerPokemon);
    }
    
    // Renderiza o Pokémon atual do inimigo
    if (currentEnemyPokemon) {
        renderPokemonElement(enemyPokemon, currentEnemyPokemon);
    }
}

// Cria elemento de Pokémon para a batalha
function renderPokemonElement(element, pokemon) {
    element.innerHTML = `
        <div class="pokemon-name">${pokemon.name}</div>
        <div class="pokemon-type ${pokemon.type}">${pokemon.type}</div>
        <div class="hp-bar">
            <div class="hp-fill" style="width: ${(pokemon.hp / pokemon.maxHp) * 100}%"></div>
            <div class="hp-text">HP: ${pokemon.hp}/${pokemon.maxHp}</div>
        </div>
    `;
}

// Seleciona Pokémons para a batalha
function selectBattlePokemons() {
    // Seleciona o primeiro Pokémon disponível de cada time
    currentPlayerPokemon = selectedPokemons.find(p => p.hp > 0);
    currentEnemyPokemon = enemyPokemons.find(p => p.hp > 0);
    
    if (!currentPlayerPokemon || !currentEnemyPokemon) {
        endBattle();
        return;
    }
    
    renderBattleTeams();
    renderBattleActions();
    
    if (!playerTurn) {
        enemyTurn();
    }
}

// Renderiza as ações de batalha
function renderBattleActions() {
    battleActions.innerHTML = '';
    
    if (!playerTurn) return;
    
    currentPlayerPokemon.moves.forEach((move, index) => {
        const button = document.createElement('button');
        button.textContent = move.name;
        button.addEventListener('click', () => performMove(index));
        battleActions.appendChild(button);
    });
}

// Executa um movimento
function performMove(moveIndex) {
    if (!playerTurn || !currentPlayerPokemon || !currentEnemyPokemon) return;
    
    const move = currentPlayerPokemon.moves[moveIndex];
    const isCritical = Math.random() * 100 < currentPlayerPokemon.criticalRate;
    
    // Executa o movimento
    executeMove(currentPlayerPokemon, currentEnemyPokemon, move, isCritical);
    
    // Verifica se o inimigo foi derrotado
    if (currentEnemyPokemon.hp <= 0) {
        addToBattleLog(`${currentEnemyPokemon.name} foi derrotado!`);
        playerTurn = true;
        selectBattlePokemons();
        return;
    }
    
    // Turno do inimigo
    playerTurn = false;
    setTimeout(enemyTurn, 1500);
}

// Turno do inimigo
function enemyTurn() {
    if (!currentEnemyPokemon || !currentPlayerPokemon) return;
    
    // Escolhe um movimento aleatório (prioriza ataques)
    const possibleMoves = currentEnemyPokemon.moves;
    const attackMoves = possibleMoves.filter(m => m.type === 'special' || m.type === 'physical');
    const move = attackMoves.length > 0 && Math.random() > 0.3 ? 
        attackMoves[Math.floor(Math.random() * attackMoves.length)] : 
        possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
    
    const isCritical = Math.random() * 100 < currentEnemyPokemon.criticalRate;
    
    // Executa o movimento
    executeMove(currentEnemyPokemon, currentPlayerPokemon, move, isCritical);
    
    // Verifica se o jogador foi derrotado
    if (currentPlayerPokemon.hp <= 0) {
        addToBattleLog(`${currentPlayerPokemon.name} foi derrotado!`);
    }
    
    // Volta o turno para o jogador
    playerTurn = true;
    selectBattlePokemons();
}

// Executa um movimento
function executeMove(attacker, defender, move, isCritical) {
    let message = `${attacker.name} usou ${move.name}`;
    
    switch (move.type) {
        case 'special':
        case 'physical':
            const damage = calculateDamage(attacker, defender, move, isCritical);
            if (damage > 0) {
                defender.hp = Math.max(0, defender.hp - damage);
                message += ` e causou ${damage} de dano${isCritical ? " (CRÍTICO!)" : ""}!`;
            } else {
                message += " mas errou!";
            }
            break;
            
        case 'heal':
            const healAmount = Math.min(attacker.maxHp - attacker.hp, move.amount);
            attacker.hp += healAmount;
            message += ` e recuperou ${healAmount} de HP!`;
            attacker.hpElement.classList.add('healing');
            setTimeout(() => attacker.hpElement.classList.remove('healing'), 500);
            break;
            
        case 'buff':
            attacker[move.stat] += move.amount;
            message += ` e aumentou seu ${move.stat.toUpperCase()} em ${move.amount}!`;
            break;
    }
    
    addToBattleLog(message);
    renderBattleTeams();
    renderTeamStatus();
}

// Calcula o dano de um ataque
function calculateDamage(attacker, defender, move, isCritical) {
    // Verifica se o ataque acerta
    if (Math.random() * 100 > move.accuracy) {
        return 0;
    }
    
    let damage;
    if (move.type === 'special') {
        damage = Math.floor((move.power * (attacker.speed / 100)) - (defender.defense / 4));
    } else { // physical
        damage = Math.floor((move.power * (attacker.attack / 80)) - (defender.defense / 4));
    }
    
    // Aplica crítico
    if (isCritical) {
        damage = Math.floor(damage * 1.5);
    }
    
    // Garante um dano mínimo de 1
    damage = Math.max(1, damage);
    
    return damage;
}

// Renderiza o status dos times
function renderTeamStatus() {
    playerTeamStatus.innerHTML = '';
    enemyTeamStatus.innerHTML = '';
    
    selectedPokemons.forEach(pokemon => {
        const element = document.createElement('div');
        element.className = `team-pokemon ${pokemon.hp <= 0 ? 'fainted' : ''}`;
        element.textContent = pokemon.name.substring(0, 3);
        element.title = `${pokemon.name} (HP: ${pokemon.hp}/${pokemon.maxHp})`;
        playerTeamStatus.appendChild(element);
    });
    
    enemyPokemons.forEach(pokemon => {
        const element = document.createElement('div');
        element.className = `team-pokemon ${pokemon.hp <= 0 ? 'fainted' : ''}`;
        element.textContent = pokemon.name.substring(0, 3);
        element.title = `${pokemon.name} (HP: ${pokemon.hp}/${pokemon.maxHp})`;
        enemyTeamStatus.appendChild(element);
    });
}

// Adiciona mensagem ao log de batalha
function addToBattleLog(message) {
    battleLog.push(message);
    if (battleLog.length > 6) battleLog.shift();
    
    battleLogElement.innerHTML = battleLog.map(msg => {
        if (msg.includes("CRÍTICO")) {
            return `<div class="critical">${msg}</div>`;
        }
        return `<div>${msg}</div>`;
    }).join('');
    battleLogElement.scrollTop = battleLogElement.scrollHeight;
}

// Termina a batalha
function endBattle() {
    if (selectedPokemons.every(p => p.hp <= 0)) {
        addToBattleLog("Seu time foi derrotado!");
    } else if (enemyPokemons.every(p => p.hp <= 0)) {
        addToBattleLog("Você derrotou todos os Pokémons inimigos!");
    }
    
    battleActions.innerHTML = '';
}

// Reseta a batalha
function resetBattle() {
    // Volta para a tela de seleção
    battleScreen.style.display = 'none';
    selectionScreen.style.display = 'block';
    
    // Reseta as variáveis
    selectedPokemons = [];
    battleLog = [];
    playerTurn = true;
    
    // Atualiza a interface
    updateSelectedTeam();
    battleButton.disabled = true;
    battleLogElement.innerHTML = '';
}

// Inicia o jogo quando a página carrega
window.addEventListener('DOMContentLoaded', initGame);