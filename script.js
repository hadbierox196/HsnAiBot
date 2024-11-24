// Function to handle sending a user message
async function sendMessage() {
  const input = document.getElementById("user-input");
  const message = input.value.trim();

  if (message) {
    addMessage(message, "user-message"); // Add user's message
    input.value = "";

    // Show typing indicator while fetching bot's response
    document.getElementById("typing-indicator").style.display = "block";

    const textResponse = await fetchTextResponse(message); // Get bot response
    document.getElementById("typing-indicator").style.display = "none";

    addMessage(textResponse, "bot-message", true); // Add bot's message
    fetchAndDisplayImage(textResponse); // Fetch and display image for bot's response
  }
}

// Function to display messages in the chat window
function addMessage(content, className, withIcons = false) {
  const chatWindow = document.getElementById("chat-window");
  const messageElement = document.createElement("div");
  messageElement.classList.add(className);

  // Add timestamp
  const timestamp = `<span class="timestamp">${new Date().toLocaleTimeString()}</span>`;
  messageElement.innerHTML = `${content}${timestamp}`;

  // If it's a bot message, add recommendations
  if (className === "bot-message" && withIcons) {
    addRecommendedQuestions(content, messageElement);
  }

  chatWindow.appendChild(messageElement);
  chatWindow.scrollTop = chatWindow.scrollHeight; // Auto-scroll to the bottom
}

// Function to fetch bot's response from an API
async function fetchTextResponse(prompt) {
  try {
    const response = await fetch(`https://text.pollinations.ai/for educational purposes school project${encodeURIComponent(prompt)}`);
    if (response.ok) {
      return await response.text();
    } else {
      return "Error: Unable to fetch response.";
    }
  } catch (error) {
    return "Error: Network issue.";
  }
}

// Function to fetch and display an image based on a prompt
async function fetchAndDisplayImage(prompt) {
  const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}`;
  const imageElement = document.createElement("img");
  imageElement.src = imageUrl;
  imageElement.alt = "Generated Image";
  imageElement.classList.add("generated-image");

  const chatWindow = document.getElementById("chat-window");
  const imageContainer = document.createElement("div");
  imageContainer.classList.add("bot-message");

  // Add image with timestamp
  const timestamp = `<span class="timestamp">${new Date().toLocaleTimeString()}</span>`;
  imageContainer.innerHTML = timestamp;
  imageContainer.appendChild(imageElement);

  chatWindow.appendChild(imageContainer);
  chatWindow.scrollTop = chatWindow.scrollHeight; // Auto-scroll to the bottom
}

// Function to add recommended questions below bot's response
async function addRecommendedQuestions(content, parentElement) {
  try {
    const response = await fetch(`https://text.pollinations.ai/for educational purposes school project${encodeURIComponent(prompt)}`);
    if (response.ok) {
      const recommendations = await response.json(); // Assuming API returns JSON
      if (recommendations.questions) {
        const questionContainer = document.createElement("div");
        questionContainer.classList.add("recommendation-container");

        recommendations.questions.forEach((question) => {
          const questionElement = document.createElement("button");
          questionElement.textContent = question;
          questionElement.classList.add("recommendation-button");
          questionElement.onclick = () => {
            document.getElementById("user-input").value = question;
            sendMessage();
          };

          questionContainer.appendChild(questionElement);
        });

        parentElement.appendChild(questionContainer);
      }
    }
  } catch (error) {
    console.error("Error fetching recommendations:", error);
  }
}

// Function to send an image (based on user input)
function sendImage() {
  const input = document.getElementById("user-input");
  const message = input.value.trim();

  if (message) {
    addMessage(message, "user-message"); // Add user's message
    fetchAndDisplayImage(message); // Fetch and display image
    input.value = "";
  }
}

// Function to handle pressing the "Enter" key
function checkEnter(event) {
  if (event.key === "Enter") {
    sendMessage();
  }
}

// Function to filter messages in the chat window based on search input
function filterMessages() {
  const searchInput = document.getElementById("search-input").value.toLowerCase();
  const messages = document.querySelectorAll(".user-message, .bot-message");

  messages.forEach((message) => {
    const text = message.textContent || message.innerText;
    if (text.toLowerCase().includes(searchInput)) {
      message.style.display = "block"; // Show messages that match the search
    } else {
      message.style.display = "none"; // Hide messages that don't match
    }
  });
}
