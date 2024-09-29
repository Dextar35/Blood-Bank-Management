// // Select all buttons with the class 'selectBtn'
// const buttons = document.querySelectorAll('.selectBtn');

// // Add event listeners to each button
// buttons.forEach(button => {
//     button.addEventListener('click', function() {
//         // Remove 'active' class from all buttons
//         buttons.forEach(btn => btn.classList.remove('active'));
        
//         // Add 'active' class to the clicked button
//         this.classList.add('active');
//     });
// });



// Handle blood type selection
const buttons = document.querySelectorAll('.selectBtn');

buttons.forEach(button => {
    button.addEventListener('click', function() {
        // Remove active class from all buttons
        buttons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to the clicked button
        this.classList.add('active');
        
        // Update the donor information based on selected blood type
        updateDonationInfo(this.textContent);
    });
});

// Function to update donation info based on blood type
function updateDonationInfo(bloodType) {
    const canTakeFrom = document.querySelector('.org-container .d-flex.flex-wrap');
    const canGiveTo = document.querySelector('.blue-container .d-flex.flex-wrap');

    switch (bloodType) {
        case 'A+':
            canTakeFrom.innerHTML = `<p class="org-text">O+</p><p class="org-text">O-</p><p class="org-text">A+</p><p class="org-text">A-</p>`;
            canGiveTo.innerHTML = `<p class="org-text">A+</p><p class="org-text">AB+</p>`;
            break;
        case 'O+':
            canTakeFrom.innerHTML = `<p class="org-text">O+</p><p class="org-text">O-</p>`;
            canGiveTo.innerHTML = `<p class="org-text">O+</p><p class="org-text">A+</p><p class="org-text">B+</p><p class="org-text">AB+</p>`;
            break;
        case 'B+':
            canTakeFrom.innerHTML = `<p class="org-text">O+</p><p class="org-text">O-</p><p class="org-text">B+</p><p class="org-text">B-</p>`;
            canGiveTo.innerHTML = `<p class="org-text">B+</p><p class="org-text">AB+</p>`;
            break;
        case 'AB+':
            canTakeFrom.innerHTML = `<p class="org-text">O+</p><p class="org-text">O-</p><p class="org-text">A+</p><p class="org-text">A-</p><p class="org-text">B+</p><p class="org-text">B-</p><p class="org-text">AB+</p><p class="org-text">AB-</p>`;
            canGiveTo.innerHTML = `<p class="org-text">AB+</p>`;
            break;
        case 'A-':
            canTakeFrom.innerHTML = `<p class="org-text">O-</p><p class="org-text">A-</p>`;
            canGiveTo.innerHTML = `<p class="org-text">A+</p><p class="org-text">A-</p><p class="org-text">AB+</p><p class="org-text">AB-</p>`;
            break;
        case 'O-':
            canTakeFrom.innerHTML = `<p class="org-text">O-</p>`;
            canGiveTo.innerHTML = `<p class="org-text">O+</p><p class="org-text">O-</p><p class="org-text">A+</p><p class="org-text">A-</p><p class="org-text">B+</p><p class="org-text">B-</p><p class="org-text">AB+</p><p class="org-text">AB-</p>`;
            break;
        case 'B-':
            canTakeFrom.innerHTML = `<p class="org-text">O-</p><p class="org-text">B-</p>`;
            canGiveTo.innerHTML = `<p class="org-text">B+</p><p class="org-text">B-</p><p class="org-text">AB+</p><p class="org-text">AB-</p>`;
            break;
        case 'AB-':
            canTakeFrom.innerHTML = `<p class="org-text">O-</p><p class="org-text">A-</p><p class="org-text">B-</p><p class="org-text">AB-</p>`;
            canGiveTo.innerHTML = `<p class="org-text">AB+</p><p class="org-text">AB-</p>`;
            break;
        default:
            canTakeFrom.innerHTML = '';
            canGiveTo.innerHTML = '';
    }
}

