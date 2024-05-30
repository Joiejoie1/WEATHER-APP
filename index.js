// Get DOM elements
const form = document.getElementById('weatherForm');
const locationInput = document.getElementById('locationInput');
const weatherInfo = document.getElementById('weatherInfo');

// Function to update navigation menu based on login status
function updateNavigation() {
  const welcomeMessage = document.getElementById('welcomeMessage');
  const navLoginLink = document.querySelector('nav ul li:nth-child(4) a');

  if (isLoggedIn()) {
    // User is logged in
    navLoginLink.textContent = 'Logout';
    navLoginLink.addEventListener('click', logout);
    const firstname = localStorage.getItem('firstname');
    if (firstname) {
      // Show welcome message
      welcomeMessage.textContent = `Welcome, ${firstname}`;
      welcomeMessage.style.display = 'inline'; // Display the welcome message
    }
  } else {
    // User is not logged in
    navLoginLink.textContent = 'Login';
    navLoginLink.href = 'login.html';
    // Hide welcome message
    welcomeMessage.style.display = 'none';
  }
}

// Function to handle logout
function logout(event) {
  event.preventDefault();
  localStorage.removeItem('email');
  localStorage.removeItem('password');
  localStorage.removeItem('firstname');
  localStorage.removeItem('lastname');
  localStorage.removeItem('phone');
  localStorage.removeItem('address');
  window.location.href = 'login.html'; // Redirect to login page
}


const currentPageUrl = window.location.href;

// Get all the navigation links
const navLinks = document.querySelectorAll('header nav ul li a');

// Loop through each navigation link
navLinks.forEach(link => {
  // Check if the link's href matches the current page URL
  if (link.href === currentPageUrl) {
    // Add the 'active' class to the parent li element
    link.parentElement.classList.add('active');
  }
});


// Call the function to update navigation initially
updateNavigation();



// Add event listener for form submission
form.addEventListener('submit', handleFormSubmit);

// Call the function to update navigation initially
updateNavigation();



// Function to handle form submission and fetch weather data
async function handleFormSubmit(event) {
  event.preventDefault();

  // Check if user is logged in
  if (!isLoggedIn()) {
    window.location.href = 'login.html'; 
    return;
  }

  const location = locationInput.value.trim();
  if (!location) {
    alert('Please enter a location'); 
    return;
  }

  try {
    // Fetch weather data
    const apiKey = 'fa591bdcdb49b823c54e096ec48f409d';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }

    const weatherData = await response.json();

    // Render weather information
    renderWeather(weatherData);
  } catch (error) {
    console.error('Error fetching weather data:', error.message);
    alert('Error fetching weather data. Please try again later.');
  }
}


// Function to check if user is logged in
function isLoggedIn() {
  // Check if user's email and password are stored in localStorage
  return localStorage.getItem('email') && localStorage.getItem('password');
}

// Add event listener for form submission
form.addEventListener('submit', handleFormSubmit);



// Function to render weather information
function renderWeather(data) {
  const { name, main, weather } = data;

  const iconCode = weather[0].icon;
  const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`; // Get the icon URL from OpenWeatherMap API
  const temperature = main.temp;
  const humidity = main.humidity;

  const weatherInfoHtml = `
    <div class="weather-info">
      <img class="weather-icon" src="${iconUrl}" alt="Weather Icon">
      <div class="weather-data">
        <h3>${name}</h3>
        <p>Temperature: ${temperature}°C</p>
        <p>Humidity: ${humidity}%</p>
        <p>Weather: ${weather[0].description}</p>
      </div>
    </div>
  `;

  weatherInfo.innerHTML = weatherInfoHtml;

  // Shake the clouds
  const clouds = document.querySelectorAll('.cloud');
  clouds.forEach(cloud => {
    cloud.classList.add('shake');
    setTimeout(() => {
      cloud.classList.remove('shake');
    }, 1000); // Adjust the duration of the shake effect as needed
  });
}

// Function to toggle dark mode
function toggleDarkMode() {
  // Toggle the body class to switch between light and dark mode
  document.body.classList.toggle('dark-mode');
  
  // Save the user's preference to local storage
  localStorage.setItem('darkModeEnabled', document.body.classList.contains('dark-mode'));
}

// Check if the user has previously enabled dark mode
const isDarkModeEnabled = localStorage.getItem('darkModeEnabled') === 'true';

// Set initial dark mode state based on user's preference
if (isDarkModeEnabled) {
  document.body.classList.add('dark-mode');
}

// Add event listener for dark mode toggle switch
document.getElementById('dark-mode-toggle').addEventListener('change', toggleDarkMode);

// Add event listener for form submission
form.addEventListener('submit', handleFormSubmit);
