// Smooth scrolling for navigation
function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({
        behavior: 'smooth'
    });
}

// Update slider values
document.addEventListener('DOMContentLoaded', function() {
    // Vibration slider
    const vibrationSlider = document.getElementById('vibration');
    const vibrationValue = document.getElementById('vibration-value');
    if (vibrationSlider && vibrationValue) {
        vibrationSlider.addEventListener('input', function() {
            vibrationValue.textContent = this.value;
        });
    }

    // Temperature slider
    const tempSlider = document.getElementById('temperature');
    const tempValue = document.getElementById('temperature-value');
    if (tempSlider && tempValue) {
        tempSlider.addEventListener('input', function() {
            tempValue.textContent = this.value + '°C';
        });
    }

    // Rotor speed slider
    const speedSlider = document.getElementById('rotorSpeed');
    const speedValue = document.getElementById('rotorSpeed-value');
    if (speedSlider && speedValue) {
        speedSlider.addEventListener('input', function() {
            speedValue.textContent = this.value + ' RPM';
        });
    }

    // Set initial values
    if (vibrationSlider && vibrationValue) vibrationValue.textContent = vibrationSlider.value;
    if (tempSlider && tempValue) tempValue.textContent = tempSlider.value + '°C';
    if (speedSlider && speedValue) speedValue.textContent = speedSlider.value + ' RPM';
});

// SIMPLE GUARANTEED prediction function
function predictFailure() {
    console.log("Predict function called!");
    
    // Get values with fallbacks
    const vibration = parseFloat(document.getElementById('vibration').value) || 1.0;
    const temperature = parseFloat(document.getElementById('temperature').value) || 85;
    const rotorSpeed = parseFloat(document.getElementById('rotorSpeed').value) || 15;
    
    console.log("Values:", vibration, temperature, rotorSpeed);

    // EXTREMELY SIMPLE calculation that WILL work
    let riskPercentage = 0;
    
    // Vibration contributes 0-40 points
    riskPercentage += (vibration - 0.5) * 40; // 0.5->0%, 1.5->40%
    
    // Temperature contributes 0-35 points  
    riskPercentage += (temperature - 70) * 1.17; // 70->0%, 100->35%
    
    // Rotor speed deviation contributes 0-25 points
    const speedDeviation = Math.abs(rotorSpeed - 15);
    riskPercentage += speedDeviation * 5; // 0->0%, 5->25%
    
    // Cap between 0-100
    riskPercentage = Math.max(0, Math.min(100, riskPercentage));
    
    console.log("Risk percentage:", riskPercentage);

    // Update risk meter
    const riskBar = document.querySelector('.risk-bar');
    if (riskBar) {
        riskBar.style.width = riskPercentage + '%';
    }

    // Determine risk level
    let riskLevel, predictionText, riskColor;
    
    if (riskPercentage >= 80) {
        riskLevel = 'CRITICAL RISK';
        predictionText = '🚨 CRITICAL FAILURE IMMINENT! Immediate shutdown required!';
        riskColor = '#DC2626';
    } 
    else if (riskPercentage >= 55) {
        riskLevel = 'HIGH RISK';
        predictionText = '⚠️ HIGH RISK! Schedule maintenance within 24 hours!';
        riskColor = '#EA580C';
    }
    else if (riskPercentage >= 30) {
        riskLevel = 'MODERATE RISK';
        predictionText = 'ℹ️ Moderate issues detected. Schedule inspection soon.';
        riskColor = '#F59E0B';
    }
    else {
        riskLevel = 'LOW RISK';
        predictionText = '✅ All systems normal. No action required.';
        riskColor = '#10B981';
    }

    // Update risk bar color
    if (riskBar) {
        riskBar.style.background = riskColor;
    }

    // Update prediction text
    const predictionElement = document.getElementById('prediction-text');
    if (predictionElement) {
        predictionElement.innerHTML = 
            `<strong style="font-size: 1.3em; color: ${riskColor}">${riskLevel}</strong><br>
             ${predictionText}<br>
             <small>Risk Score: ${Math.round(riskPercentage)}%</small>`;
        predictionElement.style.color = riskColor;
    }
}

// Image modal functionality
function openModal(element) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    if (modal && modalImg) {
        modal.style.display = 'block';
        modalImg.src = element.src;
    }
}

function closeModal() {
    const modal = document.getElementById('imageModal');
    if (modal) {
        modal.style.display = 'none';
    }
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

// Test function to verify it's working
function testRiskLevels() {
    console.log("Testing risk levels...");
    
    // Test CRITICAL RISK
    document.getElementById('vibration').value = 1.5;
    document.getElementById('temperature').value = 100;
    document.getElementById('rotorSpeed').value = 20;
    
    // Update display values
    document.getElementById('vibration-value').textContent = '1.5';
    document.getElementById('temperature-value').textContent = '100°C';
    document.getElementById('rotorSpeed-value').textContent = '20 RPM';
    
    // Run prediction
    predictFailure();
}

// Make test function available globally for debugging
window.testRiskLevels = testRiskLevels;