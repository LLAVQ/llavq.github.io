// Fetch the JSON data from the data.json file
fetch('./data.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok: ' + response.statusText);
    }
    return response.json();
  })
  .then(data => {
    const postsContainer = document.getElementById('postsContainer');

    // Loop through each post and create HTML elements
    data.posts.forEach(post => {
      const postDiv = document.createElement('div'); // Create a new div for each post
      postDiv.classList.add('post'); // Add a class for styling

      // Create title element
      const title = document.createElement('h3');
      title.textContent = post.title; // Set the title text

      // Create author mark
      const author_mark = document.createElement('p');
      author_mark.textContent = "Written by " + post.author;

      // Create overview element
      const overview = document.createElement('p');
      overview.textContent = post.overview; // Set the overview text

      // Append elements to postDiv
      postDiv.appendChild(title);
      postDiv.appendChild(author_mark)
      postDiv.appendChild(overview);

      // Add a button to open the modal with full content
      const readButton = document.createElement('button');
      readButton.textContent = 'Read More';

      readButton.onclick = () => {
        // Set modal title
        document.getElementById('modalTitle').textContent = post.title;

        // Clear previous content in modal
        const modalContent = document.getElementById('modalContent');
        modalContent.innerHTML = ''; // Clear existing content

        // Create paragraphs for each chunk of content
        post.content.forEach(paragraph => {
          const p = document.createElement('p');
          p.textContent = paragraph; // Set paragraph text
          modalContent.appendChild(p); // Append paragraph to modal content
        });

        // Display the modal
        document.getElementById('modal').style.display = 'block';
      };

      postDiv.appendChild(readButton); // Append button to postDiv
      postsContainer.appendChild(postDiv); // Append to main container
    });

    // Close modal functionality
    const closeButton = document.querySelector('.close-button');
    closeButton.onclick = () => {
      document.getElementById('modal').style.display = 'none'; // Hide modal
    };

    // Close modal when clicking outside of it
    window.onclick = (event) => {
      if (event.target === document.getElementById('modal')) {
        document.getElementById('modal').style.display = 'none'; // Hide modal
      }
    };
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });
// Function to set cookie
function setCookie(name, value, days) {
   const date = new Date();
   date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
   const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/" + ";SameSite=None;secure=true;";
}

// Function to get cookie
function getCookie(name) {
   const nameEQ = name + "=";
   const ca = document.cookie.split(';');
   for(let i = 0; i < ca.length; i++) {
       let c = ca[i];
       while (c.charAt(0) == ' ') c = c.substring(1,c.length);
       if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
   }
   return null;
}

// Function to toggle theme
function toggleTheme() {
   const body = document.body;

   // Toggle dark mode class
   body.classList.toggle("dark-mode");

   // Save preference in cookie
   if (body.classList.contains("dark-mode")) {
       setCookie("theme", "dark", 7);
   } else {
       setCookie("theme", "light", 7);
   }
}

// Check cookie on page load
window.onload = () => {
   const theme = getCookie("theme");

    // Set dark mode as default if no cookie is found
    if (!theme || theme === "dark") {
        document.body.classList.add("dark-mode");
        document.getElementById("checkbox").checked = true; // Check the toggle
    }
};

// Add event listener to toggle switch
document.getElementById("checkbox").addEventListener("change", toggleTheme);
