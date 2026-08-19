document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    console.log('Cordova is ready!');
    updateClock();
    setInterval(updateClock, 1000);
}

function showAbout() {
    alert('Hi! I am [Your Name]. Learning App Development! 📱');
}

function showCourse() {
    alert('My course is [Your Course]! 📚');
}

function exitApp() {
    if (navigator.app) {
        navigator.app.exitApp();
    } else {
        alert('Exit clicked! (Running in browser)');
    }
}

function updateClock() {
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    document.getElementById('clock').textContent = '🕐 ' + timeString;
}
