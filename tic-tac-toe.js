// This renders when DOMContentLoaded works or when DOM has fully loaded
window.addEventListener('DOMContentLoaded', function() {
    let squares = document.querySelectorAll('#board div'); // Selects all divs with id board
    let currentPlayer = 'X'; 
    let gameState = Array(9).fill(null); 

    // Place X or O on the square when a square is clicked
    function onMouseClick(square) {
        // Given square is initially empty and not already occupied
        const index = Array.from(squares).indexOf(square);

        if (square.textContent === '' && gameState[index] === null) {
            // Set the current player symbol in the requested square
            square.textContent = currentPlayer;

            // Remove classes 'X' and 'O' to reset styling
            square.classList.remove('X', 'O');

            // Add new move 'X' or 'O' with styling
            square.classList.add(currentPlayer);

            // Update the game state
            gameState[index] = currentPlayer;

            // Alternate player turns
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

    squares.forEach(function(square) {
        square.classList.add('square');
        addHoverEffect(square);
        
        square.addEventListener('click', function() {
            onMouseClick(square);
        });
    });
});



