const changePasswordForm = document.getElementById('changePasswordForm');

changePasswordForm.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent default form submission

  const currentPassword = document.getElementById('currentPassword').value;
  const newPassword = document.getElementById('newPassword').value;
  const confirmNewPassword = document.getElementById('confirmNewPassword').value;

  // Validate that new passwords match
  if (newPassword !== confirmNewPassword) {
    alert('New passwords do not match');
    return;
  }

  const token = localStorage.getItem('token'); // Get the JWT token

  fetch('/change-password', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token, // Include the token in the request headers
    },
    body: JSON.stringify({ currentPassword, newPassword }),
  })
  .then(response => response.json())
  .then(data => {
    if (data.message) {
      alert(data.message); // Show success message
    } else {
      alert(data.error); // Show error message
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
});
