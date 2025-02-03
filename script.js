fetch('./data.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    const textList = document.getElementById('textList');

    // Loop through the texts array and create list items
    data.texts.forEach(text => {
      const li = document.createElement('li'); // Create a new list item
      li.textContent = text; // Set the text content
      textList.appendChild(li); // Append the list item to the unordered list
    });
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });
