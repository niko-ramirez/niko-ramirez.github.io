document.addEventListener('DOMContentLoaded', () => {
    const terminalInput = document.getElementById('terminal-input');
    const terminalHistory = document.getElementById('terminal-history');
    let commandHistory = [];
    let historyIndex = -1;

    const bookshelf = [
        {
            title: "Platform Engineering",
            author: "Camille Fournier & Ian Nowland",
            category: "Computer Science & Engineering",
            description: "A Guide for Technical, Product, and People Leaders.",
            status: "In Progress"
        },
        {
            title: "East of Eden",
            author: "John Steinbeck",
            category: "Leisure Reading",
            description: "Multi-generational retelling of the biblical story of Cain and Abel.",
            status: "In Progress"
        },
        {
            title: "The Psychology of Money",
            author: "Morgan Housel",
            category: "Leisure Reading",
            description: "A collection of essays on the psychology of money and the role it plays in our lives.",
            status: "Completed"
        },
        {
            title: "The Hard Thing about Hard Things",
            author: "Ben Horowitz",
            category: "Leisure Reading",
            description: "Building a business when there are no easy answers.",
            status: "Completed"
        }
    ];

    const commands = {
        help: () => {
            return `Available commands:
help - Show this help message
about - Learn about Nicholas
projects - View my projects
education - See my educational background
blog - Read my blog posts
travel - Check out my travel map
clear - Clear the terminal
contact - Get my contact information
skills - View my technical skills
experience - See my work experience
resume - Download my resume
book-recommendation - Get a random book from my reading list
snake - Play a simple snake game`;
        },
        about: () => {
            window.location.href = 'about';
            return 'Navigating to About page...';
        },
        projects: () => {
            window.location.href = 'projects';
            return 'Navigating to Projects page...';
        },
        education: () => {
            window.location.href = 'education';
            return 'Navigating to Education page...';
        },
        blog: () => {
            window.location.href = 'blog';
            return 'Navigating to Blog page...';
        },
        travel: () => {
            window.location.href = 'travel';
            return 'Navigating to Travel page...';
        },
        clear: () => {
            terminalHistory.innerHTML = '';
            return '';
        },
        contact: () => {
            return `Contact Information:
------------------
Email: nicholas.ray.ramirez@gmail.com
LinkedIn: https://www.linkedin.com/in/nicholas-ramirez-46b302191/
GitHub: https://github.com/niko-ramirez`;
        },
        skills: () => {
            return `Technical Skills:
----------------
- Machine Learning
- Software Engineering
- Knowledge Graphs
- Federated Learning
- Differential Privacy
- Python
- JavaScript
- TypeScript
- React
- Node.js
- TensorFlow
- PyTorch
- Git
- Docker
- AWS

Type 'experience' to see how I've applied these skills in my work.`;
        },
        experience: () => {
            return `Professional Journey:
------------------
1. Plaid (2023 - Present)
   Software Engineer on the Infrastructure team
   - Architecting and maintaining scalable solutions
   - Working with Kubernetes and AWS

2. MIT CSAIL (2022 - 2023)
   Research Assistant in the Decentralized Information Group
   - Knowledge Graph Completion with Differential Privacy
   - Federated Learning Research

3. MIT Teaching Assistant (2020 - 2023)
   - 6.101 (Fundamentals of Programming)
   - 6.390 (Intro to Machine Learning)
   - Guiding students through core programming concepts
   - Emphasizing clean code practices and problem-solving

4. MIT Space Systems Laboratory (2018 - 2019)
   Undergraduate Researcher
   - Conducted thermal code testing for the WaferSat satellite-on-a-chip

Type 'projects' to learn more about specific projects I've worked on.`;
        },
        'book-recommendation': () => {
            const availableBooks = [...bookshelf];
            const randomIndex = Math.floor(Math.random() * availableBooks.length);
            const randomBook = availableBooks[randomIndex];
            return `📚 Book Recommendation:
------------------
Title: ${randomBook.title}
Author: ${randomBook.author}
Category: ${randomBook.category}
Status: ${randomBook.status}
Description: ${randomBook.description}

Type 'book-recommendation' again for another recommendation!`;
        },
        snake: () => {
            // Create a simple game container
            const gameContainer = document.createElement('div');
            gameContainer.style.width = '200px';
            gameContainer.style.height = '200px';
            gameContainer.style.backgroundColor = '#1a1a1a';
            gameContainer.style.border = '1px solid #333';
            gameContainer.style.margin = '10px 0';
            gameContainer.tabIndex = 0; // Make container focusable
            
            // Create a simple grid
            const grid = document.createElement('div');
            grid.style.display = 'grid';
            grid.style.gridTemplateColumns = 'repeat(10, 1fr)';
            grid.style.gridTemplateRows = 'repeat(10, 1fr)';
            grid.style.gap = '1px';
            grid.style.width = '100%';
            grid.style.height = '100%';
            
            // Create cells with optimized styling
            const cells = [];
            const cellStyles = {
                empty: '#2a2a2a',
                snake: '#00cc00',
                head: '#00ff00',
                food: '#ff0000'
            };
            
            for (let i = 0; i < 100; i++) {
                const cell = document.createElement('div');
                cell.style.backgroundColor = cellStyles.empty;
                grid.appendChild(cell);
                cells.push(cell);
            }
            
            // Add grid to container
            gameContainer.appendChild(grid);
            
            // Add container to terminal history
            const gameElement = document.createElement('div');
            gameElement.className = 'command-output';
            gameElement.appendChild(gameContainer);
            terminalHistory.appendChild(gameElement);

            // Game state
            let snake = [{x: 5, y: 5}]; // Start in middle
            let direction = null; // No initial direction
            let nextDirection = null; // No initial direction
            let gameLoop;
            let isGameActive = true;
            let isPaused = true; // Start paused
            let score = 0;
            let food = null;
            let lastUpdate = 0;
            const updateInterval = 150; // Faster update interval
            let hasStarted = false; // Track if game has started

            // Create score display
            const scoreDisplay = document.createElement('div');
            scoreDisplay.style.color = '#fff';
            scoreDisplay.style.fontFamily = 'monospace';
            scoreDisplay.style.marginBottom = '10px';
            scoreDisplay.textContent = 'Score: 0';
            gameElement.insertBefore(scoreDisplay, gameContainer);

            function generateFood() {
                let newFood;
                do {
                    newFood = {
                        x: Math.floor(Math.random() * 10),
                        y: Math.floor(Math.random() * 10)
                    };
                } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
                food = newFood;
            }

            // Update game state
            function updateGame(timestamp) {
                if (!isGameActive || isPaused || !hasStarted) {
                    requestAnimationFrame(updateGame);
                    return;
                }

                // Throttle updates
                if (timestamp - lastUpdate < updateInterval) {
                    requestAnimationFrame(updateGame);
                    return;
                }
                lastUpdate = timestamp;

                // Update direction from buffer
                direction = nextDirection;

                // Move snake
                const head = {...snake[0]};
                switch(direction) {
                    case 'up': head.y--; break;
                    case 'down': head.y++; break;
                    case 'left': head.x--; break;
                    case 'right': head.x++; break;
                }

                // Check boundaries
                if (head.x < 0 || head.x >= 10 || head.y < 0 || head.y >= 10) {
                    gameOver();
                    return;
                }

                // Check self collision
                if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
                    gameOver();
                    return;
                }

                // Update snake position
                snake.unshift(head);

                // Check if food is eaten
                if (food && head.x === food.x && head.y === food.y) {
                    score += 10;
                    scoreDisplay.textContent = `Score: ${score}`;
                    generateFood();
                } else {
                    snake.pop();
                }

                // Optimize drawing by only updating changed cells
                const newPositions = new Set();
                
                // Draw snake
                snake.forEach((segment, index) => {
                    const cellIndex = segment.y * 10 + segment.x;
                    if (cellIndex >= 0 && cellIndex < cells.length) {
                        cells[cellIndex].style.backgroundColor = index === 0 ? cellStyles.head : cellStyles.snake;
                        newPositions.add(cellIndex);
                    }
                });

                // Draw food
                if (food) {
                    const foodIndex = food.y * 10 + food.x;
                    cells[foodIndex].style.backgroundColor = cellStyles.food;
                    newPositions.add(foodIndex);
                }

                // Clear only cells that aren't part of the new state
                cells.forEach((cell, index) => {
                    if (!newPositions.has(index)) {
                        cell.style.backgroundColor = cellStyles.empty;
                    }
                });

                requestAnimationFrame(updateGame);
            }

            function gameOver() {
                isGameActive = false;
                
                // Create game over container
                const gameOverContainer = document.createElement('div');
                gameOverContainer.style.position = 'absolute';
                gameOverContainer.style.top = '50%';
                gameOverContainer.style.left = '50%';
                gameOverContainer.style.transform = 'translate(-50%, -50%)';
                gameOverContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
                gameOverContainer.style.padding = '20px';
                gameOverContainer.style.borderRadius = '10px';
                gameOverContainer.style.textAlign = 'center';
                gameOverContainer.style.zIndex = '1000';
                gameContainer.style.position = 'relative';
                gameContainer.appendChild(gameOverContainer);

                // Add game over text with animation
                const gameOverText = document.createElement('div');
                gameOverText.style.color = '#ff0000';
                gameOverText.style.fontFamily = 'monospace';
                gameOverText.style.fontSize = '24px';
                gameOverText.style.marginBottom = '10px';
                gameOverText.style.textShadow = '0 0 10px #ff0000';
                gameOverText.textContent = 'GAME OVER';
                gameOverContainer.appendChild(gameOverText);

                // Add score display
                const finalScore = document.createElement('div');
                finalScore.style.color = '#fff';
                finalScore.style.fontFamily = 'monospace';
                finalScore.style.fontSize = '18px';
                finalScore.style.marginBottom = '15px';
                finalScore.textContent = `Final Score: ${score}`;
                gameOverContainer.appendChild(finalScore);

                // Add restart button
                const restartButton = document.createElement('button');
                restartButton.textContent = 'Play Again';
                restartButton.style.backgroundColor = '#00cc00';
                restartButton.style.color = '#fff';
                restartButton.style.border = 'none';
                restartButton.style.padding = '10px 20px';
                restartButton.style.borderRadius = '5px';
                restartButton.style.cursor = 'pointer';
                restartButton.style.fontFamily = 'monospace';
                restartButton.style.fontSize = '16px';
                restartButton.style.transition = 'all 0.3s ease';
                restartButton.style.marginRight = '10px';
                
                // Add hover effect
                restartButton.onmouseover = () => {
                    restartButton.style.backgroundColor = '#00ff00';
                    restartButton.style.transform = 'scale(1.1)';
                };
                restartButton.onmouseout = () => {
                    restartButton.style.backgroundColor = '#00cc00';
                    restartButton.style.transform = 'scale(1)';
                };
                
                // Add click handler
                restartButton.onclick = () => {
                    gameContainer.remove();
                    commands.snake();
                };
                
                gameOverContainer.appendChild(restartButton);

                // Add close button
                const closeButton = document.createElement('button');
                closeButton.textContent = 'Close Game';
                closeButton.style.backgroundColor = '#ff4444';
                closeButton.style.color = '#fff';
                closeButton.style.border = 'none';
                closeButton.style.padding = '10px 20px';
                closeButton.style.borderRadius = '5px';
                closeButton.style.cursor = 'pointer';
                closeButton.style.fontFamily = 'monospace';
                closeButton.style.fontSize = '16px';
                closeButton.style.transition = 'all 0.3s ease';
                
                // Add hover effect
                closeButton.onmouseover = () => {
                    closeButton.style.backgroundColor = '#ff6666';
                    closeButton.style.transform = 'scale(1.1)';
                };
                closeButton.onmouseout = () => {
                    closeButton.style.backgroundColor = '#ff4444';
                    closeButton.style.transform = 'scale(1)';
                };
                
                // Add click handler
                closeButton.onclick = () => {
                    gameContainer.remove();
                };
                
                gameOverContainer.appendChild(closeButton);

                // Animate the snake's death
                const cells = grid.children;
                let flashCount = 0;
                const maxFlashes = 3;
                const flashInterval = 200;

                function flashSnake() {
                    if (flashCount >= maxFlashes) {
                        // Final state - turn snake red
                        snake.forEach(segment => {
                            const cellIndex = segment.y * 10 + segment.x;
                            if (cellIndex >= 0 && cellIndex < cells.length) {
                                cells[cellIndex].style.backgroundColor = '#ff0000';
                            }
                        });
                        return;
                    }

                    // Flash between red and original colors
                    snake.forEach((segment, index) => {
                        const cellIndex = segment.y * 10 + segment.x;
                        if (cellIndex >= 0 && cellIndex < cells.length) {
                            cells[cellIndex].style.backgroundColor = 
                                cells[cellIndex].style.backgroundColor === '#ff0000' 
                                    ? (index === 0 ? cellStyles.head : cellStyles.snake)
                                    : '#ff0000';
                        }
                    });

                    flashCount++;
                    setTimeout(flashSnake, flashInterval);
                }

                // Start the death animation
                flashSnake();
            }
            
            // Simple keyboard handler
            const handleKeyDown = (e) => {
                if (!isGameActive) return;

                if (e.key === 'Escape') {
                    isGameActive = false;
                    gameContainer.remove();
                    document.removeEventListener('keydown', handleKeyDown);
                    return;
                }

                if (e.key === ' ') { // Space bar
                    isPaused = !isPaused;
                    e.preventDefault();
                    return;
                }
                
                // Update direction based on key press
                switch(e.key) {
                    case 'ArrowUp':
                        if (direction !== 'down') {
                            nextDirection = 'up';
                            if (!hasStarted) {
                                hasStarted = true;
                                isPaused = false;
                            }
                        }
                        e.preventDefault();
                        break;
                    case 'ArrowDown':
                        if (direction !== 'up') {
                            nextDirection = 'down';
                            if (!hasStarted) {
                                hasStarted = true;
                                isPaused = false;
                            }
                        }
                        e.preventDefault();
                        break;
                    case 'ArrowLeft':
                        if (direction !== 'right') {
                            nextDirection = 'left';
                            if (!hasStarted) {
                                hasStarted = true;
                                isPaused = false;
                            }
                        }
                        e.preventDefault();
                        break;
                    case 'ArrowRight':
                        if (direction !== 'left') {
                            nextDirection = 'right';
                            if (!hasStarted) {
                                hasStarted = true;
                                isPaused = false;
                            }
                        }
                        e.preventDefault();
                        break;
                }
            };
            
            // Add keyboard listener
            document.addEventListener('keydown', handleKeyDown);
            
            // Generate initial food
            generateFood();

            // Draw initial snake
            snake.forEach((segment, index) => {
                const cellIndex = segment.y * 10 + segment.x;
                cells[cellIndex].style.backgroundColor = index === 0 ? cellStyles.head : cellStyles.snake;
            });
            
            // Start game loop using requestAnimationFrame
            requestAnimationFrame(updateGame);

            // Add instructions
            const instructions = document.createElement('div');
            instructions.style.marginTop = '10px';
            instructions.style.color = '#fff';
            instructions.style.fontFamily = 'monospace';
            instructions.textContent = 'Click the game to focus. Use arrow keys to start moving. Press Space to pause. Press Escape to exit.';
            gameElement.appendChild(instructions);
            
            return "Snake game started! Click the game to focus. Use arrow keys to start moving. Press Space to pause. Press Escape to exit.";
        },
        resume: () => {
            window.open('references/pdfs/Nicholas_Ramirez_Resume.pdf', '_blank');
            return 'Opening resume in new tab...';
        }
    };

    // Sanitize input to prevent XSS
    function sanitizeInput(input) {
        return input.replace(/[<>]/g, '');
    }

    // Validate URLs before navigation
    function isValidUrl(url) {
        const allowedDomains = [
            'about',
            'projects',
            'education',
            'blog',
            'travel',
            'references/pdfs/Nicholas_Ramirez_Resume.pdf'
        ];
        return allowedDomains.some(domain => url.startsWith(domain));
    }

    // Get all available commands for tab completion
    const availableCommands = Object.keys(commands);

    // Function to find matching commands
    function findMatchingCommands(input) {
        return availableCommands.filter(cmd => cmd.startsWith(input.toLowerCase()));
    }

    // Function to handle tab completion
    function handleTabCompletion(e) {
        if (e.key === 'Tab') {
            e.preventDefault();
            const input = sanitizeInput(terminalInput.value.trim().toLowerCase());
            
            if (input === '') {
                return;
            }

            const matches = findMatchingCommands(input);
            
            if (matches.length === 1) {
                // If there's exactly one match, complete it
                terminalInput.value = matches[0];
            } else if (matches.length > 1) {
                // If there are multiple matches, show them all
                const output = `Available completions:\n${matches.join('\n')}`;
                addToHistory('', output);
            }
        }
    }

    // Add tab completion event listener
    terminalInput.addEventListener('keydown', handleTabCompletion);

    function addToHistory(command, output) {
        const commandElement = document.createElement('div');
        // Sanitize the command before displaying
        const sanitizedCommand = sanitizeInput(command);
        commandElement.innerHTML = `<span class="terminal-prompt">nicholas@portfolio:~$</span> ${sanitizedCommand}`;
        terminalHistory.appendChild(commandElement);

        if (output) {
            const outputElement = document.createElement('div');
            outputElement.className = 'command-output';
            // Sanitize the output before displaying
            outputElement.textContent = output;
            terminalHistory.appendChild(outputElement);
        }

        terminalHistory.scrollTop = terminalHistory.scrollHeight;
    }

    function processCommand(command) {
        command = sanitizeInput(command.trim().toLowerCase());
        commandHistory.push(command);
        historyIndex = commandHistory.length;

        if (command === '') {
            return;
        }

        const [cmd, ...args] = command.split(' ');

        if (commands[cmd]) {
            const output = commands[cmd](...args);
            addToHistory(command, output);
        } else {
            addToHistory(command, `Command not found: ${command}. Type 'help' for available commands.`);
        }
    }

    // Override the navigation commands to include URL validation
    const originalCommands = { ...commands };
    commands.about = () => {
        if (isValidUrl('about')) {
            window.location.href = 'about';
            return 'Navigating to About page...';
        }
        return 'Invalid navigation attempt';
    };
    commands.projects = () => {
        if (isValidUrl('projects')) {
            window.location.href = 'projects';
            return 'Navigating to Projects page...';
        }
        return 'Invalid navigation attempt';
    };
    commands.education = () => {
        if (isValidUrl('education')) {
            window.location.href = 'education';
            return 'Navigating to Education page...';
        }
        return 'Invalid navigation attempt';
    };
    commands.blog = () => {
        if (isValidUrl('blog')) {
            window.location.href = 'blog';
            return 'Navigating to Blog page...';
        }
        return 'Invalid navigation attempt';
    };
    commands.travel = () => {
        if (isValidUrl('travel')) {
            window.location.href = 'travel';
            return 'Navigating to Travel page...';
        }
        return 'Invalid navigation attempt';
    };
    commands.resume = () => {
        if (isValidUrl('references/pdfs/Nicholas_Ramirez_Resume.pdf')) {
            window.open('references/pdfs/Nicholas_Ramirez_Resume.pdf', '_blank');
            return 'Opening resume in new tab...';
        }
        return 'Invalid file access attempt';
    };

    // Add main terminal input handler
    terminalInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const command = terminalInput.value;
            processCommand(command);
            terminalInput.value = '';
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (historyIndex > 0) {
                historyIndex--;
                terminalInput.value = commandHistory[historyIndex];
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                terminalInput.value = commandHistory[historyIndex];
            } else {
                historyIndex = commandHistory.length;
                terminalInput.value = '';
            }
        }
    });

    // Initial help message
    processCommand('help');
}); 