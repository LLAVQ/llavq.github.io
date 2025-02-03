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

      // Create author element
      const author = document.createElement('p');
      author.textContent = `Author: ${post.author}`; // Set author text
      author.classList.add('author'); // Optional: add class for styling

      // Create overview element
      const overview = document.createElement('p');
      overview.textContent = post.overview; // Set overview text

      // Append elements to postDiv
      postDiv.appendChild(title);
      postDiv.appendChild(author); // Append author below title
      postDiv.appendChild(overview);

      // Add button for modal functionality
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
