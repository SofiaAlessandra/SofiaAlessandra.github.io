document.addEventListener("DOMContentLoaded", function () {
    const statusText = document.getElementById("status-indicator");
    const countdownText = document.getElementById("countdown-timer");
  
    if (!statusText || !countdownText) return;
  
    const now = new Date();
    const day = now.getDay(); // Sunday = 0
    const hour = now.getHours();
    const minute = now.getMinutes();
  
    let isOpen = false;
  
    // Opening hours (24h)
    const hours = {
      0: { start: 15, end: 24 },  // Sunday
      1: { start: 15, end: 24 },  // Monday
      2: { start: 15, end: 24 },  // Tuesday
      3: { start: 15, end: 24 },  // Wednesday
      4: { start: 15, end: 24 },  // Thursday
      5: { start: 15, end: 26 },  // Friday (2am = 26)
      6: { start: 15, end: 26 }   // Saturday
    };
  
    const today = hours[day];
    const currentTime = hour + minute / 60;
  
    if (currentTime >= today.start && currentTime < today.end) {
      isOpen = true;
    }
  
    statusText.textContent = isOpen ? "🟢 NOW OPEN" : "🔴 CURRENTLY CLOSED";
    statusText.className = isOpen ? "open neon-pulse" : "closed";
  
    let targetHour = isOpen ? today.end : today.start;
    let remainingHours = Math.floor(targetHour - currentTime);
    let remainingMinutes = Math.round((targetHour - currentTime - remainingHours) * 60);
  
    if (remainingMinutes < 0) {
      remainingHours--;
      remainingMinutes += 60;
    }
  
    if (remainingHours < 0) {
      countdownText.textContent = "We'll be back soon!";
    } else {
      countdownText.textContent = isOpen
        ? `Closing in ${remainingHours}h ${remainingMinutes}m`
        : `Opens in ${remainingHours}h ${remainingMinutes}m`;
    }
  });
  