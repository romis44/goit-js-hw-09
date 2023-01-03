import Notiflix from 'notiflix';
const inputForm = document.querySelector('.form');
inputForm.addEventListener('submit', onSubmitClick);

function onSubmitClick(event) {
  event.preventDefault();

  let firstDelay = Number(event.currentTarget.delay.value);
  let delayStep = Number(event.currentTarget.step.value);
  let amountTotal = Number(event.currentTarget.amount.value);

  for (let i = 1; i <= amountTotal; i += 1) {
    createPromise(i, firstDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay} ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay} ms`
        );
      });

    firstDelay += delayStep;
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolved, rejected) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolved({ position, delay });
      } else {
        rejected({ position, delay });
      }
    }, delay);
  });
}
