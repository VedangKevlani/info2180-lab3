//this renders when DOMContentLoaded works or when DOM has fully loaded
window.addEventListener('DOMContentLoaded', function() {
    let squares = document.querySelectorAll('#board div'); //this selects all div with id board

    squares.forEach(function(square) {
        square.classList.add('square'); //this adds the square class to each div
    });
});