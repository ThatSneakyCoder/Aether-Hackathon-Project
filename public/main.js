

// Get the chat form, input field, and output area elements from the DOM
const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');
const chatOutput = document.getElementById('chat-output');

// Add an event listener for the form submission
chatForm.addEventListener('submit', async (event) => {
  // Prevent the default form submission behavior
  event.preventDefault();

  try {
    // Log the input value and sending message
    console.log('Sending chat request:', chatInput.value);

    // Send a POST request to the '/api/chat' endpoint with the user's input
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ input: chatInput.value }),
    });

    // Parse the response data as JSON and display it in the output area
    const data = await response.json();
    chatOutput.innerHTML = data.message;

    // Log the response message
    console.log('Received chat response:', data.message);
  } catch (error) {
    // Display an error message if the request fails
    console.log('Failed to send chat request:', error);
    chatOutput.innerHTML = 'Error: Failed to get a response from the server.';
  }
});
