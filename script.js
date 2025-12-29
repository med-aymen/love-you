// Page elements
const loginPage = document.getElementById('loginPage');
const proposalPage = document.getElementById('proposalPage');
const certificatePage = document.getElementById('certificatePage');

// Form elements
const loginForm = document.getElementById('loginForm');
const firstNameInput = document.getElementById('firstName');
const lastNameInput = document.getElementById('lastName');

// Proposal elements
const userName = document.getElementById('userName');
const acceptBtn = document.getElementById('acceptBtn');
const maybeBtn = document.getElementById('maybeBtn');

// Certificate elements
const certificateCanvas = document.getElementById('certificateCanvas');
const downloadBtn = document.getElementById('downloadBtn');
const restartBtn = document.getElementById('restartBtn');

// User data
let userData = {
    firstName: '',
    lastName: '',
    fullName: ''
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Check if user data exists in localStorage
    const savedData = localStorage.getItem('aymenFriendData');
    if (savedData) {
        userData = JSON.parse(savedData);
        // Skip to proposal page if user has already logged in
        // showPage('proposal');
    }
});

// Page navigation
function showPage(pageName) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    
    switch(pageName) {
        case 'login':
            loginPage.classList.add('active');
            break;
        case 'proposal':
            proposalPage.classList.add('active');
            break;
        case 'certificate':
            certificatePage.classList.add('active');
            break;
    }
}

// Login form submission
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const firstName = firstNameInput.value.trim();
    const lastName = lastNameInput.value.trim();
    
    if (firstName && lastName) {
        userData.firstName = firstName;
        userData.lastName = lastName;
        userData.fullName = `${firstName} ${lastName}`;
        
        // Save to localStorage
        localStorage.setItem('aymenFriendData', JSON.stringify(userData));
        
        // Update proposal page with user's name
        userName.textContent = firstName;
        
        // Navigate to proposal page
        showPage('proposal');
    }
});

// Accept button
acceptBtn.addEventListener('click', () => {
    generateCertificate();
    showPage('certificate');
});

// Maybe button
maybeBtn.addEventListener('click', () => {
    alert('That\'s okay! AYMEN will always be here when you\'re ready! 💙');
});

// Generate certificate
function generateCertificate() {
    const canvas = certificateCanvas;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size (16:9 ratio)
    const width = 1920;
    const height = 1080;
    canvas.width = width;
    canvas.height = height;
    
    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#667eea');
    gradient.addColorStop(1, '#764ba2');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    
    // Add decorative elements
    drawDecorativeElements(ctx, width, height);
    
    // Border
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 20;
    ctx.strokeRect(40, 40, width - 80, height - 80);
    
    // Inner border
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.lineWidth = 4;
    ctx.strokeRect(70, 70, width - 140, height - 140);
    
    // Title
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 100px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Friendship Certificate', width / 2, 200);
    
    // Decorative line
    ctx.strokeStyle = '#ffd700';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(width / 2 - 300, 240);
    ctx.lineTo(width / 2 + 300, 240);
    ctx.stroke();
    
    // Main text
    ctx.font = '50px Arial';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('This certifies that', width / 2, 350);
    
    // User's name (highlighted)
    ctx.font = 'bold 80px Arial';
    ctx.fillStyle = '#ffd700';
    ctx.fillText(userData.fullName, width / 2, 470);
    
    // Message
    ctx.font = '45px Arial';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('has chosen to start 2026 with', width / 2, 580);
    
    // AYMEN's name
    ctx.font = 'bold 70px Arial';
    ctx.fillStyle = '#ff6b9d';
    ctx.fillText('AYMEN', width / 2, 680);
    
    // Love message
    ctx.font = '40px Arial';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('AYMEN loves you very much and promises to be', width / 2, 780);
    ctx.fillText('your amazing friend throughout this wonderful year!', width / 2, 840);
    
    // Date
    ctx.font = '30px Arial';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    const currentDate = new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    ctx.fillText(currentDate, width / 2, 960);
    
    // Heart decorations
    drawHeart(ctx, 300, 500, 40, '#ff6b9d');
    drawHeart(ctx, width - 300, 500, 40, '#ff6b9d');
}

// Draw decorative elements
function drawDecorativeElements(ctx, width, height) {
    // Add sparkles
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    
    for (let i = 0; i < 50; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const size = Math.random() * 3 + 1;
        
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
    }
    
    // Add corner decorations
    drawCornerDecoration(ctx, 100, 100);
    drawCornerDecoration(ctx, width - 100, 100, true);
    drawCornerDecoration(ctx, 100, height - 100, false, true);
    drawCornerDecoration(ctx, width - 100, height - 100, true, true);
}

// Draw corner decoration
function drawCornerDecoration(ctx, x, y, flipX = false, flipY = false) {
    ctx.save();
    ctx.translate(x, y);
    if (flipX) ctx.scale(-1, 1);
    if (flipY) ctx.scale(1, -1);
    
    ctx.strokeStyle = '#ffd700';
    ctx.lineWidth = 3;
    
    // Curved lines
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(30, 0, 30, 30);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(0, 30, 30, 30);
    ctx.stroke();
    
    ctx.restore();
}

// Draw heart shape
function drawHeart(ctx, x, y, size, color) {
    ctx.save();
    ctx.fillStyle = color;
    ctx.translate(x, y);
    ctx.beginPath();
    ctx.moveTo(0, size / 4);
    ctx.quadraticCurveTo(-size / 2, -size / 2, -size, size / 4);
    ctx.quadraticCurveTo(-size, size / 2, 0, size);
    ctx.quadraticCurveTo(size, size / 2, size, size / 4);
    ctx.quadraticCurveTo(size / 2, -size / 2, 0, size / 4);
    ctx.fill();
    ctx.restore();
}

// Download certificate
downloadBtn.addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = `${userData.firstName}_AYMEN_Friendship_Certificate_2026.png`;
    link.href = certificateCanvas.toDataURL('image/png');
    link.click();
    
    // Show success message
    showSuccessMessage();
});

// Show success message
function showSuccessMessage() {
    const message = document.createElement('div');
    message.textContent = '✅ Certificate downloaded successfully!';
    message.style.cssText = `
        position: fixed;
        top: 30px;
        left: 50%;
        transform: translateX(-50%);
        background: #48bb78;
        color: white;
        padding: 15px 30px;
        border-radius: 50px;
        font-weight: 600;
        box-shadow: 0 10px 30px rgba(72, 187, 120, 0.4);
        z-index: 1000;
        animation: slideDown 0.5s ease;
    `;
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.style.animation = 'slideUp 0.5s ease';
        setTimeout(() => message.remove(), 500);
    }, 3000);
}

// Restart button
restartBtn.addEventListener('click', () => {
    // Clear localStorage
    localStorage.removeItem('aymenFriendData');
    
    // Reset form
    loginForm.reset();
    
    // Reset user data
    userData = {
        firstName: '',
        lastName: '',
        fullName: ''
    };
    
    // Go back to login page
    showPage('login');
});

// Add CSS animations for success message
const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translate(-50%, -20px);
        }
        to {
            opacity: 1;
            transform: translate(-50%, 0);
        }
    }
    
    @keyframes slideUp {
        from {
            opacity: 1;
            transform: translate(-50%, 0);
        }
        to {
            opacity: 0;
            transform: translate(-50%, -20px);
        }
    }
`;
document.head.appendChild(style);
