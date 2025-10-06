document.addEventListener('DOMContentLoaded', () => {

    // --- DOM Elements ---
    const clockContainer = document.getElementById('clock-container');
    const timeEl = document.getElementById('time');
    const dateEl = document.getElementById('date');
    const passwordContainer = document.getElementById('password-container');
    const passwordInput = document.getElementById('password-input');
    const submitButton = document.getElementById('submit-password');
    const errorMessage = document.getElementById('error-message');
    const galleryContainer = document.getElementById('gallery-container');
    const imageModal = document.getElementById('image-modal');
    const modalContent = document.getElementById('modal-content');
    const closeModal = document.getElementById('close-modal');

    const SECRET_PASSWORD = '8725';

    // --- Clock Logic ---
    function updateClock() {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        
        // Format time (e.g., 09:05:03 AM)
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12; // Convert 0 to 12
        const formattedTime = `${String(formattedHours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')} ${ampm}`;
        
        // Format date (e.g., Sunday, 5 October 2025)
        const formattedDate = now.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        timeEl.textContent = formattedTime;
        dateEl.textContent = formattedDate;
    }

    // Update the clock every second
    setInterval(updateClock, 1000);
    updateClock(); // Initial call to display clock immediately

    // --- Secret Trigger Logic ---
    clockContainer.addEventListener('dblclick', () => {
        passwordContainer.classList.remove('hidden');
        passwordInput.focus();
    });

    // Also show password prompt on mobile (single tap)
    clockContainer.addEventListener('touchstart', () => {
        passwordContainer.classList.remove('hidden');
        passwordInput.focus();
    });

    // --- Password Check Logic ---
    function checkPassword() {
        if (passwordInput.value === SECRET_PASSWORD) {
            // Correct password
            document.body.style.overflow = 'auto'; // Allow scrolling for gallery
            clockContainer.classList.add('hidden');
            passwordContainer.classList.add('hidden');
            galleryContainer.classList.remove('hidden');
        } else {
            // Incorrect password
            errorMessage.classList.remove('hidden');
            passwordInput.value = '';
            setTimeout(() => {
                errorMessage.classList.add('hidden');
            }, 2000);
        }
    }

    submitButton.addEventListener('click', checkPassword);
    passwordInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            checkPassword();
        }
    });

    // --- Image Modal (Zoom) Logic ---
    galleryContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('gallery-image')) {
            modalContent.src = event.target.src;
            imageModal.classList.remove('hidden');
        }
    });

    function hideModal() {
        imageModal.classList.add('hidden');
    }
    
    closeModal.addEventListener('click', hideModal);
    
    // Also close modal by clicking on the background
    imageModal.addEventListener('click', (event) => {
        if (event.target === imageModal) {
            hideModal();
        }
    });

});