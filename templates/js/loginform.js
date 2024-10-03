const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent default form submission

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Make a POST request to the server to login
  fetch('http://localhost:3000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  })
  .then(response => {
    if (response.status === 200) {
      return response.json();
    } else if (response.status === 400) {
      // Handle incorrect password or authentication failure
      alert('Incorrect Username or Password');
      throw new Error('Incorrect username or password');
    } else {
      // Handle other possible errors
      throw new Error('An error occurred: ' + response.statusText);
    }
  })
  .then(data => {
      console.log('Login response:', data);
      if (data.token) {
          // Store the token
          localStorage.setItem('token', data.token);
          // Redirect to the user's account page
          window.location.href = 'http://localhost:3000/dashboard.html'; // Redirect to the account page
      } else {
          alert(data.error); // Show error message if login failed
      }
  })
  .catch(error => {
      console.error('Fetch error:', error);
  });
});
