// This renders when DOMContentLoaded works or when DOM has fully loaded
window.addEventListener('DOMContentLoaded', function() {
    let squares = document.querySelectorAll('#board div'); // Selects all divs with id board
    let currentPlayer = 'X'; 
    let gameState = Array(9).fill(null); 
    let gameActive = true; // Game is ongoing

    // Place X or O on the square when a square is clicked
    function onMouseClick(square) {
        // Given square is initially empty and not already occupied
        const index = Array.from(squares).indexOf(square);

        if (square.textContent === '' && gameState[index] === null && gameActive) {
            // Set the current player symbol in the requested square
            square.textContent = currentPlayer;

            // Remove classes 'X' and 'O' to reset styling
            square.classList.remove('X', 'O');

            // Add new move 'X' or 'O' with styling
            square.classList.add(currentPlayer);

            // Update the game state
            gameState[index] = currentPlayer;

            if (checkWinner()) {
                updateStatus(`${currentPlayer} is the Winner!`);
                gameActive = false; // Game has concluded
                return; // End the game
            }
            // Alternate player turns - if recent player played X, next one plays O
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }

     // Add hover effect to all squares
     function addHoverEffect(square) {
        square.addEventListener('mouseenter', function() {
            square.classList.add('hover');
        });

        square.addEventListener('mouseleave', function() {
            square.classList.remove('hover');
        });
    }

    function checkWinner() {
        const winningCombinations = [
            [0, 1, 2], // Row 1
            [3, 4, 5], // Row 2
            [6, 7, 8], // Row 3
            [0, 3, 6], // Column 1
            [1, 4, 7], // Column 2
            [2, 5, 8], // Column 3
            [0, 4, 8], // Diagonal 1
            [2, 4, 6], // Diagonal 2
        ];
        
        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
                gameActive = false; // Game has concluded
                return true; // Winner found
            }
        }
        // Check for draw
        if (!gameState.includes(null)) {
            updateStatus("It's a draw!");
            gameActive = false; // Game has concluded
            return; // No winner found
        }
        return false; // No winner yet
    }

    function updateStatus(message) {
        const statusDiv = document.getElementById('status');
        if(!gameState.includes(null)) {
            statusDiv.innerHTML = `Oh no! ${message}`;
            statusDiv.classList.add('you-won'); // Add class for styling
        }
        else {
            statusDiv.innerHTML = `Congratulations! ${message}`;
            statusDiv.classList.add('you-won'); // Add class for styling
        }
    }

    squares.forEach(function(square) {
        square.classList.add('square');
        addHoverEffect(square);
        
        square.addEventListener('click', function() {
            onMouseClick(square);
        });
    });
});



