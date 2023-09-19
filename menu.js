const userProgress = {
    level1: true,
    level2: false,
    level3: false,
};

function startLevel(level) {
    // Check if the selected level is unlocked, and only redirect if it is.
    if (userProgress[`level${level}`]) {
        window.location.href = `levels.html?level=${level}`;
    }
}

const urlParams = new URLSearchParams(window.location.search);
const userName = urlParams.get('userInput');

// Display the user's name on the menu page
const userNameElement = document.getElementById('userName');
userNameElement.textContent = userName;
