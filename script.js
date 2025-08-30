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

// FIXED prediction function - adjusted for your slider ranges
function predictFailure() {
    const vibration = parseFloat(document.getElementById('vibration').value);
    const temperature = parseFloat(document.getElementById('temperature').value);
    const rotorSpeed = parseFloat(document.getElementById('rotorSpeed').value);
    
    let riskPercentage = 0;
    
    // Vibration contribution (0.5 to 1.5 range)
    if (vibration >= 1.4) riskPercentage += 70; // Critical: 1.4-1.5
    else if (vibration >= 1.2) riskPercentage += 50; // High: 1.2-1.39
    else if (vibration >= 1.0) riskPercentage += 30; // Moderate: 1.0-1.19
    else if (vibration >= 0.8) riskPercentage += 15; // Normal: 0.8-0.99
    else riskPercentage += 5; // Low: 0.5-0.79
    
    // Temperature contribution (70 to 100 range)
    if (temperature >= 98) riskPercentage += 60; // Critical: 98-100
    else if (temperature >= 95) riskPercentage += 45; // High: 95-97
    else if (temperature >= 90) riskPercentage += 30; // Moderate: 90-94
    else if (temperature >= 85) riskPercentage += 15; // Normal: 85-89
    else riskPercentage += 5; // Low: 70-84
    
    // Rotor speed contribution (10 to 20 range, optimal at 15)
    const speedDeviation = Math.abs(rotorSpeed - 15);
    if (speedDeviation >= 4) riskPercentage += 25; // Extreme: ≥4 deviation
    else if (speedDeviation >= 2) riskPercentage += 15; // High: 2-3.9
    else if (speedDeviation >= 1) riskPercentage += 8; // Moderate: 1-1.9
    else riskPercentage += 3; // Low: <1
    
    // Cap at 100%
    riskPercentage = Math.min(riskPercentage, 100);
    
    // Update UI
    document.querySelector('.risk-bar').style.width = riskPercentage + '%';
    
    let predictionText = '';
    let riskLevel = '';
    
    // Adjusted thresholds for better distribution
    if (riskPercentage < 35) {
        predictionText = 'All parameters normal. No maintenance needed.';
        riskLevel = 'LOW RISK';
    } else if (riskPercentage < 65) {
        predictionText = 'Minor anomalies detected. Monitor and schedule routine check.';
        riskLevel = 'MODERATE RISK';
    } else if (riskPercentage < 85) {
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
    if (riskPercentage >= 85) {
        riskMeter.style.background = 'linear-gradient(90deg, #EF4444, #DC2626)';
        document.getElementById('prediction-text').style.color = '#EF4444';
    } else if (riskPercentage >= 65) {
        riskMeter.style.background = 'linear-gradient(90deg, #F59E0B, #EA580C)';
        document.getElementById('prediction-text').style.color = '#F59E0B';
    } else if (riskPercentage >= 35) {
        riskMeter.style.background = 'linear-gradient(90deg, #84CC16, #65A30D)';
        document.getElementById('prediction-text').style.color = '#84CC16';
    } else {
        riskMeter.style.background = 'linear-gradient(90deg, #10B981, #059669)';
        document.getElementById('prediction-text').style.color = '#10B981';
    }
    
    console.log(`Vibration: ${vibration}, Temp: ${temperature}, RPM: ${rotorSpeed}, Risk: ${riskPercentage}%`);
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