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

// SIMPLIFIED and GUARANTEED prediction function
function predictFailure() {
    const vibration = parseFloat(document.getElementById('vibration').value);
    const temperature = parseFloat(document.getElementById('temperature').value);
    const rotorSpeed = parseFloat(document.getElementById('rotorSpeed').value);
    
    // Simple calculation that WILL produce all risk levels
    // Vibration: 0.5-1.5 -> map to 0-50%
    // Temperature: 70-100 -> map to 0-30% 
    // Rotor Speed: 10-20 -> map to 0-20% (deviation from 15)
    
    let riskPercentage = 0;
    
    // Vibration contributes 50% max (most important)
    riskPercentage += ((vibration - 0.5) / 1.0) * 50;
    
    // Temperature contributes 30% max
    riskPercentage += ((temperature - 70) / 30) * 30;
    
    // Rotor speed deviation contributes 20% max
    const speedDeviation = Math.abs(rotorSpeed - 15);
    riskPercentage += (speedDeviation / 5) * 20;
    
    // Cap at 100%
    riskPercentage = Math.min(riskPercentage, 100);
    
    // Update UI
    document.querySelector('.risk-bar').style.width = riskPercentage + '%';
    
    let predictionText = '';
    let riskLevel = '';
    
    // Clear risk levels
    if (riskPercentage < 25) {
        predictionText = 'All parameters normal. No maintenance needed.';
        riskLevel = 'LOW RISK';
    } else if (riskPercentage < 50) {
        predictionText = 'Minor anomalies detected. Monitor and schedule routine check.';
        riskLevel = 'MODERATE RISK';
    } else if (riskPercentage < 75) {
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
    if (riskPercentage >= 75) {
        riskMeter.style.background = 'linear-gradient(90deg, #EF4444, #DC2626)';
        document.getElementById('prediction-text').style.color = '#EF4444';
    } else if (riskPercentage >= 50) {
        riskMeter.style.background = 'linear-gradient(90deg, #F59E0B, #EA580C)';
        document.getElementById('prediction-text').style.color = '#F59E0B';
    } else if (riskPercentage >= 25) {
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