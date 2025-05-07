// Check login status and update navbar on all pages
function updateNavbar() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    const loginItem = document.getElementById('loginItem');
    
    if (loginItem && loggedInUser) {
        loginItem.innerHTML = `
            <a class="loginbutton">
                Hello, ${loggedInUser} <span style="font-size: 10px;">▼</span>
            </a>
            <ul class="tutorialdropdownitems">
                <li><a href="#" id="logoutBtn">Logout</a></li>
            </ul>
        `;
        loginItem.classList.add('tutdropdown');
        
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', function(e) {
                e.preventDefault();
                localStorage.removeItem('loggedInUser');
                window.location.href = 'login.html';
            });
        }
    }
}

// Setup login form if it exists
function setupLoginForm() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            if (username && password) {
                // Store login info
                localStorage.setItem('loggedInUser', username);
                
                // Redirect to previous page or index
                const redirectTo = localStorage.getItem('redirectAfterLogin') || 'index.html';
                localStorage.removeItem('redirectAfterLogin');
                window.location.href = redirectTo;
            } else {
                alert('Please enter both username and password');
            }
        });
    }
}

// Check if user is logged in before accessing protected pages
function checkLoginStatus() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    let currentPage = window.location.pathname.split('/').pop().toLowerCase();
    
    // Handle empty path (index)
    if (currentPage === '' || currentPage === '/') {
        currentPage = 'index.html';
    }
    
    console.log('Current page:', currentPage);
    
    // List of pages that require login (all lowercase for case-insensitive comparison)
    const protectedPages = [
        'python1.html', 'python2.html', 'python3.html', 
        'bashscripting.html', 'html.html', 'css.html'
    ];
    
    // If on a protected page and not logged in, redirect to login
    if (protectedPages.includes(currentPage) && !loggedInUser) {
        console.log('Redirecting to login page...');
        // Store the current page to redirect back after login
        localStorage.setItem('redirectAfterLogin', window.location.href);
        window.location.href = 'login.html';
        return false;
    }
    
    return true;
}

// Special handling for CSS and Bash pages
function handleSpecialPages() {
    const currentPage = window.location.pathname.split('/').pop().toLowerCase();
    const loggedInUser = localStorage.getItem('loggedInUser');
    
    // Special handling for CSS and Bash pages
    if ((currentPage === 'css.html' || currentPage === 'bashscripting.html') && !loggedInUser) {
        console.log('Special handling for', currentPage);
        localStorage.setItem('redirectAfterLogin', window.location.href);
        window.location.href = 'login.html';
    }
}

// Run when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded');
    console.log('Logged in user:', localStorage.getItem('loggedInUser'));
    
    // Always update navbar
    updateNavbar();
    
    // Setup login form if on login page
    setupLoginForm();
    
    // Special handling for CSS and Bash pages
    handleSpecialPages();
    
    // Check login status for protected pages
    checkLoginStatus();
});

// Run immediately to catch redirects before DOM loads
(function() {
    console.log('Script loaded');
    const currentPage = window.location.pathname.split('/').pop().toLowerCase();
    const loggedInUser = localStorage.getItem('loggedInUser');
    
    // List of pages that require login
    const protectedPages = [
        'python1.html', 'python2.html', 'python3.html', 
        'bashscripting.html', 'html.html', 'css.html'
    ];
    
    // If on a protected page and not logged in, redirect to login
    if (protectedPages.includes(currentPage) && !loggedInUser) {
        console.log('Early redirect to login page...');
        localStorage.setItem('redirectAfterLogin', window.location.href);
        window.location.href = 'login.html';
    }
})();
