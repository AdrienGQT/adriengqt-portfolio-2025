const clock: HTMLElement = document.querySelector('#clock') as HTMLElement;

function updateClock() {
  const now = new Date();
  
  // Create a formatter for Paris time (France uses Central European Time)
  const parisTimeFormatter = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Paris',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });

  let parisTime = parisTimeFormatter.format(now);
  
  parisTime = parisTime.replace(/,/g, ':').replace(/:/g, ':');
  
  clock.innerText = parisTime;
}

updateClock();

// Update the clock every second
setInterval(updateClock, 1000);