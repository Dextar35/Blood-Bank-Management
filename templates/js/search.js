document.addEventListener('DOMContentLoaded', async () => {
    const stateSelect = document.getElementById('state');
    const citySelect = document.getElementById('city');

    const searchButton = document.getElementById('searchButton');
    searchButton.addEventListener('click', async () => {
        const state = stateSelect.value;
        const city = citySelect.value;
        const bloodGroup = document.getElementById('bloodGroup').value.trim();

        const searchParams = new URLSearchParams();

        if (state) searchParams.append('state', state);
        if (city) searchParams.append('city', city);
        if (bloodGroup) searchParams.append('bloodGroup', bloodGroup);

        const response = await fetch(`/search?${searchParams.toString()}`);
        const donors = await response.json();
        
        const resultsContainer = document.getElementById('resultsContainer');
        resultsContainer.innerHTML = ''; // Clear previous results

        if (donors.length > 0) {
            donors.forEach(donor => {
                const donorInfo = document.createElement('div');
                donorInfo.className = 'donor-block'; // Add a class for styling
                donorInfo.innerHTML = `
                    <div><strong>Name:</strong> ${donor.full_name}</div>
                    <div><strong>Blood Group:</strong> ${donor.blood_group}</div>
                    <div><strong>Gender:</strong> ${donor.gender}</div>
                    <div><strong>Date of Birth:</strong> ${donor.dob}</div>
                    <div><strong>Email:</strong> ${donor.email}</div>
                    <div><strong>Contact Number:</strong> ${donor.phone}</div>
                    <div><strong>State:</strong> ${donor.state}</div>
                    <div><strong>City:</strong> ${donor.city}</div>
                `;
                resultsContainer.appendChild(donorInfo);
            });
        } else {
            resultsContainer.innerHTML = '<p>No donors found.</p>';
        }
    });
});
