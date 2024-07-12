(function () {
    let FPS = 10;
    const SIZE = 40;
    const TEMPORARY_SPEED_DURATION = 5000;
    const CRAZY_DURATION = 900;

    let board;
    let apple;
    let snake;
    let potionedApple;
    let speedPineapple;
    let blueberry;
    let gameInterval;
    let isPaused = false;
    let score = 0;
    let frameCount = 0;
    let gameOver = false;

    function createMenu() {
        const menu = document.createElement('div');
        menu.id = 'menu';
    
        const startButton = document.createElement('button');
        startButton.id = 'startButton';
        startButton.textContent = 'Start Game';
        startButton.addEventListener('click', init);
        menu.appendChild(startButton);
    
        const fruits = [
            { id: 'appleCheckbox', label: 'Apple', checked: true, description: 'Aumenta a pontuação em 2.' },
            { id: 'potionAppleCheckbox', label: 'Potion Apple', checked: false, description: 'Diminui a pontuação em 2, e a cobra tem um mal-estar e fica mais lenta.' },
            { id: 'speedPineappleCheckbox', label: 'Speed Pineapple', checked: false, description: 'Aumenta a pontuação em 3, e a cobra fica mais rápida!' },
            { id: 'crazyBlueberryCheckbox', label: 'Crazy Blueberry', checked: false, description: 'Aumenta a pontuação em 10, mas a cobra tem recordações alucinantes do seu passado e isso pode te atordoar!.' }
        ];


        fruits.forEach(fruit => {
            const div = document.createElement('div');
            div.className = 'fruit-option';
    
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = fruit.id;
            checkbox.checked = fruit.checked;
    
            const label = document.createElement('label');
            label.htmlFor = fruit.id;
            label.textContent = fruit.label;
    
            const description = document.createElement('p');
            description.className = 'fruit-description';
            description.textContent = fruit.description;
    
            div.appendChild(checkbox);
            div.appendChild(label);
            div.appendChild(description);
            menu.appendChild(div);
        });
    
        document.body.appendChild(menu);

    }

    function createGameContainer() {
        const gameContainer = document.createElement('div');
        gameContainer.id = 'gameContainer';
        document.body.appendChild(gameContainer);

        const scoreContainer = document.createElement('div');
        scoreContainer.id = 'scoreContainer';
        scoreContainer.textContent = 'Score: 0';
        document.body.appendChild(scoreContainer);
    }

    function init() {
        // Limpa o jogo anterior
        clearInterval(gameInterval);
        if (board && board.element) {
            document.getElementById('gameContainer').removeChild(board.element);
        }

        // Limpa a mensagem de game over
        hideGameOverMessage();

        // Inicializa a pontuação
        score = 0;
        updateScore();
        gameOver = false;

        // Cria o novo tabuleiro e a cobra
        board = new Board(SIZE);
        document.getElementById('gameContainer').appendChild(board.element);
        snake = new Snake([[4, 4], [4, 5], [4, 6]]);

        // Cria as frutas
        if (document.getElementById('appleCheckbox').checked) {
            apple = new Apple(board, snake);
        }
        if (document.getElementById('potionAppleCheckbox').checked) {
            potionedApple = new PotionApple(board, snake);
        }
        if (document.getElementById('speedPineappleCheckbox').checked) {
            speedPineapple = new SpeedPineapple(board, snake);
        }
        if (document.getElementById('crazyBlueberryCheckbox').checked) {
            blueberry = new CrazyBlueberry(board, snake);
        }

        // Inicia o intervalo do jogo
        gameInterval = setInterval(run, 1000 / FPS);
    }

    function updateScore() {
        document.getElementById('scoreContainer').textContent = `Score: ${score}`;
    }

    window.addEventListener("keydown", (e) => {
        if (gameOver && (e.key === "Enter" || e.key === "s")) {
            init();
            document.getElementById('popup').style.display = 'none';
            return;
        }

        switch (e.key) {
            case "ArrowUp":
                if (snake.direction !== 2) {
                    snake.changeDirection(0);
                }
                break;
            case "ArrowRight":
                if (snake.direction !== 3) {
                    snake.changeDirection(1);
                }
                break;
            case "ArrowDown":
                if (snake.direction !== 0) {
                    snake.changeDirection(2);
                }
                break;
            case "ArrowLeft":
                if (snake.direction !== 1) {
                    snake.changeDirection(3);
                }
                break;
            case "s":
                if (!gameInterval) {
                    init();
                }
                break;
            case "p":
                if (isPaused) {
                    gameInterval = setInterval(run, 1000 / FPS);
                } else {
                    clearInterval(gameInterval);
                }
                isPaused = !isPaused;
                break;
            default:
                break;
        }
    });

    class Board {
        constructor(size) {
            this.element = document.createElement("table");
            this.element.setAttribute("id", "board");
            this.color = "#ccc";
            for (let i = 0; i < size; i++) {
                const row = document.createElement("tr");
                this.element.appendChild(row);
                for (let j = 0; j < size; j++) {
                    const field = document.createElement("td");
                    row.appendChild(field);
                }
            }
        }
    }

    class Snake {
        constructor(body) {
            this.body = body;
            this.color = "#222";
            this.direction = 1; // 0 para cima, 1 para direita, 2 para baixo, 3 para esquerda
            this.body.forEach(field => document.querySelector(`#board tr:nth-child(${field[0] + 1}) td:nth-child(${field[1] + 1})`).style.backgroundColor = this.color);
        }

        walk() {
            const head = this.body[this.body.length - 1];
            let newHead;
            switch (this.direction) {
                case 0:
                    newHead = [head[0] - 1, head[1]];
                    break;
                case 1:
                    newHead = [head[0], head[1] + 1];
                    break;
                case 2:
                    newHead = [head[0] + 1, head[1]];
                    break;
                case 3:
                    newHead = [head[0], head[1] - 1];
                    break;
                default:
                    break;
            }

            // Checa e come as frutas
            if (apple && this.checkAndEatApple(newHead)) {
                this.body.push(newHead);
                playAteSound();
                recoverySpeed(); 
                score += 2; 
                updateScore();
            } else if (potionedApple && this.checkAndEatPotionApple(newHead)) {
                this.body.push(newHead); 
                decreaseSpeed(); 
                playAteSound();
                score -= 2; 
                updateScore();
            } else if (speedPineapple && this.checkAndEatSpeedPineapple(newHead)) {
                this.body.push(newHead);
                increaseSpeed();
                playAteSound();
                score += 3;
                updateScore();
            } else if (blueberry && this.checkAndEatBlueberry(newHead)) {
                this.body.push(newHead);
                playAteSound();
                crazy();
                score += 10; 
                updateScore();
            } else {
                this.body.push(newHead);
                const oldTail = this.body.shift();
                document.querySelector(`#board tr:nth-child(${newHead[0] + 1}) td:nth-child(${newHead[1] + 1})`).style.backgroundColor = this.color;
                document.querySelector(`#board tr:nth-child(${oldTail[0] + 1}) td:nth-child(${oldTail[1] + 1})`).style.backgroundColor = board.color;
            }
        }

        changeDirection(direction) {
            this.direction = direction;
        }

        checkAndEatApple(newHead) {
            if (newHead[0] === apple.position[0] && newHead[1] === apple.position[1]) {
                apple.spawn();
                apple.draw();
                return true; 
            }
            return false; 
        }

        checkAndEatPotionApple(newHead) {
            if (newHead[0] === potionedApple.position[0] && newHead[1] === potionedApple.position[1]) {
                potionedApple.spawn();
                potionedApple.draw();
                return true;
            }
            return false; 
        }

        checkAndEatSpeedPineapple(newHead) {
            if (newHead[0] === speedPineapple.position[0] && newHead[1] === speedPineapple.position[1]) {
                speedPineapple.spawn();
                speedPineapple.draw();
                return true;
            }
            return false; 
        }

        checkAndEatBlueberry(newHead) {
            if (newHead[0] === blueberry.position[0] && newHead[1] === blueberry.position[1]) {
                blueberry.spawn();
                blueberry.draw();
                return true;
            }
            return false; 
        }

        checkCollision(newHead) {
            // Verifica colisão com a parede
            if (newHead[0] < 0 || newHead[0] >= SIZE || newHead[1] < 0 || newHead[1] >= SIZE) {
                return true;
            }
            // Verifica colisão com o próprio corpo
            return this.body.some(segment => segment[0] === newHead[0] && segment[1] === newHead[1]);
        }
    }

    function run() {
        const head = snake.body[snake.body.length - 1];
        let newHead;
        switch (snake.direction) {
            case 0:
                newHead = [head[0] - 1, head[1]];
                break;
            case 1:
                newHead = [head[0], head[1] + 1];
                break;
            case 2:
                newHead = [head[0] + 1, head[1]];
                break;
            case 3:
                newHead = [head[0], head[1] - 1];
                break;
            default:
                break;
        }
        frameCount++;
        if (snake.checkCollision(newHead)) {
            clearInterval(gameInterval);
            gameOver = true;
            playGameOverSound();
            showGameOverMessage();
            return;
        }
        if (frameCount % 60 === 0) {
            increaseSpeedPerGameTime();
        }

        snake.walk();
    }

    class Apple {
        constructor(board, snake) {
            this.board = board;
            this.snake = snake;
            this.color = "red";
            this.spawn();
            this.draw();
        }

        spawn() {
            let newPosition;
            do {
                newPosition = [
                    Math.floor(Math.random() * SIZE),
                    Math.floor(Math.random() * SIZE),
                ];
            } while (this.snake.body.some(field => field[0] === newPosition[0] && field[1] === newPosition[1]));
            this.position = newPosition;
        }

        draw() {
            document.querySelector(`#board tr:nth-child(${this.position[0] + 1}) td:nth-child(${this.position[1] + 1})`).style.backgroundColor = this.color;
        }
    }

    class PotionApple extends Apple {
        constructor(board, snake) {
            super(board, snake);
            this.color = "green";
            this.draw()
        }
    }

    class SpeedPineapple extends Apple {
        constructor(board, snake) {
            super(board, snake);
            this.color = "yellow";
            this.draw()
        }
    }

    class CrazyBlueberry extends Apple {
        constructor(board, snake) {
            super(board, snake);
            this.color = "blue";
            this.draw()
        }
    }

    function increaseSpeedPerGameTime(){
        clearInterval(gameInterval);
        FPS+=1;
        gameInterval = setInterval(run, 1000 / FPS);
    }

    function increaseSpeed() {
        clearInterval(gameInterval);
        gameInterval = setInterval(run, 1000 / (FPS * 2)); 
        setTimeout(recoverySpeed, TEMPORARY_SPEED_DURATION);
    }


    function decreaseSpeed() {
        clearInterval(gameInterval);
        gameInterval = setInterval(run, 1000 / (FPS / 2)); 
        setTimeout(recoverySpeed, TEMPORARY_SPEED_DURATION);
    }

    function recoverySpeed() {
        clearInterval(gameInterval);
        gameInterval = setInterval(run, 1000 / FPS); 
    }

    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    function crazy() {
        crazyInterval = setInterval(() => {
            board.element.style.backgroundColor = getRandomColor();
        }, 100);
  
        setTimeout(() => {
            clearInterval(crazyInterval);
            board.element.style.backgroundColor = board.color;
        }, CRAZY_DURATION);
    }

    function showGameOverMessage() {
        const popup = document.createElement('div');
        popup.id = 'popup';
        popup.textContent = 'Game Over!';
        document.body.appendChild(popup);
    }

    function hideGameOverMessage() {
        const popup = document.getElementById('popup');
        if (popup) {
            document.body.removeChild(popup);
        }
    }
    
    function playAteSound(){
        const audio = document.getElementById("audio");
        audio.src = "src/ate.wav";
        audio.play();
    }

    function playGameOverSound(){
        const audio = document.getElementById("audio")
        audio.src = "src/gameOver.wav";
        audio.play();
    }

    createMenu();
    createGameContainer();
})();
