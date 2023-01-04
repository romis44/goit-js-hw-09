const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
let timerId = null;
stopBtn.disabled = true;

startBtn.addEventListener('click', showNotification);

function showNotification(event) {
  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  event.currentTarget.disabled = true;
  stopBtn.removeAttribute('disabled');
}

stopBtn.addEventListener('click', event => {
  clearInterval(timerId);
  event.currentTarget.disabled = true;
  startBtn.removeAttribute('disabled');
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
