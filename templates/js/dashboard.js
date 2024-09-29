document.addEventListener('DOMContentLoaded', () => {
    const dashboardTab = document.getElementById('dashboardTab');
    const updateAccountTab = document.getElementById('updateAccountTab');
    const changePasswordTab = document.getElementById('changePasswordTab');
    const logoutTab = document.getElementById('logoutTab');
    const deleteTab = document.getElementById('deleteTab');

    const dashboardContent = document.getElementById('dashboardContent');
    const updateAccountContent = document.getElementById('updateAccountContent');
    const changePasswordContent = document.getElementById('changePasswordContent');
    const deleteAccountContent = document.getElementById('deleteAccountContent')

    // Handle tab switching
    dashboardTab.addEventListener('click', () => {
        dashboardContent.classList.add('active');
        updateAccountContent.classList.remove('active');
        changePasswordContent.classList.remove('active');
        deleteAccountContent.classList.remove('active');
    });

    updateAccountTab.addEventListener('click', () => {
        dashboardContent.classList.remove('active');
        updateAccountContent.classList.add('active');
        changePasswordContent.classList.remove('active');
        deleteAccountContent.classList.remove('active');
    });

    changePasswordTab.addEventListener('click', () => {
        dashboardContent.classList.remove('active');
        updateAccountContent.classList.remove('active');
        changePasswordContent.classList.add('active');
        deleteAccountContent.classList.remove('active');
    });

    logoutTab.addEventListener('click', () => {
        localStorage.removeItem('token'); // Clear token on logout
        window.location.href = 'login.html'; // Redirect to login
    });

    deleteTab.addEventListener('click', () =>{
        dashboardContent.classList.remove('active');
        updateAccountContent.classList.remove('active');
        changePasswordContent.classList.remove('active');
        deleteAccountContent.classList.add('active');
    })
});


// Get the form element
const updateAccountForm = document.getElementById('updateAccountForm');

// Helper function to get JWT token from local storage
const getToken = () => `Bearer ${localStorage.getItem('token')}`;

// Event listener for updating the account
updateAccountForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const fullName = document.getElementById('fullName').value;
    const bloodGroup = document.getElementById('bloodGroup').value;
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const dobDay = document.getElementById('dobDay').value;
    const dobMonth = document.getElementById('dobMonth').value;
    const dobYear = document.getElementById('dobYear').value;
    const dob = `${dobYear}-${dobMonth}-${dobDay}`; // DD-MM-YYYY format
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const state = document.getElementById('state').value;
    const city = document.getElementById('city').value;

    fetch('http://localhost:3000/update-account', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': getToken(),  // Ensure Bearer token is sent here
        },
        body: JSON.stringify({ fullName, bloodGroup, gender, dob, email, phone, state, city })
    })
    .then(response => {
        if (response.status === 401) {
            throw new Error('Unauthorized - Invalid token');
        }
        return response.json();
    })
    .then(data => {
        if (data.message) {
            alert('Account updated successfully.');
        } else {
            alert(data.message || 'An error occurred.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

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

  fetch('http://localhost:3000/change-password', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': getToken(), // Include the token in the request headers
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


document.addEventListener('DOMContentLoaded', () => {
    const deleteAccountForm = document.getElementById('deleteAccountForm');
    
    // Function to handle account deletion
    deleteAccountForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        
        const confirmation = confirm('Are you sure you want to delete your account? This action is irreversible.');
        if (!confirmation) return;

        try {
            const token = localStorage.getItem('token');  // Assuming token is stored in localStorage
            const response = await fetch('http://localhost:3000/deleteAccount', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': getToken()  // Send JWT token for authentication
                }
            });

            const data = await response.json();

            if (response.status === 200) {
                alert(data.message);
                // Optionally, you can redirect the user to the login page or home page after deletion
                window.location.href = '/login.html';  // Redirect to login page after deletion
            } else {
                alert(data.message || 'Error deleting account');
            }
        } catch (error) {
            console.error('Error deleting account:', error);
            alert('Error deleting account');
        }
    });
});
