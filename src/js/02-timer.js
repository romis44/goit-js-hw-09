import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const startBtn = document.querySelector('button[data-start]');
const timer = document.querySelector('.timer');

startBtn.addEventListener('click', onstartBtnClick);
startBtn.disabled = true;
let selectedTime = null;
let deltaTime = null;
let timerId = null;

const flatpickOptions = flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    setTimeout(() => {
      if (selectedDates[0].getTime() < Date.now()) {
        window.alert('Please choose a date in the future');
        return;
      }
      startBtn.removeAttribute('disabled');
      selectedTime = selectedDates[0];
    }, 0);
  },
});

function onstartBtnClick(event) {
  event.currentTarget.disabled = true;

  timerId = setInterval(() => {
    deltaTime = selectedTime.getTime() - Date.now();

    const { days, hours, minutes, seconds } = convertMs(deltaTime);

    if (deltaTime <= 0) {
      clearInterval(timerId);
      flatpickOptions.element.disabled = false;
    } else {
      updateTimer({ days, hours, minutes, seconds });
    }
  }, 1000);
}

function updateTimer({ days, hours, minutes, seconds }) {
  timer.firstElementChild.firstElementChild.textContent = addLeadingZero(
    `${days}`
  );
  timer.children[1].firstElementChild.textContent = addLeadingZero(`${hours}`);
  timer.children[2].firstElementChild.textContent = addLeadingZero(
    `${minutes}`
  );
  timer.lastElementChild.firstElementChild.textContent = addLeadingZero(
    `${seconds}`
  );

  flatpickOptions.element.disabled = true;
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
