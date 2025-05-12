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
book-recommendation - Get a random book from my reading list`;
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
        resume: () => {
            window.open('references/pdfs/Nicholas_Ramirez_Resume.pdf', '_blank');
            return 'Opening resume in new tab...';
        }
    };

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
            const input = terminalInput.value.trim().toLowerCase();
            
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
        commandElement.innerHTML = `<span class="terminal-prompt">nicholas@portfolio:~$</span> ${command}`;
        terminalHistory.appendChild(commandElement);

        if (output) {
            const outputElement = document.createElement('div');
            outputElement.className = 'command-output';
            outputElement.textContent = output;
            terminalHistory.appendChild(outputElement);
        }

        terminalHistory.scrollTop = terminalHistory.scrollHeight;
    }

    function processCommand(command) {
        command = command.trim().toLowerCase();
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