const topics = ["Physics", "Culinary", "Myths", "Tech", "Happiness", "Astronomy"];
const circleSize = 100; // Size of the circles
const headerHeight = document.querySelector('header').offsetHeight; // Get header height
const popupHeight = 100; // Approximate height of the popup

document.getElementById('start-btn').addEventListener('click', function() {
    var start_btn = document.getElementById('start-btn');
    start_btn.remove();

    const popup = document.getElementById('popup');
    popup.textContent = "Select a topic"; // Corrected from textContext to textContent
    popup.classList.add('active');

    // Clear existing circles
    const existingCircles = document.querySelectorAll('.circle');
    existingCircles.forEach(circle => circle.remove());

    const positions = []; // Array to store positions of circles
    const centerX = window.innerWidth / 2; // Center X position
    const centerY = (window.innerHeight - headerHeight - popupHeight) / 2; // Center Y position

    topics.forEach((topic, index) => {
        const angle = (index / topics.length) * (2 * Math.PI); // Calculate angle for circle placement
        const position = {
            x: centerX + Math.cos(angle) * 170 - circleSize / 2, // Adjust for circle size
            y: centerY + Math.sin(angle) * 170 - circleSize / 2 + 90 // Adjust for circle size
        };

        createCircle(position, topic); // Create the circle
    });

    function createCircle(position, topic) {
        const newDiv = document.createElement('div');
        newDiv.className = 'circle';
        newDiv.textContent = topic;
        newDiv.style.left = `${position.x}px`;
        newDiv.style.top = `${position.y}px`;
        newDiv.style.width = `${circleSize}px`;
        newDiv.style.height = `${circleSize}px`;
        newDiv.style.transition = 'transform 0.5s ease'; // Add transition for animation

        // Trigger the animation
        setTimeout(() => {
            newDiv.style.transform = 'scale(1.2)'; // Grow the circle
            setTimeout(() => {
                newDiv.style.transform = 'scale(1)'; // Shrink back to original size
            }, 300); // Delay before shrinking
        }, 10); // Small delay to ensure the transition is applied

        newDiv.addEventListener('click', function() {
            // Animate the circle growing and then shrinking before removal
            newDiv.style.transform = 'scale(1.2)'; // Grow the circle
            setTimeout(() => {
                newDiv.style.transform = 'scale(0)'; // Shrink the circle
                setTimeout(() => {
                    newDiv.remove(); // Remove the circle from the DOM after animation
                    loadText(topic); // Load text related to the topic
                }, 500); // Match the timeout with the transition duration
            }, 300); // Delay before shrinking
        });

        document.body.appendChild(newDiv); // Append the new div to the body
    }

    function loadText(topic) {
        fetch('texts.json')
            .then(response => response.json())
            .then(data => {
                const textDiv = document.getElementById('text-display'); // Assuming you have a div with this ID
                textDiv.textContent = data[topic]; // Load the text for the selected topic
                textDiv.classList.add('active'); // Show the text div

                // Center the text div
                textDiv.style.position = 'fixed';
                textDiv.style.left = '50%';
                textDiv.style.top = '50%';
                textDiv.style.transform = 'translate(-50%, -50%)'; // Centering
            })
            .catch(error => console.error('Error loading text:', error));
    }
});
