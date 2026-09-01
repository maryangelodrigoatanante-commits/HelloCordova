function initApp() {
    updateClock();
    setInterval(updateClock, 1000);

    loadSavedProfile();

    // Navigation Listeners
    document.getElementById('btn-to-profile').addEventListener('click', function() {
        loadSavedProfile();
        showPage('profile-page');
    });

    document.getElementById('btn-to-register').addEventListener('click', function() {
        showPage('register-page');
    });

    document.getElementById('btn-to-about').addEventListener('click', function() {
        showPage('about-page');
    });

    document.getElementById('btn-profile-back').addEventListener('click', function() { showPage('home-page'); });
    document.getElementById('btn-register-back').addEventListener('click', function() { showPage('home-page'); });
    document.getElementById('btn-about-back').addEventListener('click', function() { showPage('home-page'); });

    // Dark/Light Mode Toggle Logic
    var themeBtn = document.getElementById('themeToggle');
    if (themeBtn) {
        themeBtn.addEventListener('click', function() {
            document.body.classList.toggle('light-mode');
            if (document.body.classList.contains('light-mode')) {
                themeBtn.innerText = '☀️ Light';
            } else {
                themeBtn.innerText = '🌙 Dark';
            }
        });
    }

    // Registration Form Listener
    var regForm = document.getElementById('registrationForm');
    if (regForm) {
        regForm.addEventListener('submit', handleFormSubmit);
    }

    // Clear Data Listener
    var btnClear = document.getElementById('btn-clear-data');
    if (btnClear) {
        btnClear.addEventListener('click', clearProfileData);
    }
}

document.addEventListener('deviceready', initApp, false);
document.addEventListener('DOMContentLoaded', initApp, false);

function showPage(pageId) {
    var pages = document.querySelectorAll('.page');
    pages.forEach(function(page) {
        page.classList.remove('active');
    });
    var targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
    }
}

function updateClock() {
    var now = new Date();
    var clockElement = document.getElementById('clockDisplay');
    if (clockElement) {
        clockElement.innerText = now.toLocaleTimeString();
    }
}

// LocalStorage Functions
function handleFormSubmit(event) {
    event.preventDefault();

    var fullName = document.getElementById('fullName').value.trim();
    var studentId = document.getElementById('studentId').value.trim();
    var courseYear = document.getElementById('courseYear').value.trim();
    var email = document.getElementById('email').value.trim();
    var contact = document.getElementById('contact').value.trim();
    var alertBox = document.getElementById('alertMessage');

    if (!fullName || !studentId || !courseYear || !email || !contact) {
        showAlert(alertBox, 'Error: All fields are required!', 'error');
        return;
    }

    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        showAlert(alertBox, 'Error: Invalid email format!', 'error');
        return;
    }

    var phonePattern = /^[0-9]{11}$/;
    if (!phonePattern.test(contact)) {
        showAlert(alertBox, 'Error: Contact must be 11 digits!', 'error');
        return;
    }

    localStorage.setItem('studentName', fullName);
    localStorage.setItem('studentId', studentId);
    localStorage.setItem('courseYear', courseYear);
    localStorage.setItem('email', email);
    localStorage.setItem('contact', contact);

    showAlert(alertBox, 'Success: Saved to Local Storage!', 'success');
    loadSavedProfile();
}

function loadSavedProfile() {
    document.getElementById('dispName').innerText = localStorage.getItem('studentName') || 'No Data';
    document.getElementById('dispId').innerText = localStorage.getItem('studentId') || 'No Data';
    document.getElementById('dispCourse').innerText = localStorage.getItem('courseYear') || 'No Data';
    document.getElementById('dispEmail').innerText = localStorage.getItem('email') || 'No Data';
    document.getElementById('dispContact').innerText = localStorage.getItem('contact') || 'No Data';
}

function clearProfileData() {
    localStorage.clear();
    loadSavedProfile();
    alert('Local Storage data cleared!');
}

function showAlert(element, message, type) {
    element.className = 'alert-box ' + type;
    element.innerText = message;
}
