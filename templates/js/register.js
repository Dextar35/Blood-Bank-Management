document.getElementById('registerForm').addEventListener('submit', async function(event) {
  event.preventDefault();

  // Get form values
  const fullName = document.getElementById('fullName').value;
  const bloodGroup = document.getElementById('bloodGroup').value;
  const gender = document.querySelector('input[name="gender"]:checked').value;
  const dobDay = document.getElementById('dobDay').value;
  const dobMonth = document.getElementById('dobMonth').value;
  const dobYear = document.getElementById('dobYear').value;
  const dob = `${dobYear}-${dobMonth}-${dobDay}`; // Format: YYYY-MM-DD
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const state = document.getElementById('state').value;
  const city = document.getElementById('city').value;
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  // Validate password confirmation
  if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
  }

  // Prepare data to send
  const data = {
      fullName, bloodGroup, gender, dob, email, phone, state, city, username, password, confirmPassword
  };

  try {
      const response = await fetch('http://localhost:3000/register', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
      });

      const result = await response.json();

      if (response.status === 201) {
          alert(result.message);
          // Redirect to login page
          window.location.href = 'http://localhost:3000/login.html';
      } else {
          alert(result.error || 'Registration failed');
      }
  } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
  }
});
