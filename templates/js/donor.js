document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/donors'); // Adjust the URL based on your server configuration
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const donors = await response.json();

        const donorsContainer = document.getElementById('donorsContainer');
        donors.forEach(donor => {
            const card = document.createElement('div');
            card.className = 'donor-card';

            card.innerHTML = `
                <div class="donor-info"><strong>Full Name:</strong> ${donor.full_name}</div>
                <div class="donor-info"><strong>Blood Group:</strong> ${donor.blood_group}</div>
                <div class="donor-info"><strong>Gender:</strong> ${donor.gender}</div>
                <div class="donor-info"><strong>Date of Birth:</strong> ${donor.dob}</div>
                <div class="donor-info"><strong>Email:</strong> ${donor.email}</div>
                <div class="donor-info"><strong>Contact Number:</strong> ${donor.phone}</div>
                <div class="donor-info"><strong>State:</strong> ${donor.state}</div>
                <div class="donor-info"><strong>City:</strong> ${donor.city}</div>
            `;
            donorsContainer.appendChild(card);
        });
    } catch (error) {
        console.error('Error fetching donor data:', error);
    }
});
