const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
let timerId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function showNotification() {
  timerId = setInterval(() => {
    startBtn.disabled = true;
    console.log(timerId);
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}
startBtn.addEventListener('click', showNotification);

stopBtn.addEventListener('click', () => {
  clearInterval(timerId);
  startBtn.disabled = false;
});

// stopBtn.addEventListener('click', evt => clearInterval(timerId));
