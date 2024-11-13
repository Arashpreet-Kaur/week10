let lastJoke = ''; // Variable to store the last joke displayed

// Function to fetch and display a new joke
function generateJoke() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://api.chucknorris.io/jokes/random', true);

    xhr.onload = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            const newJoke = response.value;

            // Check if the new joke is the same as the last joke
            if (newJoke !== lastJoke) {
                document.getElementById('joke').innerHTML = newJoke;
                lastJoke = newJoke; // Update lastJoke with the new joke
            } else {
                // If the joke is the same, try fetching a new joke by calling generateJoke once more
                console.log("Same joke, trying again...");
                generateJoke();
            }
        } else if (xhr.readyState === 4) {
            document.getElementById('joke').innerHTML = 'Failed to load joke!';
        }
    };

    xhr.onerror = function() {
        document.getElementById('joke').innerHTML = 'Network Error! Please try again.';
    };

    xhr.send();
}

// Display an initial joke when the page loads
document.addEventListener('DOMContentLoaded', generateJoke);

// Fetch a new joke every time the button is clicked
document.getElementById('jokeButton').addEventListener('click', generateJoke);
