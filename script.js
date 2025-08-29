// Smooth scrolling for navigation
function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({
        behavior: 'smooth'
    });
}

// Update slider values
document.getElementById('vibration').addEventListener('input', function() {
    document.getElementById('vibration-value').textContent = this.value;
});

document.getElementById('temperature').addEventListener('input', function() {
    document.getElementById('temperature-value').textContent = this.value + '°C';
});

document.getElementById('rotorSpeed').addEventListener('input', function() {
    document.getElementById('rotorSpeed-value').textContent = this.value + ' RPM';
});

// Enhanced prediction function based on your actual ML model findings
function predictFailure() {
    const vibration = parseFloat(document.getElementById('vibration').value);
    const temperature = parseFloat(document.getElementById('temperature').value);
    const rotorSpeed = parseFloat(document.getElementById('rotorSpeed').value);
    
    // BASED ON YOUR ACTUAL ML MODEL FINDINGS:
    // Vibration is the MOST important feature (40-50% importance)
    // Temperature is second most important (20-30% importance)
    // Rotor speed has lower importance (5-10% importance)
    
    let riskPercentage = 0;
    
    // Vibration contribution (40-50% weight - MOST IMPORTANT)
    if (vibration > 1.4) riskPercentage += 65; // Critical vibration
    else if (vibration > 1.2) riskPercentage += 45; // High vibration
    else if (vibration > 1.0) riskPercentage += 20; // Moderate vibration
    else if (vibration > 0.8) riskPercentage += 5;  // Normal vibration
    
    // Temperature contribution (20-30% weight)
    if (temperature > 95) riskPercentage += 50;     // Critical temperature
    else if (temperature > 90) riskPercentage += 30; // High temperature
    else if (temperature > 85) riskPercentage += 15; // Elevated temperature
    else if (temperature > 80) riskPercentage += 5;  // Normal temperature
    
    // Rotor speed contribution (5-10% weight - LEAST IMPORTANT)
    const speedDeviation = Math.abs(rotorSpeed - 15);
    if (speedDeviation > 4) riskPercentage += 20;   // Extreme deviation
    else if (speedDeviation > 2) riskPercentage += 10; // Significant deviation
    else if (speedDeviation > 1) riskPercentage += 5;  // Minor deviation
    
    // Cap at 100%
    riskPercentage = Math.min(riskPercentage, 100);
    
    // Update UI
    document.querySelector('.risk-bar').style.width = riskPercentage + '%';
    
    let predictionText = '';
    let riskLevel = '';
    
    if (riskPercentage < 20) {
        predictionText = 'All parameters normal. No maintenance needed.';
        riskLevel = 'LOW RISK';
    } else if (riskPercentage < 50) {
        predictionText = 'Minor anomalies detected. Monitor and schedule routine check.';
        riskLevel = 'MODERATE RISK';
    } else if (riskPercentage < 80) {
        predictionText = 'Significant issues detected! Schedule inspection within 48 hours.';
        riskLevel = 'HIGH RISK';
    } else {
        predictionText = 'CRITICAL FAILURE IMMINENT! Shutdown and perform immediate maintenance!';
        riskLevel = 'CRITICAL RISK';
    }
    
    document.getElementById('prediction-text').innerHTML = 
        `<strong style="font-size: 1.3em;">${riskLevel}</strong><br>${predictionText}<br>
         <small>Risk Score: ${Math.round(riskPercentage)}%</small>`;
    
    // Visual feedback based on risk level
    const riskMeter = document.querySelector('.risk-bar');
    if (riskPercentage >= 80) {
        riskMeter.style.background = 'linear-gradient(90deg, #EF4444, #DC2626)';
    } else if (riskPercentage >= 50) {
        riskMeter.style.background = 'linear-gradient(90deg, #F59E0B, #EA580C)';
    } else if (riskPercentage >= 20) {
        riskMeter.style.background = 'linear-gradient(90deg, #84CC16, #65A30D)';
    } else {
        riskMeter.style.background = 'linear-gradient(90deg, #10B981, #059669)';
    }
}

// Image modal functionality
function openModal(element) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    modal.style.display = 'block';
    modalImg.src = element.src;
}

function closeModal() {
    document.getElementById('imageModal').style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('imageModal');
    if (event.target == modal) {
        closeModal();
    }
}

// Scroll animations
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.animate');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(element => {
        element.style.opacity = 0;
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(element);
    });
});

// Initialize page
window.onload = function() {
    // Set initial values for sliders
    document.getElementById('vibration-value').textContent = 
        document.getElementById('vibration').value;
    
    document.getElementById('temperature-value').textContent = 
        document.getElementById('temperature').value + '°C';
        
    document.getElementById('rotorSpeed-value').textContent = 
        document.getElementById('rotorSpeed').value + ' RPM';
}