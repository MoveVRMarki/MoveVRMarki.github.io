document.addEventListener('DOMContentLoaded', function() {
    // Get counter element
    const countElement = document.getElementById('count');
    
    // Get current count from localStorage or initialize to 0
    let visitorCount = localStorage.getItem('visitorCount');
    
    if (visitorCount === null) {
        visitorCount = 0;
    } else {
        visitorCount = parseInt(visitorCount);
    }
    
    // Increment count
    visitorCount++;
    
    // Update localStorage
    localStorage.setItem('visitorCount', visitorCount);
    
    // Update display
    countElement.textContent = visitorCount;
});
