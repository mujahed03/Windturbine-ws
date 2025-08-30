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

// GUARANTEED WORKING prediction function
function predictFailure() {
    const vibration = parseFloat(document.getElementById('vibration').value);
    const temperature = parseFloat(document.getElementById('temperature').value);
    const rotorSpeed = parseFloat(document.getElementById('rotorSpeed').value);
    
    // SIMPLE DIRECT MAPPING - This will definitely work
    let riskPercentage = 0;
    
    // Vibration: 0.5-1.5 → 0-40%
    riskPercentage += ((vibration - 0.5) / 1.0) * 40;
    
    // Temperature: 70-100 → 0-35%
    riskPercentage += ((temperature - 70) / 30) * 35;
    
    // Rotor Speed deviation: 0-5 → 0-25%
    const speedDeviation = Math.abs(rotorSpeed - 15);
    riskPercentage += (speedDeviation / 5) * 25;
    
    // Ensure we don't exceed 100%
    riskPercentage = Math.min(100, Math.max(0, riskPercentage));
    
    // Update the risk meter
    document.querySelector('.risk-bar').style.width = riskPercentage + '%';
    
    // Determine risk level with clear thresholds
    let riskLevel, predictionText;
    
    if (riskPercentage >= 80) {
        riskLevel = 'CRITICAL RISK';
        predictionText = '🚨 CRITICAL FAILURE IMMINENT! Immediate shutdown required!';
        document.querySelector('.risk-bar').style.background = 'linear-gradient(90deg, #DC2626, #B91C1C)';
        document.getElementById('prediction-text').style.color = '#DC2626';
    } 
    else if (riskPercentage >= 55) {
        riskLevel = 'HIGH RISK';
        predictionText = '⚠️ HIGH RISK! Schedule maintenance within 24 hours!';
        document.querySelector('.risk-bar').style.background = 'linear-gradient(90deg, #EA580C, #C2410C)';
        document.getElementById('prediction-text').style.color = '#EA580C';
    }
    else if (riskPercentage >= 30) {
        riskLevel = 'MODERATE RISK';
        predictionText = 'ℹ️ Moderate issues detected. Schedule inspection soon.';
        document.querySelector('.risk-bar').style.background = 'linear-gradient(90deg, #F59E0B, #D97706)';
        document.getElementById('prediction-text').style.color = '#F59E0B';
    }
    else {
        riskLevel = 'LOW RISK';
        predictionText = '✅ All systems normal. No action required.';
        document.querySelector('.risk-bar').style.background = 'linear-gradient(90deg, #10B981, #059669)';
        document.getElementById('prediction-text').style.color = '#10B981';
    }
    
    // Update the prediction text
    document.getElementById('prediction-text').innerHTML = 
        `<strong style="font-size: 1.3em;">${riskLevel}</strong><br>
         ${predictionText}<br>
         <small>Risk Score: ${Math.round(riskPercentage)}%</small>`;
    
    // Debug output
    console.log('Vibration:', vibration, 'Temp:', temperature, 'RPM:', rotorSpeed);
    console.log('Risk Percentage:', riskPercentage, 'Risk Level:', riskLevel);
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
    
    // Set initial prediction
    predictFailure();
}