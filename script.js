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

// ---- FIXED prediction function ----
// Simple failure prediction function (scaled properly)
function predictFailure() {
    const vibration = parseFloat(document.getElementById('vibration').value);
    const temperature = parseFloat(document.getElementById('temperature').value);
    const rotorSpeed = parseFloat(document.getElementById('rotorSpeed').value);

    // Adjusted scoring so full range is possible
    let risk = 0;
    risk += (vibration - 0.5) * 40;        // vibration has stronger weight
    risk += (temperature - 70) * 1.2;      // temperature influence increased
    risk += Math.abs(rotorSpeed - 15) * 8; // penalty for deviating from 15 RPM

    // Cap risk between 0 and 100
    risk = Math.max(0, Math.min(100, risk));

    // Update risk bar
    document.querySelector('.risk-bar').style.width = risk + '%';

    // Update prediction text
    const predictionText = document.getElementById('prediction-text');
    if (risk < 30) {
        predictionText.innerHTML = '<span style="color:#10B981">LOW RISK</span><br>No maintenance needed';
    } else if (risk < 70) {
        predictionText.innerHTML = '<span style="color:#F59E0B">MEDIUM RISK</span><br>Schedule inspection soon';
    } else {
        predictionText.innerHTML = '<span style="color:#EF4444">HIGH RISK</span><br>Immediate maintenance required';
    }

    console.log("Calculated Risk:", risk); // Debugging
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
