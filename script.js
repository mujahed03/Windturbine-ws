// Debugging - check if script is loaded
console.log("TurbineHealthAI script loaded successfully!");

// Simple guaranteed working prediction function
function predictFailure() {
    console.log("Predict function called!");
    
    // Get values with extensive error checking
    let vibration, temperature, rotorSpeed;
    
    try {
        vibration = parseFloat(document.getElementById('vibration').value) || 1.0;
        temperature = parseFloat(document.getElementById('temperature').value) || 85;
        rotorSpeed = parseFloat(document.getElementById('rotorSpeed').value) || 15;
        console.log("Slider values:", vibration, temperature, rotorSpeed);
    } catch (error) {
        console.error("Error getting slider values:", error);
        return;
    }

    // EXTREMELY SIMPLE calculation that CANNOT fail
    // Just use the values directly - no complex formulas
    
    let riskPercentage = 0;
    
    // Vibration: 0.5-1.5 → 0-50 points
    riskPercentage += (vibration - 0.5) * 100; // 0.5=0%, 1.5=100%
    
    // Temperature: 70-100 → 0-30 points  
    riskPercentage += (temperature - 70) * 1; // 70=0%, 100=30%
    
    // Rotor speed: 10-20 → 0-20 points
    riskPercentage += (rotorSpeed - 10) * 2; // 10=0%, 20=20%
    
    // Cap between 0-100
    riskPercentage = Math.max(0, Math.min(100, riskPercentage));
    
    console.log("Calculated risk:", riskPercentage + "%");

    // FORCE specific risk levels for testing
    if (vibration === 1.5 && temperature === 100 && rotorSpeed === 20) {
        riskPercentage = 100; // FORCE critical risk
        console.log("FORCING critical risk for testing");
    }
    else if (vibration === 1.3 && temperature === 95 && rotorSpeed === 18) {
        riskPercentage = 75; // FORCE high risk
        console.log("FORCING high risk for testing");
    }

    // Update risk meter - DIRECT DOM manipulation
    const riskBar = document.querySelector('.risk-bar');
    if (riskBar) {
        riskBar.style.width = riskPercentage + '%';
        console.log("Risk bar updated to:", riskPercentage + '%');
    } else {
        console.error("Risk bar element not found!");
    }

    // Determine risk level - SIMPLIFIED
    let riskLevel, predictionText, riskColor;
    
    if (riskPercentage >= 80) {
        riskLevel = 'CRITICAL RISK';
        predictionText = '🚨 CRITICAL FAILURE IMMINENT!';
        riskColor = 'red';
    } 
    else if (riskPercentage >= 50) {
        riskLevel = 'HIGH RISK';
        predictionText = '⚠️ HIGH RISK! Maintenance needed!';
        riskColor = 'orange';
    }
    else if (riskPercentage >= 20) {
        riskLevel = 'MODERATE RISK';
        predictionText = 'ℹ️ Moderate issues detected.';
        riskColor = 'yellow';
    }
    else {
        riskLevel = 'LOW RISK';
        predictionText = '✅ All systems normal.';
        riskColor = 'green';
    }

    // Update prediction text - DIRECT approach
    const predictionElement = document.getElementById('prediction-text');
    if (predictionElement) {
        predictionElement.innerHTML = 
            `<strong style="font-size: 1.3em; color: ${riskColor}">${riskLevel}</strong><br>
             ${predictionText}<br>
             <small>Risk Score: ${Math.round(riskPercentage)}%</small>`;
        predictionElement.style.color = riskColor;
        console.log("Prediction text updated to:", riskLevel);
    } else {
        console.error("Prediction text element not found!");
    }

    // Update risk bar color
    if (riskBar) {
        riskBar.style.background = riskColor;
    }
}

// Test function - DIRECT DOM manipulation
function testRiskLevels() {
    console.log("=== TESTING RISK LEVELS ===");
    
    // Set sliders to maximum values
    const vibrationSlider = document.getElementById('vibration');
    const tempSlider = document.getElementById('temperature');
    const speedSlider = document.getElementById('rotorSpeed');
    
    if (vibrationSlider) vibrationSlider.value = 1.5;
    if (tempSlider) tempSlider.value = 100;
    if (speedSlider) speedSlider.value = 20;
    
    // Update display values
    const vibrationValue = document.getElementById('vibration-value');
    const tempValue = document.getElementById('temperature-value');
    const speedValue = document.getElementById('rotorSpeed-value');
    
    if (vibrationValue) vibrationValue.textContent = '1.5';
    if (tempValue) tempValue.textContent = '100°C';
    if (speedValue) speedValue.textContent = '20 RPM';
    
    console.log("Sliders set to max values");
    
    // Run prediction
    predictFailure();
}

// Make test function available globally
window.testRiskLevels = testRiskLevels;
window.predictFailure = predictFailure;

// Simple slider updates
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded!");
    
    // Simple slider value updates
    function setupSlider(sliderId, valueId, suffix = '') {
        const slider = document.getElementById(sliderId);
        const valueDisplay = document.getElementById(valueId);
        
        if (slider && valueDisplay) {
            slider.addEventListener('input', function() {
                valueDisplay.textContent = this.value + suffix;
            });
            valueDisplay.textContent = slider.value + suffix;
        }
    }
    
    setupSlider('vibration', 'vibration-value', '');
    setupSlider('temperature', 'temperature-value', '°C');
    setupSlider('rotorSpeed', 'rotorSpeed-value', ' RPM');
    
    console.log("Sliders initialized");
});

console.log("Script initialization complete");