// Shared Navigation Functions
function initNav() {
    // Check authentication
    if (!auth.isAuthenticated()) {
        window.location.href = 'login.html';
        return;
    }

    // Load user info into nav
    const user = auth.getUser();
    if (user) {
        const initials = user.name.split(' ').map(n => n[0]).join('').toUpperCase();
        const avatarEl = document.getElementById('user-avatar');
        const nameEl = document.getElementById('user-name');
        const emailEl = document.getElementById('user-email');
        
        if (avatarEl) {
            const initialsSpan = avatarEl.querySelector('span') || document.createElement('span');
            initialsSpan.id = 'user-initials';
            initialsSpan.textContent = initials;
            if (!avatarEl.querySelector('span')) {
                avatarEl.appendChild(initialsSpan);
            }
        }
        if (nameEl) nameEl.textContent = user.name;
        if (emailEl) emailEl.textContent = user.email;
    }
}

function toggleUserMenu() {
    const dropdown = document.getElementById('user-dropdown');
    if (dropdown) {
        dropdown.classList.toggle('show');
    }
}

function handleLogout() {
    auth.logout();
    window.location.href = 'login.html';
}

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
    const userMenu = document.querySelector('.user-menu');
    const dropdown = document.getElementById('user-dropdown');
    if (userMenu && dropdown && !userMenu.contains(event.target)) {
        dropdown.classList.remove('show');
    }
});

