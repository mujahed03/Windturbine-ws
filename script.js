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

// Enhanced prediction function based on your ML findings
function predictFailure() {
    const vibration = parseFloat(document.getElementById('vibration').value);
    const temperature = parseFloat(document.getElementById('temperature').value);
    const rotorSpeed = parseFloat(document.getElementById('rotorSpeed').value);
    
    // Enhanced logic based on your ML model insights
    let riskPercentage = 0;
    
    // Vibration contributes significantly (based on your feature importance)
    if (vibration > 1.3) riskPercentage += 50;
    else if (vibration > 1.1) riskPercentage += 30;
    else if (vibration > 0.9) riskPercentage += 10;
    
    // Temperature contribution
    if (temperature > 95) riskPercentage += 40;
    else if (temperature > 85) riskPercentage += 20;
    
    // Rotor speed deviation from optimal (15 RPM)
    const speedDeviation = Math.abs(rotorSpeed - 15);
    riskPercentage += speedDeviation * 3;
    
    riskPercentage = Math.min(riskPercentage, 100);
    
    // Update UI
    document.querySelector('.risk-bar').style.width = riskPercentage + '%';
    
    let predictionText = '';
    let riskLevel = '';
    
    if (riskPercentage < 25) {
        predictionText = 'Turbine operating normally. No maintenance needed.';
        riskLevel = 'LOW RISK';
    } else if (riskPercentage < 60) {
        predictionText = 'Moderate anomalies detected. Schedule inspection within 2 weeks.';
        riskLevel = 'MEDIUM RISK';
    } else {
        predictionText = 'Critical failure likely! Immediate maintenance required.';
        riskLevel = 'HIGH RISK';
    }
    
    document.getElementById('prediction-text').innerHTML = 
        `<strong>${riskLevel}</strong><br>${predictionText}`;
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