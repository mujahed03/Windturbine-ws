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

// Prediction function (simplified version)
function predictFailure() {
    const vibration = parseFloat(document.getElementById('vibration').value);
    const temperature = parseFloat(document.getElementById('temperature').value);
    
    // Simple logic based on your findings
    let riskPercentage = 0;
    
    if (vibration > 1.2) riskPercentage += 40;
    if (temperature > 90) riskPercentage += 35;
    if (vibration > 1.2 && temperature > 90) riskPercentage += 25;
    
    riskPercentage = Math.min(riskPercentage, 100);
    
    // Update UI
    document.querySelector('.risk-bar').style.width = riskPercentage + '%';
    
    let predictionText = '';
    if (riskPercentage < 30) {
        predictionText = '✅ Low risk - Turbine operating normally';
    } else if (riskPercentage < 70) {
        predictionText = '⚠️ Medium risk - Monitor closely';
    } else {
        predictionText = '🚨 High risk - Maintenance required!';
    }
    
    document.getElementById('prediction-text').textContent = predictionText;
}

// Image modal functionality
function openModal(img) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    modal.style.display = 'block';
    modalImg.src = img.src;
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